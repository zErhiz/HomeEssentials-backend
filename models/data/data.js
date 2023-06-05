import 'dotenv/config.js'
import '../../config/database.js'
import { users } from './users.js'


import User from '../User.js'




let newCategories = async(categories) => await Category.insertMany(categories)
//insertMany es un método de mongoose para insertar muchos documentos en la base de mongo

let newUsers = async(users) => await User.insertMany(users)


let data = async () => {
  
    await newUsers(users)
  
    console.log('done!')
}

data()