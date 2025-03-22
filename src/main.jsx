import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./app/storage.js";
import { CartProvider } from "./context/CartContext";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <ChakraProvider>
        <Provider store={store}>
          <CartProvider>
            <App />
          </CartProvider>
        </Provider>
      </ChakraProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
