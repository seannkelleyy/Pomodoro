/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeTimeSettingsButtons } from '../components/buttonGroups/ChangeTimeSettingsButtons'
import { ChangeTimerTypeButtons } from '../components/buttonGroups/ChangeTypeButtons'
import dayjs from 'dayjs'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FormatTime } from '../utils/FormatTime'
import { ContactFooter } from '../components/footer/Footer'
import { useTimer } from '../hooks/useTimer'

export const Timer = () => {
	const startingPomodoroTime = { hours: 0, minutes: 25, seconds: 0, milliseconds: 0 }
	const startingFocusTime = { hours: 0, minutes: 25, seconds: 0, milliseconds: 0 }
	const {
		timerType,
		setTimerType,
		resetClock,
		isBreakTime,
		isPaused,
		setIsPaused,
		showSettings,
		setShowSettings,
		resetFillProgress,
		startButtonVisible,
		setStartButtonVisible,
		focusTime,
		setFocusTime,
		breakTime,
		setBreakTime,
		timerTime,
		handleMouseDown,
		handleMouseUp,
	} = useTimer(startingPomodoroTime, startingFocusTime)

	return (
		<section title='Timer' className='timer'>
			<section title='Heading' className='title'>
				<h1 style={{ marginBottom: '0' }}>{dayjs().format('dddd')}</h1>
				<h2>{dayjs().format('MMMM D, YYYY')}</h2>
			</section>
			{startButtonVisible && (
				<button className='apply' onClick={() => setStartButtonVisible(false)}>
					Start
				</button>
			)}
			<button
				className={isPaused ? 'time-button paused' : 'time-button active'}
				onClick={() => setIsPaused(!isPaused)}
				onMouseDown={() => handleMouseDown()}
				onMouseUp={() => handleMouseUp()}
				onMouseLeave={() => handleMouseUp()}
			>
				{isBreakTime && (
					<>
						<h3>Break Time!</h3>
						<h5>Ends in:</h5>
					</>
				)}
				<h1>
					<FormatTime time={timerTime} />
				</h1>
				{timerType === 'Pomodoro' && (
					<h3>
						Your next break length is: <FormatTime time={breakTime} />
					</h3>
				)}
				<div className='resetOverlay' style={{ height: `${resetFillProgress}%` }} />
			</button>
			<section title='Change Timer Type Buttons'>
				<ChangeTimerTypeButtons setTimerType={setTimerType} timerTypes={['Pomodoro', 'Focus']} timerType={timerType} />
			</section>
			{timerType === 'Pomodoro' && (
				<>
					<button
						style={{
							display: 'flex',
							alignItems: 'center',
							marginTop: '1rem',
						}}
						onClick={() => setShowSettings(!showSettings)}
					>
						Timer Settings {showSettings ? <ChevronDown /> : <ChevronUp />}
					</button>
					{showSettings && (
						<ChangeTimeSettingsButtons
							currentMode={isBreakTime ? 'Break' : 'Focus'}
							setFocusTime={setFocusTime}
							focusTime={focusTime}
							setBreakTime={setBreakTime}
							breakTime={breakTime}
							resetClock={resetClock}
						/>
					)}
				</>
			)}
			<ContactFooter />
		</section>
	)
}
