import React from "react";
import { Form, NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function AuthNavigation(props) {
    return (
        <header className={classes.header}>
            <h3>{props.profile?.name}</h3>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            className={({ isActive }) => {
                                return isActive ? classes.active : undefined;
                            }}
                            end
                            to="/"
                        >
                            Profile
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            className={({ isActive }) => {
                                return isActive ? classes.active : undefined;
                            }}
                            end
                            to="/auth/daily-task-list"
                        >
                            Daily Task List
                        </NavLink>
                    </li>

                    <li>
                        <Form action="/auth/logout" method="post">
                            <button> Logout</button>
                        </Form>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default AuthNavigation;
