import React from "react";
import {
    Form,
    useNavigate,
    useNavigation,
    useActionData,
} from "react-router-dom";

export default function TaskListForm({ method, taskList }) {
    const actionData = useActionData();
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmiting = navigation.state === "submitting";

    function cancelHandler() {
        navigate("..");
    }

    return (
        <Form method={method}>
            {actionData && actionData.data.errors && (
                <ul>
                    {Object.values(actionData.data.errors).map((err) => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
            )}
            <p>
                <label>Title</label>
                <input
                    name="title"
                    type="text"
                    defaultValue={taskList ? taskList.title : ""}
                />
            </p>
            <p>
                <label>Description</label>
                <input
                    name="description"
                    type="text"
                    defaultValue={taskList ? taskList.description : ""}
                />
            </p>
            <p>
                <button
                    disabled={isSubmiting}
                    type="button"
                    onClick={cancelHandler}
                >
                    {isSubmiting ? "Submiting ..." : "Cancel"}
                </button>
                <button disabled={isSubmiting}>
                    {isSubmiting ? "Submiting ..." : "Save"}
                </button>
            </p>
        </Form>
    );
}
