import React, { useEffect } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { useTheme } from "../ThemeProvider";
import { handleValueFunc } from "../components/Buttons/EditButton";

import "react-markdown-editor-lite/lib/index.css";
import "./MarkdownPreview.scss";
import "./MarkdownEditor.scss";

interface Props {
  handleValue: handleValueFunc;
  mdText: string;
}

const MarkdownEditor: React.FC<Props> = ({
  handleValue: handleDesc,
  mdText,
}) => {
  const mdParser = new MarkdownIt();
  const themeContext = useTheme();

  useEffect(() => {
    document.querySelector("input[type=file]")?.setAttribute("tabindex", "-1");
  }, []);

  const handleEditorChange = ({ text }: { html: string; text: string }) => {
    handleDesc("desc", text);
  };

  return (
    <div className={`markdown-editor ${themeContext}`}>
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
