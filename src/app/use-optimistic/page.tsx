import type { Metadata } from "next";
import UseOptimistic from "@/components/UseOptimistic";
import CodeHighlighter from "@/lib/CodeHighlighter";

export const metadata: Metadata = {
  title: "useOptimistic - React19 Newhooks Fingerprintjs",
  description: "Created by Trae Zeeofor",
};

export default function UseOptimisticPage() {
  const useOptimisticCode = `"use client";
import React, { useState, useTransition, useOptimistic } from "react";
import { toast } from "sonner";

type Todo = string;

const fakeApiCallToAddTodo = (todo: Todo): Promise<void> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3 ? resolve() : reject(new Error("API Error"));
    }, 2000);
  });

function optimisticUpdateFn(
  todos: Todo[],
  action: { type: string; todo: Todo }
): Todo[] {
  if (action.type === "add") {
    return [...todos, action.todo];
  }
  if (action.type === "remove") {
    return todos.filter((t) => t !== action.todo);
  }
  return todos;
}

export default function UseOptimistic() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isPending, startTransition] = useTransition();
  const [optimisticTodos, setOptimisticTodos] = useOptimistic<
    Todo[],
    { type: string; todo: Todo }
  >(todos, optimisticUpdateFn);

  const handleAddTodo = async () => {
    const newTodo = \`New Todo \${Date.now()}\`;
    const toastId = toast.loading("Adding todo...");

    startTransition(() => {
      setOptimisticTodos({ type: "add", todo: newTodo });
    });

    try {
      await fakeApiCallToAddTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      toast.success("Todo added successfully!", { id: toastId });
    } catch (error) {
      // Rollback the optimistic update
      startTransition(() => {
        setOptimisticTodos({ type: "remove", todo: newTodo });
      });
      toast.error("Failed to add todo. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow bg-white">
      <h1 className="text-xl font-semibold mb-4">Todo List</h1>

      <ul className="mb-4">
        {optimisticTodos.map((todo, index) => (
          <li key={index} className="p-2 border-b last:border-none">
            {todo}
          </li>
        ))}
        {optimisticTodos.length === 0 && (
          <li className="p-2 text-gray-500">No todos yet</li>
        )}
      </ul>

      <button
        onClick={handleAddTodo}
        disabled={isPending}
        className={\`w-full py-2 px-4 rounded text-white \${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }\`}
      >
        {isPending ? "Adding..." : "Add Todo"}
      </button>
    </div>
  );
}`;

  const optimisticUpdateFunctionCode = `// The optimistic update function defines how to update state optimistically
function optimisticUpdateFn(
  todos: Todo[],
  action: { type: string; todo: Todo }
): Todo[] {
  if (action.type === "add") {
    return [...todos, action.todo];
  }
  if (action.type === "remove") {
    return todos.filter((t) => t !== action.todo);
  }
  return todos;
}

// Usage with useOptimistic hook
const [optimisticTodos, setOptimisticTodos] = useOptimistic<
  Todo[],
  { type: string; todo: Todo }
>(todos, optimisticUpdateFn);`;

  return (
    <div className="w-full h-auto bg-[#E6F7FF]">
      <section className="py-8 px-8 bg-[#E6F7FF] w-full max-w-[1440px] h-full mx-auto">
        <article className="bg-white shadow-xl rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-3">
            React useOptimistic Hook
          </h1>

          {/* Demo Section */}
          <div className="mb-8">
            <UseOptimistic />
          </div>

          {/* Overview Section */}
          <div className="text-gray-700 my-8 border-y-2 border-gray-800 py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
              Overview
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The <code>useOptimistic</code> hook is a React 19 hook that
                allows you to show a different state while an async action is
                happening. This hook enables optimistic UI updates, where the UI
                immediately reflects the expected result of an action before the
                server confirms it.
              </p>
              <p>
                <strong>Syntax:</strong>{" "}
                <code>
                  const [optimisticState, addOptimistic] = useOptimistic(state,
                  updateFn);
                </code>
              </p>
              <p>
                <strong>How it works:</strong> The hook takes your current state
                and an update function. When you call <code>addOptimistic</code>
                , it immediately updates the UI with the optimistic state, while
                your actual async operation runs in the background. If the
                operation succeeds, you update the real state. If it fails, the
                optimistic state automatically reverts.
              </p>
              <p>
                <strong>When to use useOptimistic:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  To provide instant feedback for user actions (like adding
                  todos, likes, comments)
                </li>
                <li>To improve perceived performance of your application</li>
                <li>
                  When you want to show the expected result before server
                  confirmation
                </li>
                <li>
                  For operations that are likely to succeed but may occasionally
                  fail
                </li>
                <li>
                  When combined with useTransition for non-blocking updates
                </li>
              </ul>
            </div>
          </div>

          {/* Code Examples Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded mr-3"></div>
              Code Example
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Optimistic Update Function
                </h3>
                <CodeHighlighter
                  language="typescript"
                  code={optimisticUpdateFunctionCode}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Complete UseOptimistic Component
                </h3>
                <CodeHighlighter
                  language="typescript"
                  code={useOptimisticCode}
                />
              </div>
            </div>
          </section>

          {/* Explanation Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-purple-500 rounded mr-3"></div>
              How the useOptimistic Hook Works
            </h2>

            <div className="space-y-6 text-gray-700">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Breaking Down the Example
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      1. Hook Setup and State Management
                    </h4>
                    <p className="text-sm">
                      <code>
                        const [optimisticTodos, setOptimisticTodos] =
                        useOptimistic(todos, optimisticUpdateFn);
                      </code>
                      creates an optimistic version of your todos state. The{" "}
                      <code>optimisticTodos</code> value starts with the same
                      value as <code>todos</code> but can be temporarily
                      different during optimistic updates.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      2. Optimistic Update Function
                    </h4>
                    <p className="text-sm">
                      The <code>optimisticUpdateFn</code> defines how to
                      transform the current state when an optimistic update
                      occurs. It receives the current state and an action, then
                      returns the new optimistic state. This function is pure
                      and should not have side effects.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      3. Triggering Optimistic Updates
                    </h4>
                    <p className="text-sm">
                      When{" "}
                      <code>{`setOptimisticTodos({type: "add", todo: newTodo})`}</code>{" "}
                      is called inside
                      <code>startTransition</code>, React immediately updates{" "}
                      <code>optimisticTodos</code>
                      using the update function, while the actual API call runs
                      in the background.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      4. Success and Error Handling
                    </h4>
                    <p className="text-sm">
                      On success, we update the real <code>todos</code> state
                      with <code>setTodos</code>. On failure, we can rollback by
                      calling <code>setOptimisticTodos</code> with a remove
                      action. The optimistic state automatically syncs with the
                      real state.
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
                      💡 Parameters and Return Values
                    </h4>
                    <div className="text-sm text-blue-700 space-y-2">
                      <div>
                        <strong>Parameters:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            <strong>state:</strong> The current real state
                            (todos in our example)
                          </li>
                          <li>
                            <strong>updateFn:</strong> Pure function that takes
                            (currentState, action) and returns new optimistic
                            state
                          </li>
                        </ul>
                      </div>
                      <div>
                        <strong>Returns:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>
                            <strong>optimisticState:</strong> The current
                            optimistic state to display in UI
                          </li>
                          <li>
                            <strong>addOptimistic:</strong> Function to trigger
                            optimistic updates with an action
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-red-500 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-red-800 mb-1">
                      🚨 Important Considerations & Best Practices
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>
                        • The optimistic state reverts to real state
                        automatically on re-render
                      </li>
                      <li>
                        • Update function must be pure - no side effects or
                        mutations
                      </li>
                      <li>
                        • Always handle both success and failure cases in your
                        async operations
                      </li>
                      <li>
                        • Use with useTransition to avoid blocking the UI during
                        updates
                      </li>
                      <li>
                        • Optimistic updates should be reversible in case of
                        failure
                      </li>
                      <li>
                        • Combine with useTransition for better performance and
                        user experience
                      </li>
                      <li>
                        • Implement proper error handling and rollback
                        mechanisms
                      </li>
                      <li>
                        • Use meaningful loading states and feedback messages
                      </li>
                      <li>
                        • Keep optimistic update functions simple and
                        predictable
                      </li>
                      <li>
                        • Provide visual indicators to distinguish optimistic vs
                        confirmed states
                      </li>
                      <li>
                        • Test both success and failure scenarios thoroughly
                      </li>
                      <li>
                        • Consider using toast notifications for operation
                        feedback
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-purple-500 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-purple-800 mb-1">
                      🎯 Common Use Cases
                    </h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>
                        • Adding/removing items from lists (todos, shopping
                        cart, etc.)
                      </li>
                      <li>
                        • Like/unlike buttons and social media interactions
                      </li>
                      <li>• Real-time chat message sending</li>
                      <li>• Form submissions with immediate feedback</li>
                      <li>• Toggling favorites, bookmarks, or preferences</li>
                      <li>• Collaborative editing with conflict resolution</li>
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
