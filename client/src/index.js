import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './pages/App';
import {persistor, store} from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<title>LoveTrack</title> 
			<link rel='manifest' href="/manifest.json" />
			<meta name="description" content="Pain" />
			<App />
		</PersistGate>
	</Provider>

);

