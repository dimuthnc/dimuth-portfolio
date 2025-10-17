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
