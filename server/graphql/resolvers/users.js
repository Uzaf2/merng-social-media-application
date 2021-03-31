const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError}= require('apollo-server');

const { ValidateLoginInput, validateRegisterInput } = require('../../utils/validators');
const {SECRET_KEY} = require ('../../config');
const User = require('../../models/User');

function generateToken(user) {

  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
},
SECRET_KEY, {
    expiresIn:'1h'
});
}

module.exports = {
    Mutation: {
        async login (_,{username, password})
        {
            const { errors, valid  } = ValidateLoginInput(username, password);
            if (!valid) {
                throw new UserInputError('Invalid User Input',{errors});
            }
            const user = await User.findOne({username});

            if (!user)
            {
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Credentials did not match', {errors});
            }

            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        /*
        async register(_, 
            {
                registerInput:{username, email, password, confirmPassword
                }
            }
        ){
           const {errors, valid } = validateRegisterInput(username, email, password,confirmPassword);
          
           if(!valid) {
               throw new UserInputError('Invalid User Input',{errors});
           }
           // Todo sure the user does not exist in the database
           const user = await User.findOne({username});
           if(user) {
               throw new UserInputError('Username is already taken',{
                   errors:{
                       username: 'This username is already taken'
                   }
               });
           }

           password = await bcrypt.hash(password,12);
           const newUser = new User({
               email,
               username,
               password,
               creationTime: new Date().toISOString()
           });

           const res = await newUser.save();
           const token = generateToken(res);

           return {
               ...res._doc,
               id:res._id,
               token
           };
        }
        */
       async register(
        _,
        {
          registerInput: { username, email, password, confirmPassword }
        }
      ) {
        // Validate user data
        const { valid, errors } = validateRegisterInput(
          username,
          email,
          password,
          confirmPassword
        );
        if (!valid) {
          throw new UserInputError('Errors', { errors });
        }
        // TODO: Make sure user doesnt already exist
        const user = await User.findOne({ username });
        if (user) {
          throw new UserInputError('Username is taken', {
            errors: {
              username: 'This username is taken'
            }
          });
        }
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);
  
        const newUser = new User({
          email,
          username,
          password,
          creationTime: new Date().toISOString()
        });
  
        const res = await newUser.save();
  
        const token = generateToken(res);
  
        return {
          ...res._doc,
          id: res._id,
          token
        };
      }
    }
};


