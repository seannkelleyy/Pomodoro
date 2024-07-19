/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeTimeSettingsButtons } from './buttonGroups/ChangeTimeSettingsButtons'
import { TimeType } from '../models/time'
import { ChangeTimerTypeButtons } from './buttonGroups/ChangeTypeButtons'
import { useState, useEffect, useRef } from 'react'
import dayjs from 'dayjs'

export const Timer = () => {
	const [timerType, setTimerType] = useState<string>('Pomodoro')
	const [intervalId, setIntervalId] = useState<number>(0)
	const [isBreakTime, setIsBreakTime] = useState<boolean>(false)
	const [isPaused, setIsPaused] = useState<boolean>(false)
	const [resetFillProgress, setResetFillProgress] = useState<number>(0)
	const [startButtonVisible, setStartButtonVisible] = useState<boolean>(true)
	const previousTimeRef = useRef<number>(new Date().getTime())
	const [focusTime, setFocusTime] = useState<TimeType>({
		hours: 0,
		minutes: 25,
		seconds: 0,
		milliseconds: 0,
	})
	const [breakTime, setBreakTime] = useState<TimeType>({
		hours: 0,
		minutes: 5,
		seconds: 0,
		milliseconds: 0,
	})
	const [timerTime, setTimerTime] = useState<TimeType>({ ...focusTime })

	const setTimeFocusMode = (timeDifference: number) => {
		setTimerTime((prevTime) => {
			const totalMilliseconds = prevTime.hours * 3600000 + prevTime.minutes * 60000 + prevTime.seconds * 1000 + prevTime.milliseconds + timeDifference
			const hours = Math.floor(totalMilliseconds / 3600000)
			const minutes = Math.floor((totalMilliseconds % 3600000) / 60000)
			const seconds = Math.floor((totalMilliseconds % 60000) / 1000)
			const milliseconds = totalMilliseconds % 1000
			return { hours, minutes, seconds, milliseconds }
		})
	}

	const setTimePomodoroMode = (timeDifference: number) => {
		setTimerTime((prevTime) => {
			const totalMilliseconds = prevTime.hours * 3600000 + prevTime.minutes * 60000 + prevTime.seconds * 1000 + prevTime.milliseconds - timeDifference
			if (totalMilliseconds <= 500) {
				setIsBreakTime((prevIsBreakTime) => !prevIsBreakTime)
			} else {
				const hours = Math.floor(totalMilliseconds / 3600000)
				const minutes = Math.floor((totalMilliseconds % 3600000) / 60000)
				const seconds = Math.floor((totalMilliseconds % 60000) / 1000)
				const milliseconds = totalMilliseconds % 1000
				return { hours, minutes, seconds, milliseconds }
			}
			return prevTime
		})
	}

	const resetClock = () => {
		if (timerType === 'Focus') {
			setTimerTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
		} else {
			setTimerTime({ ...focusTime })
		}
		setIsBreakTime(false)
	}

	useEffect(() => {
		setTimerTime(isBreakTime ? breakTime : focusTime)
	}, [isBreakTime])

	useEffect(() => {
		resetClock()
	}, [timerType])

	useEffect(() => {
		if (isPaused || startButtonVisible) return
		previousTimeRef.current = new Date().getTime()
		const interval = setInterval(() => {
			const currentTime = new Date().getTime() as number
			let timeDifference = currentTime - previousTimeRef.current
			timeDifference = Math.round(timeDifference / 100) * 100
			previousTimeRef.current = currentTime
			timerType === 'Focus' ? setTimeFocusMode(timeDifference) : setTimePomodoroMode(timeDifference)
		}, 1000)
		return () => clearInterval(interval)
	}, [isPaused, timerType, startButtonVisible])

	/* This starts the count to reset the clock and shows progress */
	const handleMouseDown = () => {
		setResetFillProgress(0)
		const id = setInterval(() => {
			setResetFillProgress((prevProgress) => {
				const newProgress = prevProgress + 10
				if (newProgress >= 100) {
					clearInterval(id)
					resetClock()
					return 100 // Return 100 to indicate the box is filled
				}
				return newProgress
			})
		}, 200)
		setIntervalId(id)
	}

	/* This stops the count to reset the clock */
	const handleMouseUp = () => {
		clearInterval(intervalId)
		setIntervalId(0)
		setResetFillProgress(0)
	}

	const resetOverlayStyle = {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		height: `${resetFillProgress}%`,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		transition: 'height 0.2s linear',
	}

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
					{timerTime.hours < 10 ? '0' + timerTime.hours : timerTime.hours} : {timerTime.minutes < 10 ? '0' + timerTime.minutes : timerTime.minutes} :{' '}
					{timerTime.seconds < 10 ? '0' + timerTime.seconds : timerTime.seconds}
				</h1>
				{timerType === 'Pomodoro' && (
					<h3>
						Your next break length is: {breakTime.hours < 10 ? '0' + breakTime.hours : breakTime.hours} : {breakTime.minutes < 10 ? '0' + breakTime.minutes : breakTime.minutes} :{' '}
						{breakTime.seconds < 10 ? '0' + breakTime.seconds : breakTime.seconds}
					</h3>
				)}
				<div style={resetOverlayStyle as React.CSSProperties} />
			</button>
			<section title='Change Timer Type Buttons'>
				<ChangeTimerTypeButtons setTimerType={setTimerType} timerTypes={['Pomodoro', 'Focus']} timerType={timerType} />
			</section>
			{timerType === 'Pomodoro' && (
				<ChangeTimeSettingsButtons
					currentMode={isBreakTime ? 'Break' : 'Focus'}
					setFocusTime={setFocusTime}
					focusTime={focusTime}
					setBreakTime={setBreakTime}
					breakTime={breakTime}
					resetClock={resetClock}
				/>
			)}
		</section>
	)
}
