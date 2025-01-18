---
key: "project"
name: "Onlineshop"
date: "2023-05-19"
website: "https://onlineshop-ze3g.onrender.com"
github: "https://github.com/blimmbamm/onlineshop"
stack: ["Node", "Express", "EJS", "MongoDB"]
---

This is my first (bigger) web development project after completing a web development bootcamp course, to practice the skills I acquired!

The web page is built with Express, EJS templating and a MongoDB Atlas database following the MVC pattern. I implemented some middleware for error handling, session-based authentication and CSRF protection for non-GET routes.

The website consists of a landing page where the three most viewed products are displayed, a product page, where you can explore categories and their products and a dynamic product detail page.

Users may add products to a shopping cart and/or login to see and manage their shopping cart. If the user is not logged in, the shopping cart will be temporary and will be deleted after a while of inactivity (alongside with all session data). If the user has a temporary shopping cart and then logs in, any temporary and potentially previously persisted shopping cart data will be merged and persisted in the database.

I hosted the app on Render, so ***please note*** that the website may (very much likely 😀) ***take some seconds to load***, because Render spins down free instance services after some time of inactivity.
