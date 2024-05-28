import {ApiHandler} from 'sst/node/api'
import {AnimalRepository} from '@luna/core/repositories/animalRepository'
import {z} from 'zod'
import {Animal, AnimalPatch} from '@luna/core/interfaces/animal'
import {animalSchema} from '@luna/core/schemas/animal'

const apiRepository = new AnimalRepository()

export const post = ApiHandler(async (event) => {
    // Parse the request body
    const requestBody = <Animal>JSON.parse(event.body || '{}')

    // Validate the request body
    const validation = animalSchema.safeParse(requestBody)
    if (!validation.success) {
        console.error(validation.error)
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validation.error)
        }
    }

    // Create the animal
    const animal = await apiRepository.create(requestBody)

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animal)
    }
})

export const get = ApiHandler(async (event) => {
    // Get the animal ID from the path
    const id = event.pathParameters?.id

    // Validate the animal ID
    const validation = animalSchema.shape.id.safeParse(id)
    if (!validation.success) {
        console.error(validation.error)
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validation.error)
        }
    }

    // Get the animal
    const animal = await apiRepository.get(id!)

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animal)
    }
})

export const list = ApiHandler(async (event) => {
    // Get the animal type from the query string
    const type = event.queryStringParameters?.type
    const animalType = event.queryStringParameters?.animalType

    // Validate the animal type
    const querySchema = z.object({
        type: z.string().optional(),
        animalType: z.string().optional()
    })
    const validation = querySchema.safeParse({type, animalType})
    if (!validation.success) {
        console.error(validation.error)
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validation.error)
        }
    }

    // List the animals
    if (type) {
        const animals = await apiRepository.listByType(type)
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animals)
        }
    }

    if (animalType) {
        const animals = await apiRepository.listByAnimalType(animalType)
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animals)
        }
    }

    return {
        statusCode: 400,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({error: 'Missing query parameter'})
    }
})

export const put = ApiHandler(async (event) => {
    // Get the animal ID from the path
    const id = event.pathParameters?.id

    // Parse the request body
    const requestBody = <AnimalPatch>JSON.parse(event.body || '{}')

    // Validate the request body
    const validation = animalSchema.safeParse(requestBody)
    if (!validation.success) {
        console.error(validation.error)
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validation.error)
        }
    }

    // Update the animal
    const animal = await apiRepository.update(id!, requestBody)

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animal)
    }
})

export const del = ApiHandler(async (event) => {
    // Get the animal ID from the path
    const id = event.pathParameters?.id

    // Validate the animal ID
    const validation = animalSchema.shape.id.safeParse(id)
    if (!validation.success) {
        console.error(validation.error)
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validation.error)
        }
    }

    // Delete the animal
    await apiRepository.delete(id!)

    return {
        statusCode: 204
    }
})
