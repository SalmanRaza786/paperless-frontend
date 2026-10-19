/**
 * Site-wide configuration and metadata constants.
 */
export const siteConfig = {
  name: "Paperless",
  description: "Modern, scalable document and workflow management system.",
  links: {
    docs: "/docs",
    api: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  },
} as const;

export type SiteConfig = typeof siteConfig;
