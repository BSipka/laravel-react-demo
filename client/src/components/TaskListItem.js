import React from "react";
import { Link, useSubmit } from "react-router-dom";

export default function TaskListItem({ item }) {
    const submit = useSubmit();

    function startDelete() {
        const proceed = window.confirm("Are you sure?");
        if (proceed) {
            submit(null, { method: "delete" });
        }
    }
    return (
        <article>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <menu>
                <Link to="edit"> Edit </Link>
                <button onClick={startDelete}>Delete</button>
            </menu>
        </article>
    );
}
