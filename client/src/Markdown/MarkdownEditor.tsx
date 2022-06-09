import React, { useEffect } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import "./MarkdownPreview.scss";
import "./MarkdownEditor.scss";

interface Props {
  handleDesc: (text: string) => void;
  mdText: string;
}

const MarkdownEditor: React.FC<Props> = ({ handleDesc, mdText }) => {
  const mdParser = new MarkdownIt();

  useEffect(() => {
    document.querySelector("input[type=file]")?.setAttribute("tabindex", "-1");
  }, []);

  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    handleDesc(text);
  };

  return (
    <div className="markdown-editor">
      <MdEditor
        value={mdText}
        style={{ height: "300px" }}
        view={{ menu: true, md: true, html: false }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default MarkdownEditor;
