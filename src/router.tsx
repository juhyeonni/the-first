import { Route, Routes } from 'react-router-dom';
import HomePage from '@pages/home';
import StoryPage from '@pages/story';
import LoginPage from '@pages/login';
import RegisterPage from '@pages/register';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/story/:id" element={<StoryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default Router;
