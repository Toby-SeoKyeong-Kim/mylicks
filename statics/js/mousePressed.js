function mousePressed() {

  if(!keySetting && mouseIsOnOctaveUp()&&!mousePreocupado&&!sidebarIsOn){
    if(canTransposeOctave("UP")){
      for(var [i, ns] of n.entries()){
        ns.mv += 12;
        ndata[i*data_per_note+10] = n[i].mv.toString();
      }
      rearrange();
    }
  }
  if(!keySetting && mouseIsOnOctaveDown()&&!mousePreocupado&&!sidebarIsOn){
    if(canTransposeOctave("DOWN")){
      for(let [i, ns] of n.entries()){
        ns.mv -= 12;
        ndata[i*data_per_note+10] = n[i].mv.toString();
      }
      rearrange();
    }
  }

  if(mouseIsOnDisplay()&& !mousePreocupado&& !keySetting&&!sidebarIsOn){
    mousePreocupado=true;
    xpos_moving = true;
    xinertia = false;
  }
  xinertia = false;
  inertia=0;
  xpos_moving_count =0;
}

function mouseReleased() {

  if(keySetting&&!sidebarIsOn){
    if(!tagEditing){
      if(mouseIsOnToggleF()){
        if(is_chocen_sharp == 1 || is_chocen_sharp == 0){
          is_chocen_sharp = -1;
        }else if(is_chocen_sharp == -1){
          is_chocen_sharp = 0;
        }
        if(is_chocen_sharp==1){
          chord_cen = if_is_Sharp.get(all_notes_in_key_str[selected_index]);
        }else if(is_chocen_sharp==-1){
          chord_cen = if_is_Flat.get(all_notes_in_key_str[selected_index]);
        }else{
          chord_cen = all_notes_in_key_str[selected_index];
        }
      }else if(mouseIsOnToggleS()){
        if(is_chocen_sharp == -1 || is_chocen_sharp == 0){
          is_chocen_sharp = 1;
        }else if(is_chocen_sharp == 1){
          is_chocen_sharp = 0;
        }
        if(is_chocen_sharp==1){
          chord_cen = if_is_Sharp.get(all_notes_in_key_str[selected_index]);
        }else if(is_chocen_sharp==-1){
          chord_cen = if_is_Flat.get(all_notes_in_key_str[selected_index]);
        }else{
          chord_cen = all_notes_in_key_str[selected_index];
        }
      }
      if(mouseIsOnFlat()){
        if(key<14){
          key+=1;
        }
        k_all_note_in_Key(key);
        if(is_chocen_sharp==1){
          chord_cen = if_is_Sharp.get(all_notes_in_key_str[selected_index]);
        }else if(is_chocen_sharp==-1){
          chord_cen = if_is_Flat.get(all_notes_in_key_str[selected_index]);
        }else{
          chord_cen = all_notes_in_key_str[selected_index];
        }
      }
      if(mouseIsOnSharp()){
        if(key>0){
          key-=1;
        }
        k_all_note_in_Key(key);
        if(is_chocen_sharp==1){
          chord_cen = if_is_Sharp.get(all_notes_in_key_str[selected_index]);
        }else if(is_chocen_sharp==-1){
          chord_cen = if_is_Flat.get(all_notes_in_key_str[selected_index]);
        }else{
          chord_cen = all_notes_in_key_str[selected_index];
        }
      }
      if(mouseIsOnChocenDecider()){
        selected_index = mouseIsOnChorcenIndex();
        if(is_chocen_sharp==1){
          chord_cen = if_is_Sharp.get(all_notes_in_key_str[selected_index]);
        }else if(is_chocen_sharp==-1){
          chord_cen = if_is_Flat.get(all_notes_in_key_str[selected_index]);
        }else{
          chord_cen = all_notes_in_key_str[selected_index];
        }
      }
      if(mouseIsOnTagOpen()){
        tagEditing = true;
      }
    }
    if(tagEditing){
      if(mouseIsOnTagSave()){
        tagEditing=false;
      }
    }
  }




  if(xpos_moving){
    xinertia = true;
    inertia = mouseX - pmouseX;
    firstSpeed = inertia;
  }

  xpos_moving=false;
  xpos_moving_count=1;
  mousePreocupado = false;
}
function intervalToggle() {
  if(!keySetting &&!mousePreocupado){
    if(edit_interval){
      if(firstAreYouReady){
        areYouReady();
        firstAreYouReady = false;
      }
      edit_interval = false;
      bang_btn.style("display", "none");
      remove_btn.style("display", "none");
      $('#arrowDiv').css('display','none');
      $('#noteTypeDiv').css('display','none');
      $('#otherButtonsDiv').css('display','none');
      $('#p5canvas4interval').css('display','block');
      p5Canvas4OtherUse[0].indowResized();
      $('#intervalbtn p').html('edit');
    }else{
      edit_interval = true;
      bang_btn.style("display", "table");
      remove_btn.style("display", "table");
      $('#arrowDiv').css('display','grid');
      $('#noteTypeDiv').css('display','grid');
      $('#otherButtonsDiv').css('display','grid');
      $('#p5canvas4interval').css('display','none');
      p5Canvas4OtherUse[0].indowResized();
      $('#intervalbtn p').html('interval');
    }
  }
}

