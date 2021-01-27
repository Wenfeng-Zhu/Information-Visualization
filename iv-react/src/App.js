import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Population from "./Pages/Population";
import Information from "./Pages/Information";
import Policies from "./Pages/Policies";
import Economy from './Pages/Economy';

function App() {
    return (
        <>
            <Router>
                <Navbar/>
                <Switch>
                    <Route path='/~zhuw' exact component={Home}/>
                    <Route path='/~zhuw/policies' component={Policies}/>
                    <Route path='/~zhuw/population' component={Population}/>
                    <Route path='/~zhuw/economy' component={Economy}/>
                    <Route path='/~zhuw/information' component={Information}/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
