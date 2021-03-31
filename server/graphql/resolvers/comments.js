const Post = require('./../../models/Post');
const {UserInputError, AuthenticationError} = require('apollo-server');
const checkAuthentication = require('../../utils/check-auth');
module.exports = {
    Mutation: {
        async createComment (_,{ postId, body} ,context) { 
            const {username}= checkAuthentication(context);
            if(body.trim === '')
            {
                throw new UserInputError('The comment body does not have any content')
            }
            else {
                const post = await Post.findById(postId);
                if(post){
                    post.comments.unshift({
                        body, 
                        username,
                        creationTime: new Date().toISOString()
                    });
                    await post.save();
                    return post;
                }
                else 
                {
                    throw new UserInputError('Post is not found')
                }
            }
        },
    async deleteComment(_,{postId, commentId}, context) {
       
       const { username }= checkAuthentication(context);
       const post = await Post.findById(postId);
       if (post){
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === username)
        {
            post.comments.splice(commentIndex,1);
            await post.save();
            return post;
        }
        else {
            throw new AuthenticationError('Action not allowed')
        }
       }
       else  {
            throw new UserInputError('Post not found')
       }
    }
}
}
