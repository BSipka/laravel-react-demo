import React from "react";
import axiosClient from "../axiosClient";
import { json, useLoaderData } from "react-router-dom";

export default function DailyTaskListDetailPage() {
    const data = useLoaderData();

    return (
        <>
            <div>Daily Task List Details</div>
        </>
    );
}

export async function loader({ params }) {
    const response = await axiosClient.get("/daily-list/" + params.id);
    if (response.status != 200) {
        throw json({ message: "Not found", status: response.status });
    }
    return response.data;
}
