import React, { Component } from 'react';
import Axios from "axios";
import "./Home.scss";
var host = "3.133.121.145" // change it if needed
class Letters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            message: "",
            restartAnimation: false,
            firstTime: true
        }
    }

    fetchWithAnimation = (evt) => {
        this.fetchRandomLetter();
        this.setState({ restartAnimation: true}, () => {
            requestAnimationFrame(() => {this.setState({firstTime: false, restartAnimation: false})
            })
        })
    }

    fetchRandomLetter = () => {
        Axios.get("http://" + host + ":3001/letters/")
        .then((res)=> {
            this.setState({name: res.data[0].name, message: res.data[0].content})
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const animationStyle = "animate 1.5s linear forwards"
        if(this.state.restartAnimation)
        {
            return (<div></div>);
        }
        else {
            return (
                <div>
                    <small>A random letter from a random writer</small>
                    <div class="wrapper centered">
                        <article class="letter" id="article"
                        style={{animation: (this.state.restartAnimation || this.state.firstTime ? "" : animationStyle) }}>
                            <div class="side">
                                <h1>Read an anonymous letter!</h1>
                                <p>
                                    <textarea placeholder="" value={this.state.message} name="message"></textarea>
                                </p>
                            </div>
                            <div class="side">
                                <p>
                                    <input type="text" placeholder="" value={this.state.name} name="name" />
                                </p>
                                <p>
                                    <button id="fetchLetter" onClick={this.fetchWithAnimation}>Next</button>
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            // <div>{this.state.name ? (<p>{this.state.name}</p>) : null}{this.state.message ? (<p>{this.state.message}</p>) : null}</div>
            )
        }
        
    }
    componentDidMount() { // call after render only once 
        document.body.classList.remove("sent");
        this.fetchRandomLetter();
    }
}
export default Letters;