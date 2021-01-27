import React from "react";
import './Information.css';

function Information(){
    return(
        <div className='information'>
            <h2>This project</h2>
            This Informationsvisualisierung project focuses on the cumulative number of infections and the number of new infections by state in Germany since March, which are also in relation to population density and the economy. The homepage also shows the cure data and death data for the whole Germany. In addition, we can use the graphs to determine whether the relevant policies of the states have had a positive effect on the suppression of the epidemic.
            <br /> <br />
            You can find our project for more details on GitHub:
            <br />
            <a href="https://github.com/Wenfeng-Zhu/Information-Visualization">Information-Visualization</a>
            <br />   <br />
            <h2>Our Group</h2>
            Our group is Group 28. Group members and majors are:<br />
            Yukun Chen (Computer Science Master)<br />
            Shaohua Tong (Computer Science Master)<br />
            Shuaicong Wu (Computer Science Master)<br />
            Chenke Xie (Computer Science Master)<br />
            Wenfeng Zhu (Human-Computer Interaction Master)

        </div>
        
    )
   
}

export default Information;