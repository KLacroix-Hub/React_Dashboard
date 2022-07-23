import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [role, setRole] = useState('')

	async function Name() {
		const req = await fetch('http://localhost:1337/api/user', {
			headers: {
				'x-access-token': localStorage.getItem('token'),
			},
		})

		const data = await req.json()
		if (data.status === 'ok') {
			setName(data.name)
			setEmail(data.email)
			setRole(data.role)
		} else {
			alert(data.error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
		
		if (token) {
			const user = jwt.decode(token)

			if (!user) {
				localStorage.removeItem('token')
				navigate('/')
			} 
			else {
				Name()
			}
		}
	}, [navigate])

	function SignOut(){
		localStorage.clear()
		window.location.reload();
	}

	return (
		<div className='dash-container'>
			<h1>Hello {name || 'No name found'}</h1>
			<p>ton adresse mail est : {email || 'No mail found !'}</p>
			<p>ton role est {role || 'tu es un employé'} </p>
			<p onClick={SignOut}>Deconnexion</p>
		</div>
	)
}

export default Dashboard