function arrowUp() {
  if(!keySetting && edit_interval&&!sidebarIsOn&&!scaleSetting){
    if(rest == "false"){
      if(editing){
        switch (y_index) {
          case 0:
            if(octave_control <2){
              y_index =6;
              octave_control +=1;
            }
          break;
          case 10:
            if(octave_control<0){
              y_index =16;
              octave_control +=1;
            }else{
              y_index -=1;
            }
          break;
          default:
            y_index -=1;
        }
        up_down_note_attChange(currently_editing_num,accidental_val);
        rearrange();
      }else if(writing){
        switch (y_index) {
          case 0:
            if(octave_control <2){
              y_index =6;
              octave_control +=1;
            }
          break;
          case 10:
            if(octave_control<0){
              y_index =16;
              octave_control +=1;
            }else{
              y_index -=1;
            }
          break;
          default:
            y_index -=1;
        }
      }
    }
  }
}
function arrowDown() {
  if(!keySetting && edit_interval&&!sidebarIsOn&&!scaleSetting){
    if(rest == "false"){
      if(editing){
        switch (y_index) {
          case 16:
            if(octave_control >-2){
              y_index =10;
              octave_control -=1;
            }
          break;
          case 6:
            if(octave_control>0){
              y_index =0;
              octave_control -=1;
            }else{
              y_index +=1;
            }
          break;
          default:
            y_index +=1;
        }
        up_down_note_attChange(currently_editing_num,accidental_val);
        rearrange();
      }else if(writing){
        switch (y_index) {
          case 16:
            if(octave_control >-2){
              y_index =10;
              octave_control -=1;
            }
          break;
          case 6:
            if(octave_control>0){
              y_index =0;
              octave_control -=1;
            }else{
              y_index +=1;
            }
          break;
          default:
            y_index +=1;
        }
      }
    }
  }
}
function arrowRight() {
  if(!keySetting && edit_interval&&!sidebarIsOn&&!scaleSetting){
    if(currently_editing_num!=n.length){
      currently_editing_num++;
    }
    if(currently_editing_num!=n.length){
      editing = true;
      writing = false;
      beat_type = n[currently_editing_num].bt;
      accidental_val = n[currently_editing_num].av;
      rest = n[currently_editing_num].r;
      tie = n[currently_editing_num].tie;
      plet_count = n[currently_editing_num].pc;
      y_index = n[currently_editing_num].y;
      octave_control = n[currently_editing_num].octave_control;
      swichFS();
    }else{
      tie = "false";
      writing = true;
      editing = false;
      if(n[currently_editing_num-1].completePlet){
        writing_plet = false;
        if(beat_type > 10){
          beat_type -=10;
        }
      }
    }
  }
  displayNoteType(beat_type);
  displayTriTie()
}
function arrowLeft() {
  if(!keySetting && edit_interval&&!sidebarIsOn&&!scaleSetting){
    if(currently_editing_num!=0){
      currently_editing_num--;
    }
    if(currently_editing_num!=n.length){
      editing = true;
      writing = false;
      beat_type = n[currently_editing_num].bt;
      accidental_val = n[currently_editing_num].av;
      plet_count = n[currently_editing_num].pc;
      rest = n[currently_editing_num].r;
      tie = n[currently_editing_num].tie;
      y_index = n[currently_editing_num].y;
      octave_control = n[currently_editing_num].octave_control;
      swichFS();
    }else{
      writing = true;
      editing = false;
    }
  }
  displayNoteType(beat_type);
  displayTriTie()
}
function swichFS() {
  switch (theme) {
    case "dark":
    switch (accidental_val) {
      case -1:
        $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon/flat.png")');
        break;
        case 0:
          $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon/nat.png")');
          break;
          case 1:
              $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon/sharp.png")');
            break;
    }
      break;
      case "simple":
      switch (accidental_val) {
        case -1:
          $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon4simple/hr_flat.png")');
          break;
          case 0:
            $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon4simple/hr_nat.png")');
            break;
            case 1:
                $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon4simple/hr_sharp.png")');
              break;
      }
        break;
        case "pastel":
        switch (accidental_val) {
          case -1:
            $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon4simple/hr_flat.png")');
            break;
            case 0:
              $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon4simple/hr_nat.png")');
              break;
              case 1:
                  $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon4simple/hr_sharp.png")');
                break;
        }
          break;
  }
}
function switchUp() {
  if(writing_plet){
    //b[7].buzz = true;
  }else if(writing){
    if(beat_type>0){
      beat_type--;
    }
  }else if(editing){
    if(beat_type>0){
      var est = beat_count+return_beat_count(beat_type-1)-return_beat_count(beat_type);
      var beat_count_val;
      var skip = false;
      if(est > 64){
        var len = n.length-1;
        for (var i = est; i>64; i -= beat_count_val){
          beat_count_val = return_beat_count(n[len].bt);
          n.splice(len, 1);
          ndata.splice(len*data_per_note,data_per_note);
          beat_count -= beat_count_val;
          if(len  == currently_editing_num){
            currently_editing_num -= 1;
            skip= true;
          }
          len --;
        }
      }
      if(!skip){
        beat_type--;
        n[currently_editing_num].bt -= 1;
        var res = parseInt(ndata[currently_editing_num*data_per_note+3])-1;
        ndata[currently_editing_num*data_per_note+3] = res.toString();
      }
      rearrange();
    }
  }
  displayNoteType(beat_type);
}
function switchDown() {
  if(writing_plet){
    //b[7].buzz = true;
  }else if(writing){
    if(beat_type<8){
      beat_type++;
    }
  }else if(editing){
    if(beat_type<8){
      beat_type++;
      n[currently_editing_num].UpdateBt(beat_type);
      var res = parseInt(ndata[currently_editing_num*data_per_note+3])+1;
      ndata[currently_editing_num*data_per_note+3] = res.toString();
      rearrange();
    }
  }
  displayNoteType(beat_type);
}
function displayNoteType(bt) {
  if(rest == "true"){
    switch (bt) {
      case 0:
      switch (theme) {
        case "dark":
        $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/r-whole.png")');
          break;
          case "simple":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-whole.png")');
            break;
            case "pastel":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-whole.png")');
              break;
      }
      break;
      case 1:
        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/r-d-2nd.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-d-2nd.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-d-2nd.png")');
                break;
        }
      break;
      case 12:
      case 2:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/r-2nd.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-2nd.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-2nd.png")');
                break;
        }
      break;
      case 3:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/r-d-4th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-d-4th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-d-4th.png")');
                break;
        }
      break;
      case 14:
      case 4:
        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/r-4th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-4th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-4th.png")');
                break;
        }
      break;
      case 5:
        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/r-d-8th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-d-8th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-d-8th.png")');
                break;
        }
      break;
      case 16:
      case 6:
        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/r-8th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-8th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-8th.png")');
                break;
        }
      break;
      case 7:
        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/r-d-16th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-d-16th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-d-16th.png")');
                break;
        }
      break;
      case 18:
      case 8:
        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/r-16th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-16th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/r-16th.png")');
                break;
        }
      break;
    }
    switch (theme) {
      case "dark":
      $('.restDiv').css('background-color','#342E54');
      $('.restDiv').css('opacity','1');
        break;
        case "simple":
        $('.restDiv').css('background-color','#006fff');
        $('.restDiv').css('color','#ffffff');
          break;
          case "pastel":
          $('.restDiv').css('background-color','#74D4E4');
            break;
    }

  }else{
    switch (bt) {
      case 0:
        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/whole.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/whole.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/whole.png")');
                break;
        }
      break;
      case 1:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/d-2nd.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/d-2nd.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/d-2nd.png")');
                break;
        }
      break;
      case 12:
      case 2:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/2nd.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/2nd.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/2nd.png")');
                break;
        }
      break;
      case 3:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/d-4th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/d-4th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/d-4th.png")');
                break;
        }
      break;
      case 14:
      case 4:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/4th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/4th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/4th.png")');
                break;
        }
      break;
      case 5:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/d-8th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/d-8th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/d-8th.png")');
                break;
        }
      break;
      case 16:
      case 6:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/8th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/8th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/8th.png")');
                break;
        }
      break;
      case 7:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/d-16th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/d-16th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/d-16th.png")');
                break;
        }
      break;
      case 18:
      case 8:

        switch (theme) {
          case "dark":
          $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon/16th.png")');
            break;
            case "simple":
            $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/16th.png")');
              break;
              case "pastel":
              $('#nT-img-wrapper').css('background-image', 'url("static/resources/icon4simple/16th.png")');
                break;
        }
      break;
    }
    switch (theme) {
      case "dark":
      $('.restDiv').css('background-color','#3a4660');
      $('.restDiv').css('opacity','1');
        break;
        case "simple":
        $('.restDiv').css('background-color','#EAECF1');
        $('.restDiv').css('color','#444a47');
          break;
          case "pastel":
          $('.restDiv').css('background-color','#BFBFCB');
            break;
    }
  }

}
function displayTriTie() {
  switch (theme) {
    case "dark":
    if(tie == 'true'){
      $('.tieDiv').css('background-color','#342E54');
    }else{
      $('.tieDiv').css('background-color','#3a4660');
    }
    if(writing_plet){
      $('.tripletDiv').css('background-color','#342E54');
      $('.tripletDiv').css('opacity','1');
    }else{
      $('.tripletDiv').css('background-color','#3a4660');
    }
      break;

      case "simple":
      if(tie == 'true'){
        $('.tieDiv').css('background-color','#006fff');
        $('#tie-img-wrapper').css('background-image','url("static/resources/icon4simple/a_tie.png")');
      }else{
        $('.tieDiv').css('background-color','#EAECF1');
        $('#tie-img-wrapper').css('background-image','url("static/resources/icon4simple/tie.png")');

      }
      if(writing_plet){
        $('.tripletDiv').css('background-color','#006fff');
        $('#triplet-img-wrapper').css('background-image','url("static/resources/icon4simple/a_triplet.png")');
      }else{
        $('.tripletDiv').css('background-color','#EAECF1');
        $('#triplet-img-wrapper').css('background-image','url("static/resources/icon4simple/triplet.png")');
      }
        break;

        case "pastel":
        if(tie == 'true'){
          $('.tieDiv').css('background-color','#74d4e4');
        }else{
          $('.tieDiv').css('background-color','#BFBFCB');
        }
        if(writing_plet){
          $('.tripletDiv').css('background-color','#74d4e4');
        }else{
          $('.tripletDiv').css('background-color','#BFBFCB');
        }
          break;
  }

}
function domTie() {
  if(rest =="false"){
    if(currently_editing_num ==0){
      $(".tieDiv").css("background-color", "red");
      window.setTimeout(buzz2 ,500);
    }else if(writing){
      if(tie == "false"){
        tie = "true";
      }else{
        tie = "false";
      }
    }else if(editing){
      if(tie == "false"){
        n[currently_editing_num].tie = "true";
        tie = "true";
        ndata[currently_editing_num*data_per_note+7] = tie;
      }else{
        n[currently_editing_num].tie = "false";
        tie = "false";
        ndata[currently_editing_num*data_per_note+7] = tie;
      }
    }
    rearrange();
    displayTriTie();
  }else{
    $(".tieDiv").css("background-color", "red");
    window.setTimeout(buzz2 ,500);
  }
}
function buzz2(){
  switch (theme) {
    case "dark":
    $(".tieDiv").css("background-color", "#3a4660");
      break;
      case "simple":
      $(".tieDiv").css("background-color", "#EAECF1");
        break;
        case "pastel":
        $(".tieDiv").css("background-color", "#BFBFCB");
          break;
  }
}
function domRest() {
  if(rest == 'true'){
    rest = 'false';
  }else{
    rest = 'true';
  }
  if(editing){
    n[currently_editing_num].r = rest;
    ndata[currently_editing_num*data_per_note+1] = rest.toString()
    n[currently_editing_num].tie = "false";
    tie = "false";
    ndata[currently_editing_num*data_per_note+7] = tie;
    rearrange();
  }
  displayNoteType(beat_type);
}
function domPlet() {
    if(beat_type == 2 ||beat_type == 4 ||beat_type == 6 ||beat_type == 8 ||
      beat_type == 12 ||beat_type == 14 ||beat_type == 16 ||beat_type == 18){
      if(writing){
        if(!writing_plet){
          switch (beat_type) {
            case 2:
            if(beat_count == 0){
              writing_plet = true;
              beat_type += 10;
              displayTriTie();
            }else{
              $(".tripletDiv").css("background-color", "red");
              window.setTimeout(buzz, 500);
            }
              break;
              case 4:
              if(beat_count == 0 ||beat_count %32 == 0){
                writing_plet = true;
                beat_type += 10;
                displayTriTie();
              }else{
                $(".tripletDiv").css("background-color", "red");
                window.setTimeout(buzz, 500);
              }
                break;
                case 6:
                if(beat_count == 0 ||beat_count %16 == 0){
                  writing_plet = true;
                  beat_type += 10;
                  displayTriTie();
                }else{
                  $(".tripletDiv").css("background-color", "red");
                  window.setTimeout(buzz, 500);
                }
                  break;
                  case 8:
                if(beat_count == 0 ||beat_count % 8 == 0){
                    writing_plet = true;
                    beat_type += 10;
                    displayTriTie();
                  }else{
                    $(".tripletDiv").css("background-color", "red");
                    window.setTimeout(buzz, 500);
                  }
                    break;
              }
            }else{
              switch (plet_count) {
                case 0:
                  writing_plet = false;
                break;
                case 1:
                  writing_plet = false;
                  n.splice(currently_editing_num-1, 1);
                  ndata.splice((currently_editing_num-1)*data_per_note,data_per_note);
                  currently_editing_num -= 1;
                break;
                case 2:
                  writing_plet = false;
                  n.splice(currently_editing_num-1, 1);
                  ndata.splice((currently_editing_num-1)*data_per_note,data_per_note);
                  n.splice(currently_editing_num-2, 1);
                  ndata.splice((currently_editing_num-2)*data_per_note,data_per_note);
                  currently_editing_num -= 2;
                break;
              }
              beat_type -= 10;
              displayTriTie();
              rearrange();
            }
          }else{
            $(".tripletDiv").css("background-color", "red");
            window.setTimeout(buzz, 500);
            return;
          }
        }else{
          $(".tripletDiv").css("background-color", "red");
          window.setTimeout(buzz, 500);
        }
}
function buzz(){
  switch (theme) {
    case "dark":
    $(".tripletDiv").css("background-color", "#3a4660");
      break;
      case "simple":
      $(".tripletDiv").css("background-color", "#EAECF1");
        break;
        case "pastel":
        $(".tripletDiv").css("background-color", "#BFBFCB");
          break;
  }
}
function domRemove() {
  if(beat_count > 0 && beat_count <= 64){
    if(currently_editing_num>0 && currently_editing_num==n.length){
      currently_editing_num--;
      editing = true;
      writing = false;
      beat_type = n[currently_editing_num].bt;
      accidental_val = n[currently_editing_num].av;
      rest = n[currently_editing_num].r;
      tie = n[currently_editing_num].tie;
    }else if(currently_editing_num>=0 && currently_editing_num<n.length){
        if(n[currently_editing_num].completePlet){ //if complete
          switch (n[currently_editing_num].pc) {
            case 1:
              writing_plet = false;
              beat_type -= 10;
              n.splice(currently_editing_num, 3);
              ndata.splice((currently_editing_num)*data_per_note,data_per_note*3);
            break;
            case 2:
              writing_plet = false;
              beat_type -= 10;
              n.splice(currently_editing_num-1, 3);
              ndata.splice((currently_editing_num-1)*data_per_note,data_per_note*3);
              currently_editing_num -= 1;
            break;
            case 3:
              writing_plet = false;
              beat_type -= 10;
              n.splice(currently_editing_num-2, 3);
              ndata.splice((currently_editing_num-2)*data_per_note,data_per_note*3);
              currently_editing_num -= 2;
            break;
          }
          plet_count=0;
        }else{ //if not complete
          switch (n[currently_editing_num].pc) {
            case 0:
              n.splice(currently_editing_num, 1);
              ndata.splice(currently_editing_num*data_per_note,data_per_note)
            break;
            case 1:
            if(currently_editing_num == n.length-1){
              n.splice(currently_editing_num, 1);
              ndata.splice(currently_editing_num*data_per_note,data_per_note);
            }else{
              if(n[currently_editing_num+1].pc ==2){
                n.splice(currently_editing_num, 2);
                ndata.splice(currently_editing_num*data_per_note,data_per_note*2);
              }
            }
            writing_plet = false;
            beat_type -= 10;
            break;
              case 2:
              n.splice(currently_editing_num-1, 2);
              ndata.splice((currently_editing_num-1)*data_per_note,data_per_note*2);
              currently_editing_num -= 1;
              writing_plet = false;
              beat_type -= 10;
                break;
                case 3:
                n.splice(currently_editing_num-2, 3);
                ndata.splice((currently_editing_num-2)*data_per_note,data_per_note*3);
                currently_editing_num -= 2;
                writing_plet = false;
                beat_type -= 10;
                break;
          }
          plet_count = 0;
        }
      rearrange();
      writing =true;
      editing = false;
    }else{
      //this.buzz=true;
    }
  }else{
    if(writing_plet){
      switch (plet_count) {
        case 0:
          writing_plet = false;
          beat_type -= 10;
        break;
        case 1:
          writing_plet = false;
          beat_type -= 10;
          n.splice(currently_editing_num-1, 1);
          ndata.splice((currently_editing_num-1)*data_per_note,data_per_note);
          currently_editing_num -= 1;
        break;
        case 2:
          writing_plet = false;
          beat_type -= 10;
          n.splice(currently_editing_num-2, 2);
          ndata.splice((currently_editing_num-2)*data_per_note,data_per_note*2);
          currently_editing_num -= 2;
        break;
      }
      plet_count = 0;
      rearrange();
    }else{
      //this.buzz=true;
    }
  }
  if(beat_count ==0 && currently_editing_num ==0){
    writing = true;
    editing = false;
  }
  displayNoteType(beat_type);
  displayTriTie()
  switch (accidental_val) {
    case -1:
      $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon/flat.png")');
      break;
      case 0:
        $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon/nat.png")');
        break;
        case 1:
            $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon/sharp.png")');
          break;
  }
}
function domBang() {
  if(currently_editing_num == n.length){
    if(beat_count<64 && beat_count + beat_count_cal(beat_type) <=64){
      if(writing_plet){
        plet_count += 1;
      }
      var flat_or_sharp;
      switch (accidental_val) {
        case 0:
          flat_or_sharp ="";
        break;
        case -1:
          flat_or_sharp="b";
        break;
        case 1:
          flat_or_sharp="#";
        break;
      }
      k_interval_change(chord_cen);
      n.push(new Note(currently_editingX,
                      y_index,
                      rest,
                      beat_count,
                      beat_type,
                      plet_count,
                      accidental_show,
                      accidental_val,
                      tie,
                      prev_id[y_index]+flat_or_sharp,
                      interval_from_root.get(prev_id[y_index]+flat_or_sharp),
                      midiVal_Calc(y_index, octave_control, accidental_val),
                      chord_cen));

       ndata.push(y_index.toString(),       //0
                  rest.toString(),            //1
                  beat_count.toString(),      //2
                  beat_type.toString(),       //3
                  plet_count.toString(),         //4
                  accidental_show.toString(), //5
                  accidental_val.toString(),  //6
                  tie.toString(),           //7
                  prev_id[y_index]+flat_or_sharp,         //8
                  interval_from_root.get(prev_id[y_index]+flat_or_sharp),//9
                  midiVal_Calc(y_index, octave_control, accidental_val).toString(),//10
                  chord_cen);//11

                  currently_editing_num += 1;
      rearrange();
      tie= false;
    }else{
      //this.buzz=true;
    }

  }else{
    currently_editing_num=n.length;
    writing = true;
    editing = false;
    tie = "false";
    writing_plet = false;
    if(beat_type > 10){
      beat_type -=10;
    }
  }
  displayNoteType(beat_type);
  displayTriTie()
  switch (accidental_val) {
    case -1:
      $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon/flat.png")');
      break;
      case 0:
        $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon/nat.png")');
        break;
        case 1:
            $('#fs-img-wrapper').css('background-image', 'url("static/resources/icon/sharp.png")');
          break;
  }
}
function domFToggle() {
  if(is_chocen_sharp == 1 || is_chocen_sharp == 0){
    is_chocen_sharp = -1;
    switch (theme) {
      case "dark":
      $('.flatToggle').css('border', '1px solid #7c6edb');
      $('.sharpToggle').css('border', '1px solid #6256b1');
      $('.flatToggle span').css('color', '#7c6edb');
      $('.sharpToggle span').css('color', '#6256b1');
        break;
        case "simple":
        $('.flatToggle').css('background', '#006FFF');
        $('.sharpToggle').css('background', '#EAECF1');
        $('.flatToggle span').css('color', '#ffffff');
        $('.sharpToggle span').css('color', '#006FFF');
          break;
          case "pastel":
          $('.flatToggle').css('background', '#74D4E4');
          $('.sharpToggle').css('background', '#EAECF1');
          $('.flatToggle span').css('color', '#444A47');
          $('.sharpToggle span').css('color', '#74D4E4');
            break;
    }
  }else if(is_chocen_sharp == -1){
    is_chocen_sharp = 0;
    switch (theme) {
      case "dark":
      $('.flatToggle').css('border', '1px solid #6256b1');
      $('.sharpToggle').css('border', '1px solid #6256b1');
      $('.flatToggle span').css('color', '#6256b1');
      $('.sharpToggle span').css('color', '#6256b1');
        break;
        case "simple":
        $('.flatToggle').css('background', '#EAECF1');
        $('.sharpToggle').css('background', '#EAECF1');
        $('.flatToggle span').css('color', '#006FFF');
        $('.sharpToggle span').css('color', '#006FFF');
          break;
          case "pastel":
          $('.flatToggle').css('background', '#EAECF1');
          $('.sharpToggle').css('background', '#EAECF1');
          $('.flatToggle span').css('color', '#74D4E4');
          $('.sharpToggle span').css('color', '#74D4E4');
            break;
    }
  }
  if(is_chocen_sharp==1){
    chord_cen = if_is_Sharp.get(all_notes_in_key_str[selected_index]);
  }else if(is_chocen_sharp==-1){
    chord_cen = if_is_Flat.get(all_notes_in_key_str[selected_index]);
  }else{
    chord_cen = all_notes_in_key_str[selected_index];
  }
  var addition_f_s;
  switch (is_chocen_sharp) {
    case 0:
    addition_f_s = "";
      break;
      case 1:
      addition_f_s = "#";
        break;
        case -1:
        addition_f_s = "b";
          break;
  }
  p5Canvas4OtherUse[1].greekChord = " - " + addition_f_s + all_notes_in_key_greek.get(all_notes_in_key_str[selected_index])+chord_char;
  p5Canvas4OtherUse[1].chord = chord_cen + chord_char;
  p5Canvas4OtherUse[1].keystr = k_keycen(key) + " " + "Key";
}
function domSToggle() {
  if(is_chocen_sharp == -1 || is_chocen_sharp == 0){
    is_chocen_sharp = 1;
    switch (theme) {
      case "dark":
      $('.flatToggle').css('border', '1px solid #6256b1');
      $('.sharpToggle').css('border', '1px solid #7c6edb');
      $('.sharpToggle span').css('color', '#7c6edb');
      $('.flatToggle span').css('color', '#6256b1');
        break;
        case "simple":
        $('.flatToggle').css('background', '#EAECF1');
        $('.sharpToggle').css('background', '#006FFF');
        $('.flatToggle span').css('color', '#006FFF');
        $('.sharpToggle span').css('color', '#ffffff');
          break;
          case "pastel":
          $('.flatToggle').css('background', '#EAECF1');
          $('.sharpToggle').css('background', '#74D4E4');
          $('.flatToggle span').css('color', '#74D4E4');
          $('.sharpToggle span').css('color', '#444A47');
            break;
    }
  }else if(is_chocen_sharp == 1){
    is_chocen_sharp = 0;
    switch (theme) {
      case "dark":
      $('.flatToggle').css('border', '1px solid #6256b1');
      $('.sharpToggle').css('border', '1px solid #6256b1');
      $('.flatToggle span').css('color', '#6256b1');
      $('.sharpToggle span').css('color', '#6256b1');
        break;
        case "simple":
        $('.flatToggle').css('background', '#EAECF1');
        $('.sharpToggle').css('background', '#EAECF1');
        $('.flatToggle span').css('color', '#006FFF');
        $('.sharpToggle span').css('color', '#006FFF');
          break;
          case "pastel":
          $('.flatToggle').css('background', '#EAECF1');
          $('.sharpToggle').css('background', '#EAECF1');
          $('.flatToggle span').css('color', '#74D4E4');
          $('.sharpToggle span').css('color', '#74D4E4');
            break;
    }
  }
  if(is_chocen_sharp==1){
    chord_cen = if_is_Sharp.get(all_notes_in_key_str[selected_index]);
  }else if(is_chocen_sharp==-1){
    chord_cen = if_is_Flat.get(all_notes_in_key_str[selected_index]);
  }else{
    chord_cen = all_notes_in_key_str[selected_index];
  }
  var addition_f_s;
  switch (is_chocen_sharp) {
    case 0:
    addition_f_s = "";
      break;
      case 1:
      addition_f_s = "#";
        break;
        case -1:
        addition_f_s = "b";
          break;
  }
  p5Canvas4OtherUse[1].greekChord = " - " + addition_f_s + all_notes_in_key_greek.get(all_notes_in_key_str[selected_index])+chord_char;
  p5Canvas4OtherUse[1].chord = chord_cen + chord_char;
  p5Canvas4OtherUse[1].keystr = k_keycen(key) + " " + "Key";
}
function domFlat() {
  if(key<14){
    key+=1;
  }
  k_all_note_in_Key(key);
  if(is_chocen_sharp==1){
    chord_cen = if_is_Sharp.get(all_notes_in_key_str[selected_index]);
  }else if(is_chocen_sharp==-1){
    chord_cen = if_is_Flat.get(all_notes_in_key_str[selected_index]);
  }else{
    chord_cen = all_notes_in_key_str[selected_index];
  }
  p5Canvas4OtherUse[1].k = key;
  for (var i = 0; i < 7; i++) {
    intervals[i].innerText = all_notes_in_key_str[i];
    intervalLi[i].setAttribute("value",i);
  }
  intervalLi[selected_index].children[0].style.color = "#00ffff";
  intervalLi[selected_index].children[1].style.color = "#ffffff";
  var addition_f_s;
  switch (is_chocen_sharp) {
    case 0:
    addition_f_s = "";
      break;
      case 1:
      addition_f_s = "#";
        break;
        case -1:
        addition_f_s = "b";
          break;
  }
  p5Canvas4OtherUse[1].greekChord = " - " + addition_f_s + all_notes_in_key_greek.get(all_notes_in_key_str[selected_index])+chord_char;
  p5Canvas4OtherUse[1].chord = chord_cen + chord_char;
  p5Canvas4OtherUse[1].keystr = k_keycen(key) + " " + "Key";
}
function domSharp() {
  if(key>0){
    key-=1;
  }
  k_all_note_in_Key(key);
  if(is_chocen_sharp==1){
    chord_cen = if_is_Sharp.get(all_notes_in_key_str[selected_index]);
  }else if(is_chocen_sharp==-1){
    chord_cen = if_is_Flat.get(all_notes_in_key_str[selected_index]);
  }else{
    chord_cen = all_notes_in_key_str[selected_index];
  }
  p5Canvas4OtherUse[1].k = key;
  for (var i = 0; i < 7; i++) {
    intervals[i].innerText = all_notes_in_key_str[i];
    intervalLi[i].setAttribute("value",i);
  }
  intervalLi[selected_index].children[0].style.color = "#00ffff";
  intervalLi[selected_index].children[1].style.color = "#ffffff";
  var addition_f_s;
  switch (is_chocen_sharp) {
    case 0:
    addition_f_s = "";
      break;
      case 1:
      addition_f_s = "#";
        break;
        case -1:
        addition_f_s = "b";
          break;
  }
  p5Canvas4OtherUse[1].greekChord = " - " + addition_f_s + all_notes_in_key_greek.get(all_notes_in_key_str[selected_index])+chord_char;
  p5Canvas4OtherUse[1].chord = chord_cen + chord_char;
  p5Canvas4OtherUse[1].keystr = k_keycen(key) + " " + "Key";
}
function domApply() {
    $('.for_transparency').css("background-color", "rgba(20,20,20,0)");
    $('.for_transparency').css("z-index", "-99");
    bang_btn.style("filter", "brightness(1)");
    if(edit_interval){
      remove_btn.style("display", "table");
    }
    flatbtn.style("display", "none");
    sharpbtn.style("display", "none");
    interval_btn.style("filter", "brightness(1)");
    keysettingdiv.style("display", "none");
    difficulty.style('display', 'none');
    keySetting= false;
    charChange();
    nameChange();
    nameInput.style("display","none");
    chord_charInput.style("display","none");
    k_interval_change(chord_cen);
    k_interval_change_int_str(chord_cen);
    key_Changing = true;
    rearrange();
    switch (is_chocen_sharp) {
      case 0:
      addition_f_s = "";
        break;
        case 1:
        addition_f_s = "#";
          break;
          case -1:
          addition_f_s = "b";
            break;
    }
    $('#lick-title').html(name);
    $('#lick-intervalChord').html(addition_f_s + all_notes_in_key_greek.get(all_notes_in_key_str[selected_index])+chord_char);
    $('#lick-key').html(k_keycen(key) + " Key");
}

