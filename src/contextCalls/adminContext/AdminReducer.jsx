const AdminReducer = (state, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN_START":
      return {
        admin: null,
        isFetching: true,
        error: false,
      };
    case "ADMIN_LOGIN_SUCCESS":
      return {
        admin: action.payload,
        isFetching: false,
        error: false,
      };
    case "ADMIN_LOGIN_FAILURE":
      return {
        admin: null,
        isFetching: false,
        error: true,
      };
    case "ADMIN_LOGOUT":
      return {
        admin: null,
        isFetching: false,
        error: false,
      };
    default:
      return { ...state };
  }
};

export default AdminReducer;
