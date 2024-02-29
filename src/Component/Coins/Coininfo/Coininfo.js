import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import sample from './sample-output.json';
import { Moneyconvert } from '../../../Commonfunction/Commonfn';
import facebook_icon from '../../../Logo/facebook-icon.png';
import rediit_icon from '../../../Logo/reddit-icon.png';
import threads_icon from '../../../Logo/threads-icon.png';
// import coin from './sample-output2.json';
// import Coindata from './Coindata/Coindata';
import Coindata from './Coindata/Coindata';
import LoadingBar from 'react-top-loading-bar';


export default function Coininfo() {
  const Mode = useSelector(state => state.mode);
  const [kindofdata, setkindofdata] = useState("Charts");
  const [progress, setProgress] = useState(0)
  const [coin, setcoin] = useState();
  const CoinKey = sessionStorage.getItem("CoinName");
  useEffect(() => {
    async function getCoinData() {
      try {
        setProgress(20);
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${CoinKey}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true`);
        setProgress(50);
        setcoin(await response.json());
        setProgress(100);
      } catch (error) {
        console.log(error);
      }
    }
    getCoinData();
  }, [CoinKey]);
  return (
    <>
      <LoadingBar
        color='#2196F3'
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      {coin &&
        <div className={`flex flex-col w-full ${Mode.container} rounded-xl`}>
          <div className={`flex px-5 min-h-1/4 items-center py-7 flex-wrap gap-y-5 justify-center [@media(min-width:500px)]:justify-between`}>
            <div className='flex gap-x-4 w-fit'>
              <img src={coin.image.large} alt={coin.name} className='size-20' />
              <div className='flex flex-col gap-y-3'>
                <p className='text-3xl font-bold'>{coin.name}</p>
                <p className={`text-l px-2 py-px w-fit rounded-lg ${Mode.secondarybox}`}>{coin.symbol?.toUpperCase()}</p>
              </div>
            </div>
            <div className='flex items-center gap-x-4 w-fit'>
              <p className='text-3xl font-bold'>${coin.market_data?.current_price.usd}</p>
              <p className={`text-xl font-semibold ${coin.market_data?.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.market_data?.price_change_percentage_24h > 0 ? "+" + coin.market_data?.price_change_percentage_24h.toFixed(1) : coin.market_data?.price_change_percentage_24h.toFixed(1)}%</p>
            </div>
          </div>
          <div className={`flex items-end px-5 pt-7 min-h-1/4 border-b-2 overflow-scroll no-scrollbar ${Mode.border_color}`}>
            <p className={`px-10 py-2 font-bold border-b-4 cursor-pointer ${kindofdata === "Charts" ? "border-[#2196F3]" : "border-transparent"}`} onClick={() => { setkindofdata("Charts") }}>CHARTS</p>
            <p className={`whitespace-nowrap px-10 py-2 font-bold border-b-4 cursor-pointer ${kindofdata === "Market" ? "border-[#2196F3]" : "border-transparent"}`} onClick={() => { setkindofdata("Market") }}>MARKET DATA</p>
            <p className={`px-10 py-2 font-bold border-b-4 cursor-pointer ${kindofdata === "Developer" ? "border-[#2196F3]" : "border-transparent"}`} onClick={() => { setkindofdata("Developer") }}>DEVELOPER</p>
            <p className={`px-10 py-2 font-bold border-b-4 cursor-pointer ${kindofdata === "Community" ? "border-[#2196F3]" : "border-transparent"}`} onClick={() => { setkindofdata("Community") }}>COMMUNITY</p>
          </div>
          <div className='min-h-1/2 overflow-scroll h-fit py-10'>
            <Coindata key={kindofdata} kindofdata={kindofdata} />
          </div>
        </div>}
    </>
  )
}
