import { configureStore } from '@reduxjs/toolkit'
import FormReducers from '../features/member'
import CollabInfo from '../features/collabInfo'
import PreviewUrl from '../features/preview'
export const store = configureStore({
	reducer: {
		FormReducers: FormReducers,
		collabInfo: CollabInfo,
		previewUrl: PreviewUrl,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
