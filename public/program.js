$('a[href*="#"]').on('click', function (e) {
    e.preventDefault()

    $('html, body').animate(
        {
            scrollTop: $($(this).attr('href')).offset().top - 70,
        },
        500,
        'linear'
    )
})
$( '#myTopnav a' ).on( 'click', function () {
    $( '#myTopnav' ).find( '.active' ).removeClass( 'active' );
    $( this ).addClass( 'active' );
});

// highlight navbar with scroll
/*$(document).ready(function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#myTopnav li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#myTopnav li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
});*/

$(document).ready(function(){
    // Activate Carousel
    $("#carousel-slide").carousel({
        interval: false
    });

    // Enable Carousel Controls
    $(".carousel-control-prev").click(function(){
        $("#carousel-slide").carousel("prev");
    });
    $(".carousel-control-next").click(function(){
        $("#carousel-slide").carousel("next");
    });

    var checkitem = function () {
        var $this;
        $this = $("#carousel-slide");
        if ($(".carousel-inner .carousel-item:first").hasClass("active")) {
            $this.children(".carousel-control-prev.control").hide();
            $this.children(".carousel-control-next.control").show();
        } else if ($(".carousel-inner .carousel-item:last").hasClass("active")) {
            $this.children(".carousel-control-next.control").hide();
            $this.children(".carousel-control-prev.control").show();
        } else {
            $this.children(".carousel-control").show();
        }
    };

    checkitem();
    $("#carousel-slide").on("slid.bs.carousel", "", checkitem);

});






function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "flex-container") {
        x.className += " responsive";
    } else {
        x.className = "flex-container";
    }
}


const initPage = () => {
    $('#save-text').click(()=> {
        sendReq('/saveText',
            {text: $('#contribute').val()},
            () => {
                alert('text saved successfully');
            })
    })

    /*$('#generate-text').click(()=> {
        sendReq('/generateText',
            {},
            (data) => {
                $('#num-elements').text(JSON.stringify(data.num_items));
                $('#latest-text').text(JSON.stringify(data.last_added.text));
                $('.db-info').show();
            })
    })*/

    $('#generate-text').click(()=> {
        sendReq('/generateText',
            {startWord: $('#HüzünlüTextInput').val(), wordCount: 200},
            (data) => {
                $('#HüzünlüTextInput').val(JSON.stringify(data));
                // $('.form-group').show();
            })
    })

    // $('.form-group').hide();
}

const sendReq = (path, data, successCallback) => {
    $.ajax({
        type: "POST",
        timeout: 60000,
        url: path,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: async (resp) => {
            if (resp.success) {
                successCallback(resp.data)
            } else {
                alert('problem with request')
            }
        },
        dataType: "json"
    });
}

initPage();




