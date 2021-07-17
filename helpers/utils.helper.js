require('dotenv').config();
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');




const encryptPassword = (password) => {
	const encrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
	return encrypt;
};

const comparePasswords = (actualPass, givenPass) => {
	const compare = bcrypt.compareSync(givenPass, actualPass);
	return compare;
};

const encodeText = (text) => {
	if (!text) throw new TypeError('Something went wrong');
	const encoded = CryptoJS.AES.encrypt(text, process.env.SECRET).toString();
	return encoded;
};

const decodeText = encodedText => {
	const bytes = CryptoJS.AES.decrypt(encodedText, process.env.SECRET);
	const originalText = bytes.toString(CryptoJS.enc.Utf8);
	if (!originalText) throw new TypeError('Something went wrong');
	return originalText;
};

console.log(decodeText('U2FsdGVkX19DSFJ0Wxm1g3pXCxm1D5Q5Urc7btf8jvs='));

module.exports = {
	encryptPassword,
	comparePasswords,
	encodeText,
	decodeText,
};