"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader, Badge } from "@/components/ui/cards";
import {
  Clock,
  ExternalLink,
  Globe,
  Rocket,
  Satellite,
  Telescope,
  Plane,
  Cpu,
  RefreshCw,
  Search,
  ChevronRight,
  Star,
  Radio,
  X,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string | null;
  url: string;
  source: string;
}

interface NasaImage {
  date: string;
  explanation: string;
  title: string;
  url: string;
  copyright?: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "All News", icon: Globe },
  { id: "launch", label: "Launches", icon: Rocket },
  { id: "exploration", label: "Exploration", icon: Telescope },
  { id: "satellite", label: "Satellites", icon: Satellite },
  { id: "aviation", label: "Aviation", icon: Plane },
  { id: "technology", label: "Technology", icon: Cpu },
];

// Map article categories to Badge variants used by the rest of the site
const CATEGORY_BADGE: Record<string, "blue" | "orange" | "green" | "red" | "default"> = {
  Launch: "orange",
  Exploration: "blue",
  Satellite: "green",
  Aviation: "blue",
  Agency: "red",
  Technology: "green",
  Space: "default",
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function ArticleCard({
  article,
  featured = false,
  index = 0,
}: {
  article: NewsArticle;
  featured?: boolean;
  index?: number;
}) {
  const [imgError, setImgError] = useState(false);
  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleReadArticle = () => {
    window.open(article.url, "_blank", "noopener,noreferrer");
  };

  const badgeVariant = CATEGORY_BADGE[article.category] ?? "default";

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="group relative rounded-2xl overflow-hidden border border-border-default bg-surface backdrop-blur-sm hover:border-aero-blue/30 transition-all duration-500 cursor-pointer"
        onClick={handleReadArticle}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[300px]">
          {/* Image */}
          <div className="lg:col-span-3 relative overflow-hidden bg-surface-elevated">
            {article.image && !imgError ? (
              <>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={() => setImgError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/20" />
              </>
            ) : (
              <div className="flex items-center justify-center h-64 lg:h-full">
                <Rocket className="w-20 h-20 text-aero-blue/10" />
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge variant="blue">✦ Featured</Badge>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-center gap-4">
            <Badge variant={badgeVariant}>{article.category}</Badge>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground leading-tight group-hover:text-aero-blue transition-colors duration-300 line-clamp-3">
              {article.title}
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span className="flex items-center gap-1.5">
                <Radio className="w-3 h-3" />
                {article.source}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {formattedDate}
              </span>
            </div>
            <button
              className="mt-2 w-fit flex items-center gap-2 px-5 py-2.5 rounded-lg bg-aero-blue/10 border border-aero-blue/20 text-aero-blue text-sm font-medium hover:bg-aero-blue/15 hover:border-aero-blue/35 transition-all duration-200 group/btn"
              onClick={handleReadArticle}
            >
              Read Full Article
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group relative rounded-xl overflow-hidden border border-border-subtle bg-surface hover:border-border-default hover:bg-surface-elevated transition-all duration-300 cursor-pointer flex flex-col card-hover"
      onClick={handleReadArticle}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-surface-elevated flex-shrink-0">
        {article.image && !imgError ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Rocket className="w-10 h-10 text-aero-blue/10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-surface/10 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant={badgeVariant}>{article.category}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 group-hover:text-aero-blue transition-colors duration-200 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 flex-1 mb-4">
          {article.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
          <div className="flex items-center gap-2 text-[11px] text-text-muted">
            <span className="flex items-center gap-1">
              <Radio className="w-2.5 h-2.5" />
              {article.source}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {formattedDate}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-text-muted group-hover:text-aero-blue transition-colors">
            Read
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function NasaApodCard({ image, index }: { image: NasaImage; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative rounded-xl overflow-hidden cursor-pointer border border-border-subtle hover:border-aero-blue/30 transition-all duration-300 bg-surface"
        onClick={() => setOpen(true)}
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/85 via-surface/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Star className="w-3 h-3 text-aero-red" fill="currentColor" />
            <span className="text-[10px] font-bold tracking-widest text-aero-red uppercase">
              NASA APOD
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
            {image.title}
          </p>
          {image.copyright && (
            <p className="text-[10px] text-text-muted mt-1">© {image.copyright}</p>
          )}
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-1.5 rounded-lg glass-panel">
            <ExternalLink className="w-3.5 h-3.5 text-foreground" />
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/30 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-border-default bg-surface shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full glass-panel text-text-secondary hover:text-foreground transition-colors"
                onClick={() => setOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
              <img src={image.url} alt={image.title} className="w-full max-h-80 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-1.5 mb-3">
                  <Star className="w-3.5 h-3.5 text-aero-red" fill="currentColor" />
                  <span className="text-[10px] font-bold tracking-widest text-aero-red uppercase">
                    NASA Astronomy Picture of the Day
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{image.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-5">
                  {image.explanation}
                </p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-subtle">
                  <span className="text-xs text-text-muted">
                    {new Date(image.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  {image.copyright && (
                    <span className="text-xs text-text-muted">© {image.copyright}</span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-border-subtle animate-pulse">
      <div className="h-44 bg-surface-elevated" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-surface-hover rounded w-1/3" />
        <div className="h-4 bg-surface-hover rounded w-full" />
        <div className="h-4 bg-surface-hover rounded w-4/5" />
        <div className="h-3 bg-surface-elevated rounded w-2/3 mt-2" />
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function InsightsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [nasaImages, setNasaImages] = useState<NasaImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchNews = useCallback(
    async (category: string, isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/space-news?category=${category}&limit=24&offset=0`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setArticles(data.articles || []);
        setNasaImages(data.nasaImages || []);
        setLastUpdated(new Date());
      } catch (err) {
        setError("Unable to load news. Please check your connection.");
        console.error(err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchNews(selectedCategory);
  }, [selectedCategory, fetchNews]);

  const filteredArticles = articles.filter(
    (a) =>
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-20">

        {/* ── Header ── */}
        <section className="py-16 relative">
          <div className="absolute inset-0 radar-grid opacity-40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <SectionHeader
              label="Insights"
              title="Space Intelligence"
              description="Real-time aerospace & space news from agencies, missions, and discoveries worldwide — powered by NASA & global sources."
            />
            {lastUpdated && (
              <p className="text-xs text-text-muted text-center mt-4">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* ── NASA APOD Section ── */}
          {nasaImages.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-aero-red" fill="currentColor" />
                  <span className="text-sm font-bold text-foreground tracking-wide">
                    NASA Astronomy Pictures
                  </span>
                </div>
                <div className="flex-1 section-divider" />
                <span className="text-xs text-text-muted">Click to explore</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nasaImages.map((img, i) => (
                  <NasaApodCard key={img.date} image={img} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* ── Search + Category Filter ── */}
          <section className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-elevated border border-border-subtle text-sm text-foreground placeholder-text-muted focus:outline-none focus:border-border-default focus:bg-surface-hover transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 flex-1">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
                      active
                        ? "bg-aero-blue/10 border-aero-blue/25 text-aero-blue"
                        : "bg-surface-elevated border-border-subtle text-text-secondary hover:border-border-default hover:text-foreground hover:bg-surface-hover"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Refresh */}
            <button
              onClick={() => fetchNews(selectedCategory, true)}
              disabled={refreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium border border-border-subtle bg-surface-elevated text-text-secondary hover:text-foreground hover:border-border-default transition-all disabled:opacity-40"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </section>

          {/* ── Error State ── */}
          {error && (
            <div className="rounded-xl border border-aero-red/20 bg-aero-red/5 p-6 text-center">
              <p className="text-aero-red text-sm">{error}</p>
              <button
                onClick={() => fetchNews(selectedCategory)}
                className="mt-3 px-4 py-2 rounded-lg bg-aero-red/10 border border-aero-red/20 text-aero-red text-xs hover:bg-aero-red/15 transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ── Loading Skeletons ── */}
          {loading && (
            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden border border-border-subtle animate-pulse h-72 bg-surface-elevated" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          )}

          {/* ── Content ── */}
          {!loading && !error && (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Results count */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-muted">
                    {filteredArticles.length} articles from around the world
                  </span>
                  <div className="flex-1 section-divider" />
                </div>

                {/* Featured article */}
                {featuredArticle && (
                  <ArticleCard article={featuredArticle} featured />
                )}

                {/* Grid */}
                {gridArticles.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gridArticles.map((article, i) => (
                      <ArticleCard key={article.id} article={article} index={i} />
                    ))}
                  </div>
                )}

                {/* Empty state */}
                {filteredArticles.length === 0 && (
                  <div className="text-center py-20">
                    <Telescope className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-30" />
                    <p className="text-text-muted text-sm">No articles found</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="mt-3 text-xs text-aero-blue hover:text-aero-blue/80 transition-colors"
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
