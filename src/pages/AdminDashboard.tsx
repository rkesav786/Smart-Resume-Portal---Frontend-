import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', role: '', skills: '', description: '' });

  const fetchJobs = () => {
    fetch('http://localhost/backend/api/jobs.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setJobs(data.data);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost/backend/api/jobs.php', {
      method: 'POST',
      body: JSON.stringify(newJob)
    }).then(() => {
      fetchJobs();
      setShowForm(false);
      setNewJob({ title: '', role: '', skills: '', description: '' });
    });
  };

  const updateStatus = (id: number, status: string) => {
    fetch('http://localhost/backend/api/jobs.php', {
      method: 'PUT',
      body: JSON.stringify({ id, status })
    }).then(() => {
      fetchJobs();
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <h2>HR Dashboard</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> Create Job Post
        </button>
      </div>

      {showForm && (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3>Create New Job Requirement</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input required className="form-control" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} placeholder="e.g. Senior Frontend Developer" />
            </div>
            <div className="form-group">
              <label className="form-label">Role Category</label>
              <input required className="form-control" value={newJob.role} onChange={e => setNewJob({...newJob, role: e.target.value})} placeholder="e.g. Engineering" />
            </div>
            <div className="form-group">
              <label className="form-label">Required Skills (Comma separated)</label>
              <input required className="form-control" value={newJob.skills} onChange={e => setNewJob({...newJob, skills: e.target.value})} placeholder="e.g. React, TypeScript, Node.js" />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea required className="form-control" value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} placeholder="Job description..." />
            </div>
            <button type="submit" className="btn btn-primary">Publish Job (Pending Approval)</button>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {jobs.filter(j => j.status !== 'deleted').map(job => (
          <div key={job.id} className="glass-panel flex-between" style={{ padding: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <Link to={`/admin/job/${job.id}`} style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {job.title}
                </Link>
                <span className={`badge ${job.status === 'approved' ? 'badge-active' : 'badge-pending'}`}>
                  {job.status}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>{job.role} • {job.skills}</p>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Link to={`/admin/job/${job.id}`} className="btn btn-secondary">
                <Users size={16} /> View Applicants
              </Link>
              
              {job.status === 'pending' && (
                <button className="btn btn-success" onClick={() => updateStatus(job.id, 'approved')}>
                  Approve
                </button>
              )}
              
              <button className="btn btn-danger" onClick={() => updateStatus(job.id, 'deleted')} title="Delete Job">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {jobs.filter(j => j.status !== 'deleted').length === 0 && <p>No jobs created yet.</p>}
      </div>
    </div>
  );
}
