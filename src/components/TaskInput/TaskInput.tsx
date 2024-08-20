import * as React from "react";
import { Input, InputProps } from "../ui/input";
import { cn } from "@/lib/utils";

type TaskInputProps = InputProps & {
  onSubmitTodo: (val: string) => void;
};

function TaskInput({
  onSubmitTodo,
  className = "",
  ...delegatedProps
}: TaskInputProps) {
  const [value, setValue] = React.useState("");

  const handlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitTodo(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handlSubmit}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          className,
          "border-slate-500 focus-visible:ring-orange-500"
        )}
        {...delegatedProps}
      />
    </form>
  );
}

export default TaskInput;
