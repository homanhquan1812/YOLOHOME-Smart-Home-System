

(function($) {
    /* "use strict" */
	
 var dzChartlist = function(){
	
	var screenWidth = $(window).width();
	let draw = Chart.controllers.line.__super__.draw; //draw shadow
	
	var NewExperience = function(){
		var options = {
		  series: [
			{
				name: 'Net Profit',
				data: [100,300, 200, 250, 200, 240, 180,230,200, 250, 300],
				/* radius: 30,	 */
			}, 				
		],
			chart: {
			type: 'area',
			height: 40,
			//width: 400,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			}
			
		},
		
		colors:['var(--primary)'],
		dataLabels: {
		  enabled: false,
		},

		legend: {
			show: false,
		},
		stroke: {
		  show: true,
		  width: 2,
		  curve:'straight',
		  colors:['var(--primary)'],
		},
		
		grid: {
			show:false,
			borderColor: '#eee',
			padding: {
				top: 0,
				right: 0,
				bottom: 0,
				left: -1

			}
		},
		states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
		xaxis: {
			categories: ['Jan', 'feb', 'Mar', 'Apr', 'May', 'June', 'July','August', 'Sept','Oct'],
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false
			},
			labels: {
				show: false,
				style: {
					fontSize: '12px',
				}
			},
			crosshairs: {
				show: false,
				position: 'front',
				stroke: {
					width: 1,
					dashArray: 3
				}
			},
			tooltip: {
				enabled: true,
				formatter: undefined,
				offsetY: 0,
				style: {
					fontSize: '12px',
				}
			}
		},
		yaxis: {
			show: false,
		},
		fill: {
		  opacity: 0.9,
		  colors:'var(--primary)',
		  type: 'gradient', 
		  gradient: {
			colorStops:[ 
				
				{
				  offset: 0,
				  color: 'var(--primary)',
				  opacity: .5
				},
				{
				  offset: 0.6,
				  color: 'var(--primary)',
				  opacity: .5
				},
				{
				  offset: 100,
				  color: 'white',
				  opacity: 0
				}
			  ],
			  
			}
		},
		tooltip: {
			enabled:false,
			style: {
				fontSize: '12px',
			},
			y: {
				formatter: function(val) {
					return "$" + val + " thousands"
				}
			}
		}
		};

		var chartBar1 = new ApexCharts(document.querySelector("#NewExperience"), options);
		chartBar1.render();
	 
	}
	var AllProject = function(){
		var options = {
			series: [12, 30, 20],
         chart: {
			type: 'donut',
			width: 150,
		},
       plotOptions: {
			pie: {
			  donut: {
				size: '80%',
				labels: {
					show: true,
					name: {
						show: true,
						offsetY: 12,
					},
					value: {
						show: true,
						fontSize: '22px',
						fontFamily:'Arial',
						fontWeight:'500',
						offsetY: -17,
					},
					total: {
						show: true,
						fontSize: '11px',
						fontWeight:'500',
						fontFamily:'Arial',
						label: 'Compete',
					   
						formatter: function (w) {
						  return w.globals.seriesTotals.reduce((a, b) => {
							return a + b
						  }, 0)
						}
					}
				}
			  }
			}
		},
		 legend: {
                show: false,
            },
		 colors: ['#3AC977', 'var(--primary)', 'var(--secondary)'],
			labels: ["Compete", "Pending", "Not Start"],
			dataLabels: {
				enabled: false,
			},
        };
		var chartBar1 = new ApexCharts(document.querySelector("#AllProject"), options);
		chartBar1.render();
	 
	}
	
	var overiewChart = function(){
		 var options = {
          series: [{
          name: 'Number of Projects',
          type: 'column',
          data: [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75,100]
        }, {
          name: 'Revenue',
          type: 'area',
          data: [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42]
        }, {
          name: 'Active Projects',
          type: 'line',
          data: [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35,20]
        }],
          chart: {
          height: 300,
          type: 'line',
          stacked: false,
		  toolbar: {
				show: false,
			},
        },
        stroke: {
          width: [0, 1, 1],
          curve: 'straight',
		  dashArray: [0, 0, 5]
        },
		legend: {
			fontSize: '13px',
			fontFamily: 'poppins',
			 labels: {
				  colors:'#888888', 
			 }
		},
        plotOptions: {
          bar: {
            columnWidth: '18%',
			 borderRadius:6	,
          }
        },
        
        fill: {
          //opacity: [0.1, 0.1, 1],
		  type : 'gradient',
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            /* opacityFrom: 0.85,
            opacityTo: 0.55, */
			colorStops : [
				[
					{
					  offset: 0,
					  color: 'var(--primary)',
					  opacity: 1
					},
					{
					  offset: 100,
					  color: 'var(--primary)',
					  opacity: 1
					}
				],
				[
					{
					  offset: 0,
					  color: '#3AC977',
					  opacity: 1
					},
					{
					  offset: 0.4,
					  color: '#3AC977',
					  opacity: .15
					},
					{
					  offset: 100,
					  color: '#3AC977',
					  opacity: 0
					}
				],
				[
					{
					  offset: 0,
					  color: '#FF5E5E',
					  opacity: 1
					},
					{
					  offset: 100,
					  color: '#FF5E5E',
					  opacity: 1
					}
				],
			],
            stops: [0, 100, 100, 100]
          }
        },
		colors:["var(--primary)","#3AC977","#FF5E5E"],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
          'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'month',
		  labels: {
			   style: {
				   fontSize: '13px',
				   colors:'#888888',
			   },
		  },
        },
        yaxis: {
          min: 0,
		  tickAmount: 4,
		  labels: {
			   style: {
				   fontSize: '13px',
				   colors:'#888888',
			   },
		  },
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
              }
              return y;
        
            }
          }
        }
        };

        var chart = new ApexCharts(document.querySelector("#overiewChart"), options);
        chart.render();
		
		$(".mix-chart-tab .nav-link").on('click',function(){
			var seriesType = $(this).attr('data-series');
			var columnData = [];
			var areaData = [];
			var lineData = [];
			switch(seriesType) {
				case "week":
					columnData = [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75,100];
					areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42];
					lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35,20];
					break;
				case "month":
					columnData = [20, 50, 80, 52, 10, 80, 50, 30, 95, 10, 60,85];
					areaData = [40, 25, 85, 45, 85, 25, 95, 65, 45, 45, 20,12];
					lineData = [65, 45, 25, 65, 45, 25, 75, 35, 65, 75, 15,65];
					break;
				case "year":
					columnData = [30, 20, 80, 52, 10, 90, 50, 30, 95, 20, 60,85];
					areaData = [40, 25, 40, 45, 85, 25, 50, 65, 45, 60, 20,12];
					lineData = [65, 45, 30, 65, 45, 25, 75, 40, 65, 50, 15,65];
					break;
				case "all":
					columnData = [20, 50, 80, 60, 10, 80, 50, 40, 95, 20, 60,85];
					areaData = [40, 25, 30, 45, 85, 25, 95, 65, 50, 45, 20,12];
					lineData = [65, 45, 25, 65, 45, 25, 30, 35, 65, 75, 15,65];
					break;
				default:
					columnData = [75, 80, 72, 100, 50, 100, 80, 30, 95, 35, 75,100];
					areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50,42];
					lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 30, 35,20];
			}
			chart.updateSeries([
				{
					name: "Number of Projects",
					type: 'column',
					data: columnData
				},{
					name: 'Revenue',
					type: 'area',
					data: areaData
				},{
					name: 'Active Projects',
					type: 'line',
					data: lineData
				}
			]);
		})
	 
	}

	var chartBar = function(){
		var options = {
			  series: [
				{
					name: 'Running',
					data: [50, 90, 90],
					//radius: 12,	
				}, 
				{
				  name: 'Cycling',
				  data: [50, 60, 55]
				}, 
				
			],
				chart: {
				type: 'bar',
				height: 120,
				
				toolbar: {
					show: false,
				},
				
			},
			plotOptions: {
			  bar: {
				horizontal: false,
				columnWidth: '100%',
				endingShape: "rounded",
				borderRadius: 8,
			  },
			  
			},
			states: {
			  hover: {
				filter: 'none',
			  }
			},
			colors:['#F8B940', '#FFFFFF'],
			dataLabels: {
			  enabled: false,
			  offsetY: -30
			},
			
			legend: {
				show: false,
				fontSize: '12px',
				labels: {
					colors: '#000000',
					
					},
				markers: {
				width: 18,
				height: 18,
				strokeWidth: 8,
				strokeColor: '#fff',
				fillColors: undefined,
				radius: 12,	
				}
			},
			stroke: {
			  show: true,
			  width:14,
			  curve: 'smooth',
			  lineCap: 'round',
			  colors: ['transparent']
			},
			grid: {
				show: false,
				xaxis: {
					lines: {
						show: false,
					}
				},
				 yaxis: {
						lines: {
							show: false
						}
					},  				
			},
			xaxis: {
				categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
				labels: {
					show: false,
					style: {
						colors: '#A5AAB4',
						fontSize: '14px',
						fontWeight: '500',
						fontFamily: 'poppins',
						cssClass: 'apexcharts-xaxis-label',
					},
				},
				crosshairs: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				}, 			
			},
			yaxis: {
				labels: {
				show: false,
					offsetX:-16,
				   style: {
					  colors: '#000000',
					  fontSize: '13px',
					   fontFamily: 'poppins',
					  fontWeight: 100,
					  cssClass: 'apexcharts-xaxis-label',
				  },
			  },
			},
			};

			var chartBar1 = new ApexCharts(document.querySelector("#chartBar"), options);
			chartBar1.render();
	}

	var expensesChart = function(){
		var options = {
			  series: [
				{
					name: 'Running',
					data: [40, 80, 70],
					//radius: 12,	
				}, 
				{
				  name: 'Cycling',
				  data: [60, 30, 70]
				}, 
				
			],
				chart: {
				type: 'bar',
				height: 120,
				
				toolbar: {
					show: false,
				},
				
			},
			plotOptions: {
			  bar: {
				horizontal: false,
				columnWidth: '100%',
				endingShape: "rounded",
				borderRadius: 8,
			  },
			  
			},
			states: {
			  hover: {
				filter: 'none',
			  }
			},
			colors:['#FFFFFF', '#222B40'],
			dataLabels: {
			  enabled: false,
			  offsetY: -30
			},
			
			legend: {
				show: false,
				fontSize: '12px',
				labels: {
					colors: '#000000',
					
					},
				markers: {
				width: 18,
				height: 18,
				strokeWidth: 8,
				strokeColor: '#fff',
				fillColors: undefined,
				radius: 12,	
				}
			},
			stroke: {
			  show: true,
			  width:14,
			  curve: 'smooth',
			  lineCap: 'round',
			  colors: ['transparent']
			},
			grid: {
				show: false,
				xaxis: {
					lines: {
						show: false,
					}
				},
				 yaxis: {
						lines: {
							show: false
						}
					},  				
			},
			xaxis: {
				categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY'],
				labels: {
					show: false,
					style: {
						colors: '#A5AAB4',
						fontSize: '14px',
						fontWeight: '500',
						fontFamily: 'poppins',
						cssClass: 'apexcharts-xaxis-label',
					},
				},
				crosshairs: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				}, 			
			},
			yaxis: {
				labels: {
				show: false,
					offsetX:-16,
				   style: {
					  colors: '#000000',
					  fontSize: '13px',
					   fontFamily: 'poppins',
					  fontWeight: 100,
					  cssClass: 'apexcharts-xaxis-label',
				  },
			  },
			},
			};

			var chartBar1 = new ApexCharts(document.querySelector("#expensesChart"), options);
			chartBar1.render();
	}
	var redial = function(){
		var options = {
		series: [75],
		chart: {
		type: 'radialBar',
		offsetY: 0,
		height:160,
		sparkline: {
		  enabled: true
		}
	  },
	  plotOptions: {
		radialBar: {
		  startAngle: -180,
		  endAngle: 180,
		  track: {
			background: "#F1EAFF",
			strokeWidth: '100%',
			margin: 3,
		  },
		  
		  hollow: {
			margin: 20,
			size: '60%',
			background: 'transparent',
			image: undefined,
			imageOffsetX: 0,
			imageOffsetY: 0,
			position: 'front',
		  },
		  
		  dataLabels: {
			name: {
			  show: false
			},
			value: {
			  offsetY: 5,
			  fontSize: '24px',
			  color:'#000000',
			  fontWeight:600,
			}
		  }
		}
	  },
	  responsive: [{
		breakpoint: 1600,
		options: {
		 chart: {
			height:150
		  },
		}
	  }
	  
	  ],
	  grid: {
		padding: {
		  top: -10
		}
	  },
	  /* stroke: {
		dashArray: 4,
		colors:'#6EC51E'
	  }, */
	  fill: {
		type: 'gradient',
		colors:'#7A849B',
		gradient: {
			shade: 'black',
			shadeIntensity: 0.15,
			inverseColors: false,
			opacityFrom: 1,
			opacityTo: 1,
			stops: [64, 43, 64, 0.5]
		},
	  },
	  labels: ['Average Results'],
	  };

	  var chart = new ApexCharts(document.querySelector("#redial"), options);
	  chart.render();
  
  
  }

  var swiperreview = function() {
		
	var swiper = new Swiper('.mySwiper', {
		speed: 1500,
		parallax: true,
		slidesPerView: 4,
		spaceBetween: 20,
		autoplay: {
			delay: 1000,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		breakpoints: {
			
		  300: {
			slidesPerView: 1,
			spaceBetween: 20,
		  },
		  416: {
			slidesPerView: 2,
			spaceBetween: 20,
		  },
		   768: {
			slidesPerView: 2,
			spaceBetween: 20,
		  },
		   1280: {
			slidesPerView: 3,
			spaceBetween: 20,
		  },
		  1788: {
			slidesPerView: 3,
			spaceBetween: 20,
		  },
		},
	});
	$('#container_layout').on('change',function(){
		if($('body').attr('data-container') == "boxed" || "wide-boxed"){
			swiper.params.slidesPerView = 3
		}else{
			swiper.params.slidesPerView = 4
		}
	})
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
 
	/* Function ============ */
		return {
			init:function(){
			},
			
			
			load:function(){
				NewExperience();
				AllProject();
				overiewChart();
				chartBar();
				expensesChart();
				redial();
				swiperreview();
				
			},
			
			resize:function(){
			}
		}
	
	}();

	
		
	jQuery(window).on('load',function(){
		setTimeout(function(){
			dzChartlist.load();
		}, 1000); 
		
	});

     

})(jQuery);

