import { createContext, Dispatch } from 'react'

export type ReducerContextTuple<T> = [T, Dispatch<Partial<T>>]

/** Create context with value and setter tuple pattern. */
export function createReducerContext<T> (initialContext: T) {
	return createContext([
		initialContext,
		() => initialContext
	] as ReducerContextTuple<T>)
}

/** `useReducer` args for context provider's shallow merge reducer. */
export function reducerArgs<T> (initialContext: T) {
	return [
		(current: T, update: Partial<T>): T => ({ ...current, ...update }),
		initialContext
	] as const
}
