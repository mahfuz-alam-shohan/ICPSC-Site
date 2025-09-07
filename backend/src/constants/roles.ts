export const Roles = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  LIBRARIAN: "librarian",
  STAFF: "staff",
  DRIVER: "driver",
  OFFICER: "officer",
} as const;
export type Role = typeof Roles[keyof typeof Roles];
