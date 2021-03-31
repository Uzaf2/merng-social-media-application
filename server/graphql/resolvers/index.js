const commentsResolvers = require("./comments")
const usersResolvers = require("./users")
const postsResolvers = require("./posts")
module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
      },
    Query: {
        ...postsResolvers.Query
    },
        Mutation: {
            ...commentsResolvers.Mutation,
            ...usersResolvers.Mutation,
            ...postsResolvers.Mutation
        },
        Subscription: {
            ...postsResolvers.Subscription
        }
}
