import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../Redux/action";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleLoginValidation = (e) => {
    e.preventDefault();
    this.props.loginauth({ ...this.state });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div
        style={{
          padding: "7px",
          fontFamily: "Fredericka the Great, cursive",
          color: "white",
          fontWeight: "bold",
          background: "#222f31",
          overflowX: "hidden",
        }}
      >
        <div className="row">
          <div className="col-6">
            <div>
              <img
                src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8ZWR1Y2F0aW9ufGVufDB8fDB8&auto=format&fit=crop&w=600&q=60"
                alt="Tutor"
                className="img-fluid"
                style={{ height: "800px" }}
              />
            </div>
          </div>
          <div className="col-4">
            {this.props.isAuth && <Redirect to="/dashboard" />}
            <div>
              <h3 className="mt-5">TUTION MANAGER</h3>
              <div
                className="container"
                style={{ width: "400px", marginTop: "200px" }}
              >
                <form onSubmit={this.handleLoginValidation}>
                  <div class="form-group">
                    <label
                      for="exampleInputEmail1"
                      style={{ fontSize: "20px" }}
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      text-dark
                      aria-describedby="emailHelp"
                      onChange={this.handleChange}
                      value={email}
                      name="email"
                    />
                  </div>
                  <div class="form-group">
                    <label
                      for="exampleInputPassword1"
                      style={{ fontSize: "20px" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      onChange={this.handleChange}
                      value={password}
                      name="password"
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ fontSize: "15px" }}
                    class="btn col-12 bg-white text-dark"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuth: state.isAuth,
});

const mapDispatchToProps = (dispatch) => ({
  loginauth: (payload) => dispatch(login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
