import { Role, Roles } from "../../constants/roles";

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
}

const users: User[] = [
  {
    id: 1,
    username: "admin",
    // password: "admin"
    password: "$2b$10$0TnDNFY.41ItaoE0yCji5u3Gdi2CsDSBG2hIUT6ztGUVSXmtRbNd.",
    role: Roles.ADMIN,
  },
];

export function addUser(data: Omit<User, "id">): User {
  const user: User = { id: users.length + 1, ...data };
  users.push(user);
  return user;
}

export function getUserByUsername(username: string): User | undefined {
  return users.find(u => u.username === username);
}

export function listUsers(): User[] {
  return users;
}

export function updateUser(id: number, data: Partial<Omit<User, "id">>): User | null {
  const user = users.find(u => u.id === id);
  if (!user) return null;
  Object.assign(user, data);
  return user;
}

export function deleteUser(id: number): boolean {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}
