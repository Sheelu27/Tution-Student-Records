import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { dashBoardData, deleteStudent } from "../Redux/action";
import Nav from "./Nav";
import { Pagination } from "@material-ui/lab";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  componentDidMount() {
    this.props.getData({ email: this.props.email });
  }

  handlePageChange = (e, value) => {
    this.setState({
      page: value,
    });
    this.props.getData({ email: this.props.email, page: value });
  };

  handleDelete = (id) => {
    this.props.deleteStudent(id);
  };

  render() {
    return (
      <div
        style={{
          padding: "7px",
          fontFamily: "Fredericka the Great, cursive",
          color: "black",
          fontWeight: "bolder",
          background: "whitesmoke",
        }}
      >
        <Nav />
        {console.log(this.props.isAuth)}
        {!this.props.isAuth && <Redirect to="/" />}
        <div className="container">
          <div className="row">
            {this.props.tutorData &&
              this.props.tutorData.map((item) => (
                <div className="col-3 mb-2 mt-4" key={item._id}>
                  <div class="card shadow">
                    <div style={{ width: "250px", height: "300px" }}>
                      <img
                        class="card-img-top"
                        src={item.studentImage}
                        alt="Card"
                      />
                    </div>

                    <div class="card-body text-white bg-dark">
                      <h5 class="card-title">{item.studentName}</h5>
                      <h6 class="card-title">Tests: {item.tests.length}</h6>

                      <h6 class="card-title">Reg No: {item.registrationNo}</h6>
                      <Link
                        to={{
                          pathname: "/single",
                          state: {
                            item: item,
                          },
                        }}
                      >
                        <button className="rounded bg-white text-seconday">
                          SEE MORE
                        </button>
                      </Link>

                      <button
                        className="rounded ml-1 bg-white text-seconday"
                        onClick={() => this.handleDelete(item.registrationNo)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Pagination
          count={Math.ceil(this.props.totalCount / 8)}
          variant="outlined"
          page={this.state.page}
          onChange={this.handlePageChange}
          style={{ width: "290px", margin: "0 auto", marginTop: "5px" }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tutorData: state.tutorData,
  email: state.userEmail,
  isAuth: state.isAuth,
  totalCount: state.totalCount,
});

const mapDispatchToProps = (dispatch) => ({
  getData: (payload) => dispatch(dashBoardData(payload)),
  deleteStudent: (id) => dispatch(deleteStudent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
