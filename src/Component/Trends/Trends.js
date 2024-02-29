import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { FormControl } from '@mui/material';
import MYdropDown from './DropDown';
import ChartData from './ChartData';
import DrawChart from './DrawChart';

export default function Trends() {
  console.log("sample");
  const Mode = useSelector(state => state.mode);
  const [Coin1, setCoin1] = useState();
  const [Coin2, setCoin2] = useState();
  const [largeArray, setlargeArray] = useState();
  useEffect(() => {
    async function getCoin() {
        try {
            const response = await axios.get("https://api.coingecko.com/api/v3/coins/list?include_platform=false");
            if (response.status === 200) {
                setlargeArray(response.data);
                console.log(response.data);
            }
            else {
                throw new Error("Either data is not found or api call limit may be exhausted");
            }
        } catch (error) {
            console.log(error);
        }
    }
    getCoin();
}, []);
  // const [largeArray, setlargeArray] = useState();
  return (
    <>
      <div className={`h-fit w-full flex flex-col items-center gap-y-10 rounded-lg px-5 py-5 ${Mode.container}`}>
        <div className='flex w-full'>
          <div className='w-full flex justify-between flex flex-wrap'>
            <FormControl sx={{ minWidth: 100 }}>
              <div className={`w-[100px]`}>
                <label htmlFor="myDropdown">Select Coin:</label>
                <select id="myDropdown" value={Coin1} onChange={(event) => setCoin1(event.target.value)} className={`w-[100px] ${Mode.secondarybox}`}>
                  {largeArray && <MYdropDown largeArray={largeArray}/>}
                </select>
              </div>
            </FormControl>
            <FormControl sx={{ minWidth: 100 }}>
              <div className={`w-[100px]`}>
                <label htmlFor="myDropdown">Select Coin:</label>
                <select id="myDropdown" value={Coin2} onChange={(event) => setCoin2(event.target.value)} className={`w-[100px] ${Mode.secondarybox}`}>
                {largeArray && <MYdropDown largeArray={largeArray}/>}
                </select>
              </div>
            </FormControl>
          </div>
        </div >
        {Coin1 && Coin2 &&
          <ChartData Coin1={Coin1} Coin2={Coin2} />
        }
      </div >
    </>
  )
}
