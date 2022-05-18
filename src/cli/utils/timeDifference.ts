/** Returns difference in two dates in hours and minutes. */
export const timeDifference = (compare: Date): string => {
	const msPerMinute = 60 * 1000
	const msPerHour = msPerMinute * 60
	let diff = new Date().getTime() - compare.getTime()

	const isFuture = diff < 0
	if (isFuture) diff *= -1

	const minutes = Math.floor(diff / msPerMinute)
	const hours = Math.floor(diff / msPerHour)
	const minutesRemainder = minutes % 60

	if (minutes < 1) return isFuture ? 'very soon' : 'just now'
	if (minutes < 60) return `${minutes} minutes ${isFuture ? 'from now' : 'ago'}`
	if (minutesRemainder < 1) return `${hours} hours ${isFuture ? 'from now' : 'ago'}`
	return `${hours} hours and ${minutesRemainder} minutes ${isFuture ? 'from now' : 'ago'}`
}
