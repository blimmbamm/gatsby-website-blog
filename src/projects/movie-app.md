---
key: "project"
name: "Movie app"
date: "2023-10-16"
website: "https://movie-app-09vo.onrender.com"
github: "https://github.com/blimmbamm/movie-app"
stack: ["React", "React Router", "Nginx", "Docker"]
---

## Introduction

I  created this MPA movie web app to practice my React skills. The app is implemented in JavaScript (I really don't know why I didn't start with TypeScript earlier!), using React and React Router libraries and basic CSS for styling.

In general, the app fetches data from [The Movie DB](https://developer.themoviedb.org/docs/getting-started) which requires an API key. So I had to implement some proxy logic to keep my key secret! There are two versions of the app. 

## Using my own simple proxy server implementation

In my first solution I implemented a [simple backend](https://github.com/blimmbamm/movie-app-tmdb-proxy) in Express, where all requests from the frontend are sent to. The backend then constructs the respective request for TMDB and appends the API key. 

## Using Nginx and Docker

Later, I figured out that things could be solved way easier by using nginx. So I set up a server and dockerized it. 

## What you can do on the page

On the landing page, users can browse the current top movies according to TMDB. If the user is authenticated, he can also see his rating for the movie, or add or alter a rating, which then is stored in his list of rated movies. If the user is not authenticated, there is a link redirecting to the login page. Users can also create a guest session and then manage a temporary list of rated movies.

On the search page, users can search for movies by filtering genres (genre filter has OR-logic), actors and release years. Again, the user can see and update their ratings if authenticated.

The last page, the profile page, is only accessible to authenticated users and displays some user information (if available) and the users list of rated movies. Here, the user can also remove rated movies from his list.

I also had the idea of implementing some watchlist page, but, unfortunately, managing ratings is the only thing that is possible with both standard sessions and guest sessions.

## Notes

Please note that there is no movie detail page implemented because I found it non-beneficial considering the purpose of this web page to add that feature. Users are instead redirected to the respective movie detail page on TMDB.

I hosted the Docker container (and my own backend solution ) on Render, so ***please note*** that the website may (very much likely 😀) ***take some seconds to load*** both cases, because Render spins down free instance services after some time of inactivity.