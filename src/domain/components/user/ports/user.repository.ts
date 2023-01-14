import { BaseRepository } from "../../../shared/interfaces/base-repository.interface";
import { User } from "../entities/user.entity";

export interface UserRepository extends BaseRepository<User> {
    getBannedUsers(): Promise<User[]>;
    getByUsernameOrEmail(username: User["username"], email: User["email"]);
    findByUsername(username: User["username"]): Promise<User | null>;
}

export const UserRepositoryInjectionToken = Symbol("UserRepository");
