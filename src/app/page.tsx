//import Image from "next/image";
import CodeHighlighter from "@/lib/CodeHighlighter";

{
  /* <Image
  className="dark:invert"
  src="/next.svg"
  alt="Next.js logo"
  width={180}
  height={38}
  priority
/>; */
}

export default function Home() {
  const sampleCode = `
  function greet() {
    console.log("Hello, Trae!");
  }
  `;

  const anotherCode = `
  const add = (a: number, b: number): number => {
    return a + b;
  };
  `;

  return (
    <>
      <section className="flex-col items-center justify-between py-4 px-8 bg-white w-full min-h-[calc(100vh-84.96px)] mx-auto">
        <h1>Trae Zeeofor</h1>
        {/* First code block */}
        <CodeHighlighter language="typescript" code={sampleCode} />
        <CommandHelpBlock />
        {/* Second code block */}
        <CodeHighlighter language="typescript" code={anotherCode} />
      </section>
    </>
  );
}

const CommandHelpBlock: React.FC = () => {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-950 rounded-xl shadow-md space-y-6 h-auto">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Terminal Commands & Shortcuts
      </h2>

      <pre className="bg-gray-900 text-gray-200 p-6 rounded-lg overflow-x-auto text-sm leading-relaxed font-mono space-y-4">
        <code>
          <div>
            🚀 To start the development server, run{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-green-400">
              npm run dev
            </code>
          </div>

          <div>
            🔧 To build for production, use{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-yellow-400">
              npm run build
            </code>
          </div>

          <div>
            🔄 Reload your app with{" "}
            <kbd className="bg-gray-700 px-1.5 py-0.5 rounded text-xs uppercase tracking-wide text-white">
              Ctrl
            </kbd>{" "}
            +{" "}
            <kbd className="bg-gray-700 px-1.5 py-0.5 rounded text-xs uppercase tracking-wide text-white">
              R
            </kbd>
          </div>

          <div>
            📁 Navigate to your project folder with{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">
              cd my-app
            </code>
          </div>

          <div>
            💡 To create a new component, type:{" "}
            <code className="bg-gray-800 px-2 py-1 rounded text-purple-400">
              touch src/components/MyComponent.tsx
            </code>
          </div>
        </code>
      </pre>

      <p className="text-gray-700 dark:text-gray-300 text-sm">
        Tip: Keyboard keys like{" "}
        <kbd className="bg-gray-200 text-xs px-1 py-0.5 rounded border border-gray-400 font-mono">
          Ctrl
        </kbd>{" "}
        or{" "}
        <kbd className="bg-gray-200 text-xs px-1 py-0.5 rounded border border-gray-400 font-mono">
          Alt
        </kbd>{" "}
        can be shown inline using the{" "}
        <code className="bg-gray-100 px-1 rounded">&lt;kbd&gt;</code> tag.
      </p>

      <div className=" container">Trae</div>
    </section>
  );
};
