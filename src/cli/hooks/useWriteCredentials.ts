import { useContext, useEffect } from 'react'
import { getCredentials } from '../../providers/awsSdk'
import { getCredentialPath } from '../../providers/awsCli'
import { writeCredentials } from '../../functions/credentials'
import { AppContext } from '../components/AppContext'

/** Write credentials for all profiles for all profiles where the cached login is valid. */
export const useWriteCredentials = () => {
	const [{ profiles }, setContext] = useContext(AppContext)

	// Get credentials for all profiles where the cached login is valid
	useEffect(() => {
		for (const name of Object.keys(profiles)) {
			if (profiles[name].status.valid && !profiles[name].credentials) {
				getCredentials({
					config: profiles[name].config,
					cachedLogin: profiles[name].cache
				})
					.then(credentials => {
						profiles[name].credentials = credentials
						setContext({ profiles })
					})
			}
		}
	}, [profiles, setContext])

	// Collect any credentials from profiles in context as they're updated.
	const credentials = Object.keys(profiles).reduce((credentials, name) => {
		if (profiles[name].credentials) credentials[name] = profiles[name].credentials
		return credentials
	}, {})
	const credentialsRegion = profiles[Object.keys(credentials)[0]]?.cache?.region

	// Write credentials to file for all profiles with credentials
	useEffect(() => {
		if (!credentialsRegion || Object.keys(credentials).length) return
		if (!Object.keys(credentials).length) return
		const credentialsPath = getCredentialPath()
		writeCredentials({ credentialsPath, credentialsRegion, credentials })
	}, [credentialsRegion, credentials, setContext])
}
