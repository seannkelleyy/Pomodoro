/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TimeType } from "../../models/time"

type ChangeTimeButtonsProps = {
  currentMode: string
  setFocusTime: React.Dispatch<React.SetStateAction<TimeType>>
  focusTime: TimeType
  setBreakTime: React.Dispatch<React.SetStateAction<TimeType>>
  breakTime: TimeType
  resetClock: () => void
}

export const ChangeTimeSettingsButtons = ({
  currentMode,
  setFocusTime,
  focusTime,
  setBreakTime,
  breakTime,
  resetClock,
}: ChangeTimeButtonsProps) => {
  const [isChangingBreakTime, setIsChangingBreakTime] = useState(false)
  const [isChangingFocusTime, setIsChangingFocusTime] = useState(false)
  const {
    register: registerFocus,
    handleSubmit: handleSubmitFocus,
    reset: resetFocus,
  } = useForm<TimeType>()
  const {
    register: registerBreak,
    handleSubmit: handleSubmitBreak,
    reset: resetBreak,
  } = useForm<TimeType>()

  const onSubmitFocus = (data: TimeType) => {
    setIsChangingFocusTime(true)
    setFocusTime(data)
  }

  const onSubmitBreak = (data: TimeType) => {
    setIsChangingBreakTime(true)
    setBreakTime(data)
  }

  useEffect(() => {
    resetFocus(focusTime)
    resetBreak(breakTime)
    if (isChangingFocusTime && currentMode === "Focus") {
      resetClock()
      setIsChangingFocusTime(false)
    }
    if (isChangingBreakTime && currentMode === "Break") {
      resetClock()
      setIsChangingBreakTime(false)
    }
  }, [focusTime, breakTime, resetFocus, resetBreak])

  return (
    <section title="Pomodoro Settings" className="pomodoro-settings">
      <form onSubmit={handleSubmitFocus(onSubmitFocus)}>
        <h4>Focus Time</h4>
        <section title="Focus Time Settings" className="row-flex">
          <input
            {...registerFocus("hours", {
              valueAsNumber: true,
              validate: (value) => value >= 0,
            })}
            type="number"
            placeholder="Hours"
            aria-label="Hours"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <p>:</p>
          <input
            {...registerFocus("minutes", {
              valueAsNumber: true,
              validate: (value) => value >= 0,
            })}
            type="number"
            placeholder="Minutes"
            aria-label="Minutes"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <p>:</p>
          <input
            {...registerFocus("seconds", {
              valueAsNumber: true,
              validate: (value) => value >= 0,
            })}
            type="number"
            placeholder="Seconds"
            aria-label="Seconds"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <button className="apply" type="submit">
            Apply
          </button>
        </section>
      </form>
      <form onSubmit={handleSubmitBreak(onSubmitBreak)}>
        <h4>Break Time</h4>
        <section title="Pomodoro Break Settings" className="row-flex">
          <input
            {...registerBreak("hours", {
              valueAsNumber: true,
              validate: (value) => value >= 0,
            })}
            type="number"
            placeholder="Hours"
            aria-label="Hours"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <p>:</p>
          <input
            {...registerBreak("minutes", {
              valueAsNumber: true,
              validate: (value) => value >= 0,
            })}
            type="number"
            placeholder="Minutes"
            aria-label="Minutes"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <p>:</p>
          <input
            {...registerBreak("seconds", {
              valueAsNumber: true,
              validate: (value) => value >= 0,
            })}
            type="number"
            placeholder="Seconds"
            aria-label="Seconds"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <button className="apply" type="submit">
            Apply
          </button>
        </section>
      </form>
    </section>
  )
}
