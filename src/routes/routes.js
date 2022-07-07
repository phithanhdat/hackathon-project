import { lazy } from 'react'

export const routeConfig = [
  {
    id: 'HomePage',
    path: '/',
    component: lazy(() => import('../views/pages/HomePage/HomePage')),
    isProtected: false,
  },
  {
    id: 'GamePage',
    path: '/game',
    component: lazy(() => import('../views/pages/GamePage/GamePage')),
    isProtected: true,
  },
  {
    id: 'RoundPage',
    path: '/game/round/:roundId',
    component: lazy(() => import('../views/pages/GamePage/Round/Round')),
    isProtected: true,
  },
  // {
  //   id: 'LoginPage',
  //   path: '/login',
  //   component: lazy(() => import('../views/pages/LoginPage/LoginPage')),
  //   isProtected: false,
  // },
]
