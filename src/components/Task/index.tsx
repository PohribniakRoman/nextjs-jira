"use client";
import { Task } from "@/storage/models/Tasks";
import { User } from "@/storage/models/Users";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { postReq } from "../Menu";

export const TaskComponent = ({
  task,
  handleOpen1,
  status,
}: {
  task: Task;
  handleOpen1: Function;
  status: string;
}) => {
  const [{ assignee }, setAssignee] = useState<{ assignee: User | null }>({
    assignee: null,
  });

  useEffect(() => {
    (async () => {
      const data = await postReq("getUserData", {
        AssigneeID: task.AssigneeID,
        CreatorID: task.CreatorID,
      });
      setAssignee(data);
    })();
  }, [task]);

  return (
    task.status.toLowerCase() === status.toLowerCase() && (
      <li
        key={task.TaskID}
        className="dashboard__tab--item"
        onClick={() => handleOpen1(task)}
        onDragStart={(e) => {
          e.dataTransfer.setData("Text", task.TaskID);
        }}
        draggable={true}
      >
        <h3>{task.title}</h3>
        <div className="dashboard__tab--item-bage">
          {task.priority === "Low" && <MdKeyboardArrowDown fill="orange" />}
          {task.priority === "Medium" && (
            <MdKeyboardArrowUp fill="lightgreen" />
          )}
          {task.priority === "High" && <MdKeyboardDoubleArrowUp fill="blue" />}
        </div>
        <p>
          {task.description
            .replace(/(?:<(\/?))[\w\s"():,=;-]*(?:>)/gi, " ")
            .slice(0, 32)
            .trim() + "..."}
        </p>
        <b style={{ fontSize: "12px", marginTop: "10px" }}>
          Assignee:
          {assignee?.name} {assignee?.surname}
        </b>
        <i>Estimate {moment(+task.estimate).fromNow()}</i>
      </li>
    )
  );
};
