import { Dispatch, SetStateAction } from "react"

type ChangeTimerTypeButtonsProps = {
  setTimerType: Dispatch<SetStateAction<string>>
  setIsResetting: Dispatch<SetStateAction<boolean>>
  timerTypes: string[]
  timerType: string
}

export const ChangeTimerTypeButtons = ({
  setTimerType,
  setIsResetting,
  timerTypes,
  timerType,
}: ChangeTimerTypeButtonsProps) => {
  return (
    <div className="row-flex">
      {timerTypes.map((type: string) => (
        <button
          className={timerType === type ? "active" : ""}
          key={type}
          onClick={() => {
            setTimerType(type)
            setIsResetting(true)
          }}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
