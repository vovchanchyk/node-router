const http = require('http');
const Router = require('./router');
const routes = require('./routes');
// const routes = require('./routes')
const router = new Router(routes)


http.createServer((req, res) => {

 

    const baseUrl = 'http://' + req.headers.host + '/';

    let requiest = {
        method: req.method,
        url: new URL(req.url, baseUrl).pathname,
        body: ''
    }

    if (req.method === 'POST') {
        //console.log('her')
        req.on('data', chunk => {
            const body = JSON.parse(chunk)
            requiest.body = { ...body }

        })
        req.on('end', () => {
           
            router.handler(requiest)
        })
    }else{
        let response = router.handler(requiest)
        response = JSON.stringify(response)
        
        res.end(response)
    }


  res.end()


    
}).listen(4000)