import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';

const Authentication = ({ nextStep }) => {

    document.title = 'Quiz App | Login';

    const [error, setError] = useState('');
    const { username, setUsername, email, setEmail } = useContext(UserContext);

    function authFormSubmit(e) {
        e.preventDefault();

        if (username.length > 0 && email.length > 0) {
            console.info(`Authenticated --> Name: ${username}, Email: ${email}`);
            setError('');
            nextStep(); // Move to the next step (Rules page)
        } else {
            setError('Please fill out both fields');
            console.error('false');
        }
    }

    return (
        <div className="rounded-lg px-18 py-15 absolute top-1/2 left-1/2 -translate-1/2 backdrop-blur-lg" style={{ boxShadow: '0px 0px 20px rgba(0,0,0,0.9)' }}>
            <h1 className="text-center text-2xl font-semibold underline underline-offset-3">Login</h1>
            <div className="py-5">
                <form className="flex flex-col items-center justify-center" onSubmit={authFormSubmit}>
                    <div className="my-3">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="on"
                            className="ml-5 border rounded-md px-3 py-2"
                        />
                    </div>
                    <div className="my-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                            className="ml-5 border rounded-md px-3 py-2"
                        />
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    <div className="my-3">
                        <button
                            type="submit"
                            className="border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-300 hover:text-black"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Authentication;
