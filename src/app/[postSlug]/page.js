import { loadBlogPost } from "@/helpers/file-helpers";

import { MDXRemote } from "next-mdx-remote/rsc";

import styles from "./postSlug.module.css";

export async function generateMetadata({ params }) {
  const { postSlug } = params;

  const post = await loadBlogPost(postSlug);

  const { frontmatter } = post;

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

import BlogHero from "@/components/BlogHero";

async function BlogPost({ params }) {
  const { postSlug } = params;

  const post = await loadBlogPost(postSlug);

  const { frontmatter, content } = post;

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