// update dashboard temp
const units = {
	Celcius: "°C",
	Fahrenheit: "°F"
};

const config = {
	minTemp: -20,
	maxTemp: 50,
	unit: "Celcius"
};

// Change min and max temperature values

const tempValueInputs = document.querySelectorAll("input[type='text']");

tempValueInputs.forEach((input) => {
	input.addEventListener("change", (event) => {
		const newValue = event.target.value;
		
		if(isNaN(newValue)) {
			return input.value = config[input.id];
		} else {
			config[input.id] = input.value;
			range[input.id.slice(0, 3)] = config[input.id]; // Update range
			return setTemperature(); // Update temperature
		}
	});
});

// Switch unit of temperature

const unitP = document.getElementById("unit");

unitP.addEventListener("click", () => {
	config.unit = config.unit === "Celcius" ? "Fahrenheit" : "Celcius";
	unitP.innerHTML = config.unit + ' ' + units[config.unit];
	return setTemperature();
})

// Change temperature

const range = document.querySelector("input[type='range']");
const temperature = document.getElementById("temperature");

function setTemperature() {
	temperature.style.height = (range.value - config.minTemp) / (config.maxTemp - config.minTemp) * 100 + "%";
	temperature.dataset.value = range.value + units[config.unit];
}

range.addEventListener("input", setTemperature);
setTimeout(setTemperature, 1000);




