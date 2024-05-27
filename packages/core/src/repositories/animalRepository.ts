import {Animal, AnimalInterface} from '../entities/animalEntity'
import {
    DeleteQueryOptions,
    PutQueryOptions,
    QueryOptions,
    QueryResponse,
    UpdateQueryParams
} from 'electrodb'

export class AnimalRepository {
    /**
     * Creates a new object in the database.
     *
     * @param object Object
     * @param params PutQueryOptions (optional)
     * @returns Promise<AnimalInterface>
     * @throws Error if the Animal object already exists
     */
    async create(object: AnimalInterface, params?: PutQueryOptions): Promise<AnimalInterface> {
        const result = await Animal.create(object).go(params)
        return <AnimalInterface>result.data
    }

    /**
     * Retrieves an object from the database.
     * If the object does not exist, undefined is returned.
     *
     * @param id Animal ID
     * @param params QueryOptions (optional)
     * @returns Promise<AnimalInterface | undefined>
     */
    async get(id: string, params?: QueryOptions): Promise<AnimalInterface | undefined> {
        const result = await Animal.get({id}).go(params)
        return <AnimalInterface>result.data
    }

    /**
     * Updates an object if it exists, otherwise creates it.
     *
     * @param object Object
     * @param params UpdateQueryParams (optional)
     * @returns Promise<AnimalInterface>
     */
    async upsert(object: AnimalInterface, params?: UpdateQueryParams): Promise<AnimalInterface> {
        const result = await Animal.upsert(object).go(params)
        return <AnimalInterface>result.data
    }

    /**
     * Creates a new object in the database.
     * If the object already exists, the existing object is returned *without modifications*.
     *
     * @param object Object
     * @param params PutQueryOptions (optional)
     * @returns Promise<AnimalInterface>
     * @throws Error if the Animal object already exists
     */
    async put(object: AnimalInterface, params?: PutQueryOptions): Promise<AnimalInterface> {
        const result = await Animal.put(object).go(params)
        return <AnimalInterface>result.data
    }

    /**
     * Updates an object.
     * If the object does not exist, an error is thrown.
     *
     * @param id ID
     * @param object Object
     * @param params UpdateQueryParams (optional)
     * @returns Promise<AnimalInterface>
     * @throws Error if the object does not exist
     *
     */
    async patch(
        id: string,
        object: AnimalInterface,
        params?: UpdateQueryParams
    ): Promise<AnimalInterface> {
        // Return complete object if response is not set
        if (params?.response === 'default') {
            params.response = 'all_new'
        }
        const result = await Animal.patch({id}).set(object).go(params)
        return <AnimalInterface>result.data
    }

    /**
     * Updates an object.
     * If the object does not exist, it is created.
     *
     * @param id ID
     * @param object Object
     * @param params UpdateQueryParams (optional)
     * @returns Promise<AnimalInterface>
     */
    async update(
        id: string,
        object: AnimalInterface,
        params?: UpdateQueryParams
    ): Promise<Partial<AnimalInterface>> {
        // Return complete object if response is not set
        if (params?.response === 'default') {
            params.response = 'all_new'
        }

        // remove read-only fields
        delete object.id
        delete object.createdAt
        delete object.updatedAt

        const result = await Animal.update({id}).set(object).go(params)
        return <AnimalInterface>result.data
    }

    /**
     * Deletes an object.
     * If the object does not exist, no error is thrown.
     *
     * @param id ID
     * @param params DeleteQueryOptions (optional)
     * @returns Promise<void>
     */
    async delete(id: string, params?: DeleteQueryOptions): Promise<void> {
        await Animal.delete({id}).go(params)
    }

    /**
     * Deletes all objects.
     *
     * @returns Promise<void>
     */
    async truncateEntity(): Promise<void> {
        // Retrieve all pages for the Entity
        const result = await Animal.scan.go({pages: 'all'})

        // Prepare PK/SK for all items in Batch
        const toDelete = result.data.map((item) => ({
            id: item.id
        }))

        // Delete all items with Delete Batch
        await Animal.delete(toDelete).go()
    }

    /**
     * Deletes an object.
     * If the object does not exist, an error is thrown.
     *
     * @param id ID
     * @param params DeleteQueryOptions (optional)
     * @returns Promise<void>
     * @throws Error if the object does not exist
     */
    async remove(id: string, params?: DeleteQueryOptions): Promise<void> {
        await Animal.remove({id}).go(params)
    }

    /**
     * Query by type
     *
     * @param type
     * @param params QueryOptions (optional)
     * @returns Promise<AnimalInterface[]>
     */
    async listByType(type: string, params?: QueryOptions): Promise<QueryResponse<typeof Animal>> {
        const result = await Animal.query.byType({type}).go(params)
        return result
    }
}
