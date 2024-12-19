import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Timer } from './pages/Timer'
import { Footer } from './components/footer/Footer'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<section title='Pomodoro Timer' className='pomodoro-timer'>
			<Timer />
			<Footer />
		</section>
	</React.StrictMode>,
)

