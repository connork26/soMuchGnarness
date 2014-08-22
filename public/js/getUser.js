$(document).ready(function(event) {
  var getUrl = "https://mlc.qualcomm.com/temp/getuserinfo.php";
  var username = 'testUser';

  var postUser = function () {
    $("#userName").html(username);
    $.ajax({
     type: "POST",
     url: '/index',
     dataType: 'json',
     data: {'user': username}
    }).fail(function(msg) {
      console.log(msg);
    });
  };

  $.ajax({
    type:"GET",
    url:getUrl,
    success:function(response){
      username = response;
      postUser();
    },
    error: function(response) {
      postUser();
    }
 });
});