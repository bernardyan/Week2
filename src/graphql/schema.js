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


  type Query {
    getMoviePlatform(name: String!): [Platform]
    getAllProducers: [Producer]
    Producers: [Producer]
    getMoviesByProducer(name: String!): [Movie]
    getAllCategories: [Category]
    getMoviesByCategory(name: String!): [Movie]
   
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
