<div align="center">

# 🚇 Kochi Metro Fleet Management Dashboard

> **A modern, AI-powered fleet management system for Kochi Metro Rail Limited (KMRL)**

![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=flat-square)

</div>

## 🎯 Overview

The Kochi Metro Fleet Management Dashboard is a comprehensive web application designed to streamline train fleet operations, maintenance scheduling, and decision-making processes for metro rail systems. Built with modern technologies and AI-powered optimization, it provides real-time insights and intelligent recommendations for fleet management.

## ✨ Features

### 📊 **Fleet Overview Dashboard**
- Real-time fleet status monitoring
- Interactive performance metrics
- Service availability tracking
- Maintenance queue management
- AI-powered operational insights

### 🚆 **Trainset Management**
- Comprehensive trainset listing with advanced filtering
- Detailed trainset information including:
  - Maintenance schedules and history
  - Fitness certificate tracking
  - Job card management
  - Branding and livery status
  - Cleaning schedules
  - Stabling position tracking
- Mobile-responsive design with card/table views

### 🤖 **AI-Powered Induction Planner**
- Intelligent trainset allocation recommendations
- Multi-objective optimization considering:
  - Fitness certificates
  - Job card status
  - Branding priorities
  - Mileage balancing
  - Cleaning schedules
  - Stabling geometry
- Real-time conflict detection
- Confidence scoring for recommendations

### 📈 **Performance Simulation**
- Fleet performance modeling
- Decision impact analysis
- Real-time parameter adjustment
- Performance prediction algorithms

### 📋 **Decision History & Audit Trail**
- Comprehensive logging of all induction decisions
- Historical performance analysis
- Decision outcome tracking
- Supervisor accountability
- Searchable and filterable records

### 💡 **Smart Features**
- **Interactive Tooltips**: Comprehensive explanations for technical terms
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: User preference-based theming
- **Mobile Navigation**: Hamburger menu with sidebar navigation
- **Real-time Updates**: Live data synchronization
- **Accessibility**: WCAG compliant design

## 🛠️ Technology Stack

### **Frontend Framework**
- **Next.js 14.2.16** - React framework with App Router
- **React 18** - UI library with modern hooks
- **TypeScript 5** - Type-safe development

### **Styling & UI**
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **next-themes** - Theme management

### **State Management & Forms**
- **React Hook Form** - Performant forms with validation
- **Zod** - Schema validation

### **Data Visualization**
- **Recharts** - Responsive charts and graphs

### **Development Tools**
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **pnpm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Udhay-Adithya/kmrl-fleet-management-dashboard.git
   cd kmrl-fleet-management-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📱 Mobile Responsiveness

The dashboard is fully optimized for mobile devices with:

- **Responsive Grid Layouts**: Adaptive layouts for different screen sizes
- **Mobile-First Design**: Optimized for touch interactions
- **Hamburger Navigation**: Easy access to all pages on mobile
- **Card-Based Views**: Mobile-friendly data presentation
- **Touch-Optimized Controls**: Buttons and inputs sized for mobile

## 🤝 Contributing

We welcome contributions to improve the Kochi Metro Fleet Management Dashboard!

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Style**
- Follow TypeScript best practices
- Use meaningful component and variable names
- Add JSDoc comments for complex functions
- Ensure responsive design patterns

### **Testing**
- Test on multiple screen sizes
- Verify accessibility compliance
- Check theme switching functionality

## 📋 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Dashboard home page
│   ├── history/           # Decision history page
│   ├── planner/           # AI induction planner
│   ├── simulation/        # Performance simulation
│   └── trainsets/         # Trainset management
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (Radix)
│   ├── app-header.tsx    # Navigation header
│   ├── app-sidebar.tsx   # Navigation sidebar
│   ├── info-tooltip.tsx  # Interactive tooltips
│   ├── priority-badge.tsx # Priority indicators
│   └── status-badge.tsx  # Status indicators
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and data
│   ├── mock-data.ts      # Sample fleet data
│   ├── tooltips.ts       # Tooltip definitions
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── styles/               # Additional CSS files
```

## 🔮 Future Enhancements

### **Planned Features**
- [ ] **Real-time Data Integration** - Live API connections
- [ ] **Advanced Analytics** - Predictive maintenance models
- [ ] **Multi-language Support** - Localization for regional usage
- [ ] **Offline Capability** - PWA functionality
- [ ] **Push Notifications** - Critical alerts and updates
- [ ] **Export Functionality** - PDF/Excel report generation
- [ ] **User Management** - Role-based access control
- [ ] **Integration APIs** - Third-party system connections

### **Technical Improvements**
- [ ] **Database Integration** - Replace mock data with real database
- [ ] **Authentication System** - Secure user login and authorization
- [ ] **Testing Suite** - Unit and integration tests
- [ ] **Performance Monitoring** - Analytics and error tracking
- [ ] **CI/CD Pipeline** - Automated deployment

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🏢 About KMRL

Kochi Metro Rail Limited (KMRL) is responsible for the operation and maintenance of the Kochi Metro system in Kerala, India. This dashboard represents a modern approach to fleet management, incorporating AI and data-driven decision making to improve operational efficiency.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern metro systems worldwide
- **UI Components**: Radix UI for accessible components
- **Icons**: Lucide React for beautiful iconography
- **Deployment**: Vercel for seamless hosting

---

<div align="center">

**Made with ❤️ for efficient metro operations**

[🚇 Live Demo](https://kmrl-fleet-management-dashboard.vercel.app) • [📧 Report Bug](https://github.com/Udhay-Adithya/kmrl-fleet-management-dashboard/issues) • [💡 Request Feature](https://github.com/Udhay-Adithya/kmrl-fleet-management-dashboard/issues)

</div>