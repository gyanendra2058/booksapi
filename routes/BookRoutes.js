var express = require('express'),
    _ = require('lodash');


var bookRoutes = (Book) => {

    var bookController = require('../controllers/bookController')(Book);
    var bookRouter = express.Router();
    
    bookRouter.route('/')
        .post(bookController.post)
        .get(bookController.get);

    /**
     *  Implementing middleware which will intercept the request and transform it.
     */

    bookRouter.use('/:bookId', (req, res, next) => {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else if (book) {
                req.book = book;
                next();
            } else
                res.status(404).send('Book not found!');
        });
    });

    bookRouter.route('/:bookId')
        .get(function (req, res) {
            res.json(req.book)
        })
        .put((req, res) => {
            req.book.title = req.body.title;
            req.book.read = req.body.read;
            req.book.genre = req.body.genre;
            req.book.author = req.body.author;

            req.book.save((err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.book);
                }
            });
        })
        .patch((req, res) => {
            if (req.body._id) {
                delete req.body._id;
            } else {
                for (var key in req.body)
                    req.book[key] = req.body[key];

                req.book.save((err) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.json(req.book);
                    }
                });
            }
        })
        .delete(function(req,res){
            req.book.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return bookRouter;
};

module.exports = bookRoutes;