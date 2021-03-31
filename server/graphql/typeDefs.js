const { gql } = require('apollo-server');

module.exports =  gql `

type Post{
    id: ID!
    body: String!
    creationTime: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
}

type Like {
    id: ID!
    creationTime: String !
    username: String !
}

type Comment {
    id: ID !
    creationTime: String !
    username: String !
    body: String !
}

type User {
    id: ID !
    email: String !
    token: String!
    username: String!
    creationTime: String !
}

input RegisterInput  {
    username: String !
    password: String !
    confirmPassword: String !
    email: String !
}

type Query{
    getPosts: [Post]
    getPost (postId: ID! ): Post
}

type Mutation {
    login(username: String!, password: String!): User !
    register(registerInput:RegisterInput): User !
    createPost(body:String!): Post!
    deletePost(postId:ID!): String !
    createComment(postId: String!,body: String!): Post !
    deleteComment(postId:ID!, commentId:ID!): Post !
    likeAndUnlikePost(postId:ID!): Post !
    likePost(postId:ID!): Post!
}

type Subscription {
    newPost: Post !
}
`