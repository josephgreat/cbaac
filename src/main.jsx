import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    default: {
      100: "#F1F0EF", // very light mist gray
      200: "#D9D7D5", // pale stone
      300: "#C1BFBC", // soft beige-gray
      400: "#A7A5A2", // warm fog gray
      500: "#353432", // base - rich dark charcoal-brown
      600: "#2F2E2C",
      700: "#2A2926",
      800: "#252422",
      900: "#1F1E1C",
    },
    primary: { 500: "#00A758" },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
