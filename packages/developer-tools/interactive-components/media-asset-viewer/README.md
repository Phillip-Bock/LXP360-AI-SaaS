# LXD360 G-Drive Media Asset Viewer

Pase 1-5 is a comprehensive, web-based media asset management (MAM) application designed to be seamlessly embedded into a Notion workspace. This tool provides a centralized platform for design teams to view, review, manage, and archive various media assets.

## Core Objective

To streamline the media review and approval workflow, reduce friction in accessing and sharing assets, and maintain a well-organized, searchable archive of all project media. The user experience is designed to be simple, visual, and intuitive.

## Key Features

- **Multi-Category Media Support:** Handles Video, Audio, 2D Images, 360° Images, and 3D Scenes/Artifacts.
- **Advanced Interactive Viewers:** Includes built-in, interactive viewers for 360° images and 3D models powered by `three.js`.
- **Asset Workflow Management:** Supports asset statuses (e.g., *Pending Review*, *Approved*), commenting, and version control.
- **Robust Search and Filtering:** Features global keyword search and dynamic, client-side filtering by category, status, project, owner, and more.
- **Notion Embeddable:** Designed to be fully functional within a Notion iframe, including a responsive layout and automatic dark mode detection.
- **Modal-driven Workflow:** Intuitive pop-up modals for uploading and downloading assets with required metadata fields.

## Setup & Deployment

This application is a front-end prototype built with HTML, Tailwind CSS, and JavaScript. It is currently hosted via GitHub Pages.

1. **Hosting:** The `index.html` file is deployed on the `main` branch of this repository using GitHub Pages.
2. **Embedding:** The live GitHub Pages URL is embedded into a Notion page using the `/embed` command.

## Backend Integration Roadmap

The current version is a fully functional front-end prototype using mock data. The next phase of development will involve building a backend to connect the application to live data and services.

- **Authentication:** Manage user access via Google Accounts (OAuth 2.0) with role-based permissions.
- **Database:** Use Google Firebase (Firestore) to store and manage all asset metadata.
- **File Storage:** Integrate with the Google Drive API or Google Cloud Storage to handle file uploads, downloads, and versioning.
- **API Layer:** Develop a set of serverless functions (e.g., Google Cloud Functions) to act as the bridge between the front-end and the Google services.
- **Logging:** Implement a logging system to write a version control log of all actions to a Google Sheet.

## Project Structure

The repository is organized to separate concerns between the front-end prototype, styles, and scripts, making it easy to maintain and extend.

## Technical Overview

### HTML (index.html)

This HTML file defines the structure and appearance of the "LXD360 G-Drive Media Asset Viewer" web application. It includes essential meta tags for character encoding and responsive design, sets the page title, and loads Tailwind CSS via CDN. The theme is customized with a script block to extend Tailwind’s default settings, including custom fonts (Lato and Inter), brand colors, and border radius. Google Fonts are preloaded and linked, and a separate stylesheet (style.css) is included for additional custom styles.

The main content is wrapped in a responsive container. The header displays the application title and SVG logo. The main area uses a CSS grid to divide the interface into panels for filtering/searching assets and for asset actions. Action buttons are styled for usability, with some (like "Save") disabled by default. At the bottom, Three.js is loaded for 3D media support, and a custom JavaScript file (script.js) handles interactive behavior.

### JavaScript (script.js)

This JavaScript file sets up the main application logic. It waits for the DOM to load before initializing the App object, which is attached to the global window. The App object is organized into three sections:

- **state:** Holds application data, including the selected asset, a list of mock assets, and the current assets to display.
- **elements:** Caches references to important DOM elements for efficiency.
- **methods:** Handles rendering, such as populating the asset table, selecting assets, and updating the viewer area.

This structure separates data, DOM references, and UI rendering for maintainability.

### CSS (style.css)

This CSS file provides custom styles and utility classes. Base styles set the default font and prevent horizontal scrolling. Custom component styles are defined for modals and tooltips, with visibility toggled by classes and smooth fade-in effects. Utility classes add visual effects to buttons. A dark mode section uses a media query to adjust colors for better contrast and readability, ensuring accessibility in both light and dark environments.

## Future Development (Backend Integration)

The current version is a fully functional front-end prototype using mock data. The next phase of development will involve building a backend to connect the application to live data and services.

- **Authentication:** Manage user access via Google Accounts (OAuth 2.0) with role-based permissions.
- **Database:** Use Google Firebase (Firestore) to store and manage all asset metadata.
- **File Storage:** Integrate with the Google Drive API or Google Cloud Storage to handle file uploads, downloads, and versioning.
- **API Layer:** Develop a set of serverless functions (e.g., Google Cloud Functions) to act as the bridge between the front-end and the Google services.
- **Logging:** Implement a logging system to write a version control log of all actions to a Google Sheet.

Finally, the file includes a dark mode section using a media query for users who prefer dark color schemes. In dark mode, background and text colors are adjusted for better contrast and readability. This includes darker backgrounds for the body and containers, lighter text, and modified border and input colors. These overrides ensure the application remains visually appealing and accessible in both light and dark environments.
