import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import TaskListForm from "../../components/TaskListForm";

export default function TaskListEditPage() {
    const data = useRouteLoaderData("task-list-detail");
    return <TaskListForm taskList={data} />;
}
