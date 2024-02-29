import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import axios from 'axios';
import BarChart from './DrawChart';
import DrawChart from './DrawChart';


export default function ChartData({ Coin1, Coin2 }) {
    console.log(Coin1);
    console.log(Coin2);
    const [Coin1info, setCoin1info] = useState();
    const [Coin2info, setCoin2info] = useState();
    useEffect(() => {
        async function getCoininfo() {
            try {
                const response1 = await axios.get(`https://api.coingecko.com/api/v3/coins/${Coin1}/market_chart?vs_currency=usd&days=740&interval=daily&precision=2`);
                const response2 = await axios.get(`https://api.coingecko.com/api/v3/coins/${Coin2}/market_chart?vs_currency=usd&days=740&interval=daily&precision=2`);
                if (response1.status === 200 && response2.status === 200) {
                    setCoin1info(response1.data);
                    setCoin2info(response2.data);
                }
                else {
                    throw new Error("Either data is not found or api call limit may be exhausted");
                }
            } catch (error) {
                console.log(error);
            }
        }
        getCoininfo();
    }, [Coin1,Coin2])
    return (Coin1info && Coin2info &&
        <DrawChart Coin1info={Coin1info} Coin2info={Coin2info} Coin1={Coin1} Coin2={Coin2} />
    )
}
