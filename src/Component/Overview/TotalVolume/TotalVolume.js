import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from "chart.js/auto";
// import coins from "../Top/Coins.json";
import { useSelector } from 'react-redux';
import { Moneyconvert } from '../../../Commonfunction/Commonfn';

const data = {
  // labels: ["BITCOIN", "ETHERUM", "Others"],
  datasets: [
    {
      data: [],
      backgroundColor: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"],
      hoverOffset: 4,
      // barThickness: 20,
      categoryPercentage: 0.8,
      barPercentage: 1
    },
  ],
  labels: [
  ],
};

export default function TotalVolume({ coins }) {
  const Mode = useSelector(state => state.mode);
  const [max_volume, setmax_volume] = useState(0);
  useEffect(() => {
    let temp = 0;
    data.datasets[0].data = [];
    data.labels = [];
    for (let i = 0; i < coins.length; i++) {
      if (i < 5) {
        data.datasets[0].data.push(coins[i].total_volume);
        data.labels.push(coins[i].symbol.toUpperCase())
      }
      temp += coins[i].total_volume;
    }
    setmax_volume(temp);
  }, [])
  return (
    <div className={`flex flex-col border-black basis-1/3 rounded-3xl h-fit py-5 px-2 gap-y-4 w-full ${Mode.container}`}>
      <div className='flex gap-x-5 items-center px-5'>
        <i className="fa-solid fa-chart-bar fa-rotate-270 fa-2xl" style={{ color: "#74C0FC" }}></i>
        <div className='flex flex-col'>
          <p className='font-bold text-l'>Total Volume</p>
          <p className='font-bold text-2xl'>US${Moneyconvert(max_volume)}</p>
        </div>
      </div>
      {/* <p className=''>Pie chart</p> */}
      <div className='w-4/5 m-auto'>
        <Bar
          // className='w-full h-[400px]'
          width={"100%"}
          height={"100px"}
          data={data}
          options={{
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                grid: {
                  display: false
                },
                // labels: ["2.5T", "1.1T", "0.5T", "0.1T"]
              },
              y: {
                grid: {
                  display: false
                },
                ticks: {
                  callback: function (value) {
                    return Moneyconvert(value);
                  }
                }
              }
            },
          }}
        />
      </div>
    </div>
  )
}

