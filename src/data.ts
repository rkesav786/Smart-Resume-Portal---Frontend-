export const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    role: 'Frontend Developer',
    skills: 'React, TypeScript, CSS, Vite',
    status: 'approved',
    description: 'We are looking for a Senior Frontend Engineer to build modern, responsive web interfaces.'
  },
  {
    id: 2,
    title: 'Backend PHP Developer',
    role: 'Backend Developer',
    skills: 'PHP, Laravel, MySQL, REST APIs',
    status: 'pending',
    description: 'Join our backend team to build scalable PHP applications.'
  }
];

export const mockCandidates = [
  {
    id: 101,
    jobId: 1,
    name: 'Alice Johnson',
    matchScore: 92,
    status: 'screened',
    skillsMatch: 'React, TypeScript, CSS',
    resumeText: 'Experienced frontend developer with 5 years in React and TypeScript. Built multiple high-performance web applications.'
  },
  {
    id: 102,
    jobId: 1,
    name: 'Bob Smith',
    matchScore: 78,
    status: 'applied',
    skillsMatch: 'React, JavaScript',
    resumeText: 'Web developer familiar with React and basic JavaScript. Currently learning TypeScript.'
  },
  {
    id: 103,
    jobId: 1,
    name: 'Charlie Davis',
    matchScore: 45,
    status: 'applied',
    skillsMatch: 'HTML, CSS',
    resumeText: 'Entry level web designer with knowledge of HTML and CSS. No React experience.'
  }
];
