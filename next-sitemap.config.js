/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://psgpraveen.me",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*", "/admin/*", "/_next/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 0,
      },
    ],
    additionalSitemaps: ["https://psgpraveen.me/sitemap.xml"],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customPriorities = {
      "/": { priority: 1.0, changefreq: "daily" },
      "/Component/comment": { priority: 0.9, changefreq: "weekly" },
      "/Component/project": { priority: 0.9, changefreq: "weekly" },
      "/Contact": { priority: 0.8, changefreq: "monthly" },
      "/Project": { priority: 0.9, changefreq: "weekly" },
    };

    const customConfig = customPriorities[path] || {};

    return {
      loc: path,
      changefreq: customConfig.changefreq || config.changefreq,
      priority: customConfig.priority || config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
