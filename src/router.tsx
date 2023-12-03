import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@pages/home';
import StoryPage from '@pages/story';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/story/:id" element={<StoryPage />} />
    </Routes>
  );
}

export default Router;
