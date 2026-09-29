import type { Group, User } from '../domain.js';
export interface GroupRepositoryContract { list(): Promise<Group[]>|Group[]; create(name:string,description:string):Promise<Group>|Group; update(id:number,data:Partial<Group>):Promise<Group|undefined>|Group|undefined; delete(id:number):Promise<boolean>|boolean; }
export interface UserRepositoryContract { list(): Promise<User[]>|User[]; create(name:string,email:string,role:User['role']):Promise<User>|User; update(id:number,data:Partial<User>):Promise<User|undefined>|User|undefined; delete(id:number):Promise<boolean>|boolean; }
