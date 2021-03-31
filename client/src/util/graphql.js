import gql from 'graphql-tag';


export const FETCH_POSTS_QUERY = gql `
  {
    getPosts {
      id
      body
      creationTime
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        creationTime
        body
      }
     
    }
  }`;
