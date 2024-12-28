import services from "@../services-url.json";

const RoleService = {
  base: services.role_service,
  get_role_s_service: services.role_service + "/roles",
};

export default RoleService;
