import { getBlogPostList } from "@/helpers/file-helpers";

import RSS from "rss";

import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/constants";

export async function GET(request) {
  const protocol = request.headers["x-forwarded-proto"] || "https";
  const host = request.headers.host;
  const baseUrl = `${protocol}://${host}`;

  console.log("baseUrl", baseUrl);

  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: `${baseUrl}/rss.xml`,
    site_url: baseUrl,
    image_url: `${baseUrl}/favicon.ico`,
    managingEditor: "My Name",
    webMaster: "My Name",
    language: "en",
    pubDate: new Date().toUTCString(),
    ttl: "60",
  });

  const posts = await getBlogPostList();

  const items = [];

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.abstract,
      url: `${baseUrl}/${post.slug}`,
      guid: post.slug,
      date: post.publishedOn,
    });
  });

  const xml = feed.xml();

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=UTF-8" },
  });
}
