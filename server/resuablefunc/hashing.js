const bcrypt = require('bcrypt');

async function salting(num){
    try {
        const salt = await bcrypt.genSalt(num)
        return salt;
    } catch (error) {
        console.error(error)
    }
}

async function hashing(password){
    try {
        const hashedPassword = await bcrypt.hash(password,await salting(10));
        return hashedPassword
    } catch (error) {
        console.error(error)
    }
}


module.exports = hashing;