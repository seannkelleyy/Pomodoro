import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Timer } from './pages/Timer'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Timer />
	</React.StrictMode>,
)

