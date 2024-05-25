import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TimeType } from "../models/time"

type TimeProps = {
  timerType: string
  focusLength?: TimeType
  breakLength?: TimeType
  isResetting: boolean
  setIsResetting: Dispatch<SetStateAction<boolean>>
}

export const Time = ({
  timerType,
  focusLength,
  breakLength,
  isResetting,
  setIsResetting,
}: TimeProps) => {
  const [isBreakTime, setIsBreakTime] = useState<boolean>(false)
  const [isPaused, setIsPaused] = useState<boolean>(false)
  const [hours, setHours] = useState<number>(
    focusLength?.hours ?? 0 >= 0 ? focusLength!.hours : 0
  )
  const [minutes, setMinutes] = useState<number>(
    focusLength?.minutes ?? 0 >= 0 ? focusLength!.minutes : 0
  )
  const [seconds, setSeconds] = useState<number>(
    focusLength?.seconds ?? 0 >= 0 ? focusLength!.seconds : 0
  )

  const setTime = () => {
    if (timerType === "Focus") {
      if (isBreakTime) {
        setIsBreakTime(false)
      }
      if (seconds === 59) {
        setSeconds(0)
        setMinutes(minutes + 1)
      } else {
        setSeconds(seconds + 1)
      }
      if (minutes === 59) {
        setMinutes(0)
        setHours(hours + 1)
      }
    } else if (timerType === "Pomodoro") {
      if (hours === 0 && minutes === 0 && seconds === 0) {
        setIsBreakTime(!isBreakTime)
        if (!isBreakTime) {
          setHours(breakLength?.hours ?? 0)
          setMinutes(breakLength?.minutes ?? 0)
          setSeconds(breakLength?.seconds ?? 0)
        } else {
          setHours(focusLength?.hours ?? 0)
          setMinutes(focusLength?.minutes ?? 0)
          setSeconds(focusLength?.seconds ?? 0)
        }
      }
      if (seconds === 0) {
        if (minutes > 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      } else {
        setSeconds(seconds - 1)
      }
      if (minutes === 0) {
        if (hours > 0) {
          setMinutes(59)
          setHours(hours - 1)
        }
      }
    }
  }

  const resetClock = () => {
    if (timerType === "Focus") {
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    } else {
      setHours(focusLength ? focusLength?.hours : 0)
      setMinutes(focusLength ? focusLength?.minutes : 0)
      setSeconds(focusLength ? focusLength?.seconds : 0)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => !isPaused && setTime(), 1000)
    if (isResetting) {
      resetClock()
      setIsResetting(false)
    }
    return () => clearInterval(interval)
  })

  return (
    <section title="Time" className="time">
      <button
        className={isPaused ? "time-button paused" : "time-button active"}
        onClick={() => setIsPaused(!isPaused)}
      >
        {isBreakTime && (
          <>
            <h3>Break Time!</h3>
            <h5>Ends in:</h5>
          </>
        )}
        <h1>
          {hours < 10 ? "0" + hours.toLocaleString() : hours.toLocaleString()} :{" "}
          {minutes < 10
            ? "0" + minutes.toLocaleString()
            : minutes.toLocaleString()}{" "}
          :{" "}
          {seconds < 10
            ? "0" + seconds.toLocaleString()
            : seconds.toLocaleString()}
        </h1>
        {timerType === "Pomodoro" && breakLength && (
          <h3>
            Your next break length is:{" "}
            {breakLength.hours < 10
              ? "0" + breakLength.hours.toLocaleString()
              : breakLength.hours.toLocaleString()}{" "}
            :{" "}
            {breakLength.minutes < 10
              ? "0" + breakLength.minutes.toLocaleString()
              : breakLength.minutes.toLocaleString()}{" "}
            :{" "}
            {breakLength.seconds < 10
              ? "0" + breakLength.seconds.toLocaleString()
              : breakLength.seconds.toLocaleString()}
          </h3>
        )}
      </button>
      {timerType === "Pomodoro" && (
        <section title="Pomodoro Settings" className="pomodoro-settings">
          <input
            id="pomodoroHours"
            placeholder="Hours"
            aria-label="Hours"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHours(Number(e.target.value))
            }
          />
          <input
            id="pomodoroMinutes"
            placeholder="Minutes"
            aria-label="Minutes"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMinutes(Number(e.target.value))
            }
          />
          <input
            id="pomodoroSeconds"
            placeholder="Seconds"
            aria-label="Seconds"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSeconds(Number(e.target.value))
            }
          />
          <input
            id="pomodoroBreakLength"
            placeholder="Break Length"
            aria-label="Break Length"
            onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHours(Number(e.target.value))
            }
          />
        </section>
      )}
    </section>
  )
}
