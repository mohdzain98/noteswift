import './App.css';
import Navbar from './components/Navbar'
import{BrowserRouter as Router,Route,Routes} from "react-router-dom";
import About from './components/About'
import Home from './components/Home'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react';
import GetStarted from './components/GetStarted';

function App() {
  const [alert, setAlert] = useState(null)
  const host = process.env.REACT_APP_HOST
  const fetchAllNotes = process.env.REACT_APP_FETCH_ALL_NOTES
  const addNotes = process.env.REACT_APP_ADD_NOTE
  const deleteNotes = process.env.REACT_APP_DELETE_NOTE
  const updateNotes = process.env.REACT_APP_UPDATE_NOTE
  const getUsers =process.env.REACT_APP_GET_USER

  const showAlert = (message, type) =>{
    setAlert({
      msg : message,
      type :type
    })
    setTimeout(() =>{
      setAlert(null)
    },1500)
  }
  return (
    <>
    <NoteState host={{host, fetchAllNotes, addNotes, deleteNotes, updateNotes, getUsers}}>
    <Router>
    <Navbar />
    <Alert alert={alert}/>
    {/* <div className='container'> */}
    <Routes>
     <Route exact path='/' element={<GetStarted/>}></Route> 
    <Route exact path='/home' element={<Home showAlert={showAlert} />}></Route>
    <Route exact path='/about' element={<About/>}></Route>
    <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
    <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>

    </Routes>
    {/* </div> */}
    </Router>
    </NoteState>
    </>
  );
}

export default App;
