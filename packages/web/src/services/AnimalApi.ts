import {AnimalInterface} from '@core/entities/animalEntity'

class ApiClient {
    private apiUrl: string

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl
    }

    async createAnimal(animal: AnimalInterface): Promise<AnimalInterface> {
        const response = await fetch(`${this.apiUrl}/animal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animal)
        })

        if (!response.ok) {
            throw new Error('Failed to create animal')
        }

        return response.json()
    }

    async editAnimal(animal: AnimalInterface): Promise<AnimalInterface> {
        const response = await fetch(`${this.apiUrl}/animal/${animal.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(animal)
        })

        if (!response.ok) {
            throw new Error('Failed to edit animal')
        }

        return response.json()
    }

    async getAnimal(id: string): Promise<AnimalInterface> {
        const response = await fetch(`${this.apiUrl}/animal/${id}`)

        if (!response.ok) {
            throw new Error('Failed to fetch animal')
        }

        return response.json()
    }

    async deleteAnimal(id: string): Promise<void> {
        const response = await fetch(`${this.apiUrl}/animal/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Failed to delete animal')
        }
    }
}

export default ApiClient
