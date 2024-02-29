import React from 'react'
export default function DialogBox() {
    return (
        <>
            <div className='absolute top-0 left-0 bg-[#303030] opacity-40 w-screen h-screen'> </div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto w-fit h-fit bg-[#e4e7ec] opacity-100 px-4 py-4 rounded-xl box-shadow'>
                <p className='absolute right-[20px] top-[15px] border-2 border-black px-1.5 rounded-full cursor-pointer'><i class="fa-solid fa-xmark"></i></p>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex flex-col'>
                        <p className='font-bold text-2xl'>CryptoFinder</p>
                        <p className='font-semibold text-sm'>Version 1.0.0</p>
                    </div>
                    <div>
                        <p className='font-semibold text-xl'>A CryptoCurrency Dashboard for Fun</p>
                    </div>
                    <div className='flex flex-col gap-y-3'>
                        <p>Thankful to following sources:</p>
                        <div className='flex flex-col'>
                            <p>- NEWS API</p>
                            <p>- CoinGecko</p>
                        </div>
                    </div>
                    <div>
                        <p><b>Warning</b> : This CryptoCurrency dashboard is made for just fun so please don't use
                            CryptoFinder for any financial activity.This dashboard can slow to update information due to API rate limitation</p>
                    </div>
                </div>
            </div>
        </>
    )
}
