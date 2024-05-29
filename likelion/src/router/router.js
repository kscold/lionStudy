import { Outlet, createBrowserRouter } from "react-router-dom"

import { Suspense, lazy } from "react"

const Login = lazy(() => import("../page/Login"))
const Register = lazy(() => import("../page/Register"))

function Loading() {
  return <div>로딩중입니다.</div>
}

const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loading />}>
        <header>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "coral",
            }}
          >
            헤더
          </h1>
        </header>
        <body>
          <Outlet />
        </body>
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
    ],
  },
])

export default router
