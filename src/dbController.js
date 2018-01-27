import { bookModel, userModel } from './models.js'

function registerUser(userName, password, firstName, lastName, city, state) {
  var query = {
    userName,
    password
  }
  console.log('t')
  return new Promise((resolve, reject) => {
    userModel.find(query, (err, user) => {
      if (err) {
        console.log(err)
        resolve(false)
      }
      if (user.length !== 0) {
        resolve(false)
      } else {
        var newUser = new userModel();
        newUser.userName = userName;
        newUser.password = password;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.city = city;
        newUser.state = state;
        newUser.save((err, final) => {
          if(err){
            console.log(err)
          }
          resolve(final)
        })
      }
    })
  })
}

function authenticate(userName, password) {
  return new Promise((resolve, reject) => {
    userModel.find({ userName, password }).exec((err, user) => {
      if (err) {
        console.log(err)
      }
      console.log(user)
      resolve(user)
    })
  })
}


function addBook(title) {
  return Promise((resolve, reject) => {
    var testModel = new bookModel({ title })
    testModel.save((err, d) => {
      if (err) {
        console.log(err)
      }
      console.log(d)
      resolve()
    });
  })
}

function requestTrade() {

}

function updateUser() {

}

function acceptTrade() {

}

function findBooksForTrade(currentPage) {
  return new Promise((resolve, reject) => {
    bookModel.find().sort('title').skip(currentPage * 12 - 12).limit(12).exec((err, docs) => {
      if (err) {
        console.log(err)
      }

      console.log(docs)
      resolve(docs)
      // Query for total Pages
    });
  })
}

export default {
  registerUser,
  authenticate,
  addBook,
  requestTrade,
  updateUser,
  acceptTrade,
  findBooksForTrade
}
