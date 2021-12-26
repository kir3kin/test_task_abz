import { DEFAULT_FORM_CLASSES, FORM_PATTERN } from "./consts"

// for User Name, Email, Position in Cheerfull.tsx
// to transform long string into string with appropriate length and add '...' at the end 
export const cutString = (name: string, length: number): string => {
	if (name.length > length) return name.substr(0, length) + '...'
	return name
}

// for Id and htmlFor in radio buttons (Register.tsx)
// to transform " Content Manager " into "content-manager"
export const getPositionFor = (name: string): string => {
	return name.toLowerCase().trim().replaceAll(' ', '-')
}

// Register.tsx
// to validate upload file width & height \\
export const validateUploadedFile = async (file: File) => {
	return new Promise<boolean>((resolve, reject) => {
		const reader = new FileReader()
		reader.onload = () => {
			const img = new Image()
			img.onload = () => {
				const validFile = (img.width > FORM_PATTERN.photo.width) &&
													(img.height > FORM_PATTERN.photo.height)
				resolve(validFile)
			}
			if (typeof reader.result === 'string') img.src = reader.result
		}
		reader.readAsDataURL(file)
	})
}


// to build form input class name
export const returnClassName = (
	baseName: string,
	error: boolean,
	isEmpty: boolean = true
) => {
	let classes = [baseName]
	if (error) classes.push(DEFAULT_FORM_CLASSES.error)
	if (!isEmpty) classes.push(DEFAULT_FORM_CLASSES.filled)
	return classes.join(' ')
}