import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { TimeType } from "../../models/time"

type ChangeTimeButtonsProps = {
  setFocusTime: React.Dispatch<React.SetStateAction<TimeType>>
  focusTime: TimeType
  setBreakTime: React.Dispatch<React.SetStateAction<TimeType>>
  breakTime: TimeType
  resetClock: () => void
}

export const ChangeTimeSettingsButtons = ({
  setFocusTime,
  focusTime,
  setBreakTime,
  breakTime,
  resetClock,
}: ChangeTimeButtonsProps) => {
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
    setFocusTime(data)
  }

  const onSubmitBreak = (data: TimeType) => {
    setBreakTime(data)
  }

  useEffect(() => {
    resetFocus(focusTime)
    resetBreak(breakTime)
    resetClock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusTime, breakTime, resetFocus, resetBreak])

  return (
    <section title="Pomodoro Settings" className="pomodoro-settings">
      <form onSubmit={handleSubmitFocus(onSubmitFocus)}>
        <h4>Focus Time</h4>
        <section title="Focus Time Settings" className="row-flex">
          <input
            {...registerFocus("hours")}
            placeholder="Hours"
            aria-label="Hours"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <p>:</p>
          <input
            {...registerFocus("minutes")}
            placeholder="Minutes"
            aria-label="Minutes"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <p>:</p>
          <input
            {...registerFocus("seconds")}
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
            {...registerBreak("hours")}
            placeholder="Hours"
            aria-label="Hours"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <p>:</p>
          <input
            {...registerBreak("minutes")}
            placeholder="Minutes"
            aria-label="Minutes"
            onClick={(e: React.MouseEvent<HTMLInputElement>) =>
              e.currentTarget.select()
            }
          />
          <p>:</p>
          <input
            {...registerBreak("seconds")}
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
