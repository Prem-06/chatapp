const express=require('express');
const app=express();
const http=require('http').createServer(app);
const port=3000;
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
http.listen(port,()=>{
    console.log('server is connected to port 3000');
})
const io=require('socket.io')(http);
const user={};
io.on('connection',(socket)=>{
    
    socket.on('new-user-joined',(name)=>{
       
        user[socket.id]=name;
        socket.broadcast.emit('user-joined',name)
    });
    socket.on('send',(message)=>{
        socket.broadcast.emit('receive',{message:message,name:user[socket.id]});
    })
    socket.on('disconnect',(message)=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    })
})