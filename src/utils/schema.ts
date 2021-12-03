import * as yup from "yup"

import { FORM_PATTERN, HELPER_TEXT } from "./consts"
import { validateUploadedFile } from "./servises"

// for react-hook-form plugin in Register.tsx
// ::: form validation rules ::: \\
export const validationSchema = yup.object().shape({
	name: yup.string().required().min(2).max(60),
	email: yup.string().required().matches(FORM_PATTERN.email).min(2).max(100),
	phone: yup.string().required().matches(FORM_PATTERN.phone),
	position_id: yup.number().required().min(1),
	photo: yup.mixed()
		.required()
		.test('fileSize', HELPER_TEXT.photo.size, (value) => {
			if (!value[0]) return true// 'cause required in mixed type returns "{length: 0} !== undefined"
			return value[0].size <= FORM_PATTERN.photo.size
		})
		.test('type', HELPER_TEXT.photo.type, (value) => {
			if (!value[0]) return true
			return value[0].type === 'image/jpeg' 
		})
		.test('dimensions', HELPER_TEXT.photo.dimensions, async (value) => {
			if (!value[0]) return true
			else if (value[0].type !== 'image/jpeg') return false// 'cause doesn't react on the previos test option | plugin bug
			return await validateUploadedFile(value[0])
		})
})