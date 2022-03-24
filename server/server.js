const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema/schema');

const url = 'mongodb://localhost:37017/chemistwarehouse';
// const url =
// 'mongodb://localhost:37017/?readPreference=primary&appname=chemistwarehouse&directConnection=true&ssl=false';

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log('listening', port);
    });
  })
  .catch((err) => console.log(err));
