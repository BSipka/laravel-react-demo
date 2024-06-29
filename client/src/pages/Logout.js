import { json, redirect } from "react-router-dom";
import axiosClient from "../axiosClient";
export async function action() {
    const response = await axiosClient.post("/destroy-token");

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (response.status != 200) {
        throw json({ message: "Logout failed" }, { status: 500 });
    }

    localStorage.removeItem("token");
    localStorage.removeItem("profile");

    return redirect("/");
}
