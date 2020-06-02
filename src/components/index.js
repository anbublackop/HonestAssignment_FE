import React, { Component } from "react";
import axios from "axios";
import honestImage from "../images/honestimage.png";
import { MDBInput, MDBCol, MDBBtn, MDBCard, MDBContainer } from "mdbreact";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      response: "",
      loadingIndicator: false,
    };
  }

  onChange = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  findOutlet = async (address) => {
    if (!address) {
      alert("Address field cannot be left blank!");
      return;
    }
    this.setState({
      loadingIndicator: true,
    });
    const outletResponse = await axios({
      method: "get",
      url: `http://localhost:5000/get-outlet?address=${address}`,
    });
    this.setState({
      response: outletResponse.data,
      loadingIndicator: false,
    });
    return outletResponse;
  };

  render() {
    return (
      <div>
        <div className="centerStyle">
          <img src={honestImage} height="80px"></img>
        </div>
        <MDBCol className="centerStyle">
          <MDBInput
            name="address"
            hint="Enter location to get the outlet"
            value={this.state.address}
            onChange={this.onChange}
            containerClass="mt-0"
            style={{ width: "600px" }}
          ></MDBInput>
        </MDBCol>
        {this.state.loadingIndicator ? (
          "Getting your outlet details..."
        ) : (
          <div>
            <MDBBtn
              gradient="blue"
              onClick={() => this.findOutlet(this.state.address)}
            >
              Get Outlet Details
            </MDBBtn>
          </div>
        )}
        <div className="container">
          {this.state.response ? (
            <MDBContainer className="centerStyle">
              <h4>{this.state.response.name}</h4>
            </MDBContainer>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Index;
