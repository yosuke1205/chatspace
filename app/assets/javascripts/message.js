$(function(){
  function buildHTML(message).animate({scrolldown: 0}, 500, 'swing');{
    var html = `<p class="chat-message__upper-info__talker">
    ${message.name}
    </p>
  <p class="chat-message__upper-info__date">
    <%= message.created_at.strftime("%Y/%m/%d %H:%M") %>
    </p>
  <p class="chat-message_a__text">
    ${message.content}
    </p>`
   return html;
  }

$('#item_form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href + '/messages'
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form__message').val('')
    })
      .fail(function(){
      alert('error');
    })
  });
