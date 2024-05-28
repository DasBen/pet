export interface ElectroDBValidationError {
    _original: {
        id: string
        createdAt: number
        updatedAt: number
        type: string
        animalType: string
        name: string
        profileImageUrl: string
        bannerImageUrl: string
        description: string
        followers: number
        following: number
    }
    details: Detail[]
}

interface Detail {
    message: string
    path: string[] // Assuming path is an array of strings
    type: string
    context: {
        key: string
        label: string
    }
}
