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
  
  const showAlert = (message, type) =>{
    setAlert({
      msg : message,
      type :type
    })
    setTimeout(() =>{
      setAlert(null)
    },2000)
  }
  return (
    <>
    <NoteState host={{host}}>
    <Router>
    <Navbar />
    <Alert alert={alert}/>
    {/* <div className='container'> */}
    <Routes>
     <Route exact path='/' element={<GetStarted/>}></Route> 
    <Route exact path='/home' element={<Home showAlert={showAlert} />}></Route>
    <Route exact path='/about' element={<About/>}></Route>
    <Route exact path='/login' element={<Login prop={{host, showAlert}}/>}></Route>
    <Route exact path='/signup' element={<Signup prop={{host, showAlert}}/>}></Route>

    </Routes>
    {/* </div> */}
    </Router>
    </NoteState>
    </>
  );
}

export default App;
