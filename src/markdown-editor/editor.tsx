import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { exampleTheme } from "./themes/example-theme";

import AutoLinkPlugin from "./plugins/auto-link-plugin";
import CodeHighlightPlugin from "./plugins/code-highlight-plugin";
import ListMaxIndentLevelPlugin from "./plugins/list-max-indent-level-plugin";
import OnChangeMarkdown from "./plugins/on-change-markdown";
import ReadOnlyPlugin from "./plugins/read-only-plugin";
import ToolbarPlugin from "./plugins/toolbar-plugin";
import "./styles.css";

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

type EditorProps = {
  isDisabled?: boolean;
  onChange: (text: string) => void;
  value: string;
};

export default function Editor(props: EditorProps) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "markdown-editor",
        // The editor theme
        theme: exampleTheme,
        // Handling of errors during update
        onError(error: Error) {
          throw error;
        },
        // Any custom nodes go here
        nodes: [
          HeadingNode,
          ListNode,
          ListItemNode,
          QuoteNode,
          CodeNode,
          CodeHighlightNode,
          TableNode,
          TableCellNode,
          TableRowNode,
          AutoLinkNode,
          LinkNode,
        ],
      }}
    >
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            ErrorBoundary={LexicalErrorBoundary}
            placeholder={<Placeholder />}
          />

          <HistoryPlugin />

          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <OnChangeMarkdown
            onChange={props.onChange}
            transformers={TRANSFORMERS}
          />
          <ReadOnlyPlugin isDisabled={props.isDisabled} />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
