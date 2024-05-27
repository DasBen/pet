import {createEventBuilder, ZodValidator} from 'sst/node/event-bus'

export const Event = createEventBuilder({
    bus: 'bus',
    validator: ZodValidator
})
