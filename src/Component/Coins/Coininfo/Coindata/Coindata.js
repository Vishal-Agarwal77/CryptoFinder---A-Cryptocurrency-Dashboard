import React, { useEffect, useState } from 'react'
// import sample from '../sample-output.json';
import coin from '../sample-output2.json';
import { Moneyconvert } from '../../../../Commonfunction/Commonfn';
import facebook_icon from '../../../../Logo/facebook-icon.png';
import rediit_icon from '../../../../Logo/reddit-icon.png';
import threads_icon from '../../../../Logo/threads-icon.png';
import { Chart } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Charts from './Charts';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';


export default function Coindata({ kindofdata }) {
    const Mode = useSelector(state => state.mode);
    const [sample, setsample] = useState();
    const [coin, setcoin] = useState();
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        async function getCoinData() {
            try {
                setProgress(10);
                const CoinKey = sessionStorage.getItem("CoinName");
                setProgress(20);
                const response1 = await fetch(`https://api.coingecko.com/api/v3/coins/${CoinKey}/market_chart?vs_currency=usd&days=740&interval=daily&precision=2`);
                setProgress(40);
                setsample(await response1.json());
                setProgress(60)
                const response2 = await fetch(`https://api.coingecko.com/api/v3/coins/${CoinKey}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true`)
                setProgress(80)
                setcoin(await response2.json());
                setProgress(100);

            } catch (error) {
                console.log(error);
            }
        }
        getCoinData();
    }, []);
    if (sample && coin) {
        switch (kindofdata) {
            case "Charts":
                return (
                    <>
                        <LoadingBar
                            color='#2196F3'
                            progress={progress}
                            height={4}
                            onLoaderFinished={() => setProgress(0)}
                        />
                        <Charts sample={sample} />
                    </>)
            case "Market":
                return (
                    <>
                        <LoadingBar
                            color='#2196F3'
                            progress={progress}
                            height={4}
                            onLoaderFinished={() => setProgress(0)}
                        />
                        <div className='flex px-7 gap-y-10 flex-wrap justify-between'>
                            <div className='w-full md:w-[48%] flex break-all'>
                                {/* <p className='min-[768px]:w-[45%] max-[768px]:w-full flex flex-wrap text-balance break-all'> */}
                                    {`${coin.description.en}`}
                                    {/* </p> */}
                            </div>
                            <div className={`w-full md:w-[48%] h-fit flex flex-col gap-y-10 font-semibold rounded-xl px-4 py-4 ${Mode.secondarybox}`}>
                                <p className='text-lg'>{coin.name} Price Statistics</p>
                                <div className='flex flex-col gap-y-5'>
                                    <p className='text-base'>{coin.name} Price Today</p>
                                    <div className='flex flex-col gap-y-4 w-full'>
                                        <div className='flex justify-between text-base'>
                                            <p>Market Cap Rank</p>
                                            <p>{coin.market_cap_rank}</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>Current Price</p>
                                            <p>${coin.market_data.current_price.usd}</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>24H High</p>
                                            <p>${coin.market_data.high_24h.usd}</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>24H Low</p>
                                            <p>${coin.market_data.low_24h.usd}</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>Trading Volume</p>
                                            <p>{coin.market_data.total_volume.usd}</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>Market Cap</p>
                                            <p>${coin.market_data.market_cap.usd}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-y-5'>
                                    <p className='text-base'>{coin.name} Price History</p>
                                    <div className='flex flex-col gap-y-4 w-full'>
                                        <div className='flex justify-between text-base'>
                                            <p>24H Change</p>
                                            <p className={`${coin.market_data.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.market_data.price_change_percentage_24h > 0 ? "+" + coin.market_data.price_change_percentage_24h.toFixed(1) : coin.market_data.price_change_percentage_24h.toFixed(1)}%</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>7D Change</p>
                                            <p className={`${coin.market_data.price_change_percentage_7d > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.market_data.price_change_percentage_7d > 0 ? "+" + coin.market_data.price_change_percentage_7d.toFixed(1) : coin.market_data.price_change_percentage_7d.toFixed(1)}%</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>14D Change</p>
                                            <p className={`${coin.market_data.price_change_percentage_14d > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.market_data.price_change_percentage_14d > 0 ? "+" + coin.market_data.price_change_percentage_14d.toFixed(1) : coin.market_data.price_change_percentage_14d.toFixed(1)}%</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>30D Change</p>
                                            <p className={`${coin.market_data.price_change_percentage_30d > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.market_data.price_change_percentage_30d > 0 ? "+" + coin.market_data.price_change_percentage_30d.toFixed(1) : coin.market_data.price_change_percentage_30d.toFixed(1)}%</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>60D Change</p>
                                            <p className={`${coin.market_data.price_change_percentage_60d > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.market_data.price_change_percentage_60d > 0 ? "+" + coin.market_data.price_change_percentage_60d.toFixed(1) : coin.market_data.price_change_percentage_60d.toFixed(1)}%</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>200D Change</p>
                                            <p className={`${coin.market_data.price_change_percentage_200d > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.market_data.price_change_percentage_200d > 0 ? "+" + coin.market_data.price_change_percentage_200d.toFixed(1) : coin.market_data.price_change_percentage_200d.toFixed(1)}%</p>
                                        </div>
                                        <div className='flex justify-between text-base'>
                                            <p>1Y Change</p>
                                            <p className={`${coin.market_data.price_change_percentage_1y > 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.market_data.price_change_percentage_1y > 0 ? "+" + coin.market_data.price_change_percentage_1y.toFixed(1) : coin.market_data.price_change_percentage_1y.toFixed(1)}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case "Community":
                console.log("Community part is displayed");
                return (
                    <>
                        <LoadingBar
                            color='#2196F3'
                            progress={progress}
                            height={4}
                            onLoaderFinished={() => setProgress(0)}
                        />
                        <div className='flex px-3 gap-x-10 gap-y-10 flex-wrap justify-center'>
                            <div className={`flex flex-col border-black px-5 py-5 w-[270px] gap-y-5 rounded-xl ${Mode.secondarybox}`}>
                                <div className='flex gap-x-3 items-center'>
                                    <img src={rediit_icon} className='size-8' alt="Reddit" />
                                    <p className='text-lg font-semibold'>Reddit</p>
                                </div>
                                <div className='flex flex-col items-center font-medium text-2xl gap-y-5 h-fit'>
                                    <div className='flex flex-col items-center'>
                                        <p>{`${coin.community_data.reddit_subscribers ? Moneyconvert(coin.community_data.reddit_subscribers) : "-"}`}</p>
                                        <p className='text-sm'>Subscribers</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p>{`${coin.community_data.reddit_average_posts_48h ? Moneyconvert(coin.community_data.reddit_average_posts_48h) : "-"}`}</p>
                                        <p className='text-sm'>Average Posts</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p>{`${coin.community_data.reddit_average_comments_48h ? Moneyconvert(coin.community_data.reddit_average_comments_48h) : "-"}`}</p>
                                        <p className='text-sm'>Average Comments</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p>{`${coin.community_data.reddit_accounts_active_48h ? Moneyconvert(coin.community_data.reddit_accounts_active_48h) : "-"}`}</p>
                                        <p className='text-sm'>Active Accounts</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col border-black px-5 py-5 gap-y-5 w-[270px] rounded-xl h-fit ${Mode.secondarybox}`}>
                                <div className='flex gap-x-3 items-center'>
                                    <img src={facebook_icon} className='w-[40px]' alt='Facebook' />
                                    <p className='text-lg font-semibold'>Facebook</p>
                                </div>
                                <div className='flex flex-col items-center font-medium text-2xl'>
                                    <p>{`${coin.community_data.facebook_likes ? Moneyconvert(coin.community_data.facebook_likes) : "-"}`}</p>
                                    <p className='text-sm'>Likes</p>
                                </div>
                            </div>
                            <div className={`flex flex-col border-black px-5 py-5 gap-y-5 w-[270px] rounded-xl h-fit ${Mode.secondarybox}`}>
                                <div className='flex gap-x-3 items-center font-bold text-2xl'>
                                    <img src={threads_icon} className='w-[40px]' alt='Threads' />
                                    <p className='text-lg font-semibold'>Threads</p>
                                </div>
                                <div className='flex flex-col items-center font-medium text-2xl'>
                                    <p>{`${coin.community_data.twitter_followers ? Moneyconvert(coin.community_data.twitter_followers) : "-"}`}</p>
                                    <p className='text-sm'>Followers</p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case "Developer":
                console.log("Developer part is displayed");
                return (
                    <>
                        <LoadingBar
                            color='#2196F3'
                            progress={progress}
                            height={4}
                            onLoaderFinished={() => setProgress(0)}
                        />
                        <div className='flex px-3 gap-x-10 w-full items-center justify-center'>
                            <div className={`flex border-black min-[425px]:px-10 max-[425px]:px-5 py-5 flex-wrap gap-x-8 gap-y-8 justify-center rounded-xl w-fit ${Mode.secondarybox}`}>
                                <div className='flex flex-col items-center font-medium text-2xl gap-y-5 h-fit'>
                                    <div className='flex flex-col items-center'>
                                        <p>{`${coin.developer_data.forks ? Moneyconvert(coin.developer_data.forks) : "-"}`}</p>
                                        <p className='text-sm'>Forks</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p>{`${coin.developer_data.stars ? Moneyconvert(coin.developer_data.stars) : "-"}`}</p>
                                        <p className='text-sm'>Stars</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p>{`${coin.developer_data.subscribers ? Moneyconvert(coin.developer_data.subscribers) : "-"}`}</p>
                                        <p className='text-sm'>Subscribers</p>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <p>{`${coin.developer_data.pull_requests_merged ? Moneyconvert(coin.developer_data.pull_requests_merged) : "-"}`}</p>
                                        <p className='text-sm whitespace-nowrap'>Merged Pull Requests</p>
                                    </div>
                                </div>
                                <div className='flex flex-col items-center font-medium text-2xl gap-y-5 h-fit'>
                                    <p className='whitespace-nowrap text-sm'>Commit Activity (4 Weeks)</p>
                                    <div className='flex flex-col items-center w-[200px] gap-y-5'>
                                        <div className='flex justify-between w-full text-base'>
                                            <p>Total Count</p>
                                            <p>{`${coin.developer_data.commit_count_4_weeks ? Moneyconvert(coin.developer_data.commit_count_4_weeks) : "-"}`}</p>
                                        </div>
                                        <div className='flex justify-between w-full text-base'>
                                            <p>Additions</p>
                                            <p className='text-green-600'>{`${coin.developer_data.code_additions_deletions_4_weeks.additions ? coin.developer_data.code_additions_deletions_4_weeks.additions : "-"}`}</p>
                                        </div>
                                        <div className='flex justify-between w-full text-base'>
                                            <p>Deletions</p>
                                            <p className='text-red-600'>{`${coin.developer_data.code_additions_deletions_4_weeks.deletions ? coin.developer_data.code_additions_deletions_4_weeks.deletions : "-"}`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            default:
                return ""
        }
    }
}
// export default Coindata;