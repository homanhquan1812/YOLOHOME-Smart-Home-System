function clipCircle(percent) {
    var start = 'polygon(50% 0, 50% 50%,';
    if (percent >= 0 && percent <= 12.5) {
      return {
        color: 'red',
        clipPath: start + (50 + percent * 4) + '% 0%)'
      }
    } else if (percent >= 12.6 && percent <= 37.5) {
      return {
        color: '#f9b800',
        clipPath: start + '100% ' + ( percent - 12.5)*4 + '%, 100% 0%)'
      } 
    } else if (percent >= 37.6 && percent <= 62.5) {
      return {
        color: 'yellowgreen',
        clipPath: start + (100 -( percent - 37.5)*4) + '% 100%, 100% 100%, 100% 0%)'
      }
    } else if (percent >= 62.6 && percent <= 87.5) {
      return {
        color: 'limegreen',
        clipPath: start + '0% ' + (100 -( percent - 62.5)*4) + '%, 0% 100%, 100% 100%, 100% 0%)'
      }
    } else if (percent >= 87.6 && percent < 100) {
      return {
        color: 'dodgerblue',
        clipPath: start + ( percent - 87.5)*4 + '% 0%,0% 0%,0% 100%, 0% 100%, 100% 100%, 100% 0%)'
      }
    } else if (percent == 100) {
      return {
        color: 'dodgerblue',
        clipPath: 'unset'
      }
    }
  }
  var count = 0;
  
  function animatePercent() {
    setTimeout(function() {
      
      if (count == 60) //set value
        return animatePercent();
      else 
        count++;
      var options = clipCircle(count);
      $('.circle-humidity').css({
        'background-color': options.color,
        '-webkit-clip-path': options.clipPath,
        'clip-path': options.clipPath
      });
      $('.center-humidity').text(count + '%');
      
      animatePercent()
    }, 50);
  }
  $(function() {
    //console.log(clipCircle(10));
    animatePercent();
    $('div.humidity').click(function(){count=0});
  })();