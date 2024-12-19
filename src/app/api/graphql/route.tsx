// pages/api/graphql.js

import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Query {
    user(id: ID!): User
  }
  type Mutation {
    createUser(name: String!, email: String!): User
  }
`;

interface User {
  id: string;
  name: string;
  email: string;
}

// Sample user data
var users: { [key: string]: User } = {
  "1": {
    id: "1",
    name: "Fred",
    email: "fred@example.com",
  },
  "2": {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
  },
};

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    user: ({ id }: { id: string }): User => {
      return users[id];
    },
  },
  Mutation: {
    createUser: ({ name, email }: { name: string; email: string }): User => {
      const id = Math.random().toString(36).substring(2, 15);
      const newUser = { id, name, email };
      users[id] = newUser;
      return newUser;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
