import React, { useRef } from 'react'

import { iUser } from '../interfaces/app.interface'

import { MAX_CHAR } from '../utils/consts'
import { cutString } from '../utils/servises'

const defautlImage = require('../assets/images/photo-cover.svg')

import '@scss/blocs/UserCard'
import '@scss/blocs/Tooltip'
import '@scss-media/blocs/UserCard'
import '@scss-media/blocs/Tooltip'

export const UserCard: React.FC<{ user: iUser }> = ({ user }) => (
	<li className="cheerful__list__card card">
		<img
			src={user.photo ? user.photo : defautlImage}
			alt={user.name}
			className="card__img"
		/>
		<p className="card__title tooltip">
			<span className="tooltip__text">{user.name}</span>
			<span className="tooltip__tip">{user.name}</span>
		</p>
		<p className="card__primary tooltip">
			<span className="tooltip__text">{user.position}</span>
			<span className="tooltip__tip">{user.position}</span>
		</p>
		<p className="card__secondary tooltip">
			<span className="tooltip__text">{user.email}</span>
			<span className="tooltip__tip">{user.email}</span>
		</p>
		<p className="card__secondary tooltip">
			<span className="tooltip__text">{user.phone}</span>
			<span className="tooltip__tip">{user.phone}</span>
		</p>
	</li>
)