// const routes = require('./routes')
const regUsersID = /\/users\/(\d+)$/
const regUsers = /\/users$/
// const users = require('./data/users.json')
const fs = require('fs');

const routes = require('./routes');


class Router {
  constructor(routes) {
   this.routes = routes.map(el=>{
    
     let str = el.path.replace(/\//gi, '\\/').replace('(', '(\\')
     el.path = new RegExp(str + '$');
     return el
   })
  }
  handler(requiest) {
    
    for (let rout of this.routes) {
      
      if (rout.path.exec(requiest.url) && rout.method === requiest.method) {
        
        if (rout.path+'' === regUsersID+'') {
          
          let userID = parseInt(requiest.url.replace(/[^\d]/g, ''))
          
          return rout.handler(requiest,userID)
        } else {
          
          return rout.handler(requiest)
        }
      }
    }

  }


}

module.exports = Router;