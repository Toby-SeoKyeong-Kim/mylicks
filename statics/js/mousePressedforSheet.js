// function mousePressed() {
//
//   for(let ls of l){
//     if(ls.mouseIsOnEdit()
//       ||ls.mouseIsOnRemove()
//       ||ls.mouseIsOnNew()
//       ||ls.mouseIsOnLoad()){
//       mouseIsPreocupado = true;
//     }
//   }
//   if(!mouseIsPreocupado&& l.length >2&&!keySetting){
//     ypos_moving= true;
//   }
//   yinertia=false;
//   inertia = 0;
//   ypos_moving_count =0;
// }
//
// function mouseReleased() {
//
//   for(let [i, ls] of l.entries()){
//     if(!sidebarIsOn){
//       if(ls.mouseIsOnNew()){
//         var json_data={
//             "id": sheet_id,
//             "instruction": "new",
//             "index": ls.i
//           };
//           xhr.onreadystatechange = function() {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//               var uri = '/SLdisplay?q=' + xhr.responseText.slice(1,25)+"&go=" + sheet_id.slice(0,25);
//               window.location.href = uri;
//                 }
//           }
//           xhr.open('POST', '/updatesheet', true);
//           xhr.setRequestHeader('Content-Type', 'application/json');
//           xhr.send(JSON.stringify(json_data));
//       }else if(ls.mouseIsOnLoad()){
//         var uri = '/loadmylicks?go=' + sheet_id.slice(0,25)+"&i=" + ls.i;
//               window.location.href = uri;
//       }else if(ls.mouseIsOnEdit()){
//         var json_data={
//             "id": sheet_id,
//             "instruction": "edit",
//             "index": ls.i
//           };
//           xhr.onreadystatechange = function() {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//               var uri = '/SLdisplay?q=' + xhr.responseText.slice(1,25)+"&go=" + sheet_id.slice(0,25);
//               window.location.href = uri;
//                 }
//           }
//           xhr.open('POST', '/updatesheet', true);
//           xhr.setRequestHeader('Content-Type', 'application/json');
//           xhr.send(JSON.stringify(json_data));
//       }else if(ls.mouseIsOnRemove()){
//         var json_data={
//             "id": sheet_id,
//             "instruction": "remove",
//             "index": ls.i
//           };
//           xhr.onreadystatechange = function() {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//               ls.data = null;
//               ls.id = "";
//               ls.n=[];
//                 }
//           }
//           xhr.open('POST', '/updatesheet', true);
//           xhr.setRequestHeader('Content-Type', 'application/json');
//           xhr.send(JSON.stringify(json_data));
//       }else if(ls.mouseIsOnDelete()){
//         var json_data={
//             "id": sheet_id,
//             "instruction": "pull",
//             "index": ls.i,
//             "lickid": ls.id
//           };
//           getxhr.onreadystatechange = function() {
//             if (getxhr.readyState == 4 && getxhr.status == 200) {
//               l.splice(ls.i,1);
//               ldata.splice(ls.i,1);
//               getData();
//                 }
//           }
//           getxhr.open('POST', '/updatesheet', true);
//           getxhr.setRequestHeader('Content-Type', 'application/json');
//           getxhr.send(JSON.stringify(json_data));
//       }
//     }
//   }
//   if(ypos_moving&&l.length >2){
//     yinertia = true;
//     inertia = mouseY-pmouseY;
//     firstSpeed = inertia;
//   }
//   if(Math.abs(inertia)<Width/1000&&!edit_view&&!keySetting){
//     yinertia = false;
//     inertia = 0;
//     firstSpeed = 0;
//     for(let [i,ls] of l.entries()){
//       ls.selected = false;
//       if(ls.mouseIsOn()){
//         ls.selected= true;
//         if(ls.data == null){
//           newbtn.style('display', 'table');
//           loadbtn.style('display', 'table');
//           editbtn.style('display', 'none');
//           deletebtn.style('display', 'none');
//         }else{
//           newbtn.style('display', 'none');
//           loadbtn.style('display', 'none');
//           editbtn.style('display', 'table');
//           deletebtn.style('display', 'table');
//         }
//       }
//     }
//   }else{
//     for(let [i,ls] of l.entries()){
//       ls.selected = false;
//     }
//   }
//
//   ypos_moving=false;
//   ypos_moving_count = 1;
//   mouseIsPreocupado = false;
// }

function ifAnyLickSelected(l) {
  for (var i = 0; i < l.length; i++) {
    if(l[i].selected){
      return true
    }
  }
  return false;
}