//dashboard illuminance
var container = $('.container');
var card = $('#card');
var innerSVG = Snap('#inner');
var outerSVG = Snap('#outer');
var backSVG = Snap('#back');
var summary = $('#summary');
var date = $('#date');
var weatherContainer1 = Snap.select('#layer1');
var weatherContainer2 = Snap.select('#layer2');
var weatherContainer3 = Snap.select('#layer3');
var innerRainHolder1 = weatherContainer1.group();
var innerRainHolder2 = weatherContainer2.group();
var innerRainHolder3 = weatherContainer3.group();
var innerLeafHolder = weatherContainer1.group();
var innerSnowHolder = weatherContainer1.group();
var innerLightningHolder = weatherContainer1.group();
var leafMask = outerSVG.rect();
var leaf = Snap.select('#leaf');
var sun = Snap.select('#sun');
var sunburst = Snap.select('#sunburst');
var outerSplashHolder = outerSVG.group();
var outerLeafHolder = outerSVG.group();
var outerSnowHolder = outerSVG.group();

var lightningTimeout;

// Set mask for leaf holder 

outerLeafHolder.attr({
	'clip-path': leafMask
});

// create sizes object, we update this later

var sizes = {
	container: {width: 0, height: 0},
	card: {width: 0, height: 0}
}

