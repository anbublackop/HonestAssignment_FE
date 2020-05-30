import React, { Component } from "react";
import axios from "axios";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      response: "",
    };
  }
  
  onChange = event => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  findOutlet = async (address) => {
    const outletResponse = await axios({
        method: "get",
        url: `http://localhost:5000/get-outlet?address=${address}`,
    });
    this.setState({
        response: outletResponse.data
    })
    return outletResponse
  }

  render() {

    return (
      <div>
        <input
          name="address"
          placeholder="Enter location to get the outlet"
          value={this.state.address}
          onChange={this.onChange}
          style={{width:'600px'}}
        ></input>
        <button onClick={() => this.findOutlet(this.state.address)}>Get Outlet Details</button>
        <div className="container">
            {this.state.response?this.state.response.name || this.state.response:null}
        </div>
      </div>
    );
  }
}

export default Index;
