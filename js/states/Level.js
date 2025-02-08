export default class Level extends Phaser.Scene {
    constructor() {
        super({ key: 'Level' });
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Create platforms group
        this.platforms = this.physics.add.staticGroup();
        this.createPlatforms();

        // Create player
        this.player = this.createPlayer();

        // Create enemies
        this.enemies = this.physics.add.group();
        this.createEnemies();

        // Create collectibles
        this.collectibles = this.physics.add.group();
        this.createCollectibles();

        // Set up collisions
        this.setupCollisions();

        // Set up controls
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createPlatforms() {
        // Create ground
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();

        // Create platforms
        this.platforms.create(600, 400, 'platform');
        this.platforms.create(50, 250, 'platform');
        this.platforms.create(750, 220, 'platform');
    }

    createPlayer() {
        const player = this.physics.add.sprite(100, 450, 'player');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        return player;
    }

    createEnemies() {
        // Create procrastination monster
        const enemy = this.enemies.create(400, 200, 'procrastination');
        enemy.setBounce(0.2);
        enemy.setCollideWorldBounds(true);
        enemy.setVelocityX(100);
    }

    createCollectibles() {
        // Create code snippets
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(0, 800);
            const y = Phaser.Math.Between(0, 400);
            const collectible = this.collectibles.create(x, y, 'code-snippet');
            collectible.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        }
    }

    setupCollisions() {
        // Player collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.collectibles, this.platforms);

        // Enemy collision with player
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);

        // Collectible collision with player
        this.physics.add.overlap(this.player, this.collectibles, this.collectItem, null, this);
    }

    update() {
        // Handle player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('walk', true);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('walk', true);
            this.player.flipX = false;
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('idle');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
            this.player.anims.play('jump');
        }

        // Update enemy movement
        this.updateEnemies();
    }

    updateEnemies() {
        this.enemies.children.iterate((enemy) => {
            if (enemy.body.velocity.x > 0 && enemy.x > 750) {
                enemy.setVelocityX(-100);
            } else if (enemy.body.velocity.x < 0 && enemy.x < 50) {
                enemy.setVelocityX(100);
            }
        });
    }

    hitEnemy(player, enemy) {
        // Implement player-enemy collision logic
        this.scene.start('InterviewState');
    }

    collectItem(player, collectible) {
        collectible.destroy();
        // Implement collectible logic
    }
}
