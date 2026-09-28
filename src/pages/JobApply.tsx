import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UploadCloud, CheckCircle, ArrowLeft } from 'lucide-react';

export default function JobApply() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetch('http://localhost/backend/api/jobs.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const found = data.data.find((j: any) => j.id == id);
          setJob(found);
        }
      });
  }, [id]);

  if (!job) return <div>Loading Job Details...</div>;

  const handleApply = () => {
    if (file && name) {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('job_id', job.id);
      formData.append('name', name);

      fetch('http://localhost/backend/api/apply.php', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setApplied(true);
        }
      });
    } else {
      alert("Please provide your name and upload your resume!");
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/user" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        <ArrowLeft size={16} /> Back to Jobs
      </Link>
      
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>{job.title}</h1>
        <div className="badge badge-active" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>{job.role}</div>
        
        <h3 style={{ marginTop: '1.5rem' }}>Job Description</h3>
        <p>{job.description}</p>
        
        <h3 style={{ marginTop: '1.5rem' }}>Required Skills</h3>
        <p>{job.skills}</p>
      </div>

      {applied ? (
        <div className="glass-panel flex-center" style={{ padding: '3rem', flexDirection: 'column', gap: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--secondary)' }}>
          <CheckCircle size={64} style={{ color: 'var(--secondary)' }} />
          <h2>Application Submitted Successfully!</h2>
          <p>Your resume was successfully sent to the HR team. They will contact you if your profile is a match.</p>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Submit Your Application</h2>
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              className="form-control" 
              placeholder="Enter your name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Upload Resume (PDF/DOCX)</label>
            <label className="upload-area" style={{ display: 'block' }}>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                style={{ display: 'none' }}
                onChange={(e) => e.target.files && setFile(e.target.files[0])}
              />
              <UploadCloud className="upload-icon" />
              <h3>{file ? file.name : "Click or drag file to this area to upload"}</h3>
              <p style={{ marginTop: '0.5rem' }}>Strictly PDF or DOCX format</p>
            </label>
          </div>
          
          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} onClick={handleApply}>
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
}
