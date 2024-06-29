import React from "react";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    return (
        <>
            <main>{error.statusText}</main>
            <Link to="/" title="Go Home">
                Go Home
            </Link>
        </>
    );
}

export default ErrorPage;
