import React, { useContext, useState } from 'react'
import { Text } from 'ink'
import SelectInput from 'ink-select-input'
import { AppContext } from './AppContext'

export const ProfileMenu = (props: {
	onSelect: (profileName: string) => void
}) => {
	const [{ profiles }] = useContext(AppContext)
	const [statusMessage, setStatusMessage] = useState('')

	const items = Object.keys(profiles).map(name => {
		const label = `[${name}] (${profiles[name].status?.valid ? 'logged in' : 'requires login'})`
		return { label, value: name }
	})
	if (!statusMessage) setStatusMessage(profiles[items[0].value].status?.message)

	return <>
		<SelectInput
			items={items}
			onSelect={(item) => props.onSelect(item.value)}
			onHighlight={(item) => setStatusMessage(profiles[item.value].status?.message)}
		/>
		<Text color='magenta'>{statusMessage}</Text>
	</>
}
