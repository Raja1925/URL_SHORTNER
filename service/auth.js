// Stateless Authentication : 

// This is stateless authentication which does not require any map 
// to maintain the states because it is stateless.

// JWT -- Json Web Tokens --> It create tokens for user and 
// store their data into their created tokens. 

// In this authentication user has to make a secret key 
// that is used to use the tokens. anyone having your secret key 
// can access your tokens.

const jwt = require('jsonwebtoken');
const secretKey = 'Raja@1925#$';


// this function create tokens:
function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        secretKey
    );
}

// this function is to verify user by using their token"
function getUser(token) {
   if(!token) return null;

   try {
        return jwt.verify(token, secretKey);
   } catch(error) {
        return null;
   }
}

module.exports = {
    setUser,
    getUser,
}


// Statefull Authentication :

// this is a map which is used here to maintain the states.
// It is used in statefull authentication to maintain the state.

// const sessionIdTOUserMap = new Map();

// function setUser(id, user) {
//     sessionIdTOUserMap.set(id, user);
// }

// function getUser(id) {
//     return sessionIdTOUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser,
// }