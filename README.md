# CS Student Job Quest

A unique platformer game that combines classic gaming mechanics with educational elements, simulating a computer science student's journey to secure a full-time job.

## Game Features

- **Platformer Mechanics**: Classic side-scrolling gameplay with jumping, running, and collecting items
- **Educational Elements**: Solve coding challenges and computer science problems
- **Interview Battles**: Face AI-powered interview questions in boss battles
- **Skill Progression**: Unlock new abilities as you advance through your career journey

## Game States

1. **Boot**: Initializes game configuration and basic assets
2. **Preloader**: Loads all game assets with a progress bar
3. **MainMenu**: Main game menu with options to start game, view options, and credits
4. **Level**: Main platforming gameplay with enemies and collectibles
5. **InterviewState**: Interview boss battles with AI-generated questions
6. **MiniGame**: Coding challenges and CS theory questions

## Setup Instructions

1. Clone the repository
2. Make sure you have a web server running (you can use Python's SimpleHTTPServer or any other local server)
3. Open `index.html` in your browser

## Development

The game is built using Phaser 3, a powerful HTML5 game framework. The codebase is organized into separate state files for better maintainability.

### Project Structure

```
├── index.html           # Main entry point
├── js/
│   ├── game.js         # Game configuration
│   └── states/         # Game states
│       ├── Boot.js
│       ├── Preloader.js
│       ├── MainMenu.js
│       ├── Level.js
│       ├── InterviewState.js
│       └── MiniGame.js
└── assets/            # Game assets (to be added)
    ├── images/
    └── sprites/
```

## Requirements

- Modern web browser with WebGL support
- Local web server for development

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.
