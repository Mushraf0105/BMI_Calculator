# Premium BMI Calculator

A modern, responsive, and interactive Body Mass Index (BMI) calculator built with HTML5, CSS3, and JavaScript. 

## Approach

This project was built focusing on modern web development practices, emphasizing both functionality and user experience (UX).

1. **User Interface (UI):** 
   - Implemented a "glassmorphism" aesthetic using semi-transparent backgrounds and background blurs (`backdrop-filter`).
   - Ensured a responsive layout that works seamlessly across desktop and mobile devices.
   - Added a visual range indicator and dynamic colors for different BMI categories (Underweight, Normal, Overweight, Obese) to provide immediate, intuitive feedback.

2. **Core Logic & Validation (JavaScript):**
   - **Form Handling:** Intercepted the form submission to prevent page reloads, processing the data purely on the client side.
   - **Validation:** Added robust input validation to ensure empty, non-numeric, zero, or negative values are caught and rejected gracefully with user-friendly error messages underneath the respective input fields.
   - **Calculation:** Accurately calculated the BMI using standard formulas (`weight / height_in_meters^2`) and rounded the output to one decimal place.
   - **Conditional Output:** Used `if/else` logic aligned with WHO classifications to determine the user's BMI category.

## Outcome

The result is a polished, highly responsive BMI calculator. Users receive instant, validated feedback on their health metrics, wrapped in a premium visual design. The smooth animations and conditional color-coding significantly enhance user engagement and data comprehension.

## Deployment

Since this is a static frontend application (HTML/CSS/JS without a backend server), deployment is straightforward. 

### Recommended Deployment Platforms:
- **GitHub Pages:**
  1. Push the repository to GitHub.
  2. Go to the repository **Settings** > **Pages**.
  3. Select the `main` branch as the source and save.
- **Vercel / Netlify:**
  1. Create an account on Vercel or Netlify.
  2. Drag and drop the project folder or link your GitHub repository.
  3. The platform will automatically provision an SSL certificate and provide a live URL.

### Local Deployment:
To run the app locally, simply open the `index.html` file in any modern web browser. No local web server or build process is strictly required.

## Configuration

This application runs client-side and requires zero environmental configurations or build steps (e.g., no Node.js or Webpack needed).

- **Styles (`style.css`):** The color scheme and design tokens are managed via CSS variables in the `:root` pseudo-class. You can easily configure the app's theme (backgrounds, accents, category colors) by modifying these variables.
- **Logic (`script.js`):** The BMI categorizations and thresholds are hardcoded according to standard WHO guidelines. If custom categorizations are required, you can modify the `getBMICategory` function.

## Rollback Evidence & Strategies

In a production environment, ensuring stability during updates is critical.

1. **Version Control (Git):** All changes should be committed iteratively. If a new styling update or JS logic change introduces a bug, developers can use `git revert <commit-hash>` to immediately undo the changes and restore the previous stable state.
2. **Platform Rollbacks:** If deployed via platforms like Vercel or Netlify, every deployment is immutable and versioned. 
   - **Rollback Process:** If an issue is identified in the live environment, you can navigate to the platform dashboard, select a previous successful deployment, and click **"Restore"** or **"Publish"** to instantly revert the live site to the older, stable version.
3. **Local Testing:** Before deploying updates, features should be thoroughly tested locally to minimize the need for production rollbacks.
