import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// import sample from './sample-output.json';
import { useNavigate } from 'react-router-dom';

export default function Trending({ sample }) {
    const navigate = useNavigate();
    const Mode = useSelector(state => state.mode);
    // const [sample, setsample] = useState();
    const handleClick = (coinId) => {
        sessionStorage.setItem("CoinName", coinId);
        navigate(`coins/${coinId}`);
    }
    return (
        <div className='h-[930px] min-w-[250px] flex-auto basis-[32%]'>
            <div className={`flex flex-col basis-1/3 h-[930px] overflow-y-scroll rounded-3xl no-scrollbar ${Mode.container}`}>
                <div className='flex flex gap-y-2 gap-x-3 px-5 py-4 items-center'>
                    <i class="fa-solid fa-fire fa-2xl" style={{ color: "#f11e1e" }}></i>
                    <div className='flex flex-col gap-y-2'>
                        <p className='font-bold text-2xl'>Trending</p>
                        <p className='font-semibold text-sm'>Top-{sample.coins.length} searched</p>
                    </div>
                </div>
                {sample.coins.map((coin) =>
                    <div className={`flex w-full items-center justify-between border-t-2 px-3 py-4 cursor-pointer ${Mode.container_item_hover}`} key={coin.item.id} onClick={() => { handleClick(coin.item.id) }}>
                        <div className="flex items-center gap-x-2">
                            <p className="font-semibold w-8">{coin.item.market_cap_rank}</p>
                            <div className="flex items-center gap-x-3">
                                <img src={coin.item.small} className="size-8" alt={coin.item.name} />
                                <div className="flex flex-col">
                                    <p className={`text-lg font-semibold overflow-hidden`}>{coin.item.name}</p>
                                    <p className="text-sm font-semibold">{coin.item.symbol}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-lg font-semibold">US{coin.item.data?.price.slice(0, 5)}</p>
                            {/* <p className={`text-sm font-semibold ${coin.item.price_change_percentage_24h.toString().includes("-") ? "text-red-700" : "text-green-700"}`}>{coin.item.price_change_percentage_24h}%</p> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

