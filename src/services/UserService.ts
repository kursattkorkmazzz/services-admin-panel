import services from "@../services-url.json";

const UserService = {
  base: services.user_service,
  get_all_users: services.user_service + "/users",
  get_any_user: services.user_service,
};

export default UserService;
