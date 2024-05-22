import { Outlet, createBrowserRouter } from "react-router-dom"

import { Suspense, lazy } from "react"

const Test = lazy(() => import("../page/Test"))

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
        path: "test",
        element: (
          <Suspense fallback={<Loading />}>
            <Test />
          </Suspense>
        ),
      },
    ],
  },
])

export default router
