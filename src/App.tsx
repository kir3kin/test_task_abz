import React, { useCallback, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Header } from './components/Header'
import { HeaderMenuSidebar } from './components/HeaderMenuSidebar'
import { Banner } from './components/Banner'
import { Acquainted } from './components/Acquainted'
import { Cheerful } from './components/Cheerful'
import { Register } from './components/Register'
import { Footer } from './components/Footer'

import { useAppDispatch, useAppSelector } from './redux/hooks'
import { getPositions, getUsers, getToken, selectAppInfo, setCount } from './redux/reducers/appSlice'

import { countUsers, WITDH_MOBILE, WITDH_TABLET } from './utils/consts'
import './assets/scss/App.scss'


export const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { hideScroll, showSideMenu } = useAppSelector(selectAppInfo)

 // ::: [START:] screen size check ::: \\
  const tablet = useMediaQuery({ query: WITDH_TABLET})
  const mobile = useMediaQuery({ query: WITDH_MOBILE})

  // ! use Memo
  const count = tablet ? ( mobile ? (countUsers.mobile) : (countUsers.tablet) ) : (countUsers.desktop)
 // ::: [END:] screen size check ::: \\


  useEffect(()=> {
    // set number of downloading users, before fetching them
    dispatch(setCount(count))

    // fetching token, users and positions respectively
    dispatch(getToken())
    dispatch(getUsers(false))
    dispatch(getPositions())
  }, [dispatch])

  // disable | enable scrolling
  const toggleScroll = useCallback((hide: boolean): void => {
    if (hide) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
  }, [])
  toggleScroll(hideScroll)

  return (
    <>
      <Header />
      {showSideMenu && <HeaderMenuSidebar />}
      <Banner />
      <Acquainted />
      <Cheerful />
      <Register />
      <Footer />
    </>
  )
}

