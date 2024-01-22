import React from 'react'
// import noteContext from '../context/notes/noteContext'

const About = () => {
  // const a = useContext(noteContext)
  // const [letter, setLetter] = useState("");

  // const printLetters = (sentence, index = 0) => {
  //   if (index < sentence.length) {
  //     setTimeout(() => {
  //       setLetter((prevLetter) => prevLetter + sentence[index])
  //       printLetters(sentence, index + 1);
  //     }, 1000);
  //   }
  // };

  // useEffect(() => {
  //   const sentence = "Your Secure Cloud Notes Companion";
  //   printLetters(sentence);
  // }, []);


  return (
    <>
    <div className='container'>
    <div className='col-md-12' style={{borderRadius: "10px", display:"flex"}}>
    <div className='col-md-8 col-xs-12 bg-warning' style={{padding:"10px", borderBottomLeftRadius:"10px",borderTopLeftRadius:"10px"}}>
      <h2>NoteSwift</h2>
      <h4 id='title'>Your Secure Cloud Notes Companion</h4>
      <hr className='hr hr-blurry'></hr>
      <p>In a world that never stops moving, ideas flow like a constant stream, and thoughts are fleeting. Capturing and organizing those moments of inspiration is where NoteSwift steps in—a powerful notes app designed to seamlessly integrate into your life.</p>
      <p>Save your ideas on the web securely and access them anywhere</p>
    </div>
    <div className='col-md-4 col-xs-12 bg-primary' style={{padding:"10px", borderTopRightRadius:"10px", borderBottomRightRadius:"10px"}}>
      <h3>Key Features</h3>
      <ul>
        <li>Secure Cloud Storage</li>
        <li>Seamless Synchronization</li>
        <li>Intuitive User Interface</li>
      </ul>
    </div>
    </div>
    </div>
    </>
  )
}

export default About
