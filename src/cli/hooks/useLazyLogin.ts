import { useCallback, useContext, useState } from 'react'
import { loginWithCli } from '../../providers/awsCli'
import { AppContext } from '../components/AppContext'

/** Login with CLI and write credentials for all profiles with same start url and region. */
export const useLazyLogin = (): [(name: string) => void, { loading: boolean, output?: string, error?: Error }] => {
	const [{ profiles }, setContext] = useContext(AppContext)
	const [loading, setLoading] = useState<boolean>(false)
	const [output, setOutput] = useState<string>()
	const [error, setError] = useState<Error | undefined>()

	const login = useCallback((profileName: string) => {
		if (!profiles[profileName].status?.valid) {
			setLoading(true)
			loginWithCli({ profileName })
				.then(({ output, error }) => {
					setOutput(output)
					setError(new Error(error))
					setLoading(false)
				})
				.catch(error => {
					setError(error)
					setLoading(false)
				})
			setContext({ lastLoginAttemptAt: new Date().getSeconds() })
			setLoading(false)
		}
	}, [profiles, setContext])

	return [login, { loading, output, error }]
}
