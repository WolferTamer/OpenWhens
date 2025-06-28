//FORM w/ all entries to create a letter
//Animation of letter being closed, then moving off
//If possible, color picker

import { useState } from "react"
import Letter from "./Letter"
import { useCookies } from "react-cookie"

function CreateLetter(props) {
    const [recipient,setRecipient] = useState('')
    const [when,setWhen] = useState('')
    const [content,setContent] = useState('')
    const [color,setColor] = useState('#000000')
    const [token, setToken, clearToken] = useCookies(['token'])
    const [error,setError] = useState('')
    const [sending, setSending] = useState(false)


    function onSave() {
        const body = JSON.stringify({
            "recipient": recipient,
            "when": when,
            "content": content,
            "color":color,
            "sent": false
        });
        update(body)
    }

    function onSend() {
        const body = JSON.stringify({
            "recipient": recipient,
            "when": when,
            "content": content,
            "color":color,
            "sent": true
        });
        update(body)
    }

    function update(body) {
        const backendurl = import.meta.env.VITE_BACKEND
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token.token}`)
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: body,
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
                return response.text();
            }
        })
        .then((result) => {
            if (typeof result === 'string') {
                setError(result)
                return;
            }
            if(result == undefined) { return}
            setSending(true)
            //Process success
            console.log(result)
        })
        .catch((error) => console.error(error));
    }

    function onSuccess() {
        props.finished()
    }

    return <div className="overlay">
            <Letter endAnimation={onSuccess} color={color} when={when} state={sending ? "animated" : "open"}>

            </Letter>
            <form className="login-form">
                <label htmlFor="recipient" className="login-label">Recipient Email</label>
                <input className="login-input" name="recipient" type="email" placeholder="Email..." value={recipient} onChange={(e) => {setRecipient(e.target.value)}} required={false}/>
                <label htmlFor="when" className="login-label">Open When...</label>
                <input className="login-input" name="when" type="text" placeholder="Open When xxx yyy..." value={when} onChange={(e) => {setWhen(e.target.value)}}/>
                <label htmlFor="content" className="login-label">Message</label>
                <textarea className="login-input" name="content" placeholder="Message Content..." value={content} onChange={(e) => {setContent(e.target.value)}}/>
                <label htmlFor="color" className="login-label">Color</label>
                <input className="color-input" type="color" name="color" value={color} onChange={(e) => {setColor(e.target.value)}}/>
                <div className="login-div">
                    <input type="button" value="Save" className="save-button" onClick={onSave}/>
                    <input type="button" value="Send" className="send-button" onClick={onSend}/>
                </div>
                <p>{error}</p>
            </form>
    </div>
}

export default CreateLetter