import { ReactNode, useCallback, useState } from "react";
import TaskInput from "../TaskInput";
import TaskItem from "../TaskItem";
import { Todo } from "@/lib/shared-types";
import { todo } from "node:test";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleSubmitTodo = (todoText: string) => {
    const nextTodo = {
      id: crypto.randomUUID(),
      text: todoText,
      completed: false,
    };
    console.log(nextTodo);

    setTodos([...todos, nextTodo]);
  };

  const handleTaskCheck = useCallback(
    (targetId: string) => {
      const nextTodos = todos.map((todo) => {
        if (todo.id === targetId) {
          const nextTodo: Todo = { ...todo, completed: !todo.completed };
          return nextTodo;
        }
        return todo;
      });
      setTodos(nextTodos);
    },
    [todos]
  );

  return (
    <main className="container mx-auto">
      <div className="flex flex-col items-center justify-center h-screen ">
        <div
          id="todo-list-wrapper"
          className="w-1/2 border border-slate-100 p-4 rounded-md shadow"
        >
          <TaskInput onSubmitTodo={handleSubmitTodo} />
          {todos.map(({ id, text, completed }) => (
            <TaskItem
              key={id}
              id={id}
              text={text}
              completed={completed}
              onTaskCheck={handleTaskCheck}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