function saveData() {
  var json_data={
    "id": lick_id,
    "data": [...ndata]
  };
  xhr.open('POST', '/updatelick', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(json_data));
}
function isAccidentalShow(){
  let inst_accidentals = [];
  switch (key) {
      case 0:
        inst_accidentals = [...cs_key];
      break;
      case 1:
        inst_accidentals = [...fs_key];
      break;
      case 2:
        inst_accidentals = [...b_key];
      break;
      case 3:
        inst_accidentals = [...e_key];
      break;
      case 4:
        inst_accidentals = [...a_key];
      break;
      case 5:
        inst_accidentals = [...d_key];
      break;
      case 6:
        inst_accidentals = [...g_key];
      break;
      case 7:
        inst_accidentals = [...c_key];
      break;
      case 8:
        inst_accidentals = [...f_key];
      break;
      case 9:
        inst_accidentals = [...bb_key];
      break;
      case 10:
        inst_accidentals = [...eb_key];
      break;
      case 11:
        inst_accidentals = [...ab_key];
      break;
      case 12:
        inst_accidentals = [...db_key];
      break;
      case 13:
        inst_accidentals = [...gb_key];
      break;
      case 14:
        inst_accidentals = [...cb_key];
      break;
  }
  return inst_accidentals;
}
function rearrange() {
  var prev_key;
  var current_key;
  var difference_in_key;
  var transpose_up_down;

  var number_of_keysig = abs(key-7);
  timesig_start_point = keysig_start_point+number_of_keysig*(Width/90)+Width/40;
  currently_editingX = timesig_start_point + Width/17;
  beat_count=0;
  if(start){
    currently_editing_num =0;
  }

    prev_key = literal_CtoI.get(ndata[11]);
    current_key = literal_CtoI.get(chord_cen);
    difference_in_key = abs(prev_key - current_key);

    var mv_rebalancing_top_down = false;
    var mv_rebalancing_bottom_up = false;
    var if_accidental;
    var string;


    for (var i = 0; i < ndata.length; i+= data_per_note) {
      if(key_Changing){
        ndata[i+8] = interval_int_str.get(ndata[i+9]); //id
      }
       string = ndata[i+8];

      if(string.indexOf('#') !== -1){
        if_accidental =1;
        ndata[i+6] = "1";
      }else if(string.indexOf('b') !== -1){
        if_accidental =-1;
        ndata[i+6] = "-1";
      }else{
        if_accidental = 0;
        ndata[i+6] = "0";
      }
      if(if_accidental == 1 && int(ndata[i+10]) + difference_in_key>= 109){
        mv_rebalancing_top_down = true;
      }else if(int(ndata[i+10]) + difference_in_key> 108){
        mv_rebalancing_top_down = true;
      }
      if(if_accidental == -1 && int(ndata[i+10]) + difference_in_key<= 32){
        mv_rebalancing_bottom_up = true;
      }else if(int(ndata[i+10]) + difference_in_key< 33){
        mv_rebalancing_bottom_up = true;
      }
    }

    if(prev_key < current_key){
      transpose_up_down = true;
    }else{
      transpose_up_down = false;
    }


    if(key_Changing){
      //isAccidentalShow();
    }
    var inst_accidentals = this.isAccidentalShow();
    switch (is_chocen_sharp) {
      case 0:
        chord_cen = all_notes_in_key_str[int(selected_index)];
        break;
        case 1:
          chord_cen = if_is_Sharp.get(all_notes_in_key_str[int(selected_index)]);
          break;
          case -1:
            chord_cen = if_is_Flat.get(all_notes_in_key_str[int(selected_index)]);
            break;
    }
  for(var i = 0; i<ndata.length; i+=data_per_note){
      ndata[i+2] = beat_count.toString();
      ndata[i+11] = chord_cen;
      if(key_Changing){
        ndata[i+8] = interval_int_str.get(ndata[i+9]); //id
      }
       string = ndata[i+8];
      if(string.indexOf('#') !== -1){
        if_accidental =1;
        ndata[i+6] = "1";
      }else if(string.indexOf('b') !== -1){
        if_accidental =-1;
        ndata[i+6] = "-1";
      }else{
        if_accidental = 0;
        ndata[i+6] = "0";
      }
      var prev_note_mv = int(ndata[i+10]);

      if(transpose_up_down){
        if(mv_rebalancing_top_down){
          prev_note_mv += difference_in_key-12;
        }else{
          prev_note_mv += difference_in_key;
        }
      }else{
        if(mv_rebalancing_bottom_up){
          prev_note_mv += difference_in_key+12;
        }else{
          prev_note_mv -= difference_in_key;
        }
      }
      ndata[i+10] = prev_note_mv.toString();
      var pos =k_position_calc(prev_note_mv, if_accidental);
      ndata[i] = pos.toString();

      if(inst_accidentals[int(ndata[i])] != ndata[i+6]){
        if(ndata[i+1]=="false"){
          ndata[i+5] = "true";
          inst_accidentals[int(ndata[i])] = ndata[i+6];
        }
      }else{
        if(ndata[i+1]=="false"){
          ndata[i+5] = "false";
          inst_accidentals[int(ndata[i])] = ndata[i+6];
        }
      }
      if(ndata[i+1] == "true"){
        ndata[i] = "7";
        ndata[i+10] = "72";
      }
      currently_editingX+=makeSpace(ndata[i+5]);
      n[i/data_per_note] = new Note(currently_editingX,
      int(ndata[i]),
      ndata[i+1],
      int(ndata[i+2]),
      int(ndata[i+3]),
      int(ndata[i+4]),
      ndata[i+5],
      int(ndata[i+6]),
      ndata[i+7],
      ndata[i+8],
      ndata[i+9],
      int(ndata[i+10]));

      beat_type=int(ndata[i+3]);
      plet_count = int(ndata[i+4]);
      accidental_val = int(ndata[i+6]);
      rest = ndata[i+1];
      tie= ndata[i+7];
    switch(beat_type){
      case 0:
        currently_editingX_val= Width/5;
        beat_count+=64;
      break;
      case 1:
        currently_editingX_val= Width/6;
        beat_count+=48;
      break;
      case 2:
        currently_editingX_val= Width/7;
        beat_count+=32;
      break;
      case 3:
        currently_editingX_val= Width/8;
        beat_count+=24;
      break;
      case 4:
        currently_editingX_val= Width/9;
        beat_count+=16;
      break;
      case 5:
        currently_editingX_val= Width/10;
        beat_count+=12;
      break;
      case 6:
        currently_editingX_val= Width/13;
        beat_count+=8;
      break;
      case 7:
        currently_editingX_val= Width/15;
        beat_count+=6;
      break;
      case 8:
        currently_editingX_val= Width/20;
        beat_count+=4;
      break;
      case 12:
        currently_editingX_val= Width/7;
        if(plet_count >= 3){
          beat_count += 64;
          beat_type -= 10;
          plet_count =0;
        }
      break;
      case 14:
        currently_editingX_val = Width/9;
        if(plet_count >= 3){
          beat_count += 32;
          beat_type -= 10;
          plet_count =0;
        }
      break;
      case 16:
        currently_editingX_val = Width/13;
        if(plet_count >= 3){
          beat_count += 16;
          beat_type -= 10;
          plet_count =0;
        }
      break;
      case 18:
        currently_editingX_val= Width/17;
        if(plet_count >= 3){
          beat_count += 8;
          beat_type -= 10;
          plet_count =0;
        }
      break;
    }
      currently_editingX += currently_editingX_val;
      if(start){
        currently_editing_num +=1;
      }
    }
    key_Changing = false;
    if(plet_count != 0){
      writing_plet = true;
    }else{
      writing_plet = false;
    }
    if(currently_editing_num!= n.length){
      editing = true;
      writing = false;
    }else{
      editing = false;
      writing = true;
    }
    if(editing){
      beat_type= n[currently_editing_num].bt;
      plet_count = n[currently_editing_num].pc;
      accidental_val = n[currently_editing_num].av;
      rest = n[currently_editing_num].r;
      tie= n[currently_editing_num].tie;
      displayNoteType(n[currently_editing_num].bt)
    }
    if(start){
      if(currently_editing_num>0){
        displayTriTie();
        displayNoteType(n[currently_editing_num-1].bt)
      }
    }
    start = false;
    grouping();
    if(!resizing){
      saveData();
    }
    resizing = false;
}
function grouping() {
    for(let [i, ns] of n.entries()){
      ns.four_connected=false;
        ns.two_connected=false;
        ns.compound_connected=false;
        ns.three_compound_connected[0]=false;
        ns.two_compound_connected[1]=false;
        ns.two_compound_connected[2]=false;
        ns.two_compound_connected[0]=false;
        ns.two_compound_connected[1]=false;
        ns.two_compound_connected[2]=false;
        ns.four_compound_connected[0]=false;
        ns.four_compound_connected[1]=false;
        ns.five_compound_connected[0]=false;
        ns.five_compound_connected[1]=false;
      if(i == 0||reset||ns.bc % 32 == 0){
        ns.consecutive = 0;
        reset = false;
      }else if(i > 0){
        if(ns.r == 'false'&&n[i-1].r == 'false' && n[i].bt == n[i-1].bt){
          ns.consecutive = n[i-1].consecutive + 1;
        }else{
          ns.consecutive = 0;
        }
      }
      if(ns.consecutive == 4||ns.bt == 3||ns.bt == 5||ns.bt == 7){
        ns.consecutive = 0;
      }//consecutive ends
      if(ns.bt > 10){
        ns.consecutive=0;
        reset = true;
      }
        /////////////////////////////////////////////////////////////
      if(ns.bc%16 ==4){

        if(ns.consecutive ==1 && ns.r == 'false' && n[i-1].r == 'false'){
          n[i].two_connected = true;
          n[i-1].two_connected = true;

        }else if(ns.consecutive==0&& ns.bt == 5 && n[i-1].bt ==8){
          n[i].two_compound_connected[1]= true;
          n[i-1].two_compound_connected[1]= true;
          reset=true;
        }
        ///////////////////////////////////////////////////////////////
      }else if(ns.bc%16 == 12){

        if(ns.consecutive == 1 && ns.r == 'false' && n[i-1].r == 'false'){
          n[i].two_connected = true;
          n[i-1].two_connected = true;

        }
        if(ns.consecutive==3){
          n[i-2].two_connected = false;
          n[i-3].two_connected = false;

          n[i].four_connected = true;
          n[i-1].four_connected = true;
          n[i-2].four_connected = true;
          n[i-3].four_connected = true;
          reset=true;
        }else if(ns.consecutive ==1 && ns.bt ==8&& ns.two_connected && n[i-2].bt == 6 ){
          n[i].two_connected = false;
          n[i-1].two_connected = false;

          n[i].three_compound_connected[1] = true;
          n[i-1].three_compound_connected[1] = true;
          n[i-2].three_compound_connected[1] = true;
          reset=true;
        }else if(ns.bt ==8 && n.length>1&&i>1&& n[i-2].bt == 8 && n[i-1].bt == 6){

          n[i].three_compound_connected[2] = true;
          n[i-1].three_compound_connected[2] = true;
          n[i-2].three_compound_connected[2] = true;
          reset=true;
        }else if(ns.consecutive==0&&ns.bt == 8&&n[i-1].bt == 5){
          n[i].two_compound_connected[0]= true;
          n[i-1].two_compound_connected[0]= true;
          reset=true;
        }else if(ns.bt == 8 &&ns.two_connected&& i>3&&
          n[i].r == 'false'&& n[i-1].r == 'false'&& n[i-2].r == 'false'&&
          n[i-3].r == 'false'&& n[i-4].r == 'false'&& n[i-2].bt==18 && n[i-3].bt==18 && n[i-4].bt==18){
          n[i].five_compound_connected[0] = true;
          n[i-1].five_compound_connected[0] = true;
          n[i-2].five_compound_connected[0] = true;
          n[i-3].five_compound_connected[0] = true;
          n[i-4].five_compound_connected[0] = true;
          reset = true;
        }
        //////////////////////////////////////////////////////////////////
      }else if(ns.bc%16 ==8){

        if(ns.consecutive ==1 && ns.r == 'false' && n[i-1].r == 'false'){
          n[i].two_connected = true;
          n[i-1].two_connected = true;
        }
        if(ns.consecutive==3 && n[i-2].two_connected && n[i-2].bt == 6 && ns.r == 'false' && n[i-1].r == 'false'){
          n[i-2].two_connected = false;
          n[i-3].two_connected = false;

          n[i].four_connected = true;
          n[i-1].four_connected = true;
          n[i-2].four_connected = true;
          n[i-3].four_connected = true;
          reset=true;
        }else if(ns.consecutive == 0 && ns.bt == 6 && n[i-1].bt==8 && n[i-1].two_connected){ //886
          n[i-1].two_connected = false;
          n[i-2].two_connected = false;

          n[i].three_compound_connected[0] = true;
          n[i-1].three_compound_connected[0] = true;
          n[i-2].three_compound_connected[0] = true;
          reset=true;

        }else if(ns.bt == 6 && i>2&&
          n[i].r == 'false'&& n[i-1].r == 'false'&& n[i-2].r == 'false'&&
          n[i-3].r == 'false'&&
          n[i-1].bt ==18 && n[i-2].bt ==18&& n[i-3].bt ==18){//3336
          n[i].four_compound_connected[0] =true;
          n[i-1].four_compound_connected[0] =true;
          n[i-2].four_compound_connected[0] =true;
          n[i-3].four_compound_connected[0] =true;
          reset=true;
        }else if(ns.bt ==18 &&i>2&&
          n[i].r == 'false'&& n[i-1].r == 'false'&& n[i-2].r == 'false'&&
          n[i-3].r == 'false'&&
          n[i-1].bt == 18&&n[i-2].bt == 18&& n[i-3].bt ==6&&n[i-3].bc%16 ==0){
          n[i].four_compound_connected[1] =true;
          n[i-1].four_compound_connected[1] =true;
          n[i-2].four_compound_connected[1] =true;
          n[i-3].four_compound_connected[1] =true;
          reset=true;
        }else if(ns.bt == 18 && i>3&&
          n[i].r == 'false'&& n[i-1].r == 'false'&& n[i-2].r == 'false'&&
          n[i-3].r == 'false'&& n[i-4].r == 'false'&&
          n[i-1].bt==18 && n[i-2].bt==18&&n[i-3].bt==8 &&n[i-3].two_connected){
          n[i-3].two_connected = false;
          n[i-4].two_connected = false;

          n[i].five_compound_connected[1] = true;
          n[i-1].five_compound_connected[1] = true;
          n[i-2].five_compound_connected[1] = true;
          n[i-3].five_compound_connected[1] = true;
          n[i-4].five_compound_connected[1] = true;
          reset = true;
        }
      }
      /////////////////////////////////////////////////////////////
    }//loop end
}// grouping end
function makeSpace(s) {
    if(s == "true"){
      return Width/40;
    }else{
      return 0;
    }
}
