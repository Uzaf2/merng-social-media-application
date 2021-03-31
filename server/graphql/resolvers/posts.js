const {  AuthenticationError } = require('apollo-server');
const  authorization  = require('../../utils/check-auth');
const  Post  = require ('../../models/Post');

module.exports = {
    Query: {
        async getPost (_,{postId}){
            try {
                const post = await Post.findById(postId);
                if (post)
                {
                    return post;
                }
                else {
                    throw new Error('Post Not Found');
                }
            }
            catch(err)
            {
                throw new Error(err, 'Post not found')
            }
        },
        async getPosts()
        {
            try {
                const posts = await Post.find().sort({creationTime: -1});
                return posts;
            }
            catch (err)
            {
                throw new Error(err,'Unable to get Posts');
            }
        }
    },
    Mutation: {
       async createPost(_, {body},context) {
       const userObj = authorization(context);
       
        if( body.trim() ==="" )
        {
            throw new Error("The body cannot be empty");
        }
        const newPost = new Post ({
            body,
            user: userObj.id,
            username: userObj.username,
            creationTime:  new Date().toISOString()
        })

       const post = await newPost.save();
       context.pubsub.publish('NEW_POST',{ newPost: post});
       return post;
    },
       async deletePost(_,{postId}, context) {
       const user = authorization(context);
        try 
        {
            const post = await Post.findById(postId);
            if ( user.username=== post.username )
            {
                await post.delete();
                return "Post have been deleted ";
            }
            else 
            {
                 throw new AuthenticationError('Post not found') 
            }
        }
        catch (err)
        {
            throw new Error (" Exception occured in finding the post", err);
        }
    },
    async likePost(_, { postId }, context) {
        const { username } = authorization(context);
  
        const post = await Post.findById(postId);
        if (post) {
          if (post.likes.find((like) => like.username === username)) {
            // Post already likes, unlike it
            post.likes = post.likes.filter((like) => like.username !== username);
          } else {
            // Not liked, like post
            post.likes.push({
              username,
              createdAt: new Date().toISOString()
            });
          }
  
          await post.save();
          return post;
        } else throw new UserInputError('Post not found');
      }
    },
    Subscription : {
        newPost: {
            subscribe: (_,__, {pubsub}) => pubsub.asyncIterator('NEW_POST')
        }
    }
};
