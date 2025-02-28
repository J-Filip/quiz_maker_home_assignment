import '../index.less';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import { CreatePage } from './routes/CreatePage';
import { DetailsPage } from './routes/DetailsPage';
import NotFoundPage from './routes/NotFoundPage';
import { PlayPage } from './routes/PlayPage';
import { QuizListPage } from './routes/QuizListPage';
import { ErrorPage } from './routes/ErrorPage';
import { HomePage } from './routes/HomePage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="/quizzes" element={<QuizListPage />} />
        <Route path="/quizzes/create" element={<CreatePage />} />
        <Route path="/quiz/:quizId/play" element={<PlayPage />} />
        <Route path="/quiz/:quizId/details" element={<DetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
