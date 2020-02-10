var contentArray = ["/img/1.png",
               			"/img/2.png",
                		"/img/3.png"];
var l = contentArray.length;	

 	$(function() {
 		for(var i = 0; i < l; i++) {	
 			var $imgL = $('<div class="popup-content">'+'<img src="' + contentArray[i] +'">'+'</div>');
 			$("#popup-content").append($imgL);		
 		};
 	});

 	$(function() {
 		var dragging = false;	
		var iX, iY;

		//mouse down
		$(".popup-content").on("mousedown", function(e) {	
			dragging = true;	
			iX = e.clientX - this.offsetLeft;
			iY = e.clientY - this.offsetTop;
		});

		//mouse move
		$(".popup-content").on("mousemove", function(e) {	
			if (dragging) {		
				var oX = e.clientX - iX;	
				var oY = e.clientY - iY;
				$(this).css({"left":oX + "px", "top":oY + "px"}); //$(this) specifies content which beeing moved
				return false;	
			}
		});

		//mouseup event
		$(".popup-content").on("mouseup", function(e) {		
			dragging = false;	
		});
	});