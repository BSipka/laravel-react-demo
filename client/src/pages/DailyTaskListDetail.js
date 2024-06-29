import React from "react";
import axiosClient from "../axiosClient";
import { json, useLoaderData } from "react-router-dom";

export default function DailyTaskListDetailPage() {
    const data = useLoaderData();

    return (
        <>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <ul>
                {data.tasks &&
                    data.tasks.map((item) => (
                        <li key={item.id}>{item.title}</li>
                    ))}
            </ul>
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
