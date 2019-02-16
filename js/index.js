/*
.row1 {
background-color:#b3edff;
}
*/
var storage = window.localStorage;
var value_date = storage.getItem("date");
var result = [];
var rowName = [];
var answer = [];
var answer1 = [];
var one_value = [];
var two_value = [];
var array_pictures_counter = 0;
var array_pictures = [];
var fact_afr = [ 
					{ href : 'facts/FungicideBathAfr.jpg', title : 'Fungicide Bath', size:"744x1052" },
                    /*{ href : 'facts/InlineDrenchFlooderAfr.jpg', title : 'Inline Drench Flooder' },*/
					{ href : 'facts/PrePackhouseDrenchAfr.jpg', title : 'Pre-Packhouse Drench', size:"744x1052" },
                    { href : 'facts/WaterSanitationAfr.jpg', title : 'Water Sanitation' , size:"744x1052"},
                    { href : 'facts/WaxApplicationAfr.jpg', title : 'Wax Application' , size:"744x1052"}
				];
var fact_eng = [ 
					{ href : 'facts/FungicideBathEng.jpg', title : 'Fungicide Bath', size:"744x1052" },
                    /*{ href : 'facts/InlineDrenchFlooderEng.jpg', title : 'Inline Drench Flooder' },*/
                    { href : 'facts/PrePackhouseDrenchEng.jpg', title : 'Pre-Packhouse Drench' , size:"744x1052"},
					{ href : 'facts/WaterSanitationEng.jpg', title : 'Water Sanitation' , size:"744x1052"},
                    { href : 'facts/WaxApplicationEng.jpg', title : 'Wax Application' , size:"744x1052"}
				];
var label_pic = [ 
					{ href : 'labels/CitruCure1.jpg', title : 'Full labels on ICA website.', size:"1921x1920" },
					{ href : 'labels/Hypercide1.jpg', title : 'Full labels on ICA website.', size:"1920x888" },
					{ href : 'labels/Imaculate300EC1.jpg', title : 'Full labels on ICA website.', size:"1921x1921" },
                    { href : 'labels/ImazaCure500EC1.jpg', title : 'Full labels on ICA website.', size:"1920x1920" },
                    { href : 'labels/ImazaCure750EC1.jpg', title : 'Full labels on ICA website.', size:"1920x687" },
                    { href : 'labels/PropiCureLabel1.jpg', title : 'Full labels on ICA website.', size:"1921x1921" },
					{ href : 'labels/PropirlyLabel1.jpg', title : 'Full labels on ICA website.', size:"1920x1920" },
                    { href : 'labels/Protector400SC1.jpg', title : 'Full labels on ICA website.', size:"1920x1920" },
                    { href : 'labels/Sporekill1.jpg', title : 'Full labels on ICA website.', size:"1920x1920" },
					{ href : 'labels/TEACHER1.jpg', title : 'Full labels on ICA website.', size:"1920x1920" },
                    { href : 'labels/Thiabendazole500SC1.jpg', title : 'Full labels on ICA website.', size:"1920x1920" }
				];
