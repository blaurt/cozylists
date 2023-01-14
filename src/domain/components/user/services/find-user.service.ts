import { inject, injectable } from "inversify";

import { EntityNotFoundException } from "../../../shared/exceptions/entity-not-found.exception";
import { User } from "../entities/user.entity";
import { UserRepository, UserRepositoryInjectionToken } from "../ports/user.repository";

@injectable()
export class FindUserService {
    public constructor(@inject(UserRepositoryInjectionToken) private readonly repository: UserRepository) {}

    public async findByUsername(username: User["username"]): Promise<User> {
        const user = await this.repository.findByUsername(username);
        console.log("🚀 ~ file: find-user.service.ts ~ line 13 ~ FindUserService ~ findByUsername ~ user", user);
        if (!user) {
            throw new EntityNotFoundException("User was not found");
        }

        return user;
    }
}
