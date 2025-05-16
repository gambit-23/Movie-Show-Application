# 🎬 Movie-Show-Application

## 📌 Overview
Movie-Show-Application is a fully responsive and interactive frontend web app built using React.js, Tailwind CSS, and the TMDB API. It allows users to browse trending movies and TV shows, view details, manage a watchlist, and watch trailers — all through a clean, user-friendly interface.

The project is deployed on Vercel and includes CI/CD via GitHub Actions.

🔗 Live Demo: Now Showing - Movie & TV Explorer
---

## ✨ Features

### 📌 Home Page
- Navigation bar with logo, Home, and Watchlist buttons.

- Hero Poster section showcasing highlighted content.

- Grid layout displaying Movie/TV Show cards with:

- Title, rating, and popularity.

- Hover effect on desktop and tap effect on mobile for brief descriptions.

- Trailer Modal popup for watching trailers (if available via TMDB).

- Pagination support:

- Page navigation buttons.

- "Go to Page" input box to jump to a specific page.

### ⭐ Watchlist
- Add movies/TV shows from the home page using an Add button.

Once added, button changes to Remove (in both Home and Watchlist).

Watchlist displayed as a responsive table with:

Title, rating, popularity, genre.

Remove button for each item.

### 🔍 Search, Sort & Filter
-Search functionality to find specific titles.

Filter by genre.

Sort by:

Rating (ascending/descending)

Popularity (ascending/descending)

### ❌ Remove from Watchlist
- Remove items from the watchlist with a single click.

### 🎥 Trailer Modal Popup
- Click on any movie card to check for an available **trailer** using the **TMDB API**.
- If available, the trailer opens in a **modal popup** via YouTube embed.
- Fully **responsive** across all screen sizes.

---

## 🛠 Tech Stack
- **React.js** - Frontend framework
- **Tailwind CSS** - Styling
- **Axios** - API requests
- **TMDB API** - Movie & TV show data source
- **Local Storage** - Persistent watchlist

---

## 🚀 Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/Movie-Show-Application.git
cd Movie-Show-Application
```

2. **Install dependencies:**
```bash
npm install
```

3. **Get your TMDB API key**:
- Visit https://www.themoviedb.org/settings/api and generate a key.

4. **Create a `.env` file**:
```env
VITE_APP_TMDB_API_KEY=your_api_key_here
```

5. **Start the application:**
```bash
npm run dev
```

6. Open in browser:
```
http://localhost:5173
```

---

## 📸 Screenshots
- **Home Page**
![Home Screen](./public/screenshots/home-screen.jpg)

- **Watchlist**
![Watchlist Section](./public/screenshots/watchlist.jpg)

- **Trailer Modal**
![Trailer popup](./public/screenshots/trailer.jpg)

---

🔗 Visit Live
Explore the live application here:
👉 Now Showing - Movie & TV Explorer - https://now-showing.vercel.app/

---

## 🏆 Future Enhancements
- ✅ User authentication for personalized watchlists
- 📊 Additional filters (year, language, runtime)
- 🎭 Dark mode toggle
- 🌐 Internationalization (i18n)

---

## 🤝 Contributing
Feel free to **open an issue** or **submit a pull request**. Contributions are always welcome!

---

## 🚀 Enjoy Exploring Movies & TV Shows! 🍿