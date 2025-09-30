# React GymLife

This is a React.js conversion of the original HTML GymLife template. All functionality, content, images, and color themes have been preserved.

## Features

- Fully responsive design
- React Router for navigation
- Component-based architecture
- Preserved original styling and animations
- Mobile-friendly navigation
- Search functionality
- Team member showcase
- Contact information section

## Installation

### Option 1: Using setup script (Windows)
1. Navigate to project directory:
   ```cmd
   cd c:\Users\ASUS\Downloads\gymlife-master\react-gymlife
   ```
2. Run setup script:
   ```cmd
   setup.bat
   ```

### Option 2: Manual setup
1. Navigate to the project directory:
   ```bash
   cd c:\Users\ASUS\Downloads\gymlife-master\react-gymlife
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header with mobile menu
│   ├── Breadcrumb.js      # Page breadcrumb navigation
│   ├── TeamSection.js     # Team members display
│   ├── GetInTouch.js      # Contact information
│   ├── Footer.js          # Footer with links and info
│   └── Preloader.js       # Loading animation
├── pages/
│   └── TeamPage.js        # Main team page
├── App.js                 # Main app component with routing
├── index.js              # Entry point
└── index.css             # All original styles

public/
└── img/                  # All original images and assets
```

## Components

### Header
- Responsive navigation menu
- Mobile hamburger menu
- Search functionality
- Social media links

### TeamSection
- Grid layout for team members
- Hover effects on team cards
- Social media links for each member
- Appointment booking button

### Breadcrumb
- Dynamic page navigation
- Customizable title and current page

### GetInTouch
- Contact information display
- Address, phone, and email
- Icon-based layout

### Footer
- Company information
- Useful links
- Recent blog posts
- Copyright information

## Styling

All original CSS has been preserved in `src/index.css`, including:
- Color scheme (#f36100 primary color)
- Typography (Muli and Oswald fonts)
- Animations and transitions
- Responsive breakpoints
- Hover effects

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This template is licensed under CC BY 3.0 by Colorlib.