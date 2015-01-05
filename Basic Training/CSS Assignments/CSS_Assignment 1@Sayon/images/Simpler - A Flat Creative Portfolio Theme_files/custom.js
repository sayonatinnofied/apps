$(window).load(function(){
	
	/* Scroll to top */
	$('.go-top').click(function(){
		$('body').animate({scrollTop: 0}, 1000);
	});

	/* Instagram Feed */
    $(function() {
	  $(".instagram").instagram({
	      hash: 'love'
	    , clientId: 'dd97aa2734a543aeaa1022900970b486'
	    , show: 8
	  });
	});

    /* Testimonials Slide */
   if( typeof jQuery().cycle === "function" ){
		$('.cycle-slideshow').cycle({
			slides: '> blockquote',
			pager: '> .cycle-pager'
		});
	}

	// Scrollspy
		
	$('#services').waypoint(function() {
		var t = 0;
		$('#services .service i').each(function(){
			var $this = $(this);
			setTimeout(function(){
				$this.addClass('show');
			},t);
			t = t + 100;
		});
	}, {offset: $(window).height()});
	
	// Scrollspy team
		
	$('.our-team').waypoint(function() {
		var t = 0;
		$('.our-team .member-team').each(function(){
			var $this = $(this);
			setTimeout(function(){
				$this.css('top', 0);
			},t);
			t = t + 100;
		});
	}, {offset: $(window).height()});
	
	/* Init portfolio */
    var portfolio = new Portfolio();
    portfolio.init();
    
    /* Portfolio pagination */
    $('#portfolio .pagination a').click(function(e){
		e.preventDefault();
        portfolio[$(this).data('direction')]();
        return false;
    });
	
	/* Alerts */
	$('.alert-close').click(function(){
		var alert = $(this).parent('.alert');
		alert.addClass('close');
		setTimeout(function(){
			alert.remove();
		}, 500);
	});
	
	/* Title animation */
	$('.page-title h2, h2.page-title').addClass('on');
	
	/* Responsive nav */
	$(".menu ul").eq(0).tinyNav({header: '- Navigation -'});
	
	$(this).scroll();

}).resize();

function Portfolio(){
    
    var that = this;
    
    this.init = function(page){
        page = typeof(page) == 'undefined' ? 0 : page;
        $('#portfolio.isotope .pages .row').eq(page).addClass('active').clone().appendTo('#portfolio_holder');
        that.initIsotope();
        that.attachEvents();
    }
    
    this.initIsotope = function(){
        /* Isotope */
        that.container = $('#portfolio_holder > .row');
			that.container.isotope({
			resizable: false
		});

		$('.filter ul a').off().click(function(){
			var selector = '.' + $(this).attr('data-filter');
			that.container.isotope({ 
				filter: selector,
						animationOptions: {
				 duration: 750,
				 easing: 'linear',
				 queue: false
			   }
			  });
			  return false;
		});
    }
    
    this.attachEvents = function(){
        $(window).resize(function(){
            that.container.isotope('reLayout');
        });
        /* Portfolio load */
		var t = 0;
		$('.portfolio-item').each(function(){
			var elem = $(this);
			setTimeout(function(){
				elem.addClass('on');
			}, t);
			t = t + 300;
		});
    }
    
    this.prev = function(){
        var p = $('#portfolio.isotope .pages .row.active').prev('.row');
        if(p.length > 0){
            that.showPage(p.index());
        }
    }
    
    this.next = function(){
        var p = $('#portfolio.isotope .pages .row.active').next('.row');
        if(p.length > 0){
            that.showPage(p.index());
        }
    }
    
    this.showPage = function(index){
    		/* Portfolio load */
		   var t = 0;
		   $('.portfolio-item').each(function(){
		   	$(this).removeClass('on');
		   	var elem = $(this);
		   	setTimeout(function(){
		   		elem.addClass('on');
		   	}, t);
		   	t = t + 300;
		   });
        $('#portfolio.isotope .pages .row.active').removeClass('active');
        that.container.isotope('destroy');
        $('#portfolio_holder').empty();
        that.init(index);
    }
    
}