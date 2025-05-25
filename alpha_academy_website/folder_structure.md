# Alpha Academy Website - Folder Structure

## Root Directory
- `index.html` - Home page
- `about.html` - About page
- `courses.html` - Courses/Services page
- `student-portal.html` - Student Portal page
- `blog.html` - Blog listing page
- `team.html` - Team page
- `contact.html` - Contact page
- `favicon.ico` - Website favicon

## CSS Directory (`/css`)
- ### Base (`/css/base`)
  - `reset.css` - CSS reset/normalize
  - `variables.css` - CSS variables (colors, fonts, etc.)
  - `typography.css` - Typography styles
  - `layout.css` - Layout grid and containers
  - `animations.css` - Global animations

- ### Components (`/css/components`)
  - `header.css` - Header styles
  - `footer.css` - Footer styles
  - `buttons.css` - Button styles
  - `cards.css` - Card component styles
  - `forms.css` - Form styles
  - `navigation.css` - Navigation styles
  - `carousel.css` - Carousel/slider styles
  - `modal.css` - Modal/popup styles

- ### Pages (`/css/pages`)
  - `home.css` - Home page specific styles
  - `about.css` - About page specific styles
  - `courses.css` - Courses page specific styles
  - `student-portal.css` - Student portal specific styles
  - `blog.css` - Blog page specific styles
  - `team.css` - Team page specific styles
  - `contact.css` - Contact page specific styles

- `main.css` - Main CSS file that imports all others

## JavaScript Directory (`/js`)
- ### Components (`/js/components`)
  - `navigation.js` - Navigation functionality
  - `carousel.js` - Carousel/slider functionality
  - `forms.js` - Form validation and submission
  - `modal.js` - Modal/popup functionality
  - `tabs.js` - Tab switching functionality
  - `accordion.js` - Accordion functionality

- ### 3D (`/js/3d`)
  - `three-setup.js` - Three.js setup and configuration
  - `home-3d.js` - 3D elements for home page
  - `courses-3d.js` - 3D elements for courses page
  - `portal-3d.js` - 3D elements for student portal
  - `contact-3d.js` - 3D elements for contact page

- ### Libraries (`/js/lib`)
  - `three.min.js` - Three.js library
  - `gsap.min.js` - GSAP animation library
  - `scrolltrigger.min.js` - ScrollTrigger plugin

- `main.js` - Main JavaScript file

## Images Directory (`/images`)
- ### Courses (`/images/courses`)
  - Course-specific images and icons

- ### Team (`/images/team`)
  - Team member photos

- ### Blog (`/images/blog`)
  - Blog post featured images

- ### Icons (`/images/icons`)
  - UI icons and SVGs

- ### Backgrounds (`/images/backgrounds`)
  - Background images and patterns

## Fonts Directory (`/fonts`)
- Montserrat font files
- Inter font files
- Poppins font files

## Assets Directory (`/assets`)
- ### 3D (`/assets/3d`)
  - 3D model files (.glb, .gltf)
  - Textures for 3D models
