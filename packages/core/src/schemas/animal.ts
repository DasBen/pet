// Generated by ts-to-zod
import {z} from 'zod'

import {baseProfileSchema} from './baseProfile'

export const animalSchema = baseProfileSchema.extend({
  animalType: z.string(),
  monthlyFundingGoal: z.number().optional(),
  lifetimeFundingGoal: z.number().optional(),
  location: z.string().optional(),
  motherId: z.string().optional(),
  fatherId: z.string().optional(),
  siblings: z.array(z.string()).optional(),
  children: z.array(z.string()).optional(),
  ownerId: z.string().optional(),
  caretakerId: z.string().optional(),
  organizationId: z.string().optional()
})

export const animalPatchSchema = animalSchema.omit({id: true, createdAt: true, updatedAt: true})