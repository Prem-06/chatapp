const socket=io();
const form=document.getElementById('sendcontainer');
const messageinp=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');
var audio=new Audio('ting.mp3');
let name;
do{
    name=prompt('Enter your name to join chat.');
}while(!name);
const append=(message,position)=>{
    const messageelement=document.createElement('div');
    messageelement.innerText=message;
    messageelement.classList.add('message')
    messageelement.classList.add(position)
    messagecontainer.append(messageelement);
    if(position=='left'){
        audio.play();
    }
   
}

socket.emit('new-user-joined',name);
socket.on('user-joined',data=>{
    append(`${data} joined the chat...`,'left');
});

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinp.value='';
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',data=>{
    append(`${data} left the chat...`,'left')
})