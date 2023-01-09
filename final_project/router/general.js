const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(JSON.stringify(books,null,4))
        },6000)})
    myPromise.then((successMessage) => {
        res.send("From Callback " + successMessage)
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve(books[isbn])
        },6000)})
    myPromise.then((successMessage) => {
        res.send("From Callback " + successMessage)
    })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    for (var i=0; i<Object.keys(books).length; i++){
        if (books[Object.keys(books)[i]]['author'] == author) {
            let myPromise = new Promise((resolve,reject) => {
                setTimeout(() => {
                  resolve(books[Object.keys(books)[i]])
                },6000)})
            myPromise.then((successMessage) => {
                res.send("From Callback " + successMessage)
            })
        }
    }
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Author not found")
        },6000)})
    myPromise.then((successMessage) => {
        res.send("From Callback " + successMessage)
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    for (var i=0; i<Object.keys(books).length; i++){
        if (books[Object.keys(books)[i]]['title'] == title) {
            let myPromise = new Promise((resolve,reject) => {
                setTimeout(() => {
                  resolve(books[Object.keys(books)[i]])
                },6000)})
            myPromise.then((successMessage) => {
                res.send("From Callback " + successMessage)
            })
        }
    }
    let myPromise = new Promise((resolve,reject) => {
        setTimeout(() => {
          resolve("Title not found")
        },6000)})
    myPromise.then((successMessage) => {
        res.send("From Callback " + successMessage)
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]['reviews'])
});

module.exports.general = public_users;
