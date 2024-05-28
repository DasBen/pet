export interface BaseSchema {
    id?: string
    createdAt?: number
    updatedAt?: number
    deleteAt?: number
}

export type BaseSchemaReadOnlyFields = 'id' | 'createdAt' | 'updatedAt'
