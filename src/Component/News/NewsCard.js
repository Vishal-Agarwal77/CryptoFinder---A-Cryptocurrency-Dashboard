import React from 'react'
import { useSelector } from 'react-redux';

export default function NewsCard({item}) {
    const Mode = useSelector(state => state.mode);
  return (
    <div className={`flex flex-col justify-between items-center w-[300px] [@media(max-width:649px)]:w-full h-[300px] gap-y-3 border-black oveflow-hidden rounded-xl ${Mode.container}`} key={item.url}>
        <div className='basis-2/5 flex flex-col justify-center items-center border-red-600 w-full h-2/5 overflow-hidden'>
            <img src={item.urlToImage} className='rounded-lg size-full' alt={item.title}/>
        </div>
        <div className='basis-3/5 flex flex-col gap-y-1  border-blue-600 h-2/5 px-4 py-2'>
            <p className='h-[130px]  border-red-600 overflow-hidden font-semibold text-xl'>{item.title}</p>
            <p className='h-full overflow-hidden  border-red-600 text-sm'>{item.description}</p>
            <a href={item.url} target='_blank' rel='noreferrer' className='font-semibold text-[#2196F3] w-fit'>Read Full Article</a>
        </div>
    </div>
  )
}
