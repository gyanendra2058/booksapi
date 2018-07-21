var should = require('should'),
    sinon = require('sinon');

describe('Book controller test : ', () => {
    describe('POST : ', () => {
        let Abook, res, req, bookController;

        beforeEach(() => {
            Abook = {
                _id: '123213kjhdfhweqw',
                title: 'Some title',
                author: 'Some author',
                read: true,
                genre: 'Some test genre'
            };

            var Book = function (book) {
                this.save = () => {
                    this.book = Abook;
                };
            };

            res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

            bookController = require('../controllers/bookController')(Book);
        });

        it('should test successful creation of book ', () => {
            req = {
                body: {
                    title: 'Some title',
                    author: 'Some author',
                    read: true,
                    genre: 'Some test genre'
                }
            };
            bookController.post(req, res);
            res.status.calledWith(201).should.equal(true);
        });

        it('should test bad payload in case if title or autohor is missing', () => {
            req = {
                body: {
                    author: 'Some author',
                    read: true,
                    genre: 'Some test genre'
                }
            };
            bookController.post(req, res);
            res.status.calledWith(400).should.equal(true);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });

    describe('GET : ', () => {
        let bookController, res;
        beforeEach(() => {

            let findFn = (query = {}, (err = false, books = [{
                    _id: '123213kjhdfhweqw',
                    title: 'Some title1',
                    author: 'Some author1',
                    read: true,
                    genre: 'Some test genre1'
                },

                {
                    _id: '123213kjhdfasdas',
                    title: 'Some title2',
                    author: 'Some author2',
                    read: false,
                    genre: 'Some test genre2'
                }

            ]) => {});

            var Book = {
                find: findFn
            }

            bookController = require('../controllers/bookController')(Book);
            res = {
                status: sinon.spy(),
                send: sinon.spy()
            };

        });

        it('should return invalid filter params if invalid query params passed', () => {
            let req = {
                query: 'invalidQueryParam'
            }

            bookController.get(req, res);
            res.status.calledWith(405).should.equal(true);
            res.send.calledWith('Invalid filter params!').should.equal(true);
        });

        xit('should return all books without any query', () => {
            let req = {
                query: {}
            }

            bookController.get(req, res);
            res.status.calledWith(200).should.equal(true);
        });
    })
});