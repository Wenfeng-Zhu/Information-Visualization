#Information-Visualization
LMU-WS20/21-IV-Group 28-COVID Visualization
***
#Introduction
This is an information visualization project on the status of COVID-19 in the various German states.  
It is a group project of Ludwig-Maximilians-Universität München(LMU) information visualization course.  
###Team members
- Wenfeng Zhu (Master Human-Computer Interaction)
- Shaohua Tong (Master Computer Science)
- Yukun Chen (Master Computer Science)
- Chenke Xie (Master Computer Science)
- Shuaicong Wu (Master Computer Science)
#Install
This project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Go check them out if you don't have them locally installed.  
    $ npm install --global
You will need to manually start Express' local server.  
    $ npm start
Then open the 'http://localhost:3000/' to run the web-page.

#Version Log

DONE:
- Map with click and zoom function.
- A continuous histogram showing the epidemic situation in Germany (existing confirmed and cumulative confirmed).
- Display framework of epidemic situation in each state based on calendar view.
- Cross-domain data transmission based on local server (Node.js-express).

TODO:
- Connect the event monitoring of the map and the calendar view, that is, the calendar view is updated after clicking a specific state on the map.
- Implement of cross-domain transfer of data in calendar view.
- Interactive display of multi-dimensional data————Pie chart based on polar coordinates / Histogram with double ordinates
- Lack of state epidemic prevention policy data
- Implementation of the database
- Cross-domain data interaction based on cloud server

test