import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import "./MarkdownPreview.scss";

interface Props {
  handleDesc: (text: string) => void;
}

const MarkdownEditor: React.FC<Props> = ({ handleDesc }) => {
  const mdParser = new MarkdownIt();

  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    handleDesc(text);
  };

  return (
    <div className="markdown-editor">
      <MdEditor
        style={{ height: "300px" }}
        view={{ menu: true, md: true, html: false }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default MarkdownEditor;
