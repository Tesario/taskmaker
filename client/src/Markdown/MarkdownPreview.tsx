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
        components={{
          h1: ({ children }: { children: React.ReactChildren }) => (
            <div className="title">{children}</div>
          ),
          h2: ({ children }: { children: React.ReactChildren }) => (
            <div className="subtitle">{children}</div>
          ),
          h3: ({ children }: { children: React.ReactChildren }) => (
            <div className="subtitle-3">{children}</div>
          ),
          h4: ({ children }: { children: React.ReactChildren }) => (
            <div className="subtitle-4">{children}</div>
          ),
          h5: ({ children }: { children: React.ReactChildren }) => (
            <div className="subtitle-5">{children}</div>
          ),
          h6: ({ children }: { children: React.ReactChildren }) => (
            <div className="subtitle-6">{children}</div>
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
