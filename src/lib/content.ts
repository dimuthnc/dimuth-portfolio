import { promises as fs } from "fs";
import path from "path";

export type Profile = {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  links: {
    linkedin: string;
    github: string;
  };
};

export async function loadProfile(): Promise<Profile> {
  const filePath = path.join(process.cwd(), "data", "profile.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = JSON.parse(raw) as Profile;
  return parsed;
}

export type BlogPostBase = {
  type: "internal" | "external";
  title: string;
  source: string;
  date: string; // ISO date string
  tags: string[];
  excerpt: string;
};

export type InternalBlogPost = BlogPostBase & {
  type: "internal";
  slug: string;
};

export type ExternalBlogPost = BlogPostBase & {
  type: "external";
  url: string;
};

export type BlogPost = InternalBlogPost | ExternalBlogPost;

export async function loadBlogs(): Promise<BlogPost[]> {
  const filePath = path.join(process.cwd(), "data", "blogs.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = JSON.parse(raw) as BlogPost[];
  // Optional: sort by date desc
  return parsed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Portfolio
export type ProjectBase = {
  kind: "site" | "repo";
  title: string;
  description: string;
  url: string;
  tags: string[];
  thumbnail?: string;
  date?: string; // ISO
  pinned?: boolean;
};

export type SiteProject = ProjectBase & {
  kind: "site";
  secondaryUrl?: string; // source
};

export type RepoProject = ProjectBase & {
  kind: "repo";
};

export type Project = SiteProject | RepoProject;

export async function loadProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw) as Project[];
    return parsed.sort((a, b) => {
      const ap = a.pinned ? 1 : 0;
      const bp = b.pinned ? 1 : 0;
      if (ap !== bp) return bp - ap;
      const ad = a.date ? new Date(a.date).getTime() : 0;
      const bd = b.date ? new Date(b.date).getTime() : 0;
      return bd - ad;
    });
  } catch {
    return [];
  }
}
