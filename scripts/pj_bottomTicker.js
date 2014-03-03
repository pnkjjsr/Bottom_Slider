$(document).ready(function() {
    /*Written by Pankaj Jasoria | 21st Feb 2014 | Bottom Ticker */
    (function($) {
        jQuery.fn.extend({
            pj_bottomTicker: function(options) {
                var defaults = {
                    intervalTime: 2000,
                    newsHeight: 66,
                    newsAnimate: 500
                };
                var options = $.extend(true, {}, defaults, options);

                var interval = fn_interval();
                var y;
                var newsCount = $(".bottomTicker .news div").size();
                var newsHeight = options.newsHeight;
                var x = 0;
                var totalNewsHeight = newsHeight * newsCount;
                var newsBottomPosition = totalNewsHeight - newsHeight;
                var checkTopClick = false;
                var checkBottomClick = false;


                for (var i = 0; i <= newsCount; i++) {
                    $(".bottomTicker .news div:nth-child(" + i + ")").attr('id', i);
                }

                $(".bottomTicker").slideDown();

                /*At every sec Loop*/
                function fn_interval() {
                    y = setInterval(function() {
                        autoLoop();
                    }, options.intervalTime);
                    return y;
                }

                /*Automatic Looping */
                function autoLoop() {
                    x = x + newsHeight;
                    if (x === totalNewsHeight) {
                        x = 0;
                    }
                    $(".bottomTicker .news").animate({top: -Math.abs(x) + "px"}, options.newsAnimate);
                }

                /*Top Click*/
                function fn_top() {
                    $(".nav .top").click(function() {
                        clearInterval(interval);
                        if (x === 0) {
                            x = newsBottomPosition;
                        }
                        else {
                            x = x - newsHeight;
                        }


                        $(".bottomTicker .news").animate({top: -Math.abs(x) + "px"}, options.newsAnimate);
                        interval = fn_interval();
                    });
                }
                fn_top();

                /*Bottom Click*/
                function fn_below() {
                    $(".nav .bottom").click(function() {
                        clearInterval(interval);
                        if (x === newsBottomPosition) {
                            x = 0;
                        }
                        else {
                            x = x + newsHeight;
                        }

                        $(".bottomTicker .news").animate({top: -Math.abs(x) + "px"}, options.newsAnimate);
                        interval = fn_interval();
                    });
                }
                fn_below();
                
                /*Close*/
                function fn_close(){
                    $(".bottomTicker>a").click(function(){                        
                        $(".bottomTicker").slideUp();
                    });
                }
                fn_close();

            }
        });
    })(jQuery);
});