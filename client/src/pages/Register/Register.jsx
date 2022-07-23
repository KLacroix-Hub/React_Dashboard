import { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

function App() {
	const navigate = useNavigate()
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
		<div>
			<h1>Register</h1>
			<form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				{/* <input
					value={role}
					onChange={(e) => setRole(e.target.value)}
					type="text"
					placeholder="Ton rôle"
				/> */}
				<select name="pets" id="pet-select" onChange={(e)=>setRole(e.target.value)}>
					<option value="">Choisie un rôle</option>
					<option value='Admin'>Admin</option>
					<option value='Manager'>Manager</option>
					<option value='Employé'>Employés</option>
				</select>
				<br />
				<input type="submit" value="Register" />
			</form>
			<a href="/">Déjà un compte ? Connecter-vous ici !</a>
		</div>
	)
}

export default App
