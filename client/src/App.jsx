import {React} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import './main.scss'

import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'

const App = () => {

	var isLoggedIn = localStorage.getItem('token')

	return (
		<div>
			<BrowserRouter>
			<Routes>
			{
				isLoggedIn !== null ? <Route path="/" element={<Navigate to="/dashboard" replace />} /> : <Route path="/dashboard" element={<Navigate to="/" replace />} />
			}

			{
				isLoggedIn !== null ? <Route path="/register" element={<Navigate to="/dashboard" replace />} /> : <Route path="/dashboard" element={<Navigate to="/" replace />} />
			
			}
				<Route path="/dashboard" element={<Dashboard/>} />
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
						path="/*"
						element={<Navigate to="/" replace />}
				/>
			</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
