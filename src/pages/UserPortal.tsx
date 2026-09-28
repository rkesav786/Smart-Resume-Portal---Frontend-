import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ChevronRight } from 'lucide-react';

export default function UserPortal() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://mano-project-backend.infinityfree.io/api/jobs.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          // Only show approved jobs to users
          setJobs(data.data.filter((j: any) => j.status === 'approved'));
        }
      });
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2>Available Opportunities</h2>
      </div>
      
      <div className="job-grid">
        {jobs.map(job => (
          <div key={job.id} className="glass-panel card">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div style={{ padding: '0.5rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '8px' }}>
                <Briefcase size={24} style={{ color: 'var(--primary)' }} />
              </div>
              <span className="badge badge-active">Hiring</span>
            </div>
            <h3 className="card-title">{job.title}</h3>
            <p style={{ fontSize: '0.875rem' }}>{job.role}</p>
            <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
              <strong>Required Skills:</strong> <br />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{job.skills}</span>
            </div>
            <div className="card-footer">
              <Link to={`/user/job/${job.id}`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                View & Apply <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        ))}
        {jobs.length === 0 && <p>No active jobs available right now.</p>}
      </div>
    </div>
  );
}
