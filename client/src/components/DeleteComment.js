import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {makeStyles }from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    deleteButton: {
      position: "absolute",
      right: "50px",
      marginTop: "25px"
    }
  }));
function DeleteComment({postId, commentId})
{
    const classes = useStyles();
    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: { postId: postId,
        commentId: commentId
        }
      });
    return (
        <Button size= "small"  color="white" startIcon={<DeleteIcon/>} variant="contained" onClick={deleteComment} 
        className={classes.deleteButton} >
        </Button>
    )
}
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        creationTime
        body
      }
      commentCount
    }
  }
`;


export default DeleteComment;