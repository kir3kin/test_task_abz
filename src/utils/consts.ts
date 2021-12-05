import { UserCountType, formPatterns, helperTextType } from "../interfaces/utils.interface"

export const API_LINK: string = 'https://frontend-test-assignment-api.abz.agency/api/v1'

// to define device by its width using react-responsive plugin
export const DEVICE_TYPE: {[key: string]: string} = {
	tablet: '(max-width: 1024px)',
	mobile: '(max-width: 768px)',
}

export const USERS_COUNT: UserCountType = {
	desktop: 9,
	tablet: 6,
	mobile: 3
}

// for user cards
export const MAX_CHAR = {
	name: 38,
	position: 78,
	helperText: 120
}


// Helper messages
export const HELPER_TEXT: helperTextType = {
	name: 'Name should contain 2-60 characters',
	email: 'Email should be like "jhon@example.com"',
	phone: 'Number should start with code of Ukraine +380',
	photo: {
		size: 'The photo size must not be greater than 5 Mb',
		dimensions: 'Minimum size of photo is 70x70px',
		type: 'The photo format must be jpeg/jpg type'
	}
} 

// Form patterns
export const FORM_PATTERN: formPatterns = {
	name: /^[^\s][\w\d\-_ ]{0,58}[^\s]$/,// not used!!!
	email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
	phone: /^[\+]{0,1}380([0-9]{9})$/,
	position_id: /^[1-9]\d*$/,// not used!!!
	photo: {
		type: /jpe?g/,// jpeg|jpg - not used!!!
		size: 5 * 1024 * 1024,// 5 MB
		height: 70,// min 70px
		width: 70// min 70px
	}
}

// for form input classes in Register.tsx
export const DEFAULT_FORM_CLASSES = {
	error: 'error',
	filled: 'filled'
} as { [key: string]: string }
