import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Overview from './Component/Overview/Overview';
import Trends from './Component/Trends/Trends';
import Coins from './Component/Coins/Coins';
import { Provider } from 'react-redux';
import { store } from './State/Store';
import Coininfo from './Component/Coins/Coininfo/Coininfo';
import Exchanges from './Component/Exchanges/Exchanges';
import News from './Component/News/News';
// import DialogBox from './Component/DialogBox/DialogBox';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Overview />} />
      <Route path='trends' element={<Trends />} />
      <Route path='coins' element={<Coins />} />
      <Route path='coins/:id' element={<Coininfo />} />
      <Route path='Exchanges' element={<Exchanges/>}/>
      <Route path='News' element={<News/>}/>
      {/* </Route> */}
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
