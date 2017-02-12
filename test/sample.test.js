"use strict";

    /* StageMap */
    var map = 
    [
            [14,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6,  6, 14],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [23,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [ 9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [ 9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9,  9, 22],
            [14,  7,  7, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 14],
    ];
        
	/* GetContext & FirstCharacterLocale */
	var gc, px, py;
    var yoshiko_x = 4, yoshiko_y = 4; // Yoshiko First Locale
    var ex1 = 5, ey1 = 8;			// Enemy1 First Locale
	var ex2 = 7, ey2 = 10;			// Enemy2 First Locale
	var TimerID1;					// Timer ID for Enemy1 Action 
	var TimerID2;					// Timer ID for Enemy2 Action 

	/* ItemName & State */
	/* 0:False 1:True	  */
	/* Value is chaught by LocalStorage */
	var game_item = new Array()
		 game_item[0] = ["Key1", 0];


    var Event_Count = 0;
    var Event_Box = new Array();
    Event_Box[0] = ["ほのか:・・・・・・!?<br>"];
    Event_Box[1] = ["???:ふふふ、ここはもしかして、地上?<br>"];
    Event_Box[2] = ["???:ということはあなた達は、下劣で下等な人間ということですか?<br>"];
    Event_Box[3] = ["???:この身体は単なる器なのですから!!<br>"];
    Event_Box[4] = ["???:ヨハネにとってはこの姿はあくまで仮の姿なのですから。<br>"];
    Event_Box[5] = ["ヨハネ:おっと、名前を言ってしまいましたね。堕天使ヨハネ・・・<br>"];
    Event_Box[6] = ["ヨハネ:な、な・・・、に、人間風情が何を言って・・・<br>"];
    Event_Box[7] = ["善子:善子言うな!!<br>"];
    Event_Box[8] = ["善子:良い!?私はヨハネ、ヨハネなんだからねーー!!<br>"];
    Event_Box[9] = ["善子:善子言うなーー!!来るなーー!!<br>"];
    Event_Box[10] = ["ステージ1に戻ります。<br>"];
    Event_Box[11] = ["<br>"];

    /* Function for Parameter of Game */
    function init_param()
    {
		/* Check Last Locale */
       var last_locale = document.referrer;
        if(last_locale.substr(-12) == "stage_1.html")
        {
            px = 1;
            py = 12;
        }
        else if(last_locale.substr(-12) == "stage_5.html")
        {
            px = 1;
            py = 13;
        }
        else
        {
            px = 1;
            py = 13;
        }

		/* Check Item State */
		var check_key1 = sessionStorage.getItem('Key1');
		if(check_key1 == 1)
		{
			game_item[0][1] = 1;		
		}
        init();
    }



    /* Funciton for Initialization */

    function init() 
    {
        gc = document.getElementById("stage").getContext("2d");
        onkeydown = mykeydown;
		repaint();
		TimerID1 = setInterval(EnemyMove1, 250);	// Enemy Move
		TimerID2 = setInterval(EnemyMove2, 250);	// Enemy Move
		if(((px == ex1) && (py == ey1)) || ((px == ex2) && (py == ey2)))  			// Stop Interval
		{
			document.getElementById("commentarea").innerHTML = "Game Over" + "<br>";
			clearInterval(TimerID);    			
			location.reload();
		}
    }

    /* Funtion for Move Character1  */
    function u() { mykeydown({ keyCode: 38 }); }
    function d() { mykeydown({ keyCode: 40 }); }
    function l() { mykeydown({ keyCode: 37 }); }
    function r() { mykeydown({ keyCode: 39 }); }
    function Enter() { mykeydown({ keyCode: 13 }); }

    function EventStart()
    {
        var changeflag1;

        
            OutputEvent(Event_Count);
            Event_Count++;
        

        if(Event_Count > 11)
        {
            changeflag1 = 1;
        }
        else
        {
            changeflag1 = 0;
        }

        if(changeflag1 == 1)
        {
            location.assign("stage_1.html");
        }
    }

    function OutputEvent(Event_Count)
    {
            document.getElementById("commentarea").innerHTML = Event_Box[Event_Count] + "<br>";   
    }


    /* Funtion for Move Character2   */
    /* from 2 to 1 and draw          */
    //  sample for Event 
    function mykeydown(e) 
    {
        var dx0 = px, dx1 = px, dy0 = py, dy1 = py;
        switch (e.keyCode) 
        {
            case 13: 				                // Enter
                break;
            case 37: dx0--; dx1 -= 2;				// Left
                break;
            case 38: dy0--; dy1 -= 2;				// Up
                break;
            case 39: dx0++; dx1 += 2;				// Right
                break;
            case 40: dy0++; dy1 += 2;				// Down
                break;
        }

        if((e.keyCode == 13) && ((px == 4) && (py == 5)))                           // Event Start
        {
            EventStart();
            return;
        }

        /* Condition Next Point */
        // sample for Event 
        if ((map[dy0][dx0] & 0x2) == 0)             // Nothing Wall & Object --->Going 
        {
            if(map[dy0][dx0] == 9)                  // Normal State Comment
            {
                document.getElementById("commentarea").innerHTML = "出口を探そう!" + "<br>";
            }
            if(((dy0 == 13) && (dx0 == 1)) || ((dy0 == 13) && (dx0 == 2)))	// Door Flag
            {
                if(game_item[0][1] == 0)
                {
                    document.getElementById("commentarea").innerHTML = "ドアに鍵がかかっている" + "<br>";
                }
                else
                {
                    map[14][1] = 9;
                    map[14][2] = 9;
                    document.getElementById("commentarea").innerHTML = "鍵が開いた!!" + "<br>";
                }
			}
            if(((dy0 == 12) && (dx0 == 0)) || ((dy0 == 13) && (dx0 == 0)))         // Change1
            {
                location.assign("stage_1.html");
            }
            if(((dy0 == 14) && (dx0 == 1)) || ((dy0 == 14) && (dx0 == 2)))         // Change2
            {
                location.assign("stage_5.html");
            }
            if((dy0 == 4) && (dx0 == 4))
            {
                return;        
            }
            Event_Count = 0;                            // Initialize      
			px = dx0;									// Change Now
			py = dy0;									// Change Now
			if((px == ex1) && (py == ey1) || ((px ==ex2) && (py == ey2)))  			// Game Over
			{
				document.getElementById("commentarea").innerHTML = "Game Over" + "<br>";
				clearInterval(TimerID);
				location.reload();   			
			}
        }
        repaint();
    }
    // sample for Event end 

	// Enemy1 Move Action
	// Switch Parameter is Random Num
	function EnemyMove1() 
	{
		var dx0 = ex1, dx1 = ex1, dy0 = ey1, dy1 = ey1;
		var rnd = Math.floor(Math.random() * 4);
		switch (rnd) 
		{
			case 0: dx0--; dx1 -= 2;				// Left
					break;
			case 1: dy0--; dy1 -= 2;				// Up
					break;
			case 2: dx0++; dx1 += 2;				// Right
					break;
			case 3: dy0++; dy1 += 2;				// Down
					break;
		}

        /* Condition Next Point */
		if ((map[dy0][dx0] & 0x2) == 0)             // Nothing Wall Object --->Going 
		{
			ex1 = dx0;
			ey1 = dy0;
			if((px == ex1) && (py == ey1))  			// Game Over
			{
				document.getElementById("commentarea").innerHTML = "Game Over" + "<br>";
				clearInterval(TimerID1);
				location.reload();   			
			}

		} 
		repaint();
	}

	// Enemy2 Move Action(Side Stright)
	// Switch Parameter is Random Num
	function EnemyMove2() 
	{
		var dx0 = ex2, dx1 = ex2, dy0 = ey2, dy1 = ey2;
		var rnd = Math.floor(Math.random() * 2);
		switch (rnd) 
		{
			case 0: dx0--; dx1 -= 2;				// Left
					break;
			case 1: dx0++; dx1 += 2;				// Right
					break;
		}

        /* Condition Next Point */
		if ((map[dy0][dx0] & 0x2) == 0)             // Nothing Wall Object --->Going 
		{
			ex2 = dx0;
			ey2 = dy0;
			if((px == ex2) && (py == ey2))  			// Game Over
			{
				document.getElementById("commentarea").innerHTML = "Game Over" + "<br>";
				clearInterval(TimerID1);
				location.reload();   			
			}

		}  
		repaint();
	}

    /* Making Stage */
    function repaint() 
    {
        gc.fillStyle = "black";
        gc.fillRect(0, 0, 640, 480);

        for (var y = 0; y < map.length ; y++) 
        {
            for (var x = 0; x < map[y].length ; x++) 
            {

                if(map[y][x] == 4)          // Opened Stair
                {
                    gc.drawImage(imgMapchip, 128, 0, 32, 32, x * 32, y * 32, 32, 32);
                }
                if(map[y][x] == 6)          // Wall
                {
                    gc.drawImage(imgMapchip, 0, 0, 32, 32, x * 32, y * 32, 32, 32);
                }
                if(map[y][x] == 20)         // UpStair
                {
                    gc.drawImage(imgMapchip, 96, 0, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 9)         // Road
                {
                    gc.drawImage(imgMapchip, 64, 96, 32, 32, x * 32, y * 32, 32, 32);
                }
                if(map[y][x] == 17)         // DownStair
                {
                    gc.drawImage(imgMapchip, 128, 0, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 7)         // Door
                {
                    gc.drawImage(imgMapchip, 0, 32, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 12)        // Key
                {
                    gc.drawImage(imgMapchip, 64, 32, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 13)        // Real Box 
                {
                    gc.drawImage(imgMapchip, 32, 32, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 14)        // Virtical Wall
                {
                    gc.drawImage(imgMapchip, 64, 0, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 15)        // Object
                {
                    gc.drawImage(imgMapchip, 64, 0, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 16)        // Fake Box
                {
                    gc.drawImage(imgMapchip, 32, 32, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 18)        // Upper Wall Line
                {
                    gc.drawImage(imgMapchip, 32, 128, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 19)        // Under Wall Line
                {
                    gc.drawImage(imgMapchip, 64, 128, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 22)        // Left Wall Line
                {
                    gc.drawImage(imgMapchip, 96, 128, 32, 32, x * 32, y * 32, 32, 32);
                }
                if (map[y][x] == 23)        // Right Wall Line
                {
                    gc.drawImage(imgMapchip, 128, 128, 32, 32, x * 32, y * 32, 32, 32);
                }
            }
        }
		gc.drawImage(imgMapchip, 0, 128, 32, 32, px * 32, py * 32, 32, 32);			// Your Character
		gc.drawImage(imgMapchip, 32, 160, 32, 32, yoshiko_x * 32, yoshiko_y * 32, 32, 32);			// Yoshiko
		gc.drawImage(imgMapchip, 0, 64, 32, 32, ex1 * 32, ey1 * 32, 32, 32);			// Enemy1
		gc.drawImage(imgMapchip, 96, 64, 32, 32, ex2 * 32, ey2 * 32, 32, 32);			// Enemy2
    }


