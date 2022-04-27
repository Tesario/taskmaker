import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./MarkdownPreview.scss";

interface Props {
  desc: string | undefined;
  preview?: true;
}

const MarkdownPreview: React.FC<Props> = ({ desc, preview }) => {
  return (
    <div className={`markdown-preview ${preview && "preview"}`}>
      {preview && <div className="preview-label">Preview</div>}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="react-markdown"
        disallowedElements={["h3", "h4", "h5", "h6"]}
        components={{
          h1: ({ children }: { children: React.ReactChildren }) => (
            <div className="title">{children}</div>
          ),
          h2: ({ children }: { children: React.ReactChildren }) => (
            <div className="subtitle">{children}</div>
          ),
          p: ({ children }: { children: React.ReactChildren }) => (
            <span className="paragraph">{children}</span>
          ),
          a: (props: { href: string; children: React.ReactChildren }) => (
            <a href={props.href} target="_blank" rel="noreferrer">
              {props.children}
            </a>
          ),
          pre: ({ children }: { children: React.ReactChildren }) => (
            <span className="code">
              <pre>{children}</pre>
            </span>
          ),
          table: ({ children }: { children: React.ReactChildren }) => (
            <div className="table-wrapper">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {desc}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
