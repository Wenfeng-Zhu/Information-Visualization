import React, {Component} from "react";
import './Home.css'
import EpidemicMap from "../components/EpidemicMap";
import Charts from '../components/Charts';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {focusState: null}
    }

    handleChange(e, target) {
        //alert('state change')
        this.setState({focusState: target})
        //alert(target);
    }

    render() {
        return (
            <div className='home'>
                <EpidemicMap
                    focusState={this.state.focusState}
                    onFocusStateChange={this.handleChange}
                />
                <Charts
                    focusState = {this.state.focusState}
                />
            </div>
        )
    }
}

export default Home;

