const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({

	firstName: {
        type: String,
        required: true,
        // unique: true
    },
    lastName: {
        type: String,
        required: true,
        // unique: true
    },
	role: {
        type: String,
        // required: true,
        validate: {
            validator: function (str) {
                return str === 'Shoveler' || str === 'User'
           },
           message: 'User must be a shoveler or a poster.'
        }
    },

	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false }

})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User