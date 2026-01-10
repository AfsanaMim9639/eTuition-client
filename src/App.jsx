import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import router from './routes/Routes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#121212',
              color: '#fff',
              border: '2px solid #FF10F0',
              boxShadow: '0 0 20px rgba(255, 16, 240, 0.3)',
            },
            success: {
              iconTheme: {
                primary: '#39FF14',
                secondary: '#121212',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF006E',
                secondary: '#121212',
              },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;