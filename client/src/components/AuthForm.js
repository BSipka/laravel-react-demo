import React from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";

function AuthForm() {
    const data = useActionData();
    const navigation = useNavigation();
    const isSubmiting = navigation.state === "submitting";

    return (
        <>
            <Form method="post">
                {data && data.errors && (
                    <ul>
                        {Object.values((err) => {
                            return <li key={err}>{err}</li>;
                        })}
                    </ul>
                )}
                {data && data.message && <p>{data.message}</p>}
                <p>
                    <label>Email:</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email adresa"
                        name="email"
                        required
                    />
                </p>
                <p>
                    <label>Lozinka:</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Lozinka"
                        name="password"
                        required
                    />
                </p>
                <div>
                    <button disabled={isSubmiting} type="submit">
                        {isSubmiting ? "Potvrdjuem ... " : "Potvrdi"}
                    </button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;
