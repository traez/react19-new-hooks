import type { Metadata } from "next";
import UseAPI from "@/components/UseAPI";
import { Suspense } from "react";
import CodeHighlighter from "@/lib/CodeHighlighter";

export const metadata: Metadata = {
  title: "useAPI - React19 Newhooks Fingerprintjs",
  description: "Created by Trae Zeeofor",
};

export default function UsePage() {
  const pageCode = `import { Suspense } from "react";
import Greeting from "./Greeting";

export default function Page() {
  return (
    <main>
      <h1>React 19: use() Demo</h1>
      <Suspense fallback={<p>Loading message...</p>}>
        <Greeting />
      </Suspense>
    </main>
  );
}`;

  const greetingCode = `'use client';

import { use } from "react";

function fetchGreeting(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello from the future!");
    }, 2000);
  });
}

export default function Greeting() {
  const message = use(fetchGreeting());

  return <p>{message}</p>;
}`;

  return (
    <div className="w-full h-auto bg-[#E6F7FF]">
      <section className="py-8 px-8  bg-[#E6F7FF] w-full max-w-[1440px] h-full  mx-auto ">
        <article className="bg-white shadow-xl rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-3">
            React 19 use API
          </h1>

          {/* Demo Section */}
          <div className="mb-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="ml-3 text-gray-600 font-medium">
                    Loading async data...
                  </span>
                </div>
              }
            >
              <UseAPI />
            </Suspense>
          </div>

          {/* Overview Section */}
          <aside className="text-gray-700 my-8 border-y-2 border-gray-800 py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
              Overview
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                React 19 introduces <code>use</code>, a new API that lets you
                pause component rendering until a Promise resolves—no
                <code>useEffect</code>, no <code>useState</code>, and no manual
                loading logic needed. It integrates seamlessly with{" "}
                <code>{`<Suspense>`}</code> to handle async data fetching
                declaratively. The main goal of the new <code>use</code> API is
                to simplify handling loading and error states during data
                retrieval.
              </p>
              <p>
                However, in Next.js, this isn't as effective. Since pages are
                server-rendered, the page won't render until the data fetching
                is complete, which leaves no opportunity for the fallback UI to
                display.
              </p>
            </div>
          </aside>

          {/* Code Examples Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded mr-3"></div>
              Code Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  /app/page.tsx
                </h3>
                <CodeHighlighter language="typescript" code={pageCode} />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  /app/Greeting.tsx
                </h3>
                <CodeHighlighter language="typescript" code={greetingCode} />
              </div>
            </div>
          </section>

          {/* Explanation Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-purple-500 rounded mr-3"></div>
              How the use() Hook Works
            </h2>

            <div className="space-y-6 text-gray-700">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Breaking Down the Example
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      1. The Main Page Setup
                    </h4>
                    <p className="text-sm">
                      In <code>/app/page.tsx</code>, we wrap our{" "}
                      <code>&lt;Greeting&gt;</code> component with{" "}
                      <code>&lt;Suspense&gt;</code>. This is crucial because the{" "}
                      <code>use()</code> hook will suspend rendering while
                      waiting for the promise to resolve.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      2. The Async Function
                    </h4>
                    <p className="text-sm">
                      <code>fetchGreeting()</code> returns a Promise that
                      resolves after 2 seconds with "Hello from the future!".
                      This simulates a real API call or database query.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      3. The Magic of use()
                    </h4>
                    <p className="text-sm">
                      <code>const message = use(fetchGreeting());</code> - This
                      single line pauses the component's rendering until the
                      promise resolves. No useState, no useEffect, no loading
                      state management needed!
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      4. The User Experience
                    </h4>
                    <p className="text-sm">
                      While waiting, users see "Loading message..." (the
                      Suspense fallback). Once resolved, the component renders
                      with the actual message.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-blue-500 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-blue-800 mb-1">
                      💡 Key Advantages
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>
                        • <strong>Simplified code:</strong> No useState or
                        useEffect needed for async operations
                      </li>
                      <li>
                        • <strong>Declarative loading:</strong> Suspense handles
                        loading states automatically
                      </li>
                      <li>
                        • <strong>Error handling:</strong> Errors are caught by
                        nearest error boundary
                      </li>
                      <li>
                        • <strong>Conditional usage:</strong> Unlike other
                        hooks, use() can be called conditionally
                      </li>
                      <li>
                        • <strong>Direct value access:</strong> Get resolved
                        data immediately without state management
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </section>
    </div>
  );
}
