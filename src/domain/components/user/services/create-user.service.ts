import { inject, injectable } from "inversify";

import { User } from "../entities/user.entity";
import { DuplicateUserException } from "../exceptions/duplicate-user.exception";
import { UserRepository, UserRepositoryInjectionToken } from "../ports/user.repository";

@injectable()
export class CreateUserService {
    public constructor(@inject(UserRepositoryInjectionToken) private readonly repository: UserRepository) {}

    public async createUser(email: User["email"], username: User["username"], password: string): Promise<User> {
        const doesUserExist = await this.areCredentialsAvailable(username, email);

        // todo refactor msg
        if (doesUserExist) {
            throw new DuplicateUserException("Username or email is already in use");
        }

        const newUser = new User(username, email);
        newUser.passwordHash = await newUser.generatePasswordHash(password);
        const user = await this.repository.save(newUser);

        return user;
    }

    private async areCredentialsAvailable(username: User["username"], email: User["email"]): Promise<boolean> {
        const results = await this.repository.getByUsernameOrEmail(username, email);

        return results.length > 0;
    }
}
