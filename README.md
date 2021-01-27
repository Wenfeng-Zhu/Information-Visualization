# Information-Visualization
LMU-WS20/21-IV-Group 28-COVID Visualization
***
# Introduction
This is an information visualization project on the status of COVID-19 in the various German states.  
It is a group project of Ludwig-Maximilians-Universität München(LMU) information visualization course.  
### Team members
- Wenfeng Zhu (Master Human-Computer Interaction)
- Shaohua Tong (Master Computer Science)
- Yukun Chen (Master Computer Science)
- Chenke Xie (Master Computer Science)
- Shuaicong Wu (Master Computer Science)
# Install
This project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Go check them out if you don't have them locally installed.  
You will need to go into this folder  
`$ cd iv-react`  
 
 Then you will need to install the necessary packages.  
`$ npm install`  

At last you should manually start React app.  
    `$ npm start`  

Then open the http://localhost:3000/ to run the web-page.

# Feature
Home Page:
- An epidemic map  
Color based on the epidemic and click, zoom functionality, event monitoring of the other Components 

- Continuous histograms show the epidemic situation in Germany (cumulative confirmed, recovers and deaths).  

- Heatmap shows weekly new cases of each state in germany
Realized mouse interaction, zoom functionality, data filter. 
Provide 2D and 3D versions of Heatmap.

- Interactive display of multi-dimensional data————Pie chart based on polar coordinates (Population, Economy)  
Mouse interaction and zoom functionality via Mouse wheel

- Cross-domain data transmission based on local server (Node.js-express).

Policies Page:
- An epidemic map  
Color based on the epidemic and click, zoom functionality, event monitoring of the other Components 

- A line chart with scatter plot show the relationship between infection and policies.
Mouse interaction and zoom functionality.

- An output area for policies.
Interactive between map, scatter plot and output area.

Population and Economy Page:
- Interactive display of multi-dimensional data————Pie chart based on polar coordinates (Population, Economy)  
Mouse interaction and zoom functionality via Mouse wheel

- Cross-domain data transmission based on local server (Node.js-express).

# Interface display
- Home Page
![Basic Info]()  

- Policies Page
![two]()