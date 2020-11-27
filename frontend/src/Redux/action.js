import * as types from "./actionTypes";
import Axios from "axios";

const loginRequest = (payload) => {
  return {
    type: types.LOGIN_REQ,
    payload,
  };
};

const loginSuccess = (payload) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
};

const loginFailure = (payload) => {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
};

const login = (payload) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    // console.log(payload);
    const data = await Axios.post("http://localhost:9000/login", {
      ...payload,
    }).then((res) => res.data);
    dispatch(loginSuccess(payload));
  } catch (error) {
    dispatch(loginFailure("Something went Wrong,try again"));
  }
};

const registerRequest = (payload) => {
  return {
    type: types.REGISTER_REQ,
    payload,
  };
};

const registerSuccess = (payload) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload,
  };
};

const registerFailure = (payload) => {
  return {
    type: types.REGISTER_FAILURE,
    payload,
  };
};

const register = (payload) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const data = await Axios.post("http://localhost:9000/register", {
      ...payload,
    }).then((res) => res.data);
    dispatch(registerSuccess(payload));
  } catch (error) {
    dispatch(registerFailure("Something went Wrong,try again"));
  }
};

const allDataRequest = (payload) => {
  return {
    type: types.ALL_DATA_REQ,
    payload,
  };
};

const alldataSuccess = (payload) => {
  return {
    type: types.ALL_DATA_SUCCESS,
    payload,
  };
};

const alldataFailure = (payload) => {
  return {
    type: types.ALL_DATA_FAILURE,
    payload,
  };
};

const dashBoardData = (payload) => async (dispatch) => {
  dispatch(allDataRequest());
  try {
    const data = await Axios.get(`http://localhost:9000/all/${payload.email}`, {
      params: {
        page: payload.page,
        limit: payload.limit,
        gender: payload.gender,
        age: payload.age,
      },
    }).then((res) => res.data);
    dispatch(alldataSuccess(data));
  } catch (error) {
    dispatch(alldataFailure("Something went Wrong,try again"));
  }
};

const searchReq = (payload) => {
  return {
    type: types.SEARCH_REQ,
    payload,
  };
};

const searchSuccess = (payload) => {
  return {
    type: types.SEARCH_SUCCESS,
    payload,
  };
};

const searchFailure = (payload) => {
  return {
    type: types.SEARCH_FAILURE,
    payload,
  };
};

const searchStudent = (payload) => async (dispatch) => {
  dispatch(searchReq());
  try {
    const data = await Axios.get(`http://localhost:9000/search/`, {
      params: {
        email: payload.email,
        name: payload.name,
      },
    }).then((res) => res.data);
    console.log(data);
    dispatch(searchSuccess(data));
  } catch (error) {
    dispatch(searchFailure("Something went Wrong,try again"));
  }
};

const deleteStudent = (id) => (dispatch) => {
  Axios.delete("http://localhost:9000", {
    params: {
      id: id,
    },
  }).then((res) => dispatch(searchReq(res.data)));
};

export { login, register, dashBoardData, searchStudent, deleteStudent };
