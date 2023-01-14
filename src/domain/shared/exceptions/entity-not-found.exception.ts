import { BaseEntity } from "../entities/base-entity.entity";
import { ClientException } from "./client.exception";

function composeMessage(entityId: BaseEntity["entityId"]) {
    return `Entity with id: "${entityId}" was not found`;
}

export class EntityNotFoundException extends ClientException {
    public constructor(message: string, entityId?: BaseEntity["entityId"]) {
        super(entityId
            ? composeMessage(entityId)
            : message ?? "");
    }
}
