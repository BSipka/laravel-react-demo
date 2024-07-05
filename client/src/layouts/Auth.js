import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

import { json } from "react-router-dom";
import axiosClient from "../axiosClient";
import AuthNavigation from "../components/AuthNavigation";
import classes from "./Auth.module.css";
import { AuthContext } from "../context/AuthContext";

function AuthLayout() {
    const profileData = useContext(AuthContext).profile;

    return (
        <>
            <main className={classes.main}>
                <AuthNavigation profile={profileData} />
                <Outlet />
            </main>
        </>
    );
}

export default AuthLayout;

export async function loader() {
    const response = await axiosClient.get("/auth-check");
    if (response.status != 200) {
        throw json({
            statusText: response.statusText,
            status: response.status,
        });
    }

    const profile = localStorage.getItem("profile");
    if (!profile) {
        localStorage.setItem("profile", JSON.stringify(response.data));
    }

    return null;
}
