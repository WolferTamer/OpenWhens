import { useState } from 'react'
import { useCookies } from 'react-cookie'
function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [token, setToken, clearToken] = useCookies(['token'])

  const onSubmit = (e) => {
    e.preventDefault()
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(email)) {
        setError('Invalid email')
        return
    }
    const backendurl = import.meta.env.VITE_BACKEND
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email,
        "password": password
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(`${backendurl}/login`, requestOptions)
    .then((response) => {
        if(response.status == 200) {
            return response.json()
        } else {
            setError('Login Unsuccessful')
            return;
        }
    })
    .then((result) => {
        let token = result["accessToken"]
        setToken('token',token)
    })
    .catch((error) => console.error(error));
  }

  return (
    <>
      <h1>Login</h1>
      <div className="register">
        <form  onSubmit={onSubmit}>
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" placeholder="email" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" id="submit"/>
        </form>
        <p>{error}</p>
      </div>
    </>
  )
}

export default Login
