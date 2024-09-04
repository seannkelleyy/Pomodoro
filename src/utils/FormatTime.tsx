import { TimeType } from '../models/time'

type FormatTimeProps = {
	time: TimeType
}

export const FormatTime = ({ time }: FormatTimeProps): JSX.Element => {
	const formatTimeUnit = (unit: number): string => (unit < 10 ? `0${unit}` : `${unit}`)
	return (
		<>
			{formatTimeUnit(time.hours)} : {formatTimeUnit(time.minutes)} : {formatTimeUnit(time.seconds)}
		</>
	)
}

