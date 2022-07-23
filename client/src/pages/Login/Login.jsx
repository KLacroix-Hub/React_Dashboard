import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Login_Thumb from '../../assets/login_thumb.svg'
import MailIcon from '../../assets/mail-icon.svg'
import PwdIcon from '../../assets/pwd-icon.svg'
import ShowPwdIcon from '../../assets/visible-pwd.svg'

import Header from '../../components/header/Header'

function Login() {
	const [pwdField, setPwdField] = useState('password') 
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
		const data = await response.json()

		if (data.user) {
			localStorage.setItem('token', data.user)
			navigate('/dashboard')
			window.location.reload();
		} else {
			console.log(data.user)
			alert('Please check your username and password')
		}
	}

	return (

		<div className='block-container'>
			<div className='login-container'>
			<Header />
				<div className="login-container__form">
					<h1 className='login-container__form__title'>Connexion</h1>
					<p className='login-container__form__register-link'>
						Si tu n’as pas de compte enregistré,
						<br />
						<a className='link' href="/register">Inscris-toi ici</a>
					</p>
					<form onSubmit={loginUser}>
						<div className='input-container'>
							<label htmlFor="email">Email</label>
							<div className='input-container__icon'>
								<img src={MailIcon} alt={MailIcon} />
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									name="email"
									type='email'
									placeholder="Entre ton adresse email"
									className='pwd'
								/>
							</div>
						</div>
						<div className='input-container input-container__password'>
							<label htmlFor="password">Mot de passe</label>
							<div className='input-container__icon'>
								<img src={PwdIcon} alt={PwdIcon} />
								<input
									name='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type={pwdField}
									placeholder="Entre ton mot de passe"
								/>
								<img className='show-pwd' onClick={()=>{pwdField === 'password' ? setPwdField('text') : setPwdField('password')}} src={ShowPwdIcon} alt={ShowPwdIcon} />
							</div>
						</div>
						
						<button className='button' type="submit" value="Login">Connexion</button>
					</form>
				</div>
			</div>
			<div className="login-thumb">
				<img src={Login_Thumb} alt={Login_Thumb} />
			</div>
		</div>
	)
}

export default Login