// grab cloud groups

var clouds = [
	{group: Snap.select('#cloud1')},
	{group: Snap.select('#cloud2')},
	{group: Snap.select('#cloud3')}
]

// set weather types ☁️ 🌬 🌧 ⛈ ☀️

var weather = [
	{ type: 'snow', name: 'Snow'}, 
	{ type: 'wind', name: 'Windy'}, 
	{ type: 'rain', name: 'Rain'}, 
	{ type: 'thunder', name: 'Storms'},
	{ type: 'sun', name: 'Sunny'}
];

// 🛠 app settings
// in an object so the values can be animated in tweenmax

var settings = {
	windSpeed: 2,
	rainCount: 0,
	leafCount: 0,
	snowCount: 0,
	cloudHeight: 100,
	cloudSpace: 30,
	cloudArch: 50,
	renewCheck: 10,
	splashBounce: 80
};

var tickCount = 0;
var rain = [];
var leafs = [];
var snow = [];

// ⚙ initialize app

init();

// 👁 watch for window resize

$(window).resize(onResize);

// 🏃 start animations

requestAnimationFrame(tick);

function init()
{
	onResize();
	
	// 🖱 bind weather menu buttons
	
	for(var i = 0; i < weather.length; i++)
	{
		var w = weather[i];
		var b = $('#button-' + w.type);
		w.button = b;
		b.bind('click', w, changeWeather);
	}
	
	// ☁️ draw clouds
	
	for(var i = 0; i < clouds.length; i++)
	{
		clouds[i].offset = Math.random() * sizes.card.width;
		drawCloud(clouds[i], i);
	}
	
	// ☀️ set initial weather
	
	TweenMax.set(sunburst.node, {opacity: 0})
	changeWeather(weather[0]);
}