var gau = ['CitriCure', 'Guazalil SL'];
var ima = ['Guazalil SL','ImazaCure 500 EC','ImaCulate 300 EC', 'ImazaCure 750 SG'];
var tbz = ['ICA Thiabendazole 500 SC'];
var proc = ['ICA-Prochloraz 450 EC'];
var pyr = ['Protector 400 SC', 'Propirly 270 EC'];
var prop = ['PropiCure 250 EC', 'Propirly 270 EC'];
var flud = ['Teacher 230 SC'];
var ddac = ['Sporekill'];
var dbx;
var data1;
var date_file = null;
var boolean_row = true;
// Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function open_pictures(picture_arr) {
    array_pictures = picture_arr;
}
function nothing_func() {
 return false;
}
function alert_uncheck_za() {
  navigator.notification.alert("Residues must comply to import as well as export countries (RSA) MRL's.",nothing_func,'Note', 'Done');
}
function alert_desc() {
navigator.notification.alert("ICA citrus post-harvest fungicide choices for different export markets.\n\nNote that compliance with product label instructions will ensure that residues do not exceed RSA MRL, but may not meet the import requirements of countries when MRL’s are lower than in RSA.",nothing_func,'Note', 'Done');
}
function onDeviceReady() {
    (function() {

		var initPhotoSwipeFromDOM = function(gallerySelector) {

			var parseThumbnailElements = function(el) {
			    var thumbElements = el.childNodes,
			        numNodes = thumbElements.length,
			        items = [],
			        el,
			        childElements,
			        thumbnailEl,
			        size,
			        item;

			    for(var i = 0; i < numNodes; i++) {
			        el = thumbElements[i];

			        // include only element nodes 
			        if(el.nodeType !== 1) {
			          continue;
			        }

			        childElements = el.children;

			        size = el.getAttribute('data-size').split('x');

			        // create slide object
			        item = {
						src: el.getAttribute('href'),
						w: parseInt(size[0], 10),
						h: parseInt(size[1], 10),
						author: el.getAttribute('data-author')
			        };

			        item.el = el; // save link to element for getThumbBoundsFn

			        if(childElements.length > 0) {
			          item.msrc = childElements[0].getAttribute('src'); // thumbnail url
			          if(childElements.length > 1) {
			              item.title = childElements[1].innerHTML; // caption (contents of figure)
			          }
			        }


					var mediumSrc = el.getAttribute('data-med');
		          	if(mediumSrc) {
		            	size = el.getAttribute('data-med-size').split('x');
		            	// "medium-sized" image
		            	item.m = {
		              		src: mediumSrc,
		              		w: parseInt(size[0], 10),
		              		h: parseInt(size[1], 10)
		            	};
		          	}
		          	// original image
		          	item.o = {
		          		src: item.src,
		          		w: item.w,
		          		h: item.h
		          	};

			        items.push(item);
			    }

			    return items;
			};

			// find nearest parent element
			var closest = function closest(el, fn) {
			    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
			};

			var onThumbnailsClick = function(e) {
			    e = e || window.event;
			    e.preventDefault ? e.preventDefault() : e.returnValue = false;

			    var eTarget = e.target || e.srcElement;

			    var clickedListItem = closest(eTarget, function(el) {
			        return el.tagName === 'A';
			    });

			    if(!clickedListItem) {
			        return;
			    }

			    var clickedGallery = clickedListItem.parentNode;

			    var childNodes = clickedListItem.parentNode.childNodes,
			        numChildNodes = childNodes.length,
			        nodeIndex = 0,
			        index;

			    for (var i = 0; i < numChildNodes; i++) {
			        if(childNodes[i].nodeType !== 1) { 
			            continue; 
			        }

			        if(childNodes[i] === clickedListItem) {
			            index = nodeIndex;
			            break;
			        }
			        nodeIndex++;
			    }

			    if(index >= 0) {
			        openPhotoSwipe( index, clickedGallery );
			    }
			    return false;
			};

			var photoswipeParseHash = function() {
				var hash = window.location.hash.substring(1),
			    params = {};

			    if(hash.length < 5) { // pid=1
			        return params;
			    }

			    var vars = hash.split('&');
			    for (var i = 0; i < vars.length; i++) {
			        if(!vars[i]) {
			            continue;
			        }
			        var pair = vars[i].split('=');  
			        if(pair.length < 2) {
			            continue;
			        }           
			        params[pair[0]] = pair[1];
			    }

			    if(params.gid) {
			    	params.gid = parseInt(params.gid, 10);
			    }

			    return params;
			};

			var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
			    var pswpElement = document.querySelectorAll('.pswp')[0],
			        gallery,
			        options,
			        items;

				items = parseThumbnailElements(galleryElement);

			    // define options (if needed)
			    options = {

			        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

			        getThumbBoundsFn: function(index) {
			            // See Options->getThumbBoundsFn section of docs for more info
			            var thumbnail = items[index].el.children[0],
			                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
			                rect = thumbnail.getBoundingClientRect(); 

			            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			        },

			        addCaptionHTMLFn: function(item, captionEl, isFake) {
						if(!item.title) {
							captionEl.children[0].innerText = '';
							return false;
						}
						captionEl.children[0].innerHTML = item.title +  '<br/><small>Photo: ' + item.author + '</small>';
						return true;
			        },
					
			    };


			    if(fromURL) {
			    	if(options.galleryPIDs) {
			    		// parse real index when custom PIDs are used 
			    		// http://photoswipe.com/documentation/faq.html#custom-pid-in-url
			    		for(var j = 0; j < items.length; j++) {
			    			if(items[j].pid == index) {
			    				options.index = j;
			    				break;
			    			}
			    		}
				    } else {
				    	options.index = parseInt(index, 10) - 1;
				    }
			    } else {
			    	options.index = parseInt(index, 10);
			    }

			    // exit if index not found
			    if( isNaN(options.index) ) {
			    	return;
			    }




			    if(disableAnimation) {
			        options.showAnimationDuration = 0;
			    }

			    // Pass data to PhotoSwipe and initialize it
			    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);

			    // see: http://photoswipe.com/documentation/responsive-images.html
				var realViewportWidth,
				    useLargeImages = false,
				    firstResize = true,
				    imageSrcWillChange;

	gallery.listen('beforeResize', function() {

					var dpiRatio = window.devicePixelRatio ? window.devicePixelRatio : 1;
					dpiRatio = Math.min(dpiRatio, 2.5);
				    realViewportWidth = gallery.viewportSize.x * dpiRatio;


				    if(realViewportWidth >= 1200 || (!gallery.likelyTouchDevice && realViewportWidth > 800) || screen.width > 1200 ) {
				    	if(!useLargeImages) {
				    		useLargeImages = true;
				        	imageSrcWillChange = true;
				    	}
				        
				    } else {
				    	if(useLargeImages) {
				    		useLargeImages = false;
				        	imageSrcWillChange = true;
				    	}
				    }

				    if(imageSrcWillChange && !firstResize) {
				        gallery.invalidateCurrItems();
				    }

				    if(firstResize) {
				        firstResize = false;
				    }

				    imageSrcWillChange = false;

				});

				gallery.listen('gettingData', function(index, item) {
				    if( useLargeImages ) {
				        item.src = item.o.src;
				        item.w = item.o.w;
				        item.h = item.o.h;
				    } else {
				        item.src = item.m.src;
				        item.w = item.m.w;
				        item.h = item.m.h;
				    }
				});

			    gallery.init();
			};

			// select all gallery elements
			var galleryElements = document.querySelectorAll( gallerySelector );
			for(var i = 0, l = galleryElements.length; i < l; i++) {
				galleryElements[i].setAttribute('data-pswp-uid', i+1);
				galleryElements[i].onclick = onThumbnailsClick;
			}

			// Parse URL and open gallery if it contains #&pid=3&gid=1
			var hashData = photoswipeParseHash();
			if(hashData.pid && hashData.gid) {
				openPhotoSwipe( hashData.pid,  galleryElements[ hashData.gid - 1 ], true, true );
			}
		};
                initPhotoSwipeFromDOM('.demo-gallery');
                initPhotoSwipeFromDOM('.demo-gallery1');
				initPhotoSwipeFromDOM('.demo-gallery2');
	})();
    $( '#gallery' ).click( function( e ) {
				e.preventDefault();
				$("#button3_pressed").click();
				/*$.swipebox( [ 
					 
					{ href : 'labels/CitruCure1.jpg', title : 'Full labels on ICA website.' },
					{ href : 'labels/Hypercide1.jpg', title : 'Full labels on ICA website.' },
					{ href : 'labels/Imaculate300EC1.jpg', title : 'Full labels on ICA website.' },
                                        { href : 'labels/ImazaCure500EC1.jpg', title : 'Full labels on ICA website.' },
                                        { href : 'labels/ImazaCure750EC1.jpg', title : 'Full labels on ICA website.' },
                                        { href : 'labels/PropiCureLabel1.jpg', title : 'Full labels on ICA website.' },
					{ href : 'labels/PropirlyLabel1.jpg', title : 'Full labels on ICA website.' },
                                        { href : 'labels/Protector400SC1.jpg', title : 'Full labels on ICA website.' },
                                        { href : 'labels/Sporekill1.jpg', title : 'Full labels on ICA website.' },
					{ href : 'labels/TEACHER1.jpg', title : 'Full labels on ICA website.' },
                                        { href : 'labels/Thiabendazole500SC1.jpg', title : 'Full labels on ICA website.' }

				], {hideBarsDelay : 0, removeBarsOnMobile: false, loopAtEnd: true});*/

			} );
