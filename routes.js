const fs = require('fs');
const getId = require('./getId');
 
 const routes =
 [
   {
     'method': 'GET',
     'path': '/users',
     'handler': (requiest) => {
       let file = fs.readFileSync('./data/users.json')
       let data = JSON.parse(file)
       return data.users
     },
   },
   {
     'method': 'POST',
     'path': '/users',
     'handler': (requiest) => {
       console.log(requiest.body)
       let file = fs.readFileSync('./data/users.json')
       let data = JSON.parse(file)
       let ids = data.users.map(el=>el.id)
       let user =  {
         id : getId(ids),
         name: requiest.body.name,
         email: requiest.body.email,
         password: requiest.body.password
     }
       data.users.push(user)
       let newFile = JSON.stringify(data)
       fs.writeFileSync('./data/users.json', newFile)
       return 'hello'

     },
   },
   {
     'method': 'GET',
     'path': '/users/(\d+)',
     'handler': (requiest,userID) => {
      
       let file = fs.readFileSync('./data/users.json')
       let data = JSON.parse(file)
       let user = data.users.filter(el => userID === el.id)
      //  console.log(user , userID)
       return user
     },
   },
   {
     'method': 'DELETE',
     'path': '/users/(\d+)',
     'handler': (requiest,userID) => {
       console.log('here')
       let file = fs.readFileSync('./data/users.json')
       let data = JSON.parse(file)
       data.users = data.users.filter(el => el.id !== userID)
       let newFile = JSON.stringify(data)
       fs.writeFileSync('./data/users.json', newFile)

     },
   },
 ]

  module.exports = routes;