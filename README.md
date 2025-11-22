# Juspay eCommerce Dashboard

A modern, feature-rich eCommerce dashboard built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. This dashboard features a comprehensive analytics view with interactive charts, order management, and a fully functional dark mode with smooth animations and microinteractions.

![Dashboard Preview](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?logo=tailwind-css)

---

## 🚀 Features

### Dashboard Components
- **📊 Analytics Cards**: Display key metrics (Customers, Orders, Revenue, Growth) with color-coded backgrounds
- **📈 Interactive Charts**: 
  - Revenue trends (Line chart with custom tooltips)
  - Sales projections (Area chart)
  - Revenue by location (Geographic map)
  - Top selling products (Bar chart)
  - Total sales breakdown (Donut chart)
- **📋 Order Management**: Full-featured order list with:
  - Advanced filtering by status
  - Debounced search (300ms)
  - Column sorting (3-state: asc/desc/none)
  - Pagination with customizable items per page
  - Bulk selection with "select all" functionality

### User Experience
- **🌓 Dark Mode**: Smooth theme switching with 300ms transitions
- **⚡ Animations & Microinteractions**:
  - Skeleton loading states
  - Toast notifications (success/error/info/warning)
  - Hover effects with transforms and shadows
  - Button active/focus states
  - Dropdown slide-in animations
