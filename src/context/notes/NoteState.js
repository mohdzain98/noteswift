import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial=[]
    const [notes,setNotes] = useState(notesInitial)
    const {host,fetchAllNotes,addNotes, deleteNotes, updateNotes, getUsers}= props.host

    //fetch all notes
    const getNotes = async ()=>{
      const response = await fetch(`${host}${fetchAllNotes}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      const json = await response.json();
      setNotes(json)
    }
    //Add a note
    const addNote = async (title, description, tag)=>{
      const response = await fetch(`${host}${addNotes}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), 
      });

      const note = await response.json();
      setNotes(notes.concat(note))
    }

    //Delete a note
    const deleteNote = async (id) => {
      // eslint-disable-next-line
      const response = await fetch(`${host}${deleteNotes}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      // const json = await response.json();
      const newNotes = notes.filter((note)=>{return note._id !== id})
      setNotes(newNotes)
    }

    //Edit a note
    const editNote = async (id, title, description, tag)=>{
      //API Call
      // eslint-disable-next-line
      const response = await fetch(`${host}${updateNotes}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), 
      });
      // const json = await response.json();

      //logic to edit in client
      let newNotes = JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }

    //getting users details
    const [user,setUser] = useState("")
    const getUser = async ()=>{
      const response = await fetch(`${host}${getUsers}`, {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });
  
        const json = await response.json();
        setUser(json.name)
        
    }
    return(
        <NoteContext.Provider value={{notes,setNotes, addNote, deleteNote, editNote, getNotes, user, getUser}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState
