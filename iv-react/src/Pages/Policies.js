import React, {Component} from "react";
import './Home.css'
import EpidemicMap from "../components/EpidemicMap";
import LineChart from "../components/LineChart";
import Policy from "../components/Policy";

class Policies extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            focusState: null,
        }
    }
    handleChange(e, target) {
        this.setState({focusState: target})
    }



    render() {
        return (
            <div className='policies'>
                <EpidemicMap
                    focusState={this.state.focusState}
                    onFocusStateChange={this.handleChange}
                />
                <LineChart
                    focusState = {this.state.focusState}
                />
                <Policy />
            </div>
        )
    }
}

export default Policies;