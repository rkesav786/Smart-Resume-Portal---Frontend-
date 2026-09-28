import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Search } from 'lucide-react';

export default function JobCandidates() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [minScore, setMinScore] = useState(0);

  useEffect(() => {
    fetch('https://mano-project-backend.infinityfree.io/api/jobs.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          const found = data.data.find((j: any) => j.id == id);
          setJob(found);
        }
      });

    fetch(`https://mano-project-backend.infinityfree.io/api/resumes.php?job_id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setCandidates(data.data);
        }
      });
  }, [id]);

  if (!job) return <div>Loading Data...</div>;

  let filtered = candidates.filter(c => c.match_score >= minScore);

  const getScoreClass = (score: number) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-med';
    return 'score-low';
  };

  return (
    <div className="animate-fade-in">
      <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>
      
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h2>Applicants for: {job.title}</h2>
          <p>Review and filter automatically parsed resumes.</p>
        </div>
        
        <div className="glass-panel flex-center" style={{ padding: '0.5rem 1rem', gap: '1rem' }}>
          <Filter size={18} style={{ color: 'var(--text-muted)' }} />
          <select 
            className="form-control" 
            style={{ width: 'auto', padding: '0.5rem', border: 'none', background: 'transparent' }}
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
          >
            <option value={0} style={{ color: 'black' }}>All Candidates</option>
            <option value={50} style={{ color: 'black' }}>50%+ Match</option>
            <option value={80} style={{ color: 'black' }}>80%+ Match (Top Tier)</option>
            <option value={100} style={{ color: 'black' }}>100% Match</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(candidate => (
          <div key={candidate.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
            
            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div className={`match-score ${getScoreClass(candidate.match_score)}`}>
                {candidate.match_score}%
              </div>
              <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>Match Score</div>
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '0.25rem' }}>{candidate.name}</h3>
              <p style={{ margin: 0, fontSize: '0.875rem' }}><strong>Matched Skills:</strong> {candidate.skills_match}</p>
            </div>
            
            <div>
              <Link to={`/admin/resume/${candidate.id}`} className="btn btn-primary">
                View Full Resume
              </Link>
            </div>
          </div>
        ))}
        
        {filtered.length === 0 && (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <Search size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
            <h3>No candidates found</h3>
            <p>Try lowering your filter criteria, or wait for new applications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
