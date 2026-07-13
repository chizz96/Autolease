import { EntitySchema } from "typeorm";

export const AuthEntity = new EntitySchema({
    name: "Auth",
    tableName: "auth",
    columns: {
        
        id: {
            primary: true,
            type: "uuid",
            generated: "uuid",
        },

        tokenHash: {
            type: "varchar",
        },

        expiresAt: {
            type: "timestamp",
        },

        revoked: {
            type: "boolean",
            default: false,
        },

        createdAt: {
            createDate: true,
        },

    },

    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "auth",
            joinColumn: { name: "userId" },
            oneDelete: "CASCADE",
        },
    },

});