function onResize()
{
	// 📏 grab window and card sizes 
	
	sizes.container.width = container.width();
	sizes.container.height = container.height();
	sizes.card.width = card.width();
	sizes.card.height = card.height();
	sizes.card.offset = card.offset();
	
	// 📐 update svg sizes
	
	innerSVG.attr({
		width: sizes.card.width,
		height: sizes.card.height
	})
	
	outerSVG.attr({
		width: sizes.container.width,
		height: sizes.container.height
	})	
	
	backSVG.attr({
		width: sizes.container.width,
		height: sizes.container.height
	})
	
	TweenMax.set(sunburst.node, {transformOrigin:"50% 50%", x: sizes.container.width / 2, y: (sizes.card.height/2) + sizes.card.offset.top});
	TweenMax.fromTo(sunburst.node, 20, {rotation: 0}, {rotation: 360, repeat: -1, ease: Power0.easeInOut})
	// 🍃 The leaf mask is for the leafs that float out of the
	// container, it is full window height and starts on the left
	// inline with the card
	
	leafMask.attr({x: sizes.card.offset.left, y: 0, width: sizes.container.width - sizes.card.offset.left,  height: sizes.container.height});
}

function drawCloud(cloud, i)
{
	/* 
	
	☁️ We want to create a shape thats loopable but that can also
	be animated in and out. So we use Snap SVG to draw a shape
	with 4 sections. The 2 ends and 2 arches the same width as
	the card. So the final shape is about 4 x the width of the
	card.
	
	*/
	
	var space  = settings.cloudSpace * i;
	var height = space + settings.cloudHeight;
	var arch = height + settings.cloudArch + (Math.random() * settings.cloudArch);
	var width = sizes.card.width;
	
	var points = [];
	points.push('M' + [-(width), 0].join(','));
	points.push([width, 0].join(','));
	points.push('Q' + [width * 2, height / 2].join(','));
	points.push([width, height].join(','));
	points.push('Q' + [width * 0.5, arch].join(','));
	points.push([0, height].join(','));
	points.push('Q' + [width * -0.5, arch].join(','));
	points.push([-width, height].join(','));
	points.push('Q' + [- (width * 2), height/2].join(','));
	points.push([-(width), 0].join(','));
	
	var path = points.join(' ');
	if(!cloud.path) cloud.path = cloud.group.path();
	cloud.path.animate({
  		d: path
	}, 0)
}

