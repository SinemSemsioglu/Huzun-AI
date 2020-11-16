const initPage = () => {
    $('#save-text').click(()=> {
        sendReq('/saveText',
            {text: $('#exampleTextInput').val()},
            () => {
                    alert('text saved successfully');
        })
    })

    $('#generate-text').click(()=> {
        sendReq('/generateText',
            {},
            (data) => {
                $('#num-elements').text(JSON.stringify(data.num_items));
                $('#latest-text').text(JSON.stringify(data.last_added.text));
                $('.db-info').show();
            })
    })

    $('.db-info').hide();
}

const sendReq = (path, data, successCallback) => {
    $.ajax({
        type: "POST",
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
