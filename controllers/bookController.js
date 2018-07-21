var _ = require('lodash');
var allowedFilterParams = ['_id', 'genre', 'read', 'author', 'title'];

var bookController = (Book) => {
    var post = (req, res) => {

        if (!_.has(req.body, 'title')) {
            res.status(400);
            res.send('Title is required');
        } else {
            var book = new Book(req.body);
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    var get = function (req, res) {

        var query = {};
        _.each(allowedFilterParams, (filterParam) => {
            if (_.has(req.query, filterParam)) {
                query[filterParam] = req.query[filterParam];
            }
        })

        if (_.isEmpty(query) && !_.isEmpty(req.query)) {
            res.status(405);
            res.send('Invalid filter params!');
            return;
        }
        console.log(Book);
        Book.find(query, function (err, books) {
            if (err)
                res.status(500).
                res.send(err);
            else {
                let contentArray = [];
                books.forEach((book) => contentArray.push(book));
                let response = {
                    content: contentArray,
                    totalElements: _.size(contentArray)
                }
                res.status(200);
                res.json(response);
            }
        });
    };

    return {
        post: post,
        get: get
    };

}

module.exports = bookController;