
/*
 *  Project: 
 *  Description: 
 *  Author: 
 *  License: 
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.

;(function ( $, window, document, undefined ) {


	// indexOf function for IE <=8
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, start) {
			for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
			}
			return -1;
		}
	}	
	$.isSubstring = function(haystack, needle) {
    return haystack.indexOf(needle) !== -1;
	};
	
	var delay = (function(){
				var timer = 0;
				return function(callback, ms){
				clearTimeout (timer);
				timer = setTimeout(callback, ms);
				};
			})();
	

	

	Array.prototype.allValuesSame = function(start, end) {

   // for(var i = 0; i < this.length; i++)
    for(var i = start; i < end; i++)
    {
        if(this[i] !== this[start])
            return false;
    }

    return true;
}
	
	// IE 7 document.querySelectorAll for listenScrollAgain
	if (!document.querySelectorAll) {
	  document.querySelectorAll = function (selectors) {
		var style = document.createElement('style'), elements = [], element;
		document.documentElement.firstChild.appendChild(style);
		document._qsa = [];

		style.styleSheet.cssText = selectors + '{x-qsa:expression(document._qsa && document._qsa.push(this))}';
		window.scrollBy(0, 0);
		style.parentNode.removeChild(style);

		while (document._qsa.length) {
		  element = document._qsa.shift();
		  element.style.removeAttribute('x-qsa');
		  elements.push(element);
		}
		document._qsa = null;
		return elements;
	  };
	}

	if (!document.querySelector) {
	  document.querySelector = function (selectors) {
		var elements = document.querySelectorAll(selectors);
		return (elements.length) ? elements[0] : null;
	  };
	}
		
		
	var KEY = {
			A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,
			F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,
			'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,
			'R0':96,'R1':97,'R2':98,'R3':99,'R4':100,'R5':101,'R6':102,'R7':103,'R8':104,'R9':105,
			INSERT: 45, CAPS_LOCK: 20, NUM_LOCK: 144, SCROLL_LOCK: 145, BREAK: 19,
			TAB: 9, ENTER: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39,
			DOWN: 40, SHIFT: 16, CTRL: 17, ALT: 18, PAGE_UP: 33, PAGE_DOWN: 34,
			HOME: 36, END: 35, BACKSPACE: 8, DELETE: 46,
			isArrow: function (k) {
				k = k.which ? k.which : k;
				switch (k) {
				case KEY.LEFT:
				case KEY.RIGHT:
				case KEY.UP:
				case KEY.DOWN:
					return true;
				}
				return false;
			},
			isControl: function (e) {
				var k = e.which;
				switch (k) {
				case KEY.SHIFT:
				case KEY.CTRL:
				case KEY.ALT:
					return true;
				}

				if (e.metaKey) return true;

				return false;
			},
			isFunctionKey: function (k) {
				k = k.which ? k.which : k;
				return k >= 112 && k <= 123;
			}
		}
		



    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'snake',
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function snakePlugin( element, options ) {
        //this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        
		this.elem = element;
		this.$elem = $(element);
		this.$elem_original = this.$elem
		this.options = options;
		
		
		// This next line takes advantage of HTML5 data attributes
		// to support customization of the plugin on a per-element
		// basis. For example,
		// <div class=item' data-plugin-options='{"message":"Goodbye World!"}'></div>
		//this.metadata = this.$elem.data( 'plugin-options' );
		this.metadata = this.$elem.data( );
		
		
		
		//Canvas stuff
	//var canvas = $("#canvas")[0];
	//canvas.width  = 400
	//canvas.height  = 600
	//var ctx = canvas.getContext("2d");
	//var w = $("#canvas").width();
	//var h = $("#canvas").height();
	
	
	//Lets save the cell width in a variable for easy control
	
		
		
		
		this._init();
		
		
		
		
		
		
		
		
		
    }

	
	//Plugin.prototype = 
	snakePlugin.prototype = 
	{
		
		
		
		defaults: { 
			root: '',
			width : 600,
			height: 600,
			cw : 20,
			snakeCount: 1,
			snakeCountAi: 0,
			gameSpeed: 20,
			snakeDiet: 1,
			snakeLives: 10,
			allowGrowing: 1,
			allowTwine: 0
		},
		
		
		lang: {
			textSelectAll: function () { return "Select all"; }
		},
		

		
		
		

		_init: function() {
			// Introduce defaults that can be extended either 
			// globally or using an object literal. 
			
			//
			
			

			this.config = $.extend({}, this.defaults, this.options, 
			this.metadata);

			//this.lang = $.extend({}, this.lang, $.fn.seleqt.lang );
			
			//if( !this.config.placeHolder )
			//this.config.placeHolder = this.lang.textSelectResult()
			
			//if( !this.config.ajaxUrl )
			//this.allLoaded = true
			//alert( JSON.stringify( this.config.placeHolder  ) )
			//alert( JSON.stringify( this.lang.textSelectResult()  ) )
			//alert( JSON.stringify( this.lang.textSearching() ) )
			//alert(KEY.TAB)
			//alert( this.config.maximumInputLength )
			//alert( JSON.stringify(this.defaults)  )
			// Sample usage:
			// Set the message per instance:
			// $('#elem').plugin({ message: 'Goodbye World!'});
			// or
			// var p = new Plugin(document.getElementById('elem'), 
			// { message: 'Goodbye World!'}).init()
			// or, set the global default message:
			// Plugin.defaults.message = 'Goodbye World!'
			
			//if( $.isSubstring("hello world", "world")) ) // true;​​​​​​​​​​​
			//alert(1)

			var self = this
			
			//alert()
			
			this.cw = this.config.cw;	// cell width
			
			this.canvasWidth = this.config.width 		// canvas width
			this.canvasHeight = this.config.height 		// canvas height
			
			// resize canvas to fit the points
			if( this.config.width % this.cw != 0)
			this.canvasWidth = this.config.width + ( this.cw - ( this.config.width % this.cw ) )		// canvas width
			if( this.config.height % this.cw != 0)
			this.canvasHeight = this.config.height + ( this.cw - ( this.config.height % this.cw ) )		// canvas height
			
			//alert(this.config.width)
			//alert( this.cw - ( this.config.width % this.cw ) )
			
			this.cpw = Math.floor( this.canvasWidth / this.cw );	// cells per canvas width 
			this.cph = Math.floor( this.canvasHeight / this.cw );	// cells per canvas height 
			this.timer = []
			
			this.dh = 'right'  // head direction
			this.dt = 'right'  // head direction
			
			//$(".pt").css('width','5px !important')
			
			//cpw = 10
			//cph = 10
			//alert(cnw)
			//var dh;			// head direction
			//var dt;			// tail direction
			this.food = [];		
			this.score;
			this.fallenCount;
			this.speed ;
			this.level;
			this.paused = false;
			this.game_loop = null;
			//var speedTemp = false;
			this.frames = 0
			
			this.rt = 0;
			//var l_tpl = []
				
			this.masks = {
					
					'0' : { 'xy': [[0,1,0],[1,1,1]]  },
					'1' : { 'xy': [[1,1],[1,1]]  },
					'2' : { 'xy': [[1,1,0],[0,1,1]]  },
					'3' : { 'xy': [[1,0,0],[1,1,1]]  },
					'4' : { 'xy': [[1,1,1,1]]  },
					
					'5' : { 'xy': [[1,0,1],[1,1,1]]  },	
					'6' : { 'xy': [[1,1,1],[1,0,1],[1,1,1]]  },
					'7' : { 'xy': [[1,0,1],[1,0,1],[1,1,1]]  },
					
					'8' : { 'xy': [[1,1,1],[0,1,0],[1,1,1]]  },
					'9' : { 'xy': [[0,1,0],[1,1,1],[0,1,0]]  },
					'10' : { 'xy': [[0,1,1],[1,1,0],[0,1,1]]  },
					'11' : { 'xy': [[0,1,0],[0,1,0],[1,1,1]]  },
					
					'9' : { 'xy': [[1,1,1,1,1] ] },
					'10' : { 'xy': [[1,1,1,1,1,1] ]  },
					
					'12' : { 'xy': [[0,1,1,0],[1,1,1,1],[1,1,1,1],[0,1,1,0] ]  },
					'13' : { 'xy': [[1,1,1,1],[1,0,0,1],[1,0,0,1],[1,1,1,1] ]  },
					'14' : { 'xy': [[0,0,0,1],[0,0,1,0],[0,1,0,0],[1,0,0,0] ]  },
					'15' : { 'xy': [[0,0,0,1],[1,1,1,1],[1,1,1,1],[1,0,0,0] ]  }
					
					
					
					}
					//alert( JSON.stringify( lx ) )

					
					
							 
				
			//if(dh == "right") 
			
			//this.cell_img = []
			
			//this.cell_img[ 0 ]='url(img/brick_empty.png)';
			//this.cell_img[ 1 ]='url(img/brick_full.png)';
			//this.cell_img[ 2 ]='url(img/wall.png)';
			//this.cell_img[ 3 ]='url(img/brick_full.png)';
			//this.cell_img[ 4 ]='url(img/brick_full.png)';
			//this.cell_img[ 5 ]='url(img/brick_full.png)';
			//cell_img[ 3 ]=document.getElementById("head2");
			
			//Lets create the snake now
			
			this.sl = 4; // init snake length
			
			this.canvasField = []; //an array of cells to make up the wall
			this.snake = []; //an array of cells to make up the snake
			this.wallArray = []; //an array of cells to make up the snake
			this.nextPiece = false; //an array of cells to make up the snake
			//var fastPiece = false; //an array of cells to make up the snake
			
			
			//for(var i = 0; i < cph; i++)
	
			var menu_width = self.canvasWidth > self.canvasHeight ? self.canvasHeight : self.canvasWidth
			menu_width = menu_width - 50
			
			var img_path = this.config.root + 'img/'
			

			var randid = "wrap_"+this.getRandomInt(1,99999)
			//alert(randid)
			
			this.$elem.wrap( "<div id='"+randid+"'></div>" )
			randid = '#'+randid
			
			var css =	 "<style>"
					+randid+" .gameDiv{ position:relative; }" 
					+randid+" .canvasDiv{ background-image: url("+img_path+"snake.jpg);background-size: "+self.canvasWidth+"px "+self.canvasHeight+"px; position:relative; width: "+this.canvasWidth+"px; height: "+this.canvasHeight+"px;   }" 
					+randid+" .canvasDivBg{  }" 
					+randid+" .gameInfo{ position:absolute; top:0; left:0; margin-left:-85px; }" 
					+randid+" .gamePause{ cursor:pointer;  }" 
					+randid+" .gamePause:hover{ cursor:pointer; color:#FFF; background: #000; }" 
					+randid+" .player{ margin-bottom:5px; font-size:10px; width:80px; display:block; overflow:hidden; }" 
					+randid+" .infoPlayer, .points, .lives{ padding:3px; margin:3px; color: #FFF;}" 
					+randid+" .points, .lives{ font-size:8px; text-align:right; background: black;}" 
					+randid+" .pausePlayer, .destroyPlayer{ color:#FFF; cursor:pointer;margin-left:5px; }" 
					 
					//+".lives{ background:#fff; color: #000;}" 
					
					+randid+" .menu{ z-index:9999; position: absolute; margin:auto; background:orange; width: "+(menu_width)+"px; height: "+(menu_width)+"px; top:0; bottom:0; left:0; right:0; }"
					+randid+" .menu .menuHead{ padding:5px 10px; background:green; color:white }"
					+randid+" .menu .menuBody{ padding: 4% 4%;  height: 92%; width: 92%;  overflow:hidden; }"
					+randid+" .menu .menuBodyInner{ height: 88%; width: 100%; overflow:auto;  }"
					+randid+" .menu .menuBack{ text-align:center; padding:5px; margin: 0 auto; width:100px; background:green; color:white;  }"
					+randid+" .menu .menuBack:hover{  cursor:pointer;}"
					+randid+" .menu .menuHtml{  display:none;  }"
					+randid+" .menu .menuHtml table{  margin:0;  }"
					+randid+" .menu .menuHtml table tr{  background:none;  }"
					+randid+" .menu .menuHtml table td{  border:none;  }"
					+randid+" .menu .menuHtmlInner{  padding:10px 0; border-bottom:1px solid green; border-top:1px solid green; }"
					+randid+" .menu .menuTitle:hover{  cursor:pointer; text-decoration:underline}"
					+randid+" .menu .menuTitleActive { padding:5px 10px; background:green; color:white; }"
					+randid+" .menu .menuTitleActive:hover {  text-decoration:none }"
					+randid+" .menu select { height:25px; padding:2px; }"
					//+".menu ul{ list-style-type:none; }"
					//+".menu ul li.menuItem:hover{ cursor:pointer; text-decoration:underline }"
					
					+randid+" .pt{background-image:url("+img_path+"empty.png) !important;  float:left; width: "+this.cw+"px; height: "+this.cw+"px; background-size: "+this.cw+"px "+this.cw+"px; }" 
					+randid+" .c0{background-image:url("+img_path+"brick_empty.png) !important;  }"
					
					+randid+" .c15{background-image:url("+img_path+"food/1/food1.png) !important; }"
					+randid+" .c16{background-image:url("+img_path+"food/1/food2.png) !important; }"
					+randid+" .c17{background-image:url("+img_path+"food/1/food3.png) !important; }"
					+randid+" .c18{background-image:url("+img_path+"food/1/food4.png) !important; }"
					+randid+" .c19{background-image:url("+img_path+"food/1/food5.png) !important; }"
					+randid+" .c20{background-image:url("+img_path+"food/1/food6.png) !important; }"
					+randid+" .c21{background-image:url("+img_path+"food/1/food7.png) !important; }"
					
					+randid+" .c22{background-image:url("+img_path+"food/2/food8.png) !important; }"
					+randid+" .c23{background-image:url("+img_path+"food/2/food9.png) !important; }"
					+randid+" .c24{background-image:url("+img_path+"food/2/food10.png) !important; }"
					+randid+" .c25{background-image:url("+img_path+"food/2/food11.png) !important; }"
					+randid+" .c26{background-image:url("+img_path+"food/2/food12.png) !important; }"
					+randid+" .c27{background-image:url("+img_path+"food/2/food13.png) !important; }"
					+randid+" .c28{background-image:url("+img_path+"food/2/food14.png) !important; }"
					
					
				for(var i=0; i < 9; i++)	
					css += self.snakeCss(i, img_path, randid)
					
			css += 	"</style>"
			
			var html = ''
				html += '<div class=gameDiv>'
				html += '<div class=canvasDiv>'
				html += '</div>'
				html += '<div class=gameInfo>'
				html += '</div>'
				html += '</div>'
				
			this.$elem.prepend(	css )
			this.$elem.append( html )
			
			
			
		
		
			this.isPaused = true
			this.isRunning = false;
			
			
			
			//this.resetGame();
			this.toggleMenu()
			
			this.setLoop( this.speed );
			
			
			this._initEvents();
			
			
			return this;
		},

		_parseInt: function(a)
		{
			var b = parseInt(a)
			if(b)
			return b
			return false
		},
		
		snakeCss: function(i, img_path, randid)
		{
		var items = ''
		items += 	randid+" .c"+i+"_1{background-image:url("+img_path+"snake"+i+"/body.png) !important; }"
					+randid+" .c"+i+"_2{background-image:url("+img_path+"wall.jpg) !important; }"
					+randid+" .c"+i+"_3{background-image:url("+img_path+"snake"+i+"/head1.png) !important; }"
					+randid+" .c"+i+"_4{background-image:url("+img_path+"snake"+i+"/head2.png) !important; }"
					+randid+" .c"+i+"_5{background-image:url("+img_path+"snake"+i+"/head3.png) !important; }"
					+randid+" .c"+i+"_6{background-image:url("+img_path+"snake"+i+"/head4.png) !important; }"
					+randid+" .c"+i+"_7{background-image:url("+img_path+"snake"+i+"/tail1.png) !important; }"
					+randid+" .c"+i+"_8{background-image:url("+img_path+"snake"+i+"/tail2.png) !important; }"
					+randid+" .c"+i+"_9{background-image:url("+img_path+"snake"+i+"/tail3.png) !important; }"
					+randid+" .c"+i+"_10{background-image:url("+img_path+"snake"+i+"/tail4.png) !important; }"
					
					+randid+" .c"+i+"_11{background-image:url("+img_path+"snake"+i+"/body1.png) !important; }"
					+randid+" .c"+i+"_12{background-image:url("+img_path+"snake"+i+"/body2.png) !important; }"
					+randid+" .c"+i+"_14{background-image:url("+img_path+"snake"+i+"/body4.png) !important; }"
					+randid+" .c"+i+"_13{background-image:url("+img_path+"snake"+i+"/body3.png) !important; }"
					+randid+" .player"+i+" {background-image:url("+img_path+"snake"+i+"/player.png) !important; }"
		
			return items		
		},
		
	menuItem : function( items, title, action, html, cls  )
	{
		var itms = ''
		
		if(cls)
		cls = " "+cls
		else
		cls=""
	
		itms += "<div class='menuItem"+cls+"' data-action='"+action+"'>"
		itms += "<div class='menuTitle'>"
		itms += title
		itms += "</div>"
		
		itms += items
		itms += "<div class='menuHtml'>"
		itms += "<div class='menuHtmlInner'>"
		itms += html
		itms += "</div>"
		itms+= "<div class='menuBack'>Späť</div>";
		
		itms += "</div>"
		
		itms += "</div>"
		
		return itms 
	},
	
	
	menuItems : function( items  )
	{
		var itms = "<div class='menuItems'>"
		
		
		for(var i = 0; i< items.length; i++ )
		{
			//itms += "<li class='menuItem' data-action='"+items[i].action+"'>" + items[i].title 
			var childitems = ''
			if( items[i].items && items[i].items.length > 0)
			{
			
				childitems = this.menuItems( items[i].items )
			}
			var action = ''
			var html = ''
			var cls = ''
			if(items[i].action) action = items[i].action
			if(items[i].html) html = items[i].html
			if(items[i].cls) cls = items[i].cls
			itms += this.menuItem(childitems, items[i].title, action, html, cls)
			
			//itms += "</li>"
		}
		itms += '</div>'
		
		return itms;
	},
	
	menuTpl : function(h,b,isChild,i)
	{
		var items = '';
		
		items += "<div class='menu menu"+i+"'>";
		items += "<div class='menuHead'>";
		items += h;
		if(isChild)
		items += "<div class='menuBack'>Späť</div>";
		
		items += '</div>';
		items += "<div class='menuBody'>";
		items += "<div class='menuBodyInner'>";
		items += b;
		items += '</div>';
		items += '</div>';
		items += '</div>';
				
		return items
	
	},
	
	renderSelect: function(cls, values, defVal)
	{
		var items = ''
		var selected
		var id
		//alert(value)
		items += "<select class='"+cls+"'>";
		for(var i=0; i < values.length; i++)
		{
			id = values[i].id
			selected = ''
			if(defVal == id)
			selected = 'selected'
			items += "<option data-id='"+id+"' "+selected+">";
			items += values[i].text;
			items += "</option>";
		}
		items += "</select>";
		return items;
	},
	
	
	toggleMenu : function()
	{
		var self = this
		//if(show)
	
		
		
		
		{
			if( self.$elem.find('.menu').length > 0 
			//if( resume 
				 )
			
			{
			//alert(1)
			//self.$elem.find('.menu').fadeToggle(500)
			//if (!self.isPaused && self.isRunning)
			if(self.$elem.find('.menu').is(':hidden'))
			self.$elem.find('.menu').show()
			else
			self.$elem.find('.menu').hide()
			//self.$elem.find('.menu').fadeOut(500, function(){ $(this).remove()})
			}
			else
			{
			var mitems = [
						  //{title:'Nova hra', action: 1, items:[{title:'Title 1-1', items:[{title:'Title 1-2'}]}] }
						  
						  {title:'Nová hra', action: 1}
						 ,{title:'Pokračovať v hre', action: 2}
						 ,{title:'Simulácia', action: 3}
						 ,{title:'Ovládanie hry', html:"<div>Hráč 1: ŠÍPKY</div> <div>Hráč 2: A S D W</div><div>Hráč 3: F G H T </div><div>Hráč 4: J K L I</div> <div>Pauza: P</div>"}
						 ,{title:'Nastavenia', html:"<table class='settings'><tr><td>Počet hráčov</td> <td>"+this.renderSelect('snakeCount', [{id:1, text:1}, {id:2, text:2}, {id:3, text:3}, {id:4, text:4}, {id:5, text:5}, {id:6, text:6}, {id:7, text:7}, {id:8, text:8}], this.config.snakeCount)+"  z toho autopilotov "+this.renderSelect('snakeCountAi', [{id:0, text:'žiadny'}, {id:1, text:1}, {id:2, text:2}, {id:3, text:3}, {id:4, text:4}, {id:5, text:5}, {id:6, text:6}, {id:7, text:7}, {id:8, text:8}], this.config.snakeCountAi)+" </td></tr><tr> <td>Počet životov</td> <td>"+this.renderSelect('snakeLives', [{id:1, text:1},{id:5, text:5},{id:10, text:10},{id:20, text:20}, {id:50, text:50}, {id:100, text:100} , {id:1000, text:1000} ], this.config.snakeLives)+" </td>   </tr><tr> <td>Rýchlosť hry</td> <td>"+this.renderSelect('gameSpeed', [{id:50, text:'slimačia'},{id:20, text:'pomalá'},{id:15, text:'stredná'}, {id:10, text:'rýchla'}, {id:5, text:'megarýchla'}, {id:3, text:'urýchľovač častíc'}, {id:1, text:'rýchlosť svetla'} ], this.config.gameSpeed)+" </td>   </tr> <tr> <td>Diéta</td><td>"+this.renderSelect('snakeDiet', [{id:1, text:'vegetarián'},{id:2, text:'mäsožravec'},{id:3, text:'všežravec'}], this.config.snakeDiet)+" </td></tr><tr> <td>Povoliť rast</td><td>"+this.renderSelect('allowGrowing', [{id:0, text:'Nie'},{id:1, text:'Áno'}], this.config.allowGrowing)+" </td></tr><tr> <td>Povoliť zauzlenie</td><td>"+this.renderSelect('allowTwine', [{id:0, text:'Nie'},{id:1, text:'Áno'}], this.config.allowTwine)+" </td></tr></table>"}
						 //,{title:'Pravidlá', html:"Bloky skladajúce sa zo štvorčekov, padajú po obrazovke a hráč ich ukladá do múru od dolného konca hracej plochy. Keď je riadok plný štvorčekov bez dier, zmizne. Hráč sa snaží čo najďalej odmazávať riadky. Hra končí, keď múr dosiahne horný okraj hracej plochy."}
						 //,{title:'Pravidlá hry', html:'Zjedzte '}
						 //,{title:'Title3', items:[{title:'Title 3-1'},{title:'Title 3-2'},{title:'Title 3-3'}]}
						// ,{title:'Title4'}
						 ];
			
			var ritems = self.menuItems( mitems )
			
			
			var items = self.menuTpl('Hlavné menu', ritems, false, 0)
			
			for(var i=0; i<mitems.length; i++)
			{
			//if(mitems[i].html)
			//items += self.menuTpl( mitems[i].title, mitems[i].html, true, i+1)
			}
			
			
			var menu = $( items )
			self.$elem.find('.canvasDiv').append( menu )
			menu.hide().fadeIn(500)
			}
		}
		
		if(self.isRunning)
		self.$elem.find('.menuItems .menuItem[data-action="2"]').show()
		else
		self.$elem.find('.menuItems .menuItem[data-action="2"]').hide()
		//if(resume)
		//self.$elem.find('.resumeGame').show()
		//else
		//self.$elem.find('.resumeGame').hide()
		////else
		{
			//self.$elem.find('.menu').fadeToggle(500)
			
		}
	},
		
		
		_initEvents : function(){
		//Lets add the keyboard controls now
			var self = this
			
			//self.$elem.on( 'keydown', document, function(e) 
			//{
			$(document).keydown( function(e){
				
				var key = e.which;
				
				if( !self.isRunning || (self.isPaused && key != KEY.P) )
				return
				
				e.preventDefault()
				
				
				if(key == "37" && self.snake[0].dh != "right") self.snake[0].dh = "left";
				else if(key == "38" && self.snake[0].dh != "down") self.snake[0].dh = "up";
				else if(key == "39" && self.snake[0].dh != "left") self.snake[0].dh = "right";
				else if(key == "40" && self.snake[0].dh != "up") self.snake[0].dh = "down";
				
				if(key == KEY.A && self.snake[1].dh != "right") self.snake[1].dh = "left";
				else if(key == KEY.W && self.snake[1].dh != "down") self.snake[1].dh = "up";
				else if(key == KEY.D && self.snake[1].dh != "left") self.snake[1].dh = "right";
				else if(key == KEY.S && self.snake[1].dh != "up") self.snake[1].dh = "down";
				
				if(key == KEY.F && self.snake[2].dh != "right") self.snake[2].dh = "left";
				else if(key == KEY.T && self.snake[2].dh != "down") self.snake[2].dh = "up";
				else if(key == KEY.H && self.snake[2].dh != "left") self.snake[2].dh = "right";
				else if(key == KEY.G && self.snake[2].dh != "up") self.snake[2].dh = "down";
				
				if(key == KEY.J && self.snake[3].dh != "right") self.snake[3].dh = "left";
				else if(key == KEY.I && self.snake[3].dh != "down") self.snake[3].dh = "up";
				else if(key == KEY.L && self.snake[3].dh != "left") self.snake[3].dh = "right";
				else if(key == KEY.K && self.snake[3].dh != "up") self.snake[3].dh = "down";
				
				
				else if(key == KEY.P )	// p - pause
				{
					//alert('P')
					self.isPaused = !self.isPaused
					
					self.toggleMenu(true)
					
					
					
				}
				return;
				
				//alert(key)
				//We will add another clause to prevent reverse gear
				
				//if(check_aside_collision())
				//	console.log('wall aside ???')
				
				
				
				
				
				if( key == "37"   ) 		// left key pressed
				{
					
					
					
					//alert(snake.w)
					//if( ! wall_left() && !check_aside_collision('left') )
					self.movePiece(-1)
				}
				else if( key == "39"  ) 
				{
					
					self.movePiece(1)
					
				}
				
				
				else if(key == "82" )  // r - resume
				{
					rotate()
					//alert('a')
					//setLoop(paint, speed)
				}
				else if(key == "27" )	// escape
				{
				 self.createPieceLoop()
				}
				else if( key == "38" )	// up arrow
				{
				//alert(1)
				//sp = speed
				//speed = 1
				//speedTemp = 1
				self.rotate()
				//speed = sp
				//setLoop(paint, speed)
				}
				else if( key == "40" )	// down arrow
				{
				//alert(1)
				//sp = speed
				//speed = 1
				//speedTemp = 1
				
				
				for(var i = 0; i < self.snake.xy.length; i++)
					{
						//x= snake.xy[i].x
						//y= snake.xy[i].y
						//var c = snake[i];
						//$('#xy_'+x+'_'+y ) //.hide( function(){
						//.addClass('c3')
						//$(this).fadeIn(500)
						//})
						
						
						
						//snake.xy[i].x = snake.xy[i].x + ctrl
						
						//snake.xy[i].m = 3
					}
				
				
				if(self.snake.running)
				{
				self.snake.running = false;
				
				self.changePieceClass(1, false)
				self.setLoop( self.drawCanvas, self.speed)
				}
				else
				{
				self.changePieceClass(3, false)
				self.snake.running = true;
				self.setLoop( self.drawCanvas, 70)
				}
				
				
				
				
				
				//speed = sp
				//setLoop(paint, speed)
				}
				
				
				
				return false;
				
				if( key == "37" && dh != "right" ) dh = "left";
				else if( key == "38" && dh != "down" ) dh = "up";
				else if( key == "39" && dh != "left" ) dh = "right";
				
				
				else if(key == "65" )
				{
				//alert('a')
				speed = speed - 50
				setLoop(drawCanvas, speed)
				}
				else if(key == "80" )	// p - pause
				{
					//alert('a')
					if(paused)
					{
					paused = false
					setLoop(drawCanvas, speed)
					}
					else
					{
					paused = true
					setLoop(drawCanvas, false)
					}
				}
				else if(key == "82" )  // r - resume
				{
					//alert('a')
					//setLoop(paint, speed)
				}
				//The snake is now keyboard controllable
			})
			
			
			self.$elem.on('change', 'select', function(){
			
				var el = $(this)
				var val = el.val()
				var cls = el.attr('class')
				var id = el.find(':selected').data('id')
				
				//alert()
				//if(el.hasClass('snakeCount'))
				self.config[ cls ] = 1 * id
				
			})
			
			self.$elem.on('click', '.gamePause', function(){
					
				self.isPaused = !self.isPaused
				self.toggleMenu(true)
				
				
			})
			self.$elem.on('click', '.pausePlayer', function(){
				
				var player = $(this).closest('.player').data('player')
				var speed = $(this).closest('.player').data('speed')
				
				if(self.snake[player].s == 0)
				self.snake[player].s = speed;
				else
				{
				$(this).closest('.player').data('speed', self.snake[player].s)
				self.snake[player].s = 0;
				
				}
				
				//alert(self.speed)
				//self.isPaused = !self.isPaused
				//self.toggleMenu(true)
				
				
			})
			self.$elem.on('click', '.destroyPlayer', function(){
				
				var player = $(this).closest('.player').data('player')
				//var speed = $(this).closest('.player').data('speed')
				self.snake[player] = {}
				$(this).closest('.player').fadeOut(500)
				
				if( !self.snakeExists() )
				self.gameOver()
				//alert(self.speed)
				//self.isPaused = !self.isPaused
				//self.toggleMenu(true)
				
				
			})
			
			self.$elem.on('click', '.menuTitle', function(){
				//alert('start game')
				var mItem = $(this).closest('.menuItem')
				var action = mItem.data('action')
				var html = mItem.data('html')
				var title = mItem.text()
				
				if(!action)
				{
					//var menu = $( self.menuTpl( title, html, true) )
					//$(this).closest('.menu').append( menu )
					//menu.hide().fadeIn(500)
					$('.menuItem').hide()
					mItem.show()
					mItem.find('.menuHtml').fadeIn(500)
					mItem.find('.menuTitle').addClass('menuTitleActive')
					//alert(html)
				}
				else
				{
					if(action == '1')
					{
					
					self.resetGame();
					self.isPaused = false
					self.isRunning = true;
					}
					else if(action == '2')
					{
					self.isPaused = false
					self.toggleMenu(true)
					}
					else if(action == '3')
					{
					self.config.snakeCount = 8
					self.config.snakeCountAi = 8
					self.config.gameSpeed = 1
					self.config.allowGrowing = 0
					self.config.snakeLives = 1000
					self.resetGame();
					self.isPaused = false
					self.isRunning = true;
					}
				}
			})
		
			self.$elem.on('click', '.menuBack', function(){
				
				//$(this).closest('.menu').fadeOut( 500, function(){ $(this).remove()})
				//self.resetGame();
				var mItem = $(this).closest('.menuItem')
				//self.isPaused = false
				//$('.menuItem').each( function(){ $(this).show()})
				$('.menuItem').fadeIn(500)
				//mItem.hide()
				mItem.find('.menuHtml').hide()
				mItem.find('.menuTitle').removeClass('menuTitleActive')
				
				if(self.isRunning)
				self.$elem.find('.menuItems .menuItem[data-action="2"]').show()
				else
				self.$elem.find('.menuItems .menuItem[data-action="2"]').hide()
				//$(this).show()
				//$(this).find('.menuHtml').fadeIn(500)
				
			})
			
			$('.ctrl').click(function(e){
			
				var key = $(this).data('key')
				
				if(key == "37"  ) self.movePiece(-1)
				//else if(key == "38" ) dh = "up";
				else if(key == "39" ) self.movePiece(1)
				else if(key == "40"  ) self.setLoop( self.drawCanvas, 1)
				
				else if(key == "82" ) 
				self.rotate()
			
			})
			
			
			  
			  function log(a)
			  {
			  //console.log(a)
			  }
			  /*
			   $("#tetris").swipe( {
				tap:function(event, target) {
								log("tap from callback");
						
						
				},
				hold:function(event, target) {
								log("hold from callback");
				},
				swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				  log("swipe from callback");
				  
					
				},
				swipeLeft:function(event, distance, duration, fingerCount, fingerData) {
				  log("swipeLeft from callback");
				},
				swipeRight:function(event, distance, duration, fingerCount, fingerData) {
				  log("swipeRight from callback");
				},
				swipeUp:function(event, distance, duration, fingerCount, fingerData) {
				  log("swipeUp from callback");
				},
				swipeDown:function(event, distance, duration, fingerCount, fingerData) {
				  log("swipeDown from callback");
				},
				swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
					log("swipeStatus from callback");
					
					if(direction == "left")
					//if( ! wall_left() && !check_aside_collision() )
					
					if( !self.check_collision( 2, -1, 0 ) && 
						!self.check_collision( 1, -1, 0 ) )
					for(var i = 0; i < self.snake.xy.length; i++)
					{
						//var c = snake[i];
						
						self.snake.xy[i].x -= 1
					}
					
					
					if(direction == "right")
					
					if( !self.check_collision( 2, 1, 0 ) && 
					!self.check_collision( 1, 1, 0 ) )
					for(var i = 0; i < self.snake.xy.length; i++)
					{
						//var c = snake[i];
						
						self.snake.xy[i].x += 1
					}
					
					if(direction == "up")
					self.rotate()
					
					if(direction == "down")
					self.setLoop( self.drawCanvas, 1)
					//if(direction == "left" && dh != "right") dh = "left";
					//else if(direction == "up" && dh != "down") dh = "up";
					//else if(direction == "right" && dh != "left") dh = "right";
					//else if(direction == "down" && dh != "up") dh = "down";
					
					//alert(direction)		
				},
				pinchIn:function(event, direction, distance, duration, fingerCount, pinchZoom, fingerData) {
				  log("pinchIn from callback");
				 
				},
				pinchOut:function(event, direction, distance, duration, fingerCount, pinchZoom, fingerData) {
								log("pinchOut from callback");
				},
				pinchStatus:function(event, phase, direction, distance , duration , fingerCount, pinchZoom, fingerData) {
								log("pinchStatus from callback");
								
								 
				}
				//,fingers:$.fn.swipe.fingers.ALL 
			  });
				*/
		
		
		
		},



