# Legal Digital NG - Nigerian Legal Database

> A modern, comprehensive legal research platform providing access to 9,000+ Nigerian court cases and legislative acts.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## Project Overview

Legal Digital NG is a full-stack legal technology platform that migrated from WordPress to a modern Next.js + Supabase stack. The platform provides lawyers, law students, and legal professionals with instant access to Nigerian Supreme Court, Court of Appeal, and legislative documents.

### Key Features

-  **Advanced Search & Filtering** - Search by year, court, case name, and subject matter
-  **9,248+ Legal Cases** - Comprehensive database of Nigerian court judgments
-  **Embedded Documents** - View PDFs and Google Docs directly in the browser
-  **Smart Categorization** - 21 court categories and 4,140+ legal topic tags
-  **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
-  **Lightning Fast** - Server-side rendering with Next.js 15 for optimal performance
-  **Ready for Auth** - Built with Supabase authentication support

---

##  Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Server Components** - Optimized data fetching

### Backend
- **Supabase** - PostgreSQL database with Row Level Security
- **RESTful API** - Auto-generated Supabase APIs
- **Full-text Search** - PostgreSQL tsvector indexes

### Infrastructure
- **Vercel** - Deployment platform (planned)
- **Git** - Version control

---

##  Database Schema
```
cases (9,248 rows)
├── id, wp_id, title, slug
├── content, excerpt
├── case_year, first_letter
└── published_at, timestamps

categories (21 rows)
├── Supreme Court
├── Court of Appeal
├── Federal High Court
└── ...

tags (4,140 rows)
├── Election Petition
├── Constitutional Law
├── Contract Law
└── ...

Junction Tables:
├── case_categories (18,302 relationships)
└── case_tags (18,680 relationships)
```

---

##  Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Git

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/bolade-olayode/legal-digital-ng.git
   cd legal-digital-ng
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
```bash
   cp .env.example .env.local
```
   
   Then add your Supabase credentials:
```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**
```bash
   npm run dev
```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

##  Project Structure
```
legal-digital-ng/
├── app/
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   ├── Footer.js          # Site footer
│   │   └── CaseFilters.js     # Filter component (client)
│   ├── posts/
│   │   ├── page.js            # Cases listing (server)
│   │   └── [slug]/
│   │       └── page.js        # Case detail page
│   ├── layout.js              # Root layout
│   ├── page.js                # Homepage
│   └── globals.css            # Global styles
├── lib/
│   └── supabase.js            # Supabase client
├── public/
│   └── legal_digital_logo.png # Logo assets
└── package.json
```

---

##  Features in Detail

### 1. **Advanced Filtering**
- Filter by year (1900-2025)
- Filter by court category
- Filter by first letter (A-Z)
- Combine multiple filters
- URL-based filtering for shareable links

### 2. **Pagination**
- 20 cases per page
- Smart page number display
- Previous/Next navigation
- Mobile-responsive controls

### 3. **Case Display**
- Embedded PDF viewers (Google Drive)
- Embedded Google Docs viewer
- Full HTML content rendering
- Categories and tags display
- Related cases (via tags/categories)

### 4. **Performance**
- Server-side rendering (SSR)
- PostgreSQL indexes on all key fields
- Full-text search indexes
- Optimized queries with junction tables

---

##  Data Migration

This project successfully migrated **9,248 legal cases** from WordPress to Supabase:

- Custom SQL queries via phpMyAdmin
- Node.js data transformation scripts
- Content cleaning (removed scripts, normalized URLs)
- Data validation and integrity checks
- Relationship mapping (categories & tags)

**Data Quality:**
- 82% of cases include embedded documents (PDFs/Docs)
- 100% have category assignments
- 87% have tag assignments
- Zero duplicate cases

---

## 🎨 Design System

**Brand Colors:**
- Primary Blue: `#050298`
- Accent Yellow: `#FFC107`
- Dark Background: `#0A1628`

**Typography:**
- Font: Montserrat (system font)
- Headings: Bold, 2xl-4xl
- Body: Regular, sm-base

---

## 🔮 Roadmap

### Phase 1: MVP 
- [x] Database migration
- [x] Cases listing with pagination
- [x] Case detail pages
- [x] Advanced filtering
- [x] Responsive design

### Phase 2: Enhanced Features 
- [ ] Full-text search
- [ ] Search autocomplete
- [ ] Browse by tags page
- [ ] Browse by categories page
- [ ] Enhanced homepage

### Phase 3: Authentication 
- [ ] User registration/login
- [ ] Subscription plans
- [ ] User dashboard UI
- [ ] Save favorite cases
- [ ] Search history

### Phase 4: Advanced Features 
- [ ] AI-powered case recommendations
- [ ] Citation generator
- [ ] Case comparison tool
- [ ] Export cases to PDF
- [ ] Email notifications

---

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

##  Author

**Bolade Olayode**
- GitHub: [@bolade-olayode](https://github.com/bolade-olayode)
- Website: [Legal Digital NG](https://legaldigitalng.com)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/bolade-olayode)

---

##  Acknowledgments

- Supabase for the amazing backend platform
- Next.js team for the incredible framework
- Vercel for hosting infrastructure

---

##  Support

For support, email olayodeb6@gmail.com or open an issue in this repository.
Thank You!!!
---

**⭐ Star this repo if you find it helpful!**
