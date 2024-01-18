import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(noteContext)
    const {notes, getNotes, editNote} = context
    const navigate = useNavigate()
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes()
      }else{
        navigate("/login")
      }
      // eslint-disable-next-line
    },[])

    const ref = useRef(null)
    const updateNote = (currentNote)=>{
      ref.current.click()
      setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }
    
    const [note, setNote] = useState({id:"", etitle:'', edescription:"",etag:"default"})

    const onChange = (e)=>{
      setNote({...note, [e.target.name]:e.target.value})
    }
    
    const refClose = useRef(null)
    const handleClick = ()=>{
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click()
      props.showAlert("Updated Successfully","success")
    }

  return (
    <>
    <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle}aria-describedby="emailHelp" placeholder="Title" onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" value={note.edescription}name='edescription'placeholder='Description' onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" value={note.etag} id="etag" name='etag' onChange={onChange}/>
            </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length < 4 || note.edescription.length < 5 }>Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className='row my-3'>
        <hr className='hr hr-blurry'></hr>
        <h2>Your Notes</h2>
        <div className='container mx-1'>
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes.map((note)=>{
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
        })}
    </div>
    </>
  )
}

export default Notes
