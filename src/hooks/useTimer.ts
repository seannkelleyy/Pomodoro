import { useState, useEffect, useRef } from 'react'
import { TimeType } from '../models/time'
import { convertTime } from '../utils/convertTime'

export const useTimer = (initialFocusTime: TimeType, initialBreakTime: TimeType) => {
	const [timerType, setTimerType] = useState<string>('Pomodoro')
	const [intervalId, setIntervalId] = useState<number>(0)
	const [isBreakTime, setIsBreakTime] = useState<boolean>(false)
	const [isPaused, setIsPaused] = useState<boolean>(true)
	const [showSettings, setShowSettings] = useState<boolean>(false)
	const [resetFillProgress, setResetFillProgress] = useState<number>(0)
	const previousTimeRef = useRef<number>(new Date().getTime())
	const [focusTime, setFocusTime] = useState<TimeType>(initialFocusTime)
	const [breakTime, setBreakTime] = useState<TimeType>(initialBreakTime)
	const [timerTime, setTimerTime] = useState<TimeType>({ ...initialFocusTime })
	const countdownAudioRef = useRef(new Audio('/countdown.mp3'));

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isBreakTime])

	useEffect(() => {
		resetClock()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timerType])

	useEffect(() => {
		if (isPaused) return
		previousTimeRef.current = new Date().getTime()
		const interval = setInterval(() => {
			const currentTime = new Date().getTime() as number
			const timeDifference = Math.round((currentTime - previousTimeRef.current) / 100) * 100
			previousTimeRef.current = currentTime
			setTimerTime((prevTime) => {
				let totalMilliseconds = prevTime.hours * 3600000 + prevTime.minutes * 60000 + prevTime.seconds * 1000 + prevTime.milliseconds
				timerType === 'Focus' ? (totalMilliseconds += timeDifference) : (totalMilliseconds -= timeDifference)
				if (timerType === 'Pomodoro' && totalMilliseconds <= 500) {
					setIsBreakTime((prevIsBreakTime) => !prevIsBreakTime)
				} else {
					return convertTime(totalMilliseconds)
				}
				return prevTime
			})
		}, 1000)
		return () => clearInterval(interval)
	}, [isPaused, timerType])

	useEffect(() => {
    if (timerType === 'Pomodoro' && timerTime.hours === 0 && timerTime.minutes === 0 && timerTime.seconds <= 5.75) {
        countdownAudioRef.current.play(); // Play the sound
	}
	}, [timerTime]);
	
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

	const handleMouseUp = () => {
		clearInterval(intervalId)
		setIntervalId(0)
		setResetFillProgress(0)
	}

	return {
		timerType,
		setTimerType,
		resetClock,
		isBreakTime,
		isPaused,
		setIsPaused,
		showSettings,
		setShowSettings,
		resetFillProgress,
		focusTime,
		setFocusTime,
		breakTime,
		setBreakTime,
		timerTime,
		handleMouseDown,
		handleMouseUp,
	}
}
