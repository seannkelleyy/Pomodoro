import { useState } from "react"
import { Time } from "./Time"
import { ChangeTimerTypeButtons } from "./ChangeTypeButtons"

export const MainPage = () => {
  const [timerType, setTimerType] = useState<string>("Pomodoro")
  const [resetting, setResetting] = useState<boolean>(false)

  return (
    <div className="main-section">
      <section title="Heading" className="title">
        <h1>{timerType}</h1>
      </section>
      <section title="Time">
        <Time
          timerType={timerType}
          focusLength={{
            hours: 0,
            minutes: 25,
            seconds: 0,
          }}
          breakLength={{
            hours: 0,
            minutes: 1,
            seconds: 10,
          }}
          isResetting={resetting}
          setIsResetting={setResetting}
        />
      </section>
      <section title="Change Timer Type Buttons">
        <ChangeTimerTypeButtons
          setTimerType={setTimerType}
          timerTypes={["Pomodoro", "Focus"]}
          setIsResetting={setResetting}
        />
      </section>
    </div>
  )
}
