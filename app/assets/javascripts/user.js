$(document).on('turbolinks:load', function(){
$(function() {
function buildHTML(user) {
  var html =
  `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${ user.name }</p>
  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
  </div>`
  return html;
}

function removeName(userName, userId){
  var html=
  `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
  <input name='group[user_ids][]' type='hidden' value='${ userId }'>
  <p class='chat-group-user__name'>${ userName }</p>
  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
  </div>`
  $("#user-add-result").append(html);
}

function appendErrMsgToHTML(msg) {
  var html =
  `<li>
  <div class="chat-group-user clearfix">${ msg }</div>
  </li>`
}

$(document).on("click",'.user-search-add', function(){
  $(this).parent().remove();
  var userName= $(this).data('userName');
  var userId= $(this).data('userId');
  removeName(userName, userId);
});

$(document).on("click",'.user-search-remove',function(){
  $(this).parent().remove();
})


$("#user-search-field").on("keyup", function() {
  var input = $("#user-search-field").val();
  $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
  })

  .done(function(users) {
    $('#user-search-result').empty();
    if (users.length !== 0) {
      users.forEach(function(user){
        var html = buildHTML(user);
    $('#user-search-result').append(html)
    });
  }
    else {
      appendErrMsgToHTML("一致するユーザはいません");
    }
  })
  .fail(function() {
    alert('ユーザー検索に失敗しました');
      });
    });
  })
})
