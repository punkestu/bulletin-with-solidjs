/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import Bulletins from './pages/Bulletins.tsx'
import {Route, Router, Routes} from "@solidjs/router";
import Bulletin from "./pages/Bulletin.tsx";

const root = document.getElementById('root')

render(() => (
    <Router>
        <Routes>
            <Route path="/" component={Bulletins}/>
            <Route path="/bulletin/:id" component={Bulletin}/>
        </Routes>
    </Router>
), root!)
