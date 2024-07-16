import { Dispatch, SetStateAction } from 'react'

type ChangeTimerTypeButtonsProps = {
	setTimerType: Dispatch<SetStateAction<string>>
	timerTypes: string[]
	timerType: string
}

export const ChangeTimerTypeButtons = ({ setTimerType, timerTypes, timerType }: ChangeTimerTypeButtonsProps) => {
	return (
		<div className='row-flex'>
			{timerTypes.map((type: string) => (
				<button
					className={timerType === type ? 'active' : ''}
					key={type}
					onClick={() => {
						setTimerType(type)
					}}
				>
					{type}
				</button>
			))}
		</div>
	)
}
