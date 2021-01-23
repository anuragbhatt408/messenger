import React, { useState, useEffect } from 'react';
import { Button, FormControl,InputLabel,Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
// import  firebase from './firebase';
import firebase from 'firebase/app';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  
  const [input, setInput] = useState('');
  const [messages, setMessage] = useState([]);
  const [username, setUserName] = useState('');

  useEffect( ()=>{
    // run once when app component loads
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot =>{
      setMessage(snapshot.docs.map(doc => ({id:doc.id, message:doc.data()}) ))
    })
  } ,[] )

  useEffect(() => {
    // run code here
    // if its blank inside [](dependencies), this code runs Once when the app component loads
    // const user = prompt('Please enter your name');
    setUserName(prompt('Enter Your Name'))
  }, [] )

  // console.log(input);
  // console.log(messages);

  const sendMessage = (event) =>{
    // all the logic to send the message goes
    event.preventDefault();
    db.collection('messages').add({
      message:input,
      username:username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }
  return (
    <div className="App">
      <img src="https://play-lh.googleusercontent.com/ldcQMpP7OaVmglCF6kGas9cY_K0PsJzSSosx2saw9KF1m3RHaEXpH_9mwBWaYnkmctk=s180-rw" alt="LOGO"></img>
      <h1>Hello messages 🚀</h1>
      <h2>Welcome {username}</h2>
      <form className="app_form">

      <FormControl className="app_formcontrol">
        <InputLabel>Enter a message...</InputLabel>
        <Input className="app_input" placeholder="Enter the message..." value={input} onChange={ event => setInput(event.target.value) }/>
        <IconButton className="app_iconbutton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </FormControl>

      </form>
      <FlipMove>
      {
        messages.map( ({id, message}) =>
          <Message key={id} username={username} message={message}/>
        )
      }
      </FlipMove>
    </div>
  );
}

export default App;
