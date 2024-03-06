import { useAuth } from "@/components/AuthContext";
import { log } from "console";
import React from "react";
import { Navigate } from "react-router-dom";

export function Login() {
    const { login, isLoggedIn } = useAuth()
    if (isLoggedIn) return <Navigate to="/dashboard/student" />
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value
        login(email, password);
    };

    const handleGoogleLogin = () => {
        // Add your Google login logic here
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">

            <div
                className="w-80 rounded-lg border  bg-card text-card-foreground shadow-sm mx-auto max-w-sm"
                data-v0-t="card"
            >
                <div className="flex flex-col p-6 space-y-1">
                    <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">
                        Login
                    </h3>
                </div>
                <div className="p-6">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none "
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-white"
                                id="email"
                                placeholder="m@example.com"
                                required
                                type="email"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    className="text-sm font-medium leading-none"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                {/* <a className="text-sm underline hover:text-primary" href="#">
                                    Forgot your password?
                                </a> */}
                            </div>
                            <input
                                className="bg-white flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                id="password"
                                required
                                type="password"
                            />
                        </div>
                        <button
                            className="bg-black text-white flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                    {/* <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center w-full h-10 px-4 py-2 mt-4 text-sm font-medium border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                        Login with Google
                    </button> */}
                    {/* <div className="mt-4 text-sm text-center ">
                        Don't have an account?
                        <a className="underline hover:text-primary pl-2" href="#">
                            Sign up
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Login;
