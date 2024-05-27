import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { TimeType } from "../../models/time"

type ChangeTimeButtonsProps = {
  setFocusTime: Dispatch<SetStateAction<TimeType>>
  focusTime: TimeType
  setBreakTime: Dispatch<SetStateAction<TimeType>>
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
  const [tempFocusTime, setTempFocusTime] = useState({
    hours: 0,
    minutes: 25,
    seconds: 0,
  })
  const [tempBreakTime, setTempBreakTime] = useState({
    hours: 0,
    minutes: 25,
    seconds: 0,
  })
  useEffect(() => {
    resetClock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusTime, breakTime])
  return (
    <section title="Pomodoro Settings" className="pomodoro-settings">
      <h4>Focus Time</h4>
      <section title="Focus Time Settings" className="row-flex">
        <input
          id="pomodoroHours"
          placeholder="Hours"
          aria-label="Hours"
          defaultValue={focusTime.hours}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.currentTarget.select()
          }
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTempFocusTime({
              hours: Number(e.target.value),
              minutes: focusTime.minutes,
              seconds: focusTime.seconds,
            })
          }
        />
        <p>:</p>
        <input
          id="pomodoroMinutes"
          placeholder="Minutes"
          aria-label="Minutes"
          defaultValue={focusTime.minutes}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.currentTarget.select()
          }
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTempFocusTime({
              hours: focusTime.hours,
              minutes: Number(e.target.value),
              seconds: focusTime.seconds,
            })
          }
        />
        <p>:</p>
        <input
          id="pomodoroSeconds"
          placeholder="Seconds"
          aria-label="Seconds"
          defaultValue={focusTime.seconds}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.currentTarget.select()
          }
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTempFocusTime({
              hours: focusTime.hours,
              minutes: focusTime.minutes,
              seconds: Number(e.target.value),
            })
          }
        />
      </section>
      <button
        onClick={() => {
          setFocusTime(tempFocusTime)
          resetClock()
        }}
      >
        Save
      </button>
      <h4>Break Time</h4>
      <section title="Pomodoro Break Settings" className="row-flex">
        <input
          id="breakHours"
          placeholder="Hours"
          aria-label="Hours"
          defaultValue={breakTime.hours}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.currentTarget.select()
          }
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTempBreakTime({
              hours: Number(e.target.value),
              minutes: breakTime.minutes,
              seconds: breakTime.seconds,
            })
          }
        />
        <p>:</p>
        <input
          id="breakMinutes"
          placeholder="Minutes"
          aria-label="Minutes"
          defaultValue={breakTime.minutes}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.currentTarget.select()
          }
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTempBreakTime({
              hours: breakTime.hours,
              minutes: Number(e.target.value),
              seconds: breakTime.seconds,
            })
          }
        />
        <p>:</p>
        <input
          id="breakSeconds"
          placeholder="Seconds"
          aria-label="Seconds"
          defaultValue={breakTime.seconds}
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            e.currentTarget.select()
          }
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTempBreakTime({
              hours: breakTime.hours,
              minutes: breakTime.minutes,
              seconds: Number(e.target.value),
            })
          }
        />
      </section>
      <button
        onClick={() => {
          setBreakTime(tempBreakTime)
          resetClock()
        }}
      >
        Save
      </button>
    </section>
  )
}
