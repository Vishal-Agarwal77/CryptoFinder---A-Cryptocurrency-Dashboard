import React, { useState, useEffect } from 'react'
// import sample from './Coins.json';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Moneyconvert } from '../../../Commonfunction/Commonfn';

export default function Top({coins}) {
    const navigate = useNavigate();
    // const [coins, setcoins] = useState([]);
    const [date, setdate] = useState(new Date());
    const Mode = useSelector(state => state.mode);
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    useEffect(() => {
        setdate(new Date());
    },[])
    const handleClick = (coinId) => {
        sessionStorage.setItem("CoinName", coinId);
        navigate(`coins/${coinId}`)
    }
    if (coins) {
        console.log(coins);
        return (
            <><div className='h-[930px] basis-[32%] min-w-[250px] flex-auto overflow-scroll no-scrollbar'>
                <div className={`flex flex-col basis-1/3 overflow-y-scroll rounded-3xl no-scrollbar h-[930px] ${Mode.container}`}>
                    <div className='flex flex-col gap-y-2 px-3 py-4'>
                        <p className='font-bold text-2xl'>Top CryptoCurrencies</p>
                        <p className='font-semibold text-sm'>{`Last Updated : ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`}</p>
                    </div>
                    {coins.map((coin) =>
                        <div className={`flex w-full items-center justify-between border-t-2 px-3 py-4 cursor-pointer ${Mode.container_item_hover}`} key={coin.id} onClick={() => { handleClick(coin.id) }}>
                            <div className="flex items-center gap-x-2">
                                <p className="font-semibold">{coin.market_cap_rank}</p>
                                <div className="flex items-center gap-x-3">
                                    <img src={coin.image} className="size-8" alt={coin.name} />
                                    <div className="flex flex-col">
                                        <p className="text-lg font-semibold">{coin.name}</p>
                                        <p className="text-sm font-semibold">{coin.symbol.toUpperCase()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-lg font-semibold">US${Moneyconvert(coin.current_price.toFixed(1))}</p>
                                <p className={`text-sm font-semibold ${coin.price_change_percentage_24h.toString().includes("-") ? "text-red-700" : "text-green-700"}`}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                            </div>
                        </div>
                    )}
                    <Link to="coins" className={`flex gap-x-2 px-3 py-4 items-center justify-center w-full border-t-2 mx-auto ${Mode.container_item_hover}`}>
                        <p className='font-bold text-l'>View All</p>
                        <i className="fa-solid fa-chevron-right"></i>
                    </Link>
                </div>
            </div>
            </>
        )
    }
}
