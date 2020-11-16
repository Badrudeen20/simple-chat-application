const express = require('express')
const app = express()
const http  = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000
 


app.get('/',(req,res)=>{
      res.render('index')
})

app.use(express.static(__dirname +'/script'))
app.set('views',__dirname + '/views')
app.set('view engine','ejs') 




//socket io

users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUsername', function(data) {
      console.log(data);
      
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })
});


 

http.listen(port,function(err){
     if(err) throw err

     console.log(`localhost:${port}`)

    
})