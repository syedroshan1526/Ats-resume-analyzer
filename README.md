# ATS Resume Analyzer

An AI-powered resume parsing and candidate management system that helps recruiters efficiently screen and evaluate resumes using Natural Language Processing (NLP).

## Features

- **Resume Parsing**: Extract structured data from PDF and DOCX resumes
- **NLP Extraction**: Named Entity Recognition for names, skills, experience, and education
- **Candidate Management**: CRUD operations for candidate profiles
- **Job Posting Management**: Create and manage job listings
- **Analytics Dashboard**: Visualize candidate pipeline and metrics
- **Skill Matching**: Compare candidate skills against job requirements
- **Settings Configuration**: Customize thresholds and system behavior

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Python, FastAPI, spaCy (NLP), pdfminer.six, python-docx
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Containerization**: Docker, Docker Compose

## Architecture

The application follows a modern microservices architecture:

- **Frontend Service**: React SPA with responsive UI
- **Backend Service**: FastAPI REST API with NLP processing
- **Database Service**: PostgreSQL for data persistence

## Prerequisites

- Docker
- Docker Compose

## Installation & Setup

### Option 1: Quick Start with Docker Compose

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ats-resume-analyzer.git
   cd ats-resume-analyzer
   ```

2. Create a `.env` file with your configuration:
   ```bash
   SECRET_KEY=your-super-secret-key-change-in-production
   DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ats_db
   SKILL_MATCH_THRESHOLD=70
   DEMO_MODE=false
   ```

3. Build and start the services:
   ```bash
   docker-compose up -d
   ```

4. Access the application:
   - Frontend: `http://localhost`
   - Backend API: `http://localhost/api`

### Option 2: Development Setup

#### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

#### Backend Development
```bash
cd backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn app.main:app --reload
```

## Environment Variables

- `SECRET_KEY`: Secret key for JWT tokens (change in production!)
- `DATABASE_URL`: PostgreSQL connection string
- `SKILL_MATCH_THRESHOLD`: Minimum percentage for skill matching
- `DEMO_MODE`: Enable/disable demo mode (true/false)
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts

## API Endpoints

### Resume Parsing
- `POST /api/parse-resume` - Parse resume file and extract information

### Candidates
- `GET /api/candidates` - Get all candidates
- `POST /api/candidates` - Create a new candidate
- `PUT /api/candidates/{id}` - Update a candidate
- `DELETE /api/candidates/{id}` - Delete a candidate

### Job Postings
- `GET /api/job-postings` - Get all job postings
- `POST /api/job-postings` - Create a new job posting
- `PUT /api/job-postings/{id}` - Update a job posting
- `DELETE /api/job-postings/{id}` - Delete a job posting

### Analytics
- `GET /api/analytics` - Get analytics data

### Settings
- `GET /api/settings` - Get system settings
- `POST /api/settings` - Update system settings

## Deployment

The application is designed for easy deployment to various platforms:

### Cloud Platforms
- Render
- Railway
- Heroku
- AWS ECS
- Google Cloud Run

### Self-Hosted
- Any VPS with Docker support (DigitalOcean, Linode, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository.