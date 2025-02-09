export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        // Add background
        this.add.image(400, 300, 'menu_bg');

        // Create the background music sound instance with looping enabled
        this.bgMusic = this.sound.add('bgMusic', {
            volume: 0.5, // Adjust volume as needed
            loop: true
        });

        // Play the background music
        this.bgMusic.play();

        // Title text
        this.add.text(400, 150, 'CS Career Quest', {
            font: '48px Arial',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Button style configuration
        const buttonStyle = {
            font: '24px Arial',
            fill: '#ffffff',
            padding: { x: 20, y: 10 },
            backgroundColor: '#2d2d2d'
        };

        // Play Button
        const playButton = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 60,
            'Start Job Hunt',
            buttonStyle
        )
        .setOrigin(0.5)
        .setScale(0.8)
        .setInteractive();

        // Tutorial Button
        const tutorialButton = this.add.text(
            this.cameras.main.centerX,
            playButton.y + 70,
            'Career Guide',
            buttonStyle
        )
        .setOrigin(0.5)
        .setScale(0.8)
        .setInteractive();

        // Credits Button
        const creditsButton = this.add.text(
            this.cameras.main.centerX,
            tutorialButton.y + 70,
            'Office Credits',
            buttonStyle
        )
        .setOrigin(0.5)
        .setScale(0.8)
        .setInteractive();

        // Button interactivity
        playButton.on('pointerover', () => playButton.setBackgroundColor('#4d4d4d'));
        playButton.on('pointerout', () => playButton.setBackgroundColor('#2d2d2d'));
        playButton.on('pointerdown', () => this.scene.start('Level'));

        tutorialButton.on('pointerover', () => tutorialButton.setBackgroundColor('#4d4d4d'));
        tutorialButton.on('pointerout', () => tutorialButton.setBackgroundColor('#2d2d2d'));
        tutorialButton.on('pointerdown', () => this.scene.start('Tutorial'));

        creditsButton.on('pointerover', () => creditsButton.setBackgroundColor('#4d4d4d'));
        creditsButton.on('pointerout', () => creditsButton.setBackgroundColor('#2d2d2d'));
        creditsButton.on('pointerdown', () => this.scene.start('Credits'));
    }
}
