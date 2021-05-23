import React, { Component } from 'react';
import Axios from "axios";

class Letters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            message: "",
        }
    }
    render() {
        return (<div>{this.state.name ? (<p>{this.state.name}</p>) : null}{this.state.message ? (<p>{this.state.message}</p>) : null}</div>)
    }
    componentDidMount() { // call after render only once 
        Axios.get("http://localhost:3001/letters/")
            .then((res)=> {
                this.setState({name: res.data[0].name, message: res.data[0].content})
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
export default Letters;