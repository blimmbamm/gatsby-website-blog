---
key: "project"
name: "Google Keep Clone"
date: "2025-02-03"
website: "https://google-keep-clone-cskh.onrender.com"
github: "https://github.com/blimmbamm/google-keep-clone"
stack: ["Angular", "RxJS", "Material", "TypeScript"]
---

My clone of Google's Keep app that I built using Angular, of course with reduced functionality. I did use some convenient components from Angular Material, like dialog, menu and ripples - but I would say, most of the things are implemented by myself. 

The app is not connected to a real backend, all data, initial or added, is stored in browser `localStorage`. However, everything is set up in a way such that my data/api functions technically return the same shape as Angular's `httpClient` would do in case of a real backend. For a slight visual loading effect, I introduced some random amount of delay to all these functions. 