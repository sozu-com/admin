//tooltip function start
 
$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip(); 
  
});
 
//tooltip function end


 $(document).ready(function() {
    //en scroll start
      $('.scrollbox').enscroll({
          showOnHover: false,
          verticalTrackClass: 'track3',
          verticalHandleClass: 'handle3' 

      });
      //en scroll end

      var slider = new Slider("#ex6");
slider.on("slide", function(slideEvt) {
   $("#ex6SliderVal").text(slideEvt.value);
});

 });

 


//date picker function start

 $(function () {

                $('#datetimepicker').datetimepicker({
                    format: 'DD/MM/YYYY' 
                });
             });

 

//date picker function end

