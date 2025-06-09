import type { Metadata } from "next";
import UseRef from "@/components/UseRef";
import CodeHighlighter from "@/lib/CodeHighlighter";

export const metadata: Metadata = {
  title: "useRef - React19 Newhooks Fingerprintjs",
  description: "Created by Trae Zeeofor",
};

export default function UseRefPage() {
  const useRefCode = `"use client";
import { useState, useRef, useEffect } from "react";

export default function UseRef() {
  const countRef = useRef<number>(0);
  const [renderCount, setRenderCount] = useState<number>(0);

  function handleClick() {
    countRef.current = countRef.current + 1;
    console.log(
      \`You clicked \${countRef.current} times! (Rendered \${renderCount} times)\`
    );
  }

  function handleRender() {
    setRenderCount((prev) => prev + 1);
    console.log(\`You clicked "Force Render" \${renderCount} times\`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          useRef Demonstration
        </h1>

        <p className="text-gray-600 mb-2">
          Ref value:{" "}
          <span className="font-mono font-bold">{countRef.current}</span>
        </p>
        <p className="text-gray-600 mb-4">
          Component renders:{" "}
          <span className="font-mono font-bold">{renderCount}</span>
        </p>

        <div className="flex space-x-4">
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Increment Ref
          </button>

          <button
            onClick={handleRender}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Force Render
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h2 className="font-semibold text-gray-700 mb-2">
            How this works:
          </h2>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>
              Ref value persists between renders without causing re-renders
            </li>
            <li>Click "Increment Ref" to update the ref value</li>
            <li>Click "Force Render" to see that ref value persists</li>
            <li>Ref changes don't trigger component re-renders</li>
          </ul>
        </div>
      </div>
    </div>
  );
}`;

  return (
    <div className="w-full h-auto bg-[#E6F7FF]">
      <section className="py-8 px-8 bg-[#E6F7FF] w-full max-w-[1440px] h-full  mx-auto ">
        <article className="bg-white shadow-xl rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-3">
            React useRef Hook
          </h1>

          {/* Demo Section */}
          <div className="mb-8">
            <UseRef />
          </div>

          {/* Overview Section */}
          <aside className="text-gray-700 my-8 border-y-2 border-gray-800 py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
              Overview
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The <code>useRef</code> hook is a fundamental React hook that
                returns a mutable ref object whose <code>.current</code>{" "}
                property is initialized to the passed argument. The returned
                object will persist for the full lifetime of the component.
                Unlike state variables, updating a ref doesn&apos;t trigger a
                re-render, making it perfect for storing values that need to
                persist between renders but don&apos;t affect the UI directly.
              </p>
              <p>
                The most common use cases include accessing DOM elements
                directly, storing mutable values that don&apos;t require
                re-renders (like timers, counters, or previous values), and
                keeping references to functions or objects that should remain
                stable across renders.
              </p>
            </div>
          </aside>

          {/* Code Examples Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded mr-3"></div>
              Code Example
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  UseRef Component
                </h3>
                <CodeHighlighter language="typescript" code={useRefCode} />
              </div>
            </div>
          </section>

          {/* Explanation Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-purple-500 rounded mr-3"></div>
              How the useRef Hook Works
            </h2>

            <div className="space-y-6 text-gray-700">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Breaking Down the Example
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      1. Creating the Ref
                    </h4>
                    <p className="text-sm">
                      <code>const countRef = useRef&lt;number&gt;(0);</code>{" "}
                      creates a ref object with an initial value of 0. This ref
                      will persist across component re-renders without causing
                      them.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      2. State for Render Tracking
                    </h4>
                    <p className="text-sm">
                      <code>
                        const [renderCount, setRenderCount] =
                        useState&lt;number&gt;(0);
                      </code>{" "}
                      creates a state variable to track how many times the
                      component has rendered. Unlike the ref, updating this
                      state will trigger re-renders.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      3. Updating the Ref
                    </h4>
                    <p className="text-sm">
                      <code>countRef.current = countRef.current + 1;</code>{" "}
                      updates the ref value directly. Notice how this
                      doesn&apos;t cause a re-render—the component only
                      re-renders when state changes.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      4. Demonstrating Persistence
                    </h4>
                    <p className="text-sm">
                      The &ldquo;Force Render&ldquo; button updates the state to
                      trigger a re-render, proving that the ref value persists
                      between renders while the render count increases.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-orange-500 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-orange-800 mb-1">
                      ⚠️ Key Differences: useRef vs useState
                    </h4>
                    <div className="text-sm text-orange-700 space-y-2">
                      <div>
                        <strong>useRef:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            Returns a mutable object with a .current property
                          </li>
                          <li>Doesn&lsquo;t trigger re-renders when updated</li>
                          <li>
                            Perfect for storing mutable values, DOM references,
                            or timers
                          </li>
                          <li>Value persists between renders</li>
                        </ul>
                      </div>
                      <div>
                        <strong>useState:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Returns a value and a setter function</li>
                          <li>Triggers re-renders when updated</li>
                          <li>Used for data that affects the UI</li>
                          <li>Value persists between renders</li>
                        </ul>
                      </div>
                    </div>
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
                      💡 Common Use Cases for useRef
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>
                        • <strong>DOM Element Access:</strong> Getting direct
                        access to DOM elements (focus, scroll, etc.)
                      </li>
                      <li>
                        • <strong>Storing Mutable Values:</strong> Counters,
                        flags, or data that doesn&lsquo;t need to trigger
                        renders
                      </li>
                      <li>
                        • <strong>Previous Values:</strong> Keeping track of
                        previous props or state values
                      </li>
                      <li>
                        • <strong>Timers & Intervals:</strong> Storing timer IDs
                        for cleanup purposes
                      </li>
                      <li>
                        • <strong>Avoiding Stale Closures:</strong> Ensuring
                        callbacks have access to current values
                      </li>
                      <li>
                        • <strong>Performance Optimization:</strong> Storing
                        expensive computations or objects
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