function makeRain()
{
	// 💧 This is where we draw one drop of rain
	
	// first we set the line width of the line, we use this
	// to dictate which svg group it'll be added to and 
	// whether it'll generate a splash
	
	var lineWidth = Math.random() * 3;
	
	// ⛈ line length is made longer for stormy weather
	
	var lineLength = currentWeather.type == 'thunder' ? 35 : 14;
	
	// Start the drop at a random point at the top but leaving 
	// a 20px margin 
	
	var x = Math.random() * (sizes.card.width - 40) + 20;
	
	// Draw the line
	
	var line = this['innerRainHolder' + (3 - Math.floor(lineWidth))].path('M0,0 0,' + lineLength).attr({
		fill: 'none',
		stroke: currentWeather.type == 'thunder' ? '#777' : '#0000ff',
		strokeWidth: lineWidth
	});
	
	// add the line to an array to we can keep track of how
	// many there are.
	
	rain.push(line);
	
	// Start the falling animation, calls onRainEnd when the 
	// animation finishes.
	
	TweenMax.fromTo(line.node, 1, {x: x, y: 0- lineLength}, {delay: Math.random(), y: sizes.card.height, ease: Power2.easeIn, onComplete: onRainEnd, onCompleteParams: [line, lineWidth, x, currentWeather.type]});
}

function onRainEnd(line, width, x, type)
{
	// first lets get rid of the drop of rain 💧
	
	line.remove();
	line = null;
	
	// We also remove it from the array
	
	for(var i in rain)
	{
		if(!rain[i].paper) rain.splice(i, 1);
	}
	
	// If there is less rain than the rainCount we should
	// make more.
	
	if(rain.length < settings.rainCount)
	{
		makeRain();
		
		// 💦 If the line width was more than 2 we also create a 
		// splash. This way it looks like the closer (bigger) 
		// drops hit the the edge of the card
		
		if(width > 2) makeSplash(x, type);
	}
}

function makeSplash(x, type)
{
	// 💦 The splash is a single line added to the outer svg.

	// The splashLength is how long the animated line will be
	var splashLength = type == 'thunder' ? 30 : 20;
	
	// splashBounce is the max height the line will curve up
	// before falling
	var splashBounce = type == 'thunder' ? 120 : 100;
	
	// this sets how far down the line can fall
	var splashDistance = 80;
	
	// because the storm rain is longer we want the animation
	// to last slighly longer so the overall speed is roughly
	// the same for both
	var speed = type == 'thunder' ? 0.7 : 0.5;
	
	// Set a random splash up amount based on the max splash bounce
	var splashUp = 0 - (Math.random() * splashBounce);
	
	// Sets the end x position, and in turn defines the splash direction
	var randomX = ((Math.random() * splashDistance) - (splashDistance / 2));
	
	// Now we put the 3 line coordinates into an array. 
	
	var points = [];
	points.push('M' + 0 + ',' + 0);
    points.push('Q' + randomX + ',' + splashUp);
    points.push((randomX * 2) + ',' + splashDistance);
	
	// Draw the line with Snap SVG
	
	var splash = outerSplashHolder.path(points.join(' ')).attr({
      	fill: "none",
      	stroke: type == 'thunder' ? '#777' : '#0000ff',
      	strokeWidth: 1
    });
	
	// We animate the dasharray to have the line travel along the path 
	
	var pathLength = Snap.path.getTotalLength(splash);
	var xOffset = sizes.card.offset.left;//(sizes.container.width - sizes.card.width) / 2
	var yOffset = sizes.card.offset.top + sizes.card.height; 
    splash.node.style.strokeDasharray = splashLength + ' ' + pathLength;
	
	// Start the splash animation, calling onSplashComplete when finished
	TweenMax.fromTo(splash.node, speed, {strokeWidth: 2, y: yOffset, x: xOffset + 20 + x, opacity: 1, strokeDashoffset: splashLength}, {strokeWidth: 0, strokeDashoffset: - pathLength, opacity: 1, onComplete: onSplashComplete, onCompleteParams: [splash], ease:  SlowMo.ease.config(0.4, 0.1, false)})
}

function onSplashComplete(splash)
{
	// 💦 The splash has finished animating, we need to get rid of it
	
	splash.remove();
	splash = null;
}