$( '#gallery1' ).click( function( e ) {
				e.preventDefault();
                                $("#button1_pressed").click();
				/*$.swipebox( [ 
					{ href : 'facts/FungicideBathEng.jpg', title : 'Fungicide Bath' },
                                        { href : 'facts/InlineDrenchFlooderEng.jpg', title : 'Inline Drench Flooder' },
                                        { href : 'facts/PrePackhouseDrenchEng.jpg', title : 'Pre-Packhouse Drench' },
					{ href : 'facts/WaterSanitationEng.jpg', title : 'Water Sanitation' },
                                        { href : 'facts/WaxApplicationEng.jpg', title : 'Wax Application' }
				], {hideBarsDelay : 0, removeBarsOnMobile: false, loopAtEnd: true});*/
			} );
$( '#gallery2' ).click( function( e ) {
				e.preventDefault();
                                $("#button2_pressed").click();
				/*$.swipebox( [ 
					{ href : 'facts/FungicideBathAfr.jpg', title : 'Fungicide Bath' },
                                        { href : 'facts/InlineDrenchFlooderAfr.jpg', title : 'Inline Drench Flooder' },
					{ href : 'facts/PrePackhouseDrenchAfr.jpg', title : 'Pre-Packhouse Drench' },
                                        { href : 'facts/WaterSanitationAfr.jpg', title : 'Water Sanitation' },
                                        { href : 'facts/WaxApplicationAfr.jpg', title : 'Wax Application' }
				], {hideBarsDelay : 0, removeBarsOnMobile: false, loopAtEnd: true});*/
			} );
