import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { AuthCallback } from './components/AuthCallback';
import { RecentFiles } from './components/RecentFiles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/files/recent" element={<RecentFiles />} />
      </Routes>
    </Router>
  )
}

export default App
