/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeTimeSettingsButtons } from "./buttonGroups/ChangeTimeSettingsButtons"
import { TimeType } from "../models/time"
import { ChangeTimerTypeButtons } from "./buttonGroups/ChangeTypeButtons"
import { useState, useEffect } from "react"

export const Timer = () => {
  const [timerType, setTimerType] = useState<string>("Pomodoro")
  const [intervalId, setIntervalId] = useState<number>(0)
  const [isBreakTime, setIsBreakTime] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [resetFillProgress, setResetFillProgress] = useState<number>(0)
  const [focusTime, setFocusTime] = useState<TimeType>({
    hours: 0,
    minutes: 0,
    seconds: 30,
  })
  const [breakTime, setBreakTime] = useState<TimeType>({
    hours: 0,
    minutes: 0,
    seconds: 20,
  })
  const [timerTime, setTimerTime] = useState<TimeType>({ ...focusTime })

  const setTimeFocusMode = () => {
    setTimerTime((prevTime) => {
      const totalSeconds =
        prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds + 1
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60
      return { hours, minutes, seconds }
    })
  }

  const setTimePomodoroMode = () => {
    setTimerTime((prevTime) => {
      const totalSeconds =
        prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds

      if (totalSeconds === 0) {
        setIsBreakTime((prevIsBreakTime) => !prevIsBreakTime)
      } else {
        const newTotalSeconds = totalSeconds - 1
        const hours = Math.floor(newTotalSeconds / 3600)
        const minutes = Math.floor((newTotalSeconds % 3600) / 60)
        const seconds = newTotalSeconds % 60

        return { hours, minutes, seconds }
      }
      return prevTime
    })
  }

  const resetClock = () => {
    if (timerType === "Focus") {
      setTimerTime({ hours: 0, minutes: 0, seconds: 0 })
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
  }, [timerType, setTimerType])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      timerType === "Focus" ? setTimeFocusMode() : setTimePomodoroMode()
    }, 1000)
    return () => clearInterval(interval)
  }, [isPaused, timerType])

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
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: `${resetFillProgress}%`,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    transition: "height 0.2s linear",
  }

  return (
    <section title="Timer" className="timer">
      <section title="Heading" className="title">
        <h1>{timerType}</h1>
      </section>
      <button
        className={isPaused ? "time-button paused" : "time-button active"}
        onClick={() => setIsPaused(!isPaused)}
        onMouseDown={() => handleMouseDown()}
        onMouseUp={() => handleMouseUp()}
        onMouseLeave={() => handleMouseUp()}
        style={{ position: "relative" }}
      >
        {isBreakTime && (
          <>
            <h3>Break Time!</h3>
            <h5>Ends in:</h5>
          </>
        )}
        <h1>
          {timerTime.hours < 10 ? "0" + timerTime.hours : timerTime.hours} :{" "}
          {timerTime.minutes < 10 ? "0" + timerTime.minutes : timerTime.minutes}{" "}
          :{" "}
          {timerTime.seconds < 10 ? "0" + timerTime.seconds : timerTime.seconds}
        </h1>
        {timerType === "Pomodoro" && (
          <h3>
            Your next break length is:{" "}
            {breakTime.hours < 10 ? "0" + breakTime.hours : breakTime.hours} :{" "}
            {breakTime.minutes < 10
              ? "0" + breakTime.minutes
              : breakTime.minutes}{" "}
            :{" "}
            {breakTime.seconds < 10
              ? "0" + breakTime.seconds
              : breakTime.seconds}
          </h3>
        )}
        <div style={resetOverlayStyle as React.CSSProperties} />
      </button>
      <section title="Change Timer Type Buttons">
        <ChangeTimerTypeButtons
          setTimerType={setTimerType}
          timerTypes={["Pomodoro", "Focus"]}
          timerType={timerType}
        />
      </section>
      {timerType === "Pomodoro" && (
        <ChangeTimeSettingsButtons
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
