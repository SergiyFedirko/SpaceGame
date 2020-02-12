GameStates.GameWin = {
    handleEvent: function(event) {
        if (event.type === "keypress") {
            document.removeEventListener("keypress", this, false);
            this.state.start("Game");
        }
    },


    create: function() {
        this.add.sprite(0, 0, 'background');


        
        this.add.sprite(20, 30, 'gamewin');

       
        this.add.sprite(20, 300, 'taptoplay');


       
        document.addEventListener("keypress", this, false);


    },
    update: function() {

        
        if (this.input.pointer1.isDown) {
            this.state.start("Game");
        }

    }

};