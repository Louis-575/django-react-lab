import {useState, useEffect} from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"

function Home() {
    const [notes, setNotes] = useState([]); /* Setting these variables to an empty array */

    const [content, setContent] = useState("") /* Settings these variables to an empty string */
    const [title, setTitle] = useState("") /* Settings these variables to an empty string */
    
    /* Function which calls the getNotes function when the webpage is loaded */
    useEffect(() => { 
        getNotes();
    }, [])
    
    const getNotes = () => {
        api
            .get("/api/notes/") /* Using api path from backend to get all notes */
            .then((res) => res.data) /*gets the note data*/
            .then((data) => { setNotes(data); console.log(data) }) /*passes the note data*/
            .catch((err) => alert(err)); /*alerts in case of error*/
    }
    const deleteNote = (id) =>{
        api.delete(`/api/notes/delete/${id}/`) /* Using api to delete the note with this id */
            .then((res) => {
                if (res.status === 204) alert("Note deleted.")  /* Indicating whether or not the request was successful */
                else alert("Failed to delete note.")
                getNotes(); /* Refreshes the notes after it has been deleted */
            })
            .catch((error) => alert(error))
        
    }

    const createNote = (e) => {
        e.preventDefault()
        api
            .post("/api/notes/", {content, title}) /* Using api to request to make a note */
            .then((res) => {
                if (res.status === 201) alert("Note created.") /* Indicating whether or not a note was created */
                else alert("Failed to create note.")
                getNotes(); /* Refreshes the notes after a note has been created */
            })
            .catch((err) => alert(err))

    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (<Note note={note} onDelete={deleteNote} key={note.id}/>))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br/>
            <input 
                type="text" 
                id="title" 
                name="title" 
                reqired 
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <label htmlFor="title">Content:</label>
            <br/>
            <textarea 
                id="content" 
                name="content" 
                reqired 
                onChange={(e) => setContent(e.target.value)}
                value={content}
            />
            <br/>
            <input 
                type="submit" 
                value="Submit"
            />
        </form> 
        </div>
}
export default Home;
