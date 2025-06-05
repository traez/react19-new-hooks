import UseAPI from "@/components/UseAPI";
import { Suspense } from "react";

export default function UsePage() {
  return (
    <div className="w-full h-auto bg-[#E6F7FF]">
      <section className="py-8 px-8  bg-[#E6F7FF] w-full max-w-[1440px] h-full  mx-auto ">
        <article className="bg-white shadow-xl rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-3">
            React 19 use() Hook
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
                React 19 introduces use(), a new API that lets you pause
                component rendering until a Promise resolves — no useEffect, no
                useState, and no manual loading logic needed. It integrates
                seamlessly with{" "}
                <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                  &lt;Suspense&gt;
                </code>{" "}
                to handle async data fetching declaratively.
              </p>
              <div>
                <p className="font-semibold mb-2">
                  ⚙️ How It Works (from Your Example):
                </p>
                <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm border">
                  <div>const message = use(fetchMessage());</div>
                  <div>const user = use(fetchUser());</div>
                </div>
              </div>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Rendering pauses until each Promise resolves.</li>
                <li>
                  The{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                    &lt;Suspense&gt;
                  </code>{" "}
                  wrapper shows a fallback (Loading async data...) while
                  waiting.
                </li>
                <li>
                  Once resolved, the data is available immediately — no extra
                  state or re-renders.
                </li>
              </ul>
            </div>
          </aside>

          {/* Enhanced Code Example Section */}
          <section className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded mr-3 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                Code Implementation
              </h2>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  React 19
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  TypeScript
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm font-mono">
                      UseAPI.tsx
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                    Copy
                  </button>
                </div>
                <div className="p-4 bg-gray-50 font-mono text-sm text-gray-700 overflow-x-auto">
                  <div className="space-y-1">
                    <div>
                      <span className="text-blue-600">import</span>{" "}
                      <span className="text-purple-600">{`use`}</span>{" "}
                      <span className="text-blue-600">from</span>{" "}
                      <span className="text-green-600">&apos;react&apos;</span>;
                    </div>
                    <div className="mt-2">
                      <span className="text-blue-600">const</span>{" "}
                      <span className="text-gray-800">message</span> ={" "}
                      <span className="text-purple-600">use</span>(
                      <span className="text-gray-800">fetchMessage</span>());
                    </div>
                    <div>
                      <span className="text-blue-600">const</span>{" "}
                      <span className="text-gray-800">user</span> ={" "}
                      <span className="text-purple-600">use</span>(
                      <span className="text-gray-800">fetchUser</span>());
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Source Code Files
                  </h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                        /src/app/use/page.tsx
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                        /src/components/UseAPI.tsx
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Key Benefits
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• No useState needed</li>
                    <li>• No useEffect required</li>
                    <li>• Automatic error boundaries</li>
                    <li>• Built-in loading states</li>
                  </ul>
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
                      💡 Pro Tip
                    </h4>
                    <p className="text-sm text-blue-700">
                      The{" "}
                      <code className="bg-blue-100 px-1 rounded font-mono">
                        use()
                      </code>{" "}
                      hook works best when wrapped with Suspense boundaries for
                      optimal user experience and error handling.
                    </p>
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
