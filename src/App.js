import React from "react";
import Router from "./router/index";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "bootstrap/dist/css/bootstrap.min.css";

// import './App.css';

function App() {
  return (
    <div>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} />
        <Router />
      </Provider>
    </div>
  );
}

export default App;
