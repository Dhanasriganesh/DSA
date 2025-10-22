# Design Studio Architects

A modern, professional website for an architecture and interior design firm with a fully functional Admin Portal for content management.

## 🌟 Features

### Public Website
- ✨ Modern, responsive design
- 🎨 Beautiful UI with Tailwind CSS
- 🖼️ Auto-rotating hero carousel
- 📱 Mobile-first approach
- 🎯 Multiple pages: Home, About, Contact
- 💬 Client testimonials showcase
- 👥 Team member profiles
- 🏠 Project portfolio with filtering
- 📧 Contact form

### Admin Portal
- 🔐 Secure authentication system
- 📊 Comprehensive dashboard with statistics
- 🏗️ **Projects Management**: Full CRUD operations for portfolio projects
- ⭐ **Testimonials Management**: Manage client reviews and ratings
- 👨‍💼 **Team Management**: Add/edit team member profiles
- 📬 **Contact Submissions**: View and manage client inquiries
- 🖼️ **Hero Images Management**: Control homepage carousel images
- 💾 Local storage for data persistence
- 📱 Fully responsive admin interface

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd DSA-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Public Website: `http://localhost:5173`
   - Admin Portal: `http://localhost:5173/admin`

## 🔑 Admin Access

### Firebase Setup Required

This application uses **Firebase** for authentication and database. You need to:

1. **Set up Firebase** (15 minutes) - See [FIREBASE_SETUP.md](FIREBASE_SETUP.md)
2. **Configure your app** with Firebase credentials
3. **Create your admin user** in Firebase Authentication
4. **Login** at `http://localhost:5173/admin`

**Quick Start**: See [QUICK_START_FIREBASE.md](QUICK_START_FIREBASE.md)

For detailed admin portal documentation, see [ADMIN_GUIDE.md](ADMIN_GUIDE.md)

## 📁 Project Structure

```
DSA-main/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── admin/       # Admin Portal components
│   │   │   ├── layout/  # Admin layout (Header, Sidebar)
│   │   │   ├── pages/   # Admin pages (Dashboard, Management pages)
│   │   │   ├── Login.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/       # Public website pages
│   │   ├── layout/      # Public website layout
│   │   ├── header/      # Website header
│   │   └── footer/      # Website footer
│   ├── context/
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── DataContext.jsx  # Content data management
│   ├── App.jsx          # Main app with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── ADMIN_GUIDE.md       # Comprehensive admin documentation
├── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React** 19.1.0 - UI library
- **React Router DOM** 7.6.3 - Client-side routing
- **Tailwind CSS** 4.1.11 - Utility-first CSS framework
- **Vite** 6.0.0 - Build tool and dev server

### Backend & Database
- **Firebase** - Backend as a Service (BaaS)
- **Firestore** - NoSQL cloud database
- **Firebase Authentication** - User authentication

### State Management
- React Context API for authentication and data management
- Firebase real-time listeners for data synchronization

### Styling
- Tailwind CSS for responsive design
- Google Fonts (Playfair Display)
- Custom animations and transitions

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🎨 Design System

### Colors
- **Primary**: Yellow (#F59E0B)
- **Background**: Gray shades
- **Text**: Gray 900, 700, 600
- **Accents**: White, Yellow

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: System font stack

### Components
- Rounded corners (rounded-xl, rounded-2xl)
- Soft shadows (shadow-lg, shadow-xl)
- Smooth hover transitions
- Mobile-responsive layouts

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Authentication & Security

**Current Implementation (Demo):**
- Simple email/password authentication
- Session stored in localStorage
- Protected routes with React Router

**For Production:**
- Implement backend authentication
- Use JWT tokens or secure sessions
- Add password hashing
- Enable HTTPS
- Implement rate limiting
- Add CSRF protection

## 💾 Data Storage

**Firebase/Firestore Integration** ✅

This application is now fully integrated with Firebase:
- **Firestore Database** - Cloud NoSQL database for all content
- **Firebase Authentication** - Secure user authentication
- **Real-time Sync** - Instant updates across devices
- **Automatic Backups** - Built into Firebase
- **Scalable** - Grows with your needs

### Setup Required
See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for complete setup instructions (15 minutes)

### Quick Start
See [QUICK_START_FIREBASE.md](QUICK_START_FIREBASE.md) for quick setup guide

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

### Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist` folder
- **GitHub Pages**: Use `gh-pages` branch
- **Your own server**: Upload `dist` folder

### Environment Setup
For production, set up:
1. Backend API endpoints
2. Database connections
3. Environment variables
4. CDN for images
5. SSL certificates

## 🎯 Key Features Explained

### Public Website Features

1. **Hero Carousel**: Auto-rotating images showcasing projects
2. **Project Portfolio**: Filterable project gallery with categories
3. **Testimonials**: Client reviews with ratings
4. **Team Section**: Professional profiles of team members
5. **Contact Form**: Easy inquiry submission
6. **Responsive Design**: Optimized for all devices

### Admin Portal Features

1. **Dashboard**: Overview statistics and quick actions
2. **Projects CRUD**: Manage portfolio with images and descriptions
3. **Testimonials CRUD**: Control client reviews and ratings
4. **Team CRUD**: Manage team member profiles
5. **Contact Manager**: View and respond to inquiries
6. **Hero Images**: Control homepage carousel content

## 🔧 Customization

### Changing Colors
Edit Tailwind config or use Tailwind classes in components:
- Primary color: `yellow-500`
- Replace with your brand color throughout

### Adding New Admin Features
1. Create new page in `src/components/admin/pages/`
2. Add route in `src/App.jsx`
3. Add menu item in `src/components/admin/layout/AdminSidebar.jsx`
4. Add data management in `src/context/DataContext.jsx`

### Modifying Content
Use the Admin Portal to:
- Update projects, testimonials, team members
- Change hero images
- Manage contact submissions

## 📚 Documentation

- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** - Complete Firebase setup guide (Start here!)
- **[QUICK_START_FIREBASE.md](QUICK_START_FIREBASE.md)** - Quick start guide for Firebase
- **[ADMIN_GUIDE.md](ADMIN_GUIDE.md)** - Comprehensive admin portal documentation
- **[README.md](README.md)** - This file

## 🐛 Known Issues

- Requires Firebase setup before use (see FIREBASE_SETUP.md)
- No image upload (uses image URLs)
- Contact form requires internet connection for Firebase

## 🚀 Future Enhancements

- [x] Backend integration (Firebase) ✅
- [x] Database connection (Firestore) ✅
- [x] Authentication system (Firebase Auth) ✅
- [ ] Image upload to Firebase Storage
- [ ] User role management (multiple admins)
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Blog/News section
- [ ] Multi-language support
- [ ] Dark mode

## 📄 License

This project is private and proprietary to Design Studio Architects.

## 👥 Contributing

For internal development team only. Please follow the coding standards and commit guidelines.

## 📞 Support

For questions or issues:
- Review documentation
- Check [ADMIN_GUIDE.md](ADMIN_GUIDE.md)
- Contact the development team

---

**Built with ❤️ for Design Studio Architects**
