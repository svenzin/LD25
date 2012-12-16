Crafty.scene("MainMenu", function () {
	
	Crafty.background("rgb(128, 128, 128)");

	Crafty.sprite(32, "assets/MainMenu.png", {
		Play: [0, 0, 5, 2],
		PlaySelected: [0, 2, 5, 2]
	});

	Crafty.audio.play("BGM", -1, 0.2);
	
	Crafty.e("2D, Canvas, Mouse, Sprite, Play")
		.attr({ x: 400, y: 350})
		.sprite(0, 0, 5, 2)
		.bind("MouseOver", function () { this.sprite(0, 2, 5, 2); Crafty.audio.play("Select", 1); })
		.bind("MouseOut",  function () { this.sprite(0, 0, 5, 2); })
		.bind("Click",     function () { Crafty.scene("Level1"); });
});
