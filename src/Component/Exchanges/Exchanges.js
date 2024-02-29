import React, { useEffect, useState } from 'react'
import ExchangesCard from './ExchangesCard';
// import sample from './sample-output.json';
// import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';

export default function Exchanges() {
    // const Mode = useSelector(state => state.mode);
    const [data, setdata] = useState();
    console.log("Exchnages is running");
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        async function getData() {
            try {
                setProgress(20);
                const response = await fetch(`https://api.coingecko.com/api/v3/exchanges`);
                setProgress(50);
                setdata(await response.json());
                setProgress(100);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [])
    return (
        <>
            <LoadingBar
                color='#2196F3'
                progress={progress}
                height={4}
                onLoaderFinished={() => setProgress(0)}
            />
            {
                data &&
                <div className='overflow-scroll gap-x-1 flex w-full rounded-l justify-between [@media(max-width:500px)]:justify-center flex-wrap gap-y-10 no-scrollbar'>
                    {data.map((item) =>
                        <ExchangesCard item={item} />
                    )}
                </div>
            }
        </>
    )
}
