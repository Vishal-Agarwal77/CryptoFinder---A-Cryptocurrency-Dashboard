import React, { useEffect, useState } from 'react'
import Top from './Top/Top'
import Totalmarket from './Totalmarket/Totalmarket'
import TotalVolume from './TotalVolume/TotalVolume'
import Marketcap from './Marketcap/Marketcap'
import Trending from './Trending/Trending'
import { useDispatch } from 'react-redux'
import { Pagefn } from '../../State/Actioncreators'
import LoadingBar from 'react-top-loading-bar'

export default function Overview() {
  // const dispatch = useDispatch();
  // dispatch(Pagefn("Overview"));
  const [coins, setcoins] = useState();
  const [sample, setsample] = useState();
  const [MarketCap, setMarketCap] = useState(0);
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    async function getTop() {
      try {
        setProgress(10);
        const response1 = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`);
        setProgress(30);
        const data1 = await response1.json();
        setProgress(50)
        const response2 = await fetch(`https://api.coingecko.com/api/v3/search/trending`)
        setProgress(70)
        const data2 = await response2.json();
        setProgress(100)
        setcoins(data1);
        setsample(data2);
      }
      catch (err) {
        console.log(err);
      }
    }
    getTop();
  }, []);
  return (
    <>
      <LoadingBar
        color='#2196F3'
        progress={progress}
        height={4}
        onLoaderFinished={() => setProgress(0)}
      />
      {coins && sample &&
        <>
          <Top coins={coins} />
          <div className='border-black basis-[32%] min-w-[250px] flex flex-col gap-y-10 h-[930px] flex-auto'>
            <Marketcap coins={coins} MarketCap={MarketCap} />
            <Totalmarket coins={coins} />
            <TotalVolume coins={coins} />
          </div>
          <Trending sample={sample} />
        </>}
    </>
  )
}
