import { loadProjects } from "@/lib/content";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const dynamic = "force-static";

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

