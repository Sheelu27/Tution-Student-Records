import * as types from "./actionTypes";

const initstate = {
  tutorData: [],
  isAuth: false,
  userEmail: "",
  searchedstudent: {},
  totalCount: 0,
};

const reducer = (state = initstate, { type, payload }) => {
  switch (type) {
    case types.LOGIN_REQ:
      return {
        ...state,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        userEmail: payload.email,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
      };
    case types.REGISTER_REQ:
      return {
        ...state,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        userEmail: payload.email,
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
      };
    case types.ALL_DATA_REQ:
      return {
        ...state,
      };
    case types.ALL_DATA_SUCCESS:
      console.log(payload);
      return {
        ...state,
        tutorData: payload.item,
        totalCount: payload.totalCount,
      };
    case types.ALL_DATA_FAILURE:
      return {
        ...state,
      };
    case types.SEARCH_REQ:
      return {
        ...state,
      };
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        searchedstudent: payload,
      };
    case types.SEARCH_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default reducer;
