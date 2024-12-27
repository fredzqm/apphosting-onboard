// pages/api/graphql.js

import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { GraphQLResolveInfo } from "graphql";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { GraphQLResolverMap } from "@apollo/subgraph/dist/schema-helper";

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

interface Resolvers<ResolverContext> extends GraphQLResolverMap<any> {
  Query: {
    user: (
      parent: void,
      args: any,
      context: ResolverContext,
      info: GraphQLResolveInfo
    ) => User;
  };
  Mutation: {
    createUser: (
      parent: void,
      args: { name: string; email: string },
      context: ResolverContext,
      info: any
    ) => User;
  };
}

// The root provides a resolver function for each API endpoint
const resolvers: Resolvers<NextRequest> = {
  Query: {
    user: function (
      parent: void,
      args: any,
      context: NextRequest,
      info: GraphQLResolveInfo
    ): User {
      throw new Error("Function not implemented.");
    },
  },
  Mutation: {
    createUser: function (
      parent: void,
      args: { name: string; email: string },
      context: NextRequest,
      info: any
    ): User {
      throw new Error("Function not implemented.");
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
