const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const createHasAndSalt = (password)=>{
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password,salt,
        1000, 64, `sha512`).toString(`hex`);

        return {
            salt:salt,
            hash:hash
        }
}
//* "1234" ===> "abc" ===> "zxc"
//* "12345" ===> "abc" ===> "zxcx"
const comparePasswords = (password,hash,salt)=>{
    const newHash = crypto.pbkdf2Sync(password,salt,
        1000, 64, `sha512`).toString(`hex`);

        return hash === newHash

}

const createToken = (data)=>{
const token = jwt.sign({
    data:data
},'secret')
return token
}

const validateToken = (token)=>{
const verified =  jwt.verify(token,'secret')
return verified
}

module.exports = {
    createHasAndSalt: createHasAndSalt,
    comparePasswords:comparePasswords,
    createToken:createToken,
    validateToken :validateToken 
}