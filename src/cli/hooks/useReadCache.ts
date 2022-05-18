import { useContext, useEffect, useState } from 'react'
import { getCachePath, readLoginCache } from '../../providers/awsCli'
import { getLoginStatus } from '../../functions/login'
import { AppContext } from '../components/AppContext'

/** Check if profile has already logged in with AWS CLI */
export const useReadCache = (): { loading: boolean, error: Error | undefined } => {
	const [{ profiles, lastLoginAttemptAt }, setContext] = useContext(AppContext)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | undefined>()

	useEffect(() => {
		if (typeof profiles === 'undefined') return

		const cachePath = getCachePath()
		for (const name of Object.keys(profiles)) {
			const startUrl = profiles[name].config.sso_start_url
			const { cache, error } = readLoginCache({ cachePath, startUrl })
			if (error) {
				setError(error)
			} else {
				const status = getLoginStatus({ loginCache: cache, profileConfig: profiles[name].config })
				profiles[name].cache = cache
				profiles[name].status = status
			}
		}

		setContext({ profiles })
		setLoading(false)
	}, [profiles, lastLoginAttemptAt, setContext])

	return { loading, error }
}
