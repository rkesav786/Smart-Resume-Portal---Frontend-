import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import UserPortal from './pages/UserPortal';
import JobApply from './pages/JobApply';
import AdminDashboard from './pages/AdminDashboard';
import JobCandidates from './pages/JobCandidates';
import ResumeView from './pages/ResumeView';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/user" className="nav-brand">SmartRecruit</Link>
        <div className="nav-links">
          {/* Admin and Home links removed for normal users */}
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/user" />} />
          <Route path="/user" element={<UserPortal />} />
          <Route path="/user/job/:id" element={<JobApply />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/job/:id" element={<JobCandidates />} />
          <Route path="/admin/resume/:id" element={<ResumeView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
