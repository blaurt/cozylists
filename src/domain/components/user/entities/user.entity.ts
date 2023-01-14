import { compare, hash } from "bcrypt";

import { BaseEntity, BaseEntityConstructorParams } from "../../../shared/entities/base-entity.entity";

// todo replace with adv encryptor
const ROUNDS = 10 as const;

export class User extends BaseEntity {
    public constructor(public username: string, public email: string, public passwordHash?: string, baseParams?: BaseEntityConstructorParams) {
        super(baseParams);
    }

    public async validatePassword(input: string, passwordHash: string): Promise<boolean> {
        return compare(input, passwordHash);
    }

    public async generatePasswordHash(password: string): Promise<string> {
        return await hash(password, ROUNDS);
    }
}
