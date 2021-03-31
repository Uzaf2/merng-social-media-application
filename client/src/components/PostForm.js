import {React, useEffect } from 'react';
import { useForm } from '../util/hooks';
import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {

    const { values, onChange, onSubmit } = useForm(createPostCallBack, {
        body: ''
    });

        const [createPost, {error}] = useMutation ( CREATE_POST_MUTATION, {
            variables: values, 

        update(proxy, result)   
        {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: [result.data.createPost, ...data.getPosts], }, });
        values.body = '';
        }
    });
    

    function createPostCallBack (){
        createPost();
    }

    return ( 
        <form onSubmit={onSubmit}>
        <h2> Create a post: </h2>
        <TextField
        label="Outlined" variant="outlined"
        placeholder="Hi World!"
        name="body"
        onChange={onChange}
        value={values.body}
        error={error ? true: false}
        />
        <Button type="submit" color="teal">
        Submit
        </Button>
        </form>
    );
}

const CREATE_POST_MUTATION = gql`
mutation createPost($body: String!) {
    createPost(body: $body){
        
        id 
        body 
        creationTime 
        username
        likes {
            id 
            username 
            creationTime
        }
        likeCount
        
        comments {
            id 
            body 
            username 
            creationTime
        }
        commentCount
    }
}`;

export default PostForm;
