export type Role = {
  id: string;
  name: string;
  description: string;
};

export type RoleArray = Role[];
export type RoleChangeType = Role & { isUserHas: boolean };
