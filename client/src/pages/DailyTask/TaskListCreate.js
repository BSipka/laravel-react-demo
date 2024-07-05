import React from "react";
import TaskListForm from "../../components/TaskListForm";
import axiosClient from "../../axiosClient";
import { json, redirect } from "react-router-dom";

export default function TaskListCreate() {
    return <TaskListForm method="POST" />;
}

export async function action({ request, params }) {
    const data = await request.formData();
    const payload = {
        title: data.get("title"),
        description: data.get("description"),
    };
    const response = await axiosClient.post("/daily-lists", payload);

    if (response.status != 201) {
        throw json({ message: "Submit failed", status: 500 });
    }

    return redirect("/auth/daily-list");
}
