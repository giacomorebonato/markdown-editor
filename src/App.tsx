import { useState } from "react";
import { MarkdownEditor } from "./markdown-editor";

function App() {
  const [text, setText] = useState("# Description");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <a
        target="_blank"
        href="https://github.com/giacomorebonato/markdown-editor"
      >
        Github
      </a>
      <MarkdownEditor value={text} onChange={setText} isDisabled={false} />
    </div>
  );
}

export default App;
