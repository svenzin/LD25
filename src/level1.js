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
		side: null,
		range: 2
		,
		Grabber: function(px, py, side) {
			var x = px - this.range;
			var y = py;
			var w = 2 * this.range;
			var h = 2 * this.range;
			if (side == "Right") { x = px + 32 - this.range; }
			
			this.requires("2D, Collision, WiredHitBox")
				.attr({ x: x, y: y, h: h, w: w })
				.collision([0, 0], [0, h], [w, h], [w, 0]);
			this.side = side;
			
			return this;
		}
		,
		GrabX: function() {
			if      (this.side == "Left")  { return this.x + 2 * this.range - 28; }
			else if (this.side == "Right") { return this.x ; }
		}
		,
		GrabY: function() {
			if      (this.side == "Left")  { return this.y; }
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
			[5, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 2, 1, 1, 1, 1, 3, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 2, 3, 0, 0, 0, 0, 2, 3, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[5, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
			[4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6]
		];

		for (var j = 0; j < level.length; j++) {
			for (var i = 0; i < level[j].length; i++) {
				if (level[j][i] != 0) {
					var x = 32 * i;
					var y = 32 * j;
					
					Crafty.e("2D, DOM, Platform" + level[j][i] + ", Platform").attr({ x: x, y: y });
					
					if      (level[j][i] == 2) { Crafty.e("Grabber").Grabber(x, y, "Left"); }
					else if (level[j][i] == 3) { Crafty.e("Grabber").Grabber(x, y, "Right"); }
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

				if (arg.grab) {
					if (arg.x > 0 && !this.isPlaying("GrabLeft")) { this.stop().animate("GrabLeft", 30, -1); }
					if (arg.x < 0 && !this.isPlaying("GrabRight")) { this.stop().animate("GrabRight", 30, -1); }
				}
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
	Crafty.c("HitBox", {
		HitBox: function(x, y, w, h) {
			this.requires("2D, Collision, WiredHitBox")
				.attr({ x: x, y: y, w: w, h: h })
				.collision([0, 0], [0, h], [w, h], [w, 0]);
			return this;
		}
	});
	Crafty.c("Controller", {
		Controller: function () {
			this._oldx = this.x;
			this._oldy = this.y;
			this._g = 0.4;

			this._jump = 0;
			this._grab = 0;
			this._grablock = false;

			this._lhand = Crafty.e("HitBox").HitBox(0, 0, 4, 4);
			this._rhand = Crafty.e("HitBox").HitBox(24, 0, 4, 4);
			
			this.requires("Keyboard, Collision, WiredHitBox")
			// .collision([3, 4], [3, 29], [27, 29], [27, 4])
			.collision([16, 16], [16, 17], [17, 17], [17, 16])
			.attach(this._lhand)
			.attach(this._rhand)
			.bind("KeyDown", function() {
				if (this.isDown("UP_ARROW")) {
					if (this._jump == 0) {
						this._oldy = this.y + 8;
						this._jump = 1;
						this._grab = 0;
						this._grablock = true;
						Crafty.audio.play("Jump");
					}
					else if (this._jump == 1) {
						this._oldy = this.y + 8;
						this._jump = 1;
						Crafty.audio.play("Jump");
					}
				}
				if (this.isDown("DOWN_ARROW")) {
					if (this._grab == 1) {
						this._jump = 0;
						this._grab = 0;
						this._grablock = true;
					}
				}
			})
			.bind("EnterFrame", function () {
				
				var safex = this.x;
				var safey = this.y;

				if (this._grab == 1) {

				} else {
					this.shift(0, this._g + safey - this._oldy);//(this.y - this._old.y) + this._g;
					
					if (this.isDown("LEFT_ARROW")) { this.shift(-2, 0); }
					if (this.isDown("RIGHT_ARROW")) { this.shift(2, 0); }
					// if (this.isDown("LEFT_ARROW")) { this.x -= 2; }
					// if (this.isDown("RIGHT_ARROW")) { this.x += 2; }

					var grabbed = this._rhand.hit("Grabber") || this._lhand.hit("Grabber");
					console.log(this._grablock);
					if (grabbed) {
						if (!this._grablock) {
							var o = grabbed[0].obj;
							console.log(o);
							console.log(o.x);
							console.log(o.y);
							this.x = o.GrabX();
							this.y = o.GrabY();
							if (o.side == "Left") {
								this._oldx = this.x + 1;
							} else if (o.side == "Right") {
								this._oldx = this.x - 1;
							}
							this._oldy = this.y;
							this._grab = 1;
							this._jump = 0;
						}
					} else {
						this._grablock = false;
					}

					if (this._grab == 0) {					
						if (this.hit("Platform")) {
							this.y = safey;
							this._jump = 0;
						}
						
						if (this.hit("Platform")) { this.x = safex;  }

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
		
		.Character()
		.Controller()
		.attr({ x: 50, y: 50 })
		;

});
