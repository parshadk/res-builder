<img width="1870" height="837" alt="image" src="https://github.com/user-attachments/assets/46ed0c05-683c-405e-86e8-06761ea41afe" />
<img width="1842" height="836" alt="image" src="https://github.com/user-attachments/assets/705148a2-d3ed-41d2-95ab-643727283ebc" />

# Resume Builder

A modern, feature-rich resume builder application inspired by Enhancv and FlowCV. Build, customize, and share your professional resume with an intuitive on-canvas editing experience.

## Features

### Core Features
- **On-Canvas Editing** - Edit resume sections directly within the resume preview
- **Multiple Templates** - Switch between Modern and Minimal professional templates
- **Design Customization** - Customize colors, fonts, and styling in real-time
- **Drag-and-Drop Reordering** - Easily reorder resume sections and items
- **Undo/Redo Stack** - Full undo/redo support with keyboard shortcuts (Ctrl+Z / Ctrl+Y)
- **PDF Export** - Download your resume as a text-based PDF file
- **Public Sharing** - Generate shareable links to showcase your resume online
- **Local Storage** - Automatic persistence of your resume data

### Resume Sections
- Personal Information (name, email, phone, location, professional summary)
- Work Experience (company, position, duration, description)
- Education (school, degree, field, graduation date)
- Skills (categorized skill listing)
- Projects (portfolio projects with descriptions and links)

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **React** - UI library
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **html2pdf** - PDF generation

### Backend
- **Next.js API Routes** - Serverless backend
- **Prisma** - ORM for database operations
- **PostgreSQL** - Database (optional)

### Development Tools
- **ESLint** - Code linting
- **Tailwind CSS** - Styling

## Installation

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- PostgreSQL (optional, for database support)

### Setup Steps

1. **Clone or Download the Project**
   \`\`\`bash
   git clone <repository-url>
   cd resume-builder
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set Up Environment Variables (Optional)**
   
   Create a `.env.local` file for database support:
   \`\`\`env
   DATABASE_URL="postgresql://user:password@localhost:5432/resume_builder"
   \`\`\`

4. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open in Browser**
   
   Navigate to `http://localhost:3000`

## Usage Guide

### Creating a Resume

1. **Fill Personal Information**
   - Click on the personal info section
   - Enter your name, email, phone, and location
   - Add a professional summary

2. **Add Work Experience**
   - Click "Add Experience"
   - Fill in company, position, dates, and description
   - Drag to reorder experiences

3. **Add Education**
   - Click "Add Education"
   - Enter school, degree, field, and graduation date
   - Reorder as needed

4. **Add Skills**
   - Click "Add Skill"
   - Enter skill name and proficiency level
   - Organize your skills

5. **Add Projects**
   - Click "Add Project"
   - Include project name, description, and links
   - Showcase your portfolio

### Customizing Design

1. **Change Colors**
   - Open the Design panel on the right
   - Click on color pickers
   - Select primary and accent colors
   - Changes apply in real-time

2. **Change Fonts**
   - Select from available font families
   - Changes apply instantly to the preview

3. **Switch Templates**
   - Click on template options
   - Choose between Modern and Minimal designs
   - Your data persists across templates

### Exporting & Sharing

1. **Download as PDF**
   - Click the Export button
   - Select "Download PDF"
   - File saves to your downloads folder

2. **Share Your Resume**
   - Click the Share button
   - Copy the shareable link
   - Share with recruiters or on social media
   - Recipients can view your resume online


### Available Scripts

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
\`\`\`

### Adding Database Support

1. **Install PostgreSQL** or use a cloud service like Supabase

2. **Update `.env.local`**
   \`\`\`env
   DATABASE_URL="postgresql://user:password@localhost:5432/resume_builder"
   \`\`\`

3. **Run Prisma Migrations**
   \`\`\`bash
   npx prisma migrate dev --name init
   \`\`\`

4. **Generate Prisma Client**
   \`\`\`bash
   npx prisma generate
   \`\`\`

5. **View Database**
   \`\`\`bash
   npx prisma studio
   \`\`\`

### Creating New Resume Sections

1. Create editor component in `components/resume-editor/`
2. Add state to Redux `resumeSlice`
3. Create API route in `app/api/resumes/[id]/`
4. Add preview component to templates
5. Update the main editor page

### Customizing Templates

Edit template files in `components/resume-preview/`:
- Modify layout and styling
- Add new sections
- Change color application
- Adjust typography

## Future Enhancements

- [ ] Cloud storage integration
- [ ] Collaboration features
- [ ] AI-powered content suggestions
- [ ] More template designs
- [ ] Cover letter builder
- [ ] Resume analytics
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Mobile app


