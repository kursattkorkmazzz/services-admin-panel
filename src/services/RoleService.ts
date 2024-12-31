import services from "@../services-url.json";

const RoleService = {
  base: services.role_service,
  get_role_s_service: services.role_service + "/roles",
  update_role: services.role_service,
};

export default RoleService;
