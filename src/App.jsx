import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Spin } from 'antd'
import { routeConfig } from './routes/routes'
import PrivateRoute from './routes/PrivateRoute'
import NotFound from './views/pages/NotFound/NotFound'

function App() {
  return (
    <Suspense fallback={<Spin size="large" spinning={true} />}>
      <Routes>
        {routeConfig.map((route) => (
          <Route
            key={route.id}
            path={route.path}
            element={
              route.isProtected ? (
                <PrivateRoute>
                  <route.component />
                </PrivateRoute>
              ) : (
                <route.component />
              )
            }
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
