import type { LoginCache, LoginStatus, ProfileConfig } from '../../types'
import React, { FC, ReactNode, useReducer } from 'react'
import { createReducerContext, reducerArgs } from '../utils/contextReducer'
import { SSO } from 'aws-sdk'

/** Define your app context model. */
export type AppContextValues = {
  profiles?: Record<string, {
		config: ProfileConfig
		cache?: LoginCache
		status?: LoginStatus
		credentials?: SSO.RoleCredentials
	}>
	lastLoginAttemptAt?: number
}

/** Set initial defaults for app context. */
const initialContext: AppContextValues = {}

/**
 * App context uses a basic reducer callback to merge partial context props given to `setContext`.
 * Without a reducer or other context update callback, context updates would required the whole
 * context as replacement. This approach provides simple and strictly typed partial context updates.
 */
export const AppContext = createReducerContext(initialContext)

export const AppContextProvider: FC<{ children: ReactNode }> = ({ children }) => (
	<AppContext.Provider value={useReducer(...reducerArgs(initialContext))}>
		{ children }
	</AppContext.Provider>
)
