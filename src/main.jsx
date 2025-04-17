import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './utility/UserContext.jsx'
import { ConfirmProvider } from 'material-ui-confirm'
import { BrandProvider } from './utility/BrandContext.jsx'

createRoot(document.getElementById('root')).render(
<BrandProvider>
	<ConfirmProvider>
		<UserProvider>
			<App />
		</UserProvider>
	</ConfirmProvider>
</BrandProvider>
)
