import React, { useEffect } from 'react'
import { useAwsCliStatus, useReadConfig, useReadCache } from '../hooks'
import { TaskList, Task } from 'ink-task-list'
import spinners from 'cli-spinners'

export const LoadingTasks: React.FunctionComponent<{
	onError: (error: Error) => void
	onLoad: () => void
}> = ({ onError, onLoad }) => {
	const awsCli = useAwsCliStatus()
	const readConfig = useReadConfig()
	const readCache = useReadCache()

	if (awsCli.error) onError(awsCli.error)
	if (readConfig.error) onError(readConfig.error)
	if (readCache.error) onError(readCache.error)

	const fullyLoaded = !awsCli.loading && !readConfig.loading && !readConfig.loading

	useEffect(() => {
		if (fullyLoaded) onLoad()
	}, [fullyLoaded, onLoad])

	return (
		<>
			<TaskList>
				<Task
					label='Validate AWS CLI'
					state={awsCli.loading ? 'loading' : 'success'}
					spinner={spinners.dots}
				/>
				<Task
					label='Read config file'
					state={
						readConfig.loading
							? 'loading'
							: readConfig.error
								? 'error'
								: 'success'}
					spinner={spinners.dots}
				/>
				<Task
					label='Read login cache'
					state={readConfig.loading
						? 'pending'
						: readCache.loading
							? 'loading'
							: readCache.error
								? 'error'
								: 'success'
					}
					spinner={spinners.dots}
				/>
			</TaskList>
		</>
	)
}
