import React from "react";
import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import axios from "axios";

function AuthenticationPage() {
    return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
    const data = await request.formData();

    const authData = {
        email: data.get("email"),
        password: data.get("password"),
    };

    const response = await axios.post(
        "http://localhost:8000/api/generate-token",
        authData
    );

    if (response.status === 422 || response.status === 401) {
        return response;
    }

    if (response.status != 201) {
        throw json({ message: "Login failed" }, { status: 500 });
    }

    const token = response.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("profile", JSON.stringify(response.data));

    return redirect("/auth");
}
