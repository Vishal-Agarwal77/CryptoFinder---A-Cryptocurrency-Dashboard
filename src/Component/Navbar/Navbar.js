import React, { useEffect, useState } from 'react'
import Logo from '../../Logo/Logo'
import User from './User-Avatar.jpg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import Modefn from '../../State/Actioncreators'
import { Dialog, Drawer, SwipeableDrawer } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { DrawerMenu } from '../Sideutils/Sideutils';
import { SearchFn } from './Seachfn';
import axios from 'axios';
import MYdropDown from '../Trends/DropDown';

function SimpleDialog(props) {
    const Mode = useSelector(state => state.mode);
    const { open, onClose } = props;
    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                "& .MuiDialog-paper": {
                    borderRadius: "0.75rem",
                    backgroundColor: "transparent",
                },
            }}>
            <div className={`px-10 py-10 box-shadow ${Mode.dialog_box} rounded-xl`}>
                <p className={`absolute right-[20px] top-[15px] border-2 ${Mode.active_btn === "Active-btn-light" ? "border-white" : "border-black"} px-1.5 py-1 rounded-full cursor-pointer flex justify-center items-center`} onClick={handleClose}><i className="fa-solid fa-xmark"></i></p>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex flex-col'>
                        <p className='font-bold text-2xl'>CryptoFinder</p>
                        <p className='font-semibold text-sm'>Version 1.0.0</p>
                    </div>
                    <div>
                        <p className='font-semibold text-xl'>A CryptoCurrency Dashboard for Fun</p>
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <p>Thankful to following sources:</p>
                        <div className='flex flex-col'>
                            <p>- NEWS API</p>
                            <p>- CoinGecko</p>
                        </div>
                    </div>
                    <div>
                        <p><b>Warning</b> : This CryptoCurrency dashboard is made for just fun so please don't use
                            CryptoFinder for any financial activity.This dashboard can slow to update information due to API rate limitation</p>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default function Navbar() {
    let timerId;
    const [Data, setData] = useState();
    const [ShowSearchResult, setShowSearchResult] = useState(false);
    const [SearchResult, setSearchResult] = useState();
    const closeSearchResult = () => {
        setShowSearchResult(false);
    }
    useEffect(() => {
        async function GetCoinList() {
            try {
                const response = await axios.get("https://api.coingecko.com/api/v3/coins/list");
                if (response.status === 200) {
                    setData(response.data);
                }
                else {
                    throw new Error("Either data is not found or api call limit may be exceeded");
                }
            } catch (error) {
                console.log(error);
            }
        }
        GetCoinList();
        document.addEventListener("click", closeSearchResult);
    }, []);
    const [Open, setOpen] = useState(false);
    const [DrawerStatus, setDrawerStatus] = useState(false);
    const [SearchBar, setSearchBar] = useState(false);
    const SearchInput = (event) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            setSearchResult(SearchFn(event.target.value, Data));
            setShowSearchResult(true);
        }, 1500);
    }
    const smallScreen = useMediaQuery({ query: '(min-width: 850px)' });
    const Mode = useSelector(state => state.mode);
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpen(false);
    }
    const Modesetfn = () => {
        let curr_mode = document.getElementById("changemode").checked;
        if (curr_mode) {
            let data = {
                primarybox: "bg-[#030614] text-white",
                btn: "text-white hover:bg-[#171A26]",
                active_btn: "Active-btn-light",
                secondarybox: "bg-[#0A0F23]",
                container: "bg-[#12172F] text-white",
                container_item_hover: "hover:bg-[#25293F]",
                border_color: "border-[#1F2747]",
                dialog_box: "bg-[#0a0f23] text-white"
            }
            dispatch(Modefn(data));
            console.log(Mode);
        }
        else {
            let data = {
                primarybox: "bg-white text-black",
                btn: "text-black hover:bg-gray-200",
                active_btn: "Active-btn-dark",
                secondarybox: "bg-gray-200",
                container: "bg-white text-black",
                container_item_hover: "hover:bg-gray-100",
                border_color: "border-gray-200",
                dialog_box: "bg-gray-200 text-black"
            }
            dispatch(Modefn(data));
            console.log(curr_mode)
            console.log(Mode);
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const Draweropen = () => {
        setDrawerStatus(!DrawerStatus);
    }
    const SearchBarOpen = () => {
        setSearchBar(!SearchBar);
    }
    return (
        <>
            {DrawerStatus &&
                <SwipeableDrawer
                    open={DrawerStatus}
                    onOpen={Draweropen}
                    onClose={Draweropen}
                    PaperProps={{
                        sx: {
                            width: "270px",
                            backgroundColor: `${Mode.active_btn === "Active-btn-light" ? "#030614" : "white"}`
                        },
                    }}

                >
                    <div className={`flex flex-col ${Mode.primarybox}`}>
                        <Link className='flex items-center gap-x-3 px-5 py-5' to="/">
                            <Logo />
                            <p className='text-2xl font-bold'>CryptoFinder</p>
                        </Link>
                        <DrawerMenu />
                    </div>
                </SwipeableDrawer >
            }
            {
                SearchBar &&
                <Drawer
                    open={SearchBar}
                    onClose={SearchBarOpen}
                    PaperProps={{
                        sx: {
                            height: "50%",
                            width: "100%",
                            backgroundColor: `${Mode.active_btn === "Active-btn-light" ? "#030614" : "white"}`
                        }
                    }}
                >
                    <div className={`flex h-full items-center ${Mode.primarybox}`}>
                        <div className={`h-12 w-full flex items-center py-2 px-4 border-2 gap-x-2 fixed top-0 left-0 rounded-xl border-slate-500 z-10 ${Mode.primarybox}`}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder='Search..' className={`h-full outline-0 w-full ${Mode.primarybox}`} onChange={SearchInput} />
                        </div>
                        {ShowSearchResult && SearchResult &&
                            // console.log(SearchResult)
                            // <select value={"null"}>
                            <div className='flex flex-col absolute top-14 left-0 bg-white overflow-y-scroll h-[200px] w-full border-2 border-t-0'>
                                {SearchResult.map((item) =>
                                    <Link to={`coins/${item.id}`} className='py-1 border-b-2 flex flex-col justify-center hover:bg-gray-200' onClick={() => sessionStorage.setItem("CoinName", item.id)}>{item.name}</Link>
                                )}
                            </div>
                            // </select>
                        }
                    </div>
                </Drawer>
            }
            <div className={`flex justify-between items-center py-5 px-5 ${Mode.primarybox}`}>
                {smallScreen
                    ?
                    <div className='flex gap-x-10  items-center'>
                        <Link className='flex items-center gap-x-3 ' to="/">
                            <Logo />
                            <p className='text-2xl font-bold'>CryptoFinder</p>
                        </Link>
                        <div className='flex flex-col w-96 relative'>
                            <div className='h-12 w-96 flex items-center py-2 px-4 border-2 gap-x-2 rounded-xl border-slate-500'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                                <input type="text" placeholder='Search..' className={`h-full outline-0 w-full ${Mode.primarybox} z-10`} onChange={SearchInput} />
                                {ShowSearchResult && SearchResult &&
                                    // console.log(SearchResult)
                                    // <select value={"null"}>
                                    <div className='flex flex-col absolute top-12 left-0 bg-white overflow-y-scroll h-[200px] w-full border-2 border-t-0'>
                                        {SearchResult.map((item) =>
                                            <Link to={`coins/${item.id}`} className='py-1 border-b-2 flex flex-col justify-center hover:bg-gray-200' onClick={() => sessionStorage.setItem("CoinName", item.id)}>{item.name}</Link>
                                        )}
                                    </div>
                                    // </select>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className='flex gap-x-5 items-center'>
                        <div className='px-3 py-2 border-2 rounded-xl cursor-pointer' onClick={Draweropen}>
                            <i className="fa-solid fa-bars"></i>
                        </div>
                        <div className='px-3 py-2 border-2 rounded-xl cursor-pointer' onClick={SearchBarOpen}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                }
                <div className='flex gap-x-3 justify-center items-center '>
                    <label className="relative inline-flex items-center mb-5 cursor-pointer top-2.5">
                        <input type="checkbox" value="" className="sr-only peer" id="changemode" onChange={Modesetfn} />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className={`ms-3 text-sm font-medium ${Mode.primarybox}`}>Mode</span>
                    </label>
                    <img src={User} alt="User" className='rounded-xl border-2 cursor-pointer' onClick={handleClickOpen} />
                </div>
            </div>
            <SimpleDialog
                open={Open}
                onClose={handleClose}
            />
        </>
    )
}
