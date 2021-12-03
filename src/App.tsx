import React, { useCallback, lazy, Suspense, useEffect } from 'react'

import { Header } from './components/Header'
import { HeaderMenuSidebar } from './components/HeaderMenuSidebar'
import { Banner } from './components/Banner'
import { Acquainted } from './components/Acquainted'
import { Cheerful } from './components/Cheerful'
import { Footer } from './components/Footer'
import { Preloader } from './components/blocs/Preloader'

import { useAppDispatch, useAppSelector } from './redux/hooks'
import { getPositions, getToken, selectAppInfo } from './redux/reducers/appSlice'

import './assets/scss/App.scss'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { hideScroll, showSideMenu } = useAppSelector(selectAppInfo)
  
  useEffect(()=> {
    // fetching token and positions respectively
		dispatch(getToken())
		dispatch(getPositions())
  }, [dispatch])

  // disable | enable scrolling
  const toggleScroll = useCallback((hide: boolean): void => {
    if (hide) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
  }, [])
  toggleScroll(hideScroll)

  const Register = lazy(() => import('./components/Register'))
  
  return (
    <>
      <Header />
      {showSideMenu && <HeaderMenuSidebar />}
      <Banner />
      <Acquainted />
      <Cheerful />
      <Suspense fallback={<Preloader />}>
        <Register />
      </Suspense>
      <Footer />
    </>
  )
}

