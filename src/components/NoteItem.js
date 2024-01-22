import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
  const context = useContext(noteContext)
    const {deleteNote} = context
    const {note, updateNote} = props
  return (
    <div className='col-md-3'>
      <div className="card my-3">
            <div className="card-body">
                <div className="d-flex">

                </div>
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-pen-to-square mx-2" data-toggle="tooltip" data-placement="top" title="Edit Note" onClick={()=>{updateNote(note)}}></i>
                <i className="fa-solid fa-trash mx-1" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Successfully","success")}} data-toggle="tooltip" data-placement="top" title="Delete Note"></i>
            </div>
        </div>
    </div>
  )
}

export default NoteItem
