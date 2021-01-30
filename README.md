# Information-Visualization
LMU-WS20/21-IV-Group 28-COVID Visualization
***
# Introduction
This is an information visualization project on the status of COVID-19 in the various German states.  
It is a group project of Ludwig-Maximilians-Universität München(LMU) information visualization course. 
### Project Version
There are two main versions of the project in the development process, which are built through the [express](https://expressjs.com/) on backend and [react](https://reactjs.org/) on frontend.    
**The react version is an optimized and upgraded version of express**, and it has been deployed to the remote server of LMU. It can be accessed through this URL: http://www.cip.ifi.lmu.de/~zhuw/

### Team members
- Wenfeng Zhu (Master Human-Computer Interaction)
- Shaohua Tong (Master Computer Science)
- Yukun Chen (Master Computer Science)
- Chenke Xie (Master Computer Science)
- Shuaicong Wu (Master Computer Science)
# Install
This project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Go check them out if you don't have them locally installed.  
You will need to go into this folder  
 ```sh
$ cd iv-react  or  $ cd iv-express 
```
 Then you will need to install the necessary packages.  
 ```sh
$ npm install
```
At last you should manually start React/Express app.  
```sh
$ npm start
```
Then open the http://localhost:3000/ (Express: http://localhost:9000) to run the web-page.

# Feature Description(React Version)
The website has a total of five interfaces, and the front-end routing method is used to achieve interface jumps, and does not involve back-end data interaction.
## Home Page:
Homepage             |  Homepage-Navbar
:-------------------------:|:-------------------------:
![](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/React%20Version-Homepage-1.PNG)  |  ![](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/React%20Version-Homepage-Navbar.PNG)
### Epidemic Map  
- Color based on the epidemic situation and mousemove
- Zoom function based on mouse click 
- Data interaction with other components

### Histogram-1
- Histogram-1: Displays daily the data of **new infections** and **total infections** from March to November.
- The epidemic data of all of Germany is displayed by default, and it will switch to a different state with the click of the map component.
- With horizontal axis zoom (time) function.

### Histogram-2
- Histogram-1: Displays daily the data of **recovers** and **death** from March to November.
- The epidemic data of all of Germany is displayed by default.
- With horizontal axis zoom (time) function.

Homepage-Heatmap             |  Homepage-Heatmap-3D
:-------------------------:|:-------------------------:
![](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/React%20Version-Homepage-2.PNG)  |  ![](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/React%20Version-Homepage-3.PNG)

### Heatmap
- Displays the daily data new cases of each state in germany 
- Provide **2D** and **3D** versions of Heatmap.
- The heat map can be **dragged** and **zoomed** with the mouse to facilitate observation from different angles.

## Policies Page:
![](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/React%20Version-PoliciesPage.PNG)
### Epidemic Map
-same as Home Page
### Line Chart
- The epidemic data of all of Germany is displayed by default, and it will switch to a different state with the click of the map component.
- There are some **scattered points** in the whole chart to represent that a certain policy is released at a certain time.
- Clicking on a scatter point to display specific information about the policy in the **Text Area** below.
- With horizontal axis zoom (time) function.

### Text Area
- By default, the guidance information that guides the user to click on the scattered points is displayed.
- After the user clicks on a scatter point, the corresponding policy information is displayed.



## Population and Economy Page
- Pie chart based on polar coordinates。
- The user can select the corresponding month data.
- The pie chart ratio represents the corresponding population density or GDP per capita, and the polar coordinate represents the average number of new infections per state in the current month.
- The zoom function through  the mouse wheel.


PopulationPage             |  EconomyPage
:-------------------------:|:-------------------------:
![](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/React%20Version-PopulationPage.PNG)  |  ![](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/React%20Version-EconomyPage.PNG)

## Infor Page
- Brief introduction of the project and members.

![](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/React%20Version-InformationPage.PNG)

# Project Process
![project process](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/ProjectProcess.png)

# Assignment of Tasks
![project process](https://github.com/Wenfeng-Zhu/Information-Visualization/blob/master/img/Assignment%20of%20tasks.PNG)

