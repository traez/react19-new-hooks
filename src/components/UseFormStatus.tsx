"use client";
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
                  .map(([key, value]) => `${key}=${value}`)
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

export default UseFormStatus;
