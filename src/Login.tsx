import React, { FormEvent, useState } from "react";
import useFirebaseAuth from "./hook/useFirebaseAuth";

const LoginPage: React.FC = () => {
    const { user, loading, errorMessage, login, logout, token } = useFirebaseAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCopyToken = () => {
        if (token) {
            // Check if the Clipboard API is available
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard
                    .writeText(token)
                    .then(() => {
                        alert("Token copied to clipboard");
                    })
                    .catch((error) => {
                        console.error("Error copying token to clipboard:", error);
                    });
            } else {
                // Fallback for browsers that don't support the Clipboard API
                const textarea = document.createElement("textarea");
                textarea.value = token;
                textarea.style.position = "fixed";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
                alert("Token copied to clipboard");
            }
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                {errorMessage && (
                    <p className="text-red-500 text-center mb-4">{errorMessage}</p>
                )}
                {user ? (
                    <div>
                        <p className="text-center text-gray-700 mb-4 max-w-xl whitespace-pre-wrap">
                            Welcome, {user.displayName}!
                            <div className="flex items-center flex-col">
                                {token && (
                                    <>
                                    <h2>Token</h2>
                                    <div className="flex gap-4 w-full">
                                        <div className="text-xs ml-2 text-gray-500 truncate w-full py-4">{token}</div>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold px-2
                                             rounded focus:outline-none focus:shadow-outline flex-shrink-0"
                                            onClick={handleCopyToken}
                                        >
                                            Copy
                                        </button>
                                    </div>
                                    </>
                                )}
                            </div>
                        </p>
                        <div className="flex justify-center">
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={logout}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='w-screen max-w-md'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700
                                leading-tight focus:outline-none focus:shadow-outline"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700
                                 leading-tight focus:outline-none focus:shadow-outline"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg
                                 focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
