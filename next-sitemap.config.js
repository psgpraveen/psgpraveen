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
      // Homepage - highest priority
      "/": { priority: 1.0, changefreq: "daily" },
      
      // Main sections - very high priority
      "/Project": { priority: 0.95, changefreq: "weekly" },
      "/Contact": { priority: 0.9, changefreq: "monthly" },
      "/Component/comment": { priority: 0.9, changefreq: "weekly" },
      "/Component/project": { priority: 0.95, changefreq: "weekly" },
      "/Component/skill": { priority: 0.9, changefreq: "monthly" },
      "/Component/MyService": { priority: 0.9, changefreq: "monthly" },
      "/Component/carousel": { priority: 0.8, changefreq: "monthly" },
      
      // Project pages - high priority for SEO
      "/ROBO": { priority: 0.95, changefreq: "monthly" },
      "/Tesla": { priority: 0.95, changefreq: "monthly" },
      "/Ldr": { priority: 0.95, changefreq: "monthly" },
      
      // Other components
      "/Component/feedback": { priority: 0.85, changefreq: "monthly" },
      "/Component/Header": { priority: 0.7, changefreq: "monthly" },
      "/Component/Footer": { priority: 0.7, changefreq: "monthly" },
      "/Component/Phone": { priority: 0.75, changefreq: "monthly" },
      "/Component/status": { priority: 0.7, changefreq: "daily" },
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
