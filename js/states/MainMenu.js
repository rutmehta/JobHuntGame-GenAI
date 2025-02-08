export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Add game title
        const title = this.add.image(400, 150, 'title');
        title.setScale(0.8);

        // Create menu buttons
        this.createButton(400, 300, 'Start Game', () => this.startGame());
        this.createButton(400, 380, 'Options', () => this.showOptions());
        this.createButton(400, 460, 'Credits', () => this.showCredits());
    }

    createButton(x, y, text, callback) {
        const button = this.add.image(x, y, 'button');
        button.setInteractive();

        const buttonText = this.add.text(x, y, text, {
            font: '24px Arial',
            fill: '#ffffff'
        });
        buttonText.setOrigin(0.5);

        button.on('pointerover', () => {
            button.setTint(0xcccccc);
        });

        button.on('pointerout', () => {
            button.clearTint();
        });

        button.on('pointerdown', callback);
    }

    startGame() {
        this.scene.start('Level');
    }

    showOptions() {
        // Implement options menu
        console.log('Options menu - To be implemented');
    }

    showCredits() {
        // Implement credits screen
        console.log('Credits screen - To be implemented');
    }
}
