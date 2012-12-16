Crafty.scene("MainMenu", function () {
	
	Crafty.background("rgb(128, 128, 128)");
	Crafty.viewport.x = 0;
	Crafty.viewport.y = 0;

	Crafty.sprite(32, "assets/MainMenu.png", {
		Play: [0, 0, 5, 2],
		PlaySelected: [0, 2, 5, 2],
		Title: [0, 4, 20, 4],
	});

	Crafty.audio.play("BGM", -1, 0.2);

	Crafty.e("2D, Canvas, Title")
		.attr({x: 0, y: 0 })
		;
	
	Crafty.e("2D, Canvas, Mouse, Sprite, Play")
		.attr({ x: 240, y: 200})
		.sprite(0, 0, 5, 2)
		.bind("MouseOver", function () { this.sprite(0, 2, 5, 2); Crafty.audio.play("Select", 1); })
		.bind("MouseOut",  function () { this.sprite(0, 0, 5, 2); })
		.bind("Click",     function () { Crafty.scene("Level0"); });
});
