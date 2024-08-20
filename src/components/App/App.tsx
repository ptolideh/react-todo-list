import { ReactNode, useCallback, useEffect, useReducer, useState } from "react";
import TaskInput from "../TaskInput";
import TaskItem from "../TaskItem";
import { Todo } from "@/lib/shared-types";

const LOCAL_STORAGE_KEY = "todos" as const;

type Reducer<T> = (
  state: T,
  action:
    | { type: "ADD_TODO"; text: string }
    | { type: "TOGGLE_TODO"; todoId: string }
) => T;

const todoReducer: Reducer<Todo[]> = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) => {
        if (todo.id === action.todoId) {
          const nextTodo: Todo = { ...todo, completed: !todo.completed };
          return nextTodo;
        }
        return todo;
      });
    default:
      return state;
  }
};

function App() {
  const [todos, dispatch] = useReducer(todoReducer, null, () => {
    // load from localstorage
    const json: string | null = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (json !== null) {
      return JSON.parse(json) as Todo[];
    }
    return [];
  });

  useEffect(() => {
    const json = JSON.stringify(todos);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, json);
  }, [todos]);

  return (
    <main className="container mx-auto bg-orange-100">
      <div className="flex flex-col items-center justify-center h-screen ">
        <div
          id="todo-list-wrapper"
          className="w-1/2 border border-slate-100 p-4 rounded-md shadow space-y-2 bg-white"
        >
          <h1 className="italic">What needs to be done?</h1>
          <TaskInput
            onSubmitTodo={(text) => dispatch({ type: "ADD_TODO", text })}
          />
          {todos.map(({ id, text, completed }) => (
            <TaskItem
              key={id}
              id={id}
              text={text}
              completed={completed}
              onTaskCheck={() => dispatch({ type: "TOGGLE_TODO", todoId: id })}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
