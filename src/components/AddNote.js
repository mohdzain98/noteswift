import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context
    const [note, setNote] = useState({title:'', description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note Added Successfully",'success')
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div className='container my-3 '>
      <h2>Add a Swift Note</h2>
      <hr></hr>
      <form>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" placeholder="Title"  value={note.title}onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea type="text" className="form-control" id="description" name='description'placeholder='Description' value={note.description} onChange={onChange}></textarea>

        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' placeholder="General | Personal etc" value={note.tag} onChange={onChange}/>
        </div>
        <button type="submit" onClick={handleClick} className="btn btn-primary" disabled={note.title.length < 4 || note.description.length < 5 }>Add Note</button>
        </form>
    </div>
  ) 
}

export default AddNote
