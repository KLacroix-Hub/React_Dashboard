import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

import Login_Thumb from '../../assets/login_thumb.svg'
import UserIcon from '../../assets/user-icon.svg'
import MailIcon from '../../assets/mail-icon.svg'
import PwdIcon from '../../assets/pwd-icon.svg'
import RoleIcon from '../../assets/role-icon.svg'
import ShowPwdIcon from '../../assets/visible-pwd.svg'

import Header from '../../components/header/Header'

function App() {
	const navigate = useNavigate()
	const [pwdField, setPwdField] = useState('password') 
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('')

	async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:1337/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
				role
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			console.log(data.status)
			navigate('/', {replace: true})
		}
	}

	return (
		<div className='block-container'>
			<div className='login-container'>
			<Header />
				<div className="login-container__form">
					<h1 className='login-container__form__title'>Inscription</h1>
					<p className='login-container__form__register-link'>
						Compte déjà existant ?
						<br />
						<a className='link' href="/">Connecte-toi ici</a>
					</p>
					<form onSubmit={registerUser} className="form form-register">
						<div className='input-container'>
							<label htmlFor="username">Nom d'utilisateur</label>
							<div className='input-container__icon'>
								<img src={UserIcon} alt={UserIcon} />
								<input
									value={name}
									onChange={(e) => setName(e.target.value)}
									type="text"
									placeholder="Entre ton nom d'utilisateur"
								/>
							</div>
						</div>
			
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
						<div className='input-container input-container'>
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
						<div className="input-container">
							<label htmlFor="role">Rôle</label>
							<div className="input-container__icon">
								<img src={RoleIcon} alt={RoleIcon} />
								<select name="role" id="role-select" onChange={ (e) => setRole(e.target.value) }>
									<option value="" selected disabled>Séléctionne ton rôle</option>
									<option value='Admin'>Admin</option>
									<option value='Manager'>Manager</option>
									<option value='Employé'>Employés</option>
								</select>
							</div>
						</div>
						
						<button className='button' type="submit" value="Register">S'inscrire</button>
					</form>
				</div>
			</div>
			<div className="login-thumb">
				<img src={Login_Thumb} alt={Login_Thumb} />
			</div>
		</div>
			
	)
}

export default App
