Crafty.scene("Loader", function () {

	Crafty.background("rgb(0, 0, 0)");

	Crafty.audio.add("BGM", "assets/bgm.mp3");
	Crafty.audio.add("Jump", "assets/jump.mp3");
	Crafty.audio.add("Slide", "assets/slide.mp3");

	Crafty.load(["assets/MainMenu.png",
	             "assets/Level.png",
	             "assets/Character.png",
	             "assets/bgm.mp3",
	             "assets/select.mp3",
	             "assets/jump.mp3",
	             "assets/slide.mp3"
	             ], function () {
		Crafty.scene("MainMenu");
	});

});
