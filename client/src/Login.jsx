import { useState } from 'react'
import { useCookies } from 'react-cookie'
function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [token, setToken, clearToken] = useCookies(['token'])
  const [register, setRegister] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
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

    fetch(`${backendurl}/${register ? 'register' : 'login'}`, requestOptions)
    .then((response) => {
        if(response.status == 200 || response.status == 201) {
            if(register) {
              setError('Registration complete! Please login.')
              setRegister(false)
              return;
            }
            return response.json()
        } else {
            setError('Login Unsuccessful')
            return response.json();
        }
    })
    .then((result) => {
        if(result == undefined) {
          return;
        }
        if(result["errors"]) {
          setError(Object.values(result["errors"])[0])
          return;
        } else if (!result["accessToken"]) {
          setError('Registration complete! Please login.')
          setRegister(false)
          return;
        }
        let token = result["accessToken"]
        setToken('token',token)
    })
    .catch((error) => console.error(error));
  }

  return (
    <>
      <div className="register">
        <form  onSubmit={onSubmit} className="login-form">
            <h1  style={{marginTop:0}}>{register ? 'Regsiter' : 'Login'}</h1>
            <label htmlFor="email" className="login-label">Email:</label>
            <input name="email" id="email" type="email" placeholder="Example@email.com..." value={email} onChange={(e) => setEmail(e.target.value)} className="login-input"/>
            <label htmlFor="password" className="login-label">Password:</label>
            <input name="password" id="password" type="password" placeholder="Your Password..." value={password} onChange={(e) => setPassword(e.target.value)} className="login-input"/>
            <div className="login-div">
              <input type="submit" id="submit" className='login-submit'/>
              <button onClick={()=> {setRegister(!register)}}>{register ? "Login" : "Register"}</button>
            </div>
        </form>
        <p>{error}</p>
      </div>
    </>
  )
}

export default Login
