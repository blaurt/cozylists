import { BaseEntity } from "../entities/base-entity.entity";

export type PaginationOptions = Partial<{
    limit: number;
    offset: number;
    includeDeleted: boolean;
}>;

export interface GetByIdOptions {
    includeDeleted?: boolean;
}

export interface BaseRepository<T extends BaseEntity> {
    save(entity: T): Promise<T>;
    update(entityId: T["entityId"], payload: Partial<T>): Promise<T>;
    getById(entityId: T["entityId"], options?: GetByIdOptions): Promise<T | null>;
    getList<TGetListCondition = Record<keyof T, T[keyof T]>>(cond: TGetListCondition, options?: PaginationOptions): Promise<T[]>;
    delete(entityId: T["entityId"]): Promise<void>;
}

export type MatchParams<T extends BaseEntity> = Record<keyof T, T[keyof T]>;
