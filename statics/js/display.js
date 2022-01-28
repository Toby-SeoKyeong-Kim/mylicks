function bigD(mwidth) {
  var number_of_keysig = abs(key-7);
  var asig = mwidth/35;
  var order_of_flat = [7, 5.5, 7.5, 6, 8, 6.5, 8.5];
  var order_of_sharp = [5, 6.5, 4.5, 6, 4, 5.5, 3.5];
  fill(255);
  noStroke();
  rect(mwidth*0.066,ypos,container.clientWidth,mheight);

  fill(0);
  stroke(0);
  strokeCap(SQUARE);
  strokeWeight(mheight/360);
  line(xpos+xpos_moving_val, ypos+5*(mheight/12), xpos+xpos_moving_val, ypos+9*(mheight/12));

  if(n.length == 0){
    strokeWeight(mheight*7/360);
    line(xpos+xpos_moving_val+mwidth,ypos+5*(mheight/12),xpos+xpos_moving_val+mwidth, ypos+9*(mheight/12));
    strokeWeight(mheight*4/360);
    line(xpos+xpos_moving_val+mwidth-mwidth/40,ypos+5*(mheight/12),xpos+xpos_moving_val+mwidth-mwidth/40, ypos+9*(mheight/12));
    strokeWeight(mheight/360);
    for (var i = 5; i < 10; i++) {
      line(xpos+xpos_moving_val,ypos+i*(mheight/12),xpos+xpos_moving_val+mwidth,ypos+i*(mheight/12));
    }
  }else{
    strokeWeight(mheight*7/360);
    line(xpos_moving_val+currently_editingX,
      ypos+5*(mheight/12),
      xpos_moving_val+currently_editingX,
      ypos+9*(mheight/12));
    strokeWeight(mheight*4/360);
    line(xpos_moving_val+currently_editingX-mwidth/40,ypos+5*(mheight/12),xpos_moving_val+currently_editingX-mwidth/40, ypos+9*(mheight/12));
    strokeWeight(mheight/360);
    for (var i = 5; i < 10; i++) {
      line(xpos+xpos_moving_val,ypos+i*(mheight/12),xpos_moving_val+currently_editingX,ypos+i*(mheight/12));
    }

  }

  tint(0,255);
  image(img, int(xpos+mwidth/80+xpos_moving_val), int(ypos+4.1*(mheight/12)), int(mwidth/18), int(ypos+5.5*(mheight/12)));
  noFill();

  for(var i = 0; i < number_of_keysig; i++){
    if(key<7){
      DrawSharp(xpos_moving_val+keysig_start_point + mwidth/95*i,
        ypos+order_of_sharp[i]*(mheight/12) - mheight/18,
        asig,
        mheight/9);
    }else if(key>7){
      DrawFlat(xpos_moving_val+keysig_start_point + mwidth/95*i,
        ypos+order_of_flat[i]*(mheight/12) - mheight/14,
        asig,
        mheight/9);
    }
  }
  fill(0);
  textSize(2*mheight/12);
  strokeWeight(mheight/300);
  textAlign(CENTER,CENTER);
  text("4",timesig_start_point+xpos_moving_val,ypos+6*mheight/12);
  text("4",timesig_start_point+xpos_moving_val,ypos+8*mheight/12);
  strokeWeight(mheight/360);
  textSize(mheight/12);
  textAlign(LEFT,CENTER);
  text(chord_cen + chord_char,
    xpos_moving_val+xpos+mheight/6,
    ypos+mheight/12);
  if(n.length==0 || currently_editing_num == n.length){
    if(beat_count < 64){
      preview(currently_editingX+xpos_moving_val, y_index, rest, beat_type, writing_plet);
    }
  }
  octave_consecutive = 0;
  textAlign(CENTER,CENTER);
  textSize(mheight/12);
  strokeWeight(mheight/360);
  fill(70);
  stroke(70);
  var octave_height = ypos+ mheight/12;
  for(var i = 0; i < n.length; i++){
    if(i ==0){ //if it is the first note
      strokeWeight(mheight/360);
      switch (n[i].octave_control) {
        case -2:
          text("16vb", n[i].x+xpos_moving_val, octave_height);
          n[i].octave_consecutive = octave_consecutive;
        break;
        case -1:
          text("8vb", n[i].x+xpos_moving_val, octave_height);
          n[i].octave_consecutive = octave_consecutive;
        break;
        case 1:
          text("8va", n[i].x+xpos_moving_val, octave_height);
          n[i].octave_consecutive = octave_consecutive;
        break;
        case 2:
          text("16va", n[i].x+xpos_moving_val, octave_height);
          n[i].octave_consecutive = octave_consecutive;
        break;
      }
    }else if(i == n.length-1){//if it is the last note and matters
      strokeWeight(mheight/360);
      if(n[i].octave_control != n[i-1].octave_control){
        octave_consecutive = 0;
        n[i].octave_consecutive = octave_consecutive;
        switch (n[i].octave_control) {
          case -2:
            text("16vb", n[i].x+xpos_moving_val, octave_height);
          break;
          case -1:
            text("8vb", n[i].x+xpos_moving_val, octave_height);
          break;
          case 1:
            text("8va", n[i].x+xpos_moving_val, octave_height);
          break;
          case 2:
            text("16va", n[i].x+xpos_moving_val, octave_height);
          break;
        }
        switch (n[i-1].octave_control) {
          case -2:
            text("16vb", n[i-1-n[i-1].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i-1].octave_consecutive != 0){
              drawDottedLine(n[i-1].x+xpos_moving_val, octave_height,
              n[i-1-n[i-1].octave_consecutive].x+textWidth("16va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i-1].x+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i-1].x+mheight/12+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
          case -1:
            text("8vb", n[i-1-n[i-1].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i-1].octave_consecutive != 0){
              drawDottedLine(n[i-1].x+xpos_moving_val, octave_height,
              n[i-1-n[i-1].octave_consecutive].x+textWidth("8va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i-1].x+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i-1].x+mheight/12+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
          case 1:
            text("8va", n[i-1-n[i-1].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i-1].octave_consecutive != 0){
              drawDottedLine(n[i-1].x+xpos_moving_val, octave_height,
              n[i-1-n[i-1].octave_consecutive].x+textWidth("8va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i-1].x+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i-1].x+mheight/12+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
          case 2:
            text("16va", n[i-1-n[i-1].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i-1].octave_consecutive != 0){
              drawDottedLine(n[i-1].x+xpos_moving_val, octave_height,
              n[i-1-n[i-1].octave_consecutive].x+textWidth("16va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i-1].x+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i-1].x+mheight/12+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
        }
      }else{
        strokeWeight(mheight/360);
        octave_consecutive+=1;
        n[i].octave_consecutive = octave_consecutive;
        switch (n[i].octave_control) {
          case -2:
            text("16vb", n[i-n[i].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i].octave_consecutive != 0){
              drawDottedLine(n[i].x+xpos_moving_val, octave_height,
              n[i-n[i].octave_consecutive].x+textWidth("16va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i].x+xpos_moving_val, octave_height,
                  n[i].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i].x+mheight/12+xpos_moving_val, octave_height,
                  n[i].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
          case -1:
            text("8vb", n[i-n[i].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i].octave_consecutive != 0){
              drawDottedLine(n[i].x+xpos_moving_val, octave_height,
              n[i-n[i].octave_consecutive].x+textWidth("8va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i].x+xpos_moving_val, octave_height,
                  n[i].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i].x+mheight/12+xpos_moving_val, octave_height,
                  n[i].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
          case 1:
            text("8va", n[i-n[i].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i].octave_consecutive != 0){
              drawDottedLine(n[i].x+xpos_moving_val, octave_height,
              n[i-n[i].octave_consecutive].x+textWidth("8va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i].x+xpos_moving_val, octave_height,
                  n[i].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i].x+mheight/12+xpos_moving_val, octave_height,
                  n[i].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
          case 2:
            text("16va", n[i-n[i].octave_consecutive].x, octave_height);
            if(n[i].octave_consecutive != 0){
              drawDottedLine(n[i].x+xpos_moving_val, octave_height,
              n[i-n[i].octave_consecutive].x+textWidth("16va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i].x+xpos_moving_val, octave_height,
                  n[i].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i].x+mheight/12+xpos_moving_val, octave_height,
                  n[i].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
        }
      }
    }
    if(i > 0 && i<n.length-1){ //if it is neither first nor last but matters
      strokeWeight(mheight/360);
      if(n[i].octave_control != n[i-1].octave_control){
        octave_consecutive = 0;
        n[i].octave_consecutive = octave_consecutive;
        switch (n[i-1].octave_control) {
          case -2:
            text("16vb", n[i-1-n[i-1].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i-1].octave_consecutive != 0){
              drawDottedLine(n[i-1].x+xpos_moving_val, octave_height,
              n[i-1-n[i-1].octave_consecutive].x+textWidth("16va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i-1].x+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i-1].x+mheight/12+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
          case -1:
            text("8vb", n[i-1-n[i-1].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i-1].octave_consecutive != 0){
              drawDottedLine(n[i-1].x+xpos_moving_val, octave_height,
              n[i-1-n[i-1].octave_consecutive].x+textWidth("8va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i-1].x+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i-1].x+mheight/12+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
          case 1:
            text("8va", n[i-1-n[i-1].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i-1].octave_consecutive != 0){
              drawDottedLine(n[i-1].x+xpos_moving_val, octave_height,
              n[i-1-n[i-1].octave_consecutive].x+textWidth("8va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i-1].x+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i-1].x+mheight/12+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
          case 2:
            text("16va", n[i-1-n[i-1].octave_consecutive].x+xpos_moving_val, octave_height);
            if(n[i-1].octave_consecutive != 0){
              drawDottedLine(n[i-1].x+xpos_moving_val, octave_height,
              n[i-1-n[i-1].octave_consecutive].x+textWidth("16va")+xpos_moving_val, octave_height);
              strokeWeight(mwidth/300);
              stroke(70);
              line(n[i-1].x+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height);
              line(n[i-1].x+mheight/12+xpos_moving_val, octave_height,
                  n[i-1].x+mheight/12+xpos_moving_val, octave_height+mheight/12);
            }
          break;
        }
      }else{
        strokeWeight(mheight/360);
        octave_consecutive+=1;
        n[i].octave_consecutive = octave_consecutive;
      }
    }

  }
}
function drawDottedLine(x1,y1,x2,y2) {
  noStroke();
  var d = dist(x1, y1, x2, y2);
  var amount_of_dots = d / (mheight/12);
  for (var i = 0; i <= int(amount_of_dots); i++) {
  var x = lerp(x1, x2, i/int(amount_of_dots));
  var y = lerp(y1, y2, i/int(amount_of_dots));
  ellipse(x, y, mheight/48, mheight/48);
  }
}

function drawDottedLinedense(x1,y1,x2,y2) {
  noStroke();
  var d = dist(x1, y1, x2, y2);
  var amount_of_dots = d / (mheight/70);
  for (var i = 0; i <= int(amount_of_dots); i++) {
  var x = lerp(x1, x2, i/int(amount_of_dots));
  var y = lerp(y1, y2, i/int(amount_of_dots));
  ellipse(x, y, mheight/100, mheight/100);
  }
}

function drawGobackB() {
  fill(20, 220, 30,130);
  if(mouseIsPressed && mouseIsOnGobackB()){
    fill(0, 200, 10,130);
  }else if(mouseIsOnGobackB()){
    fill(40, 240, 50,130);
  }
  noStroke();
  rectMode(CORNER);
  rect(0, 0, mwidth/5, ypos);
  textSize(ypos/3);
  textAlign(CENTER,CENTER);
  strokeWeight(mwidth/550);
  stroke(255,130);
  fill(255,130);
  text("Go back", 1*mwidth/10, ypos/2);
}
function mouseIsOnGobackB() {
   if(mouseX > 0
    &&mouseX < mwidth/5
    &&mouseY >  0
    &&mouseY < ypos
    &&is_going_to_return){
      return true;
  }else{
    return false;
  }
}
function mouseIsOnEditIntervalB() {
   if(mouseX > mwidth*.682 + mwidth*.1585
    &&mouseX < mwidth*.682 + mwidth*.1585 + mwidth*.1585
    &&mouseY >  2
    &&mouseY < 2+mheight*3/48){
      return true;
  }else{
    return false;
  }
}

function drawOctaveTranspose() {
  var mouseHover = 0;
  if(mouseIsOnOctaveUp() || mouseIsOnOctaveDown()){
    mouseHover = -2;
  }
  fill(btns_color);
  rectMode(CORNER);
  noStroke();
  rect(0,ypos+mouseHover,Width*0.052,mheight, 18,0,0,18);

  fill(btn_elements_color);
  drawDottedLinedense(Width*0.052/4, ypos+mheight/2+mouseHover, Width*3*0.052/4, ypos+mheight/2+mouseHover)

  noFill();
  stroke(btn_elements_color);
  if(mouseIsPressed && mouseIsOnOctaveUp()){
    fill(btn_elements_color);
  }
  strokeWeight(mwidth/800);
  triangle(Width*0.052/3, ypos+mheight*7/16+mouseHover,
  Width*0.052*2/3, ypos+mheight*7/16+mouseHover,
  Width*0.052/2, ypos+mheight*6/16+mouseHover);
  noFill();
  if(mouseIsPressed && mouseIsOnOctaveDown()){
    fill(btn_elements_color);
  }
  triangle(Width*0.052/3, ypos+mheight*9/16+mouseHover,
  Width*0.052*2/3, ypos+mheight*9/16+mouseHover,
  Width*0.052/2, ypos+mheight*10/16+mouseHover);
}
function mouseIsOnOctaveUp() {
  if(mouseX > 0
   &&mouseX < mwidth*0.052
   &&mouseY >  ypos
   &&mouseY < ypos+mheight/2){
     return true;
 }else{
   return false;
 }
}
function mouseIsOnOctaveDown() {
  if(mouseX > 0
   &&mouseX < mwidth*0.052
   &&mouseY >  ypos+mheight/2
   &&mouseY < ypos+mheight){
     return true;
 }else{
   return false;
 }
}
function canTransposeOctave(up) {
  var returnvar = true;
  switch (up) {
    case "UP":
      for(var i = 0 ; i<n.length; i++){
        if(n[i].mv + 12 > 109){
          returnvar = false;
        }
      }
    break;
    case "DOWN":
      for(var i = 0 ; i<n.length; i++){
        if(n[i].mv - 12 < 32){
          returnvar = false;
        }
      }
    break;
  }
  return returnvar;
}
function preview(cx, yi, r, bt, wp) {
  if(r == 'false'){
    var pre_ypos = ypos+y_indexs[yi]*(mheight/12);
    strokeWeight(mheight/360);
    stroke(0);
    switch (yi) {
      case 0:
        line(cx - mheight/12+xpos_moving_val, ypos+y_indexs[yi+2]*(mheight/12),
        cx + mheight/12+xpos_moving_val, ypos+y_indexs[yi+2]*(mheight/12));
      case 2:
        line(cx - mheight/12+xpos_moving_val, pre_ypos,
        cx + mheight/12+xpos_moving_val, pre_ypos);
      break;
      case 16:
        line(cx - mheight/12+xpos_moving_val, ypos+y_indexs[yi-2]*(mheight/12),
        cx + mheight/12+xpos_moving_val, ypos+y_indexs[yi-2]*(mheight/12));
      case 14:
        line(cx - mheight/12+xpos_moving_val, pre_ypos,
        cx + mheight/12+xpos_moving_val, pre_ypos);
      break;
      case 1:
        line(cx - mheight/12+xpos_moving_val, ypos+y_indexs[yi+1]*(mheight/12),
        cx + mheight/12+xpos_moving_val, ypos+y_indexs[yi+1]*(mheight/12));
      break;
      case 15:
        line(cx - mheight/12+xpos_moving_val, ypos+y_indexs[yi-1]*(mheight/12),
        cx + mheight/12+xpos_moving_val, ypos+y_indexs[yi-1]*(mheight/12));
      break;
    }
      fill(140);
      stroke(140);
      textAlign(CENTER,CENTER);
      textSize(mheight/12);
      switch (octave_control) {
        case 2:
          text("16va", cx+xpos_moving_val, ypos+mheight/12);
        break;
        case 1:
          text("8va", cx+xpos_moving_val, ypos+mheight/12);
        break;
        case 0:

        break;
        case -1:
          text("8vb", cx+xpos_moving_val, ypos+mheight/12);
        break;
        case -2:
          text("16vb", cx+xpos_moving_val, ypos+mheight/12);
        break;
      }
     if(bt >2&& bt != 12){
        noStroke();
        push();
        translate(cx, pre_ypos);

        rotate(radians(-30));
        ellipse(0 , 0, 1.5*mheight/12, mheight/12);
        pop();
      }else if(bt <=2 ||bt ==12){
        noStroke();
        push();
        translate(cx, pre_ypos);

           if(bt !=0){
             rotate(radians(-30));
           }
           beginShape();
         for(let theta = 0; theta< TWO_PI; theta += TWO_PI/120){
           vertex(-1.5*mheight/24*cos(theta),-1*mheight/24*sin(theta));
         }

       endShape();
       fill(255);
       beginShape();
         vertex(-1.3*mheight/24, 0);
         vertex(0, 0.7*mheight/24);
         vertex(1.3*mheight/24, 0);
         vertex(0, -0.7*mheight/24);
       endShape();
           pop();
      }

      fill(140);
      stroke(140);
      strokeWeight(mheight/360);
      switch(bt){
        case 0://0 being whole note
        break;
        case 1://1 being second note with dot
                  if (yi<=7){

                      beginShape();
                      curveVertex(cx-10*mwidth/700, pre_ypos);
                      curveVertex(cx-10*mwidth/700, pre_ypos);
                      curveVertex(cx-10*mwidth/700, pre_ypos+110*mheight/400);
                      curveVertex(cx-10*mwidth/700, pre_ypos+110*mheight/400);
                      endShape();
                              strokeWeight(mwidth/150);
                              point(cx+17*mwidth/700, pre_ypos-2*mheight/400);

                       }else{

                      beginShape();
                      curveVertex(cx+10*mwidth/700, pre_ypos);
                      curveVertex(cx+10*mwidth/700, pre_ypos);
                      curveVertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      curveVertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      endShape();
                              strokeWeight(mwidth/150);
                              point(cx+17*mwidth/700, pre_ypos-2*mheight/400);
                       }
          break;
          case 12:
          case 2://2 being second note
                  if (yi<=7){

                      beginShape();
                      curveVertex(cx-10*mwidth/700, pre_ypos);
                      curveVertex(cx-10*mwidth/700, pre_ypos);
                      curveVertex(cx-10*mwidth/700, pre_ypos+110*mheight/400);
                      curveVertex(cx-10*mwidth/700, pre_ypos+110*mheight/400);
                      endShape();

                       }else{
                      beginShape();
                      curveVertex(cx+10*mwidth/700, pre_ypos);
                      curveVertex(cx+10*mwidth/700, pre_ypos);
                      curveVertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      curveVertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      endShape();
                       }
          break;
          case 3://3 being quarter note with dot
                  if (yi<=7){

                      beginShape();
                      curveVertex(cx-10*mwidth/700, pre_ypos);
                      curveVertex(cx-10*mwidth/700, pre_ypos);
                      curveVertex(cx-10*mwidth/700, pre_ypos+110*mheight/400);
                      curveVertex(cx-10*mwidth/700, pre_ypos+110*mheight/400);
                      endShape();
                              strokeWeight(mwidth/150);
                              point(cx+17*mwidth/700, pre_ypos-2*mheight/400);

                       }else{

                      beginShape();
                      curveVertex(cx+10*mwidth/700, pre_ypos);
                      curveVertex(cx+10*mwidth/700, pre_ypos);
                      curveVertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      curveVertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      endShape();
                              strokeWeight(mwidth/150);
                              point(cx+17*mwidth/700, pre_ypos-2*mheight/400);
                       }
          break;
          case 14:
          case 4://4 being quarter note
                  if (yi<=7){

                      beginShape();
                      curveVertex(cx-10*mwidth/700, pre_ypos);
                      curveVertex(cx-10*mwidth/700, pre_ypos);
                      curveVertex(cx-10*mwidth/700, pre_ypos+110*mheight/400);
                      curveVertex(cx-10*mwidth/700, pre_ypos+110*mheight/400);
                      endShape();

                       }else{
                      beginShape();
                      curveVertex(cx+10*mwidth/700, pre_ypos);
                      curveVertex(cx+10*mwidth/700, pre_ypos);
                      curveVertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      curveVertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      endShape();
                       }
          break;
          case 5:
          if (yi<=7){
            noFill();
                      beginShape();
                      vertex(cx-10*mwidth/700, pre_ypos);
                      vertex(cx-10*mwidth/700, pre_ypos);
                      vertex(cx-10*mwidth/700, pre_ypos+120*mheight/400);
                      curveVertex(cx-6*mwidth/700, pre_ypos+90*mheight/400);
                      bezierVertex(cx + 7*mwidth/700, pre_ypos +40*mheight/400,
                        cx-6*mwidth/700, pre_ypos+90*mheight/400,
                        cx+5*mwidth/700, pre_ypos+13*mheight/400);
                      curveVertex(cx+7*mwidth/700, pre_ypos+11*mheight/400);
                      vertex(cx+3*mwidth/700, pre_ypos+2*mheight/400);
                      endShape();
                               strokeWeight(mwidth/150);
                               point(cx+17*mwidth/700, pre_ypos-2*mheight/400);

                       }else{
                         noFill();
                      beginShape();
                      vertex(cx+10*mwidth/700, pre_ypos);
                      vertex(cx+10*mwidth/700, pre_ypos);
                      vertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      curveVertex(cx+14*mwidth/700, pre_ypos-105*mheight/400);
                       bezierVertex(cx+ 28*mwidth/700, pre_ypos-95*mheight/400,
                                    cx+14*mwidth/700, pre_ypos-105*mheight/400,
                                    cx+30*mwidth/700, pre_ypos - 18*mheight/400);
                      curveVertex(cx+17*mwidth/700, pre_ypos-12*mheight/400);
                      vertex(cx+14*mwidth/700, pre_ypos-6*mheight/400);
                      endShape();
                               strokeWeight(mwidth/150);
                               point(cx+17*mwidth/700, pre_ypos+2*mheight/400);
                       }
          break;
          case 16:
          case 6:
          if (yi<=7){
            noFill();
                      beginShape();
                      vertex(cx-10*mwidth/700, pre_ypos);
                      vertex(cx-10*mwidth/700, pre_ypos);
                      vertex(cx-10*mwidth/700, pre_ypos+120*mheight/400);
                      curveVertex(cx-6*mwidth/700, pre_ypos+90*mheight/400);
                      bezierVertex(cx + 7*mwidth/700, pre_ypos +50*mheight/400,
                        cx-6*mwidth/700, pre_ypos+90*mheight/400,
                        cx+5*mwidth/700, pre_ypos+13*mheight/400);
                      curveVertex(cx+7*mwidth/700, pre_ypos+11*mheight/400);
                      vertex(cx+3*mwidth/700, pre_ypos+2*mheight/400);
                      endShape();


                       }else{
                         noFill();
                      beginShape();
                      vertex(cx+10*mwidth/700, pre_ypos);
                      vertex(cx+10*mwidth/700, pre_ypos);
                      vertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      curveVertex(cx+14*mwidth/700, pre_ypos-105*mheight/400);
                       bezierVertex(cx+ 28*mwidth/700, pre_ypos-95*mheight/400,
                                    cx+14*mwidth/700, pre_ypos-105*mheight/400,
                                    cx+30*mwidth/700, pre_ypos - 18*mheight/400);
                      curveVertex(cx+17*mwidth/700, pre_ypos-12*mheight/400);
                      vertex(cx+14*mwidth/700, pre_ypos-6*mheight/400);
                      endShape();
                         }
          break;
          case 7:
          if (yi<=7){
            noFill();
                      beginShape();
                      vertex(cx-10*mwidth/700, pre_ypos);
                      vertex(cx-10*mwidth/700, pre_ypos);
                      vertex(cx-10*mwidth/700, pre_ypos+120*mheight/400);
                      curveVertex(cx-6*mwidth/700, pre_ypos+100*mheight/400);
                      bezierVertex(cx + 10*mwidth/700, pre_ypos +70*mheight/400,
                        cx-6*mwidth/700, pre_ypos+80*mheight/400,
                        cx+5*mwidth/700, pre_ypos+53*mheight/400);
                      curveVertex(cx+3*mwidth/700, pre_ypos+40*mheight/400);
                       vertex(cx+3*mwidth/700, pre_ypos+40*mheight/400);
                      endShape();
                      beginShape();
                        vertex(cx-10*mwidth/700, pre_ypos+90*mheight/400);
                        vertex(cx-10*mwidth/700, pre_ypos+90*mheight/400);
                        bezierVertex(cx + 10*mwidth/700, pre_ypos +40*mheight/400,
                          cx-6*mwidth/700, pre_ypos+80*mheight/400,
                          cx+5*mwidth/700, pre_ypos+53*mheight/400);
                          curveVertex(cx+7*mwidth/700, pre_ypos+11*mheight/400);
                          vertex(cx+3*mwidth/700, pre_ypos+2*mheight/400);
                      endShape();
                               strokeWeight(mwidth/150);
                               point(cx+17*mwidth/700, pre_ypos-2*mheight/400);

                       }else{
                         noFill();
                      beginShape();
                      vertex(cx+10*mwidth/700, pre_ypos);
                      vertex(cx+10*mwidth/700, pre_ypos);
                      vertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      curveVertex(cx+14*mwidth/700, pre_ypos-105*mheight/400);
                       bezierVertex(cx+ 28*mwidth/700, pre_ypos-105*mheight/400,
                                    cx+14*mwidth/700, pre_ypos-105*mheight/400,
                                    cx+30*mwidth/700, pre_ypos - 18*mheight/400);
                      curveVertex(cx+17*mwidth/700, pre_ypos-52*mheight/400);
                      vertex(cx+14*mwidth/700, pre_ypos-6*mheight/400);
                      endShape();
                      beginShape();
                      vertex(cx+10*mwidth/700, pre_ypos-90*mheight/400);
                      vertex(cx+10*mwidth/700, pre_ypos-90*mheight/400);
                      curveVertex(cx+12*mwidth/700, pre_ypos-85*mheight/400)
                      bezierVertex(cx+ 28*mwidth/700, pre_ypos-70*mheight/400,
                                   cx+14*mwidth/700, pre_ypos-60*mheight/400,
                                   cx+30*mwidth/700, pre_ypos - 18*mheight/400);
                     curveVertex(cx+17*mwidth/700, pre_ypos-22*mheight/400);
                     vertex(cx+14*mwidth/700, pre_ypos-6*mheight/400);
                      endShape();
                               strokeWeight(mwidth/150);
                               point(cx+17*mwidth/700, pre_ypos+2*mheight/400);
                       }
          break;
          case 18:
          case 8:
          if (yi<=7){
            noFill();
                      beginShape();
                      vertex(cx-10*mwidth/700, pre_ypos);
                      vertex(cx-10*mwidth/700, pre_ypos);
                      vertex(cx-10*mwidth/700, pre_ypos+120*mheight/400);
                      curveVertex(cx-6*mwidth/700, pre_ypos+100*mheight/400);
                      bezierVertex(cx + 10*mwidth/700, pre_ypos +70*mheight/400,
                        cx-6*mwidth/700, pre_ypos+80*mheight/400,
                        cx+5*mwidth/700, pre_ypos+53*mheight/400);
                      curveVertex(cx+3*mwidth/700, pre_ypos+40*mheight/400);
                       vertex(cx+3*mwidth/700, pre_ypos+40*mheight/400);
                      endShape();
                      beginShape();
                        vertex(cx-10*mwidth/700, pre_ypos+90*mheight/400);
                        vertex(cx-10*mwidth/700, pre_ypos+90*mheight/400);
                        bezierVertex(cx + 10*mwidth/700, pre_ypos +40*mheight/400,
                          cx-6*mwidth/700, pre_ypos+80*mheight/400,
                          cx+5*mwidth/700, pre_ypos+53*mheight/400);
                          curveVertex(cx+7*mwidth/700, pre_ypos+11*mheight/400);
                          vertex(cx+3*mwidth/700, pre_ypos+2*mheight/400);
                      endShape();


                       }else{
                         noFill();
                      beginShape();
                      vertex(cx+10*mwidth/700, pre_ypos);
                      vertex(cx+10*mwidth/700, pre_ypos);
                      vertex(cx+10*mwidth/700, pre_ypos-110*mheight/400);
                      curveVertex(cx+14*mwidth/700, pre_ypos-105*mheight/400);
                       bezierVertex(cx+ 28*mwidth/700, pre_ypos-105*mheight/400,
                                    cx+14*mwidth/700, pre_ypos-105*mheight/400,
                                    cx+30*mwidth/700, pre_ypos - 18*mheight/400);
                      curveVertex(cx+17*mwidth/700, pre_ypos-52*mheight/400);
                      vertex(cx+14*mwidth/700, pre_ypos-6*mheight/400);
                      endShape();
                      beginShape();
                      vertex(cx+10*mwidth/700, pre_ypos-90*mheight/400);
                      vertex(cx+10*mwidth/700, pre_ypos-90*mheight/400);
                      curveVertex(cx+12*mwidth/700, pre_ypos-85*mheight/400)
                      bezierVertex(cx+ 28*mwidth/700, pre_ypos-70*mheight/400,
                                   cx+14*mwidth/700, pre_ypos-60*mheight/400,
                                   cx+30*mwidth/700, pre_ypos - 18*mheight/400);
                     curveVertex(cx+17*mwidth/700, pre_ypos-22*mheight/400);
                     vertex(cx+14*mwidth/700, pre_ypos-6*mheight/400);
                      endShape();

                       }
          break;
      }
  }else{
    var pre_ypos =ypos+2.5*(mheight/12);

    switch(bt){
      case 0:
        drawWhole(cx - mwidth/34, ypos+3*(mheight/12), mwidth/17, y_indexs[11]*(mheight/12), 140);
      break;
      case 1:
        drawDHalf(cx - mwidth/34, pre_ypos, mwidth/17, y_indexs[11]*(mheight/12), 140);
      break;
      case 2:
      case 12:
        drawHalf(cx - mwidth/34, pre_ypos, mwidth/17, y_indexs[11]*(mheight/12), 140);
      break;
      case 3:
        drawDQut(cx- mwidth/34, pre_ypos, mwidth/17, y_indexs[11]*(mheight/12), 140);
      break;
      case 4:
      case 14:
        drawQut(cx- mwidth/34, pre_ypos, mwidth/17, y_indexs[11]*(mheight/12), 140);
      break;
      case 5:
        darwDEighth(cx, ypos+6.5*(mheight/12), mwidth/34, 2*(mheight/12), 140);
      break;
      case 6:
      case 16:
        darwEighth(cx, ypos+6.5*(mheight/12), mwidth/34, 2*(mheight/12), 140);
      break;
      case 7:
        darwDSixteenth(cx, ypos+5.5*(mheight/12), mwidth/34, 2*(mheight/12), 140);
      break;
      case 8:
      case 18:
        darwSixteenth(cx, ypos+5.5*(mheight/12), mwidth/34, 2*(mheight/12), 140);
      break;
    }
  }

}
function drawWhole(cx, cy, w, h, c){
  strokeWeight(mwidth/450);
  rectMode(RADIUS);
  fill(c);
  noStroke();
  rect(cx+(w)/2, cy+h/2, (w)/5, h/24);
  stroke(c);
  line(cx+(w)/10, cy+h/2-h/24, cx+9*(w)/10, cy+h/2-h/24);
}
function drawDHalf(cx, cy, w, h, c) {
  strokeWeight(mwidth/450);
  rectMode(RADIUS);
  fill(c);
  noStroke();
  rect(cx+(w)/2, cy+h/2, (w)/5, h/24);
  stroke(c);
  line(cx+(w)/10, cy+h/2+h/24, cx+9*(w)/10, cy+h/2+h/24);
  strokeWeight(mwidth/150);
  point(cx+(w)/2+22*mwidth/700, cy+h/2);
}
function drawHalf(cx, cy, w, h, c) {
  strokeWeight(mwidth/450);
  rectMode(RADIUS);
  fill(c);
  noStroke();
  rect(cx+(w)/2, cy+h/2, (w)/5, h/24);
  stroke(c);
  line(cx+(w)/10, cy+h/2+h/24, cx+9*(w)/10, cy+h/2+h/24);
}
function drawDQut(cx, cy, w, h, c) {
  strokeWeight(mwidth/450);
  fill(c);
  stroke(c);
  beginShape();
  vertex(cx+w/2,
         cy + 6*h/24);
         vertex(cx+3*(w)/4,
                cy+19*h/48);
         vertex(cx+8*(w)/12,
                cy+26*h/48);
         vertex(cx+3*(w)/4,
                cy+15*h/24);
         vertex(cx+(w)/2,
                cy + 23*h/48);
         vertex(cx+9*(w)/16, cy + 16*h/48);
         vertex(cx+(w)/2,
                cy + 6*h/24);
         endShape();
         beginShape();
         vertex(cx+3*(w)/4,
                cy+15*h/24);
         bezierVertex(cx+4*(w)/8,
                cy+13*h/24,
                cx+(w)/4,
                cy+15*h/24,
                cx+5*(w)/8,
                cy+18*h/24);
                bezierVertex(
                  cx+7*(w)/16,
                  cy+15*h/24,
                  cx+11*(w)/16,
                  cy+14*h/24,
                  cx+3*(w)/4,
                  cy+15*h/24);
         endShape();
         strokeWeight(mwidth/150);
         point(cx+(w)/2+22*mwidth/700, cy+h/2);
}
function drawQut(cx, cy, w, h, c){
  strokeWeight(mwidth/450);
  fill(c);
  stroke(c);
  beginShape();
  vertex(cx+w/2,
         cy + 6*h/24);
         vertex(cx+3*(w)/4,
                cy+19*h/48);
         vertex(cx+8*(w)/12,
                cy+26*h/48);
         vertex(cx+3*(w)/4,
                cy+15*h/24);
         vertex(cx+(w)/2,
                cy + 23*h/48);
         vertex(cx+9*(w)/16, cy + 16*h/48);
         vertex(cx+(w)/2,
                cy + 6*h/24);
         endShape();
         beginShape();
         vertex(cx+3*(w)/4,
                cy+15*h/24);
         bezierVertex(cx+4*(w)/8,
                cy+13*h/24,
                cx+(w)/4,
                cy+15*h/24,
                cx+5*(w)/8,
                cy+18*h/24);
                bezierVertex(
                  cx+7*(w)/16,
                  cy+15*h/24,
                  cx+11*(w)/16,
                  cy+14*h/24,
                  cx+3*(w)/4,
                  cy+15*h/24);
         endShape();
}
function darwDEighth(cx, cy, w, h, c){
  strokeWeight(mwidth/450);
  fill(c);
  noStroke();
  ellipse(cx, cy, w/2, w/2);
  noFill();
  stroke(c);
  beginShape();
    vertex(cx, cy);
    bezierVertex(cx + w/4, cy + h/8,
                 cx + 3*w/4, cy + h/8,
                 cx + w, cy-h/16);
    vertex(cx + w/8, cy +h);
  endShape();
  strokeWeight(mwidth/150);
  point(cx+w/2+23*mwidth/700, cy);
}
function darwEighth(cx, cy, w, h, c){
  strokeWeight(mwidth/450);
  fill(c);
  noStroke();
  ellipse(cx, cy, w/2, w/2);
  noFill();
  stroke(c);
  beginShape();
    vertex(cx, cy);
    bezierVertex(cx + w/4, cy + h/8,
                 cx + 3*w/4, cy + h/8,
                 cx + w, cy-h/16);
    vertex(cx + w/8, cy +h);
  endShape();
}
function darwDSixteenth(cx, cy, w, h, c){
  strokeWeight(mwidth/450);
  fill(c);
  noStroke();
  ellipse(cx, cy, w/2, w/2);
  ellipse(cx - w/16, cy+h/2, w/2, w/2);
  noFill();
  stroke(c);
  beginShape();
    vertex(cx, cy);
    bezierVertex(cx + w/4, cy + h/8,
                 cx + 3*w/4, cy + h/8,
                 cx + w, cy-h/16);
    vertex(cx + w/4, cy +h);
  endShape();


  beginShape();
    vertex(cx - w/16, cy+h/2);
    bezierVertex(cx + 3*w/16, cy+h/2 + h/8,
                 cx + 11*w/16, cy+h/2 + h/8,
                 cx + 10*w/16, cy+7*h/16);
  endShape();
  strokeWeight(mwidth/150);
  point(cx+w/2+23*mwidth/700, cy);
}
function darwSixteenth(cx, cy, w, h, c){
  strokeWeight(mwidth/450);
  fill(c);
  noStroke();
  ellipse(cx, cy, w/2, w/2);
  ellipse(cx - w/16, cy+h/2, w/2, w/2);
  noFill();
  stroke(c);
  beginShape();
    vertex(cx, cy);
    bezierVertex(cx + w/4, cy + h/8,
                 cx + 3*w/4, cy + h/8,
                 cx + w, cy-h/16);
    vertex(cx + w/4, cy +h);
  endShape();


  beginShape();
    vertex(cx - w/16, cy+h/2);
    bezierVertex(cx + 3*w/16, cy+h/2 + h/8,
                 cx + 11*w/16, cy+h/2 + h/8,
                 cx + 10*w/16, cy+7*h/16);
  endShape();
}

function drawtwoconnected(i){
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y];
  var s = up_down_decider(arry);

  if(s == "down"){
    noFill();
    stroke(40);
    strokeWeight(mwidth/400);
    line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
    line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos + lineLength);
    line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
    if(n[i].bt == 8){
      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength*.8);
    }
    for(let t = 0; t < arry.length; t++){
      n[i+t].direction = "down";
    }
  }else{
    noFill();
    stroke(40);
    strokeWeight(mwidth/400);
    line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
    line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos - lineLength);
    line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
    if(n[i].bt == 8){
      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength*.8);
    }
    for(let t = 0; t < arry.length; t++){
      n[i+t].direction = "up";
    }
  }
}
function drawFourConnected(i){
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y,n[i+2].y,n[i+3].y];
  var s = up_down_decider(arry);
  var ra = most_radical(arry);
  if(n[i].r=="false"&&n[i+1].r=="false"&&n[i+2].r=="false"&&n[i+3].r=="false"){
    if(steep_steady(arry) == 1){ // steep
      if(s == 'down'){
        var x = n[i].x + xpos_moving_val - lineStart;
        var y = n[i].pre_ypos + lineLength;
        var x1  = n[i+3].x + xpos_moving_val - lineStart;
        var y1  = n[i+3].pre_ypos + lineLength;
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
        line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos + lineLength);
        line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
        if(n[i].bt==8){
          line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength*.8);
        }

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));
          line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart,
            slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val - lineStart));
            for(let t = 0; t < arry.length; t++){
              n[i+t].direction = "down";
            }
      }else{
        var x = n[i].x + xpos_moving_val + lineStart;
        var y = n[i].pre_ypos - lineLength;
        var x1  = n[i+3].x + xpos_moving_val + lineStart;
        var y1  = n[i+3].pre_ypos - lineLength;
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
        line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos - lineLength);
        line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
        if(n[i].bt==8){
          line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength*.8);
        }

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val + lineStart));
          line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,
            slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val + lineStart));
            for(let t = 0; t < arry.length; t++){
              n[i+t].direction = "up";
            }
      }
    }else{ //steady
      if(s == 'down'){
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        if(n[i].bt==8){
          line(n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);
        }

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
          line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "down";
          }
      }else{
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+3].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        if(n[i].bt==8){
          line(n[i+3].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);
        }

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
          line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "up";
          }
      }
    }
  }else{
    n[i].groupHasRest = true;
    n[i+1].groupHasRest = true;
    n[i+2].groupHasRest = true;
    n[i+3].groupHasRest = true;
  }

}
function drawThreeConnected_0(i) {
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y,n[i+2].y];
  var s = up_down_decider(arry);
  var ra = most_radical(arry);

  if(n[i].r == "false"&&n[i+1].r == "false"&&n[i+2].r == "false"){
    if(steep_steady(arry) == 1){ // steep
      if(s == 'down'){
        var x = n[i].x + xpos_moving_val - lineStart;
        var y = n[i].pre_ypos + lineLength;
        var x1  = n[i+2].x + xpos_moving_val - lineStart;
        var y1  = n[i+2].pre_ypos + lineLength;
        var y2 = n[i].pre_ypos + lineLength*.8;
        var y3  = n[i+2].pre_ypos + lineLength*.8;
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);

        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength*.8, n[i+1].x + xpos_moving_val - lineStart,
          slopeCalc(x,y2,x1,y3, n[i+1].x + xpos_moving_val - lineStart));

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "down";
          }
      }else{
        var x = n[i].x + xpos_moving_val + lineStart;
        var y = n[i].pre_ypos - lineLength;
        var x1  = n[i+2].x + xpos_moving_val + lineStart;
        var y1  = n[i+2].pre_ypos - lineLength;
        var y2 = n[i].pre_ypos - lineLength*.8;
        var y3  = n[i+2].pre_ypos - lineLength*.8;
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);

        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength*.8, n[i+1].x + xpos_moving_val + lineStart,
          slopeCalc(x,y2,x1,y3, n[i+1].x + xpos_moving_val + lineStart));

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val + lineStart));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "up";
          }
      }
    }else{ //steady
      if(s == 'down'){
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "down";
        }
      }else{
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "up";
        }
      }
    }
  }else{
    n[i].groupHasRest = true;
    n[i+1].groupHasRest = true;
    n[i+2].groupHasRest = true;
  }

}
function drawThreeConnected_1(i) {
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y,n[i+2].y];
  var s = up_down_decider(arry);
  var ra = most_radical(arry);

  if(n[i].r == "false"&&n[i+1].r == "false"&&n[i+2].r == "false"){
    if(steep_steady(arry) == 1){ // steep
      if(s == 'down'){
        var x = n[i].x + xpos_moving_val - lineStart;
        var y = n[i].pre_ypos + lineLength;
        var x1  = n[i+2].x + xpos_moving_val - lineStart;
        var y1  = n[i+2].pre_ypos + lineLength;
        var y2 = n[i].pre_ypos + lineLength*.8;
        var y3  = n[i+2].pre_ypos + lineLength*.8;
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);

        //---------
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength*.8, n[i+1].x + xpos_moving_val - lineStart,
          slopeCalc(x,y2,x1,y3, n[i+1].x + xpos_moving_val - lineStart));
        //||||||||||||||||||||
        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "down";
          }
      }else{
        var x = n[i].x + xpos_moving_val + lineStart;
        var y = n[i].pre_ypos - lineLength;
        var x1  = n[i+2].x + xpos_moving_val + lineStart;
        var y1  = n[i+2].pre_ypos - lineLength;
        var y2 = n[i].pre_ypos - lineLength*.8;
        var y3  = n[i+2].pre_ypos - lineLength*.8;
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);

        line(n[i+1].x + xpos_moving_val + lineStart, slopeCalc(x,y2,x1,y3, n[i+1].x + xpos_moving_val + lineStart), n[i+2].x + xpos_moving_val + lineStart,
          slopeCalc(x,y2,x1,y3, n[i+2].x + xpos_moving_val + lineStart));

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val + lineStart));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "up";
          }
      }
    }else{ //steady
      if(s == 'down'){
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "down";
        }
      }else{
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "up";
        }
      }
    }
  }else{
    n[i].groupHasRest = true;
    n[i+1].groupHasRest = true;
    n[i+2].groupHasRest = true;
  }

}
function drawThreeConnected_2(i) {
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y,n[i+2].y];
  var s = up_down_decider(arry);
  var ra = most_radical(arry);

  if(n[i].r == "false"&&n[i+1].r == "false"&&n[i+2].r == "false"){
    if(steep_steady(arry) == 1){ // steep
      if(s == 'down'){
        var x = n[i].x + xpos_moving_val - lineStart;
        var y = n[i].pre_ypos + lineLength;
        var x1  = n[i+2].x + xpos_moving_val - lineStart;
        var y1  = n[i+2].pre_ypos + lineLength;
        var y2 = n[i].pre_ypos + lineLength*.8;
        var y3  = n[i+2].pre_ypos + lineLength*.8;
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);

        //---------
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val + lineStart,
          slopeCalc(x,y2,x1,y3, n[i].x + xpos_moving_val + lineStart));
          line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength*.8, n[i+2].x + xpos_moving_val - lineStart*3,
            slopeCalc(x,y2,x1,y3, n[i+2].x + xpos_moving_val - lineStart*3));
        //||||||||||||||||||||
        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "down";
          }
      }else{
        var x = n[i].x + xpos_moving_val + lineStart;
        var y = n[i].pre_ypos - lineLength;
        var x1  = n[i+2].x + xpos_moving_val + lineStart;
        var y1  = n[i+2].pre_ypos - lineLength;
        var y2 = n[i].pre_ypos - lineLength*.8;
        var y3  = n[i+2].pre_ypos - lineLength*.8;
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);

        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart*3,
          slopeCalc(x,y2,x1,y3, n[i].x + xpos_moving_val + lineStart*3));
            line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength*.8, n[i+2].x + xpos_moving_val - lineStart,
              slopeCalc(x,y2,x1,y3, n[i+2].x + xpos_moving_val - lineStart));

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val + lineStart));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "up";
          }
      }
    }else{ //steady
      if(s == 'down'){
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

        line(n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i+2].x + xpos_moving_val - lineStart*3, n[i+ra[1]].pre_ypos + lineLength*.8);

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "down";
        }
      }else{
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);

        line(n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart*3, n[i+ra[0]].pre_ypos - lineLength*.8);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "up";
        }
      }
    }
  }else{
    n[i].groupHasRest = true;
    n[i+1].groupHasRest = true;
    n[i+2].groupHasRest = true;
  }


}
function drawTwoComConnected_0(i) {
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y];
  var s = up_down_decider(arry);

  if(n[i].r == "false"&&n[i+1].r == "false"){
    if(s == "down"){
      var x = n[i].x + xpos_moving_val - lineStart;
      var y = n[i].pre_ypos + lineLength*.8;
      var x1  = n[i+1].x + xpos_moving_val - lineStart;
      var y1  = n[i+1].pre_ypos + lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos + lineLength);
      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos + lineLength*.8, n[i+1].x + xpos_moving_val - lineStart*3,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart*3));

          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "down";
          }
    }else{
      var x = n[i].x + xpos_moving_val + lineStart;
      var y = n[i].pre_ypos - lineLength*.8;
      var x1  = n[i+1].x + xpos_moving_val + lineStart;
      var y1  = n[i+1].pre_ypos - lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos - lineLength);
      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos - lineLength*.8, n[i+1].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));

          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "up";
          }
    }
  }else{
    n[i].groupHasRest = true;
    n[i+1].groupHasRest = true;
  }


}
function drawTwoComConnected_1(i) {
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y];
  var s = up_down_decider(arry);

  if(n[i].r == "false"&&n[i+1].r == "false"){
    if(s == "down"){
      var x = n[i].x + xpos_moving_val - lineStart;
      var y = n[i].pre_ypos + lineLength*.8;
      var x1  = n[i+1].x + xpos_moving_val - lineStart;
      var y1  = n[i+1].pre_ypos + lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos + lineLength);
      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);

        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i].x + xpos_moving_val + lineStart));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "down";
          }
    }else{
      var x = n[i].x + xpos_moving_val + lineStart;
      var y = n[i].pre_ypos - lineLength*.8;
      var x1  = n[i+1].x + xpos_moving_val + lineStart;
      var y1  = n[i+1].pre_ypos - lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos - lineLength);
      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);

        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart*3,
          slopeCalc(x,y,x1,y1, n[i].x + xpos_moving_val + lineStart*3));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "up";
          }
    }
  }else{
    n[i].groupHasRest = true;
    n[i+1].groupHasRest = true;
  }


}
function drawFourComConnected_0(i){
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y,n[i+2].y,n[i+3].y];
  var restArry = [n[i].r, n[i+1].r, n[i+2].r, n[i+3].r];
  var s = up_down_decider(arry);
  var ra = most_radical(arry);
  var three_vertical=lineLength*.2;

  if(steep_steady(arry) == 1){ // steep

    if(s == 'down'){
      var x = n[i].x + xpos_moving_val - lineStart;
      var y = n[i].pre_ypos + lineLength;
      var x1  = n[i+3].x + xpos_moving_val - lineStart;
      var y1  = n[i+3].pre_ypos + lineLength;
      var y2 = n[i].pre_ypos + lineLength*.8;
      var y3  = n[i+3].pre_ypos + lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
      line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos + lineLength);
      line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);


      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart,
        slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val - lineStart));

       line(x,
            y2,
            n[i+2].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i+2].x + xpos_moving_val - lineStart));

            /////3/////
            line(x,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
              x,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            line(n[i+2].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
              n[i+2].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

            line(x,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
              n[i+1].x + xpos_moving_val - lineStart - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            line(n[i+2].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
              n[i+1].x + xpos_moving_val - lineStart + lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            textAlign(CENTER,CENTER);
            textSize(three_vertical);
            strokeWeight(mwidth/800);
            text("3",n[i+1].x-lineStart+xpos_moving_val, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            strokeWeight(mwidth/400);
            for(let t = 0; t < arry.length; t++){
              n[i+t].direction = "down";
            }
    }else{

      var x = n[i].x + xpos_moving_val + lineStart;
      var y = n[i].pre_ypos - lineLength;
      var x1  = n[i+3].x + xpos_moving_val + lineStart;
      var y1  = n[i+3].pre_ypos - lineLength;
      var y2  = n[i].pre_ypos - lineLength*.8;
      var y3  = n[i+3].pre_ypos - lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
      line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos - lineLength);
      line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);


      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,
        slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val + lineStart));
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val + lineStart));

          line(x,
               y2,
               n[i+2].x + xpos_moving_val + lineStart,
               slopeCalc(x,y2,x1,y3, n[i+2].x + xpos_moving_val + lineStart));
               /////////////////////3//////////////////////////
               line(n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                 n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
               line(n[i+2].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                 n[i+2].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

               line(n[i].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                 n[i+1].x + xpos_moving_val + lineStart - lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
               line(n[i+2].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                 n[i+1].x + xpos_moving_val + lineStart + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

               textAlign(CENTER,CENTER);
               textSize(three_vertical);
               strokeWeight(mwidth/800);
               text("3",n[i+1].x+lineStart+xpos_moving_val, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
               strokeWeight(mwidth/400);
               for(let t = 0; t < arry.length; t++){
                 n[i+t].direction = "up";
               }
    }
  }else{ //steady
    if(s == 'down'){

      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
      line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
      line(n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

        line(n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);

        /////////////////////3//////////////////////////
        line(n[i].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
          n[i].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(n[i+2].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
          n[i+2].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

        line(n[i].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
          n[i+1].x + xpos_moving_val - lineStart - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(n[i+2].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
          n[i+1].x + xpos_moving_val - lineStart + lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",n[i+1].x-lineStart+xpos_moving_val, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        strokeWeight(mwidth/400);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "down";
        }
    }else{
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
      line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
      line(n[i+3].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);

      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);

        line(n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);

        /////////////////////3//////////////////////////
        line(n[i].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
          n[i].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(n[i+2].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
          n[i+2].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        line(n[i].x + xpos_moving_val + lineStart,

          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
          n[i+1].x + xpos_moving_val + lineStart - lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(n[i+2].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
          n[i+1].x + xpos_moving_val + lineStart + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",n[i+1].x+lineStart+xpos_moving_val, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        strokeWeight(mwidth/400);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "up";
        }
    }
  }
}
function drawFourComConnected_1(i){
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y,n[i+2].y,n[i+3].y];
  var s = up_down_decider(arry);
  var ra = most_radical(arry);
  var three_vertical=lineLength*.2;

  if(steep_steady(arry) == 1){ // steep
    if(s == 'down'){
      var x = n[i].x + xpos_moving_val - lineStart;
      var y = n[i].pre_ypos + lineLength;
      var x1  = n[i+3].x + xpos_moving_val - lineStart;
      var y1  = n[i+3].pre_ypos + lineLength;
      var y2 = n[i].pre_ypos + lineLength*.8;
      var y3  = n[i+3].pre_ypos + lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
      line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos + lineLength);
      line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);


      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart,
        slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val - lineStart));

       line(n[i+1].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i+1].x + xpos_moving_val - lineStart),
            n[i+3].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i+3].x + xpos_moving_val - lineStart));

            /////3/////
            line(n[i+1].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
              n[i+1].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            line(n[i+3].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
              n[i+3].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

            line(n[i+1].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
              n[i+2].x + xpos_moving_val - lineStart - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            line(n[i+3].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
              n[i+2].x + xpos_moving_val - lineStart + lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            textAlign(CENTER,CENTER);
            textSize(three_vertical);
            strokeWeight(mwidth/800);
            text("3",n[i+2].x-lineStart+xpos_moving_val, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            strokeWeight(mwidth/400);
            for(let t = 0; t < arry.length; t++){
              n[i+t].direction = "down";
            }
    }else{
      var x = n[i].x + xpos_moving_val + lineStart;
      var y = n[i].pre_ypos - lineLength;
      var x1  = n[i+3].x + xpos_moving_val + lineStart;
      var y1  = n[i+3].pre_ypos - lineLength;
      var y2  = n[i].pre_ypos - lineLength*.8;
      var y3  = n[i+3].pre_ypos - lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
      line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos - lineLength);
      line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);


      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,
        slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val + lineStart));
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val + lineStart));

          line(n[i+1].x + xpos_moving_val + lineStart,
               slopeCalc(x,y2,x1,y3, n[i+1].x + xpos_moving_val + lineStart),
               n[i+3].x + xpos_moving_val + lineStart,
               slopeCalc(x,y2,x1,y3, n[i+3].x + xpos_moving_val + lineStart));

               /////////////////////3//////////////////////////
               line(n[i+1].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                 n[i+1].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
               line(n[i+3].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                 n[i+3].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

               line(n[i+1].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                 n[i+2].x + xpos_moving_val + lineStart - lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
               line(n[i+3].x + xpos_moving_val + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                 n[i+2].x + xpos_moving_val + lineStart + lineStart,
                 n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

               textAlign(CENTER,CENTER);
               textSize(three_vertical);
               strokeWeight(mwidth/800);
               text("3",n[i+2].x+lineStart+xpos_moving_val, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
               strokeWeight(mwidth/400);
               for(let t = 0; t < arry.length; t++){
                 n[i+t].direction = "up";
               }
    }
  }else{ //steady
    if(s == 'down'){
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
      line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
      line(n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

        line(n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);

        /////3/////
        line(n[i+1].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
          n[i+1].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(n[i+3].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
          n[i+3].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

        line(n[i+1].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
          n[i+2].x + xpos_moving_val - lineStart - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(n[i+3].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
          n[i+2].x + xpos_moving_val - lineStart + lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",n[i+2].x-lineStart+xpos_moving_val, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        strokeWeight(mwidth/400);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "down";
        }
    }else{
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
      line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
      line(n[i+3].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);

      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);

        line(n[i+3].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i+1].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);

        /////////////////////3//////////////////////////
        line(n[i+1].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
          n[i+1].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(n[i+3].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
          n[i+3].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        line(n[i+1].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
          n[i+2].x + xpos_moving_val + lineStart - lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(n[i+3].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
          n[i+2].x + xpos_moving_val + lineStart + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",n[i+2].x+lineStart+xpos_moving_val, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        strokeWeight(mwidth/400);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "up";
        }
    }
  }
}
function drawFiveComConnected_0(i){
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y,n[i+2].y,n[i+3].y,n[i+4].y];
  var s = up_down_decider(arry);
  var ra = most_radical(arry);
  var three_vertical=lineLength*.2;

  if(steep_steady(arry) == 1){ // steep
    if(s == 'down'){
      var x = n[i].x + xpos_moving_val - lineStart;
      var y = n[i].pre_ypos + lineLength;
      var x1  = n[i+4].x + xpos_moving_val - lineStart;
      var y1  = n[i+4].pre_ypos + lineLength;
      var y2 = n[i].pre_ypos + lineLength*.8;
      var y3  = n[i+4].pre_ypos + lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
      line(n[i+4].x + xpos_moving_val - lineStart, n[i+4].pre_ypos, n[i+4].x + xpos_moving_val - lineStart, n[i+4].pre_ypos + lineLength);
      line(n[i+4].x + xpos_moving_val - lineStart, n[i+4].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);


      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart,
        slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val - lineStart));
          line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart,
            slopeCalc(x,y,x1,y1, n[i+3].x + xpos_moving_val - lineStart));

       line(n[i].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i].x + xpos_moving_val - lineStart),
            n[i+2].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i+2].x + xpos_moving_val - lineStart));
       line(n[i+3].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i+3].x + xpos_moving_val - lineStart),
            n[i+4].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i+4].x + xpos_moving_val - lineStart));

            /////3/////
            line(n[i].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
              n[i].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            line(n[i+2].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
              n[i+2].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

            line(n[i].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
              n[i+1].x + xpos_moving_val - lineStart - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            line(n[i+2].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
              n[i+1].x + xpos_moving_val - lineStart + lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            textAlign(CENTER,CENTER);
            textSize(three_vertical);
            strokeWeight(mwidth/800);
            text("3",n[i+1].x-lineStart+xpos_moving_val, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            strokeWeight(mwidth/400);
            for(let t = 0; t < arry.length; t++){
              n[i+t].direction = "down";
            }
    }else{
      var x = n[i].x + xpos_moving_val + lineStart;
      var y = n[i].pre_ypos - lineLength;
      var x1  = n[i+4].x + xpos_moving_val + lineStart;
      var y1  = n[i+4].pre_ypos - lineLength;
      var y2  = n[i].pre_ypos - lineLength*.8;
      var y3  = n[i+4].pre_ypos - lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
      line(n[i+4].x + xpos_moving_val + lineStart, n[i+4].pre_ypos, n[i+4].x + xpos_moving_val + lineStart, n[i+4].pre_ypos - lineLength);
      line(n[i+4].x + xpos_moving_val + lineStart, n[i+4].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);


      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,
        slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val + lineStart));
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val + lineStart));
          line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart,
            slopeCalc(x,y,x1,y1, n[i+3].x + xpos_moving_val + lineStart));

          line(n[i].x + xpos_moving_val + lineStart,
               slopeCalc(x,y2,x1,y3, n[i].x + xpos_moving_val + lineStart),
               n[i+2].x + xpos_moving_val + lineStart,
               slopeCalc(x,y2,x1,y3, n[i+2].x + xpos_moving_val + lineStart));
               line(n[i+3].x + xpos_moving_val + lineStart,
                    slopeCalc(x,y2,x1,y3, n[i+3].x + xpos_moving_val + lineStart),
                    n[i+4].x + xpos_moving_val + lineStart,
                    slopeCalc(x,y2,x1,y3, n[i+4].x + xpos_moving_val + lineStart));

                    /////////////////////3//////////////////////////
                    line(n[i].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                      n[i].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                    line(n[i+2].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                      n[i+2].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                    line(n[i].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                      n[i+1].x + xpos_moving_val + lineStart - lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                    line(n[i+2].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                      n[i+1].x + xpos_moving_val + lineStart + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                    textAlign(CENTER,CENTER);
                    textSize(three_vertical);
                    strokeWeight(mwidth/800);
                    text("3",n[i+1].x+lineStart+xpos_moving_val, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                    strokeWeight(mwidth/400);
                    for(let t = 0; t < arry.length; t++){
                      n[i+t].direction = "up";
                    }
    }
  }else{ //steady
    if(s == 'down'){
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
      line(n[i+4].x + xpos_moving_val - lineStart, n[i+4].pre_ypos, n[i+4].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
      line(n[i+4].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

        line(n[i+4].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);

        /////3/////
        line(n[i].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
          n[i].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(n[i+2].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
          n[i+2].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

        line(n[i].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
          n[i+1].x + xpos_moving_val - lineStart - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(n[i+2].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
          n[i+1].x + xpos_moving_val - lineStart + lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",n[i+1].x-lineStart+xpos_moving_val, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        strokeWeight(mwidth/400);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "down";
        }
    }else{
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
      line(n[i+4].x + xpos_moving_val + lineStart, n[i+4].pre_ypos, n[i+4].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
      line(n[i+4].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);

      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);

        line(n[i+4].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i+3].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);

        /////////////////////3//////////////////////////
        line(n[i].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
          n[i].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(n[i+2].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
          n[i+2].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        line(n[i].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
          n[i+1].x + xpos_moving_val + lineStart - lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(n[i+2].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
          n[i+1].x + xpos_moving_val + lineStart + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",n[i+1].x+lineStart+xpos_moving_val, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        strokeWeight(mwidth/400);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "up";
        }
    }
  }
}
function drawFiveComConnected_1(i){
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;
  var arry = [n[i].y, n[i+1].y,n[i+2].y,n[i+3].y,n[i+4].y];
  var s = up_down_decider(arry);
  var ra = most_radical(arry);
  var three_vertical=lineLength*.2;

  if(steep_steady(arry) == 1){ // steep
    if(s == 'down'){
      var x = n[i].x + xpos_moving_val - lineStart;
      var y = n[i].pre_ypos + lineLength;
      var x1  = n[i+4].x + xpos_moving_val - lineStart;
      var y1  = n[i+4].pre_ypos + lineLength;
      var y2 = n[i].pre_ypos + lineLength*.8;
      var y3  = n[i+4].pre_ypos + lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
      line(n[i+4].x + xpos_moving_val - lineStart, n[i+4].pre_ypos, n[i+4].x + xpos_moving_val - lineStart, n[i+4].pre_ypos + lineLength);
      line(n[i+4].x + xpos_moving_val - lineStart, n[i+4].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);


      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart,
        slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val - lineStart));
          line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart,
            slopeCalc(x,y,x1,y1, n[i+3].x + xpos_moving_val - lineStart));

       line(n[i].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i].x + xpos_moving_val - lineStart),
            n[i+1].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i+1].x + xpos_moving_val - lineStart));
       line(n[i+2].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i+2].x + xpos_moving_val - lineStart),
            n[i+4].x + xpos_moving_val - lineStart,
            slopeCalc(x,y2,x1,y3, n[i+4].x + xpos_moving_val - lineStart));

            /////3/////
            line(n[i+2].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
              n[i+2].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            line(n[i+4].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
              n[i+4].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

            line(n[i+2].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
              n[i+3].x + xpos_moving_val - lineStart - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            line(n[i+4].x + xpos_moving_val - lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
              n[i+3].x + xpos_moving_val - lineStart + lineStart,
              n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            textAlign(CENTER,CENTER);
            textSize(three_vertical);
            strokeWeight(mwidth/800);
            text("3",n[i+3].x-lineStart+xpos_moving_val, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            strokeWeight(mwidth/400);
            for(let t = 0; t < arry.length; t++){
              n[i+t].direction = "down";
            }
    }else{
      var x = n[i].x + xpos_moving_val + lineStart;
      var y = n[i].pre_ypos - lineLength;
      var x1  = n[i+4].x + xpos_moving_val + lineStart;
      var y1  = n[i+4].pre_ypos - lineLength;
      var y2  = n[i].pre_ypos - lineLength*.8;
      var y3  = n[i+4].pre_ypos - lineLength*.8;
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
      line(n[i+4].x + xpos_moving_val + lineStart, n[i+4].pre_ypos, n[i+4].x + xpos_moving_val + lineStart, n[i+4].pre_ypos - lineLength);
      line(n[i+4].x + xpos_moving_val + lineStart, n[i+4].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);


      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,
        slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val + lineStart));
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i+2].x + xpos_moving_val + lineStart));
          line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart,
            slopeCalc(x,y,x1,y1, n[i+3].x + xpos_moving_val + lineStart));

          line(n[i].x + xpos_moving_val + lineStart,
               slopeCalc(x,y2,x1,y3, n[i].x + xpos_moving_val + lineStart),
               n[i+1].x + xpos_moving_val + lineStart,
               slopeCalc(x,y2,x1,y3, n[i+1].x + xpos_moving_val + lineStart));
               line(n[i+2].x + xpos_moving_val + lineStart,
                    slopeCalc(x,y2,x1,y3, n[i+2].x + xpos_moving_val + lineStart),
                    n[i+4].x + xpos_moving_val + lineStart,
                    slopeCalc(x,y2,x1,y3, n[i+4].x + xpos_moving_val + lineStart));

                    /////////////////////3//////////////////////////
                    line(n[i+2].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                      n[i+2].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                    line(n[i+4].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                      n[i+4].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                    line(n[i+2].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                      n[i+3].x + xpos_moving_val + lineStart - lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                    line(n[i+4].x + xpos_moving_val + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                      n[i+3].x + xpos_moving_val + lineStart + lineStart,
                      n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                    textAlign(CENTER,CENTER);
                    textSize(three_vertical);
                    strokeWeight(mwidth/800);
                    text("3",n[i+3].x+lineStart+xpos_moving_val, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                    strokeWeight(mwidth/400);
                    for(let t = 0; t < arry.length; t++){
                      n[i+t].direction = "up";
                    }
    }
  }else{ //steady
    if(s == 'down'){
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
      line(n[i+4].x + xpos_moving_val - lineStart, n[i+4].pre_ypos, n[i+4].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
      line(n[i+4].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

      line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+3].x + xpos_moving_val - lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

        line(n[i+4].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);
        line(n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);

        /////3/////
        line(n[i+2].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
          n[i+2].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(n[i+4].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
          n[i+4].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

        line(n[i+2].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
          n[i+3].x + xpos_moving_val - lineStart - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(n[i+4].x + xpos_moving_val - lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
          n[i+3].x + xpos_moving_val - lineStart + lineStart,
          n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",n[i+3].x-lineStart+xpos_moving_val, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        strokeWeight(mwidth/400);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "down";
        }
    }else{
      noFill();
      stroke(40);
      strokeWeight(mwidth/400);
      line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
      line(n[i+4].x + xpos_moving_val + lineStart, n[i+4].pre_ypos, n[i+4].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
      line(n[i+4].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);

      line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+3].x + xpos_moving_val + lineStart, n[i+3].pre_ypos, n[i+3].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);

        line(n[i+4].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);
        line(n[i+1].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);

        /////////////////////3//////////////////////////
        line(n[i+2].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
          n[i+2].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(n[i+4].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
          n[i+4].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        line(n[i+2].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
          n[i+3].x + xpos_moving_val + lineStart - lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(n[i+4].x + xpos_moving_val + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
          n[i+3].x + xpos_moving_val + lineStart + lineStart,
          n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",n[i+3].x+lineStart+xpos_moving_val, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        strokeWeight(mwidth/400);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "up";
        }
    }
  }
}
function drawTriplet(i) {
  var lineStart = 9.8*mwidth/700;
  var lineLength = 110*mheight/400;

  var arry = [n[i].y, n[i+1].y,n[i+2].y];
  var s = up_down_decider(arry);
  var ra = most_radical(arry);
  var three_vertical=lineLength*.2;

  if(steep_steady(arry) == 1){ // steep
    if(s == 'down'){
      var x = n[i].x + xpos_moving_val - lineStart;
      var y = n[i].pre_ypos + lineLength;
      var x1  = n[i+2].x + xpos_moving_val - lineStart;
      var x2  = n[i+1].x + xpos_moving_val - lineStart;
      var y1  = n[i+2].pre_ypos + lineLength;
      var y2 = n[i].pre_ypos + lineLength*.8;
      var y3  = n[i+2].pre_ypos + lineLength*.8;

      if(n[i].r=='false'&&n[i+1].r=='false'&&n[i+2].r=='false'){
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength);

        if(n[i].bt == 18){
          line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos + lineLength*.8);
        }


        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val - lineStart));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "down";
          }
      }else{
        n[i].groupHasRest = true;
        n[i+1].groupHasRest = true;
        n[i+2].groupHasRest = true;
      }
        /////3/////
        line(x, n[i+ra[1]].pre_ypos + lineLength+lineLength*.1, x, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(x1, n[i+ra[1]].pre_ypos + lineLength+lineLength*.1, x1, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

        line(x, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2, x2 - lineStart, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        line(x1, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2, x2 + lineStart, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",x2, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
        strokeWeight(mwidth/400);

    }else{
      var x = n[i].x + xpos_moving_val + lineStart;
      var y = n[i].pre_ypos - lineLength;
      var x1  = n[i+2].x + xpos_moving_val + lineStart;
      var x2  = n[i+1].x + xpos_moving_val + lineStart;
      var y1  = n[i+2].pre_ypos - lineLength;
      var y2 = n[i].pre_ypos - lineLength*.8;
      var y3  = n[i+2].pre_ypos - lineLength*.8;

      if(n[i].r=='false'&&n[i+1].r=='false'&&n[i+2].r=='false'){
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength);

        if(n[i].bt==18){
          line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos - lineLength*.8);
        }

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,
          slopeCalc(x,y,x1,y1, n[i+1].x + xpos_moving_val + lineStart));
          for(let t = 0; t < arry.length; t++){
            n[i+t].direction = "up";
          }
      }else{
        n[i].groupHasRest = true;
        n[i+1].groupHasRest = true;
        n[i+2].groupHasRest = true;
      }

        /////////////////////3//////////////////////////
        line(x, n[i+ra[0]].pre_ypos - lineLength-lineLength*.1, x, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(x1, n[i+ra[0]].pre_ypos - lineLength-lineLength*.1, x1, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        line(x, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2, x2 - lineStart, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        line(x1, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2, x2 + lineStart, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

        textAlign(CENTER,CENTER);
        textSize(three_vertical);
        strokeWeight(mwidth/800);
        text("3",x2, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
        strokeWeight(mwidth/400);

    }
  }else{ //steady
    if(s == 'down'){

      if(n[i].r=='false'&&n[i+1].r=='false'&&n[i+2].r=='false'){
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val - lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        line(n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);

        if(n[i].bt==18){
          line(n[i+2].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8, n[i].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength*.8);
        }

        line(n[i+1].x + xpos_moving_val - lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val - lineStart, n[i+ra[1]].pre_ypos + lineLength);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "down";
        }
      }else{
        n[i].groupHasRest = true;
        n[i+1].groupHasRest = true;
        n[i+2].groupHasRest = true;
      }


      line(n[i].x + xpos_moving_val - lineStart,
           n[i+ra[1]].pre_ypos + lineLength + lineLength*.1,
           n[i].x + xpos_moving_val - lineStart,
           n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);
           line(n[i].x + xpos_moving_val - lineStart,
                n[i+ra[1]].pre_ypos + lineLength + lineLength*.2,
                n[i+1].x + xpos_moving_val - lineStart - three_vertical,
                n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);
           line(n[i+2].x + xpos_moving_val - lineStart,
                n[i+ra[1]].pre_ypos + lineLength + lineLength*.2,
                n[i+1].x + xpos_moving_val - lineStart + three_vertical,
                n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);
      line(n[i+2].x + xpos_moving_val - lineStart,
            n[i+ra[1]].pre_ypos + lineLength + lineLength*.1,
            n[i+2].x + xpos_moving_val - lineStart,
            n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);

            textAlign(CENTER,CENTER);
            textSize(three_vertical);
            strokeWeight(mwidth/800);
            text("3",x2, n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
            strokeWeight(mwidth/400);

    }else{

      if(n[i].r=='false'&&n[i+1].r=='false'&&n[i+2].r=='false'){
        noFill();
        stroke(40);
        strokeWeight(mwidth/400);
        line(n[i].x + xpos_moving_val + lineStart, n[i].pre_ypos, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+2].pre_ypos, n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);
        line(n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength);

        if(n[i].bt==18){
          line(n[i+2].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8, n[i].x + xpos_moving_val + lineStart, n[i+ra[0]].pre_ypos - lineLength*.8);
        }

        line(n[i+1].x + xpos_moving_val + lineStart, n[i+1].pre_ypos, n[i+1].x + xpos_moving_val + lineStart,n[i+ra[0]].pre_ypos - lineLength);
        for(let t = 0; t < arry.length; t++){
          n[i+t].direction = "up";
        }
      }else{
        n[i].groupHasRest = true;
        n[i+1].groupHasRest = true;
        n[i+2].groupHasRest = true;
      }


      line(n[i].x + xpos_moving_val + lineStart,
           n[i+ra[0]].pre_ypos - lineLength - lineLength*.1,
           n[i].x + xpos_moving_val + lineStart,
           n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);
           line(n[i].x + xpos_moving_val + lineStart,
                n[i+ra[0]].pre_ypos - lineLength - lineLength*.2,
                n[i+1].x + xpos_moving_val + lineStart - three_vertical,
                n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);
           line(n[i+2].x + xpos_moving_val + lineStart,
                n[i+ra[0]].pre_ypos - lineLength - lineLength*.2,
                n[i+1].x + xpos_moving_val + lineStart + three_vertical,
                n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);
      line(n[i+2].x + xpos_moving_val + lineStart,
            n[i+ra[0]].pre_ypos - lineLength - lineLength*.1,
            n[i+2].x + xpos_moving_val + lineStart,
            n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);

            textAlign(CENTER,CENTER);
            textSize(three_vertical);
            strokeWeight(mwidth/800);
            text("3",x2, n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
            strokeWeight(mwidth/400);

    }
  }
}
function slopeCalc(x, y, x1, y1, x2) {
  var slope = (y-y1) / (x - x1);
  var b = y1 - slope * x1;
  return x2 * slope + b;
}
function most_radical(ys) {
  var b;
  var s;
  var standard = ys[0];
  for(let i = 0; i< ys.length; i++){
    if(ys[i] <= standard){
      standard = ys[i];
      s=i;
    }
  }

  for(let i = 0; i< ys.length; i++){
    if(ys[i] >= standard){
      standard = ys[i];
      b=i;
    }
  }
  var ra = [s,b]
  return ra;
}

function farLeft(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == "false"){
      return i;
    }
  }
}
function farRight(arr) {
  for (var i = arr.length-1; i >= 0 ; i--) {
    if (arr[i] == "false"){
      return i;
    }
  }
}
function steep_steady(ys) {
  for(var i =0; i < ys.length-1; i++){
    if(abs(ys[i] - ys[i+1]) > 4){
      return 0; // steady
    }
  }
  return 1; //steep
}
function up_down_decider(ys){
  var yn = ys.length;
  var sum = 0;
  for(var i = 0; i < yn; i++){
    sum +=ys[i];
  }
  var avg = sum / yn;
  if(avg<8){
    return "down";
  }else{
    return "up";
  }
}

function tie_xy(x, y, x1, y1, optional_inverse, thickness){
  var xy = [];
  var slope2 = (y-y1) / (x-x1) ;
  var inverse = -1;
 xy[0] = ((x+x1)/2)+thickness * optional_inverse*cos(atan(inverse/slope2));
 xy[1] = ((y+y1)/2)+thickness * optional_inverse*sin(atan(inverse/slope2));
  return xy;
 }

function drawTie(i){
   var h = 33*mheight/400;
   var ot = mwidth/100;
   var it = mwidth/160;
   if(n[i].direction == "down" && n[i-1].direction == "down"){
     var x = n[i].x+xpos_moving_val;
     var y = n[i].pre_ypos -h;
     var x1 = n[i-1].x+xpos_moving_val;
     var y1 = n[i-1].pre_ypos -h;
     if(n[i].y >= n[i-1].y){
       beginShape();
       fill(20);
       noStroke();
       vertex(x ,y);
       bezierVertex(tie_xy(x,y,x1,y1,1,
         ot)[0],
         tie_xy(x,y,x1,y1,1,
           ot)[1],
       tie_xy(x,y,x1,y1,1,
         ot)[0],
         tie_xy(x,y,x1,y1,1,
           ot)[1],
         x1 ,y1 );
       bezierVertex(tie_xy(x,y,x1,y1,1,
       it)[0],
       tie_xy(x,y,x1,y1,1,
       it)[1],
       tie_xy(x,y,x1,y1,1,
       it)[0],
       tie_xy(x,y,x1,y1,1,
       it)[1],
         x ,y );
       endShape();
     }else{
       beginShape();
       fill(20);
       noStroke();
       vertex(x ,y);
       bezierVertex(tie_xy(x,y,x1,y1,-1,
         ot)[0],
         tie_xy(x,y,x1,y1,-1,
           ot)[1],
       tie_xy(x,y,x1,y1,-1,
         ot)[0],
         tie_xy(x,y,x1,y1,-1,
           ot)[1],
         x1 ,y1 );
       bezierVertex(tie_xy(x,y,x1,y1,-1,
       it)[0],
       tie_xy(x,y,x1,y1,-1,
       it)[1],
       tie_xy(x,y,x1,y1,-1,
       it)[0],
       tie_xy(x,y,x1,y1,-1,
       it)[1],
         x ,y );
       endShape();
     }
   }else if(n[i].direction == "up" && n[i-1].direction == "up"){
     var x = n[i].x+xpos_moving_val;
     var y = n[i].pre_ypos +h;
     var x1 = n[i-1].x+xpos_moving_val;
     var y1 = n[i-1].pre_ypos +h;
     if(n[i].y >= n[i-1].y){
       beginShape();
       fill(20);
       noStroke();
       vertex(x ,y);
       bezierVertex(tie_xy(x,y,x1,y1,-1,
         ot)[0],
         tie_xy(x,y,x1,y1,-1,
           ot)[1],
       tie_xy(x,y,x1,y1,-1,
         ot)[0],
         tie_xy(x,y,x1,y1,-1,
           ot)[1],
         x1 ,y1 );
       bezierVertex(tie_xy(x,y,x1,y1,-1,
       it)[0],
       tie_xy(x,y,x1,y1,-1,
       it)[1],
       tie_xy(x,y,x1,y1,-1,
       it)[0],
       tie_xy(x,y,x1,y1,-1,
       it)[1],
         x ,y );
       endShape();
     }else{
       beginShape();
       fill(20);
       noStroke();
       vertex(x ,y);
       bezierVertex(tie_xy(x,y,x1,y1,1,
         ot)[0],
         tie_xy(x,y,x1,y1,1,
           ot)[1],
       tie_xy(x,y,x1,y1,1,
         ot)[0],
         tie_xy(x,y,x1,y1,1,
           ot)[1],
         x1 ,y1 );
       bezierVertex(tie_xy(x,y,x1,y1,1,
       it)[0],
       tie_xy(x,y,x1,y1,1,
       it)[1],
       tie_xy(x,y,x1,y1,1,
       it)[0],
       tie_xy(x,y,x1,y1,1,
       it)[1],
         x ,y );
       endShape();
     }
   }else if(n[i].direction != n[i-1].direction){
     var arry = [n[i].y, n[i-1].y];
     var s = up_down_decider(arry);
     if(s == "down"){
       var x = n[i].x+xpos_moving_val;
       var y = n[i].pre_ypos -h;
       var x1 = n[i-1].x+xpos_moving_val;
       var y1 = n[i-1].pre_ypos -h;
       if(n[i].y >= n[i-1].y){
         beginShape();
         fill(20);
         noStroke();
         vertex(x ,y);
         bezierVertex(tie_xy(x,y,x1,y1,1,
           ot)[0],
           tie_xy(x,y,x1,y1,1,
             ot)[1],
         tie_xy(x,y,x1,y1,1,
           ot)[0],
           tie_xy(x,y,x1,y1,1,
             ot)[1],
           x1 ,y1 );
         bezierVertex(tie_xy(x,y,x1,y1,1,
         it)[0],
         tie_xy(x,y,x1,y1,1,
         it)[1],
         tie_xy(x,y,x1,y1,1,
         it)[0],
         tie_xy(x,y,x1,y1,1,
         it)[1],
           x ,y );
         endShape();
       }else{
         beginShape();
         fill(20);
         noStroke();
         vertex(x ,y);
         bezierVertex(tie_xy(x,y,x1,y1,-1,
           ot)[0],
           tie_xy(x,y,x1,y1,-1,
             ot)[1],
         tie_xy(x,y,x1,y1,-1,
           ot)[0],
           tie_xy(x,y,x1,y1,-1,
             ot)[1],
           x1 ,y1 );
         bezierVertex(tie_xy(x,y,x1,y1,-1,
         it)[0],
         tie_xy(x,y,x1,y1,-1,
         it)[1],
         tie_xy(x,y,x1,y1,-1,
         it)[0],
         tie_xy(x,y,x1,y1,-1,
         it)[1],
           x ,y );
         endShape();
       }
     }else if( s== "up"){
       var x = n[i].x+xpos_moving_val;
       var y = n[i].pre_ypos +h;
       var x1 = n[i-1].x+xpos_moving_val;
       var y1 = n[i-1].pre_ypos +h;
       if(n[i].y >= n[i-1].y){
         beginShape();
         fill(20);
         noStroke();
         vertex(x ,y);
         bezierVertex(tie_xy(x,y,x1,y1,-1,
           ot)[0],
           tie_xy(x,y,x1,y1,-1,
             ot)[1],
         tie_xy(x,y,x1,y1,-1,
           ot)[0],
           tie_xy(x,y,x1,y1,-1,
             ot)[1],
           x1 ,y1 );
         bezierVertex(tie_xy(x,y,x1,y1,-1,
         it)[0],
         tie_xy(x,y,x1,y1,-1,
         it)[1],
         tie_xy(x,y,x1,y1,-1,
         it)[0],
         tie_xy(x,y,x1,y1,-1,
         it)[1],
           x ,y );
         endShape();
       }else{
         beginShape();
         fill(20);
         noStroke();
         vertex(x ,y);
         bezierVertex(tie_xy(x,y,x1,y1,1,
           ot)[0],
           tie_xy(x,y,x1,y1,1,
             ot)[1],
         tie_xy(x,y,x1,y1,1,
           ot)[0],
           tie_xy(x,y,x1,y1,1,
             ot)[1],
           x1 ,y1 );
         bezierVertex(tie_xy(x,y,x1,y1,1,
         it)[0],
         tie_xy(x,y,x1,y1,1,
         it)[1],
         tie_xy(x,y,x1,y1,1,
         it)[0],
         tie_xy(x,y,x1,y1,1,
         it)[1],
           x ,y );
         endShape();
       }
     }
   }
 }
