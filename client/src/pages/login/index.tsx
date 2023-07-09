import React from 'react'
import Github from '../../assets/github.png'
import './login.css'
export const Login = () => {
  const github = () => {
    window.open('/api/v1/auth/github', '_self')
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Authenticate</h1>
      <div className="loginButton github" onClick={github}>
        <img src={Github} alt="" className="icon" />
        Github
      </div>
      <div className="message">
        <p>Can't authenticate? Then you have not been invited.</p>
        <p>Have a nice day.</p>
      </div>
    </div>
  )
}
