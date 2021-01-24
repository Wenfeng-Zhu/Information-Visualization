import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router,Switch,Route}  from "react-router-dom";
import Home from "./Pages/Home";
import Population from "./Pages/Population";
import Information from "./Pages/Information";
import Policies from "./Pages/Policies";

function App() {
  return (
    <>
        <Router>
            <Navbar/>
            <Switch>
                <Route path = '/' exact component={Home}/>
                <Route path = '/policies' component={Policies}/>
                <Route path='/population' component={Population}/>
                <Route path='/information' component={Information}/>
            </Switch>
        </Router>

    </>
  );
}

export default App;
