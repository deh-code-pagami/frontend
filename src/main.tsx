import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProvider from "./providers/ThemeProvider";
import AuthenticationProvider from "./providers/AuthenticationProvider";
import GroupProvider from "./providers/GroupProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthenticationProvider>
    <ThemeProvider>
      <GroupProvider>
        <App></App>
      </GroupProvider>
    </ThemeProvider>
  </AuthenticationProvider>,
);
