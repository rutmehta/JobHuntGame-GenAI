export default class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Preloader' });
    }

    preload() {
        // Create loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        // Loading text
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            font: '20px monospace',
            fill: '#ffffff'
        });
        loadingText.setOrigin(0.5, 0.5);

        // In Preloader.js inside the preload() method
        this.load.audio('bgMusic', 'assets/audio/background_music.mp3');

        // Preloader.js
        this.load.image('muteIcon', 'assets/images/mute.png');
        this.load.image('unmuteIcon', 'assets/images/unmute.png');

        // Update progress bar
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        // Load game assets
        this.loadGameAssets();
    }

    loadGameAssets() {
        // Player sprites
        this.load.spritesheet('player', 'assets/sprites/player.png', {
            frameWidth: 110,
            frameHeight: 220
        });

        // Platform and background assets
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.image('LevelCompleteScreen', 'assets/images/LevelCompleteScreen.png');

        // Enemy sprites
        this.load.spritesheet('procrastination', 'assets/sprites/procrastination.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        // UI elements
        this.load.image('button', 'assets/images/button.png');
        this.load.image('title', 'assets/images/title.png');
    }

    create() {
        // Create animations
        this.createAnimations();
        
        // Launch the UI scene now that assets have been loaded
        this.scene.launch('UIScene');

        // Start the main menu
        this.scene.start('MainMenu');
    }

    createAnimations() {
        // Player animations
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'jump',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });
    }
}
