import React from "react";
import axios from "axios";

class Private extends React.Component{
    constructor() {
        super();
        this.state = {
            anyError: "",
            privateData:""
        };
    }

    componentDidMount() {
        if(!localStorage.getItem("authToken")){
            this.props.history.push("/login");
        }

        const fetchPrivateData = async () => {

            try {
                const {data} = await axios.get("http://localhost:5000/api/private", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`
                        },
                    }
                );

                this.setState({
                    privateData:data.data
                })

            } catch (error) {
                localStorage.removeItem("authToken");
                this.setState({
                    anyError:"Not authorized! Please Login."
                })
            }
        };

        fetchPrivateData();
    }

    //handle error
    render() {
        return(
            <div style={{color:'red',backgroundColor:'green',fontSize:'50px'}}>
                <p>{this.state.privateData}</p>
                <button onClick={this.handler}>Logout</button>
            </div>
        )
    }

    handler = () =>{
        localStorage.removeItem("authToken");
        this.props.history.push("/login");
    }
}

export default Private;