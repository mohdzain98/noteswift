import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const notesInitial=[]
    const [notes,setNotes] = useState(notesInitial)
    const {host}= props.host

    //fetch all notes
    const getNotes = async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
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
      const response = await fetch(`${host}/api/notes/addnote`, {
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
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
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
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
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
      const response = await fetch(`${host}/api/auth/getuser`, {
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
