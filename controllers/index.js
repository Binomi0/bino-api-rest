var PostController = require('./PostController')
var CommentController = require('./CommentController')
var ClubController = require('./ClubController')
var AtletaController = require('./AtletaController')
var UserController = require('./UserController')

module.exports = {
    comment: CommentController,
    post: PostController,
    club: ClubController,
    atleta: AtletaController,
    user: UserController
}