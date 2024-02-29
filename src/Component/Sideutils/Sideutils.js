import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
// import { Drawer } from '@mui/material';
// import { Curr_Page } from '../../State/Reducers/ModeReducer';

export function DrawerMenu() {
    const location = useLocation();
    useEffect(() => {
        setUrl(location.pathname);
    }, [location])
    const [Url, setUrl] = useState()
    const Mode = useSelector(state => state.mode);
    return (
        <>
            <div className={`h-full basis-1/5 flex flex-col px-5 py-5 font-medium ${Mode.primarybox}`}>
                <div className="flex flex-col gap-y-1">
                    {/* <p className='py-3 px-3 text-sm'>Analytics</p> */}
                    <Link to="" className={`flex gap-x-3 rounded-xl items-center px-3 py-3 w-full text-lg cursor-pointer ${Mode.btn} ${Url === "/" ? Mode.active_btn : ""}`}>
                        <i className="fa-solid fa-circle-notch"></i>
                        Overview
                    </Link>
                    <Link to="trends" className={`flex gap-x-3 items-center rounded-xl px-3 py-3 w-full text-lg ${Mode.btn} cursor-pointer ${Url === "/trends" ? Mode.active_btn : ""}`}>
                    <i className="fa-solid fa-scale-unbalanced"></i>
                        Compare
                    </Link>
                    <Link to="coins" className={`flex gap-x-3 items-center rounded-xl px-3 py-3 w-full text-lg ${Mode.btn} cursor-pointer ${Url?.includes("coins") ? Mode.active_btn : ""}`}>
                        <i className="fa-brands fa-bitcoin"></i>
                        Coins
                    </Link>
                    <Link to="Exchanges" className={`flex gap-x-3 items-center rounded-xl px-3 py-3 w-full text-lg ${Mode.btn} cursor-pointer ${Url === "/Exchanges" ? Mode.active_btn : ""}`}>
                        <i className="fa-solid fa-building-columns"></i>
                        Exchanges
                    </Link>
                    <Link to="News" className={`flex gap-x-3 items-center rounded-xl px-3 py-3 w-full text-lg ${Mode.btn} cursor-pointer ${Url === "/News" ? Mode.active_btn : ""}`}>
                        <i className="fa-solid fa-newspaper"></i>
                        News
                    </Link>
                </div>
            </div>
        </>
    )
}


export default function Sideutils() {
    const SmallScreen = useMediaQuery({ query: '(min-width: 850px)' })
    if (SmallScreen) {
        return(<DrawerMenu/>)
    }
    else {
        return "";
    }
}
