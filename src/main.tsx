import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './providers/ThemeProvider';
import AuthenticationProvider from './providers/AuthenticationProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthenticationProvider>
    <ThemeProvider>
      <App></App>
    </ThemeProvider>
  </AuthenticationProvider>
)
