import { React, useCallback, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks';
import PostCard from '../components/PostCard';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { TransitionGroup } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';

function Home() {

    const { user } = useContext(AuthContext);
    const { loading , data } = useQuery(FETCH_POSTS_QUERY);
  
    if ( data=== undefined )
    {
        return (
            <p>Loading posts </p>
        )
    }
    else {

     const posts= data.getPosts;
        return (
        <Box p={(2, 4)}>
            
            <Grid container justify="center" spacing={2}>
                <TransitionGroup>
                {user && (
                    <PostForm/>
                )}
                {posts && posts.map(data => (
                    <Grid key={data.id} item xs={2.5}>
                         <PostCard id={data.id} body={data.body} 
                         username={data.username}
                          creationTime={data.creationTime} commentCount={data.commentCount}
                          likeCount={data.likeCount}
                          likes={data.likes} />
                    </Grid>
                ))}
                </TransitionGroup>
            </Grid>
        </Box>
        )
        
    }
}

export default Home;