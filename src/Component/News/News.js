import React, { useEffect, useState } from 'react'
import NewsCard from './NewsCard';
import LoadingBar from 'react-top-loading-bar';
// import sample from './sample-output.json';

export default function News() {
    const [data, setdata] = useState();
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        async function getData() {
            try {
                setProgress(20);
                const response = await fetch(`https://newsapi.org/v2/everything?q=Cryptocurrency&apiKey=2637739d54274af3b24003c79d7504a5`)
                setProgress(50);
                const old_data = await response.json();
                setProgress(70)
                setdata(old_data.articles);
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
            {data &&
                <div className=' overflow-scroll gap-x-1 flex w-full rounded-l justify-between flex-wrap gap-y-10 no-scrollbar'>
                    {
                        data.map((item) =>
                            <NewsCard item={item} />
                        )
                    }
                </div>}
        </>
    )
}
