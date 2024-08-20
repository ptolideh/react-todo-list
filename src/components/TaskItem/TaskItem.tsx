import { Todo } from "@/lib/shared-types";
import * as React from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

type TaskItemProps = Todo & {
  onTaskCheck: () => void;
};

function TaskItem({ id, text, completed, onTaskCheck }: TaskItemProps) {
  return (
    <div className="flex items-start gap-2 w-full py-1 pr-3">
      <Checkbox
        id={id}
        value={id}
        checked={completed}
        onCheckedChange={onTaskCheck}
        className="mt-1"
      />
      <label
        htmlFor={id}
        className={cn({
          "text-slate-400 line-through": completed,
        })}
      >
        {text}
      </label>
    </div>
  );
}

export default TaskItem;
