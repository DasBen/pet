import {AnimalEntity, AnimalInterface, removeReadOnlyFields} from '../entities/animal'
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
        const result = await AnimalEntity.create(object).go(params)
        return <AnimalInterface>result.data
    }

    /**
     * Retrieves an object from the database.
     * If the object does not exist, null is returned.
     *
     * @param id Animal ID
     * @param params QueryOptions (optional)
     * @returns Promise<AnimalInterface | null>
     */
    async get(id: string, params?: QueryOptions): Promise<AnimalInterface | null> {
        const result = await AnimalEntity.get({id}).go(params)
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
        const result = await AnimalEntity.upsert(object).go(params)
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
        const result = await AnimalEntity.put(object).go(params)
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
        params = params || {response: 'all_new'}

        // remove read-only fields
        const cleanObject = removeReadOnlyFields(object)

        const result = await AnimalEntity.patch({id}).set(cleanObject).go(params)
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
        params = params || {response: 'all_new'}

        // remove read-only fields
        const cleanObject = removeReadOnlyFields(object)

        const result = await AnimalEntity.update({id}).set(cleanObject).go(params)
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
        await AnimalEntity.delete({id}).go(params)
    }

    /**
     * Deletes all objects.
     *
     * @returns Promise<void>
     */
    async truncateEntity(): Promise<void> {
        // Retrieve all pages for the Entity
        const result = await AnimalEntity.scan.go({pages: 'all'})

        // Prepare PK/SK for all items in Batch
        const toDelete = result.data.map((item) => ({
            id: item.id
        }))

        // Delete all items with Delete Batch
        await AnimalEntity.delete(toDelete).go()
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
        await AnimalEntity.remove({id}).go(params)
    }

    /**
     * Query by type
     *
     * @param type string
     * @param params QueryOptions (optional)
     * @returns QueryResponse<typeof AnimalEntity>
     */
    async listByType(
        type: string,
        params?: QueryOptions
    ): Promise<QueryResponse<typeof AnimalEntity>> {
        type = type.toLowerCase()
        params = params || {order: 'desc'}

        const result = await AnimalEntity.query.byType({type}).go(params)
        return result
    }

    /**
     * Query by animalType
     *
     * @param animalType string
     * @param params QueryOptions (optional)
     * @returns QueryResponse<typeof AnimalEntity>
     */
    async listByAnimalType(
        animalType: string,
        params?: QueryOptions
    ): Promise<QueryResponse<typeof AnimalEntity>> {
        animalType = animalType.toLowerCase()
        params = params || {order: 'desc'}

        const result = await AnimalEntity.query.byAnimalType({animalType}).go(params)
        return result
    }

    /**
     * Get Animal by name
     *
     * @param name string
     * @param params QueryOptions (optional)
     * @returns Promise<QueryResponse<typeof Animal>>
     */
    async getByName(name: string, params?: QueryOptions): Promise<AnimalInterface | null> {
        const result = await AnimalEntity.query.byName({name}).go(params)
        return <AnimalInterface>result.data[0]
    }
}
