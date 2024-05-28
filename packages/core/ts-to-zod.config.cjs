/**
 * ts-to-zod configuration.
 *
 * @type {import("ts-to-zod").TsToZodConfig}
 */
module.exports = [
  {name: 'animal', input: 'src/interfaces/animal.ts', output: 'src/schemas/animal.ts'},
  {
    name: 'animal2post',
    input: 'src/interfaces/animal2post.ts',
    output: 'src/schemas/animal2post.ts'
  },
  {
    name: 'baseProfile',
    input: 'src/interfaces/baseProfile.ts',
    output: 'src/schemas/baseProfile.ts'
  },
  {
    name: 'baseSchema',
    input: 'src/interfaces/baseSchema.ts',
    output: 'src/schemas/baseSchema.ts'
  },
  {
    name: 'mention',
    input: 'src/interfaces/mention.ts',
    output: 'src/schemas/mention.ts'
  },
  {
    name: 'post',
    input: 'src/interfaces/post.ts',
    output: 'src/schemas/post.ts'
  }
]
