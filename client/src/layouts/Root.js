import React from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { getAuthToken } from "../util/auth";
import { json, redirect } from "react-router-dom";

function RootLayout() {
    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;

export async function loader() {
    const token = getAuthToken();

    if (token) {
        return redirect("/auth");
    }

    return json({ message: "Ok" });
}
