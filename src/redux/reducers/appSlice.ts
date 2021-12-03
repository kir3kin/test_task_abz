import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'
import { iGetUsers, iAppState, iUser } from '../../interfaces/app.interface'
import { appAPI } from '../api/app.api'

// redux default state values
const initialState: iAppState = {
  users: {
    status: 'idle',
    data: []
  },
  positions: {
    status: 'idle',
    data: []
  },
  registerUser: 'idle',
  page: 1,// default page for downloading users
  count: 9,// default number of downloading users
  lastPage: false,// show or hide button "show more" in Cherrful users
  showModal: false,// show modal window ?
  showSideMenu: false,// show Side Menu ?
  token: {
    data: '',
    status: 'idle',
  },
  error: undefined
}


// ::: [START:] redux async action ::: \\
// fetch users for the first time, or reset them
export const getUsers = createAsyncThunk<
  iGetUsers, boolean, { state: RootState }
>(
  'users/fetchUsers',// action's name
  async (reset, { getState }) => {
    let { page, count } = getState().app
    if (reset) page = 1
    return await appAPI.fetchUsers(page, count)
  }
)

// fetch next users WITHOUT updataing state.users.status
// which re-renders all users in Cheerful.tsx
export const getNextUsers = createAsyncThunk<
void, undefined, { state: RootState, dispatch: AppDispatch }
>(
  'users/fetchNextUsers',
  async (_, { getState, dispatch }) => {
    const { page, count } = getState().app
    const data = await appAPI.fetchUsers(page, count)
    dispatch(addUsers(data.users))
    dispatch(updateAppInfo(data))
  }
)

// register user
export const registerUser = createAsyncThunk<
  void, FormData, { state: RootState, dispatch: AppDispatch }
>(
  'users/registerUser',
  async( user, { getState, dispatch } ) => {
    const { data: token } = getState().app.token
    await appAPI.registerNewUser(user, token)
    // token is being refreshed
    dispatch(getToken())
    // refreshing earlier fetched users
    dispatch(getUsers(true))
    // show Modal window
    dispatch(toggleModal())
  }
)

// fetch user positions
export const getPositions = createAsyncThunk(
  'positions/getPositions',
  async () => await appAPI.fetchPositions()
)

// fetch token
export const getToken = createAsyncThunk(
  'user/getToken',
  async () => await appAPI.fetchToken()
)
// ::: [END:] redux async action ::: \\


// !!! Mutations are acceptable in @redux/toolkit slice
// @redux/toolkit has 3 result types for async funcitons result ("extraReducers"):
//  1) pending (connecting to server)
//  2) fulfilled (success) ~ Promise.resolve
//  3) rejected (error) ~ Promise.reject
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {// redux sync actions
    setCount: (state, { payload }: PayloadAction<number>) => {
      state.count = payload
    },
    toggleModal: (state) => {
      state.showModal = !state.showModal
    },
    toggleSideMenu: (state) => {
      state.showSideMenu = !state.showSideMenu
    },
    throwError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },
    addUsers: (state, { payload }: PayloadAction<iUser[]>) => {
      state.users.data = [ ...state.users.data, ...payload ]
    },
    updateAppInfo: (state, { payload }: PayloadAction<iGetUsers>) => {
      state.lastPage = payload.lastPage
      state.page = payload.nextPage
    }
  },
  extraReducers: (builder) => {//redux async actions (result)
    builder
      .addCase(getUsers.pending, (state) => {
        state.users.status = 'loading'
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.users.status = 'idle'
        state.users.data = payload.users
        state.lastPage = payload.lastPage
        state.page = payload.nextPage
      })
      .addCase(getUsers.rejected, (state, { error }) => {
        state.users.status = 'failed'
        state.error = error.message
      })
      .addCase(getPositions.pending, (state) => { state.positions.status = 'loading' })
      .addCase(getPositions.fulfilled, (state, { payload }) => {
        state.positions.status = 'idle'
        state.positions.data = payload
      })
      .addCase(getPositions.rejected, (state, { error }) => {
        state.error = error.message
        state.positions.status = 'failed'
      })
      .addCase(getToken.pending, (state) => {
        state.token.status = 'loading'
      })
      .addCase(getToken.fulfilled, (state, { payload }) => {
        state.token.status = 'idle'
        state.token.data = payload
      })
      .addCase(getToken.rejected, (state, { error }) => {
        state.token.status = 'failed'
        state.error = error.message
      })
      .addCase(registerUser.pending, (state) => {
        state.registerUser = 'loading'
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerUser = 'idle'
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.error = error.message
        state.showModal = true
        state.registerUser = 'failed'
      })
  }
})

// redux sync actions
export const { setCount, toggleModal, toggleSideMenu, throwError, addUsers, updateAppInfo } = appSlice.actions

// redux reducer
export default appSlice.reducer

// ::: [START:] redux selectors ::: \\
// users
export const selectUsersInfo = (state: RootState) => ({
  users: sortUsers(state.app.users.data),
  status: state.app.users.status
})

// positions
export const selectPositionsInfo = (state: RootState) => ({
  positions: state.app.positions.data,
  status: state.app.positions.status,
})

// some additional app settings
export const selectAppInfo = (state: RootState) => ({
  lastPage: state.app.lastPage,
  showModal: state.app.showModal,
  showSideMenu: state.app.showSideMenu,
  hideScroll: (state.app.showModal || state.app.showSideMenu)
})

// JSON Web Token data
export const selectTokenData = (state: RootState) => ({
  token: state.app.token
})

// error message
export const selectError = (state: RootState) => ({
  error: state.app.error
})
// ::: [END:] redux selectors ::: \\



// ::: [START:] Additional funcitons ::: \\
// sort time_registration function
const sortUsers = (users: iUser[]): iUser[] => {
  const newOrder = users.slice().sort((a,b) => {
    // return a.registration_timestamp - b.registration_timestamp
    return b.registration_timestamp - a.registration_timestamp
  })
  return newOrder
}
// ::: [END:] Additional funcitons ::: \\
