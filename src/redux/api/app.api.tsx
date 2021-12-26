import axios from 'axios'
import { AxiosParamsType, iFetchPositions, iFetchToken, iFetchUser, iFetchUsers } from '../../interfaces/api.interfaces'

import { API_LINK } from '../../utils/consts'

const axiosParams: AxiosParamsType = {
	baseURL: API_LINK,
	method: 'GET',
	headers: { 'Content-Type': 'application/json' }
}

export class appAPI {
	static fetchUsers = async (page: number, count: number) => {
		const { data }: iFetchUsers = await axios({
			...axiosParams,
			url: `/users?page=${page}&count=${count}`
		})

		const payload = {
			lastPage: data.total_pages === page ? true : false,
			nextPage: ++page,
			users: data.users
		}
		return payload
	}

	static fetchUserById = async (id: number) => {
		const { data }: iFetchUser = await axios({
			...axiosParams,
			url: `/users/${id}`
		})
		return data.user
	}

	static registerNewUser = async (user: FormData, token: string) => {
		try {
			await axios({
				...axiosParams,
				url: '/users',
				method: 'POST',
				data: user,
				headers: {
					'Token': token,
					'Content-type': 'multipart/form-data'
				}
			})
		} catch (err) {
			if (axios.isAxiosError(err)) throw new Error(err.response?.data.message)
			else if (typeof err === 'string') throw new Error(err)
			else if (err instanceof Error) throw new Error(err.message)
		}
	}

	static fetchToken = async () => {
		const { data }: iFetchToken = await axios({
			...axiosParams,
			url: `token`
		})
		return data.token
	}

	static fetchPositions = async () => {
		const { data }: iFetchPositions = await axios({
			...axiosParams,
			url: `/positions`
		})
		return data.positions
	}
}