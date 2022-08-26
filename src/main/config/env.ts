export default {
  mongoUrl: process.env.MONGO_URL,// || 'mongodb+srv://cabraldev:HjrKZg6mtYhsC9mr@clustercenter.kwe8j.mongodb.net/clean-node-api?retryWrites=true&w=majority',
  port: process.env.PORT || 5356,
  jwtSecret: process.env.JWT_SECRET || 'dsdwn==5h'
}
