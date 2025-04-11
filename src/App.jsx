import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import { RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import './index.css'
import { Auth } from './pages/Auth';
import { motion } from 'framer-motion';
import { Profile } from './pages/Profile';
import { Garage } from './pages/Garage';
import { AddEditPost } from './pages/AddEditPost';
import { PwReset } from './pages/PwReset';
import Schema from './components/Schema';
import { AllAds } from './pages/AllAds';



const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      { path: '/', element: <Home /> },
      { path: '*', element: <NotFound /> },
      { path: '/auth/in', element: <Auth /> },
      { path: '/auth/up', element: <Auth /> },
      { path: '/profile', element: <Profile /> },
      { path: '/garage', element: <Garage /> },
      { path: '/postcreate', element: <AddEditPost /> },
      {path:'/update/:id',element:<AddEditPost/>},
      { path: '/pwreset', element: <PwReset /> },
      { path: '/allads', element: <AllAds /> },
	  { path: '/schema', element: <Schema /> },
    ]
    
  }
],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    }
  }
)


function App() {
  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.5  }}
    whileInView={{ opacity: 1 , scale:1}}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
  }}
    
    
    >
<div className='bg-[#EFEFEF] '>
      <div className='max-w-6xl mx-auto'>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </div>
    </div>
    </motion.div>
    
  );
}

export default App
