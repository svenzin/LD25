Crafty.scene("Loader", function () {

	Crafty.background("rgb(0, 0, 0)");

	Crafty.load(["assets/MainMenu.png",
	             "assets/Level.png",
	             "assets/Character.png",
	             "assets/bgm.mp3",
	             "assets/select.mp3",
	             "assets/jump.mp3",
	             "assets/slide.mp3"
	             ], function () {
		Crafty.scene("Level1");
	});

});
