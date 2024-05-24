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
    const interval = setInterval(() => setTime(), 1000)
    if (isResetting) {
      resetClock()
      console.log("resetting clock in time")
      setIsResetting(false)
    }
    return () => clearInterval(interval)
  })

  return (
    <section title="Time" className="time">
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
    </section>
  )
}
