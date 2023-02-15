const jwt = require('jsonwebtoken');
const crypto = require('crypto')

// Capitalize
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// Generate JWT access token
const generateToken = (user) => jwt.sign({ user: user.email, id: user._id, role: user.role }, process.env.TOKEN_KEY);

const generateTokenExpiration = () => Date.now() + 1000 * 60 * 60 // 1hr in milliseconds

//  Create a SHA256 hash
const hash = (str) => {
  if(typeof str == 'string' && str.length > 0){
    let hash = crypto.createHmac('sha256', process.env.HASHING_SECRET).update(str).digest('hex')
    return hash
  }else{
    return false
  }
}

//  Create a string of random alphanumeric characters, of a given length
const createRandomString = (strLength)=>{
  strLength = typeof strLength == 'number' && strLength > 0 ? strLength : false
  if(strLength){
    //  Define all the possible characters that could go into a string
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789'

    //  Start the final string
    let str = ''
    for(i=1; i<=strLength; i++){
      //  Get a random character from the possibleCharacters string
      let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length))
      //  Append this character to the final string
      str += randomCharacter
    }

    //  Return the final string
    return str
  }else{
    return false
  }

}

const convertTimestampToISOString = (timestamp) => {
  timestamp = typeof parseInt(timestamp) == 'number' ? parseInt(timestamp) : false;
  if (!timestamp) return false;
  
  return new Date(timestamp).toISOString();
}


module.exports = {
  capitalize,
  generateToken,
  hash,
  generateTokenExpiration,
  createRandomString,
  convertTimestampToISOString
};


