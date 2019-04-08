$(document).on('turbolinks:load', function() {
    function buildSendmessageHTML(message) {
        var image = message.image ? `<img src="${message.image}">` : ``
        var html = `
    <div class="chat-message__s" data-message_id="${message.id}">
      <div class="chat-message__upper-info">
      <p class="chat-message__upper-info__talker">
        ${message.name}
      </p>
    <p class="chat-message__upper-info__date">
      ${message.created_at}
    </p>
    </div>
    <p class="chat-message_a__text">
      ${message.content}
    </p>
    ${image}
    </div>
    </div>`
    return html;
    }


    $('#item_form').on('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(this);

        var url = $(this).attr('action');
        $.ajax({
                url: url,
                type: "POST",
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false
            })
            .done(function(message) {
                var html = buildSendmessageHTML(message);
                console.log(message)
                $('.chat-message').append(html)
                $('.chat-message').animate({ scrollTop: $('.chat-message')[0].scrollHeight }, 'fast');
                $('.form__message').val('');
                $('.form__submit').prop('disabled', false);
            })
            .fail(function() {
                alert('error');
            })
    })

$(function() {

        setInterval(update, 5000)
});
    function update(data) {
            var message_id = $('.chat-message__s:last').data('message_id') || 0;
             console.log(message_id)
            if(window.location.href.match(/\/groups\/\d+\/messages/))
        $.ajax({
                url: location.href,
                type: 'GET',
                data: { id: message_id },
                dataType: 'json'
            })
            .done(function(data) {
                var insertHTML = '';
                data.forEach(function(data) {
                    insertHTML += buildSendmessageHTML(data);
                })
                if (data.length != 0){
                $('.chat-message').append(insertHTML);
                $('.chat-message').animate({ scrollTop: $('.chat-message')[0].scrollHeight }, 'fast');
            }
            })
            .fail(function(data) {
                alert('自動更新に失敗しました');
            })
  }
});
