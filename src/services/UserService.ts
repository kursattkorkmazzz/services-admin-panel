import services from "@../services-url.json";
import { create } from "domain";

const UserService = {
  base: services.user_service,
  get_all_users: services.user_service + "/users",
  get_any_user: services.user_service,
  update_any_user: services.user_service,
  create_user: services.user_service,
  delete_any_user: services.user_service,
};

export default UserService;
