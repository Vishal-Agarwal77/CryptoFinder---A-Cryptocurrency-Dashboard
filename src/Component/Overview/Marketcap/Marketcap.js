import React, { useEffect, useState } from 'react'
import coins from "../Top/Coins.json";
import { useSelector } from 'react-redux';

export default function Marketcap({ coins}) {
    const [MarketCap, setMarketCap] = useState(0);
    const Mode = useSelector(state => state.mode);
    const [display, setdisplay] = useState(false);
    useEffect(() => {
        // if (coins) {
            console.log("marketcap is running");
            let total = 0;
            for (let el of coins) {
                total += el.market_cap_change_percentage_24h;
            }
            setMarketCap((total / coins.length).toFixed(2));
            setdisplay(true);
        // }
    }, [coins])
    return (
        display && <div className={`h-fit flex justify-between basis-1/3 border-black rounded-xl px-4 py-5 items-center ${Mode.container}`}>
            <div className='flex flex-col'>
                <p className={`font-bold text-2xl ${MarketCap.toString().includes("-") ? "text-red-600" : "text-green-600"}`}>{MarketCap}%</p>
                <p className='font-semibold text-l'>24H Market Cap Change</p>
            </div>
            {
                MarketCap.toString().includes("-")
                    ? <div className={`border-black px-3 py-3 rounded-xl text-red-600 bg-red-100`}>
                        <i class="fa-solid fa-arrow-down fa-2xl"></i>
                    </div>
                    : <div className={`border-black px-3 py-3 rounded-xl text-green-600 bg-green-100`}>
                        <i class="fa-solid fa-arrow-up fa-2xl"></i>
                    </div>
            }
        </div>
    )
}

