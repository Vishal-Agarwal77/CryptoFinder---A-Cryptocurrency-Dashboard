import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Sideutils from '../Sideutils/Sideutils'
import { Outlet } from 'react-router-dom'
import Mainutil from '../Mainutil/Mainutil'
import { useSelector } from 'react-redux'
import DialogBox from '../DialogBox/DialogBox'

export default function Layout() {
    const Mode = useSelector(state => state.mode);
    return (
        <>
            <div className={`flex flex-col h-screen w-full ${Mode.primarybox}`}>
                <Navbar />
                <div className='flex h-[84.5%] bg-transparent'>
                    <Sideutils />
                    <Mainutil>
                        <Outlet />
                    </Mainutil>
                </div>
            </div>
        </>
    )
}
