import { SnackbarProvider } from 'notistack';
import { Route, Routes } from 'react-router';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ProtectedRoute } from './route/ProtectedRoute';
function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App" style={{width: "100%", position: "absolute", backgroundColor: "#f3f6f9"}}>
        <Header/>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </SnackbarProvider>
  );
}

export default App;
