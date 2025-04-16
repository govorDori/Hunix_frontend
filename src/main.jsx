import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './utility/UserContext.jsx'
import { ConfirmProvider } from 'material-ui-confirm'

createRoot(document.getElementById('root')).render(

	<ConfirmProvider>
		<UserProvider>

			<App />
		</UserProvider>

	</ConfirmProvider>

)
