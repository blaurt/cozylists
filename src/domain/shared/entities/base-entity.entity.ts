import { v4 } from "uuid";

export const BaseEntityImmutableFields: Readonly<Array<keyof BaseEntity>> = [
    "entityId",
    "createdAt",
    "updatedAt",
    "deletedAt",
] as const;

export interface BaseEntityConstructorParams {
    entityId?: BaseEntity["entityId"];
    createdAt?: BaseEntity["createdAt"];
    updatedAt?: BaseEntity["updatedAt"];
    deletedAt?: BaseEntity["deletedAt"];
}

export abstract class BaseEntity {
    // public readonly entityId: string;
    protected readonly _entityId: string;
    private readonly _createdAt: string;
    private readonly _updatedAt: string;
    private readonly _deletedAt: string | null;

    public constructor({ entityId, createdAt, updatedAt, deletedAt, }: BaseEntityConstructorParams = {}) {
        this._entityId = entityId ?? v4();
        // this.entityId = this._entityId;
        const dateNow = new Date().toISOString();
        this._createdAt = createdAt ?? dateNow;
        this._updatedAt = updatedAt ?? dateNow;
        this._deletedAt = deletedAt ?? null;

        // Object.defineProperty(this, '_entityId', {
        //     configurable: false, // no re-configuring this.password
        //     enumerable: false, // this.password should show up in Object.keys(this)
        //     writable: true // no changing the value with this.password = ...
        // });
    // Object.defineProperty(this, 'entityId', {
    //         configurable: false, // no re-configuring this.password
    //         enumerable: true, // this.password should show up in Object.keys(this)
    //         value: this._entityId,
    //         writable: false // no changing the value with this.password = ...
    //     });
    }

    get entityId() {
        return this._entityId;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    get deletedAt() {
        return this._deletedAt;
    }
}
