import { createSlice } from '@reduxjs/toolkit'

interface preview {
	previewUrl: string
}

const initialState: preview = {
	previewUrl: '',
}

export const PreviewUrl = createSlice({
	name: 'preview',
	initialState,
	reducers: {
		updatePreviewUrl: (state: preview, action: any) => {
			state.previewUrl = action.payload
		},
	},
})

export const { updatePreviewUrl } = PreviewUrl.actions

export default PreviewUrl.reducer
