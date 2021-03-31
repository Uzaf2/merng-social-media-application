import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {Image} from 'semantic-ui-react';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import {makeStyles }from '@material-ui/core/styles';
import { AuthContext } from '../context/auth';
import { useHistory } from 'react-router-dom';
import LikeButton from './LikeButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SinglePost from '../pages/SinglePost';
import DeletePost from './DeletePost';
const font =  "'Merriweather', serif";

const useStyles = makeStyles({
  gridContainer: {
   borderColor:"black",
   borderWidth: 0.1,
   border: `solid`,
   width: "300px",
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


function PostCard(props){
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const styles = useStyles();
  const classes = useStyles2();
  return (
  
<Card className={styles.gridContainer}>
<CardActionArea> 

 <CardContent>
 <Image float="right" size="mini" src='https://react.semantic-ui.com/images/avatar/large/matthew.png'  className={styles.imageSize}/>
   <Typography gutterBottom variant="h5" component="h2">
   </Typography>
   <Typography variant="body2" color="textSecondary" component="p" className={styles.heading}>
  <h3>{props.username}</h3>
   </Typography>
   <Typography variant="body2" color="textSecondary" component="p" className={styles.bodyText}>
   {moment(props.creationTime).fromNow(true)} ago
    </Typography>
   <Typography variant="body2" color="textSecondary" component="p" className={styles.bodyText}>
   {props.body}
   </Typography>
 </CardContent>
</CardActionArea>
<CardActions className={styles.cardActions}>

 <LikeButton  user={user} postId={ props.id } likes={props.likes} likesCount={props.likeCount}/>
 <Button size="small" variant="contained"   className={classes.button} startIcon={<CommentIcon/>} onClick={()=>{
    history.push(`/posts/${props.id}`)
 }}>
    {props.commentCount}
 </Button>
 { user && user.username === props.username &&<DeletePost
        className={classes.deleteButton}
        postId={props.id}
 />}
</CardActions>
</Card>
  )
}


export default PostCard;