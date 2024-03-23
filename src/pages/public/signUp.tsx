import { useAuth } from "@/components/AuthContext";
import React from "react";
import { Link, Navigate } from "react-router-dom";
export function SignUp() {
    const { handleSignUp: signUp } = useAuth()
    const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email: string = e.currentTarget.email.value
        const password: string = e.currentTarget.password.value
        signUp({ email, password }).then(({ data, error }) => {
            if (error) console.error(error)
            else <Navigate to="/login" />
        })
    };
    const [view_password, setViewPassword] = React.useState(false)
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
            <div
                className="w-80 rounded-lg border  text-card-foreground shadow-sm mx-auto max-w-sm"
            >
                <div className="flex flex-col p-6 space-y-1">
                    <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">
                        SignUp
                    </h3>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSignUp} className="space-y-4">
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
                                placeholder="mail@example.com"
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
                                type={view_password ? "text" : "password"}
                                placeholder="Password"
                            />
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                                <label
                                    htmlFor="view_password"
                                >
                                    View password
                                </label>
                                <input id="view_password" type="checkbox" className="mr-2"
                                    onChange={() => setViewPassword(!view_password)}
                                />
                            </div>
                        </div>
                        <button
                            className="bg-black text-white flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            type="submit"
                        >
                            SignUp
                        </button>
                    </form>
                    <Link to="/login" className=" flex text-sm mt-10 justify-center">Already have an account?</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
