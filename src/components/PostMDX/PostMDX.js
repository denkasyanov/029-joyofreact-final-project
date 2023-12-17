import { MDXRemote } from "next-mdx-remote/rsc";

import CodeSnippet from "@/components/CodeSnippet";

const components = {
  pre: (props) => <CodeSnippet {...props}>{props.children}</CodeSnippet>,
};

export function PostMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
