import React from "react";
import Polar from "../components/Polar";

function Economy(){
    return(
        <div className='economy'>
            <Polar
                typeChart = {'gdpChart'}
                month = {"May"} 
            ></Polar>
        </div>
    )
}

export default Economy;