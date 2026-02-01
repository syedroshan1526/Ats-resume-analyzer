// Mock backend server to handle API requests for testing
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 8000;

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for testing
  credentials: true,
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Add logging middleware to see incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Mock data storage
let candidates = [];
let jobPostings = [];
let settings = {
  skill_match_threshold: 70,
  demo_mode: false,
  custom_skills: [],
  email_notifications: true,
  auto_parse: true
};

// API Routes

// Parse resume endpoint
app.post('/api/parse-resume', (req, res) => {
  console.log('Parse resume endpoint hit');
  
  // Use multer middleware directly in this route to handle multipart form data
  upload.single('file')(req, res, function(err) {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: 'File upload error', details: err.message });
    }
    
    console.log('Received file:', req.file); // Log received file
    
    // Check if file was received
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Simulate resume parsing with some delay to mimic real processing
    setTimeout(() => {
      const mockParsedData = {
        name: "Syed Roshan Munazzir", // Using name from sample resume
        email: "syedroshanmunazzir@gmail.com",
        phone: "+91-2333890253",
        linkedin: "",
        github: "",
        skills: ["Python", "Machine Learning", "NLP", "CNN", "TensorFlow", "Keras", "MySQL", "MongoDB", "HTML", "CSS", "JavaScript", "Flask"],
        experience: [
          {
            title: "AI & Machine Learning Student",
            company: "Nawab Shah Alam Khan College",
            duration: "2023 - 2027",
            description: "Artificial Intelligence & Machine Learning Engineering student with projects in Fake News Detection, Digit Recognition, and Recommendation Systems"
          }
        ],
        education: [
          {
            degree: "Bachelor of Engineering - AI & Machine Learning",
            institution: "Nawab Shah Alam Khan College of Engineering and Technology, Hyderabad",
            year: "2023 - 2027"
          }
        ],
        certifications: [
          "Machine Learning with Python - IBM",
          "JavaScript, CSS, HTML - IEEE",
          "Python for Data Science - NPTEL"
        ],
        summary: "Dedicated AI & ML student seeking internship opportunities to apply technical skills in machine learning, data science, and software development.",
        raw_text: "SYED ROSHAN MUNAZZIR - Dedicated and curious 3rd-year B.E student in Artificial Intelligence & Machine Learning seeking an internship opportunity to apply and grow technical skills in machine learning, data science, and software development.",
        status: "success"
      };

      console.log('Sending parsed data response');
      res.json(mockParsedData);
    }, 1000); // Simulate processing time
  });
});

// Candidates endpoints
app.get('/api/candidates', (req, res) => {
  res.json(candidates);
});

app.post('/api/candidates', (req, res) => {
  const newCandidate = {
    id: candidates.length + 1,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  candidates.push(newCandidate);
  res.status(201).json(newCandidate);
});

app.put('/api/candidates/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = candidates.findIndex(c => c.id === id);
  if (index !== -1) {
    candidates[index] = { ...candidates[index], ...req.body, updated_at: new Date().toISOString() };
    res.json(candidates[index]);
  } else {
    res.status(404).json({ error: 'Candidate not found' });
  }
});

app.delete('/api/candidates/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = candidates.findIndex(c => c.id === id);
  if (index !== -1) {
    candidates.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Candidate not found' });
  }
});

// Job postings endpoints
app.get('/api/job-postings', (req, res) => {
  res.json(jobPostings);
});

app.post('/api/job-postings', (req, res) => {
  const newJob = {
    id: jobPostings.length + 1,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  jobPostings.push(newJob);
  res.status(201).json(newJob);
});

app.put('/api/job-postings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = jobPostings.findIndex(j => j.id === id);
  if (index !== -1) {
    jobPostings[index] = { ...jobPostings[index], ...req.body, updated_at: new Date().toISOString() };
    res.json(jobPostings[index]);
  } else {
    res.status(404).json({ error: 'Job posting not found' });
  }
});

app.delete('/api/job-postings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = jobPostings.findIndex(j => j.id === id);
  if (index !== -1) {
    jobPostings.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Job posting not found' });
  }
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  const analytics = {
    total_candidates: candidates.length,
    total_jobs: jobPostings.filter(job => job.status === 'open').length,
    candidates_by_status: {
      new: candidates.filter(c => c.status === 'new').length,
      screening: candidates.filter(c => c.status === 'screening').length,
      interview: candidates.filter(c => c.status === 'interview').length,
      offer: candidates.filter(c => c.status === 'offer').length,
      hired: candidates.filter(c => c.status === 'hired').length,
      rejected: candidates.filter(c => c.status === 'rejected').length
    },
    candidates_by_month: [], // Simplified for mock
    top_skills: [], // Would compute from all candidates' skills
    avg_match_score: candidates.length > 0 
      ? candidates.reduce((sum, c) => sum + (c.match_score || 0), 0) / candidates.length 
      : 0,
    hiring_funnel: [
      { stage: 'Applied', count: candidates.length },
      { stage: 'Screening', count: candidates.filter(c => ['screening', 'interview', 'offer', 'hired'].includes(c.status)).length },
      { stage: 'Interview', count: candidates.filter(c => ['interview', 'offer', 'hired'].includes(c.status)).length },
      { stage: 'Offer', count: candidates.filter(c => ['offer', 'hired'].includes(c.status)).length },
      { stage: 'Hired', count: candidates.filter(c => c.status === 'hired').length },
    ]
  };

  // Calculate top skills from all candidates
  const skillCount = {};
  candidates.forEach(candidate => {
    if (candidate.skills) {
      candidate.skills.forEach(skill => {
        skillCount[skill] = (skillCount[skill] || 0) + 1;
      });
    }
  });
  
  analytics.top_skills = Object.entries(skillCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));

  // Generate mock monthly data for the last 6 months
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  analytics.candidates_by_month = [];
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const monthName = months[monthIndex];
    // Count candidates created in this month
    const candidatesInMonth = candidates.filter(candidate => {
      const candidateDate = new Date(candidate.created_at);
      return candidateDate.getMonth() === monthIndex;
    }).length;
    analytics.candidates_by_month.push({ month: monthName, count: candidatesInMonth });
  }

  res.json(analytics);
});

// Settings endpoints
app.get('/api/settings', (req, res) => {
  res.json(settings);
});

app.post('/api/settings', (req, res) => {
  settings = { ...settings, ...req.body };
  res.json(settings);
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'healthy', message: 'Mock ATS API is running' });
});

app.listen(PORT, () => {
  console.log(`Mock backend server running on http://localhost:${PORT}`);
});