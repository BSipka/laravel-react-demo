import React, { useState } from "react";

const profileData = JSON.parse(localStorage.getItem("profile"));

export const AuthContext = React.createContext({ profile: [] });

export default (props) => {
    const [profile, setProfile] = useState(profileData);
    return (
        <AuthContext.Provider
            value={{ profile: profile, setProfile: setProfile }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
