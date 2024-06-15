const route = require('express').Router()

const {addDetails, fetchAllDetail, updateDetails , fetchIndividualUser, deleteUser} = require('../model/userListModel')
const {login, logout} = require('../model/users')

route.post('/login',login)
route.get('/logout',logout)


route.post('/addUser',addDetails)
route.get('/alldata',fetchAllDetail)
route.post('/newUser',updateDetails)
route.get('/std/:id',fetchIndividualUser)
route.get('/dltStd/:id',deleteUser)

module.exports=route