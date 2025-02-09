export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    create() {
        // Set world bounds (1600x600)
        this.physics.world.setBounds(0, 0, 1600, 600);

        // Create scrolling background
        this.bg = this.add.tileSprite(0, 0, 1600, 600, 'background');
        this.bg.setOrigin(0, 0);
        this.bg.setScrollFactor(0);

        // Create platforms group
        this.platforms = this.physics.add.staticGroup();
        
        // Create ground platform
        this.platforms.create(800, 580, 'platform').setScale(4).refreshBody().setImmovable(true);
        this.generateRandomPlatforms(4);

        // Create player
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);
        
        // Player animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        // Add collision
        this.physics.add.collider(this.player, this.platforms);

        // Set up camera
        this.cameras.main.setBounds(0, 0, 1600, 600);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // Set up controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    generateRandomPlatforms(count) {
        const bounds = {
            minX: 100, maxX: 1500,
            minY: 100, maxY: 500,
            minSpacing: 150
        };

        let prevX = -Infinity;
        for (let i = 0; i < count; i++) {
            let x, y;
            do {
                x = Phaser.Math.Between(bounds.minX, bounds.maxX);
                y = Phaser.Math.Between(bounds.minY, bounds.maxY);
            } while (Math.abs(x - prevX) < bounds.minSpacing);

            this.platforms.create(x, y, 'platform')
                .setImmovable(true)
                .setScale(Phaser.Math.FloatBetween(0.8, 1.2))
                .refreshBody();
            prevX = x;
        }
    }

    update() {
        // Handle movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
    
        // Handle jumping (both UP arrow and SPACE)
        if ((this.cursors.up.isDown || this.spaceKey.isDown) && this.player.body.blocked.down) {
            this.player.setVelocityY(-500); // Stronger jump
            this.player.anims.play('jump'); // Add this animation if needed
        }

        // Update background position
        this.bg.tilePositionX = this.cameras.main.scrollX;
    }
}
