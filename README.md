
🍽️ TastyTreats
A responsive recipe discovery web application built with vanilla JavaScript, HTML, and CSS. Users can browse popular recipes, filter by category/time/area/ingredients, save favorites, and place orders — all powered by the MealDB API.
🔗 Live Demo: https://goit-tastytreats.github.io/tasty-treats-js-project/

📌 Features

🔍 Search and filter recipes by category, preparation time, area, and ingredients
❤️ Save favorite recipes (persisted via localStorage)
🛒 Order form with name, phone, email, and comment fields
⭐ Rate individual recipes
📱 Fully responsive design (mobile, tablet, desktop)
👥 Team section showcasing contributors


🛠️ Technologies Used

HTML5, CSS3
Vanilla JavaScript (ES6+)
Vite — build tool
MealDB API — recipe data
GitHub Pages — deployment


🚀 Getting Started
Prerequisites

Node.js (v16 or higher)
npm (comes with Node.js)

Installation & Running Locally
bash# 1. Clone the repository
git clone https://github.com/Goit-TastyTreats/tasty-treats-js-project.git

# 2. Navigate into the project directory
cd tasty-treats-js-project

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
The app will be available at http://localhost:5173 (or the port shown in your terminal).
Build for Production
bashnpm run build

📁 Project Structure
tasty-treats-js-project/
├── src/               # JavaScript source files
├── partials/          # HTML partials
├── index.html         # Main page (recipe listing)
├── favorites.html     # Favorites page
├── package.json
└── vite.config.js

📄 Pages
PageDescriptionindex.htmlHome page — browse and filter recipesfavorites.htmlSaved/favorited recipes

👥 Team
NameRoleAbdullah Burak ÖzaslanTeam LeaderSevcan ÖzdemirScrum Master & PresentationDoga Ceren ErkekHeader Structure & LayoutGülistan UzunHero Section & Order NowMert KöroğluMain Recipe Blockİbrahim AteşRecipe List SectionPelda BegerFavorites SectionÖzan Erenay ŞenerSearch SectionMeryem ÖzkanFooter & Presentation

📝 Notes for QA Testers

The app fetches data from the MealDB API — an active internet connection is required.
Favorites are stored in localStorage; clearing browser data will reset them.
Tested on: Chrome, Firefox, Edge (latest versions).
Mobile breakpoints: 320px, 768px, 1280px.
