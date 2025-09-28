export const allRoles = {
  user: ["vehicale"],
  admin: ["vehicale"],
  operator: ["vehicale"],
} as const;

export type Role = keyof typeof allRoles;
export type Permission = (typeof allRoles)[Role][number];

// roles stays the same
export const roles: Role[] = Object.keys(allRoles) as Role[];

// Notice `readonly Permission[]`
export const roleRights: Map<Role, readonly Permission[]> = new Map(
  Object.entries(allRoles) as [Role, readonly Permission[]][],
);
