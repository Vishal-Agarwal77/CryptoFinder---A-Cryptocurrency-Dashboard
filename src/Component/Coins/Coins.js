import React, { useEffect } from 'react'
// import sample from '../Overview/Top/Coins.json';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import Coininfo from './Coininfo/Coininfo';
// import { Pagefn } from '../../State/Actioncreators';
import LoadingBar from 'react-top-loading-bar';
import { RepresentMoney } from '../../Commonfunction/Commonfn';
// import InfiniteScroll from 'react-infinite-scroll-component';


export default function Coins() {
  const navigate = useNavigate();
  const Mode = useSelector(state => state.mode);
  console.log(Mode.container_item_hover);
  const [sample, setsample] = useState([]);
  const [progress, setProgress] = useState(0)
  const [date, setdate] = useState(new Date());
  const [Page, setPage] = useState(1);
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  useEffect(() => {
    const getCoins = async () => {
      try {
        setProgress(20);
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${Page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`);
        setProgress(50);
        const data = await response.json();
        console.log(data);
        console.log(Page);
        setProgress(70);
        // setPage(Page + 1);
        setsample([...sample, ...data]);
        setdate(new Date());
        setProgress(100);
      }
      catch (err) {
        console.log(err);
      }
    }
    getCoins();
  }, [Page])
  const handleclick = (coinName) => {
    sessionStorage.setItem("CoinName", coinName);
    navigate(coinName);
  }
  const LoadMore = () => {
    setPage(Page + 1);
  }
  return (
    <>
      <LoadingBar
        color='#2196F3'
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      {sample &&
        <div className={`flex rounded-xl w-full ${Mode.container}`}>
          <div className=' border-red-400 h-full overflow-scroll w-full no-scrollbar rounded-xl'>
            <div className='flex flex-col gap-y-3 py-6 px-5 sticky left-0'>
              <p className='font-bold text-2xl'>Cryptocurrency Prices by Market Cap</p>
              <p className='font-semibold text-sm'>{`Last Updated : ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`}</p>
            </div>
            <table className='block w-full'>
              <thead>
                <tr>
                  <th className={`text-sm font-medium px-3 py-3 sticky top-0 ${Mode.container}`}>#</th>
                  <th className={`text-sm font-medium px-5 py-3 text-center sticky top-0 ${Mode.container}`}>Name</th>
                  <th className={`text-sm font-medium whitespace-nowrap py-3 px-10 text-right sticky top-0 ${Mode.container}`}>Price</th>
                  <th className={`text-sm font-medium whitespace-nowrap py-3 px-10 text-right sticky top-0 ${Mode.container}`}>1d %</th>
                  <th className={`text-sm font-medium whitespace-nowrap py-3 px-10 text-right sticky top-0 ${Mode.container}`}>24h %</th>
                  <th className={`text-sm font-medium whitespace-nowrap py-3 px-10 text-right sticky top-0 ${Mode.container}`}>7d %</th>
                  <th className={`text-sm font-medium whitespace-nowrap py-3 px-10 text-right sticky top-0 ${Mode.container}`}>Market Cap</th>
                  <th className={`text-sm font-medium whitespace-nowrap py-3 px-10 text-right sticky top-0 ${Mode.container}`}>Volume (24h)</th>
                  {/* <th className='text-sm font-medium whitespace-nowrap py-3 px-10 text-right top-0 bg-white'>Circulating Supply</th> */}
                  {/* <th className={`text-sm font-medium whitespace-nowrap py-3 px-10 text-right top-0 ${Mode.container}`}>Last 7 Days</th> */}
                </tr>
              </thead>
              <tbody>
                {sample.map((coin) =>
                  <tr key={coin.id} className={`cursor-pointer border-t-2 border-b-2 ${Mode.container}`} onClick={() => { handleclick(coin.id) }}>
                    <td className={`font-semibold text-sm px-3 py-3 top-11 left-0 ${Mode.container}`}>{coin.market_cap_rank}</td>
                    {/* <td className='font-semibold text-sm flex gap-x-3 px-8 py-3 items-center whitespace-nowrap sticky left-10 top-9 bg-white'> */}
                    <td className={`font-semibold text-sm px-3 py-3 top-10 left-9 ${Mode.container}`}>
                      <div className='flex gap-x-4 px-8 items-center whitespace-nowrap'>
                        <div className='size-8 mr-2'>
                          <img src={coin.image} alt={coin.name} />
                        </div>
                        <p className='mr-2'>{coin.name}</p>
                        <p>{coin.symbol.toUpperCase()}</p>
                      </div>
                    </td>
                    <td className='text-sm font-semibold px-10 py-3 text-right'>${RepresentMoney(coin.current_price)}</td>
                    <td className={`text-sm font-semibold px-10 py-3 text-right ${coin.price_change_percentage_1h_in_currency?.toString().includes("-") ? "text-red-600" : "text-green-600"}`}>{coin.price_change_percentage_1h_in_currency?.toFixed(2)}%</td>
                    <td className={`text-sm font-semibold px-10 py-3 text-right ${coin.price_change_percentage_24h_in_currency?.toString().includes("-") ? "text-red-600" : "text-green-600"}`}>{coin.price_change_percentage_24h_in_currency?.toFixed(2)}%</td>
                    <td className={`text-sm font-semibold px-10 py-3 text-right ${coin.price_change_percentage_7d_in_currency?.toString().includes("-") ? "text-red-600" : "text-green-600"}`}>{coin.price_change_percentage_7d_in_currency?.toFixed(2)}%</td>
                    <td className='text-sm font-semibold px-10 py-3 text-right'>${RepresentMoney(coin.market_cap)}</td>
                    <td className='text-sm font-semibold px-10 py-3 text-right'>${RepresentMoney(coin.total_volume)}</td>
                    {/* <td className='text-sm font-semibold px-10 py-3 text-right'>{coin.circulating_supply}</td> */}
                  </tr>
                )}
              </tbody>
            </table>
            <div className={`m-auto px-2 py-1 my-2 border-black w-fit cursor-pointer ${Mode.secondarybox}`} onClick={LoadMore}>
              <p>Load More..</p>
            </div>
          </div>
        </div>}
    </>
  )
}
