import { getBlogPostList } from "@/helpers/file-helpers";

import RSS from "rss";

import { AUTHOR, BLOG_DESCRIPTION, BLOG_TITLE } from "@/constants";

export async function GET(request) {
  const baseUrl = request.nextUrl.origin;

  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: `${baseUrl}/rss.xml`,
    site_url: baseUrl,
    image_url: `${baseUrl}/favicon.ico`,
    managingEditor: AUTHOR,
    webMaster: AUTHOR,
    language: "en",
    pubDate: new Date().toUTCString(),
    ttl: "60",
  });

  const posts = await getBlogPostList();

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
