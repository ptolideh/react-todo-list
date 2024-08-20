import { Todo } from "@/lib/shared-types";
import * as React from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type TaskItemProps = Todo & {
  onTaskCheck: () => void;
  onTaskDelete: () => void;
};

function TaskItem({
  id,
  text,
  completed,
  onTaskCheck,
  onTaskDelete,
}: TaskItemProps) {
  return (
    <div className="group flex items-center hover:bg-slate-50 transition-colors duration-200 cursor-pointer rounded-lg px-2">
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
          className={cn("cursor-pointer", {
            "text-slate-400 line-through": completed,
          })}
        >
          {text}
        </label>
      </div>
      <button
        aria-label="delete"
        onClick={onTaskDelete}
        className="p-1 rounded-full hover:bg-red-50 hidden group-hover:flex transition-all duration-200"
      >
        <X size={16} className="text-red-500" />
      </button>
    </div>
  );
}

export default TaskItem;
