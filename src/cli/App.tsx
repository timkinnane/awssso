import React, { useState, FC } from 'react'
import { render, Text } from 'ink'
import Divider from 'ink-divider'
import { AppContextProvider } from './components/AppContext'
import { Credentials } from './components/Credentials'
import { LoadingTasks } from './components/LoadingTasks'
import { Login } from './components/Login'
import { ProfileMenu } from './components/ProfileMenu'

export const App: FC = () => {
	const [initLoading, setInitLoading] = useState(true)
	const [errors, setErrors] = useState<Error[]>([])
	const [selectedProfile, setSelectedProfile] = useState<string>()
	const [loginLoading, setLoginLoading] = useState<boolean>(false)

	return (
		<AppContextProvider>
			<Divider title='AWS SSO' />
			<LoadingTasks
				onLoad={() => setInitLoading(false)}
				onError={(error) => setErrors([...errors, error])}
			/>
			{!initLoading && <>
				<Divider title='Select Profile' />
				<ProfileMenu onSelect={(name) => {
					setSelectedProfile(name)
				}}/>
			</>}
			{selectedProfile && <>
				{loginLoading && <Divider title={`Logging in ${selectedProfile}`} />}
				<Login
					profileName={selectedProfile}
					onLoginStart={() => setLoginLoading(true)}
					onLoginEnd={() => setLoginLoading(false)}
				/>
				<Divider title='Credential Updates' />
				<Credentials />
			</>}
			<Text color='red'>{!!errors.length && JSON.stringify(errors)}</Text>
		</AppContextProvider>
	)
}

render(<App />)
