# Developer Minimal Portfolio - A Modern Developer Portfolio Template

## 🚀 About This Project

**Developer Minimal Portfolio** is a modern, responsive developer portfolio website built with React, TypeScript, and Tailwind CSS. It features a clean, professional design with dark/light theme support and is completely configurable through JSON files.

This template allows developers to showcase their skills, projects, experience, and achievements in a beautiful, interactive format without writing any code. Simply modify the configuration files in the `config/` directory to personalize your portfolio. You literally don't need to change anything from the code. Just update the configs and see the magic happen!

## 👨‍💻 About Me - Soham Ratnaparkhi

**AI & Full-Stack Engineer | Innovator**

Hi, I'm Soham Ratnaparkhi, a software developer driven to build products that make a real impact. I thrive on solving complex challenges in scalability, distributed systems, and AI.

Currently, I'm a **Product Engineer at Findr AI**, where we're building the strongest search/retrieval engine for AI agents. I love diving deeper into foundational LLMs and scalable backends, sharing what I learn through my blog and on my socials.

### 🏆 Key Achievements

- **Winner, Google GenAI Hackathon 2024** - Secured first place against 1,000+ participants
- **MITACS Globalink Research Intern** - Awarded prestigious research internship with <15% acceptance rate
- **Global Web3 Hackathon Winner** - Multiple international hackathon victories
- **Microsoft Learn Student Ambassador & President** - Led community of 50+ students

### 🔗 Connect With Me

- **GitHub**: [sohamratnaparkhi](https://github.com/sohamratnaparkhi)
- **LinkedIn**: [Soham Ratnaparkhi](https://www.linkedin.com/in/soham-ratnaparkhi-3a3775ab/)
- **X (Twitter)**: [@SohamR_7113](https://twitter.com/SohamR_7113)
- **Email**: soham.ratnaparkhi@gmail.com
- **Location**: Pune, India

## 🛠️ Technologies Used

This project is built with:

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **Package Manager**: npm/yarn/pnpm/bun
- **Deployment**: Any static hosting service (Vercel, Netlify, GitHub Pages, etc.)

## 📁 Project Structure

```
developer-minimal-portfolio/
├── config/                 # All configuration files
│   ├── profile.json       # Personal information
│   ├── projects.json      # Portfolio projects
│   ├── skills.json        # Technical skills
│   ├── experience.json    # Work experience
│   ├── achievements.json  # Awards & achievements
│   ├── blog.json         # Blog posts
│   ├── research.json     # Research publications
│   └── theme.json        # Color scheme & styling
├── src/
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
└── public/               # Static assets
```

## 🎯 How to Use This Template

### 1. Clone the Repository

```bash
git clone https://github.com/SohamRatnaparkhi/developer-minimal-portfolio.git
cd developer-minimal-portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Customize Your Portfolio

Simply edit the JSON files in the `config/` directory to personalize your portfolio:

#### **profile.json** - Your Personal Information

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "bio": {
    "sm": { "paragraphs": ["Short bio"] },
    "md": { "paragraphs": ["Medium bio"] },
    "lg": { "paragraphs": ["Long bio"] }
  },
  "email": "your.email@example.com",
  "location": "Your Location",
  "profileImage": "URL to your photo",
  "socialLinks": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourusername"
  }
}
```

#### **projects.json** - Your Projects

```json
[
  {
    "id": 1,
    "name": "Project Name",
    "description": "Short description",
    "longDescription": "Detailed description",
    "image": "Project banner image URL",
    "techStack": ["Tech1", "Tech2"],
    "liveUrl": "Live project URL",
    "githubUrl": "GitHub repository URL",
    "featured": true,
    "category": "Category"
  }
]
```

#### **skills.json** - Your Technical Skills

```json
[
  {
    "name": "Skill Name",
    "logo": "Skill logo URL",
    "category": "Language|Framework|Database|Tools"
  }
]
```

#### **experience.json** - Your Work Experience

```json
[
  {
    "id": 1,
    "company": "Company Name",
    "position": "Your Position",
    "startDate": "Start Date",
    "endDate": "End Date",
    "current": true,
    "responsibilities": ["Responsibility 1", "Responsibility 2"],
    "techStack": ["Tech1", "Tech2"]
  }
]
```

#### **achievements.json** - Your Awards & Achievements

```json
[
  {
    "id": 1,
    "title": "Achievement Title",
    "description": "Achievement description",
    "date": "Year",
    "category": "Category",
    "icon": "🏆",
    "featured": true
  }
]
```

#### **blog.json** - Your Blog Posts

```json
[
  {
    "id": 1,
    "title": "Blog Post Title",
    "excerpt": "Brief excerpt",
    "date": "YYYY-MM-DD",
    "published": true,
    "readTime": "5 mins",
    "featured": true,
    "url": "Blog post URL",
    "tags": ["Tag1", "Tag2"]
  }
]
```

#### **research.json** - Your Research Publications

```json
[
  {
    "id": 1,
    "title": "Research Paper Title",
    "authors": ["Author 1", "Author 2"],
    "publication": "Publication name",
    "date": "Year",
    "link": "Paper URL",
    "category": "Category",
    "featured": true
  }
]
```

#### **theme.json** - Customize Colors & Styling

```json
{
  "light": {
    "primary": "220 14% 11%",
    "background": "0 0% 100%",
    "foreground": "222 84% 5%"
  },
  "dark": {
    "primary": "210 40% 98%",
    "background": "222 84% 5%",
    "foreground": "210 40% 98%"
  }
}
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 5. Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
```

## 🌟 Key Features

- **🎨 Responsive Design**: Works perfectly on all devices
- **🌓 Dark/Light Theme**: Automatic theme switching with manual toggle
- **📱 Mobile-First**: Optimized for mobile and desktop
- **⚡ Fast Performance**: Built with Vite for optimal speed
- **🔧 Easy Customization**: Everything configurable via JSON files
- **📊 Interactive Sections**: Projects, skills, experience, achievements
- **📝 Blog Integration**: Showcase your writing
- **🔬 Research Showcase**: Display academic publications
- **🎯 SEO Optimized**: Built with search engines in mind
- **🚀 Modern Tech Stack**: React 18, TypeScript, Tailwind CSS

## ⭐ Support This Project

If you find this template helpful, please consider:

- **Starring** this repository ⭐
- **Sharing** it with fellow developers who might benefit from it
- **Forking** it to create your own version

Your support helps make this template better for everyone! 🙏

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Option 2: Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### Option 3: GitHub Pages

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

### Option 4: Any Static Hosting

Upload the `dist/` folder to any static hosting service like:

- AWS S3 + CloudFront (personal preference)
- Firebase Hosting
- Surge.sh
- Render
- Railway

## 🎨 Customization Tips

1. **Images**: Use high-quality images (recommended: 1200x630px for banners)
2. **Colors**: Modify `theme.json` to match your brand colors
3. **Content**: Keep descriptions concise but informative
4. **Links**: Ensure all URLs are valid and accessible
5. **Performance**: Optimize images and use CDN for better loading times

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this template!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from various icon libraries
- Deployed on [Vercel](https://vercel.com)

---

**Ready to showcase your skills?** Start customizing this template and build your professional portfolio today! 🚀
