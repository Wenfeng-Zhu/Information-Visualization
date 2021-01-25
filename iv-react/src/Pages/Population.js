import React from "react";
import Polar from "../components/Polar";
function Population(){
    return(
        <div className='population'>
            <Polar
                typeChart = {'populationChart'}
                month = {"May"} 
            ></Polar>
        </div>
    )
}

export default Population;