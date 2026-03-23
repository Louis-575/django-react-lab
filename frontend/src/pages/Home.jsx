import {useState, useEffect} from "react"
import api from "../api"

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

    return <div>Home</div>
}
export default Home;
