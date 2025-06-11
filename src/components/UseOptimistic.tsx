/* 
Syntax = const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);

the value of optimisticTodos comes from initialState (on first render)
setOptimisticTodos() tells React to run optimisticUpdateFn() with this action/parameters. it's a  temporary UI-only update. setTodos() is the real confirmed state that happens after successful API call.
*/
"use client";
import React, { useState, useTransition, useOptimistic } from "react";
import { toast } from "sonner";

type Todo = string;

const fakeApiCallToAddTodo = (todo: Todo): Promise<void> =>
  new Promise((resolve, reject) => {
    console.log("API received todo:", todo);
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve();
      } else {
        reject(new Error("API Error"));
      }
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
    const newTodo = `New Todo ${Date.now()}`;
    const toastId = toast.loading("Adding todo...");

    startTransition(() => {
      setOptimisticTodos({ type: "add", todo: newTodo });
    });

    try {
      await fakeApiCallToAddTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      toast.success("Todo added successfully!", { id: toastId });
    } catch  {
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
        className={`w-full py-2 px-4 rounded text-white ${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isPending ? "Adding..." : "Add Todo"}
      </button>
    </div>
  );
}
