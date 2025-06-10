import type { Metadata } from "next";
import UseFormStatus from "@/components/UseFormStatus";
import CodeHighlighter from "@/lib/CodeHighlighter";

export const metadata: Metadata = {
  title: "useFormStatus - React19 Newhooks Fingerprintjs",
  description: "Created by Trae Zeeofor",
};

export default function UseFormStatusPage() {
  const useFormStatusCode = `"use client";
//const { pending, data, method, action } = useFormStatus();
import { useFormStatus } from "react-dom";
import { submitForm } from "@/lib/actions";

const SubmitButton: React.FC = () => {
  const { pending, data, method, action } = useFormStatus();

  return (
    <div className="space-y-4">
      <button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>

      {pending && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <p className="text-blue-800 font-medium">
            Form submission in progress...
          </p>
          <div className="text-sm text-blue-600 space-y-1">
            <p>
              <span className="font-medium">Method:</span> {method || "N/A"}
            </p>
            <p>
              <span className="font-medium">Action:</span>{" "}
              {typeof action === "function" ? "Server Action" : action || "N/A"}
            </p>
            {data && (
              <p>
                <span className="font-medium">Data being submitted:</span>{" "}
                {Array.from(data.entries())
                  .map(([key, value]) => \`\${key}=\${value}\`)
                  .join(", ")}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-blue-600">Processing...</span>
          </div>
        </div>
      )}
    </div>
  );
};

const UseFormStatus = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Contact Form
      </h2>

      <form action={submitForm} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  );
};

export default UseFormStatus;`;

  const serverActionCode = `"use server";

export async function submitForm(formData: FormData) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const username = formData.get("username") as string;
  const email = formData.get("email") as string;

  // Your server-side logic here
  console.log("Processing form:", { username, email });

  // You can return data, redirect, or handle errors
  // redirect('/success'); // if using next/navigation
  // return { success: true, message: 'Form submitted successfully!' };
}`;

  return (
    <div className="w-full h-auto bg-[#E6F7FF]">
      <section className="py-8 px-8 bg-[#E6F7FF] w-full max-w-[1440px] h-full  mx-auto ">
        <article className="bg-white shadow-xl rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-800 pb-3">
            React useFormStatus Hook
          </h1>

          {/* Demo Section */}
          <div className="mb-8">
            <UseFormStatus />
          </div>

          {/* Overview Section */}
          <aside className="text-gray-700 my-8 border-y-2 border-gray-800 py-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <div className="w-6 h-6 bg-blue-500 rounded mr-3"></div>
              Overview
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The <code>useFormStatus</code> hook is a React 19 hook that
                gives you status information of the last form submission. This
                hook is designed specifically for tracking the status of a form
                submission in React Server Components (RSC) or frameworks like
                Next.js.
              </p>
              <p>
                <strong>Syntax:</strong>{" "}
                <code>
                  const {"{ pending, data, method, action }"} = useFormStatus();
                </code>
              </p>
              <p>
                <strong>Important:</strong> The useFormStatus Hook must be
                called from a component that is rendered inside a{" "}
                <code>&lt;form&gt;</code>. It provides real-time information
                about the form's submission state without requiring manual state
                management.
              </p>
              <p>
                <strong>When to use useFormStatus:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To show loading states during form submission</li>
                <li>To access form data being submitted in real-time</li>
                <li>To disable form elements during submission</li>
                <li>
                  To provide detailed feedback about form submission progress
                </li>
                <li>
                  When working with server actions and need submission status
                </li>
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
                  UseFormStatus Component
                </h3>
                <CodeHighlighter
                  language="typescript"
                  code={useFormStatusCode}
                />
              </div>
            </div>
          </section>

          {/* Explanation Section */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <div className="w-6 h-6 bg-purple-500 rounded mr-3"></div>
              How the useFormStatus Hook Works
            </h2>

            <div className="space-y-6 text-gray-700">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Breaking Down the Example
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      1. Hook Usage in Child Component
                    </h4>
                    <p className="text-sm">
                      <code>
                        const {"{ pending, data, method, action }"} =
                        useFormStatus();
                      </code>{" "}
                      must be called inside a component that's rendered within a
                      form. In our example, the <code>SubmitButton</code>{" "}
                      component uses this hook to track the parent form's
                      submission status.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      2. Form Structure
                    </h4>
                    <p className="text-sm">
                      The parent form uses{" "}
                      <code>&lt;form action={"{submitForm}"}&gt;</code> to
                      connect with a server action. The{" "}
                      <code>SubmitButton</code> component is rendered inside
                      this form and can access its status.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      3. Real-time Status Tracking
                    </h4>
                    <p className="text-sm">
                      The hook automatically tracks when the form submission
                      starts and ends, providing <code>pending</code> state,
                      form <code>data</code>, HTTP <code>method</code>, and the{" "}
                      <code>action</code> being executed.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      4. Dynamic UI Updates
                    </h4>
                    <p className="text-sm">
                      The component uses the <code>pending</code> state to
                      disable the button, show loading text, and display
                      detailed submission information while the server processes
                      the request.
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
                      ⚠️ Key Differences: useFormStatus vs useActionState
                    </h4>
                    <div className="text-sm text-orange-700 space-y-2">
                      <div>
                        <strong>useFormStatus:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Must be used inside a form component</li>
                          <li>Provides read-only status information</li>
                          <li>
                            Tracks any form submission (not just specific
                            actions)
                          </li>
                          <li>Gives access to form data, method, and action</li>
                          <li>Perfect for UI status components</li>
                        </ul>
                      </div>
                      <div>
                        <strong>useActionState:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Can be used anywhere in the component</li>
                          <li>Manages state and provides action wrapper</li>
                          <li>Tied to a specific action function</li>
                          <li>Returns state and action dispatcher</li>
                          <li>Handles complete action lifecycle</li>
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
                      💡 Return Values of useFormStatus
                    </h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>
                        • <strong>pending:</strong> Boolean indicating if the
                        form submission is in progress
                      </li>
                      <li>
                        • <strong>data:</strong> FormData object containing the
                        data being submitted
                      </li>
                      <li>
                        • <strong>method:</strong> HTTP method being used for
                        the submission (usually "post")
                      </li>
                      <li>
                        • <strong>action:</strong> Reference to the action
                        function or URL being called
                      </li>
                    </ul>
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
                      🚨 Important Constraints
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>
                        • Must be called from a component rendered inside a
                        &lt;form&gt;
                      </li>
                      <li>
                        • Cannot be used in the same component that renders the
                        &lt;form&gt;
                      </li>
                      <li>• Only tracks the parent form's submission status</li>
                      <li>
                        • Returns null values when no form submission is active
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
                      <li>
                        • Create dedicated status components (like SubmitButton)
                      </li>
                      <li>
                        • Use pending state to disable form elements during
                        submission
                      </li>
                      <li>• Provide visual feedback with loading indicators</li>
                      <li>
                        • Display meaningful messages about submission progress
                      </li>
                      <li>
                        • Handle accessibility with aria-disabled attributes
                      </li>
                      <li>
                        • Combine with useActionState for complete form
                        management
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
 