import React from "react";
import { Link, json, useLoaderData } from "react-router-dom";
import axiosClient from "../../axiosClient";
import TaskListItem from "../../components/TaskListItem";

export default function TaskListPage() {
    const data = useLoaderData();

    return (
        <>
            {data.daily_list.length === 0 ? (
                <p>No current items</p>
            ) : (
                <ul id="daily-list">
                    {data.daily_list.map((item) => (
                        <li key={item.id}>
                            <article>
                                <Link to={`/auth/daily-list/${item.id}`}>
                                    {item.title}
                                </Link>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export async function loader() {
    const taskList = await axiosClient.get("/daily-lists");
    if (taskList.status != 200) {
        throw json({ message: "Server error", status: 500 });
    }
    return taskList.data;
}
