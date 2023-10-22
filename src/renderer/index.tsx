import './global.css'

import { createRoot } from 'react-dom/client'

import { MasterPage } from './pages/Master'
import { NavBar } from './pages/NavBar'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
    <>
        <NavBar />
        <MasterPage />
    </>
)
