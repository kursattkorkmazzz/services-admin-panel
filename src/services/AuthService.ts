import services from "@../services-url.json";

const AuthService = {
  base: services.auth_service,
  login_uri: services.auth_service + "/login",
  logout_uri: services.auth_service + "/logout",
  refresh_uri: services.auth_service + "/get-access-token",
  check_session_uri: services.auth_service + "/check-session",
};

export default AuthService;
