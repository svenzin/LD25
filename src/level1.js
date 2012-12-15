Crafty.scene("Level1", function () {

	Crafty.background("rgb(128, 128, 128)");
	// Crafty.viewport.scale(2);

	Crafty.sprite(32, "assets/Level.png", {
		Platform1: [0, 0],
		Platform2: [1, 0],
		Platform3: [2, 0],
		Platform4: [3, 0],
		Platform5: [4, 0],
		Platform6: [5, 0],
		Platform7: [6, 0],
		GrabHold: [0, 1]
	});

	Crafty.sprite(28, "assets/Character.png", {
		Idle: [0, 0],
	});

	Crafty.audio.add("BGM", "assets/bgm.mp3");
	Crafty.audio.add("Jump", "assets/jump.mp3");
	Crafty.audio.add("Slide", "assets/slide.mp3");

	Crafty.c("Platform");
	Crafty.c("Grabber", {
		side: null
		,
		Grabber: function(side) {
			this.requires("GrabHold, Collision, WiredHitBox")
			this.side = side;
			if (side == "Left") { this.collision([0, 0], [0, 8], [8, 8], [8, 0]); }
			else if (side == "Right") { this.collision([26, 0], [26, 8], [32, 8], [32, 0]); }
			return this;
		}
		,
		GrabX: function() {
			if (this.side == "Left") { return this.x; }
			else if (this.side == "Right") { return this.x + 32; }
		}
		,
		GrabY: function() {
			if (this.side == "Left") { return this.y; }
			else if (this.side == "Right") { return this.y; }
		}
	});

	function GenerateLevel() {
		var level = [
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 3, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 2, 1, 1, 3, 0, 0, 0, 0, 0, 0, 2, 1, 1, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 3, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 2, 1, 1, 3, 0, 0, 0, 0, 0, 0, 2, 1, 1, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6]
		];

		for (var j = 0; j < level.length; j++) {
			for (var i = 0; i < level[j].length; i++) {
				if (level[j][i] != 0) {
					
					Crafty.e("2D, DOM, Platform" + level[j][i] + ", Platform")
						.attr({ x: 32 * i, y: 32 * j });
					
					if (level[j][i] == 2) {
						Crafty.e("2D, DOM, Grabber").attr({ x: 32 * i, y: 32 * j }).Grabber("Left");
					} else if (level[j][i] == 3) {
						Crafty.e("2D, DOM, Grabber").attr({ x: 32 * i, y: 32 * j }).Grabber("Right");
					}

				}
			};
		};
	}

	//Crafty.audio.play("BGM", -1, 0.5);
	GenerateLevel();

	Crafty.c("Character", {
		Character: function() {
			this
			.requires("Idle, SpriteAnimation")
			.animate("Idle", 0, 0, 3)
			.animate("WalkRight", 0, 1, 3)
			.animate("WalkLeft", 0, 2, 3)
			.animate("GrabLeft", 0, 3, 3)
			.animate("GrabRight", 0, 4, 3)
			.bind("Moved", function (arg) {
				if (arg.x > 0 && !this.isPlaying("WalkRight")) { this.stop().animate("WalkRight", 30, -1); }
				if (arg.x < 0 && !this.isPlaying("WalkLeft")) { this.stop().animate("WalkLeft", 30, -1); }
				if (arg.x == 0 && !this.isPlaying("Idle")) { this.stop().animate("Idle", 30, -1); }

				if (arg.grab && !this.isPlaying("GrabLeft")) { this.stop().animate("GrabLeft", 30, -1); }
			})
			;

			this.animate("Idle", 30, -1);
			
			return this;
		}
	});
	// Crafty.c("Joystick, Keyboard", {
	// 	Joystick: function(up, down, left, right) {
	// 		this._jUpKey = up;
	// 		this._jDownKey = down;
	// 		this._jLeftKey = left;
	// 		this._jRightKey = right;

	// 		this._jIsUp = false;
	// 		this._jIsDown = false;
	// 		this._jIsLeft = false;
	// 		this._jIsRight = false;

	// 		this.requires("Keyboard")
	// 		.bind("KeyDown", function() {
	// 			if ()
	// 		})
	// 	}
	// });
	Crafty.c("Controller", {
		Controller: function () {
			this._oldx = this.x;
			this._oldy = this.y;
			this._g = 0.4;

			this._jump = 0;
			this._grab = 0;
			
			this.requires("Keyboard, Collision, WiredHitBox")
			.collision([0, 0], [0, 30], [30, 30], [30, 0])
			.bind("KeyDown", function() {
				if (this.isDown("UP_ARROW")) {
					if (this._jump == 0) {
						this._oldy = this.y + 8;
						this._jump = 1;
						Crafty.audio.play("Jump");
					}
					else if (this._jump == 1) {
						this._oldy = this.y + 8;
						this._jump = 1;
						Crafty.audio.play("Jump");
					}
				}
			})
			.bind("EnterFrame", function () {
				
				var safex = this.x; var safey = this.y;

				if (this._grab == 1) {

				} else {
					this.y += this._g + safey - this._oldy;//(this.y - this._old.y) + this._g;
					
					var grabbed = this.hit("Grabber");
					// console.log(grabbed);
					if (grabbed) {
						var o = grabbed[0].obj;
						console.log(o);
						console.log(o.x);
						console.log(o.y);
						this.x = o.GrabX();
						this.y = o.GrabY();
						if (o.side == "Left") {
						} else if (o.side == "Right") {
							// this.x += 16;
						}
						this._grab = 1;
					}

					if (this._grab == 0) {					
						// if (this.hit("Platform")) {
							// this.y = safey;
							// this._jump = 0;
						// }
						
						if (this.isDown("LEFT_ARROW")) { this.x -= 2; }
						if (this.isDown("RIGHT_ARROW")) { this.x += 2; }

						// if (this.hit("Platform")) { this.x = safex;  }

						this._oldx = safex; this._oldy = safey;
					}
					
					this.trigger("Moved", {
						x: this.x - this._oldx,
						y: this.y - this._oldy,
						jump: this._jump,
						grab: this._grab });
				}
			})
			;
			
			return this;
		}
	});
	Crafty.e("2D, DOM, Controller, Character")
		.attr({ x: 50, y: 50 })
		.Controller()
		.Character()
		;

});
