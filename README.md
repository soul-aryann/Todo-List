# TO DO — Neo-Brutalist Daily Task Manager

A fast, responsive, calendar-integrated ToDo web application built entirely with vanilla web technologies. Designed with a custom neo-brutalist aesthetic, daily task scoping, and client-side persistence with zero external libraries or frameworks.

---

## Features

- **Calendar-Based Task Scoping**: Organize tasks by date with day-by-day navigation (`←` / `→`), direct native date picking, and a quick "Today" shortcut.
- **Client-Side Persistence**: Tasks are saved automatically to the browser's `localStorage`—no database or backend required.
- **Dynamic Status Filtering**: Filter views by `All`, `Active`, and `Completed` with real-time task counter badges.
- **Bulk Cleanup**: One-click "Clear Done" action to purge completed items for the selected date.
- **Neo-Brutalist Design**: High-contrast cyberpunk palette (`#2391FF`, `#FFF83F`, `#FFCD54`, `#F70063`), sharp rectangular geometry, brutalist hard drop shadows, and custom ambient grid canvas.
- **100% Vanilla**: Built strictly with HTML5, CSS3, and standard ES6 JavaScript.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessibility, native date inputs |
| **CSS3** | Vanilla styling, custom properties, responsive layout, hard shadows |
| **JavaScript (ES6)** | DOM manipulation, state management, event delegation, `localStorage` |

---

## Getting Started

### Prerequisites

Any modern web browser (Chrome, Firefox, Safari, Edge).

### Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/soul-aryann/Todo-List.git
   ```
2. Navigate into the directory:
   ```bash
   cd Todo-List
   ```
3. Open `index.html` directly in your browser:
   ```bash
   open index.html   # On macOS
   # or double-click index.html in your file explorer
   ```

---

## Project Structure

```text
├── index.html   # Main application markup & controls
├── style.css    # Neo-brutalist styling & responsive rules
└── script.js    # Application state, date scoping & localStorage sync
```
