import React from 'react'
import { useSelector } from 'react-redux';

export default function ExchangesCard({item}) {
    const Mode = useSelector(state => state.mode);
    const ColorValue=(score)=>{
        if(score>=8){
            return "text-green-600";
        }
        else if(score>=4){
            return "text-yellow-600";
        }
        else{
            return "text-red-600";
        }
    }
  return (
    <div className={`flex flex-col items-center w-[220px] [@media(max-width:500px)]:w-full h-fit rounded-md px-3 py-3 ${Mode.container}`}>
        <div className='flex justify-between items-center w-full'> 
            <div className='flex gap-x-2 items-center w-3/5'>
                <img src={item.image} alt={item.name} className='size-5'/>
                <a target='_blank' rel="noreferrer" className={`font-semibold text-lg ${Mode.secondarybox.includes("gray") ? "decoration-white" : "decoration-black" } underline-offset-2 hover:underline overflow-hidden whitespace-nowrap`} href={item.url}>{item.name}</a>
            </div>
            <p className={`font-semibold text-lg px-1 rounded-md ${Mode.secondarybox}`}>#{item.trust_score_rank}</p>
        </div>
        <div className='flex flex-col items-center justify-center py-10'>
            <p className={`text-3xl font-semibold ${ColorValue(item.trust_score)}`}>{item.trust_score}</p>
            <p className='text-base font-semibold'>Trust Score</p>
        </div>
    </div>
  )
}
