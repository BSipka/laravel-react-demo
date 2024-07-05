import React from "react";
import axiosClient from "../../axiosClient";
import { json, useRouteLoaderData, redirect, Link } from "react-router-dom";
import TaskListItem from "../../components/TaskListItem";

export default function TaskListDetailPage() {
    const data = useRouteLoaderData("task-list-detail");

    return <TaskListItem item={data} />;
}

export async function loader({ params }) {
    const response = await axiosClient.get("/daily-lists/" + params.id);
    if (response.status != 200) {
        throw json({ message: "Not found", status: 500 });
    }
    return response.data;
}

export async function action({ params }) {
    const taskListId = params.id;

    const response = await axiosClient.delete(`/daily-lists/${taskListId}`);

    if (response.status != 200) {
        throw json({ message: "Delete failed!", status: 500 });
    }

    return redirect("/auth/daily-list");
}
