import {ApiHandler} from 'sst/node/api'
import {AnimalInterface} from '@luna/core/entities/animal'
import {AnimalRepository} from '@luna/core/repositories/animalRepository'
import Joi from 'joi'

const apiRepository = new AnimalRepository()

export const post = ApiHandler(async (event) => {
    // Parse the request body
    const requestBody = <AnimalInterface>JSON.parse(event.body || '{}')

    // Validate the request body
    const schema = Joi.object({
        type: Joi.string().required(),
        animalType: Joi.string().required(),
        name: Joi.string().required(),
        profileImageUrl: Joi.string().required(),
        bannerImageUrl: Joi.string().required(),
        description: Joi.string(),
        followers: Joi.number(),
        following: Joi.number(),
        birthday: Joi.string(),
        monthlyFundingGoal: Joi.number(),
        lifetimeFundingGoal: Joi.number(),
        location: Joi.string(),
        motherId: Joi.string(),
        fatherId: Joi.string(),
        siblings: Joi.array().items(Joi.string()),
        children: Joi.array().items(Joi.string()),
        ownerId: Joi.string(),
        caretakerId: Joi.string(),
        organizationId: Joi.string()
    })
    const {error} = schema.validate(requestBody)
    if (error) {
        console.error(error)
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(error)
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
    const schema = Joi.string().required()
    const {error} = schema.validate(id)
    if (error) {
        console.error(error)
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(error)
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
    const schema = Joi.object({
        type: Joi.string(),
        animalType: Joi.string()
    })
    const {error} = schema.validate({type, animalType})
    if (error) {
        console.error(error)
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(error)
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
    const requestBody = <AnimalInterface>JSON.parse(event.body || '{}')

    // Validate the request body
    const schema = Joi.object({
        id: Joi.string().required(),
        type: Joi.string().required(),
        animalType: Joi.string().required(),
        name: Joi.string().required(),
        profileImageUrl: Joi.string().required(),
        bannerImageUrl: Joi.string().required(),
        description: Joi.string(),
        followers: Joi.number(),
        following: Joi.number(),
        birthday: Joi.string(),
        monthlyFundingGoal: Joi.number(),
        lifetimeFundingGoal: Joi.number(),
        location: Joi.string(),
        motherId: Joi.string(),
        fatherId: Joi.string(),
        siblings: Joi.array().items(Joi.string()),
        children: Joi.array().items(Joi.string()),
        ownerId: Joi.string(),
        caretakerId: Joi.string(),
        organizationId: Joi.string(),
        createdAt: Joi.number(),
        updatedAt: Joi.number(),
        deleteAt: Joi.number()
    })
    const {error} = schema.validate(requestBody)
    if (error) {
        console.error(error)
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(error)
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
    const schema = Joi.string().required()
    const {error} = schema.validate(id)
    if (error) {
        console.error(error)
        return {
            statusCode: 400,
            body: JSON.stringify(error)
        }
    }

    // Delete the animal
    await apiRepository.delete(id!)

    return {
        statusCode: 204
    }
})
