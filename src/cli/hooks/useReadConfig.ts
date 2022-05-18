import type { ProfileConfig } from '../../types'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/AppContext'
import * as awsCli from '../../providers/awsCli'
import * as profile from '../../functions/profile'

/** State setter for profile name. */
export type SetProfileName = React.Dispatch<React.SetStateAction<string>>

/** Process AWS CLI config file for named profile and return properties. */
export const useReadConfig = (): {
	loading: boolean,
	error: Error | undefined
} => {
	const [context, setContext] = useContext(AppContext)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error | undefined>()

	useEffect(() => {
		if (typeof context.profiles !== 'undefined') {
			setLoading(false)
			return
		}

		const { configContent, error } = awsCli.readConfigFile({
			configPath: awsCli.getConfigPath()
		})
		if (error) {
			setError(error)
			setContext({ profiles: {} })
			setLoading(false)
			return
		}

		let currentName = ''
		const loadedConfigs: Record<string, Record<string, string>> = {}

		for (const configLine of configContent.split('\n')) {
			const lineName = profile.parseConfigProfileName({ configLine })
			const lineProperty = profile.parseConfigProfileProperty({ configLine })
			if (lineName) {
				currentName = lineName
			} else if (lineProperty) {
				loadedConfigs[currentName] = { ...(loadedConfigs[currentName] || {}), ...lineProperty }
			}
		}

		const profiles = Object.keys(loadedConfigs).reduce((acc, name) => {
			acc[name] = { config: loadedConfigs[name] as ProfileConfig }
			return acc
		}, {} as Record<string, { config: ProfileConfig }>)

		setContext({ profiles })
		setLoading(false)
	}, [context.profiles, setContext])

	return { loading, error }
}
