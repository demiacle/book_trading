import { bookModel, userModel } from "./models.js";

function registerUser(userName, password, firstName, lastName, city, state) {
  var query = {
    userName,
    password
  };
  return new Promise((resolve, reject) => {
    userModel.find(query, (err, user) => {
      if (err) {
        console.log(err);
        resolve(false);
      }
      if (user.length !== 0) {
        resolve(false);
      } else {
        var newUser = new userModel();
        newUser.requestedBooks = [];
        newUser.userName = userName;
        newUser.password = password;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.city = city;
        newUser.state = state;
        newUser.booksTraded = 0;
        newUser.save((err, final) => {
          if (err) {
            console.log(err);
          }
          resolve(final);
        });
      }
    });
  });
}
function authenticate(userName, password) {
  return new Promise((resolve, reject) => {
    userModel.findOne({ userName, password }).exec((err, user) => {
      if (err) {
        console.log(err);
      }
      console.log(user);
      resolve(user);
    });
  });
}
function addBookToList(title, thumbnail, user) {
  return new Promise((resolve, reject) => {
    var book = new bookModel({ title, thumbnail, user });
    book.save((err, d) => {
      if (err) {
        console.log(err);
      }
      console.log(d);
      resolve(true);
    });
  });
}
function requestBook(bookId, userId) {
  return new Promise((resolve, reject) => {
    bookModel.findOneAndUpdate(
      { _id: bookId, requestedByUser: { $exists: false } },
      { requestedByUser: userId },
      (err, post) => {
        if (err) {
          console.log(err);
        }
        userModel.findOneAndUpdate(
          { _id: userId },
          { $push: { requestedBooks: bookId } },
          (err, user) => {
            resolve(true);
          }
        );
      }
    );
  });
}
function updateUser(userId, updateQuery) {
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate(
      { _id: userId },
      updateQuery,
      { new: true },
      (err, user) => {
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(user);
      }
    );
  });
}
function acceptRequest(id, userId) {
  return new Promise((resolve, reject) => {
    bookModel.remove({ _id: id }, err => {
      if (err) {
        console.log(err);
      }
      userModel.findOneAndUpdate(
        { _id: userId },
        { $inc: { booksTraded: 1 } },
        { new: true },
        (err, user) => {
          if (err) {
            console.log(err);
          }
          resolve(user);
        }
      );
    });
  });
}
function denyRequest(id) {
  return new Promise((resolve, reject) => {
    bookModel.findOneAndUpdate(
      { _id: id },
      { $unset: { requestedByUser: 1 } },
      err => {
        if (err) {
          console.log(err);
        }
        resolve(true);
      }
    );
  });
}
function getBooksForTrade(currentPage) {
  return new Promise((resolve, reject) => {
    bookModel
      .find()
      .sort("title")
      .skip(currentPage * 12 - 12)
      .limit(12)
      .exec((err, docs) => {
        if (err) {
          console.log(err);
        }
        console.log(docs);
        resolve(docs);
      });
  });
}
function searchBooksForTrade(query) {
  // Combine whitespace
  query = query.replace(/\s+/, " ");
  // Escape regex characters
  query = query.replace(/[-[\]|{}*+?.,\\^$#]/g, "\\$&");
  // Split words
  query = query.split(" ");
  // Additional search on first three letters of each word
  var fuzzyQuery = query.map(i => "(" + i.substr(0, 3) + ")");
  query = query.map(i => "(" + i + ")");
  // Combine query and fuzzyQuery
  query = query.concat(fuzzyQuery);
  // Remove duplicates
  query = query.sort().filter((i, index, array) => {
    return !index || i !== array[index - 1];
  });
  // Limit query+fuzzyQuery to 20 searches
  query = query.slice(0, 20);

  query = query.join("|");
  query = new RegExp(query, "i");
  return new Promise((resolve, reject) => {
    bookModel
      .find({ title: query })
      .limit(12)
      .exec((err, docs) => {
        if (err) {
          console.log(err);
        }
        console.log(docs);
        resolve(docs);
      });
  });
}
function getTotalBooks() {
  return new Promise((resolve, reject) => {
    bookModel.count({}, (err, count) => {
      if (err) {
        console.log(err);
      }
      resolve(count);
    });
  });
}
function getUserBooks(userId) {
  return new Promise((resolve, reject) => {
    bookModel.find({ user: userId }, (err, books) => {
      if (err) {
        console.log(err);
      }
      resolve(books);
    });
  });
}
function removeBookFromList(id) {
  return new Promise((resolve, reject) => {
    bookModel.remove({ _id: id }, err => {
      if (err) {
        console.log(err);
      }
      resolve(true);
    });
  });
}
export default {
  registerUser,
  authenticate,
  addBookToList,
  requestBook,
  updateUser,
  acceptRequest,
  denyRequest,
  getBooksForTrade,
  searchBooksForTrade,
  getTotalBooks,
  getUserBooks,
  removeBookFromList
};
