function PrepareAssets() {
	Crafty.sprite(32, "assets/Level.png", {
		Platform0:  [0, 0],
		Platform1:  [1, 0],
		Platform2:  [2, 0],
		Platform3:  [3, 0],
		Platform4:  [0, 1],
		Platform5:  [1, 1],
		Platform6:  [2, 1],
		Platform7:  [3, 1],
		Platform8:  [0, 2],
		Platform9:  [1, 2],
		Platform10: [2, 2],
		Platform11: [3, 2],
		Platform12: [0, 3],
		Platform13: [1, 3],
		Platform14: [2, 3],
		Platform15: [3, 3]
	});

	Crafty.sprite(28, "assets/Character.png", {
		Idle: [0, 0],
		Face: [0, 6, 2, 2],
		Other:[2, 6, 2, 2]
	});

	Crafty.sprite(8, "assets/Small.png", {
		Bullet: [0, 0],
	})
}

function CreateComponents() {
	
	Crafty.c("Platform");

	Crafty.c("Death");

	Crafty.c("Warp", { to: null, Warp: function(to) { this.to = to; return this; }})
	
	Crafty.c("Slider", { side: null, Slider: function(side) { this.side = side; return this; }});

	Crafty.c("HitBox", {
		HitBox: function(x, y, w, h) {
			this.requires("2D, Collision")
				.attr({ x: x, y: y, w: w, h: h })
				.collision([0, 0], [0, h], [w, h], [w, 0]);
			return this;
		}
	});

	Crafty.c("Grabber", {
		side: null,
		range: 4
		,
		Grabber: function(px, py, side) {
			var x = px - this.range;
			var y = py;
			var w = 2 * this.range;
			var h = 2 * this.range;
			if (side == "Right") { x = px + 32 - this.range; }
			
			this.requires("2D, Collision")
				.attr({ x: x, y: y, h: h, w: w })
				.collision([0, 0], [0, h], [w, h], [w, 0]);
			this.side = side;
			
			return this;
		}
		,
		GrabX: function() {
			if      (this.side == "Left")  { return this.x + this.range - 28; }
			else if (this.side == "Right") { return this.x + this.range; }
		}
		,
		GrabY: function() {
			if      (this.side == "Left")  { return this.y; }
			else if (this.side == "Right") { return this.y; }
		}
	});

	Crafty.c("Character", {
		Character: function() {
			this._callback = false;
			this._waitFor = "";
			
			this
			.requires("Idle, SpriteAnimation")
			.animate("Idle", 0, 0, 3)
			.animate("WalkRight", 0, 1, 3)
			.animate("WalkLeft", 0, 2, 3)
			.animate("GrabLeft", 0, 3, 3)
			.animate("GrabRight", 0, 4, 3)
			.animate("Death", 0, 5, 3)
			.bind("Moved", function (arg) {
				if (arg.x > 0 && !this.isPlaying("WalkRight")) { this.stop().animate("WalkRight", 30, -1); }
				if (arg.x < 0 && !this.isPlaying("WalkLeft")) { this.stop().animate("WalkLeft", 30, -1); }
				if (arg.x == 0 && !this.isPlaying("Idle")) { this.stop().animate("Idle", 30, -1); }

				if (arg.grab) {
					if (arg.x > 0 && !this.isPlaying("GrabLeft")) { this.stop().animate("GrabLeft", 30, -1); }
					if (arg.x < 0 && !this.isPlaying("GrabRight")) { this.stop().animate("GrabRight", 30, -1); }
				}

				if (arg.slide) {
					if (arg.x > 0 && !this.isPlaying("GrabLeft")) { this.stop().animate("GrabLeft", 30, -1); }
					if (arg.x < 0 && !this.isPlaying("GrabRight")) { this.stop().animate("GrabRight", 30, -1); }
				}
			})
			.bind("Died", function(callback) {
				this.stop().animate("Death", 30);
				this._callback = callback;
				this._waitFor = "Death";
			})
			.bind("EnterFrame", function() {
				if (this._callback && !this.isPlaying(this._waitFor)) {
					this._callback();
				}
			})
			;

			this.animate("Idle", 30, -1);
			
			return this;
		}
	});

	Crafty.c("Controller", {
		Controller: function (currentLevel) {
			this._level = currentLevel;
			this._lock = false;
			
			this._oldx = this.x;
			this._oldy = this.y;
			this._g = 0.3;
			this._s = 1.5;
			this._maxs = 16;

			this._jump = 0;
			this._jumppower = [5, 4];
			this._maxjump = 2;
			this._slide= 0;
			this._grab = 0;
			this._grablock = false;

			this._lhand = Crafty.e("HitBox").HitBox(0, 0, 8, 8);
			this._rhand = Crafty.e("HitBox").HitBox(20, 0, 8, 8);
			
			this.requires("Keyboard, Collision")
			// .collision([3, 4], [3, 29], [27, 29], [27, 4])
			.collision([16, 16], [16, 17], [17, 17], [17, 16])
			.attach(this._lhand)
			.attach(this._rhand)
			.bind("KeyDown", function() {
				if (this.isDown("UP_ARROW")) {
					if (this._jump < this._maxjump) {
						this._oldy = this.y + this._jumppower[this._jump];
						this._jump += 1;
						this._grab = 0;
						this._slide= 0;
						this._grablock = true;
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
				// No control conditions
				if (this.IsLocked() || this._grab == 1) {
					this._oldx = this.x;
					this._oldy = this.y;
					return this;
				}
				
				var safex = this.x;
				var safey = this.y;

				var grabbed = this._rhand.hit("Grabber") || this._lhand.hit("Grabber");
				// console.log("false and " + !!this._grablock);
				if (grabbed) {
					if (!this._grablock && (this.y - this._oldy > 0)) {
						var o = grabbed[0].obj;
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
						this._slide= 0;
					}
				} else {
					this._grablock = false;
				}

				if (this._grab == 0) {
					if (this._slide) {
						this.y += this._slide;//(this.y - this._old.y) + this._g;
					} else {
						this.y += this._g + safey - this._oldy - this._slide;//(this.y - this._old.y) + this._g;
					}

					if (this.hit("Platform")) {
						if (this.y - this._oldy > this._maxs) {
							this.trigger("Died", this.Die);
							this.Lock();
							return this;
 						} else {
							this.y = safey;
							this._jump = 0;
						}
					}
					
					if (this.isDown("LEFT_ARROW")) { this.x -= this._s; }
					if (this.isDown("RIGHT_ARROW")) { this.x += this._s; }

					this._slide = 0;
					if (this.hit("Platform")) {
						var test = this.hit("Slider");
						this.x = safex;
						if (test && (this.y - safey > 0)) {
							this._slide = 1;
							Crafty.audio.play("Slide", 1, 0.4);
							this._jump = 0;
							if (test[0].obj.side == "Left") safex +=1
							else safex -= 1;
						}
					}

					if (this.hit("Death")) {
						this.trigger("Died", this.Die);
						this.Lock();
						return this;
					}

					warp = this.hit("Warp");
					if (warp) {
						Crafty.scene(warp[0].obj.to);
						return this;
					}

					this._oldx = safex; this._oldy = safey;
				}
				
				this.trigger("Moved", {
					x: this.x - this._oldx,
					y: this.y - this._oldy,
					jump: this._jump,
					grab: this._grab,
					slide:this._slide });
			})
			;
			
			return this;
		}
		,
		Lock: function() { this._lock = true; return this; }
		,
		Unlock: function() { this._lock = false; return this; }
		,
		IsLocked: function() { return this._lock; }
		,
		Die: function() {
			this.Unlock();
			Crafty.scene(this._level);
		}
	});

	Crafty.c("Billboard", {
		Billboard: function(x, y, w, h, sprite) {
			console.log("x " + x + " y " + y + " w " + w + " h " + h);
			
			this.requires("2D, Canvas");
			
			this._size = 64;
			
			this._text = [ null, null, null, null ];
			this._text[0] = Crafty.e("2D, Canvas, Text").attr({ x: this._size, y:  0, w: w - this._size, h: 16 });
			this._text[1] = Crafty.e("2D, Canvas, Text").attr({ x: this._size, y: 16, w: w - this._size, h: 16 });
			this._text[2] = Crafty.e("2D, Canvas, Text").attr({ x: this._size, y: 32, w: w - this._size, h: 16 });
			this._text[3] = Crafty.e("2D, Canvas, Text").attr({ x: this._size, y: 48, w: w - this._size, h: 16 });
			
			this._sprite = sprite;

			this.attach(this._text[0])
				.attach(this._text[1])
				.attach(this._text[2])
				.attach(this._text[3])
				.attach(this._sprite);
			this.attr({ x: x, y: y });

			return this;
		}
		,
		SetText: function(t0, t1, t2, t3) {
			console.log(this._text);
			this._text[0].text(t0);
			this._text[1].text(t1);
			this._text[2].text(t2);
			this._text[3].text(t3);
			return this;
		}
		,
		Show: function() {
			this._text[0].visible = true;
			this._text[1].visible = true;
			this._text[2].visible = true;
			this._text[3].visible = true;
			this._sprite.visible = true;
			this.visible = true;
			return this;
		}
		,
		Hide: function() {
			this._text[0].visible = false;
			this._text[1].visible = false;
			this._text[2].visible = false;
			this._text[3].visible = false;
			this._sprite.visible = false;
			this.visible = false;
			return this;
		}
	});
}

function GenerateLevel(map, nextLevel) {
	for (var j = 0; j < map.length; j++) {
		for (var i = 0; i < map[j].length; i++) {
			if (map[j][i] != 0) {
				var x = 32 * i;
				var y = 32 * j;
				
				var type = "2D, Canvas, Platform" + map[j][i];
				switch (map[j][i]) {
					default:
						Crafty.e(type + ", Platform").attr({ x: x, y: y, z: 2 });
						break;
					case 4:
						Crafty.e(type + ", Platform, Slider").Slider("Right").attr({ x: x, y: y, z: 2 });
						break;
					case 5:
						Crafty.e(type + ", Platform, Slider").Slider("Left").attr({ x: x, y: y, z: 2 });
						break;
					case 13:
						Crafty.e(type + ", Death").attr({ x: x, y: y, z: 2 });
						break;
					case 14:
						Crafty.e(type + ", Warp").Warp(nextLevel).attr({ x: x, y: y, z: 2 });
						break;
				}
				
				
				if      (map[j][i] == 2) { Crafty.e("Grabber").Grabber(x, y, "Left"); }
				else if (map[j][i] == 3) { Crafty.e("Grabber").Grabber(x, y, "Right"); }
			}
		};
	};
}
