import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import "./MarkdownPreview.scss";
import { useTheme } from "../ThemeProvider";

interface Props {
  desc: string | undefined;
  preview?: true;
}

const MarkdownPreview: React.FC<Props> = ({ desc, preview }) => {
  const messageRef = useRef<HTMLSpanElement>(null);
  const themeContext = useTheme();

  const onCopyCode = (children: any) => {
    navigator.clipboard.writeText(children[0].props.children[0]);
    if (messageRef.current) {
      messageRef.current.innerText = "Copied";
    }
  };

  const onButtonHover = () => {
    if (messageRef.current) {
      messageRef.current.innerText = "Click to copy";
    }
  };

  return (
    <div className={`markdown-preview ${preview && "preview"} ${themeContext}`}>
      {preview && <div className="preview-label">Preview</div>}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="react-markdown"
        components={{
          h1: ({ children }: { children: any }) => (
            <div className="title">{children}</div>
          ),
          h2: ({ children }: { children: any }) => (
            <div className="subtitle">{children}</div>
          ),
          h3: ({ children }: { children: any }) => (
            <div className="subtitle-3">{children}</div>
          ),
          h4: ({ children }: { children: any }) => (
            <div className="subtitle-4">{children}</div>
          ),
          h5: ({ children }: { children: any }) => (
            <div className="subtitle-5">{children}</div>
          ),
          h6: ({ children }: { children: any }) => (
            <div className="subtitle-6">{children}</div>
          ),
          p: ({ children }: { children: any }) => (
            <span className="paragraph">{children}</span>
          ),
          a: (props: { href: string; children: any }) => (
            <a href={props.href} target="_blank" rel="noreferrer">
              {props.children}
            </a>
          ),
          pre: ({ children }: { children: any }) => (
            <span className="code">
              <button
                type="button"
                className="btn btn-copy"
                onClick={() => onCopyCode(children)}
                onMouseEnter={onButtonHover}
              >
                <span className="message" ref={messageRef}>
                  Click to copy
                </span>
                <FontAwesomeIcon icon={faCopy} />
              </button>
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
