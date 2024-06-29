import React, { useEffect, useState } from "react";
import { json, useLoaderData } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function DailyTaskListPage() {
    const data = useLoaderData();
    return (
        <ul id="daily-list">
            {data.daily_list.map((item) => {
                return <li key={item.id}>{item.title}</li>;
            })}
        </ul>
    );
}

export async function loader() {
    const taskList = await axiosClient.get("/daily-lists");
    if (taskList.status != 200) {
        throw json({ message: "Server error", status: 500 });
    }
    return taskList.data;
}
