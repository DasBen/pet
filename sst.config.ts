import {SSTConfig} from 'sst'
import {PetStack} from './stacks/PetStack'

export default {
    config(_input) {
        return {
            name: 'pet',
            region: 'eu-central-1'
        }
    },
    stacks(app) {
        app.stack(PetStack, {stackName: `${app.name}-${app.stage}`})
    }
} satisfies SSTConfig
