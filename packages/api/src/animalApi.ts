// import {ApiHandler} from 'sst/node/api'
// import {useSession} from 'sst/node/auth'

// const userRepository = new UserDTORepository()

// export const get = ApiHandler(async () => {
//     const userDTO = await userRepository.get(
//         UserDTO.createPK(),
//         UserDTO.createSK('google', session.properties.userId)
//     )

//     if (!userDTO) {
//         console.error('User not found')
//         return {
//             statusCode: 404,
//             body: JSON.stringify({message: 'User not found'})
//         }
//     }

//     // Check expiration
//     const expiredAt = userDTO.expiresAt * 1000
//     const expireDate = new Date(expiredAt)
//     const currentDate = new Date()

//     if (expireDate.getTime() < currentDate.getTime()) {
//         console.error('Session has expired. Please login again.')
//         return {
//             statusCode: 401,
//             body: JSON.stringify({
//                 message: 'Session has expired. Please login again.'
//             })
//         }
//     }

//     return {
//         statusCode: 200,
//         body: JSON.stringify(userDTO)
//     }
// })
