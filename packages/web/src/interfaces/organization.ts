import {BaseProfile} from './baseProfile'
import {UserProfile} from './user'

export interface Organization extends BaseProfile {
    address: string
    email: string
    phone?: string
    web?: string
    caretakers: UserProfile[]
}
