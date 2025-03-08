import React from 'react'

const Navbar = () => {
    const logo = "Quiz App";
    const splittedLogo = logo.split('');

    return (
        <div className='p-3'>
            <div className='w-max bg-white p-3 rounded-lg' style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.7)' }}>
                {splittedLogo.map((eachLetter, index) => {

                    const logoColor = ['#e94235', '#fabb05', '#34a853', '#4285f4'];
                    const maxVal = logoColor.length
                    const randomNum = Math.floor(Math.random() * maxVal);
                    const color = logoColor[randomNum];

                    return (
                        <span key={index} style={{ color }} className='font-bold text-5xl'>
                            <a href="/">{eachLetter}</a>
                        </span>
                    )
                })}</div>
        </div>
    )
}

export default Navbar