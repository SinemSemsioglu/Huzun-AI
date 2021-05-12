$('a[href*="#"]').on('click', function (e) {
    e.preventDefault()

    $('html, body').animate(
        {
            scrollTop: $($(this).attr('href')).offset().top,
        },
        500,
        'linear'
    )
})

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "flex-container") {
        x.className += " responsive";
    } else {
        x.className = "flex-container";
    }
}



const initPage = () => {
    /*$('#save-text').click(()=> {
        sendReq('/saveText',
            {text: $('#HüzünlüTextInput').val()},
            () => {
                alert('text saved successfully');
            })
    })*/

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
                $('#HüzünlüTextInput').val(JSON.stringify(data.data));
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