//var a = ['a', 'a', 'a'];
//var b = a.allValuesSame(); //true


	
	
	
	resetGame : function()
	{
		//dh = "down";	//default direction of the head
		//dt = dh;		//default direction of the tail
		this.dh = 'right'  // head direction
		this.dt = 'right'  // head direction
			
		this.score = 0;
		this.fallenCount = 0;
		
		this.speed = 60;
		this.level = 1;
		
		this.nextPiece = false
		
		this.createCanvas();
		//this.createPieceLoop();
		this.createSnakes();
		
		$("#level").text( this.level )
		$("#fallenCount").text( this.fallenCount )
		$("#score").text( this.score )
		this.createFood(); //Now we can see the food particle
		//finally lets display the score
		
		
		//alert(speed);
		//Lets move the snake now using a timer which will trigger the paint function
		//every 60ms
		//if(typeof game_loop != "undefined") clearInterval(game_loop);
		//if( game_loop !== false ) 
		//drawCell(1, 11, 4 );
		
		//setLoop(drawCanvas, speed);
	},
	
	
	foodExists : function(x,y)
	{
		var f = false
		var self = this
		
		for(var i = 0; i < self.food.length; i++)
		{
			//var c = self.wallArray.xy[i];
			//self.drawCell( c.x, c.y, 2 );
			if(
			x == self.food[i].x && y == self.food[i].y
			//1 == 2
			)
			{
			f = i
			//var nx1 = self.food[i].x;
			//var ny1 = self.food[i].y;
			}
			//self.drawCell( self.food[i].x, self.food[i].y, self.food[i].t );
		}
		
		return f
	},
	 createFood: function( nx, ny ){
	 
		var self = this
		//var px = Math.round(Math.random()*(w-cw)/cw)
		//var py = Math.round(Math.random()*(h-cw)/cw)
		var px = this.getRandomInt(0,this.cpw-1)
		var py = this.getRandomInt(0,this.cph-1)
		
		//var px1 = this.getRandomInt(1,this.cpw-1)
		//var py2 = this.getRandomInt(1,this.cph-1)
		
		
		
		//cc = self.check_collision(nx, ny, self.wallArray.xy )
		if( this.check_collision( px, py, this.wallArray.xy ) 
			|| ( nx == px && ny == py ) || this.foodExists(px,py)  )
		//	|| this.check_collision(px, py, wall_array) )
		{
		this.createFood( nx, ny )
		return;
		}
		
		var min = 15
		var max = 28
		if(this.config.snakeDiet == 1)
		{
			min = 15
			max = 21
		}
		else if(this.config.snakeDiet == 2)
		{
			min = 22
			max = 28
		}
		
		
		
		var food = {
			x: px, 
			y: py, 
			//t: Math.floor(Math.random() * 6) + 1   // between 1 and 6
			t: this.getRandomInt(min,max)  // between 1 and 6
		};
		
		
		this.food.push(food)
		//This will create a cell with x/y between 0-44
		//Because there are 45(450/10) positions accross the rows and columns
	 },
	 
	
	 createCanvas: function(){
	
		var self = this
		
		//$('#tetris').html("")
		this.$elem.find('.canvasDiv').html("")
		
		var ttl = 3000;
		//for(var i = cph-1; i>=0; i--)
		for(var i = 0; i< this.cph; i++ )
		{
			
			this.canvasField[i] = []
			//alert( JSON.stringify( canvasField[i]  ) )
			for(var j = 0; j< this.cpw; j++ )
			//for(var j = cpw-1; j>=0; j--)
			{
				ta = 0
				
				ttl = ttl - 5
				//console.log(ttl);
				//if( i==0 ) // top
				//ta = 3
				//if(	  
				//	 i==0 					// top 
				//	||   i== this.cph-1 	// bottom
				///	|| j==0 		// left
				//	|| j== this.cpw-1		// right
				//	)
				//ta = 2
				
				this.canvasField[i][j] = ta
				
				this.$elem.find('.canvasDiv').append("<div class='pt xy_"+j+"_"+i+" x"+j+" y"+i+"' ></div>")
				
				//getRandomInt(300,3000)
				//$( "#xy_"+j+"_"+i ).hide().fadeIn( ttl );
				this.$elem.find( ".xy_"+j+"_"+i ).hide().fadeIn( ttl );
				
				//console.log(ttl)
				//This will create a horizontal snake starting from the top left
				//canvasField.push({x: i+10, y:1});
				
			}
			
		}
		
		
		
		
		
		//self.$elem.find('.canvasDiv').css( 'background-image', 'none' )
		self.$elem.find('.canvasDiv').removeClass( 'canvasDivBg' )
		
		clearTimeout( this.timer['canvasDiv'] )
		this.timer['canvasDiv'] = setTimeout(function(){
		//self.$elem.find('.canvasDiv').css( 'background-image', "url("+self.themePath+"brick_empty.png)" )
		self.$elem.find('.canvasDiv').addClass( 'canvasDivBg' )
		}, 3000 )
		
		
		//$("#tetris").hide().fadeIn(1500)
		
		
	

			

		//console.log( JSON.stringify( this.canvasField  ) )
	},
	
	//init();
	

	
	setLoop: function( )
	{
		var self = this
		//clearInterval();
		//console.log()
		
			

		var requestAnimFrame = (function(){
			return window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				window.oRequestAnimationFrame      ||
				window.msRequestAnimationFrame     ||
				function(callback, element){
				window.setTimeout(callback, 1000 / 60);
				};
		})();


		// usage:
		// instead of setInterval(render, 16) ....

		(function animloop(){

			if(!self.isPaused)
			self.gameLoop() 

			requestAnimFrame(animloop);

		// alert(156)
		})();
		// place the rAF *before* the render() to assure as close to
		// 60fps with the setTimeout fallback.



	
	
		//this.game_loop = setInterval( function(){ self.drawCanvas(self)} , speed);
		//game_loop = setTimeout(paint, speed);
	},
	
	

	
	
	
	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	 getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},				 
	
	
	createSnakes : function()
	{
		this.fallenCount = this.fallenCount + 1
		$("#fallenCount").text( this.fallenCount )
		
		var max_i = 4
		//if(fallenCount % 10 == 0)
		//var max_i = 
		if( this.fallenCount % 10 == 0)
		{
		this.level = this.level + 1
		$("#level").text( this.level )
		max_i = max_i + Math.floor( this.fallenCount / 10)
		}
		
		
		
		//console.log( Math.floor(fallenCount / 5)  )
		
		//max_i = max_i + Math.floor(fallenCount / 10)
		
		if(max_i > 15)
		max_i = 15
		
		
		var ri = this.getRandomInt(0,max_i)
		var ri2 = this.getRandomInt(0,max_i)
		//var ri = getRandomInt(2,3)
		
		
		var gri = this.getRandomInt(0,3)
		var gri2 = this.getRandomInt(0,3)
		//var ri = getRandomInt(7,9)
		
		//arr = lx[ri].xy
		
		//snake.xy = transpose( snake.xy  )
		
		//rt = 0 
		//console.log(ri)	
					 
		this.snake = []; //Empty array to start with
		
		
		
		//this.snake2 = {}; //Empty array to start with
		
		
		//this.snake2.xy = []; //Empty array to start with
		//this.snake.running = false; //Empty array to start with
		//snake.w = masks[ri].w; //Empty array to start with
		//snake.h = masks[ri].h; //Empty array to start with
		//console.log(this.nextPiece)
		
		var snakeCount = this.config.snakeCount
		var snakeCountAi = this.config.snakeCountAi
		var gameInfo = ''
			gameInfo += "<div class='gamePause'>"
			gameInfo += "Pauza"
			gameInfo += "</div>"
		
		for( var i = 0; i< snakeCount; i++ )
		//for( var i = 0; i< 7; i++ )
		{
			//for( var j = 0; j< this.snake.mask[i].length; j++ )
			this.snake[i] = {}
			
			this.snake[i].xy = []
			
			//this.snake[i].w = this.snake.mask[0].length; //Empty array to start with
			//this.snake[i].h = this.snake.mask.length //Empty array to start with
			this.snake[i].r = 1 //Empty array to start with
			this.snake[i].s = this.config.gameSpeed //this.speed - ( 65 ) //Empty array to start with
			this.snake[i].dh = 'right' //Empty array to start with
			this.snake[i].dt = 'right' //Empty array to start with
			this.snake[i].isAlive = true //Empty array to start with
			this.snake[i].lives = this.config.snakeLives //Empty array to start with
			this.snake[i].points = 0 //Empty array to start with
			
			this.snake[i].ai = false
			if( i >= snakeCount - snakeCountAi )
			this.snake[i].ai = true
			
			for(var j = 3; j>=0; j--)
			//for(var i = 0; i<sl; i++)
			{
				//This will create a horizontal snake starting from the top left
				//snake_array.push({x: i-sl+1, y:1});
				//if(i<2)
				this.snake[i].xy.push({x: j-4, y: 1+i, m: 1 });
				//else if(i<4)
				//this.snake[i].xy.push({x: j-5, y: 4+i, m: 1 });
				//else if(i<6)
				//this.snake[i].xy.push({x: j-5, y: 9+i, m: 1 });
				//else if(i<8)
				//this.snake[i].xy.push({x: j-5, y: 12+i, m: 1 });
				//this.snake[1].xy.push({x: i-sl, y: 6, m: 1 });
				//this.snake[2].xy.push({x: i+6, y: 11, m: 1 });
				//this.snake[3].xy.push({x: i+6, y: 16, m: 1 });
				
			}
			
			gameInfo +="<div class='player player"+i+"' data-player='"+i+"'>"
			gameInfo +="<div class='infoPlayer'>Hráč "+(i+1)+"</div>"
			gameInfo +="<span class='points'>"+this.snake[i].points+"</span>"
			gameInfo +="<span class='lives'>"+this.snake[i].lives+" </span>"
			gameInfo +="<div>"
			gameInfo +="<span class='pausePlayer'>Pause</span>"
			gameInfo +="<span class='destroyPlayer'>Destroy</span>"
			gameInfo +="</div>"
			gameInfo +="</div>"
		
		}
		
		
		this.$elem.find('.gameInfo').html( gameInfo )
		
		
		//alert( masks[ri].h )
		//alert( snake.mask.length )
		
		//for( var i = 0; i< this.snake.mask.length; i++ )
		
		
		 // snake length
		//snake_array = []; //Empty array to start with
		
		
		//this.snake[0] = {}
		
		//for(var i = sl-1; i>=0; i--)
		
		
		this.wallArray.xy = []
		//for(var i = sl-1; i>=0; i--)
		{
			//This will create a horizontal snake starting from the top left
			//snake_array.push({x: i-sl+1, y:1});
			//this.wallArray.xy.push({x: i+14, y: 4, m: 1 });
			
		}
		
		//snake.xy = reverseArray( snake.xy ) 
		//alert(snake)
		//arr = snake.xy
	},
	

	
	
	gameOver : function()
	{
		var self = this
		
		self.isPaused = true
		self.isRunning = false;
		
		self.$elem.find('.canvasDiv').html('')	
		self.$elem.find('.canvasDiv').removeClass( 'canvasDivBg' )
		this.$elem.find('.gamePause').html( '' )
		self.toggleMenu()
		
	},
	
	
	//Lets paint the snake now
	gameLoop : function()
	{
		
		var self = this
		//alert(54)
		//alert()
		//To avoid the snake trail we need to paint the BG on every frame
		//Lets paint the canvas now
		//var loops = 0
		//ctx.fillStyle = "white";
		//ctx.fillRect(0, 0, w, h);
		//ctx.strokeStyle = "black";
		//ctx.strokeRect(0, 0, w, h);
		//var loops = 0, skipTicks = 1000 / 30,
		//  maxFrameSkip = 1000,
		//  nextGameTick = (new Date).getTime();
		
		
		//return function() 
		{
		
		
		
		
		
		
		//console.log ( self.frames ) 
		
		//if(self.frames % self.speed == 0)
		
		//run the updating code a fixed amount of times per second 
		//if( self.frames % self.speed == 0 )
		self.gameUpdate( )
		
		//run the drawing code as often as possible
		self.gameDraw()
		
		self.frames ++ ;
		//loops ++ ;
		
		}

		
		//var score_text = "Score: " + score + " Level: " + level;
		//ctx.fillStyle = 'black';
		//ctx.fillText(score_text, 20, h-20);
	},
	
	setX: function(x, d)
	{
		if(d == "right") x++;
		else if(d == "left") x--;
		
		if( x == this.cpw)
		x = 0
		
		if( x == -1 )
		//alert(1)
		x = this.cpw - 1
		
		return x
	},
		
	setY: function(y, d)
	{
		if(d == "up") y--;
		else if(d == "down") y++;
		
		if( y == this.cph)
		y = 0
		
		if( y == -1 )
		y = this.cph - 1
		
		return y
	},
		
	
	aiMove: function( hx, hy, dh, snk )
	{
		var self = this
		var d = dh
		
		var min_x =   ( hx - this.food[0].x )
		var min_y =   ( hy - this.food[0].y )
		var min_sum = Math.abs(min_x) + Math.abs(min_y)
		var min_f = 0
		var minin = true
		
		
		
		for(var i = 0; i < this.food.length; i++ )
		{
			
			
			// ---------------------------
			
			var fx = this.food[i].x
			var fy = this.food[i].y
			
			var in_x =  hx - fx 
			var in_y =  hy - fy 
			var in_sum = Math.abs(in_x) + Math.abs(in_y)
			
			var out_x = this.cpw - Math.abs(in_x)
			var out_y = this.cph - Math.abs(in_y)
			var out_sum = out_x + out_y
			
			
			
			if( min_sum 
				> 
				in_sum
			)
			{
				var min_x =   in_x
				var min_y =   in_y
				var min_sum = in_sum
				var min_f = i
				var minin = true
			}
			
			if( min_sum 
				> 
				out_sum
			)
			{
				var min_x =   out_x
				var min_y =   out_y
				var min_sum = out_sum
				var min_f = i
				var minin = false
			}
			///var min_x =   ( hx - this.food[0].x )
			//var min_y =   ( hy - this.food[0].y )
			//var min_f = 0
			//if( Math.abs(min_x) > Math.abs(in_x) )
			//min_x = in_x
			//else if( Math.abs(min_x) > Math.abs(in_x) )
			
			
			
		}
		/*
		if(minin)
		{
		if(Math.abs(min_x) < Math.abs(min_y))
		{
			if(min_x < 0 )
			d = 'right'	
			else 
			d = 'left'
		}
		else
		{
			if(min_y < 0 )
			d = 'down'	
			else 
			d = 'up'
		}
		}
		else
		{
			if((min_x) < (min_y))
			{
			if( hx > this.cpw/2 )
			d = 'right'
			else
			d='left'
			}
			else
			{
			if( hy > this.cph/2 )
			d = 'down'
			else
			d='up'
			}
		
		}
		*/
		//if(this.food[min_f].x != hx && this.food[min_f].y != hy)
		//{
		//console.log('notnotnot')
		//}
		//else
		
		{
		
			if(this.food[min_f].x == hx)
			{
				if(!minin)
				{
					//if( this.food[min_f].x > hx && dh != 'right' )
					if( hy < this.cph/2 && dh != 'down' )
					d='up'
					//else if(dh != 'left')
					else if(dh != 'up')
					d='down'
				}
				else
				{
					if(this.food[min_f].y > hy && dh != 'up')
					d='down'
					else if(dh != 'down')
					d='up'
				}
			}
			else if(this.food[min_f].y == hy)
			{
				if(!minin)
				{
				//if( this.food[min_f].x > hx && dh != 'right' )
				if( hx < this.cpw/2 && dh != 'right' )
				d='left'
				//else if(dh != 'left')
				else if(dh != 'left')
				d='right'
				}
				else
				{
				if( this.food[min_f].x > hx && dh != 'left' )
				d='right'
				else if(dh != 'right')
				d='left'
				}
			}
			else
			{
				if(!minin)
				{
					if( Math.abs(min_y) < Math.abs(min_x) )
					{
						if( hy < this.cph/2 && dh != 'down' )
						d='up'
						//else if(dh != 'left')
						else if(dh != 'up')
						d='down'
					}
					else
					{
						if( hx < this.cpw/2 && dh != 'right' )
						d='left'
						//else if(dh != 'left')
						else if(dh != 'left')
						d='right'
					}
					//console.log('not minin f')
				}
				else
				{
					if( Math.abs(min_y) < Math.abs(min_x) )
					{
						if(min_y < 0 && dh != 'up' )
						d = 'down'
						else if(  dh != 'down' )
						d = 'up'
					}
					else
					{
						if(min_x < 0 && dh != 'left' )
						d = 'right'
						else if(  dh != 'right' )
						d = 'left'
					
					}
				}
			
			}
		
		}
		//return d
		//console.log(self.cpw)
		//console.log(self.cph)

		nx = self.setX(hx,d)
		ny = self.setY(hy,d)
		
		if( this.check_collision( nx, ny, this.wallArray.xy ) )
		//if(d==dh)
		//d='down'
		//else
		d = dh

		nx = self.setX(hx,d)
		ny = self.setY(hy,d)
		
		//var xi = 0
		//var yi = 0
		//var cr = 0
		//var cr2 = false
		//var cr3 = false
		//var cr4 = false
		//var crt = false
		//if(self.snake[snk].xy.length > 10)
		//for(var i = 1; i < self.snake[snk].xy.length; i++ )
		{
			//if(cr > 1)
			{
			//var x=self.snake[snk].xy[i].x
			//var y=self.snake[snk].xy[i].y
			
			//if( x == hx+1 && y == hy)
			//cr1 = true
			//crt = 'up'
			
			//if( x == hx-1 && y == hy)
			///cr4 = true
			//crt = 'down'
			
			//if( x == hx && y == hy+1)
			//cr2 = true
			//crt = 'right'
			
			//if( x == hx && y == hy-1)
			//cr3 = true
			//crt = 'left'
			}
			
			
			//if(self.snake[snk].xy[i+2])
			{
			//var x=self.snake[snk].xy[i].x
			//var y=self.snake[snk].xy[i].y
			
			//var x1=self.snake[snk].xy[i+2].x
			//var y1=self.snake[snk].xy[i+2].y
			
			///if(x != x1 && y != y1)
			//if()
			//cr++
			
			
			//if(x==hx)
			//xi++
			//if(y==hy)
			//yi++
			}
			
			
		}
		
		//if(cr > 2)
		//alert('cr > 2 !!!')
		//console.log('y '+yi)
		
		
		if( this.check_collision( nx, ny, this.wallArray.xy ) )
		{
		if(d == "right" || d == "left")
			if(this.check_collision( hx, hy+1, this.wallArray.xy ))
			d='up';
			else
			d='down'
		
		else if(d == "up" || d == "down") 
			if(this.check_collision( hx+1, hy, this.wallArray.xy ))
			d='left';
			else
			d='right'
		
			
			//if(crt)
			//d = crt
		}
		
		
		
		
			//var xx = Math.abs(food.length[0].x - hx) 
			//var yy = Math.abs(food.length[0].y - hy)
			//var fmin = xx + yy
			
		//for(var i = 1; i < food.length; i++ )
		{
			//var minx = food.length[i].x > hx ? food.length[i].x : hx
			//var miny
			//var xx = Math.abs(food.length[i].x - hx) 
			//var yy = Math.abs(food.length[i].y - hy) 
			
			//if( fmin > xx + yy )
			//fmin = i
			
			//This will create a horizontal snake starting from the top left
			//snake_array.push({x: i-sl+1, y:1});
			//this.wallArray.xy.push({x: i+14, y: 4, m: 1 });
			
		}
		// find closest food
		
		return d
	},
	
	
	snakeExists: function()
	{
		var self = this
		var exists = false
		for(var i = 0; i < self.snake.length; i++ )
		{
			if( self.snake[i].xy )
			exists = true
			
		}
		return exists
	},
	
	
	updateSnake: function(snk)
	{
		var self = this
		
		
		
		
		
		
		var nx = self.snake[snk].xy[0].x;
		var ny = self.snake[snk].xy[0].y;
		
		var nx1 = self.snake[snk].xy[0].x;
		var ny1 = self.snake[snk].xy[0].y;
		
		//console.log(nx + ' x-y ' +ny)
		
		if(self.snake[snk].ai)
		self.snake[snk].dh = self.aiMove(nx, ny, self.snake[snk].dh, snk)
		
		//var nx2 = self.snake2.xy[0].x;
		//var ny2 = self.snake2.xy[0].y;
		//These were the position of the head cell.
		//We will increment it to get the new head position
		//Lets add proper direction based movement now
		
		
		
		nx = self.setX( nx, self.snake[snk].dh )
		ny = self.setY( ny, self.snake[snk].dh )
		
		
		var cc
		if(
			//nx == -1 || nx == w/cw || ny == -1 || ny == h/cw 
			//nx == -1 || nx == self.cpw || ny == -1 || ny == self.cph 
			//|| 
			
			//self.check_collision(nx, ny, self.snake[snk].xy ) || 
			cc = self.check_collision(nx, ny, self.wallArray.xy ) 
			 
			)
		{
			//restart game
			//console.log(cc)
			//alert(nx)
			//alert(ny)
			//self.gameOver()
			//alert('restart')
			
			//self.snake[snk] = {}
			
			
			self.snake[snk].isAlive = false
			
			
			setTimeout(function(){
				
				
				
				self.snake[snk].isAlive = true
				
				if(self.snake[snk].lives <= 0 )
				{
				self.snake[snk] = {}
				
				//self.$elem.find('.player'+snk ).remove()
				//self.snake.splice(snk,1)
				
				}
				else
				{
				self.snake[snk].lives -= 1
				//$('.snake_' + snk + '_l').html( self.snake[snk].lives )
				self.$elem.find('.player' + snk + ' .lives').html( self.snake[snk].lives ) 
			
				
				}
				
				
				if( !self.snakeExists() )
				self.gameOver()
				
				}, 1000)
			
			
			if( self.config.allowTwine == 1 )
			return false
			
			//return snk
			//self.resetGame();
			
			//Lets organize the code a bit now.
			//return snk;
		}
		
		//Lets write the code to make the snake eat the food
		//The logic is simple
		//If the new head position matches with that of the food,
		//Create a new head instead of moving the tail
				
		var in_food = self.foodExists(nx,ny)
		if(
			//nx == self.food.x && ny == self.food.y
			in_food !== false
			//self.foodExists(nx,ny) !== false
			//1 == 2
			)
		{
			//alert(1) 
			self.food.splice( in_food, 1 );
			
			if(self.food.t == 6)		// food poisoned
			{
				self.score = self.score - 1
				if(self.score < 0)
				{
					self.init();
					//Lets organize the code a bit now.
					return;
				}
			}
			else
			self.score++;
			
			self.snake[snk].points ++ ;
			
			//$('.snake_' + snk + '_p').html( self.snake[snk].points ) 
			self.$elem.find('.player' + snk + ' .points').html( self.snake[snk].points ) 
			

			if(self.config.allowGrowing)
			var tail = {x: nx, y: ny};
			else
			{
			var tail = self.snake[snk].xy.pop() //pops out the last cell
			tail.x = nx; tail.y = ny;
			}
				
				if( self.score % 3 == 0 )
				{
				self.level = self.level + 1
				self.speed = self.speed - 10
				//game_loop = setInterval(paint, speed);
				//setLoop(paint, speed);
				}
			
			var fl = self.food.length
			//fl = 5 - fl
			//if(fl < 5)

			var food_count = this.getRandomInt( 0, 2 )
			if( (food_count == 0 && fl == 0) || (fl > 4 && food_count > 0) )
			food_count = 1
			
			//food_count = 500
			
		
			//var food_count = 10
			//Create new food
			for(var i = 0; i < food_count; i++)
			{
			self.createFood(nx ,ny );
			}
			
			
		}
		else
		{
			//var tail = snake_array.pop(); //pops out the last cell
			
			
			{
			var tail = self.snake[snk].xy.pop() //pops out the last cell
			tail.x = nx; tail.y = ny;
			}
			
		}
		//The snake can now eat the food.
		//self.snake.xy.[0].y;
		//snake_array.unshift(tail); //puts back the tail as the first cell
		
		
		self.snake[snk].xy.unshift(tail);
		
		//var ax = []
		//var ay = []
		
		// direction of the tail 
		var sl = self.snake[snk].xy.length
		var x1 = self.snake[snk].xy[ sl - 1 ].x
		var y1 = self.snake[snk].xy[ sl - 1 ].y
		var x2 = self.snake[snk].xy[ sl - 2 ].x
		var y2 = self.snake[snk].xy[ sl - 2 ].y
		
		//if( (x1 == x2 && y1 > y2 && y1 != 0) || (y1 < y2 && y1 == 0 && y2 == self.cph )  )
		//self.dt = 'up'
		if( x1 == x2 )
		{
			if ( (y1 < y2 && (y2 - y1 == 1) ) || (y1 == self.cph-1 && y2 == 0 ) )
			self.snake[snk].dt = 'down'
			else
			self.snake[snk].dt = 'up'
		}
		else if (y1 == y2)
		{
			if( (x1 < x2 &&  (x2 - x1 == 1) ) || ( x1 == self.cpw-1 && x2 == 0 ) )
			self.snake[snk].dt = 'right'
			else
			self.snake[snk].dt = 'left'
		}
		
		//else if(x1 == x2 && y1 < y2 && y1 != self.cph )
		//self.dt = 'down'
		//else if( (y1 == y2 && x1 < x2 && x1 != 0) || ( x1 > x2 && x1 == self.cpw-1 && x2 == 0 )  )	// || (( x1 > x2 && x1 == self.cpw-1 && x2 == 0) )
		//self.dt = 'right'
		//else if(y1 == y2 && x1 > x2  )
		//self.dt = 'left'
		//alert( x1 )
		//alert( x2 )
		
		for(var i = 0; i < self.snake[snk].xy.length; i++)
		{
			var c = self.snake[snk].xy[i];
			//Lets paint 10px wide cells
			var type = 1
			if(nx == c.x && ny == c.y)	// head
			type = 2
			else if( i == self.snake[snk].xy.length - 1  )		// tail
			type = 3
			
			//ax.push(c.x)
			//ay.push(c.y)
			
			//self.paint_cell(c.x, c.y, type );
			
		}
		
		
		return false
	},
	
	
	drawSnake: function( snk )
	{
	
		var self = this
		
		for(var i = 0; i < self.snake[snk].xy.length; i++)
		{
			var c = self.snake[snk].xy[i];
			var c1 = false
			var c2 = false
			
			if( i < self.snake[snk].xy.length-1 )
			c2 =  self.snake[snk].xy[i+1] 
			if( i > 0 )
			c1 =  self.snake[snk].xy[i-1] 
			
			//self.snake.xy[i].y += 1
			
			var type = 1
			if(i == 0 )			// head
			{
				if(self.snake[snk].dh == 'right')
				var type = 3
				if(self.snake[snk].dh == 'left')
				var type = 5
				if(self.snake[snk].dh == 'up')
				var type = 6
				if(self.snake[snk].dh == 'down')
				var type = 4
			
			}
			else if(i == self.snake[snk].xy.length-1 )	// tail
			{
				if(self.snake[snk].dt == 'right')
				var type = 7
				else if(self.snake[snk].dt == 'left')
				var type = 9
				else if(self.snake[snk].dt == 'up')
				var type = 10
				else if(self.snake[snk].dt == 'down')
				var type = 8
			}
			
			if(c1 && c2)
			{
				//if( c1.x == c.x && c.y == c2.y)
				//if( c1.y < c.y )
				//var type = 13
				//else
				//var type = 12
				//console.log(c.x + " - "+ self.cpw)
				if( c.x != self.cpw-1 && c.x != 0 
					&& c.y != self.cph-1 && c.y != 0)
				{
				if( c.x == c2.x && c.y == c1.y && c.x > c1.x && c.y < c2.y )
					var type = 11
				if( c.x == c2.x && c.y == c1.y && c.x < c1.x && c.y < c2.y )
					var type = 14
					
				if( c.x == c1.x && c.y == c2.y && c.x > c2.x && c.y < c1.y )
					var type = 11
				if( c.x == c1.x && c.y == c2.y && c.x < c2.x && c.y < c1.y )
					var type = 14
				
				
				if( c.x == c1.x && c.y == c2.y && c.x > c2.x && c.y > c1.y )
					var type = 12
				if( c.x == c2.x && c.y == c1.y && c.x > c1.x && c.y > c2.y )
					var type = 12
			
				if( c.x == c1.x && c.y == c2.y && c.x < c2.x && c.y > c1.y )
					var type = 13
				if( c.x == c2.x && c.y == c1.y && c.x < c1.x && c.y > c2.y )
					var type = 13
				}
				
				
				/*	
				if( c.x == c2.x && c.y == c1.y && c.x < c1.x && c.y < c2.y )
					var type = 14
				if( c.x == c2.x && c.y == c1.y && c.x > c1.x && c.y > c2.y )
					var type = 12
				if( c.x == c2.x && c.y == c1.y && c.x < c1.x && c.y > c2.y )
					var type = 13
					
				
				if( c.y == c2.y && c.x == c1.x && c.x > c1.x && c.y < c2.y )
					var type = 11
				if( c.y == c2.y && c.x == c1.x && c.x < c1.x && c.y < c2.y )
					var type = 14
				if( c.y == c2.y && c.x == c1.x && c.x > c1.x && c.y > c2.y )
					var type = 12
				if( c.y == c2.y && c.x == c1.x && c.x < c1.x && c.y > c2.y )
					var type = 13
				*/	
				//else
				//var type = 14
			}
			//if(nx == c.x && ny == c.y)	// head
			//type = 2
			//else if( i == snake.xy.length - 1  )		// tail
			//type = 3
			
			//ax.push(c.x)
			//ay.push(c.y)
			//type = false
			if(! self.snake[snk].isAlive && i != 0 )
			type = 2
			
			//if (type1)
			//type = type1
			
			self.drawCell( c.x, c.y, snk+'_'+type );
			
		}
	
		
		
		
	},
	
	
		

	
	gameUpdate : function( )
	{
		var self = this
		//var max = 0
		//var rmv_snk = []
		/*
		for(var snk = 0; snk < self.snake.length; snk++)
		{
		
			if( self.snake[snk].xy && self.snake[snk].xy[0] )
			{
					var nx = self.snake[snk].xy[0].x;
		var ny = self.snake[snk].xy[0].y;
		
		//var nx2 = self.snake2.xy[0].x;
		//var ny2 = self.snake2.xy[0].y;
		//These were the position of the head cell.
		//We will increment it to get the new head position
		//Lets add proper direction based movement now
		if(self.snake[snk].dh == "right") nx++;
		else if(self.snake[snk].dh == "left") nx--;
		else if(self.snake[snk].dh == "up") ny--;
		else if(self.snake[snk].dh == "down") ny++;
		
				//alert(self.cpw)
		//alert(self.cph)
		//
		//Lets add the game over clauses now
		//This will restart the game if the snake hits the wall
		//Lets add the code for body collision
		//Now if the head of the snake bumps into its body, the game will restart
		
		if( nx == self.cpw)
		nx = 0
		if( ny == self.cph)
		ny = 0
		
		if( nx == -1 )
		//alert(1)
		nx = self.cpw
		if( ny == -1 )
		ny = self.cph
		//alert(1)
		
		if(
			//nx == -1 || nx == w/cw || ny == -1 || ny == h/cw 
			//nx == -1 || nx == self.cpw || ny == -1 || ny == self.cph 
			//|| 
			
			//self.check_collision(nx, ny, self.snake[snk].xy ) || 
			self.check_collision(nx, ny, self.wallArray.xy ) 
			 
			)
			{
				//restart game
				
				//alert(nx)
				//alert(ny)
				
				//alert('restart')
				
				//self.snake[snk] = {}
				self.snake[snk].isAlive = false
				//self.resetGame();
				
				//Lets organize the code a bit now.
				//return snk;
			}
			}
		}
		*/
		
		//console.log(self.speed + 1)
		
		//if( self.frames % (300) == 0 )
		
		
		for(var i = 0; i < self.snake.length; i++)
		{
			//if( self.frames % self.snake[i].s == 0 )
			//return
			//if(rmv_snk[i] )
			//if( self.snake[ rmv_snk[i] ] )
			console.log(self.snake[i].s)
			//if( self.frames % self.snake[i].s == 0 )
			
			//self.snake[ rmv_snk[i] ] = {}
			
			if(!self.snake[i].isAlive)
			{
				
				
			}
			
		}
		
		
		
		for(var i = 0; i < self.snake.length; i++)
		{
		
			if( self.snake[i].xy && self.snake[i].xy[0] )
			{
			//console.log(self.snake[i].s)
			
			
			if( self.frames % self.snake[i].s == 0 )
			//return
			{
			if( this.snake[i].isAlive )
			 var snkx = self.updateSnake( i )
			//if(snkx)
			//rmv_snk.push(i)
			}
			
			}
		
			
		
		}
		
		
		
		
		
		
		
	},
	

	
	
	
	//Lets paint the snake now
	gameDraw : function()
	{
		var self = this
		//alert(54)
		//alert()
		//To avoid the snake trail we need to paint the BG on every frame
		//Lets paint the canvas now
		
		//ctx.fillStyle = "white";
		//ctx.fillRect(0, 0, w, h);
		//ctx.strokeStyle = "black";
		//ctx.strokeRect(0, 0, w, h);
		
		
		self.$elem.find('.pt')
			.removeClass(function() { 
				 var toReturn = '',
					 classes = this.className.split(' ');
				 for(var i = 0; i < classes.length; i++ ) {
					 if( /c\d/.test( classes[i] ) ) {   // Filters 
						 toReturn += classes[i] +' ';
					 }
				 }
				 return toReturn ; //  Returns all classes to be removed 
			});
		
		
		//$('.pt').text("")
		//The movement code for the snake to come here.
		//The logic is simple
		//Pop out the tail cell and place it infront of the head cell
	
		
		

		for(var i = 0; i < self.snake.length; i++)
		{
			if( self.snake[i].xy && self.snake[i].xy[0]  )
			{
			//console.log(i)
			
			
			
			self.drawSnake( i )
			}
		}
		
		
		for(var i = 0; i < self.wallArray.xy.length; i++)
		{
			var c = self.wallArray.xy[i];
			self.drawCell( c.x, c.y, 2 );
		}
		
		
		for(var i = 0; i < self.food.length; i++)
		{
			//var c = self.wallArray.xy[i];
			//self.drawCell( c.x, c.y, 2 );
			
			self.drawCell( self.food[i].x, self.food[i].y, self.food[i].t );
		}
		
		
		
		//var score_text = "Score: " + score + " Level: " + level;
		//ctx.fillStyle = 'black';
		//ctx.fillText(score_text, 20, h-20);
	},
	
	
	
	
	//Lets first create a generic function to paint cells
	 drawCell : function(x, y, type )
	{
		//img = cell_img[ type ]
		//var pat=ctx.createPattern(img,"repeat");

		//ctx.drawImage(img, x*cw, y*cw, cw , cw );
		this.$elem.find('.xy_'+x+'_'+y).addClass( 'c'+ type );
		
		
		//document.getElementById( 'p_'+y+'_'+x ).className = 'pt';
		//document.getElementById( 'p_'+y+'_'+x ).className = 'pt c'+ type;
		
		
		//$('#p_'+y+'_'+x).css( 'background' , '#'+ type + type + type ) 
		//$('#p_'+y+'_'+x).css( 'background-image', img )
		//$('#p_'+y+'_'+x).text( type )
				
		//ctx.fillStyle = pat;
		//ctx.fillRect(x*cw, y*cw, cw, cw);
		//ctx.strokeStyle = "white";
		//ctx.strokeRect(x*cw, y*cw, cw, cw);
	},
	
	
	//ar1 = l_tpl[3][ 0 ]
	//console.log( JSON.stringify( snake.xy ) )
	//arr = []
	
	check_collision : function(x, y, array )
	{
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		var snkx = []
		for(var i = 0; i < this.snake.length; i++)
		{
			//console.log(i)
			if( this.snake[i].xy && this.snake[i].xy[0] )
			for(var j = 0; j < this.snake[i].xy.length; j++)
			{
			if( this.snake[i].xy[j].x == x && this.snake[i].xy[j].y == y  )
			 return true
			 //snkx.push(i)
			}
			
		}
		
		
		if(array)
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			return true;
			//snkx.push(i)
			// 
		}
		
		//if(snkx.length > 0)
		//return snkx;
		
		//if ( this.canvasField[y] && this.canvasField[y][x] > 0  )
		//	return true
			
		return false;
	},
	
	

	
	 get_min : function( x_y )
	{
			var min = this.snake.xy[0][x_y]
			for(var i = 0; i < this.snake.xy.length; i++)
			{
				//var c = snake[i];
				if(min > this.snake.xy[i][x_y])
				min = this.snake.xy[i][x_y] 
			}
			return min
	},
	
	
	
	
	  
	  
		
		
		
	}
		
    


    // You don't need to change something below:
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing any
    // public function (ie. a function whose name doesn't start
    // with an underscore) to be called via the jQuery plugin,
    // e.g. $(element).defaultPluginName('functionName', arg1, arg2)
    $.fn[pluginName] = function ( options ) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'plugin_' + pluginName)) {
					
                    // if it has no instance, create a new one,
                    // pass options to our plugin constructor,
                    // and store the plugin instance
                    // in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new snakePlugin( this, options ));
                }
            });

        // If the first parameter is a string and it doesn't start
        // with an underscore or "contains" the `init`-function,
        // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			
            // Cache the method call
            // to make it possible
            // to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof snakePlugin && typeof instance[options] === 'function') {
					//alert( options )
                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'plugin_' + pluginName, null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

}(jQuery, window, document));

