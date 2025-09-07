let roles = ["admin", "teacher", "student", "librarian", "staff", "driver", "officer"];

export function listRoles() {
  return roles;
}

export function addRole(role: string) {
  if (!roles.includes(role)) roles.push(role);
  return role;
}

export function removeRole(role: string) {
  roles = roles.filter(r => r !== role);
}
