import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { Home } from './pages/Home'

const router=createBrowserRouter([
  {element:<Header/>,
    children:[
      {path:"/",element:<Home/>},
    ]
  }
])

function App() {
  return <RouterProvider/>
}

export default App
