export type Permission = {
  id: string;
  code: string;
  name: string;
  description: string;
};

export type PermissionArray = Permission[];

export type PermissionChangeType = Permission & { isUserHas: boolean };
