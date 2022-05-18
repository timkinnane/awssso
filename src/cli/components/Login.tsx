import React, { FC, useEffect } from 'react'
import { Text } from 'ink'
import spinners from 'cli-spinners'
import { useLazyLogin } from '../hooks'

export const Login: FC<{
	profileName?: string,
	onLoginStart: () => void
	onLoginEnd: () => void
}> = ({ profileName, onLoginStart, onLoginEnd }) => {
	const [login, { loading, error, output }] = useLazyLogin()
	console.log(`Login: ${profileName}`, { loading, error, output })

	useEffect(() => {
		if (loading) onLoginStart()
	}, [loading, onLoginStart])

	useEffect(() => {
		if (profileName) login(profileName)
	}, [profileName, login])

	useEffect(() => {
		if (error || output) onLoginEnd()
	}, [error, output, onLoginEnd])

	if (!(loading || error || output)) return null

	return (<>
		{loading && <>{spinners.dots}<Text>Loading</Text></>}
		{output && <Text>{output}</Text>}
		{error && <Text color='red'>{error.message}</Text>}
	</>)
}
