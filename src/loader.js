Crafty.scene("Loader", function () {

	Crafty.background("rgb(0, 0, 0)");

	Crafty.load(["assets/MainMenu.png",
	             "assets/Level.png",
	             "assets/Character.png"], function () {
		Crafty.scene("Level1");
	});

});
