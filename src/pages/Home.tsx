import { Link } from 'react-router-dom';
import { UserCircle, Briefcase } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex-center animate-fade-in" style={{ minHeight: '80vh', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(to right, #4F46E5, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Smart Recruitment Portal
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Automated resume parsing and intelligent candidate matching.
        </p>
      </div>

      <div className="job-grid" style={{ width: '100%', maxWidth: '800px', gap: '2rem' }}>
        <Link to="/user" className="glass-panel card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <UserCircle size={64} style={{ color: 'var(--primary)', margin: '0 auto 1.5rem' }} />
          <h2>Applicant Portal</h2>
          <p>Browse jobs, upload your resume, and track your application status.</p>
        </Link>
        
        <Link to="/admin" className="glass-panel card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <Briefcase size={64} style={{ color: 'var(--secondary)', margin: '0 auto 1.5rem' }} />
          <h2>HR / Admin Dashboard</h2>
          <p>Create jobs, view applicants, and filter resumes based on smart match scores.</p>
        </Link>
      </div>
    </div>
  );
}
