import React, { FC, useContext } from 'react'
import { Text } from 'ink'
import { AppContext } from './AppContext'
import { useWriteCredentials } from '../hooks'
import { timeDifference } from '../utils/timeDifference'

export const Credentials: FC = () => {
	const [{ profiles }] = useContext(AppContext)
	useWriteCredentials()

	return <>{
		Object.keys(profiles).map(name => (
			<Text key={name}>
				{profiles[name].credentials
					? <>
					New credentials for {name} expire {timeDifference(new Date(profiles[name].credentials.expiration))}.
					</>
					: <>
					Waiting on credentials for {name}...
					</>}
			</Text>
		))
	}</>
}
