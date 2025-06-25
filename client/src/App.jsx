import { useEffect, useState } from 'react'
import ClosedMail from './assets/ClosedMail.svg?react'
import './App.css'
import Login from './Login'
import MyLetters from './MyLetters'
import { CookiesProvider, useCookies } from 'react-cookie';

function App() {
  const [status, setStatus] = useState('login')
  const [token, setToken, clearToken] = useCookies(['token'])
  useEffect(() => {
    if(token.token != null && token.token != undefined && token.token !== '') {
      onLoggedIn()
    } else {
      onLoggedOut()
    }
  }, [token.token])

  const onLoggedIn = () => {
    setStatus('main')
  }

  const onLoggedOut = () => {
    setStatus('login')
  }

  return (
    <div style={{width:"100%"}}>
      {status === 'login' ? <Login callback={onLoggedIn}/> : ''}
      {status === 'main' ? <MyLetters logout={onLoggedOut}></MyLetters> : ""}
    </div>
  )
}

export default App
