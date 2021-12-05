// Register.tsx for File Name
export type fileInfoType = { 
	fileName: string
	isEmpty: boolean
}

// Register.tsx interface for Submit Handler
export interface iForm {
	name: string
	email: string
	phone: string
	position_id: string
	photo: FileList
}