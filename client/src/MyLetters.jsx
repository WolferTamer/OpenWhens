import { useEffect, useState } from "react"
import {useCookies} from 'react-cookie'
import Letter from "./Letter"
import CreateLetter from "./CreateLetter"
import UpdateLetter from "./UpdateLetter"

function MyLetters(props) {
    const [letters,setLetters] = useState({recipient:[],sender:[]})
    const [token, setToken, clearToken] = useCookies(['token'])
    const [error, setError] = useState('')
    const [section, setSection] = useState('recipient')
    const [creating, setCreating] = useState(false)
    const [updateTarget, setTarget] = useState(null)

    function fetchLetters() {
        const backendurl = import.meta.env.VITE_BACKEND
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token.token}`)
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${backendurl}/api/Letter`, requestOptions)
        .then((response) => {
            if(response.status == 200) {
                return response.json()
            } else if (response.status == 401){
                setError('Not authorized')
                clearToken('token')
                return;
            } else {
                setError('An error occured')
                return;
            }
        })
        .then((result) => {
            if(result == undefined) { return}
            console.log(result)
            
            setLetters( result)
        })
        .catch((error) => console.error(error));
    }

    useEffect(() => {
        fetchLetters();
    }, [token.token])

    function onSectionChanged(e) {
        setSection(e.target.value)
    }

    function onCreate(e) {
        setCreating(true)
        console.log('wtf')
    }

    function finishCreating() {
        setCreating(false)
        fetchLetters();
    }

    function finishEdit() {
        setTarget(null)
        fetchLetters();
    }

    function onEdit(id) {
        console.log(id)
        setTarget(letters.sender.find((v) => v.id === id))
    }

    function onDelete(id) {
        console.log(`Deleting letter ${id}`)
        
        const backendurl = import.meta.env.VITE_BACKEND
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token.token}`)
        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${backendurl}/api/Letter/${id}`, requestOptions)
        .then((response) => {
            if(response.status == 200) {
                return response.text()
            } else if (response.status == 401){
                setError('Not authorized')
                clearToken('token')
                return;
            } else {
                setError('An error occured')
                return;
            }
        })
        .then((result) => {
            if(result == undefined) { return; }
            
            fetchLetters()
            console.log(`Letter successfully deleted.`)
        })
        .catch((error) => console.error(error));
    }

    return <div className="letterbrowser">
        {creating ? <CreateLetter finished={finishCreating}/> : ''}
        {updateTarget ? <UpdateLetter letter={updateTarget} finished={finishEdit}/> : ''}
        <button onClick={onCreate} class="create-button"></button>
        <select defaultValue="recipient" onChange={onSectionChanged}>
            <option value="recipient">Recieved</option>
            <option value="sender">Outgoing</option>
        </select>
        {letters[section].length < 1 ? <><p>No Letters Found</p><p>{error}</p></> : letters[section].map(
            (v) => <Letter when={v.when} color={v.color} state="closed" id={v.id}
            onedit={section === "sender" && !v.sent ? onEdit : undefined}
            ondelete={section === "sender" && !v.sent ? onDelete : undefined}></Letter>)}
    </div>
}

export default MyLetters;