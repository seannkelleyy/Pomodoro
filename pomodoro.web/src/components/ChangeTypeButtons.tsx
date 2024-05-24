import { Dispatch, SetStateAction } from "react"

type ChangeTimerTypeButtonsProps = {
  setTimerType: Dispatch<SetStateAction<string>>
  setIsResetting: Dispatch<SetStateAction<boolean>>
  timerTypes: string[]
}

export const ChangeTimerTypeButtons = ({
  setTimerType,
  setIsResetting,
  timerTypes,
}: ChangeTimerTypeButtonsProps) => {
  return (
    <div className="button-group">
      {timerTypes.map((type: string) => (
        // eslint-disable-next-line no-extra-semi
        <button
          className="button"
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
