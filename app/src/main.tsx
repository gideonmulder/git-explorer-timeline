import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//Disable strict mode to prevent double requests to the backend

ReactDOM.createRoot(document.getElementById('root')!).render(
    //<React.StrictMode>
        <App />
    //</React.StrictMode>,
)
