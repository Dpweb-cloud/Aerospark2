"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard, SectionHeader, Badge } from "@/components/ui/cards";
import { BLOG_POSTS } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Clock,
  User,
  ArrowUpRight,
  BookOpen,
  TrendingUp,
} from "lucide-react";

const categories = ["All", ...new Set(BLOG_POSTS.map((b) => b.category))];

const categoryColors: Record<string, "blue" | "red" | "green" | "default"> = {
  Regulatory: "blue",
  Engineering: "red",
  Technology: "green",
  Industry: "blue",
  Manufacturing: "default",
};

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered =
    selectedCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((b) => b.category === selectedCategory);

  const featured = BLOG_POSTS[0];

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="py-16 relative">
          <div className="absolute inset-0 radar-grid opacity-40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <SectionHeader
              label="// Insights"
              title="Aerospace Intelligence"
              description="Expert analysis, industry trends, and technical deep-dives from the aerospace engineering community."
            />
          </div>
        </section>

        {/* Featured Post */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard
              className="relative overflow-hidden group cursor-pointer"
              glow="blue"
              padding="lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative h-64 lg:h-72 rounded-xl bg-gradient-to-br from-aero-blue/10 via-surface-elevated to-aero-red/10 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TrendingUp className="w-16 h-16 text-aero-blue/15" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="blue">Featured</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <Badge variant={categoryColors[featured.category] || "default"}>
                    {featured.category}
                  </Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-aero-blue transition-colors tracking-tight">
                    {featured.title}
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                    <span>
                      {mounted ? new Date(featured.date).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }) : featured.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-aero-blue text-sm font-medium pt-2 group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-aero-blue/15 text-aero-blue border border-aero-blue/25"
                    : "bg-surface-elevated text-text-secondary border border-border-subtle hover:text-foreground hover:border-border-default"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((post) => (
              <motion.div key={post.id} variants={staggerItem}>
                <GlassCard
                  className="h-full flex flex-col group cursor-pointer"
                  glow="blue"
                >
                  {/* Thumbnail */}
                  <div className="relative h-44 rounded-lg bg-gradient-to-br from-surface-elevated to-surface mb-4 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-aero-blue/10" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={categoryColors[post.category] || "default"}
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1419] to-transparent opacity-60" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-aero-blue transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                      <div className="flex items-center gap-3 text-xs text-text-muted">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author.split(" ")[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-aero-blue transition-colors" />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
