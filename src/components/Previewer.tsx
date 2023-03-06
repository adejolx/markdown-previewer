import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { marked } from "marked";
import DOMPurify from "dompurify";

type PreviewProps = {
  input: string;
};

export default function Previewer({ input }: PreviewProps) {
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      const highlighted = hljs.highlight(code, {
        language,
        ignoreIllegals: true,
      }).value;
      return highlighted.replace(/({\w+})/g, '<code class="hljs">$1</code>');
    },
    langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartypants: false,
    xhtml: false,
  });

  // This extends marked's `renderer` method
  marked.use({
    renderer: {
      link(href, title, text) {
        return `<a target="_blank" href="${href}">${text}</a>`;
      },
    },
  });

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(DOMPurify.sanitize(input)),
        }}
      ></div>
    </>
  );
}
