btn.addEventListener('click', function () {
  var uri = '/Sdisplay?q=' + selectedsheet.slice(10,34);
  window.location.href = uri;
})
nL.addEventListener('click', function (){

  xhr.open('POST', '/newsheet', true);
  xhr.setRequestHeader('Content-Type', 'application/xml');
  xhr.addEventListener('readystatechange', function(){
    if(xhr.readyState === XMLHttpRequest.DONE){
      if (xhr.status === 200) {
    var uri = '/Sdisplay?q=' + xhr.responseText;
    window.location.href = uri;
     }
    }
  });
  xhr.send();
})
