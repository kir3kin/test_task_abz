import { Method } from "axios";
import { iPosition, iUser } from "./app.interface";

// for Axios functions in app.api.tsx
export type AxiosParamsType = {
	baseURL: string,
	method: Method,
	headers: {
		[key: string]: string
	}
}

export interface iFetchUsers {
	data: {
		total_pages: number,
		users: iUser[]
	}
}

export interface iFetchUser {
	data: { user: iUser }
}

export interface iFetchToken {
	data: { token: string }
}

export interface iFetchPositions {
	data: { positions: iPosition[] }
}

export interface iRegisterUser {
	data: {
		user_id?: number
		success: boolean
		message: string
	}
}