function makeLeaf()
{
	var scale = 0.5 + (Math.random() * 0.5);
	var newLeaf;
	
	var areaY = sizes.card.height/2;
	var y = areaY + (Math.random() * areaY);
	var endY = y - ((Math.random() * (areaY * 2)) - areaY)
	var x;
	var endX;
	var colors = ['#76993E', '#4A5E23', '#6D632F'];
	var color = colors[Math.floor(Math.random() * colors.length)];
	var xBezier;
	
	if(scale > 0.8)
	{
		newLeaf = leaf.clone().appendTo(outerLeafHolder)
		.attr({
			fill: color
		})
		y = y + sizes.card.offset.top / 2;
		endY = endY + sizes.card.offset.top / 2;
		
		x = sizes.card.offset.left - 100;
		xBezier = x + (sizes.container.width - sizes.card.offset.left) / 2;
		endX = sizes.container.width + 50;
	}
	else 
	{
		newLeaf = leaf.clone().appendTo(innerLeafHolder)
		.attr({
			fill: color
		})
		x = -100;
		xBezier = sizes.card.width / 2;
		endX = sizes.card.width + 50;
		
	}
	
	leafs.push(newLeaf);
	 
	
	var bezier = [{x:x, y:y}, {x: xBezier, y:(Math.random() * endY) + (endY / 3)}, {x: endX, y:endY}]
	TweenMax.fromTo(newLeaf.node, 2, {rotation: Math.random()* 180, x: x, y: y, scale:scale}, {rotation: Math.random()* 360, bezier: bezier, onComplete: onLeafEnd, onCompleteParams: [newLeaf], ease: Power0.easeIn})
}

function onLeafEnd(leaf)
{
	leaf.remove();
	leaf = null;
	
	for(var i in leafs)
	{
		if(!leafs[i].paper) leafs.splice(i, 1);
	}
	
	if(leafs.length < settings.leafCount)
	{
		makeLeaf();
	}
}

function makeSnow()
{
	var scale = 0.5 + (Math.random() * 0.5);
	var newSnow;
	
	var x = 20 + (Math.random() * (sizes.card.width - 40));
	var endX; // = x - ((Math.random() * (areaX * 2)) - areaX)
	var y = -10;
	var endY;
	
	if(scale > 0.8)
	{
		newSnow = outerSnowHolder.circle(0, 0, 5)
			.attr({
				fill: 'white'
			})
		endY = sizes.container.height + 10;
		y = sizes.card.offset.top + settings.cloudHeight;
		x =  x + sizes.card.offset.left;
		//xBezier = x + (sizes.container.width - sizes.card.offset.left) / 2;
		//endX = sizes.container.width + 50;
	}
	else 
	{
		newSnow = innerSnowHolder.circle(0, 0 ,5)
		.attr({
			fill: 'white'
		})
		endY = sizes.card.height + 10;
		//x = -100;
		//xBezier = sizes.card.width / 2;
		//endX = sizes.card.width + 50;
		
	}
	
	snow.push(newSnow);
	 
	
	TweenMax.fromTo(newSnow.node, 3 + (Math.random() * 5), {x: x, y: y}, {y: endY, onComplete: onSnowEnd, onCompleteParams: [newSnow], ease: Power0.easeIn})
	TweenMax.fromTo(newSnow.node, 1,{scale: 0}, {scale: scale, ease: Power1.easeInOut})
	TweenMax.to(newSnow.node, 3, {x: x+((Math.random() * 150)-75), repeat: -1, yoyo: true, ease: Power1.easeInOut})
}

function onSnowEnd(flake)
{
	flake.remove();
	flake = null;
	
	for(var i in snow)
	{
		if(!snow[i].paper) snow.splice(i, 1);
	}
	
	if(snow.length < settings.snowCount)
	{
		makeSnow();
	}
}

function tick()
{
	tickCount++;
	var check = tickCount % settings.renewCheck;
	
	if(check)
	{
		if(rain.length < settings.rainCount) makeRain();
		if(leafs.length < settings.leafCount) makeLeaf();
		if(snow.length < settings.snowCount) makeSnow();
	}
	
	for(var i = 0; i < clouds.length; i++)
	{		
		if(currentWeather.type == 'sun')
		{
			if(clouds[i].offset > -(sizes.card.width * 1.5)) clouds[i].offset += settings.windSpeed / (i + 1);
			if(clouds[i].offset > sizes.card.width * 2.5) clouds[i].offset = -(sizes.card.width * 1.5);
			clouds[i].group.transform('t' + clouds[i].offset + ',' + 0);
		}
		else
		{	
			clouds[i].offset += settings.windSpeed / (i + 1);
			if(clouds[i].offset > sizes.card.width) clouds[i].offset = 0 + (clouds[i].offset - sizes.card.width);
			clouds[i].group.transform('t' + clouds[i].offset + ',' + 0);
		}
	}
	
	requestAnimationFrame(tick);
}

