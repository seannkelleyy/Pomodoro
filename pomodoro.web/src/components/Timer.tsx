import { ChangeTimeSettingsButtons } from "./buttonGroups/ChangeTimeSettingsButtons"
import { TimeType } from "../models/time"
import { ChangeTimerTypeButtons } from "./buttonGroups/ChangeTypeButtons"
import { useState, useEffect } from "react"

export const Timer = () => {
  const [timerType, setTimerType] = useState<string>("Pomodoro")
  const [isResetting, setIsResetting] = useState<boolean>(false)
  const [intervalId, setIntervalId] = useState<number>(0)
  const [isBreakTime, setIsBreakTime] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [fillProgress, setFillProgress] = useState(0)
  const [focusTime, setFocusTime] = useState<TimeType>({
    hours: 0,
    minutes: 25,
    seconds: 0,
  })
  const [breakTime, setBreakTime] = useState<TimeType>({
    hours: 0,
    minutes: 5,
    seconds: 0,
  })
  const [timerTime, setTimerTime] = useState<TimeType>({ ...focusTime })

  const setTimeFocusMode = () => {
    setTimerTime((prevTime) => {
      if (prevTime.seconds < 59) {
        return { ...prevTime, seconds: prevTime.seconds + 1 }
      } else if (prevTime.minutes < 59) {
        return { ...prevTime, seconds: 0, minutes: prevTime.minutes + 1 }
      } else {
        return {
          ...prevTime,
          seconds: 0,
          minutes: 0,
          hours: prevTime.hours + 1,
        }
      }
    })
  }

  const setTimePomodoroMode = () => {
    setTimerTime((prevTime) => {
      if (
        prevTime.hours === 0 &&
        prevTime.minutes === 0 &&
        prevTime.seconds === 0
      ) {
        setIsBreakTime(!isBreakTime)
        if (!isBreakTime) {
          return breakTime
        } else {
          return focusTime
        }
      }
      if (prevTime.seconds === 0) {
        if (prevTime.minutes > 0) {
          return { ...prevTime, seconds: 59, minutes: prevTime.minutes - 1 }
        }
      } else {
        return { ...prevTime, seconds: prevTime.seconds - 1 }
      }
      if (prevTime.minutes === 0) {
        if (prevTime.hours > 0) {
          return { ...prevTime, minutes: 59, hours: prevTime.hours - 1 }
        }
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

  /* This useEffect hook will run every second to update the timer */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      timerType === "Focus" ? setTimeFocusMode() : setTimePomodoroMode()
    }, 1000)
    if (isResetting) {
      resetClock()
      setIsResetting(false)
    }
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isResetting, timerType])

  /* This starts the count to reset the clock and shows progress */
  const handleMouseDown = () => {
    setFillProgress(0)
    const id = setInterval(() => {
      setFillProgress((prevProgress) => {
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
    setFillProgress(0)
  }

  const resetOverlayStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: `${fillProgress}%`,
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
          setIsResetting={setIsResetting}
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
