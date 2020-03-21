import { buildSchema } from 'graphql'

export default buildSchema(`
  scalar Date

  type Platform {
    id: ID!
    service: String!
  }

  type Movie {
    id: ID!
    title: String!
    description: String!
    created_on: Date!
    created_by: ID!
  }

  type SuccessResponse {
    wasSuccessful: Boolean!
  }



  type Query {
    getMoviePlatform(name: String!): [Platform]
  }

 
`);

// input CardUpdate {
//     id: ID!
//         name: String
//     description: String
// }

// type Mutation {
//     updateCard (update: CardUpdate!): Card
// }
