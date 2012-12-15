Crafty.scene("Level1", function () {

	Crafty.background("rgb(128, 128, 128)");

	Crafty.sprite(32, "assets/Level.png", {
		Platform1: [0, 0],
		Platform2: [1, 0],
		Platform3: [2, 0]
	});

	Crafty.sprite(32, "assets/Character.png", {
		Idle: [0, 0],
	});

	function GenerateLevel() {
		var level = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 2, 1, 1, 3, 0, 0, 0, 0, 0, 0, 2, 1, 1, 3, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		];

		Crafty.c("Platform");
		for (var j = 0; j < level.length; j++) {
			for (var i = 0; i < level[j].length; i++) {
				if (level[j][i] != 0) {
					Crafty.e("2D, DOM, Platform" + level[j][i] + ", Platform")
						.attr({ x: 32 * i, y: 32 * j});
				}
			};
		};
	}

	GenerateLevel();

	Crafty.c("Character", {
		Character: function() {
			this
			.requires("Idle, SpriteAnimation")
			
			return this;
		}
	});
	Crafty.e("2D, DOM, Idle, SpriteAnimation, Twoway, Collision, WiredHitBox")
		.attr({ x: 50, y: 50 })
		.animate("Idle", 0, 0, 3)
		.animate("WalkRight", 0, 1, 3)
		.animate("WalkLeft", 0, 2, 3)
		.animate("Idle", 30, -1)
		.twoway(2, 8)
		.bind("NewDirection", function (direction) {
			if (direction.x > 0 && !this.isPlaying("WalkRight")) { this.stop().animate("WalkRight", 30, -1); }
			if (direction.x < 0 && !this.isPlaying("WalkLeft")) { this.stop().animate("WalkLeft", 30, -1); }
			if (direction.x == 0) { this.stop().animate("Idle", 30, -1); }
		})
		// .gravity("Platform")
		// .gravityConst(0.5);

});
