import {createBrowserRouter} from "react-router-dom"
import AllNotes from "../features/pages/AllNotes"
import NewNotes from "../features/pages/NewNotes"

export const router= new createBrowserRouter([
    {
        path:"/",
        element:<AllNotes/>
    },
    {
        path:"/newNote",
        element:<NewNotes/>
    },
    {
        path:"*",
        element:<AllNotes/>
    }
]);