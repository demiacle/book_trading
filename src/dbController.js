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
          if (err) {
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
    userModel.findOne({ userName, password }).exec((err, user) => {
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

function updateUser(userId, updateQuery) {
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate({ _id: userId }, updateQuery, { new: true }, (err, user) => {

      if (err) {
        console.log(err)
        resolve(false)
        return;
      }

      resolve(user)
    })
  })
}

function acceptTrade() {

}

function getBooksForTrade(currentPage) {
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

function searchBooksForTrade(query) {
  // Combine whitespace
  query = query.replace(/\s+/, ' ')
  // Escape regex characters
  query = query.replace(/[-[\]|{}*+?.,\\^$#]/g, "\\$&")
  // Split words
  query = query.split(' ')
  // Additional search on first three letters of each word
  var fuzzyQuery = query.map(i => '(' + i.substr(0, 3) + ')')
  query = query.map(i => '(' + i + ')')
  // Combine query and fuzzyQuery
  query = query.concat(fuzzyQuery)
  // Remove duplicates
  query = query.sort().filter((i, index, array) => {
    return !index || i !== array[index - 1]
  })
  // Limit query+fuzzyQuery to 20 searches
  query = query.slice(0, 20)

  query = query.join('|')
  query = new RegExp(query, 'i')
  return new Promise((resolve, reject) => {
    bookModel.find({ title: query }).limit(12).exec((err, docs) => {
      if (err) {
        console.log(err)
      }
      console.log(docs)
      resolve(docs)
    })
  })
}

export default {
  registerUser,
  authenticate,
  addBook,
  requestTrade,
  updateUser,
  acceptTrade,
  getBooksForTrade,
  searchBooksForTrade
}
