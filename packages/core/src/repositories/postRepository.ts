import {
    DeleteQueryOptions,
    PutQueryOptions,
    QueryOptions,
    QueryResponse,
    UpdateQueryParams
} from 'electrodb'
import {PostEntity, PostInterface, removeReadOnlyFields} from '../entities/post'
import {Animal2PostEntity} from '../entities/animal2Post'
import {AnimalEntity} from '../entities/animal'

export class PostRepository {
    /**
     * Creates a new object in the database.
     *
     * @param object Object
     * @param params PutQueryOptions (optional)
     * @returns Promise<PostInterface>
     * @throws Error if the Post object already exists
     */
    async create(object: PostInterface, params?: PutQueryOptions): Promise<PostInterface> {
        const result = await PostEntity.create(object).go(params)
        return <PostInterface>result.data
    }

    /**
     * Retrieves an object from the database.
     * If the object does not exist, null is returned.
     *
     * @param id Post ID
     * @param params QueryOptions (optional)
     * @returns Promise<PostInterface | null>
     */
    async get(id: string, params?: QueryOptions): Promise<PostInterface | null> {
        const result = await PostEntity.get({id}).go(params)
        return <PostInterface>result.data
    }

    /**
     * Updates an object if it exists, otherwise creates it.
     *
     * @param object Object
     * @param params UpdateQueryParams (optional)
     * @returns Promise<PostInterface>
     */
    async upsert(object: PostInterface, params?: UpdateQueryParams): Promise<PostInterface> {
        const result = await PostEntity.upsert(object).go(params)
        return <PostInterface>result.data
    }

    /**
     * Creates a new object in the database.
     * If the object already exists, the existing object is returned *without modifications*.
     *
     * @param object Object
     * @param params PutQueryOptions (optional)
     * @returns Promise<PostInterface>
     * @throws Error if the Post object already exists
     */
    async put(object: PostInterface, params?: PutQueryOptions): Promise<PostInterface> {
        const result = await PostEntity.put(object).go(params)
        return <PostInterface>result.data
    }

    /**
     * Updates an object.
     * If the object does not exist, an error is thrown.
     *
     * @param id ID
     * @param object Object
     * @param params UpdateQueryParams (optional)
     * @returns Promise<PostInterface>
     * @throws Error if the object does not exist
     *
     */
    async patch(
        id: string,
        object: PostInterface,
        params?: UpdateQueryParams
    ): Promise<PostInterface> {
        // Return complete object if response is not set
        params = params || {response: 'all_new'}

        // remove read-only fields
        const cleanObject = removeReadOnlyFields(object)

        const result = await PostEntity.patch({id}).set(cleanObject).go(params)
        return <PostInterface>result.data
    }

    /**
     * Updates an object.
     * If the object does not exist, it is created.
     *
     * @param id ID
     * @param object Object
     * @param params UpdateQueryParams (optional)
     * @returns Promise<PostInterface>
     */
    async update(
        id: string,
        object: PostInterface,
        params?: UpdateQueryParams
    ): Promise<Partial<PostInterface>> {
        // Return complete object if response is not set
        params = params || {response: 'all_new'}

        // remove read-only fields
        const cleanObject = removeReadOnlyFields(object)

        const result = await PostEntity.update({id}).set(cleanObject).go(params)
        return <PostInterface>result.data
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
        await PostEntity.delete({id}).go(params)
    }

    /**
     * Deletes all objects.
     *
     * @returns Promise<void>
     */
    async truncateEntity(): Promise<void> {
        // Retrieve all pages for the Entity
        const result = await PostEntity.scan.go({pages: 'all'})

        // Prepare PK/SK for all items in Batch
        const toDelete = result.data.map((item) => ({
            id: item.id
        }))

        // Delete all items with Delete Batch
        await PostEntity.delete(toDelete).go()
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
        await PostEntity.remove({id}).go(params)
    }

    /**
     * Retrieves all objects.
     *
     * @param params QueryOptions (optional)
     * @returns Promise<QueryResponse<typeof Post>>
     */
    async byUserId(
        userId: string,
        pinned: boolean = false,
        params?: QueryOptions
    ): Promise<QueryResponse<typeof PostEntity>> {
        const query = PostEntity.query.byUserId({userId})
        query.where((attr, op) => op.eq(attr.pinned, pinned))

        return query.go(params)
    }

    /**
     * Retrieves all Posts for a given Animal ID.
     *
     * @param params QueryOptions (optional)
     * @returns Promise<QueryResponse<typeof Post>>
     */
    async byAnimalId(
        animalId: string,
        params?: QueryOptions
    ): Promise<QueryResponse<typeof PostEntity>> {
        // Get Animal
        const animal = await AnimalEntity.get({id: animalId}).go()

        if (!animal.data) {
            return {
                data: [],
                cursor: null
            }
        }

        // Get Junction
        const animal2Post = await Animal2PostEntity.query.byAnimalId({animalId}).go(params)

        if (!animal2Post.data.length) {
            return {
                data: [],
                cursor: null
            }
        }

        // Get Posts
        const postIds = animal2Post.data.map((item) => {
            return {
                id: item.postId
            }
        })

        const posts = await PostEntity.get(postIds).go()

        return {
            data: posts.data,
            cursor: animal2Post.cursor // Use cursor from the Junction Query, so that pagination is working
        }
    }
}
