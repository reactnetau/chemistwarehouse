const graphQL = require('graphql');
const Product = require('./../model/Product');

const _ = require('lodash');
const { truncate } = require('lodash');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} = graphQL;

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Documentation for Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString },
  }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },

      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    CreateProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
      },

      resolve(parent, args) {
        let product = Product({
          name: args.name,
          price: args.price,
          description: args.description,
        });

        return product.save();
      },
    },

    UpdateProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        description: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return (updateProduct = Product.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              price: args.price,
              description: args.description,
            },
          },
          {
            new: true,
          }
        ));
      },
    },
    DeleteProduct: {
      type: ProductType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let removedProduct = Product.findByIdAndRemove(args.id).exec();

        if (!removedProduct) {
          throw new 'Error'();
        }

        return removedProduct;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
