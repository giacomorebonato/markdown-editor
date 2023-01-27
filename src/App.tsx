import { useState } from "react";
import { MarkdownEditor } from "./markdown-editor";

function App() {
  const [text, setText] = useState("# Description");

  return (
    <div>
      <MarkdownEditor value={text} onChange={setText} isDisabled={false} />
    </div>
  );
}

export default App;
