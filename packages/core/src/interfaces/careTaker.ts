import {Animal} from './animal'
import {Organization} from './organization'

export interface CaretakerProfile {
    animalsCaredFor?: Animal[]
    yearsOfExperience?: number
    qualifications?: string[]
    workSchedule?: string
    location?: string
    organization?: Organization
}
