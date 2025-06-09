"use client";
import { useState, useRef } from "react";

export default function UseRef() {
  const countRef = useRef<number>(0);
  const [renderCount, setRenderCount] = useState<number>(0);

  function handleClick() {
    countRef.current = countRef.current + 1;
    console.log(
      `You clicked ${countRef.current} times! (Rendered ${renderCount} times)`
    );
  }

  function handleRender() {
    setRenderCount((prev) => prev + 1);
    console.log(`You clicked "Force Render" ${renderCount} times`);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-auto bg-gray-100 p-4">
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
              <li>First check browser console for output</li>
              <li>
                Ref value persists between renders without causing re-renders
              </li>
              <li>Click &ldquo;Increment Ref&ldquo; to update the ref value</li>
              <li>
                Click &ldquo;Force Render&ldquo; to see that ref value persists
              </li>
              <li>Ref changes don&apos;t trigger component re-renders</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
