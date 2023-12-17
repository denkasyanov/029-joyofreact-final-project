import { MDXRemote } from "next-mdx-remote/rsc";

import { Code } from "bright";

const components = {
  pre: (props) => <Code {...props}>{props.children}</Code>,
};

export function PostMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
