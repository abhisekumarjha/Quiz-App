import React from 'react'

const Footer = () => {

    const currYear = new Date().getFullYear();

    return (
        <div className=''>
            <a href="https://www.linkedin.com/in/abhisekumarjha/" target='_blank'>
                <div className='bg-blue-200 rounded-md absolute bottom-1 right-1 flex items-center cursor-pointer group' style={{ boxShadow: '0px 0px 20px rgba(0,0,0,0.9)' }}>
                    <div className='p-4'> &copy; <code>{currYear}</code> <span className='group-hover:border-b-4 border-b-zinc-700'>Abhishek Jha</span></div>
                </div>
            </a>
        </div>
    )
}

export default Footer