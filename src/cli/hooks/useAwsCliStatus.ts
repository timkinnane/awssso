import { useApp } from 'ink'
import { useEffect, useState } from 'react'
import { validateCliVersion } from '../../functions/validation'
import { getCliVersion } from '../../providers/awsCli'

/** Ensure AWS CLI is installed and at proper version or exit app. */
export const useAwsCliStatus = (): { loading: boolean, error: Error | undefined } => {
	const app = useApp()
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<Error>()

	useEffect(() => {
		const { version, error: versionError } = getCliVersion()
		if (versionError) {
			setError(versionError)
			setLoading(false)
			return
		}

		const { error: validateError } = validateCliVersion({ version })
		if (validateError) {
			setError(validateError)
		}

		setLoading(false)
	}, [app])

	return { loading, error }
}
