import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Dashboard = () => {

    document.title = 'Quiz App | Dashboard';


    const num1to30 = [];
    for (let i = 1; i <= 30; i++) {
        num1to30.push(i);
    }

    // Timer state
    const [timeLeft, setTimeLeft] = useState(1800);

    // Clear timer interval when quiz is submitted or timed out
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevState => prevState - 1);
        }, 1000);

        // Clear the interval when quiz is submitted or time runs out
        return () => clearInterval(interval);
    }, []);

    // Questions state, initialized as an empty array to avoid undefined errors
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchQuestions() {
            const url = 'https://opentdb.com/api.php?amount=30';
            try {
                const response = await fetch(url);

                // Commented out rate-limit handling block
                /* if (response.status === 429) {
                    console.log("Rate limit exceeded. Retrying...");
                    setTimeout(fetchQuestions, 2000);  // Wait 2 seconds before retrying
                    return;
                } */

                // Only process response if it's successful
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data.results);
                } else {
                    console.error("Error fetching questions, status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        }
        fetchQuestions();
    }, []);

    // Current question index and selected answers state
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(30).fill(null));
    const [submitted, setSubmitted] = useState(false); // State to track whether quiz is submitted or timed out

    // Handle next question
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    // Handle previous question
    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Handle answer selection
    const handleAnswerSelect = (answer) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = answer;  // Store the selected answer for the current question
        setSelectedAnswers(updatedAnswers);
    };

    // Calculate score based on selected answers
    const calculateScore = () => {
        return selectedAnswers.reduce((score, selectedAnswer, index) => {
            if (selectedAnswer === questions[index].correct_answer) {
                return score + 1;
            }
            return score;
        }, 0);
    };

    // Handle quiz submission
    const handleSubmit = () => {
        setSubmitted(true); // Mark the quiz as submitted
    };

    // Timer expired (timeLeft is 0)
    useEffect(() => {
        if (timeLeft === 0 && !submitted) {
            handleSubmit(); // Automatically submit when time is up
        }
    }, [timeLeft, submitted]);

    // contextAPI
    const { username, setUsername, email, setEmail } = useContext(UserContext);



    return (
        <div className='w-[80%] rounded-lg py-2 px-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid gap-10 backdrop-blur-3xl' style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.7)' }}>
            {/* Left-side dashboard */}
            <div>
                <div>
                    {submitted ? (
                        < div >
                            <h3 className="text-4xl font-bold text-center">Quiz Completed!</h3>
                            <div className='flex items-center justify-center gap-3 my-5'>
                                <div className='p-3 rounded-md bg-zinc-100 text-zinc-800 flex gap-2'>
                                    <p className='font-semibold'>Name: </p>
                                    <p>{username}</p>
                                </div>
                                <div className='p-3 rounded-md bg-zinc-100 text-zinc-800 flex gap-2'>
                                    <p className='font-semibold'>Email: </p>
                                    <p>{email}</p>
                                </div>
                                <div className='p-3 rounded-md bg-zinc-100 text-zinc-800 flex gap-2'>
                                    <p className='font-semibold'>Score: </p>
                                    <p>{calculateScore()} / {questions.length}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <h3>Time Left: {(timeLeft - (timeLeft % 60)) / 60} min {timeLeft % 60} sec</h3>
                    )}
                </div>

                {/* Conditionally render questions or score */}
                {submitted ? (
                    <div className="text-2xl text-center mt-4">
                        <p>Your Score: {calculateScore()} / {questions.length}</p>
                    </div>
                ) : (
                    <div className='my-4'>
                        {questions.length > 0 ? (
                            <div>
                                <p>
                                    <span className="font-semibold">{currentQuestionIndex + 1}.</span>
                                    <span dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
                                </p>
                                <div className='my-3 py-2 px-5 flex flex-col gap-y-2 text-center'>
                                    {questions[currentQuestionIndex].incorrect_answers
                                        .concat(questions[currentQuestionIndex].correct_answer)
                                        .map((answer, index) => (
                                            <p
                                                key={index}
                                                className={`rounded-md px-2 py-1 border border-zinc-500 hover:bg-blue-200 hover:text-zinc-900 cursor-pointer transition-colors ${selectedAnswers[currentQuestionIndex] === answer ? 'bg-blue-500' : ''}`}
                                                onClick={() => handleAnswerSelect(answer)}
                                            >
                                                <span dangerouslySetInnerHTML={{ __html: answer }} />
                                            </p>
                                        ))}
                                </div>
                            </div>
                        ) : (
                            <p>Loading questions...</p>
                        )}
                    </div>
                )}

                {/* Disable buttons after submission */}
                {!submitted && (
                    <div className='flex items-center justify-center gap-5 py-2'>
                        <button
                            type="button"
                            onClick={handlePrev}
                            className={`py-2 px-5 bg-blue-600 text-white rounded-md cursor-pointer border-2 border-transparent hover:bg-blue-700 hover:border-blue-600 active:bg-blue-800 active:border-blue-700 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentQuestionIndex === 0}
                        >
                            Prev
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className={`py-2 px-5 bg-blue-600 text-white rounded-md cursor-pointer border-2 border-transparent hover:bg-blue-700 hover:border-blue-600 active:bg-blue-800 active:border-blue-700 ${currentQuestionIndex === 29 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentQuestionIndex === 29}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Right-side dashboard */}
            <div>
                <div className='flex items-center justify-center md:justify-end'>
                    {!submitted && (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className={`py-2 px-5 bg-blue-600 text-white rounded-md cursor-pointer border-2 border-transparent hover:bg-blue-700 hover:border-blue-600 active:bg-blue-800 active:border-blue-700`}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
