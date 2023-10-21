import './global.css'

import { createRoot } from 'react-dom/client'

import { MasterPage } from './pages/Master'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<MasterPage />)
