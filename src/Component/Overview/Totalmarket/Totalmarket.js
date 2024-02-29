import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import coins from '../Top/Coins.json';
import Chart from "chart.js/auto";
import { useSelector } from 'react-redux';
// import { Line } from "react-chartjs-2";
import { Moneyconvert } from '../../../Commonfunction/Commonfn';

const data = {
    // labels: ["BITCOIN", "ETHERUM", "Others"],
    datasets: [
        {
            data: [],
            backgroundColor: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"],
            cutout: '80%',
            hoverOffset: 4
        },
    ],
    labels: [
    ],
};

export default function Totalmarket({ coins }) {
    const [Total_market, setTotal_market] = useState(0);
    const Mode = useSelector(state => state.mode);
    useEffect(() => {
        let other_market = 0;
        let temp = 0;
        data.datasets[0].data = [];
        data.labels = [];
        for (let i = 0; i < coins.length; i++) {
            if (i < 5) {
                data.datasets[0].data.push(coins[i].market_cap);
                data.labels.push(coins[i].symbol.toUpperCase());
            }
            else {
                other_market += coins[i].market_cap;
            }
            temp += coins[i].market_cap;
        }
        setTotal_market(temp);
        data.datasets[0].data.push(other_market);
        data.labels.push("Others");
    }, [])
    return (
        <div className={`flex flex-col border-black basis-1/3 rounded-3xl h-fit py-5 px-2 gap-y-4 w-full ${Mode.container}`}>
            <div className='flex gap-x-5 items-center px-5'>
                <i className="fa-solid fa-chart-pie fa-2xl" style={{ "color": "#74C0FC" }}></i>
                <div className='flex flex-col'>
                    <p className='font-bold text-l'>Market Cap</p>
                    <p className='font-bold text-2xl'>US${Moneyconvert(Total_market)}</p>
                </div>
            </div>
            {/* <p className=''>Pie chart</p> */}
            <div className='w-4/5 m-auto'>
                <Doughnut
                    key={Total_market}
                    data={data}
                    options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                        }
                    }}
                />
            </div>
        </div>
    )
}

