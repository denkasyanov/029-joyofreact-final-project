import { MDXRemote } from "next-mdx-remote/rsc";

import CodeSnippet from "@/components/CodeSnippet";

import dynamic from "next/dynamic";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);

const components = {
  pre: (props) => <CodeSnippet {...props}>{props.children}</CodeSnippet>,
  DivisionGroupsDemo: (props) => <DivisionGroupsDemo {...props} />,
};

export function PostMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}