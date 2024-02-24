export const adminLoginStart = () => ({
  type: "ADMIN_LOGIN_START",
});

export const adminLoginSuccess = (admin) => ({
  type: "ADMIN_LOGIN_SUCCESS",
  payload: admin,
});

export const adminLoginFailure = () => ({
  type: "ADMIN_LOGIN_FAILURE",
});

export const adminLogout = () => ({
  type: "ADMIN_LOGOUT",
});
