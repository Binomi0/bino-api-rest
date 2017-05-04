var PostController = require('./PostController')
var CommentController = require('./CommentController')
var ClubController = require('./ClubController')
var AtletaController = require('./AtletaController')

module.exports = {
    comment: CommentController,
    post: PostController,
    club: ClubController,
    atleta: AtletaController
}