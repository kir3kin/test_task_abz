import { countNumber } from "./app.interface"

// ../utils/consts.ts '@count' - number of downloading users | depends on screen size
export type UserCountType = {
	desktop: countNumber
	tablet: countNumber
	mobile: countNumber
}

// helper textes (using in form inputs)
export type helperTextType = {
	name: string
	email: string
	phone: string
	photo: {
		size: string
		dimensions: string
		type: string
	}
}

// ..utils/consts.ts for patterns
type photoPatternType = {
	type: RegExp
	size: number
	height: number
	width: number
}

export interface formPatterns {
	name: RegExp
	email: RegExp
	phone: RegExp
	position_id: RegExp
	photo: photoPatternType
}