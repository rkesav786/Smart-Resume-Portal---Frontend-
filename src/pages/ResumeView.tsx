import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PhoneCall, Mail, FileText, CheckCircle, Download } from 'lucide-react';

export default function ResumeView() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState<any>(null);
  const [job, setJob] = useState<any>(null);
  
  useEffect(() => {
    fetch(`https://mano-project-backend.infinityfree.io/api/resumes.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setCandidate(data.data);
          fetch('https://mano-project-backend.infinityfree.io/api/jobs.php')
            .then(res => res.json())
            .then(jobData => {
              if (jobData.status === 'success') {
                const foundJob = jobData.data.find((j: any) => j.id == data.data.job_id);
                setJob(foundJob);
              }
            });
        }
      });
  }, [id]);
  
  if (!candidate) return <div>Loading Profile...</div>;
  
  const getScoreClass = (score: number) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-med';
    return 'score-low';
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Link to={`/admin/job/${candidate.job_id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        <ArrowLeft size={16} /> Back to Applicant List
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        
        {/* Left Col - Resume Details */}
        <div>
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h1 style={{ marginBottom: '0.5rem' }}>{candidate.name}</h1>
            <p style={{ color: 'var(--primary)' }}>Applied for: {job ? job.title : 'Loading...'}</p>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
              <button className="btn btn-primary" onClick={() => alert('Initiating call...')}>
                <PhoneCall size={18} /> Call Candidate
              </button>
              <button className="btn btn-secondary" onClick={() => alert('Opening email client...')}>
                <Mail size={18} /> Send Invite
              </button>
              
              {candidate.resume_url && (
                <a href={candidate.resume_url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ marginLeft: 'auto', borderColor: 'var(--primary)', color: 'var(--text-main)' }}>
                  <Download size={18} style={{ color: 'var(--primary)' }} /> View Original Resume
                </a>
              )}
            </div>
            
            <h3 style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} /> Parsed Resume Text
            </h3>
            <div style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '8px', marginTop: '1rem', whiteSpace: 'pre-line', border: '1px solid var(--border)' }}>
              {candidate.resume_text}
            </div>
          </div>
        </div>

        {/* Right Col - Score Details */}
        <div>
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Smart Match Analysis</h3>
            
            <div className={`match-score ${getScoreClass(candidate.match_score)}`} style={{ fontSize: '3rem', padding: '1rem 2rem', marginBottom: '1rem' }}>
              {candidate.match_score}%
            </div>
            <p style={{ fontWeight: 500 }}>Overall Match</p>
            
            <div style={{ textAlign: 'left', marginTop: '2rem' }}>
              <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Matched Keywords</h4>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {candidate.skills_match && candidate.skills_match.split(',').map((skill: string, i: number) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(16, 185, 129, 0.1)', color: '#34D399', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                    <CheckCircle size={12} /> {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
            
            {candidate.match_score >= 80 && (
              <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid #34D399' }}>
                <p style={{ margin: 0, color: '#34D399', fontWeight: 500, fontSize: '0.875rem' }}>Highly Recommended for Interview</p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
