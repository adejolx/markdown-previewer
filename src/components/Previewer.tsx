import hljs from "highlight.js";
import { marked } from "marked";

type PreviewProps = {
  input: string;
};

export default function Previewer({ input }: PreviewProps) {
  hljs.configure({ cssSelector: "code" });
  hljs.highlightAll();

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
    langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartypants: false,
    xhtml: false,
  });

  return (
    <>
      <div
        style={{ wordBreak: "break-word" }}
        dangerouslySetInnerHTML={{ __html: marked.parse(input) }}
      ></div>
    </>
  );
}
