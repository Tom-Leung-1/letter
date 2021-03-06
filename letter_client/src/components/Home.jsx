import React, { Component } from 'react';
// import "../App.css";
import "./Home.scss";
import Axios from "axios";
var host = "3.133.121.145"

class Home extends Component {
    state = {
        message: "",
        name: "",
        messageError: "",
        nameError: ""
    }

    handleChange = (evt) => {
        this.setState(
            {[evt.target.name] : evt.target.value}
        );
    }

    validate = () => {
        let nameError = "";
        let messageError = "";
        if (!this.state.message) {
            messageError = "message cannot be blank"
        }
        else {
            messageError = ""
        }
        if (!this.state.name) {
            nameError = "message cannot be blank"
        }
        else {
            nameError = ""
        }
        if (nameError || messageError) {
            this.setState({nameError, messageError});
        }
        else {
            this.setState({nameError, messageError});
            document.body.classList.add("sent");
            Axios.post("http://" + host + ":3001/home/postLetter", {
                name: this.state.name,
                content: this.state.message,
            }).then(()=> {
                alert("Letter has been received successfully");
            }).catch((err) => {
                console.log(err);
            });
        } 
    }

    render() {
        return (
            <div>
                <small>Enter message and click button "Send"</small>
                <div class="wrapper centered">
                    <article class="letter">
                        <div class="side">
                            <h1>Write an anonymous letter!</h1>
                            <p>
                                <textarea placeholder="Message" value={this.state.message} 
                                onChange={this.handleChange}
                                name="message"></textarea>
                            </p>
                            {this.state.messageError ? (<p class="errorMessage"> {this.state.messageError} </p>) : null}
                        </div>
                        <div class="side">
                            <p>
                                <input type="text" placeholder="My name" value={this.state.name} name="name" onChange={this.handleChange}/>
                            </p>
                            {this.state.nameError ? (<p class="errorMessage"> {this.state.nameError} </p>) : null}
                            <p>
                                <button id="sendLetter" onClick={this.validate}>Send</button>
                            </p>
                        </div>
                    </article>
                    <div class="envelope front"></div>
                    <div class="envelope back"></div>
                </div>
                <p class="result-message centered">Thank you for your message</p>
            </div>
        )
    }

    componentDidMount() {
        document.body.classList.remove("sent");
    }
}

export default Home;