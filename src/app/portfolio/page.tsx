import { loadProjects } from "@/lib/content";
import { PortfolioGrid } from "@/components/portfolio-grid";
import type { Metadata } from "next";
import { canonical, defaultOgImage } from "@/lib/seo";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Portfolio";
  const description = "Apps, tools, and repositories I’ve built or contributed to.";
  const url = canonical("/portfolio");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${title} — Dimuth Menikgamage`,
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description, images: [defaultOgImage] },
  };
}

export default async function PortfolioPage() {
  const projects = await loadProjects();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Portfolio</h1>
        <p className="text-sm text-muted-foreground">Apps, tools, and repositories I’ve built or contributed to.</p>
      </div>
      <PortfolioGrid projects={projects} />
    </div>
  );
}
