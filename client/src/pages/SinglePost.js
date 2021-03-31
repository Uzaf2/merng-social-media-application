import React , {useContext, useState, useRef} from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Image} from 'semantic-ui-react';
import moment from 'moment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteComment from '../components/DeleteComment';
import {makeStyles }from '@material-ui/core/styles';

const font =  "'Merriweather', serif";

const useStyles = makeStyles({
    gridContainer: {
     borderColor:"black",
     borderWidth: 0.1,
     border: `solid`,
     width: "600px",
     height: "200px",
     marginTop: "20px",
     marginLeft:"30px"
    },
    heading: {
      fontFamily: font,
      color: "black",
      fontSize: 12,
      marginTop: "0.1px",
      float: "top",
      display: "flex"
      },
      cardActions: {
        borderTop:`solid`,
        borderColor:"black",
        borderWidth:0.1
      },
  
      bodyText: {
        fontFamily: font,
        color: "black",
        fontSize: 12
        },
        imageSize:{
          width:"50px",
          height: "50px",
          float: "right"
        }
        ,
        form: {
          marginTop:"35px",
          width: "800px"
        },
        formTextField: {
          marginLeft:"10px",
          marginRight: "0px",
          width: "500px",
          height: "30px"
        },
        formButton: {
          width: "70px",
          height: "36px"
        },
        formGridContainer: {
          borderColor:"black",
          borderWidth: 0.1,
          border: `solid`,
          width: "600px",
          height: "110px",
          marginTop: "10px",
          marginLeft: "30px"
        },
        commentsGridContainer: {
          borderColor:"black",
          borderWidth: 0.1,
          border: `solid`,
          width: "600px",
          height: "300px",
          marginTop: "10px",
          marginLeft: "30px"
        },
        commentsForm: {
          width: "800px",
          marginLeft: "10px"
        },
  });

  const useStyles2 = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    deleteButton: {
      position: "absolute",
      right: "750px"
    }
  }));

function SinglePost(props){
    const postId = props.match.params.postId;
    const styles = useStyles();
    const classes = useStyles2();
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');

    const { data  } = useQuery(FETCH_POST_QUERY, {
        variables: {
          postId
        }
      });

      const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
          setComment('');
          commentInputRef.current.blur();
        },
        variables: {
          postId,
          body: comment
        }
      });
      
      let postMarkup;

      if (data ===undefined ) {
        postMarkup = <p>Loading post..</p>;
      } else {

        const {
          id,
          body,
          creationTime,
          username,
          comments,
          likes,
          likeCount,
          commentCount
        } = data.getPost;
       
        postMarkup = (
             <Grid>
            <Card className={styles.gridContainer}>
            <CardActionArea > 
            
             <CardContent>
             <Image float="right" size="mini" src='https://react.semantic-ui.com/images/avatar/large/matthew.png'  className={styles.imageSize}/>
               <Typography gutterBottom variant="h5" component="h2">
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p" className={styles.heading}>
              <h3>{username}</h3>
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p" className={styles.bodyText}>
               {body}
                </Typography>
               <Typography variant="body2" color="textSecondary" component="p" className={styles.bodyText}>
               {moment(creationTime).fromNow(true)} 
               </Typography>
             </CardContent>
            </CardActionArea>

            <CardActions className={styles.cardActions}>
            <LikeButton  user={user} postId={ id } likes={likes} likesCount={likeCount}/>
            <Button size="small" variant="contained"   className={classes.button} startIcon={<CommentIcon/>}>
              { commentCount }
            </Button>
            </CardActions>

            </Card>
            { user &&(
              <Card className={styles.formGridContainer}>
                <CardActionArea> 
                  <form className={styles.form}>
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        className={styles.formTextField}
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                      />
                      <button
                        type="submit"
                        className={styles.formButton}
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </form>
                  </CardActionArea>
              </Card>
            )
            }

            <Grid justify="space-between">
            {comments.map((comment) => (
              <Card fluid key={comment.id} className={styles.formGridContainer}>
                <CardActionArea> 
                <form className={styles.commentsForm}>
                {user && user.username === comment.username && (
                    <DeleteComment postId={id} commentId={comment.id} className={classes.deleteButton}/>
                  )}
                  <h3>{comment.username}</h3>
          
              <p>{moment(comment.creationTime).fromNow()}</p>
              
              <p>{comment.body}</p>
               </form>
                  </CardActionArea> 

              </Card>
            ))}
            </Grid>
            </Grid>
            );
        }
    return postMarkup;

}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        creationTime
        username
      }
      commentCount
    }
  }`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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

export default  SinglePost;