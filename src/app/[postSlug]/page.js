import { loadBlogPost } from "@/helpers/file-helpers";

import { PostMDX } from "@/components/PostMDX";

import styles from "./postSlug.module.css";

import BlogHero from "@/components/BlogHero";
import { BLOG_TITLE } from "@/constants";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { postSlug } = params;

  const post = await loadBlogPost(postSlug);

  if (!post) {
    return notFound();
  }

  const { frontmatter } = post;

  return {
    title: `${frontmatter.title} · ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = params;

  const post = await loadBlogPost(postSlug);

  if (!post) {
    return notFound();
  }

  const { frontmatter, content } = post;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <PostMDX source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
