import React, { useCallback, lazy, Suspense } from 'react'

import '@scss/App'

import { Header } from './components/Header'
import { Banner } from './components/Banner'
import { Preloader } from './blocs/Preloader'

import { useAppSelector } from './redux/hooks'
import { selectAppInfo } from './redux/reducers/appSlice'

export const App: React.FC = () => {
  const { hideScroll, showSideMenu } = useAppSelector(selectAppInfo)

  // disable | enable scrolling
  const toggleScroll = useCallback((hide: boolean): void => {
    if (hide) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
  }, [])
  toggleScroll(hideScroll)

  // ::: [START:] Lazy loading
  // const Header = lazy(() => import('./components/Header'))
  // const Banner = lazy(() => import('./components/Banner'))
  const HeaderMenuSidebar = lazy(() => import('./components/HeaderMenuSidebar'))
  const Acquainted = lazy(() => import('./components/Acquainted'))
  const Cheerful = lazy(() => import('./components/Cheerful'))
  const Register = lazy(() => import('./components/Register'))
  const Footer = lazy(() => import('./components/Footer'))
  // ::: [END:] Lazy loading

  return (
    <>
      <Header />
      <Banner />
      <Suspense fallback={<Preloader />}>
        {showSideMenu && <HeaderMenuSidebar />}
        <Acquainted />
        <Cheerful />
        <Register />
        <Footer />
      </Suspense>
    </>
  )
}

