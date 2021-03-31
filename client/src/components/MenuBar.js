import React, {useState, useEffect  , useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';
import '../App.css';

const font =  "'Merriweather', serif";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "black",
    fontFamily: font
  },
  introText: {
    fontFamily: font,
    color: "black",
    fontSize: 12,
    align: "right"
    },
    button: {
      float: "right",
      position: "relative",
      justify:"space-between"
    }
  }));


function MenuBar () {
  const {user, logout} = useContext(AuthContext);

  const [activeItem, setActiveItem] = useState('');
  console.log("activeItem", activeItem);
  const history = useHistory();
  history.push("/");
  // function to detect changes in the state of the application
  useEffect(() => {
    console.log("Use effect called");
    history.push(`/${activeItem}`);
  });

  const classes = useStyles();
  const menuBar = user ? (

    <AppBar position="static"style={{ background: '#FFFFFF' }}>
      <Toolbar>
        <IconButton edge="start"
         className={classes.menuButton} 
         color="default" 
         aria-label="menu">
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" className={classes.title}>{user.username}</Typography>

        <Link to="/"  style={{ textDecoration: 'none' }}>
        <Button color="default">
        <Typography variant="h6" className={classes.introText}>home</Typography>
        </Button>
        </Link>

        <Button color="default" position="right" className= {classes.button} onClick={logout}>
        <Typography variant="h6" className={classes.introText}>Logout</Typography> 
        </Button>

      </Toolbar>
    </AppBar>
      ): (
    <AppBar position="static"style={{ background: '#FFFFFF' }}>
      <Toolbar>
        <IconButton edge="start"
         className={classes.menuButton} 
         color="default" 
         aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" 
        className={classes.title}>
          Posts
        </Typography>
        <Button color="default" onClick={()=>setActiveItem('') }>
        <Typography variant="h6" className={classes.introText}>Home</Typography> 
        </Button>
        <Button color="default" onClick={()=>setActiveItem('login')}>
        <Typography variant="h6" className={classes.introText}>Login</Typography> 
        </Button>
        <Button color="default" onClick={()=>setActiveItem('register')}>
        <Typography variant="h6" className={classes.introText}>Register</Typography> 
        </Button>
      </Toolbar>
    </AppBar>
      );
        return menuBar;
}

export default MenuBar;
