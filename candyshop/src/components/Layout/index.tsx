import React from "react";
import Header from "../Header";
import { Provider } from "react-redux";
import { store, persistor } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Provider store={store}>
            <ToastContainer closeOnClick />
            <PersistGate loading={null} persistor={persistor}>
                <Header />
                <main>{children}</main>
            </PersistGate>
        </Provider>
    );
}

export default Layout;