function reset()
{
	for(var i = 0; i < weather.length; i++)
	{
		container.removeClass(weather[i].type);
		weather[i].button.removeClass('active');
	}
}

function updateSummaryText()
{
	summary.html(currentWeather.name);
	TweenMax.fromTo(summary, 1.5, {x: 30}, {opacity: 1, x: 0, ease: Power4.easeOut});
}

function startLightningTimer()
{
	if(lightningTimeout) clearTimeout(lightningTimeout);
	if(currentWeather.type == 'thunder')
	{
		lightningTimeout = setTimeout(lightning, Math.random()*6000);
	}	
}

function lightning()
{
	startLightningTimer();
	TweenMax.fromTo(card, 0.75, {y: -30}, {y:0, ease:Elastic.easeOut});
	
	var pathX = 30 + Math.random() * (sizes.card.width - 60);
	var yOffset = 20;
	var steps = 20;
	var points = [pathX + ',0'];
	for(var i = 0; i < steps; i++)
	{
		var x = pathX + (Math.random() * yOffset - (yOffset / 2));
		var y = (sizes.card.height / steps) * (i + 1)
		points.push(x + ',' + y);
	}
	
	var strike = weatherContainer1.path('M' + points.join(' '))
	.attr({
		fill: 'none',
		stroke: 'white',
		strokeWidth: 2 + Math.random()
	})
	
	TweenMax.to(strike.node, 1, {opacity: 0, ease:Power4.easeOut, onComplete: function(){ strike.remove(); strike = null}})
}

function changeWeather(weather)
{
	if(weather.data) weather = weather.data;
	reset();
	
	currentWeather = weather;
	
	TweenMax.killTweensOf(summary);
	TweenMax.to(summary, 1, {opacity: 0, x: -30, onComplete: updateSummaryText, ease: Power4.easeIn})
	
	container.addClass(weather.type);
	weather.button.addClass('active');
	
	// windSpeed
	
	switch(weather.type)
	{
		case 'wind':
			TweenMax.to(settings, 3, {windSpeed: 3, ease: Power2.easeInOut});
			break;
		case 'sun':
			TweenMax.to(settings, 3, {windSpeed: 20, ease: Power2.easeInOut});
			break;
		default:
			TweenMax.to(settings, 3, {windSpeed: 0.5, ease: Power2.easeOut});
			break;
	}	
	
	// rainCount
	
	switch(weather.type)
	{
		case 'rain':
			TweenMax.to(settings, 3, {rainCount: 10, ease: Power2.easeInOut});
			break;
		case 'thunder':
			TweenMax.to(settings, 3, {rainCount: 60, ease: Power2.easeInOut});
			break;
		default:
			TweenMax.to(settings, 1, {rainCount: 0, ease: Power2.easeOut});
			break;
	}	
	
	// leafCount
	
	switch(weather.type)
	{
		case 'wind':
			TweenMax.to(settings, 3, {leafCount: 5, ease: Power2.easeInOut});
			break;
		default:
			TweenMax.to(settings, 1, {leafCount: 0, ease: Power2.easeOut});
			break;
	}	
	
	// snowCount
	
	switch(weather.type)
	{
		case 'snow':
			TweenMax.to(settings, 3, {snowCount: 40, ease: Power2.easeInOut});
			break;
		default:
			TweenMax.to(settings, 1, {snowCount: 0, ease: Power2.easeOut});
			break;
	}
	
	// sun position
	
	switch(weather.type)
	{
		case 'sun':
			TweenMax.to(sun.node, 4, {x: sizes.card.width / 2, y: sizes.card.height / 2, ease: Power2.easeInOut});
			TweenMax.to(sunburst.node, 4, {scale: 1, opacity: 0.8, y: (sizes.card.height/2) + (sizes.card.offset.top), ease: Power2.easeInOut});
			break;
		default:
			TweenMax.to(sun.node, 2, {x: sizes.card.width / 2, y: -100, leafCount: 0, ease: Power2.easeInOut});
			TweenMax.to(sunburst.node, 2, {scale: 0.4, opacity: 0, y: (sizes.container.height/2)-50, ease: Power2.easeInOut});
			break;
	}	
	
	// lightning
	
	startLightningTimer();
}