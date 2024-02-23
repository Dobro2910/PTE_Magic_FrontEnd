import React, { Suspense } from "react";
import ReactDOM from "react-dom";
// core styles
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/scss/argon-dashboard-pro-react.scss?v1.0.0";
import "react-toastify/dist/ReactToastify.css";
import "assets/css/benit.css";

import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import initStore from "./config/store";
import setupAxiosInterceptors from "./config/axios-interceptor";
import { ToastContainer, toast } from "react-toastify";
import AppComponent from "./app";
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n";
import ReactGA from "react-ga";

setupAxiosInterceptors(() => console.log("error"));
const store = initStore();

const trackingId = "UA-157800418-1";
ReactGA.initialize(trackingId);

const render = (Component) =>
  ReactDOM.hydrate(
    <>
      <I18nextProvider i18n={i18next}>
        <ToastContainer
          position={toast.POSITION.TOP_RIGHT}
          className="toastify-container"
          toastClassName="toastify-toast"
        />
        <Suspense fallback={null}>
          <AppContainer>
            <Provider store={store}>
              <Component />
            </Provider>
          </AppContainer>
        </Suspense>
      </I18nextProvider>
    </>,
    document.getElementById("root")
  );

render(AppComponent);
