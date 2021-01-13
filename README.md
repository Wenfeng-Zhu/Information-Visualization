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
`$ cd IV-Web`  
 
 Then you will need to install the necessary packages.  
`$ npm install`  

At last you should manually start Express' local server.  
    `$ npm start`  

Then open the http://localhost:3000/ to run the web-page.

# Feature
- An epidemic map  
Color based on the epidemic and click, zoom functionality, event monitoring of the other Components 

- A continuous histogram showing the epidemic situation in Germany (cumulative confirmed and deaths).  

- A calendar of epidemic situation  
Mouse interaction, show of epidemic prevention policy data

- Interactive display of multi-dimensional data————Pie chart based on polar coordinates (Population, Economy)  
Mouse interaction and zoom functionality via Mouse wheel

- Cross-domain data transmission based on local server (Node.js-express).

TODO:
- Implementation of the database
- Cross-domain data interaction based on cloud server
- responsive design

# Interface display
- Basic Info
![Basic Info](https://raw.githubusercontent.com/Wenfeng-Zhu/Information-Visualization/master/Basic%20Info.png)  

- Pie chart based on polar coordinates
![two](https://raw.githubusercontent.com/Wenfeng-Zhu/Information-Visualization/master/Population%26Economy.png)