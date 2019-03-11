$(document).on('turbolinks:load', function(){
  function buildSendHTML(message){
    var image =(message.image) ? `<img src="${message.image}">` : ``
    var html = `<p class="chat-message__upper-info__talker">
    ${message.name}
    </p>
  <p class="chat-message__upper-info__date">
    ${message.created_at}
    </p>
  <p class="chat-message_a__text">
    ${message.content}
    </p>
  <div class="lower-message__image">
    ${image}
  </div>`
   return html;
  }

$('#item_form').on('submit', function(e){
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
  .done(function(message){
      var html = buildSendHTML(message);
      $('.chat-message').append(html)
      $('.chat-message').animate({scrollTop: $('.chat-message')[0].scrollHeight}, 'fast');
      $('.form__submit').prop('disabled', false);
      $('.form__message')[0].reset();
      })
    .fail(function(){
      alert('error');
    })
  })
});

