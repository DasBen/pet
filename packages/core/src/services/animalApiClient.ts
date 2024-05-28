import {QueryResponse} from 'electrodb'
import {AnimalEntity} from '../entities/animal'
import {ElectroDBValidationError} from '../interfaces/electroDBValidationError'
import {Animal} from '../interfaces/animal'

class AnimalApiClient {
    private apiUrl: string

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl
    }

    async post(animal: Animal): Promise<Animal> {
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

        return (await response.json()) as Animal
    }

    async put(animal: Animal): Promise<Animal> {
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

        return (await response.json()) as Animal
    }

    async get(id: string): Promise<Animal | null> {
        const response = await fetch(`${this.apiUrl}/animal/${id}`)

        if (!response.ok) {
            throw new Error('Failed to fetch animal')
        }

        return (await response.json()) as Animal
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
            console.log(errorJson)
            throw new Error(`Failed to delete animal: ${errorJson.details[0].message}`)
        }
    }
}

export default AnimalApiClient
