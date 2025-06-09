import type { Metadata } from "next";
import UseTransition from "@/components/UseTransition";
import CodeHighlighter from "@/lib/CodeHighlighter";

export const metadata: Metadata = {
  title: "useTransition - React19 Newhooks Fingerprintjs",
  description: "Created by Trae Zeeofor",
};

export default function UseTransitionPage() {
  const useTransitionCode = `"use client";
import React, { useState, useTransition } from "react";

function App() {
  const [name, setName] = useState<string>("");
  const [lists, setLists] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const LIST_SIZE = 10000;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    startTransition(() => {
      const dataList: string[] = [];
      for (let i = 0; i < LIST_SIZE; i++) {
        dataList.push(value);
      }
      setLists(dataList);
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Type something..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="h-[400px] overflow-y-auto border rounded p-2 bg-white">
        {isPending ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          lists.map((list, index) => (
            <div key={index} className="text-sm text-gray-700">
              {list}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;`;

  return (
    <>
      <div className="w-full h-auto bg-[#E6F7FF]">
        <section className="py-8 px-8 bg-[#E6F7FF] w-full max-w-[1440px] h-full mx-auto">
          <article className="bg-white shadow-xl rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-3">
              React useTransition Hook
            </h1>

            {/* Demo Section */}
            <div className="mb-8">
              <UseTransition />
            </div>

            {/* Overview Section */}
            <aside className="text-gray-700 my-8 border-y-2 border-gray-800 py-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
                Overview
              </h2>
              <div className="leading-relaxed space-y-4">
                <p>
                  The useTransition hook is a powerful tool in React for
                  managing concurrent rendering and prioritizing updates. It
                  allows you to mark certain state updates as
                  &quot;transitions&quot; that can be interrupted by more urgent
                  updates, keeping your UI responsive during expensive
                  operations.
                </p>
                <p>
                  <strong>When to use useTransition:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    When you have state updates that might cause lag if they
                    block the UI
                  </li>
                  <li>
                    For non-urgent updates that can happen in the background
                  </li>
                  <li>
                    When you want to provide a smoother user experience for
                    interactions that trigger expensive computations
                  </li>
                  <li>
                    When rendering large lists or performing heavy calculations
                    based on user input
                  </li>
                </ul>
                <p className="text-amber-700 bg-amber-50 p-3 rounded border border-amber-200">
                  <strong>⚠️ Important:</strong> Use this hook sparingly. Only
                  use it when experiencing performance issues and other
                  optimization techniques aren&apos;t sufficient. Overuse can
                  actually hurt performance by preventing React from properly
                  batching updates.
                  <br />
                  <b>
                    It’s somewhat like the use API in functionality, and
                    likewise IMHO isn’t a very useful React feature overall.
                  </b>
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
                    UseTransition Component
                  </h3>
                  <CodeHighlighter
                    language="typescript"
                    code={useTransitionCode}
                  />
                </div>
              </div>
            </section>

            {/* Explanation Section */}
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-6 h-6 bg-purple-500 rounded mr-3"></div>
                How the useTransition Hook Works
              </h2>

              <div className="space-y-6 text-gray-700">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Breaking Down the Example
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">
                        1. Hook Initialization
                      </h4>
                      <p className="text-sm">
                        <code className="bg-gray-200 px-2 py-1 rounded">
                          const [isPending, startTransition] = useTransition();
                        </code>
                        <br />
                        Returns two values:{" "}
                        <code className="bg-gray-200 px-1 rounded">
                          isPending
                        </code>{" "}
                        (boolean indicating if transition is active) and{" "}
                        <code className="bg-gray-200 px-1 rounded">
                          startTransition
                        </code>{" "}
                        (function to mark updates as transitions).
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">
                        2. Urgent vs Non-Urgent Updates
                      </h4>
                      <p className="text-sm">
                        <code className="bg-gray-200 px-2 py-1 rounded">
                          setName(value);
                        </code>{" "}
                        - This update is urgent and happens immediately, keeping
                        the input responsive.
                        <br />
                        <br />
                        <code className="bg-gray-200 px-2 py-1 rounded">
                          startTransition(() =&gt; setLists(dataList));
                        </code>{" "}
                        - This update is wrapped in a transition, making it
                        non-urgent and interruptible.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">
                        3. Expensive Operation
                      </h4>
                      <p className="text-sm">
                        The example creates a large array (10,000 items) based
                        on user input. Without useTransition, this would block
                        the UI and make typing feel laggy. With useTransition,
                        the input remains responsive while the list updates in
                        the background.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">
                        4. Loading State
                      </h4>
                      <p className="text-sm">
                        <code className="bg-gray-200 px-2 py-1 rounded">
                          isPending
                        </code>{" "}
                        is used to show a loading indicator while the transition
                        is in progress, providing visual feedback to the user.
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
                        💡 Key Benefits Demonstrated
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>
                          • <strong>Responsive Input:</strong> Typing remains
                          smooth even during expensive operations
                        </li>
                        <li>
                          • <strong>Visual Feedback:</strong> Loading state
                          keeps users informed
                        </li>
                        <li>
                          • <strong>Interruptible Updates:</strong> New
                          keystrokes can interrupt previous list generations
                        </li>
                        <li>
                          • <strong>Priority Management:</strong> React
                          prioritizes urgent updates (input) over non-urgent
                          ones (list)
                        </li>
                        <li>
                          • <strong>Better UX:</strong> No UI blocking during
                          heavy computations
                        </li>
                      </ul>
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
                        ⚠️ What Happens Without useTransition
                      </h4>
                      <p className="text-sm text-orange-700">
                        Without wrapping the expensive list update in a
                        transition, every keystroke would:
                      </p>
                      <ul className="text-sm text-orange-700 list-disc pl-5 mt-2 space-y-1">
                        <li>Block the UI while creating 10,000 array items</li>
                        <li>Make typing feel laggy and unresponsive</li>
                        <li>Create a poor user experience</li>
                        <li>
                          Potentially cause the browser to show &quot;page
                          unresponsive&quot; warnings
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-green-800 mb-1">
                        ✅ Best Practices
                      </h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Only use for genuinely expensive operations</li>
                        <li>
                          • Keep urgent updates (user input) outside transitions
                        </li>
                        <li>• Use isPending to provide loading feedback</li>
                        <li>
                          • Test performance with and without useTransition
                        </li>
                        <li>
                          • Consider other optimization techniques first
                          (memoization, virtualization)
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
    </>
  );
}
