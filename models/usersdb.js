import mongoose from 'mongoose'

const userdbmodel = mongoose.Schema({

    id: {type: String},
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true}


})

const Usersdb = mongoose.model('Usersdb', userdbmodel)

export default Usersdb