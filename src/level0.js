Crafty.scene("Level0", function () {

	Crafty.background("rgb(128, 128, 128)");
	// Crafty.audio.play("BGM", -1, 0.5);

	PrepareAssets();
	CreateComponents();
	
	level = [
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
[12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
[12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
	];
	GenerateLevel(level, "Level1");
	
	Crafty.viewport.clampToEntities = false;
	Crafty.viewport.init(20 * 32, 10 * 32);

	Crafty.c("Looper", {
		Looper: function(init, loop, next) {
			this._exit = false;

			this._init = init;
			this._loop = loop;

			this._next = next;
			
			return this;
		}
		,
		Start: function() {
			this._init();
			if (this._loop) this.bind("EnterFrame", this._loop);
		}
		,
		Stop: function() {
			this.unbind("EnterFrame", this._loop);
			if (this._next) this._next.Start();
		}
	});

	Crafty.c("KeyPressed", {
		KeyPressed: function(key) {
			this._key = key;
			this._last = false;
			this._state = false;
			this.requires("Keyboard")
				.bind("EnterFrame", function () {
					state = this.isDown(this._key);
					this._state = (!this._last && state != this._last);
					this._last = state;
					console.log(this._state);
				});
			return this;
		}
		,
		IsPressed: function() { return this._state; }
	});

	function SetLight(light) {
		Crafty.background("rgb(" + light + ", " + light + ", " + light + ")");	
	}
	
	light = 224;
	SetLight(light);
	
	speed = 1;
	finishx = 32 * 1;
	finishy = 32 * (level.length - 5) + 4;
	startx = finishx + 32 * 10;
	starty = finishy;
	
	player = Crafty.e("2D, Canvas, Controller, Character").Character().Controller("Level0");
	demonio = Crafty.e("2D, Canvas, Billboard")
		.Billboard(player.x + 0.5 * player.w - 4 * 32, player.y - 3 * 32, 8 * 32, 2 * 32,
			Crafty.e("2D, Canvas, Face").attr({ x: 0, y: 0, w: 64, h: 64 }))
		.SetText("This is just another day for Demonio")
		.Hide();
	godio = Crafty.e("2D, Canvas, Billboard")
		.Billboard(player.x + 0.5 * player.w - 4 * 32, player.y - 3 * 32, 8 * 32, 2 * 32,
			Crafty.e("2D, Canvas, Other").attr({ x: 0, y: 0, w: 64, h: 64 }))
		.Hide();
	keys = Crafty.e("2D, KeyPressed").KeyPressed("SPACE");
	
	MoveToLevel1 = Crafty.e("Looper").Looper(function() { Crafty.scene("Level1"); }, false, false);
	
	Shaking22 = Crafty.e("Looper").Looper(
		function () { demonio.Show().SetText("Demonio:", '"I knew it!"', '"You piece of..."', '"How do I get back now?"', '"..."'); }
		, function () { if (keys.IsPressed()) this.Stop(); }
		, MoveToLevel1);
	
	shake2 = 80;
	Shaking21 = Crafty.e("Looper").Looper(
		function() { demonio.Hide(); Crafty.audio.play("Quake"); }
		, 
		function() {
			shake2 -= 1;
			if (shake2 > 0) Crafty.viewport.follow(player, Crafty.math.randomInt(0, 10), Crafty.math.randomInt(0, 10));
			else this.Stop();
		}
		, Shaking22);
	
	Talk22 = Crafty.e("Looper").Looper(
		function () { demonio.Show().SetText("Demonio:", '"!!! Stop that!"', '"I was just going back home!"'); godio.Hide(); }
		, function () { if (keys.IsPressed()) this.Stop(); }
		, Shaking21);
	
	Talk21 = Crafty.e("Looper").Looper(
		function () { demonio.Hide(); godio.Show(); Crafty.audio.play("Talk"); }
		, function () { if (keys.IsPressed()) this.Stop(); }
		, Talk22);
	
	Talk12 = Crafty.e("Looper").Looper(
		function () { demonio.Show().SetText("Demonio:", '"Seriously? Again?!?"'); godio.Hide(); }
		, function () { if (keys.IsPressed()) this.Stop(); }
		, Talk21);
	
	Talk11 = Crafty.e("Looper").Looper(
		function () { demonio.Hide(); godio.Show(); Crafty.audio.play("Talk"); }
		, function () { if (keys.IsPressed()) this.Stop(); }
		, Talk12);
	
	Shaking12 = Crafty.e("Looper").Looper(
		function () { demonio.Show().SetText("Demonio:", '"Wow, it\'s shAAaakIIinng PpreTty badDLy!!"'); }
		, function () { if (keys.IsPressed()) this.Stop(); }
		, Talk11);
	
	shake1 = 80;
	Shaking11 = Crafty.e("Looper").Looper(
		function() { demonio.Hide(); Crafty.audio.play("Quake"); }
		, 
		function() {
			shake1 -= 1;
			if (shake1 > 0) Crafty.viewport.follow(player, Crafty.math.randomInt(0, 10), Crafty.math.randomInt(0, 10));
			else this.Stop();
		}
		, Shaking12);
	
	PlayerSurprised = Crafty.e("Looper").Looper(
		  function() { demonio.Show().SetText("Demonio:", '"Ugh..."', '"What is happening?"'); }
		, function() { if (keys.IsPressed()) this.Stop(); }
		, Shaking11);
	
	LightsOff = Crafty.e("Looper").Looper(
		function() { demonio.Hide(); }
		,
		function() {
			if (light > 128) {
				light -= 1;
				SetLight(light);
			} else {
				this.Stop();
			}
		}
		, PlayerSurprised);

	PlayerWalks = Crafty.e("Looper").Looper(
		function() {
			player.Lock().stop().animate("WalkLeft", 30, -1);
			player.attach(demonio).attach(godio).attr({ x: startx, y: starty });
			demonio.Show();
			Crafty.viewport.follow(player, 0, 0);
		}
		,
		function() {
			if (player.x > finishx) {
				player.x -= speed;
			} else {
				player.stop().animate("Idle", 30, -1);
				this.Stop();
			}
		}
		, LightsOff);

	PlayerWalks.Start();
	
	return;
	
	step1 = Crafty.e("Looper").Looper(
		function() {
			Crafty.scene("Level1");
			// player.Lock().stop().animate("WalkLeft", 30, -1);
		}
		,
		function() {
			Crafty.scene("Level1");
		}
		);

	MoveToLevel1.Start();
	

	id = player.bind("EnterFrame", function() {
		if (this.x > finishx) this.x -= speed;
		else {
			this.stop();
			this.unbind("EnterFrame", id)
		}
	});

	player.attach(billboard).attr({ x: startx, y: starty })

});
