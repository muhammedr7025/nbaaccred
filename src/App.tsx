import { RouterProvider, createBrowserRouter } from "react-router-dom"
import routes from "./routes"
import { AuthProvider } from "./components/AuthContext"
import { Analytics } from "@vercel/analytics/react"
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={createBrowserRouter(routes)} />
      <Analytics/>
    </AuthProvider>
  )
}