import { createBrowserRouter, RouterProvider } from "react-router";
import  ROUTES  from "./routes";
const router = createBrowserRouter(ROUTES);


function App() {
 
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
