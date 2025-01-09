import services from "@../services-url.json";

const RoleService = {
  base: services.role_service,
  get_role_s_service: services.role_service + "/roles",
  update_role: services.role_service,
  delete_role: services.role_service,
  add_role: services.role_service,
  get_permissions: services.role_service,
  remove_permission: services.role_service,
  get_all_permissions: services.role_service + "/permissions",
  add_role_to_user: services.role_service,
  delete_role_from_user: services.role_service,
};

export default RoleService;
