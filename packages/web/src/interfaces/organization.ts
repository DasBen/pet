import {BaseProfile} from './baseProfile'

export interface Organization extends BaseProfile {
    address: string
    email: string
    phone?: string
    web?: string
}
