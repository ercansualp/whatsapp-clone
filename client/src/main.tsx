import ReactDOM from 'react-dom/client'
import store from "~/store";
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import routes from "~/routes";
import "./assets/css/tailwind.css";
import Auth from "~/routes/Auth.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Auth>
            <RouterProvider router={routes} />
        </Auth>
    </Provider>
)
