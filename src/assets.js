PrepareAssets: function() {
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
	});

	Crafty.sprite(8, "assets/Small.png", {
		Bullet: [0, 0],
	})
}
