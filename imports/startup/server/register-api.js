/* eslint-disable import/no-unresolved */
import merge from 'lodash/merge';
import AdminsSchema from '../../api/admin/admins.graphql';
import CustomerSchema from '../../api/customer/customer.graphql';
import AdminResolver from '../../api/admin/resolver';
import CustomerResolver from '../../api/customer/resolver';

// asdasawawdwa

const { ApolloServer } = require('apollo-server');

const typeDefs = [

  AdminsSchema,
  CustomerSchema,

];

const resolvers = merge(

  CustomerResolver,
  AdminResolver,

);


const server = new ApolloServer({
  typeDefs,
  resolvers,
});


server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
