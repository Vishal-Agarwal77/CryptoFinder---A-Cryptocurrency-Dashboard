// import axios from "axios";
// import { useState } from "react";


export const SearchFn =(searchInput, CoinList) => {
    const new_data = CoinList.filter((value) => 
        value.name.toUpperCase().includes(searchInput.toUpperCase())
    )
    console.log(new_data);
    return new_data;
}