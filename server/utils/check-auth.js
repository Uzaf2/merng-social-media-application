const { AuthenticationError } = require("apollo-server")
const jsonwebtoken = require('jsonwebtoken')
const { SECRET_KEY } = require ('../config');

module.exports = (context) =>{
    const auth = context.req.headers.authorization;
    if (!auth)
    {
        throw new AuthenticationError("You should be logged in.")
    }
    if (auth)
    {
        const token = auth.split('Bearer ')[1];
        if (token)
        {
            try 
            {
                const user = jsonwebtoken.verify(token, SECRET_KEY);
                return user;
            }
            catch (err)
            {
                throw new AuthenticationError('Invalid or Expired token provided')
            }
        }
        else if(!token)
        {
            throw new AuthenticationError("JWT authentication token should be provided in the form of Bearer [Token]")
        }
    }
}