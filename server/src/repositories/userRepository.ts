import { users } from '../data.js';
import type { User } from '../domain.js';
export class UserRepository {
  list(): User[] {
    return users;
  }
  create(name: string, email: string, role: User['role']) {
    const user = { id: Math.max(...users.map((item) => item.id)) + 1, name, email, role };
    users.push(user);
    return user;
  }
  update(id: number, data: Partial<User>) {
    const user = users.find((item) => item.id === id);
    if (!user) return undefined;
    Object.assign(user, data);
    return user;
  }
  delete(id: number) {
    const index = users.findIndex((user) => user.id === id);
    if (index < 0) return false;
    users.splice(index, 1);
    return true;
  }
}