var sCSV = {"c":["RSA", "EU", "USA", "Codex A", "Codex B", "Japan","Korea", "Canada", "Taiwan", "GSO", "Hong Kong"], "Lemons":[{"DDAC": "6","Fludioxonil": "10", "Guazatine": "5","Imazalil": "5", "Prochloraz": "2", "Propiconazole": "6" ,"Pyrimethanil": "10","TBZ": "6"} ,{"DDAC": "N", "Fludioxonil" : "10", "Guazatine" : "N", "Imazalil" : "5", "Prochloraz": "10", "Propiconazole" : "5", "Pyrimethanil" : "8" ,"TBZ" : "7"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil" : "10", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10","TBZ": "10"},{"DDAC": "N","Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "7", "TBZ": "7"},{"DDAC": "6", "Fludioxonil": "7", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "6", "Pyrimethanil": "10", "TBZ": "5"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "7", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "7", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "4", "Pyrimethanil": "7", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "7", "TBZ": "7"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "10", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "10", "TBZ": "10"}],"Grapefruit":[{"DDAC": "6", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "2", "Propiconazole": "6", "Pyrimethanil": "10", "TBZ": "6"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "5", "Pyrimethanil": "8", "TBZ": "7"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "10", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "7", "TBZ": "7"},{"DDAC": "6", "Fludioxonil": "7", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "6", "Pyrimethanil": "10", "TBZ": "5"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "7", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "5", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "4", "Pyrimethanil": "7", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "7", "TBZ": "7"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "10", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "10", "TBZ": "10"}], "Oranges":[{"DDAC": "6", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "2", "Propiconazole": "6", "Pyrimethanil": "10", "TBZ": "6"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "9", "Pyrimethanil": "8", "TBZ": "7"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "10", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "9", "Pyrimethanil": "7", "TBZ": "7"},{"DDAC": "6", "Fludioxonil": "7", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "6", "Pyrimethanil": "10", "TBZ": "5"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "7", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "5", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "4", "Pyrimethanil": "7", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "9", "Pyrimethanil": "7", "TBZ": "7"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "10", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "10", "TBZ": "10"}], "Mandarin types":[{ "DDAC": "6", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "2", "Propiconazole": "6", "Pyrimethanil": "10", "TBZ": "6"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "5", "Pyrimethanil": "8", "TBZ": "7"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "10", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "7", "TBZ": "7"},{"DDAC": "6", "Fludioxonil": "7", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "6", "Pyrimethanil": "10", "TBZ": "5"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "1", "Propiconazole": "8", "Pyrimethanil": "1", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "8", "Pyrimethanil": "10", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "7", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "N", "Propiconazole": "N", "Pyrimethanil": "7", "TBZ": "10"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "5", "Imazalil": "5", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "7", "TBZ": "7"},{"DDAC": "N", "Fludioxonil": "10", "Guazatine": "N", "Imazalil": "10", "Prochloraz": "10", "Propiconazole": "N", "Pyrimethanil": "10", "TBZ": "10"}]};	
	//var lines=sCSV.split("\n");

	var headers=sCSV["c"];
	var i = 0;
	Object.keys(sCSV).forEach(function(key) {
		if (key != "c") {
		    var obj = {};
			rowName[i] = key;
			$("#checkbox_div").append(key+"<input class='name' name='citrus_rad' type='radio' id='"+i+"'><br>");
			for(var j=0;j<headers.length;j++){
				if (i == 1) {
		            if (headers[j] == 'RSA') {
						var country_name_text = 'RSA';
						var selected = country_name_text;
						$("#checkbox_div2").append("<div class='country_name' style='position: relative' id='"+headers[j].toLowerCase()+"_con'>"+headers[j]+"<input class='input_con_name' type='checkbox' checked='true' data-country-name='"+headers[j]+"' id='"+headers[j]+"'></div>");
						var string_html0 = '<div id="'+selected+'_sel"> '+ country_name_text +' <input type="checkbox" checked="true"  class="input_con_name_sel" data-country-name0 = "'+country_name_text +'"/> </div>';
						$("#check_countries").append(string_html0);
					} else {
						$("#checkbox_div2").append("<div class='country_name' style='position: relative' id='"+headers[j].toLowerCase()+"_con'>"+headers[j]+"<input class='input_con_name' type='checkbox' data-country-name='"+headers[j]+"' id='"+headers[j]+"'></div>");
		            }
		  		}
				obj[headers[j]] = sCSV[key];

			}
			result.push(obj);
			i++;
    	}
	});
	

	//result.pop();
	var sCSV = {"Codex A": ["Angola", "Benin", "Botswana", "Congo", "Gabon", "Kenya", "Madagascar", "Mali", "Mauritius", "Mauritania", "Namibia", "Senegal", "Seychelles", "Reunion", "Sudan", "Tanzania", "China", "Indonesia", "Malaysia", "Philippines", "Singapore", "Vietnam"], 
"Codex B" :["Burkina Faso", "Cameroon", "Côte d'Ivoire", "Malawi", "Nigeria", "Tunisia", "Uganda", "Bangladesh", "Sri Lanka", "Iran", "Kuwait", "Pakistan", "Azerbaijan", "Jordan", "Georgia", "Russia"], 
"GSO":["United Arab Emirates", "Bahrain", "Saudi Arabia", "Oman", "Qatar", "Kuwait", "Yemen"]};
	Object.keys(sCSV).forEach(function(key) {
		for(var j=0;j<sCSV[key].length;j++){
  				$("#checkbox_div2").append("<div class='country_name' style='position: relative' id='"+sCSV[key][j].toLowerCase()+"_con'>"+sCSV[key][j]+"<input class='input_con_name' data-country-name='"+sCSV[key][j]+"' type='checkbox' id='"+key+"'></div>");
  		}
		
	});
$('#checkbox_div2 div').sort(function (a, b)
	{
		return String.prototype.localeCompare.call(a.id.toLowerCase(), b.id.toLowerCase());
	}
).each(function() {
	elem.remove();
	var elem = $(this);
	$(elem).appendTo('#checkbox_div2');
});

  jQuery.fn.scrollTo = function(elem) { 
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top); 
    return this; 
};
$(".input_con_name").change(function () {
    var country_name_text = $(this).data('country-name');
    var selected = country_name_text.split(' ').join('_');
    if ($('#' + selected + '_sel').length == 0) {
        var string_html0 = '<div id="'+selected+'_sel"> '+ country_name_text +' <input type="checkbox" checked="true"  class="input_con_name_sel" data-country-name0 = "'+country_name_text +'"/> </div>';
        $("#check_countries").append(string_html0);
    } else {
        if (country_name_text == 'RSA') {
            alert_uncheck_za();
        }
        $('#' + selected + '_sel').remove();
    }
    $(".input_con_name_sel").change(function () {
        var country_name_text0 = $(this).data('country-name0');
        if (country_name_text0 == 'RSA') {
            alert_uncheck_za();
        }
        var selected0 = country_name_text0.split(' ').join('_');
        $('*[data-country-name="'+country_name_text0+'"]').prop('checked', false);
        $('#' + selected0 + '_sel').remove();
    });
});
$(".input_con_name_sel").change(function () {
        var country_name_text0 = $(this).data('country-name0');
        if (country_name_text0 == 'RSA') {
            alert_uncheck_za();
        }
        var selected0 = country_name_text0.split(' ').join('_');
        $('*[data-country-name="'+country_name_text0+'"]').prop('checked', false);
        $('#' + selected0 + '_sel').remove();
    });
    }
    // alert dialog dismissed
    function alertDismissed() {
            // do something
    }

    // Show a custom alertDismissed
    //
    function showAlert() {
        /*navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
	$('#test_d').append("test");*/
    }
    function go_to_div(div_go_to) {
        $(document).ready(function () {
    // Handler for .ready() called.
    $('html, body').animate({
        scrollTop: $('#'+div_go_to).offset().top
    }, 'slow');
});
    }
    function get_Values() {
	$("#answer").empty();
        var string_ans = '';
	$("#countries_selected").empty();
        var citrus_name = '';
	var checked_countries= [];
	var checked_citrus= [];
	var arrNoM = [];
	one_value = [];
	two_value = [];
	answer = [];

	$("#checkbox_div2 input:checked").each(function(){
		$("#countries_selected").append($(this).data('country-name')+", ");
		checked_countries.push($(this).attr('id'));	
	});
	$("#checkbox_div input:checked").each(function(){
                citrus_name = rowName[$(this).attr('id')-1]
		checked_citrus.push($(this).attr('id')-1);	
	});
	var htmlwrong = document.getElementById("countries_selected").innerHTML;
        document.getElementById("countries_selected").innerHTML = htmlwrong.substr(0, htmlwrong.length-2);
        document.getElementById("countries_selected").innerHTML += "<br><b>Citrus Commodity</b>: " + citrus_name;
	//console.log(checked_countries);
	//console.log(checked_citrus);
	for (var i = 0; i < checked_countries.length; i++) {
		for (var j = 0; j < checked_citrus.length; j++) {
			add_to_answer(result[parseInt(checked_citrus[j])][checked_countries[i]]);
		}
	}
	for (var i = 0; i < answer.length; i++) {
		var two_values = [];
		
		two_values = answer[i].split(" ");
		if (one_value.indexOf(two_values[0]) == -1) {
			if(two_values[1] == "N") {
				one_value[i] = two_values[0];
				two_value[i] = parseFloat("-1");
			} else if (two_values[1] == "Exempt") {
				one_value[i] = two_values[0];
				two_value[i] = parseFloat("-2");
			} else {
				one_value[i] = two_values[0];
				two_value[i] = parseFloat(two_values[1]);
			}
		} else {
			var index_val = one_value.indexOf(two_values[0]);
			var value = two_value[index_val];
			if(two_values[1] == "N") {
				two_value[index_val] = parseFloat("-1");
			} else if (two_values[1] == "E") {
				if (value == -1) {
				}  else {
					two_value[index_val] = parseFloat("-2");
				}
			} else {
				if (value == -2) {
					two_value[index_val] = parseFloat("-2");
				}  else if (value == -1) {
					two_value[index_val] = parseFloat("-1");
				} else if (parseFloat(two_values[1]) < value) {
					two_value[index_val] = parseFloat(two_values[1]);
				}
			}
		}
		
	}
        string_ans = "<table id='mymrltable'>";
        string_ans += "<tr><th style='text-align:left;'>Active </th><th>MRL</th><th style='text-align:left;'>Products</th> </tr>";
	var str = '';
        var arrProducts = [];
        var row = '';
	for (var i = 0; i < one_value.length; i++) {
                
		str = '';
                if (one_value[i] == "DDAC") {
			arrProducts = ddac;
                } else if (one_value[i] == "Fludioxonil") {
			arrProducts = flud;
		} else if (one_value[i] == "Guazatine") {
			arrProducts = gau;
		} else if (one_value[i] == "Imazalil") {
			arrProducts = ima;
		} else if (one_value[i] == "Prochloraz") {
			arrProducts = proc;
		} else if (one_value[i] == "Propiconazole") {
			arrProducts = prop;
		} else if (one_value[i] == "Pyrimethanil") {
			arrProducts = pyr;
		} else if (one_value[i] == "TBZ") {
			arrProducts = tbz;
		}
                for (var j = 0; j < arrProducts.length; j++) {
			str += "<div id ="+arrProducts[j].split(' ').join('_')+">" + arrProducts[j] + "</div>";
                }
		if (two_value[i] == -1) {
			//$("#answer").append(one_value[i]+ " N <br>");
			arrNoM = $.merge(arrNoM, arrProducts);
			
		} else if (two_value[i] == -2) {
                        if (boolean_row == true) {
                    row = 'row0';
                    boolean_row = false;
                } else {
                    row = 'row1';
                    boolean_row = true;
                }
			string_ans += "<tr class='"+row+"'> <td>" + one_value[i] + "</td><td align='center'> Exempt </td> <td>"+str+" </td></tr>";
		} else {
                        if (boolean_row == true) {
                    row = 'row0';
                    boolean_row = false;
                } else {
                    row = 'row1';
                    boolean_row = true;
                }
			string_ans +=  "<tr class='"+row+"'> <td>" + one_value[i] + "</td><td align='center'> " + two_value[i] +"</td> <td>"+str+" </td></tr>";
		}
	}
        if (boolean_row == true) {
                    row = 'row0';
                    boolean_row = false;
                } else {
                    row = 'row1';
                    boolean_row = true;
                }
        string_ans += "<tr class='"+row+"'> <td> Peracetic Acid Peroxide</td><td align='center'> <p style='color:#0095C1;'>*</p> </td> <td> HyperCide </td></tr>";
	string_ans += "</table></div>";
        $("#answer").append(string_ans);
	for (var j = 0; j < arrNoM.length; j++) {
	    $('#'+arrNoM[j].split(' ').join('_')).remove();
	}
	$("#answer").append("<p style='color:red;'> Residues must comply to import as well as export countries (RSA) MRL's.</p><p style='color:#0095C1;'>* No residue</p><p style='color:red;'>No guarantees are given that the MRL data is correct at time of use. It is the user's responsibility to be familiar with the latest MRL requirements of their markets. </p>");
go_to_div("end_div");
}
function add_to_answer(to_add) {
	Object.keys(to_add).forEach(function(key) {
		if (answer.indexOf(key + " " + to_add[key]) == -1) {
			answer.push(key + " " + to_add[key]);		
		}
	});
}
function scroll_to() {
	var $container = $('#checkbox_div2');
    	$value = $('#input_country').val().toLowerCase();
        var $scrolltodiv = $('div[id^='+$value+'][id$=_con]');
	$("#checkbox_div2").scrollTo($scrolltodiv);
}

