import { useState } from 'react'
function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <h1>Login</h1>
      <div className="register">
        <form>
            <label for="email">Email</label>
            <input name="email" id="email" type="email" placeholder="email" value={email}/>
            <label for="password">Password</label>
            <input name="password" id="password" type="password" placeholder="email" value={password}/>
        </form>
      </div>
    </>
  )
}

export default Register
