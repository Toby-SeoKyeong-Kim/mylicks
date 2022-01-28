
function domKey() {
  if(!edit_view && !keySetting){
    keySetting = true;
    $( "#licklist" ).sortable('disable');
    $('#keysettingdiv').css("display", "flex");
    $('#keysettingdiv').css("z-index", "1001");
    areYouReady();
    $('.for_transparency').css("background-color", "rgba(20,20,20,.3)");

    $('.for_transparency').css("z-index", "1000");

  }

}
function domNewMeasure() {
  if(!edit_view && !keySetting){
    ldata.push("000000000000000000000000")
    xhr_sortstop.onreadystatechange = function() {
      if (xhr_sortstop.readyState == 4 && xhr_sortstop.status == 200) {
          var item2 = JSON.parse(xhr_sortstop.responseText);
          console.log(item2);
          getData();

          }
    }
    xhr_sortstop.open('POST', '/switchsheetlicks?q='+sheet_id, true);
    xhr_sortstop.send(ldata);
  }
}


function domApply() {
  if(keySetting){
    keyChange(keytobe);
    keySetting=false;

    $( "#licklist" ).sortable('enable');
    $('#keysettingdiv').css("display", "none");
    $('.for_transparency').css("background-color", "rgba(20,20,20,0)");
    $('.for_transparency').css("z-index", "-99");
  
    $('#keysettingCanvas').html("");
  }
}

function domFlat() {
  if(keySetting){
    if(keytobe < 14){
    keytobe+=1;
    c4k.k+=1;
    c4k.keystr = k_keycen(keytobe) + " " + "Key";
    }
  }
}

function domSharp() {
  if(keySetting){
    if(keytobe >0){
    keytobe-=1;
    c4k.k-=1;
    c4k.keystr = k_keycen(keytobe) + " " + "Key";
    }
  }
}

function domNew() {
  if(selected_i!=""){
    var json_data={
        "id": sheet_id,
        "instruction": "new",
        "index": parseInt(selected_i)
      };
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var uri = '/SLdisplay?q=' + xhr.responseText.slice(1,25)+"&go=" + sheet_id.slice(0,25);
          window.location.href = uri;
            }
      }
      xhr.open('POST', '/updatesheet', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(json_data));
  }
}

function domLoad() {
  if(selected_i != ""){
    var uri = '/loadmylicks?go=' + sheet_id.slice(0,25)+"&i=" + selected_i;
          window.location.href = uri;
  }
}

function domRemove() {
  if(selected_i !=""){
    var si = selected_i;
    var json_data={
        "id": sheet_id,
        "instruction": "remove",
        "index": parseInt(selected_i)
      };
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          ldata[si] = "000000000000000000000000"
          getData();
            }
      }
      xhr.open('POST', '/updatesheet', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(json_data));
  }
}
function domEdit() {
  if(selected_i !=""){
    var json_data={
        "id": sheet_id,
        "instruction": "edit",
        "index": parseInt(selected_i)
      };
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var uri = '/SLdisplay?q=' + xhr.responseText.slice(1,25)+"&go=" + sheet_id.slice(0,25);
          window.location.href = uri;
            }
      }
      xhr.open('POST', '/updatesheet', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(json_data));
  }
}

// function domDelete() {
//   if(selected_i != ""){
//     var json_data={
//         "id": sheet_id,
//         "instruction": "pull",
//         "index": selected_i,
//         "lickid": selected_id
//       };
//       getxhr.onreadystatechange = function() {
//         if (getxhr.readyState == 4 && getxhr.status == 200) {
//           l.splice(ls.i,1);
//           ldata.splice(ls.i,1);
//           getData();
//             }
//       }
//       getxhr.open('POST', '/updatesheet', true);
//       getxhr.setRequestHeader('Content-Type', 'application/json');
//       getxhr.send(JSON.stringify(json_data));
//   }
// }
