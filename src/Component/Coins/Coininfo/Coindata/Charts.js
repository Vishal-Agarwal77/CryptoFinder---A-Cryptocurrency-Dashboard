import React, { useState } from 'react'
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line
import { Chart } from 'chart.js';
import { Moneyconvert } from '../../../../Commonfunction/Commonfn';
import { useSelector } from 'react-redux';

const data = {
    datasets: [
        {
            label: '',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            // backgroundColor: "gradient",
            tension: 0.1,
        },
    ],
    labels: []
}

export default function Charts({ sample }) {
    const Mode = useSelector(state => state.mode);
    const [range, setrange] = useState(7);
    const [Category, setCategory] = useState("prices");
    if (sample) {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        data.datasets[0].data = [];
        data.labels = [];
        for (let i = 0; i < range; i++) {
            data.datasets[0].data.push(sample[Category][i][1]);
            let Unix_date = new Date(sample[Category][i][0] * 1000);
            data.labels.push(`${Unix_date.getDate()}-${months[Unix_date.getMonth()]}-${Unix_date.getFullYear()}`)
        }
        console.log(data);
    }
    // const gradient = ctx => {
    //     const chartArea = ctx.chartArea;
    //     const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    //     gradient.addColorStop(0, "rgba(255, 99, 132, 0.2)");
    //     gradient.addColorStop(1, "rgba(54, 162, 235, 0.2)");
    //     return gradient;
    // };
    return (<div className='flex flex-col gap-y-10'>
        <div className='flex flex-wrap justify-between items-center px-4 gap-y-5'>
            <div className='flex gap-x-3'>
                <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${Category === "prices" ? Mode.secondarybox : ''}`} onClick={() => { setCategory("prices") }}>Prices</p>
                <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${Category === "market_caps" ? Mode.secondarybox : ''}`} onClick={() => { setCategory("market_caps") }}>Market Cap</p>
                <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${Category === "total_volumes" ? Mode.secondarybox : ''}`} onClick={() => { setCategory("total_volumes") }}>Volume</p>
            </div>
            <div className='flex gap-x-3'>
                <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 7 ? Mode.secondarybox : ''}`} onClick={() => { setrange(7) }}>7D</p>
                <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 30 ? Mode.secondarybox : ''}`} onClick={() => { setrange(30) }}>1M</p>
                <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 60 ? Mode.secondarybox : ''}`} onClick={() => { setrange(60) }}>2M</p>
                <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 90 ? Mode.secondarybox : ''}`} onClick={() => { setrange(90) }}>3M</p>
                <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 365 ? Mode.secondarybox : ''}`} onClick={() => { setrange(365) }}>1Y</p>
                <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 730 ? Mode.secondarybox : ''}`} onClick={() => { setrange(730) }}>2Y</p>
            </div>
        </div>
        <article className='linechart w-full px-10'>
            <Line
                id="line-chart"
                key={[range, Category]}
                data={data}
                options={
                    {
                        maintainAspectRatio: false,

                        scales: {
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    display: false
                                }
                            },
                            y: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    callback: function (value) {
                                        return Moneyconvert(value);
                                    },
                                    beginAtZero: true,
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                        }
                    }
                }
            />
        </article>
    </div>)
}
