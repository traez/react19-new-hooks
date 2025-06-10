import type { Metadata } from "next";
import UseActionState from "@/components/UseActionState";
import CodeHighlighter from "@/lib/CodeHighlighter";

export const metadata: Metadata = {
  title: "useActionState - React19 Newhooks Fingerprintjs",
  description: "Created by Trae Zeeofor",
};

export default function UseActionStatePage() {
  const useActionStateCode = `"use client";
import { useActionState } from "react";
import { incrementLike } from "@/lib/actions";
//const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);

export default function UseActionState() {
  /* Example 1 - Like Counter */
  const [likes, likeCountAction, isPending] = useActionState<number, FormData>(
    incrementLike,
    0
  );

  return (
    <>
      <article>
        <div className="space-y-2">
          <p className="text-lg font-medium">Total Likes: {likes}</p>
          <form action={likeCountAction}>
            <button
              type="submit"
              disabled={isPending}
              className="border shadow bg-white p-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Like
            </button>
          </form>
        </div>
      </article>
    </>
  );
}`;

  const serverActionCode = `"use server";

export async function incrementLike(
  prevState: number,
  data: FormData
): Promise<number> {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(prevState + 1), 3000)
  );
}`;

  return (
    <div className="w-full h-auto bg-[#E6F7FF]">
      <section className="py-8 px-8 bg-[#E6F7FF] w-full max-w-[1440px] h-full  mx-auto ">
        <article className="bg-white shadow-xl rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-3">
            React useActionState Hook
          </h1>

          {/* Demo Section */}
          <div className="mb-8">
            <UseActionState />
          </div>

          {/* Overview Section */}
          <aside className="text-gray-700 my-8 border-y-2 border-gray-800 py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
              Overview
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The <code>useActionState</code> hook is a React 19 hook designed
                to handle form submissions and server actions with built-in
                state management. It provides an elegant way to manage pending
                states, form data, and action results without manually handling
                loading states or form resets.
              </p>
              <p>
                useActionState is cool, but React Hook Form + Zod is way more
                capable for anything beyond simple forms. You&apos;re not
                reinventing the wheel—you&apos;re using battle-tested tools that
                make your forms more maintainable, testable, and pleasant to
                work with.
              </p>
              <p>
                <strong>When to use useActionState:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Simple forms with server actions</li>
                <li>When you need built-in pending state management</li>
                <li>Forms that benefit from progressive enhancement</li>
                <li>Quick prototypes or simple CRUD operations</li>
              </ul>
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
                  Server Action
                </h3>
                <CodeHighlighter
                  language="typescript"
                  code={serverActionCode}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  UseActionState Component
                </h3>
                <CodeHighlighter
                  language="typescript"
                  code={useActionStateCode}
                />
              </div>
            </div>
          </section>

          {/* Explanation Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-purple-500 rounded mr-3"></div>
              How the useActionState Hook Works
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
                      <code>
                        const [likes, likeCountAction, isPending] =
                        useActionState&lt;number, FormData&gt;(incrementLike,
                        0);
                      </code>{" "}
                      initializes the hook with a server action function and an
                      initial state value of 0.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      2. Server Action Function
                    </h4>
                    <p className="text-sm">
                      <code>incrementLike</code> is a server action that
                      receives the previous state and form data, then returns a
                      promise that resolves to the new state after a 3-second
                      delay.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      3. Form Integration
                    </h4>
                    <p className="text-sm">
                      <code>{`<form action={likeCountAction}>`}</code> directly
                      connects the form to the action. When submitted, React
                      automatically calls the server action with the form data.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      4. Pending State Management
                    </h4>
                    <p className="text-sm">
                      <code>isPending</code> automatically tracks whether the
                      action is currently executing, allowing you to show
                      loading states and disable the form during submission.
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
                      ⚠️ Key Differences: useActionState vs Traditional Form
                      Handling
                    </h4>
                    <div className="text-sm text-orange-700 space-y-2">
                      <div>
                        <strong>useActionState:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Automatically manages pending states</li>
                          <li>Directly integrates with server actions</li>
                          <li>Handles form data serialization</li>
                          <li>Provides progressive enhancement</li>
                          <li>
                            Built-in error boundaries and state management
                          </li>
                        </ul>
                      </div>
                      <div>
                        <strong>Traditional approach:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Manual loading state management</li>
                          <li>Manual form data handling</li>
                          <li>
                            Requires separate state for errors and success
                          </li>
                          <li>More boilerplate code</li>
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
                      💡 Return Values of useActionState
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>
                        • <strong>State (likes):</strong> The current state
                        value, updated after each successful action
                      </li>
                      <li>
                        • <strong>Action (likeCountAction):</strong> The wrapped
                        action function to use with forms
                      </li>
                      <li>
                        • <strong>Pending (isPending):</strong> Boolean
                        indicating if the action is currently running
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
                      <li>• Use TypeScript generics for type safety</li>
                      <li>• Handle loading states with isPending</li>
                      <li>• Keep server actions simple and focused</li>
                      <li>• Consider error handling in server actions</li>
                      <li>• Use proper form validation for complex forms</li>
                      <li>
                        • Consider React Hook Form + Zod for advanced forms
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
