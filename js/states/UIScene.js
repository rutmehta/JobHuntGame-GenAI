export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }
    
    create() {
        console.log("UIScene started");
        console.log('unmuteIcon loaded?', this.textures.exists('unmuteIcon'));

        // Add mute button
        this.isMuted = false;
        this.muteButton = this.add.image(760, 40, 'unmuteIcon')
            .setInteractive()
            .setScrollFactor(0)
            .setDepth(1000)
            .setScale(0.05);

        // Handle mute/unmute
        this.muteButton.on('pointerdown', () => {
            this.isMuted = !this.isMuted;
            this.sound.mute = this.isMuted;
            this.muteButton.setTexture(this.isMuted ? 'muteIcon' : 'unmuteIcon');
        });

        // Start background music only if it’s not already playing
        this.input.once('pointerdown', () => {
            if (!this.bgMusic) {
                this.bgMusic = this.sound.add('bgMusic', {
                    volume: 0.5,
                    loop: true
                });
                this.bgMusic.play();
            }
        });

        // Ensure UIScene is always on top
        this.scene.bringToTop('UIScene');
    }
}
