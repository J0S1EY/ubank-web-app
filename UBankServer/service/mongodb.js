// connection between server and mongodb
// import mangoose

const mongoose = require('mongoose')

// define connection string mongodb wth node
mongoose.connect("mongodb+srv://josy:josinvjoy@accounts.sogrvag.mongodb.net/bank?retryWrites=true&w=majority",
  (error) => {
    if (error) {
      return (error).then((error) => {
        console.log("connection error"+error)
      });
    }
    console.log("Connected to bank atlas successfully!");
  }
);

// create model to connect database collection in mongodatabase
const Account = mongoose.model('Account', { //name should same as collection name 
  acno: Number,
  password: String,
  username: String,
  email: String,
  balance: Number,
  transaction: [],
  cardbalance: Number,
  creditcard: []
});

//exporting model
module.exports = {
  Account
}


