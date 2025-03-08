import React, { createContext, useState } from 'react';
import Authentication from './components/authentication/Authentication';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Rules from './components/rules/Rules';
import Dashboard from './components/dashboard/Dashboard';

import bgImage from '../src/assets/bg.svg'

const UserContext = createContext(null);

const App = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(0); // Step to track which page to show

  // Handle next step transition
  const nextStep = () => {
    if (step === 0) {
      if (username && email) {
        setStep(1); // Move to Rules page if username and email are filled
      }
    } else if (step === 1) {
      setStep(2); // Move to Dashboard after clicking "Continue" in Rules
    }
  };

  return (
    <UserContext.Provider value={{ username, setUsername, email, setEmail }}>
      <div className="w-screen h-screen"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.1)), url(${bgImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Conditional rendering based on the step */}
        {step === 0 && (
          <>
            <Navbar />
            <Authentication nextStep={nextStep} />
            <Footer />
          </>
        )}
        {step === 1 && (
          <>
            <Navbar />
            <Rules nextStep={nextStep} />
            <Footer />
          </>
        )}
        {step === 2 && (
          <>
            <Navbar />
            <Dashboard />
            <Footer />
          </>
        )}
      </div>
    </UserContext.Provider>
  );
};

export default App;
export { UserContext };
