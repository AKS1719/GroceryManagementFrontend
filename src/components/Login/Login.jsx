import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice.js";
import { Button, Input, Logo } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../Services/authService.js";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data); // if session then user is logged in else not logged in

            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    console.log(userData)
                    dispatch(authLogin(userData)); // sendin userdata in the context that is store
                }
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-full mt-8 mb-8">
            <div
                className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}
            >
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    {" "}
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form
                    onSubmit={handleSubmit(login)}
                    className="mt=8"
                >
                    <div className="space-y-5">
                        <Input
                            label="Email:"
                            placeholder="Enter your Email"
                            type="email"
                            {
                                ...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) =>
                                            /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(
                                                value
                                            ) ||
                                            "Email Address Must be valid email address",
                                    },
                                }) /**name is important in email register(key, options) 
                            we have to spread the register value , 
                            validation is regex we don't know how to write regex so we will go to regexr.com and bring some community patterns
                        */
                            }
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            children={"Sign in "}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
