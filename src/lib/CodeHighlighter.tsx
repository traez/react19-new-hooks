"use client";
import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.min.css";

interface CodeHighlighterProps {
  language: string;
  code: string;
}

export default function CodeHighlighter({
  language,
  code,
}: CodeHighlighterProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      try {
        // Use hljs.highlight() instead of hljs.highlightElement()
        const highlighted = hljs.highlight(code, { language });
        codeRef.current.innerHTML = highlighted.value;
      } catch {
        // Fallback to auto-detection if language is not recognized
        const highlighted = hljs.highlightAuto(code);
        codeRef.current.innerHTML = highlighted.value;
      }
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative mx-auto">
      <pre className="whitespace-pre">
        <code ref={codeRef} className={`hljs ${language}`}>
          {/* Content will be set by useEffect */}
        </code>
      </pre>

      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-700 transition"
        aria-label="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

/* 
How to see all available styles:
You can check your node_modules/highlight.js/styles/ folder in your project, or just browse the Highlight.js GitHub repo here:
https://github.com/highlightjs/highlight.js/tree/main/src/styles

  whitespace-normal 
  and
  whitespace-pre interchange for extra spacing control etc
*/