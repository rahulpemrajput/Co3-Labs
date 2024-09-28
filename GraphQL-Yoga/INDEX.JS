import { createServer } from 'graphql-yoga';
import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString } from 'graphql';

// In-memory user store (replace this with Supabase logic)
const users = {};

// User Type Definition
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    username: { type: GraphQLString },
    coins: { type: GraphQLInt },
  },
});

// Root Query
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: { username: { type: GraphQLString } },
      resolve: (_, { username }) => users[username] || { username, coins: 0 },
    },
  },
});

// Mutations
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    incrementCoins: {
      type: UserType,
      args: { username: { type: GraphQLString }, amount: { type: GraphQLInt } },
      resolve: (_, { username, amount }) => {
        if (!users[username]) {
          users[username] = { username, coins: 0 };
        }
        users[username].coins += amount;
        return users[username];
      },
    },
  },
});

// Define GraphQL schema
const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

// Start the GraphQL server
const server = createServer({ schema });

server.start(() => console.log('GraphQL Server is running'));
