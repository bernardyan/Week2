import { buildSchema } from 'graphql'

export default buildSchema(`
  scalar Date

  type Platform {
    id: ID!
    service: String!
  }
  
  type Producer {
    id: ID!
    name: String!
  }
  
  type Category {
    id: ID!
    name: String!
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
  
  input MovieUpdate {
    id: ID!
    title: String
    description: String
  }
  
  input AddRelation {
    platform: String!
    movie: String!
  }
  
  input AddCategory {
    category: String
    movie: String
  }

  type Query {
    getMoviePlatform(name: String!): [Platform]
    getAllProducers: [Producer]
    getMoviesByProducer(name: String!): [Movie]
    getAllCategories: [Category]
    getMoviesByCategory(name: String!): [Movie]
  }
  
  type Mutation {
    deleteMovie (id: ID): SuccessResponse
    updateMovie (update: MovieUpdate!): SuccessResponse
    addRelation (update: AddRelation!): SuccessResponse
    addCategory (update: AddCategory!): SuccessResponse 
  }
 
`);


// getAllProducers(): [Producer]
// getMoviesByProducer(name: String!): [Movie]
// getAllCategories(): [Category]
// getMoviesByCategory(name: String!): [Movie]

// input CardUpdate {
//     id: ID!
//         name: String
//     description: String
// }

// type Mutation {
//     updateCard (update: CardUpdate!): Card
// }
