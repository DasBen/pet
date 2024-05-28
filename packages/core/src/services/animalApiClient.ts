import {ElectroError, ElectroValidationError, QueryResponse} from 'electrodb'
import {AnimalEntity, AnimalInterface} from '../entities/animal'
import {ElectroDBValidationError} from '../interfaces/electroDBValidationError'

class AnimalApiClient {
    private apiUrl: string

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl
    }

    async post(animal: AnimalInterface): Promise<AnimalInterface> {
        const response = await fetch(`${this.apiUrl}/animal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animal)
        })

        if (!response.ok) {
            const errorJson = (await response.json()) as ElectroDBValidationError
            throw new Error(`Failed to create animal: ${errorJson.details[0].message}`)
        }

        return (await response.json()) as AnimalInterface
    }

    async put(animal: AnimalInterface): Promise<AnimalInterface> {
        const response = await fetch(`${this.apiUrl}/animal/${animal.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animal)
        })

        if (!response.ok) {
            const errorJson = (await response.json()) as ElectroDBValidationError
            throw new Error(`Failed to update animal: ${errorJson.details[0].message}`)
        }

        return (await response.json()) as AnimalInterface
    }

    async get(id: string): Promise<AnimalInterface> {
        const response = await fetch(`${this.apiUrl}/animal/${id}`)

        if (!response.ok) {
            throw new Error('Failed to fetch animal')
        }

        return (await response.json()) as AnimalInterface
    }

    async list(request: {
        type?: string
        animalType?: string
    }): Promise<QueryResponse<typeof AnimalEntity>> {
        const url = new URL(`${this.apiUrl}/animal`)
        if (request.type) {
            url.searchParams.set('type', request.type)
        }
        if (request.animalType) {
            url.searchParams.set('animalType', request.animalType)
        }

        const response = await fetch(url.toString())

        if (!response.ok) {
            const errorJson = (await response.json()) as ElectroDBValidationError
            throw new Error(`Failed to list animal: ${errorJson.details[0].message}`)
        }

        return (await response.json()) as QueryResponse<typeof AnimalEntity>
    }

    async delete(id: string): Promise<void> {
        const response = await fetch(`${this.apiUrl}/animal/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            const errorJson = (await response.json()) as ElectroDBValidationError
            throw new Error(`Failed to delete animal: ${errorJson.details[0].message}`)
        }
    }
}

export default AnimalApiClient
