import { TimeType } from "../models/time"

export const convertTime = (totalMilliseconds: number): TimeType => {
	const hours = Math.floor(totalMilliseconds / 3600000)
	const minutes = Math.floor((totalMilliseconds % 3600000) / 60000)
	const seconds = Math.floor((totalMilliseconds % 60000) / 1000)
	const milliseconds = totalMilliseconds % 1000
	return { hours, minutes, seconds, milliseconds }
}