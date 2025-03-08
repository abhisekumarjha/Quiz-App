import React from 'react';

const Rules = ({ nextStep }) => {

    document.title = 'Quiz App | Rules';

    return (
        <div className="rounded-lg px-18 py-22 absolute top-1/2 left-1/2 -translate-1/2 backdrop-blur-3xl" style={{ boxShadow: '0px 0px 20px rgba(0,0,0,0.9)' }}>
            <h1 className="text-2xl">Some Rules of this quiz:</h1>
            <div className="border-t-2 border-b-2 border-gray-500 rounded-3xl my-4 py-5 px-10">
                <ol className="list-decimal">
                    <li>You will have only 30 minutes to complete this quiz.</li>
                    <li>You can't select any option once time goes off.</li>
                    <li>You can't exit from the quiz once started.</li>
                </ol>
            </div>
            <div className="w-full">
                <div className="w-1/4 mx-auto">
                    <button
                        type="button"
                        className="py-3 px-5 bg-zinc-950 text-zinc-100 rounded-md cursor-pointer border-2 border-transparent hover:bg-zinc-900 active:bg-zinc-800 active:text-zinc-100 active:border-blue-500"
                        onClick={nextStep} // Trigger nextStep function to move to Dashboard
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Rules;