- **📱 Responsive Design**: Fully responsive layout with collapsible sidebars
- **♿ Accessibility**: Focus rings, keyboard navigation, ARIA support

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)
- [Challenges & Solutions](#challenges--solutions)
- [Improvements Made](#improvements-made)
- [Technologies Used](#technologies-used)
- [Scripts](#scripts)
- [Deployment](#deployment)

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanatan-dive/juspay.git
   cd juspay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   > **Note**: This project uses `.npmrc` with `legacy-peer-deps=true` to resolve peer dependency conflicts between React 19 and `react-simple-maps@3.0.0`.

### Running the Development Server

Start the development server with hot-reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will automatically reload when you make changes to the code.

### Building for Production

1. **Create an optimized production build**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

The production build will be optimized for performance with code splitting, minification, and tree shaking.

---

## 📁 Project Structure

```
juspay/
├── app/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── ChartSkeleton.tsx        # Loading skeleton for charts
│   │   │   ├── ProjectionsChart.tsx      # Sales projections area chart
│   │   │   ├── RevenueByLocation.tsx     # Geographic revenue map
│   │   │   ├── RevenueChart.tsx          # Revenue line chart
│   │   │   ├── StatCard.tsx              # Metric cards (Customers, Orders, etc.)
│   │   │   ├── StatCardSkeleton.tsx      # Loading skeleton for stat cards
│   │   │   ├── TopSellingProducts.tsx    # Top products bar chart
│   │   │   └── TotalSales.tsx            # Sales breakdown donut chart
│   │   ├── Default.tsx                   # Main dashboard page
│   │   ├── header.tsx                    # Top navigation bar
│   │   ├── icons.tsx                     # Custom SVG icons
│   │   ├── leftsidebar.tsx               # Left navigation sidebar
│   │   ├── OrderList.tsx                 # Order management table
│   │   ├── rightsidebar.tsx              # Right sidebar (notifications, activities)
│   │   ├── SkeletonLoader.tsx            # Reusable skeleton component
│   │   ├── TableSkeleton.tsx             # Loading skeleton for tables
│   │   └── ToastContainer.tsx            # Toast notification system
│   ├── context/
│   │   └── ThemeContext.tsx              # Dark mode theme provider
│   ├── contexts/
│   │   └── ToastContext.tsx              # Toast notification provider
│   ├── globals.css                       # Global styles & animations
│   ├── layout.tsx                        # Root layout with providers
│   └── page.tsx                          # Main app entry point
├── public/                               # Static assets
├── .npmrc                                # npm configuration for peer deps
├── eslint.config.mjs                     # ESLint configuration
├── next.config.ts                        # Next.js configuration
├── package.json                          # Project dependencies
├── postcss.config.mjs                    # PostCSS configuration
├── tailwind.config.ts                    # Tailwind CSS configuration (v4)
├── tsconfig.json                         # TypeScript configuration
├── ANIMATION_SUMMARY.md                  # Animation implementation docs
└── README.md                             # This file
```

---

## 🎨 Design Decisions

### 1. **Technology Stack**
- **Next.js 16**: Chosen for its App Router, React Server Components, and excellent developer experience
- **React 19**: Latest version with improved concurrent rendering and performance
- **Tailwind CSS v4**: For rapid UI development with utility-first CSS and built-in dark mode
- **TypeScript**: Type safety to catch errors early and improve code maintainability
- **Recharts**: For data visualization with customizable, responsive charts

### 2. **Architecture Patterns**
- **Component-Based**: Each UI element is a reusable component for better maintainability
- **Context API**: Used for theme and toast state management to avoid prop drilling
- **Custom Hooks**: Encapsulate logic (`useTheme`, `useToast`) for reusability
- **Skeleton Screens**: Prevent layout shift and improve perceived performance

### 3. **Styling Approach**
- **Tailwind CSS v4 with `@variant dark`**: Custom dark mode implementation
- **CSS Variables**: For consistent spacing and color tokens
- **Global Animations**: Centralized in `globals.css` for consistency
- **Hardware-Accelerated Animations**: Use `transform` and `opacity` for 60fps performance

### 4. **State Management**
- **Local State (useState)**: For component-specific state (filters, search, pagination)
- **Context API**: For global state (theme, toasts)
- **useMemo/useCallback**: Optimize re-renders for filtered/sorted data

### 5. **User Experience**
- **Debouncing**: 300ms delay on search to reduce unnecessary re-renders
- **Progressive Enhancement**: Core functionality works, animations enhance
- **Accessibility**: Focus rings, keyboard navigation, semantic HTML
- **Loading States**: Skeleton screens prevent jarring content shifts

---

## 🛠️ Challenges & Solutions

### Challenge 1: React 19 Peer Dependency Conflicts
**Problem**: `react-simple-maps@3.0.0` only supports React 16.8-18, causing deployment failures on Vercel.

**Solution**: Added `.npmrc` with `legacy-peer-deps=true` to allow npm to install packages despite peer dependency mismatches. This is a temporary solution until `react-simple-maps` officially supports React 19.

**Files Modified**:
- Created `.npmrc`

---

### Challenge 2: Dark Mode Color Consistency
**Problem**: Dark mode colors were inconsistent across components, and the donut chart used pure black (#000000) which looked harsh.

**Solution**: 
- Created a centralized color palette in Tailwind config
- Changed donut chart black to gray (#6B7280) for better visual hierarchy
- Added `transition-colors duration-300` to all theme-sensitive elements

**Files Modified**:
- `app/components/dashboard/TotalSales.tsx`
- `app/globals.css`

---

### Challenge 3: Smooth Theme Transitions
**Problem**: Theme switching caused jarring color changes without smooth transitions.

**Solution**: 
- Added global `transition-colors duration-300` to all components
- Used CSS custom properties for colors
- Implemented `suppressHydrationWarning` to prevent flash on initial load

**Files Modified**:
- `app/globals.css`
- `app/layout.tsx`
- All component files

---

### Challenge 4: Table Performance with Large Datasets
**Problem**: Filtering, sorting, and searching caused re-renders on every keystroke.

**Solution**:
- Implemented 300ms debouncing for search input
- Used `useMemo` to memoize filtered and sorted results
- Added pagination to limit rendered rows
- Optimized with three-state sorting (asc → desc → none)

**Files Modified**:
- `app/components/OrderList.tsx`

---

### Challenge 5: Custom Tooltips in Recharts
**Problem**: Default Recharts tooltips didn't match design system and lacked dark mode.

**Solution**:
- Created custom `CustomTooltip` components
- Moved component outside render function to prevent React warnings
- Added dark mode styling and formatted currency values

**Files Modified**:
- `app/components/dashboard/RevenueChart.tsx`
- `app/components/dashboard/ProjectionsChart.tsx`

---

### Challenge 6: Checkbox Styling in Dark Mode
**Problem**: Default checkbox colors didn't match design (needed white border in dark mode).

**Solution**:
- Created custom CSS for checkbox styling
- Separate light/dark mode rules with `.dark` selector
- Added smooth 150ms transitions on state changes

**Files Modified**:
- `app/globals.css`

---

### Challenge 7: Select All Checkbox with Pagination
**Problem**: "Select all" checkbox should only select items on current page, not all pages.

**Solution**:
- Implemented page-aware selection logic
- Used index-based selection tracking
- Calculated `startIndex` based on current page

**Files Modified**:
- `app/components/OrderList.tsx`

---

## ✨ Improvements Made

### 1. **Animation System** (See `ANIMATION_SUMMARY.md` for details)
- ✅ Smooth dropdown animations (slideDown 200ms)
- ✅ Debounced search with visual feedback
- ✅ Column sorting with chevron indicators
- ✅ Pagination with smooth transitions
- ✅ Card hover effects with transforms
- ✅ Skeleton loading screens
- ✅ Theme transitions (300ms)
- ✅ Button active/focus states
- ✅ Toast notifications (4 types)
- ✅ Custom chart tooltips

**Key Features**:
- Consistent timing (200-300ms)
- Cubic-bezier easing: `(0.4, 0, 0.2, 1)`
- Hardware-accelerated (transform, opacity)
- 60fps performance

---

### 2. **Accessibility Enhancements**
- Focus rings with brand color (#8A8CD9)
- Keyboard navigation support
- Semantic HTML elements
- Color contrast meets WCAG AA
- `:focus-visible` for keyboard-only focus

---

### 3. **Performance Optimizations**
- Debouncing (300ms) to reduce re-renders
- `useMemo` for expensive computations
- Skeleton screens for perceived performance
- Code splitting via Next.js dynamic imports
- Optimized images and assets

---

### 4. **Developer Experience**
- TypeScript for type safety
- ESLint for code quality
- Consistent code formatting
- Component documentation
- Clear project structure

---

### 5. **User Feedback System**
- Toast notifications for actions
- Loading states during async operations
- Visual feedback on hover/active
- Progress bars on auto-dismiss toasts

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.3 | React framework with App Router |
| React | 19.2.0 | UI library with concurrent rendering |
| TypeScript | 5.0 | Static type checking |
| Tailwind CSS | 4.0 | Utility-first CSS framework |
| Recharts | 3.4.1 | Data visualization library |
| Lucide React | 0.554.0 | Icon library |
| react-simple-maps | 3.0.0 | Geographic map component |

---

## 📜 Scripts

```bash
# Development
npm run dev          # Start dev server on http://localhost:3000

# Production
npm run build        # Create optimized production build
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint to check code quality
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel will auto-detect Next.js and configure build settings

3. **Build Configuration**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install` (uses `.npmrc` automatically)

4. **Environment Variables** (if needed)
   - Add any required environment variables in Vercel dashboard

The `.npmrc` file will automatically be used during deployment to resolve peer dependency conflicts.

**Live Demo**: [Your Vercel URL here]

---

## 📝 Additional Notes

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

### Known Issues
- `react-simple-maps` doesn't officially support React 19 yet (workaround in place with `.npmrc`)
- Some TypeScript `any` types in Recharts (library limitation)

### Future Enhancements
- [ ] Add `prefers-reduced-motion` support
- [ ] Implement real API integration
- [ ] Add user authentication
- [ ] Add data export functionality
- [ ] Implement real-time updates with WebSockets
- [ ] Add more chart types and customizations

---

## 📄 License

This project is private and proprietary.

---

## 🤝 Contributing

This is a private project for Juspay internship assessment.

---

## 📧 Contact

For any questions or feedback, please reach out to the project maintainer.

---

**Built with ❤️ using Next.js 16, React 19, and Tailwind CSS v4**
