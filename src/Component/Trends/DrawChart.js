import React, { useEffect, useState } from 'react'
import { Chart } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
// import bitcoin from './Bitcoin.json';
// import ethereum from './Etherum.json';

const data = {
    datasets: [
        {
            label: '',
            data: [],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
            barPercentage: 0.4, // Adjust the value as needed
            categoryPercentage: 0.8,
        },
        {
            label: '',
            data: [],
            fill: true,
            borderColor: 'rgb(235, 64, 52)',
            backgroundColor: 'rgb(235, 64, 52)',
            barPercentage: 0.4, // Adjust the value as needed
            categoryPercentage: 0.8,
        }
    ],
    labels: []
}

export default function DrawChart({ Coin1info, Coin2info, Coin1, Coin2 }) {
    const Mode = useSelector(state => state.mode);
    const [range, setrange] = useState(7);
    const [Category, setCategory] = useState("prices");
    const [Height, setHeight] = useState("150px");
    const [dataFound, setdataFound] = useState(false);
    const [coin1, setcoin1] = useState();
    const [coin2, setcoin2] = useState();
    useEffect(() => {
        for (let key of Object.keys(Coin1info)) {
            Coin1info[key].reverse();
            Coin2info[key].reverse();
        }
    }, []);
    useEffect(() => {
        data.datasets[0].label = Coin1 ? Coin1 : "";
        data.datasets[1].label = Coin2 ? Coin2 : "";
        data.datasets[0].data = [];
        data.datasets[1].data = [];
        data.labels = [];
        for (let i = 0; (i < range); i++) {
            let date;
            console.log("for loop working");
            if (i < Coin1info[Category].length) {
                data.datasets[0].data.push(Coin1info[Category][i][1]);
                const mydate = new Date(Coin1info[Category][i][0]);
                date = mydate.toDateString();
                // console.log("Coin1 info data added");
            }
            if (i < Coin2info[Category].length) {
                data.datasets[1].data.push(Coin2info[Category][i][1]);
                const mydate = new Date(Coin2info[Category][i][0]);
                date = mydate.toDateString();
                // console.log("Coin2 info data added");
            }
            data.labels.push(date);
        }
        console.log(data);
        setcoin1(Coin1);
        setcoin2(Coin2);
        setdataFound(true);
    }, [range, Category,Coin1info,Coin2info ]);
    return (
        <>
            {dataFound &&
                <article className='w-full flex flex-col gap-y-10'>
                    <div className='flex flex-wrap justify-between items-center px-4 gap-y-5'>
                        <div className='flex gap-x-3'>
                            <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${Category === "prices" ? Mode.secondarybox : ''}`} onClick={() => { setCategory("prices") }}>Prices</p>
                            <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${Category === "market_caps" ? Mode.secondarybox : ''}`} onClick={() => { setCategory("market_caps") }}>Market Cap</p>
                            <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${Category === "total_volumes" ? Mode.secondarybox : ''}`} onClick={() => { setCategory("total_volumes") }}>Volume</p>
                        </div>
                        <div className='flex gap-x-3'>
                            <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 7 ? Mode.secondarybox : ''}`} onClick={() => {
                                setrange(7);
                                setHeight("150px");
                            }}>7D</p>
                            <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 30 ? Mode.secondarybox : ''}`} onClick={() => {
                                setrange(30);
                                setHeight("300px");
                            }}>1M</p>
                            <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 60 ? Mode.secondarybox : ''}`} onClick={() => {
                                setrange(60);
                                setHeight("600px");
                            }}>2M</p>
                            <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 90 ? Mode.secondarybox : ''}`} onClick={() => {
                                setrange(90);
                                setHeight("900px");
                            }}>3M</p>
                            <p className={`py-1 px-2 cursor-pointer rounded-lg ${Mode.container_item_hover} ${range === 365 ? Mode.secondarybox : ''}`} onClick={() => {
                                setrange(365);
                                setHeight("3650px");
                            }}>1Y</p>
                        </div>
                    </div>
                    <div style={{ height: `${Height}` }} key={Height}>
                        <Bar
                            key={[range, Category,coin1,coin2]}
                            data={data}
                            options={
                                {
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    indexAxis: 'y',
                                    scales: {
                                        y: {
                                            stacked: true,
                                            barThickness: 10,
                                        },
                                        x: {
                                            stacked: true
                                        }
                                    },
                                }
                            }
                        />
                    </div>
                </article>
            }
        </>
    )
}
