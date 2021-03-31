
import {React, useState, useContext }from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  gql  from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import {AuthContext} from '../context/auth';
import { useForm } from '../util/hooks';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 300,
      alignContent: "center"
    },
    fontType:{
        fontFamily: font,
        fontSize: 16
    },
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(5, 0, 4),
    },
    container:{
        alignItems:"center",
        justify:"center"
    }
  }));

  const font =  "'Merriweather', serif";
  function Register (props) {

    const context = useContext(AuthContext);
    const authContext = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    
    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

const [addUser, { loading }] = useMutation(REGISTER_USER, {
  update(_, { data: { register: userData }}){
        context.login(userData);
        props.history.push('/');
    },
    onError(err){
       setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
});

function registerUser() {
    addUser();
  }
    const styles = useStyles();

    return (
        <Container component="main" maxWidth="xs" className={useStyles.container} style={{ marginTop : "100px" }}>
            <CssBaseline />
            <div className={useStyles.paper} className={useStyles.root}>
            <Typography component="h1" variant="h5" className={styles.fontType} style={{ marginBottom : "10px" }}>
                   Sign Up
            </Typography>
                <form className={useStyles.form} onSubmit={onSubmit} >
                    <Grid container spacing={2}  >
                       
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="username"
                                label="Username"
                                type="text"
                                autoComplete="username"
                                name="username"
                                error={errors.username ? true: false}
                                value={values.username}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                type="text"
                                label="Email Address"
                                autoComplete="email"
                                error={errors.email ? true: false}
                                name="email"
                                value={values.email}
                                onChange={onChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                value={values.password}
                                name="password"
                                error={errors.password ? true: false}
                                onChange={onChange}
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                error={errors.confirmPassword ? true: false}
                                value={values.confirmPassword}
                                onChange={onChange}
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={useStyles.submit}
                        style={{ marginTop : "10px" }}
                    >
                    <Typography component="h1" variant="h5" className={styles.fontType}>
                    Sign Up
                    </Typography>
                    </Button>
                </form>
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(value=>(
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Container>
     
    )
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      email
      token
      username
      creationTime
    }
  }
`;
export default Register;