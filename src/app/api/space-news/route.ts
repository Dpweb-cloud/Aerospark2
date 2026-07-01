import { NextResponse } from "next/server";

const NASA_API_KEY = process.env.NASA_API_KEY || "3aaIoqYiiGFah7ISCVbcHZ0jGeQFVXnv4J7aKuOZ";
const SPACEFLIGHT_NEWS_API = "https://api.spaceflightnewsapi.net/v4";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "all";
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    // Build search query based on category
    const categoryQueries: Record<string, string> = {
      all: "",
      space: "space",
      launch: "launch rocket",
      exploration: "mars moon exploration",
      satellite: "satellite",
      aviation: "aviation aircraft",
      technology: "technology",
    };

    const searchQuery = categoryQueries[category] || "";
    const searchParam = searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : "";

    // Fetch articles from Spaceflight News API
    const [articlesRes, nasaApodRes] = await Promise.allSettled([
      fetch(
        `${SPACEFLIGHT_NEWS_API}/articles/?limit=${limit}&offset=${offset}${searchParam}&ordering=-published_at`,
        { next: { revalidate: 300 } } // Cache for 5 minutes
      ),
      fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=3`,
        { next: { revalidate: 86400 } } // Cache for 24 hours
      ),
    ]);

    let articles: SpaceNewsArticle[] = [];
    let nasaImages: NasaApodItem[] = [];

    if (articlesRes.status === "fulfilled" && articlesRes.value.ok) {
      const data = await articlesRes.value.json();
      articles = data.results || [];
    } else {
      // Fallback: try without search
      try {
        const fallbackRes = await fetch(
          `${SPACEFLIGHT_NEWS_API}/articles/?limit=${limit}&offset=${offset}&ordering=-published_at`,
          { next: { revalidate: 300 } }
        );
        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          articles = data.results || [];
        }
      } catch {
        articles = [];
      }
    }

    if (nasaApodRes.status === "fulfilled" && nasaApodRes.value.ok) {
      nasaImages = await nasaApodRes.value.json();
    }

    // Map articles to a clean format
    const mappedArticles = articles.map((article) => ({
      id: String(article.id),
      title: article.title,
      excerpt: article.summary,
      category: detectCategory(article.title + " " + article.summary),
      author: article.news_site || "Space News",
      date: article.published_at,
      readTime: estimateReadTime(article.summary),
      image: article.image_url || null,
      url: article.url,
      source: article.news_site,
    }));

    return NextResponse.json({
      articles: mappedArticles,
      nasaImages: nasaImages.filter((img) => img.media_type === "image").slice(0, 3),
      total: articles.length,
    });
  } catch (error) {
    console.error("Space news fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news", articles: [], nasaImages: [] },
      { status: 500 }
    );
  }
}

function detectCategory(text: string): string {
  const lower = text.toLowerCase();
  if (/launch|rocket|spacecraft|liftoff|payload/.test(lower)) return "Launch";
  if (/mars|moon|lunar|asteroid|jupiter|venus|planet|europa|titan/.test(lower)) return "Exploration";
  if (/satellite|orbit|iss|station|crew/.test(lower)) return "Satellite";
  if (/aviation|aircraft|airbus|boeing|flight|airline/.test(lower)) return "Aviation";
  if (/nasa|esa|isro|spacex|blue origin|agency|mission/.test(lower)) return "Agency";
  if (/technology|ai|quantum|sensor|propulsion|engine/.test(lower)) return "Technology";
  return "Space";
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(2, Math.round(words / 200));
  return `${minutes} min`;
}

interface SpaceNewsArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
}

interface NasaApodItem {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  title: string;
  url: string;
  copyright?: string;
}
