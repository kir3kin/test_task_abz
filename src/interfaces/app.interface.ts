export type LoadingStatus = "idle" | "loading" | "failed"

// @countNumber - number of downloading users | depends on screen size
export type countNumber = 3 | 6 | 9

export interface iUser {
	id: string
	name: string
	email: string
	phone: string
	position: string
	registration_timestamp: number
	photo: string
}

export interface iPosition {
	id: string
	name: string
}

// for thunk getUsers
export interface iGetUsers {
  users: iUser[]
  nextPage: number
  lastPage: boolean
}

// default state interface
export interface iAppState {
	users: {
		status: LoadingStatus
		data: iUser[]
	}
	positions: {
		status: LoadingStatus
		data: iPosition[]
	}
	registerUser: LoadingStatus
  page: number
  count: number
  lastPage: boolean
	showModal: boolean
	showSideMenu: boolean
	token: {
		data: string
		status: LoadingStatus
	}
	error: string | undefined
}
