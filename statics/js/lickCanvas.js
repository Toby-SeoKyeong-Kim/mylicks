var contentsContainer = document.getElementsByClassName('ui-state-default');
var contentsWidth = contentsContainer[0].clientWidth;
var contentsHeight = contentsContainer[0].clientHeight;
function gogetCanvas() {
  c =[];

  for (var i = 0; i < sortedLicks.length; i++) {
    contentsWidth = contentsContainer[0].getBoundingClientRect().width;
    contentsHeight = contentsContainer[0].getBoundingClientRect().height;
    var func = function(s){
      s.music_color;
      s.music_color_op;
      s.bg;
      s.ksetting = false;
      s.theme= theme;
      switch (theme) {
        case "dark":
        s.img = s.loadImage('static/resources/trevb_w.png');
          break;
        default:
        s.img = s.loadImage('static/resources/trevb.png');
      }
      s.lick = sortedLicks[i];
      s.index = i;
      [s.all_notes_in_key_str,s.all_notes_in_key_greek] = all_note_in_Key(s.lick.key);
      s.selected = false;
      s.view =false;
      s.order_of_flat = [7, 5.5, 7.5, 6, 8, 6.5, 8.5];
      s.order_of_sharp = [5, 6.5, 4.5, 6, 4, 5.5, 3.5];
      s.y_indexs = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];
      s.k = key;
      if(s.index ==0){
        s.first = true;
      }else{
        s.first = false;
      }
      if(s.index == sortedLicks.length -1){
        s.last = true;
      }else{
        s.last =false;
      }
      if(window.innerWidth / window.innerHeight > 1.22){
        s.onebyone = false;
        s.treble_clefWidth = parseInt(contentsWidth/16);
      }else{
        s.onebyone = true;
        s.treble_clefWidth = parseInt(contentsWidth/16);
      }
      if(s.onebyone ||(parseInt(s.index) + 1) % 2 !=0 ){
        s.keysig_start_point = contentsWidth/25 + contentsWidth/22;
      }else{
        s.keysig_start_point = contentsWidth/25;
      }
      s.asig = contentsWidth/33;
      s.asigDistance = contentsWidth/95
      s.number_of_keysig = Math.abs(s.k-7);
      if(s.number_of_keysig ==0){
        s.timesig_start_point = s.keysig_start_point+s.asig/2;
      }else{
        s.timesig_start_point = s.keysig_start_point+s.number_of_keysig*s.asigDistance+s.asig;
      }

      s.availableSpace = contentsWidth - s.timesig_start_point - 2*contentsHeight/12;
      s.currently_editingX = s.currently_editingX = s.timesig_start_point + contentsHeight/6 + contentsWidth/100;
      s.currently_editing_num=0;
      s.currently_editingX_val;
      s.n=[];
      s.yi;
      s.bt;
      s.bc;
      s.pc;
      s.av;
      s.r = false;;
      s.t;
      s.reset=false;
      s.key_Changing = false;
      s.oc;
      s.start=true;
      s.literal_CtoI = literal_CtoI;
      s.interval_from_root;
      s.interval_int_str;
      this.octave_consecutive;

      s.setup = function() {
        let canvas = s.createCanvas(contentsWidth,contentsHeight);
        canvas.parent(s.lick.id + '-' + s.index);
        switch (s.theme) {
          case "dark":
          s.music_color =s.color(255);
          s.music_color_op=s.color(255,84);
          s.bg=s.color(29, 30, 48);
            break;
            case "simple":
            s.music_color =s.color(0);
            s.music_color_op=s.color(0,84);
            s.bg=s.color(248, 249, 251);
              break;
              case "pastel":
              s.music_color =s.color(0);
              s.music_color_op=s.color(0,84);
              s.bg=s.color(248, 249, 251);
                break;
        }

        if(s.lick.data !=null){
          s.rearrange();
        }
      }

      s.draw = function() {
        s.background(s.bg);
        switch (s.lick.IsSharp) {
          case "0":
            s.lick.chord_cen = s.all_notes_in_key_str[s.lick.chocen];
            break;
            case "1":
              s.lick.chord_cen = if_is_Sharp.get(s.all_notes_in_key_str[s.lick.chocen]);
              break;
              case "-1":
                s.lick.chord_cen = if_is_Flat.get(s.all_notes_in_key_str[s.lick.chocen]);
                break;
           }

           s.fill(s.music_color_op);
           s.stroke(s.music_color_op);
             if(s.selected || s.view){
             s.fill(s.music_color);
             s.stroke(s.music_color);
           }
           s.strokeCap(s.SQUARE);
           s.strokeWeight(contentsHeight/360);;
           s.textSize(contentsHeight/12);
           s.textAlign(s.LEFT,s.CENTER);
           s.text(s.index+1, 0, contentsHeight*4/12);


             s.line(0, 5*(contentsHeight/12), 0, 9*(contentsHeight/12));
             s.strokeWeight(contentsHeight*7/360);
             s.line(contentsWidth, 5*(contentsHeight/12),contentsWidth, 9*(contentsHeight/12));
             if(s.last){
               s.strokeWeight(contentsHeight*4/360);
               s.line(contentsWidth-contentsWidth/80,5*(contentsHeight/12),contentsWidth-contentsWidth/80, 9*(contentsHeight/12));
             }
             s.strokeWeight(contentsHeight/360);
             for (var i = 5; i < 10; i++) {
               s.line(0, i*(contentsHeight/12),contentsWidth,i*(contentsHeight/12));
             }
             if(s.onebyone||(parseInt(s.index) + 1) % 2 !=0 ){
               s.tint(255, 84);
               if(s.selected || s.view){
                 s.tint(255, 255);
               }
               s.image(s.img, parseInt(contentsWidth/50), parseInt(2.5*(contentsHeight/12)),
               s.treble_clefWidth, parseInt(contentsHeight/1.5));
               for(var i = 0; i < s.number_of_keysig; i++){
                 if(s.k<7){
                   s.DrawSharp(s.keysig_start_point + s.asigDistance*i,
                     s.order_of_sharp[i]*(contentsHeight/12) - contentsHeight/16,
                     s.asig,
                     contentsHeight/9);
                 }else if(s.k>7){
                   s.DrawFlat(s.keysig_start_point + s.asigDistance*i,
                     s.order_of_flat[i]*(contentsHeight/12) - contentsHeight/13,
                     s.asig,
                     contentsHeight/8);
                 }
               }

                 s.fill(s.music_color_op);
                 s.stroke(s.music_color_op);
                   if(s.selected || s.view){
                     s.fill(s.music_color);
                   s.stroke(s.music_color);
                 }
                 s.textSize(2*contentsHeight/12);
                 s.strokeWeight(contentsHeight/360);
                 s.textAlign(s.CENTER,s.CENTER);
                 s.text("4",s.timesig_start_point,6*contentsHeight/12);
                 s.text("4",s.timesig_start_point,8*contentsHeight/12);

             }



             if(s.lick.data==null){
               s.textSize(contentsHeight/6);
               s.textAlign(s.CENTER,s.CENTER);
               s.text("Empty", contentsWidth/2, contentsHeight/2);
             }else{
               s.strokeWeight(contentsHeight/360);;
               s.textSize(contentsHeight/10);

               if(s.onebyone ||(parseInt(s.index) + 1) % 2 !=0 ){
                 s.textAlign(s.RIGHT,s.CENTER);
                 s.text(s.lick.chord_cen + s.lick.chochar,
                   s.keysig_start_point,
                   contentsHeight/12);
               }else{
                 s.textAlign(s.LEFT,s.CENTER);
                 s.text(s.lick.chord_cen + s.lick.chochar,
                   0,
                   contentsHeight/12);
               }


               for (var i = 0; i < s.n.length; i++) {
                 drawNotes(s, s.n[i]);
                 if(s.n[i].tie =="true"){
                   drawTie(s, i);
                 }
               }
               s.drawGrouping();
               s.octave_consecutive = 0;
               s.textAlign(s.CENTER,s.CENTER);
               s.textSize(contentsHeight/12);
               s.strokeWeight(contentsHeight/726);;
               s.fill(s.music_color_op);
               s.stroke(s.music_color_op);
                 if(s.selected || s.view){
                   s.fill(s.music_color);
                 s.stroke(s.music_color);
               }
               var octave_height = contentsHeight/12;
               for(var i = 0; i < s.n.length; i++){
                 if(i ==0){ //if it is the first note
                   s.strokeWeight(contentsHeight/360);;
                   switch (s.n[i].octave_control) {
                     case -2:
                       s.text("16vb", s.n[i].x , octave_height);
                       s.n[i].octave_consecutive = s.octave_consecutive;
                     break;
                     case -1:
                       s.text("8vb", s.n[i].x , octave_height);
                       s.n[i].octave_consecutive = s.octave_consecutive;
                     break;
                     case 1:
                       s.text("8va", s.n[i].x , octave_height);
                       s.n[i].octave_consecutive = s.octave_consecutive;
                     break;
                     case 2:
                       s.text("16va", s.n[i].x , octave_height);
                       s.n[i].octave_consecutive = s.octave_consecutive;
                     break;
                   }
                 }else if(i == s.n.length-1){//if it is the last note and matters
                   s.strokeWeight(contentsHeight/360);;
                   if(s.n[i].octave_control != s.n[i-1].octave_control){
                     s.octave_consecutive = 0;
                     s.n[i].octave_consecutive = s.octave_consecutive;
                     switch (s.n[i].octave_control) {
                       case -2:
                         s.text("16vb", s.n[i].x , octave_height);
                       break;
                       case -1:
                         s.text("8vb", s.n[i].x , octave_height);
                       break;
                       case 1:
                         s.text("8va", s.n[i].x , octave_height);
                       break;
                       case 2:
                         s.text("16va", s.n[i].x , octave_height);
                       break;
                     }
                     switch (s.n[i-1].octave_control) {
                       case -2:
                         s.text("16vb", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                         if(s.n[i-1].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i-1].x , octave_height,
                           s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("16va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i-1].x , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                       case -1:
                         s.text("8vb", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                         if(s.n[i-1].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i-1].x , octave_height,
                           s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("8va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i-1].x , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                       case 1:
                         s.text("8va", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                         if(s.n[i-1].s.octave_consecutive != 0){
                           s.drawDottedLine(s.n[i-1].x , octave_height,
                           s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("8va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i-1].x , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                       case 2:
                         s.text("16va", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                         if(s.n[i-1].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i-1].x , octave_height,
                           s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("16va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i-1].x , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                     }
                   }else{
                     s.strokeWeight(contentsHeight/726);;
                     s.octave_consecutive+=1;
                     s.n[i].octave_consecutive = s.octave_consecutive;
                     switch (s.n[i].octave_control) {
                       case -2:
                         s.text("16vb", s.n[i-s.n[i].octave_consecutive].x , octave_height);
                         if(s.n[i].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i].x , octave_height,
                           s.n[i-s.n[i].octave_consecutive].x+s.textWidth("16va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i].x , octave_height,
                               s.n[i].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i].x+contentsHeight/12 , octave_height,
                               s.n[i].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                       case -1:
                         s.text("8vb", s.n[i-s.n[i].octave_consecutive].x , octave_height);
                         if(s.n[i].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i].x , octave_height,
                           s.n[i-s.n[i].octave_consecutive].x+s.textWidth("8va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i].x , octave_height,
                               s.n[i].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i].x+contentsHeight/12 , octave_height,
                               s.n[i].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                       case 1:
                         s.text("8va", s.n[i-s.n[i].octave_consecutive].x , octave_height);
                         if(s.n[i].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i].x , octave_height,
                           s.n[i-s.n[i].octave_consecutive].x+s.textWidth("8va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i].x , octave_height,
                               s.n[i].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i].x+contentsHeight/12 , octave_height,
                               s.n[i].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                       case 2:
                         s.text("16va", s.n[i-s.n[i].octave_consecutive].x, octave_height);
                         if(s.n[i].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i].x , octave_height,
                           s.n[i-s.n[i].octave_consecutive].x+s.textWidth("16va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i].x , octave_height,
                               s.n[i].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i].x+contentsHeight/12 , octave_height,
                               s.n[i].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                     }
                   }
                 }
                 if(i > 0 && i<s.n.length-1){ //if it is neither first nor last but matters
                   s.strokeWeight(contentsHeight/726);;
                   if(s.n[i].octave_control != s.n[i-1].octave_control){
                     s.octave_consecutive = 0;
                     s.n[i].octave_consecutive = s.octave_consecutive;
                     switch (s.n[i-1].octave_control) {
                       case -2:
                         s.text("16vb", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                         if(s.n[i-1].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i-1].x , octave_height,
                           s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("16va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i-1].x , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                       case -1:
                         s.text("8vb", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                         if(s.n[i-1].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i-1].x , octave_height,
                           s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("8va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i-1].x , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                       case 1:
                         s.text("8va", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                         if(s.n[i-1].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i-1].x , octave_height,
                           s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("8va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i-1].x , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                       case 2:
                         s.text("16va", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                         if(s.n[i-1].octave_consecutive != 0){
                           s.drawDottedLine(s.n[i-1].x , octave_height,
                           s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("16va"), octave_height);
                           s.strokeWeight(contentsWidth/300);
                           s.stroke(s.music_color_op);
                             if(s.selected || s.view){
                             s.stroke(s.music_color);
                           }
                           s.line(s.n[i-1].x , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height);
                           s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                               s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                         }
                       break;
                     }
                   }else{
                     s.strokeWeight(contentsHeight/726);;
                     s.octave_consecutive+=1;
                     s.n[i].octave_consecutive = s.octave_consecutive;
                   }
                 }

               }
             }

             if(s.ksetting){
               s.fill(0,120);
               s.noStroke();
               s.rect(0,0,contentsWidth,contentsHeight);
             }
      }

      s.resized = function () {
        contentsContainer = document.getElementsByClassName('ui-state-default');
        contentsWidth = contentsContainer[0].getBoundingClientRect().width;
        contentsHeight = contentsContainer[0].getBoundingClientRect().height;
        s.resizeCanvas(contentsWidth,contentsHeight)
        if(window.innerWidth / window.innerHeight > 1.22){
          s.onebyone = false;
          s.treble_clefWidth = parseInt(contentsWidth/16);
        }else{
          s.onebyone = true;
          s.treble_clefWidth = parseInt(contentsWidth/16);
        }

        if(s.onebyone ||(parseInt(s.index) + 1) % 2 !=0 ){
          s.keysig_start_point = contentsWidth/25 + contentsWidth/22;
        }else{
          s.keysig_start_point = contentsWidth/50;
        }
        s.asig = contentsWidth/33;
        s.asigDistance = contentsWidth/95
        if(s.number_of_keysig ==0){
          s.timesig_start_point = s.keysig_start_point+s.asig/2;
        }else{
          s.timesig_start_point = s.keysig_start_point+s.number_of_keysig*s.asigDistance+s.asig;
        }
        s.availableSpace = contentsWidth - s.timesig_start_point - 2*contentsHeight/12;
        s.currently_editingX = s.timesig_start_point + contentsHeight/6 + contentsWidth/100;
        if(s.lick.data != null){
          s.rearrange();
        }

      }
      s.DrawSharp = function (x, y, w, h){
      s.strokeWeight(contentsWidth/600);
      s.line(x+(6*w/10), y+(h/10),x+(6*w/10), y+(8*h/10));
      s.line(x+(4*w/10), y+(2*h/10),x+(4*w/10), y+(9*h/10));
      s.strokeWeight(contentsWidth/500);
      s.line(x+(2*w/10), y+(4*h/10),x+(8*w/10), y+(2*h/10));
      s.line(x+(2*w/10), y+(8*h/10),x+(8*w/10), y+(6*h/10));
     }
       s.DrawFlat = function (x, y, w, h){
       s.strokeCap(s.ROUND);
       s.strokeWeight(contentsWidth/400);
       s.beginShape();
       s.vertex(x+(4*w/10), y+(h/10));
       s.vertex(x+(4*w/10), y+(8*h/10));
        s.bezierVertex(x+(6*w/10), y+(8*h/10),
                     x+(6*w/10), y+(2*h/10),
                     x+(4*w/10), y+(6*h/10));
       s.endShape();
       }
        s.DrawNat = function (x, y, w, h){
        s.strokeCap(s.SQUARE);
        s.strokeWeight(contentsWidth/400);
        s.line(x+(4*w/10), y+(h/10),x+(4*w/10), y+(7*h/10));
        s.line(x+(6*w/10), y+(3*h/10),x+(6*w/10), y+(9*h/10));
        s.strokeWeight(contentsWidth/400);
        s.line(x+(4*w/10), y+(7*h/10),x+(6*w/10), y+(6*h/10));
        s.line(x+(6*w/10), y+(3*h/10),x+(4*w/10), y+(4*h/10));
       }

       s.rearrange = function () {
         var prev_key;
         var current_key;
         var difference_in_key;
         var transpose_up_down;

         s.number_of_keysig = Math.abs(key-7);
         if(s.number_of_keysig ==0){
           s.timesig_start_point = s.keysig_start_point+s.asig/2;
         }else{
           s.timesig_start_point = s.keysig_start_point+s.number_of_keysig*s.asigDistance+s.asig;
         }
         s.currently_editingX = s.timesig_start_point + contentsHeight/6 + contentsHeight/24;
         s.bc=0;
         if(s.start){
           s.currently_editing_num =0;
         }
         prev_key = s.literal_CtoI.get(s.lick.data[11]);
         current_key = s.mapping(parseInt(s.lick.IsSharp));
         difference_in_key = Math.abs(prev_key - current_key);

           var mv_rebalancing_top_down = false;
           var mv_rebalancing_bottom_up = false;
           var if_accidental;
           var string;


           for (var i = 0; i < s.lick.data.length; i+= 12) {
             s.lick.data[i+8] = s.interval_int_str.get(s.lick.data[i+9]); //id
              string = s.lick.data[i+8];

             if(string.indexOf('#') !== -1){
               if_accidental =1;
               s.lick.data[i+6] = "1";
             }else if(string.indexOf('b') !== -1){
               if_accidental =-1;
               s.lick.data[i+6] = "-1";
             }else{
               if_accidental = 0;
               s.lick.data[i+6] = "0";
             }


             if(if_accidental == 1 && parseInt(s.lick.data[i+10]) + difference_in_key>= 109){
               mv_rebalancing_top_down = true;
             }else if(parseInt(s.lick.data[i+10]) + difference_in_key> 108){
               mv_rebalancing_top_down = true;
             }
             if(if_accidental == -1 && parseInt(s.lick.data[i+10]) + difference_in_key<= 32){
               mv_rebalancing_bottom_up = true;
             }else if(parseInt(s.lick.data[i+10]) + difference_in_key< 33){
               mv_rebalancing_bottom_up = true;
             }
           }

           if(prev_key < current_key){
             transpose_up_down = true;
           }else{
             transpose_up_down = false;
           }

           if(s.key_Changing){
           //  isAccidentalShow();
           }
           var inst_accidentals = s.isAccidentalShow();
           switch (parseInt(s.lick.IsSharp)) {
             case 0:
               s.lick.chord_cen = s.all_notes_in_key_str[parseInt(s.lick.chocen)];
               break;
               case 1:
                 s.lick.chord_cen = if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]);
                 break;
                 case -1:
                   s.lick.chord_cen = if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]);
                   break;
           }
         for(var i = 0; i<s.lick.data.length; i+=12){
             s.lick.data[i+2] = s.bc.toString();
             s.lick.data[i+11] = s.lick.chord_cen;
             s.lick.data[i+8] = s.interval_int_str.get(s.lick.data[i+9]); //id
              string = s.lick.data[i+8];
             if(string.indexOf('#') !== -1){
               if_accidental =1;
               s.lick.data[i+6] = "1";
             }else if(string.indexOf('b') !== -1){
               if_accidental =-1;
               s.lick.data[i+6] = "-1";
             }else{
               if_accidental = 0;
               s.lick.data[i+6] = "0";
             }
             var prev_note_mv = parseInt(s.lick.data[i+10]);

             if(transpose_up_down){
               if(mv_rebalancing_top_down){
                 prev_note_mv += difference_in_key-12;
               }else{
                 prev_note_mv += difference_in_key;
               }
             }else{
               if(mv_rebalancing_bottom_up){
                 prev_note_mv -= difference_in_key+12;
               }else{
                 prev_note_mv -= difference_in_key;
               }
             }
             s.lick.data[i+10] = prev_note_mv.toString();
             var pos =k_position_calc(prev_note_mv, if_accidental);
             s.lick.data[i] = pos.toString();

             if(s.lick.data[i+1] == "false"){
               if(inst_accidentals[parseInt(s.lick.data[i])] != s.lick.data[i+6]){
                 s.lick.data[i+5] = "true";
                 inst_accidentals[parseInt(s.lick.data[i])] = s.lick.data[i+6];
               }else{
                 s.lick.data[i+5] = "false";
                 inst_accidentals[parseInt(s.lick.data[i])] = s.lick.data[i+6];
               }
             }

             if(s.lick.data[i+1] == "true"){
               s.lick.data[i] = "7";
               s.lick.data[i+10] = "72";
             }
             s.currently_editingX+=s.makeSpace(s.lick.data[i+5]);
             s.n[i/12] = new Note(s.currently_editingX,
             parseInt(s.lick.data[i]),
             s.lick.data[i+1],
             parseInt(s.lick.data[i+2]),
             parseInt(s.lick.data[i+3]),
             parseInt(s.lick.data[i+4]),
             s.lick.data[i+5],
             parseInt(s.lick.data[i+6]),
             s.lick.data[i+7],
             s.lick.data[i+8],
             s.lick.data[i+9],
             parseInt(s.lick.data[i+10]));

             s.n[i/12].ypos=0;
             s.n[i/12].width=contentsWidth;
             s.n[i/12].height=contentsHeight;

             s.bt=parseInt(s.lick.data[i+3]);
             s.pc = parseInt(s.lick.data[i+4]);
             s.av = parseInt(s.lick.data[i+6]);
             s.r = s.lick.data[i+1];
             s.t= s.lick.data[i+7];
           switch(s.bt){
             case 0:
               s.currently_editingX_val= s.availableSpace;
               s.bc+=64;
             break;
             case 1:
               s.currently_editingX_val= s.availableSpace/2;
               s.bc+=48;
             break;
             case 2:
               s.currently_editingX_val= s.availableSpace/2;
               s.bc+=32;
             break;
             case 3:
               s.currently_editingX_val= s.availableSpace/4;
               s.bc+=24;
             break;
             case 4:
               s.currently_editingX_val= s.availableSpace/4;
               s.bc+=16;
             break;
             case 5:
               s.currently_editingX_val= s.availableSpace/8;
               s.bc+=12;
             break;
             case 6:
               s.currently_editingX_val= s.availableSpace/8;
               s.bc+=8;
             break;
             case 7:
               s.currently_editingX_val= s.availableSpace/16;
               s.bc+=6;
             break;
             case 8:
               s.currently_editingX_val= s.availableSpace/16;
               s.bc+=4;
             break;
             case 12:
               s.currently_editingX_val= s.availableSpace/3;
               if(s.pc >= 3){
                 s.bc += 64;
                 s.bt -= 10;
                 s.pc =0;
               }
             break;
             case 14:
               s.currently_editingX_val = s.availableSpace/6;
               if(s.pc >= 3){
                 s.bc += 32;
                 s.bt -= 10;
                 s.pc =0;
               }
             break;
             case 16:
               s.currently_editingX_val = s.availableSpace/12;
               if(s.pc >= 3){
                 s.bc += 16;
                 s.bt -= 10;
                 s.pc =0;
               }
             break;
             case 18:
               s.currently_editingX_val= s.availableSpace/24;
               if(s.pc >= 3){
                 s.bc += 8;
                 s.bt -= 10;
                 s.pc =0;
               }
             break;
           }

             s.currently_editingX += s.currently_editingX_val;
             if(s.start){
               s.currently_editing_num +=1;
             }
           }
           s.key_Changing = false;
           // if(n.plet_count != 0){
           //   writing_plet = true;
           // }else{
           //   writing_plet = false;
           // }

           s.start = false;
           s.grouping();
           // if(!resizing){
           //  saveData();
           // }
           // resizing = false;
       }
       s.mapping = function(map){
         var ck;

         switch (map) {
           case 0:
           s.interval_int_str = k_interval_change_int_str(s.all_notes_in_key_str[parseInt(s.lick.chocen)])
           s.interval_from_root = k_interval_change(s.all_notes_in_key_str[parseInt(s.lick.chocen)])
            ck = s.literal_CtoI.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]);
            s.lick.data[11] = s.all_notes_in_key_str[parseInt(s.lick.chocen)];
             break;
             case 1:
             s.interval_int_str = k_interval_change_int_str(if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
             s.interval_from_root = k_interval_change(if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
              ck = s.literal_CtoI.get(if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
              s.lick.data[11] = if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]);
               break;
               case -1:
               s.interval_int_str = k_interval_change_int_str(if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
               s.interval_from_root = k_interval_change(if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
                ck = s.literal_CtoI.get(if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
                s.lick.data[11] = if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)])
                 break;
         }
         return ck;
       }
       s.isAccidentalShow = function(){
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
       s.grouping = function () {
           for(let [i, ns] of s.n.entries()){
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
                     if(i == 0||s.reset){
                       ns.consecutive = 0;
                       s.reset = false;
                     }else if(i > 0){
                       if(ns.r == 'false'&&s.n[i-1].r == 'false' && s.n[i].bt == s.n[i-1].bt){
                         ns.consecutive = s.n[i-1].consecutive + 1;
                       }else{
                         ns.consecutive = 0;
                       }
                     }
                     if(ns.consecutive == 4||ns.bt == 3||ns.bt == 5||ns.bt == 7){
                       ns.consecutive = 0;
                     }//consecutive ends
                     if(ns.bt > 10){
                       ns.consecutive=0;
                       s.reset = true;
                     } //////////////////////////////////////////////////////////////
                     if(ns.bc%16 ==4){

                       if(ns.consecutive ==1 && ns.r == 'false' && s.n[i-1].r == 'false'){
                         s.n[i].two_connected = true;
                         s.n[i-1].two_connected = true;

                       }else if(ns.consecutive==0&& ns.bt == 5 && s.n[i-1].bt ==8){
                         s.n[i].two_compound_connected[1]= true;
                         s.n[i-1].two_compound_connected[1]= true;
                         s.reset=true;
                       }  /////////////////////////////////////////////////////////////////
                     }else if(ns.bc%16 == 12){

                       if(ns.consecutive == 1 && ns.r == 'false' && s.n[i-1].r == 'false'){
                         s.n[i].two_connected = true;
                         s.n[i-1].two_connected = true;

                       }
                       if(ns.consecutive==3){
                         s.n[i-2].two_connected = false;
                         s.n[i-3].two_connected = false;

                         s.n[i].four_connected = true;
                         s.n[i-1].four_connected = true;
                         s.n[i-2].four_connected = true;
                         s.n[i-3].four_connected = true;
                         s.reset=true;
                       }else if(ns.consecutive ==1 && ns.bt ==8&& ns.two_connected && s.n[i-2].bt == 6 ){
                         s.n[i].two_connected = false;
                         s.n[i-1].two_connected = false;

                         s.n[i].three_compound_connected[1] = true;
                         s.n[i-1].three_compound_connected[1] = true;
                         s.n[i-2].three_compound_connected[1] = true;
                         s.reset=true;
                       }else if(ns.bt ==8 && s.n.length>1&&i>1&& s.n[i-2].bt == 8 && s.n[i-1].bt == 6){

                         s.n[i].three_compound_connected[2] = true;
                         s.n[i-1].three_compound_connected[2] = true;
                         s.n[i-2].three_compound_connected[2] = true;
                         s.reset=true;
                       }else if(ns.consecutive==0&&ns.bt == 8&&s.n[i-1].bt == 5){
                         s.n[i].two_compound_connected[0]= true;
                         s.n[i-1].two_compound_connected[0]= true;
                         s.reset=true;
                       }else if(ns.bt == 8 &&ns.two_connected&& s.n[i-2].bt==18 && s.n[i-3].bt==18 && s.n[i-4].bt==18&&
                         s.n[i].r == 'false'&& s.n[i-1].r == 'false'&&
                         s.n[i-2].r == 'false'&& s.n[i-3].r == 'false'&& s.n[i-4].r == 'false'){
                         s.n[i].five_compound_connected[0] = true;
                         s.n[i-1].five_compound_connected[0] = true;
                         s.n[i-2].five_compound_connected[0] = true;
                         s.n[i-3].five_compound_connected[0] = true;
                         s.n[i-4].five_compound_connected[0] = true;
                         s.reset = true;
                       }
                       ///////////////////
                     }else if(ns.bc%16 ==8){

                       if(ns.consecutive ==1 && ns.r == 'false' && s.n[i-1].r == 'false'){
                         s.n[i].two_connected = true;
                         s.n[i-1].two_connected = true;
                       }
                       if(ns.consecutive==3 && s.n[i-2].two_connected
                         && s.n[i-2].bt == 6 && ns.r == 'false' && s.n[i-1].r == 'false'){
                         s.n[i-2].two_connected = false;
                         s.n[i-3].two_connected = false;

                         s.n[i].four_connected = true;
                         s.n[i-1].four_connected = true;
                         s.n[i-2].four_connected = true;
                         s.n[i-3].four_connected = true;
                         s.reset=true;
                       }else if(ns.consecutive == 0 && ns.bt == 6 && s.n[i-1].bt==8 && s.n[i-1].two_connected){ //886
                         s.n[i-1].two_connected = false;
                         s.n[i-2].two_connected = false;

                         s.n[i].three_compound_connected[0] = true;
                         s.n[i-1].three_compound_connected[0] = true;
                         s.n[i-2].three_compound_connected[0] = true;
                         s.reset=true;

                       }else if(ns.bt == 6 && i>2&& s.n[i].r == 'false'&& s.n[i-1].r == 'false'&&
                       s.n[i-2].r == 'false'&& s.n[i-3].r == 'false'&&
                       s.n[i-1].bt ==18 && s.n[i-2].bt ==18&& s.n[i-3].bt ==18){//3336
                         s.n[i].four_compound_connected[0] =true;
                         s.n[i-1].four_compound_connected[0] =true;
                         s.n[i-2].four_compound_connected[0] =true;
                         s.n[i-3].four_compound_connected[0] =true;
                         s.reset=true;
                       }else if(ns.bt ==18 && i>2 &&s.n[i].r == 'false'&& s.n[i-1].r == 'false'&&
                       s.n[i-2].r == 'false'&& s.n[i-3].r == 'false'&&
                       s.n[i-1].bt == 18&&s.n[i-2].bt == 18 &&
                       s.n[i-3].bt ==6&&s.n[i-3].bc%16 ==0){
                         s.n[i].four_compound_connected[1] =true;
                         s.n[i-1].four_compound_connected[1] =true;
                         s.n[i-2].four_compound_connected[1] =true;
                         s.n[i-3].four_compound_connected[1] =true;
                         s.reset=true;
                       }else if(ns.bt == 18 && i>3 &&
                         s.n[i].r == 'false'&& s.n[i-1].r == 'false'&& s.n[i-2].r == 'false'&&
                         s.n[i-3].r == 'false'&& s.n[i-4].r == 'false'&&
                         s.n[i-1].bt==18 && s.n[i-2].bt==18&&
                         s.n[i-3].bt==8 &&s.n[i-3].two_connected){
                         s.n[i-3].two_connected = false;
                         s.n[i-4].two_connected = false;

                         s.n[i].five_compound_connected[1] = true;
                         s.n[i-1].five_compound_connected[1] = true;
                         s.n[i-2].five_compound_connected[1] = true;
                         s.n[i-3].five_compound_connected[1] = true;
                         s.n[i-4].five_compound_connected[1] = true;
                         s.reset = true;
                       }
                     }
                     //////////////////////////////
              }//loop end
         }// grouping end
         s.drawGrouping = function () {
            for (let i = 0; i < s.n.length; i++){
              if(s.n[i].two_connected){
                drawtwoconnected(s, i);
                i+= 1;
              }else if(s.n[i].four_connected){
                drawFourConnected(s, i);
                i+= 3;
              }else if(s.n[i].three_compound_connected[0]){
                drawThreeConnected_0(s, i);
                i+= 2;
              }else if(s.n[i].three_compound_connected[1]){
                drawThreeConnected_1(s, i);
                i+= 2;
              }else if(s.n[i].three_compound_connected[2]){
                drawThreeConnected_2(s, i);
                i+= 2;
              }else if(s.n[i].two_compound_connected[0]){//58
                drawTwoComConnected_0(s, i);
                i+= 1;
              }else if(s.n[i].two_compound_connected[1]){//85
                drawTwoComConnected_1(s, i);
                i+= 1;
              }else if(s.n[i].four_compound_connected[0]){//3336
                drawFourComConnected_0(s, i);
                i+= 3;
              }else if(s.n[i].four_compound_connected[1]){//6333
                drawFourComConnected_1(s, i);
                i+= 3;
              }else if(s.n[i].five_compound_connected[0]){//33388
                drawFiveComConnected_0(s, i);
                i+= 4;
              }else if(s.n[i].five_compound_connected[1]){//88333
                drawFiveComConnected_1(s, i);
                i+= 4;
              }else if(s.n[i].triplet){
                drawTriplet(s, i);
                i+=2;
              }
            }
          }

       s.makeSpace = function (as){
         if(as =="true"){
           return 0;
         }else{
           return 0;
         }
       }
      s.drawDottedLine = function (x1,y1,x2,y2) {
        s.noStroke();
        var d = s.dist(x1, y1, x2, y2);
        var amount_of_dots = d / (this.height/12);
        for (var i = 0; i <= parseInt(amount_of_dots); i++) {
        var x = s.lerp(x1, x2, i/parseInt(amount_of_dots));
        var y = s.lerp(y1, y2, i/parseInt(amount_of_dots));
        s.ellipse(x, y, contentsHeight/48, contentsHeight/48);
        }
      }
    }

  c[i] = new p5(func);
  }
  licklist();
}

c =[];

for (var i = 0; i < sortedLicks.length; i++) {
  contentsWidth = contentsContainer[0].getBoundingClientRect().width;
  contentsHeight = contentsContainer[0].getBoundingClientRect().height;
  var func = function(s){
    s.music_color;
    s.music_color_op;
    s.bg;
    s.ksetting = false;
    s.theme= theme;
    switch (theme) {
      case "dark":
      s.img = s.loadImage('static/resources/trevb_w.png');
        break;
      default:
      s.img = s.loadImage('static/resources/trevb.png');
    }
    s.lick = sortedLicks[i];
    s.index = i;
    [s.all_notes_in_key_str,s.all_notes_in_key_greek] = all_note_in_Key(s.lick.key);
    s.selected = false;
    s.view =false;
    s.order_of_flat = [7, 5.5, 7.5, 6, 8, 6.5, 8.5];
    s.order_of_sharp = [5, 6.5, 4.5, 6, 4, 5.5, 3.5];
    s.y_indexs = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];
    s.k = key;
    if(s.index ==0){
      s.first = true;
    }else{
      s.first = false;
    }
    if(s.index == sortedLicks.length -1){
      s.last = true;
    }else{
      s.last =false;
    }
    if(window.innerWidth / window.innerHeight > 1.22){
      s.onebyone = false;
      s.treble_clefWidth = parseInt(contentsWidth/16);
    }else{
      s.onebyone = true;
      s.treble_clefWidth = parseInt(contentsWidth/16);
    }
    if(s.onebyone ||(parseInt(s.index) + 1) % 2 !=0 ){
      s.keysig_start_point = contentsWidth/25 + contentsWidth/22;
    }else{
      s.keysig_start_point = contentsWidth/25;
    }
    s.asig = contentsWidth/33;
    s.asigDistance = contentsWidth/95
    s.number_of_keysig = Math.abs(s.k-7);
    if(s.number_of_keysig ==0){
      s.timesig_start_point = s.keysig_start_point+s.asig/2;
    }else{
      s.timesig_start_point = s.keysig_start_point+s.number_of_keysig*s.asigDistance+s.asig;
    }

    s.availableSpace = contentsWidth - s.timesig_start_point - 2*contentsHeight/12;
    s.currently_editingX = s.currently_editingX = s.timesig_start_point + contentsHeight/6 + contentsWidth/100;
    s.currently_editing_num=0;
    s.currently_editingX_val;
    s.n=[];
    s.yi;
    s.bt;
    s.bc;
    s.pc;
    s.av;
    s.r = false;;
    s.t;
    s.reset=false;
    s.key_Changing = false;
    s.oc;
    s.start=true;
    s.literal_CtoI = literal_CtoI;
    s.interval_from_root;
    s.interval_int_str;
    this.octave_consecutive;

    s.setup = function() {
      let canvas = s.createCanvas(contentsWidth,contentsHeight);
      canvas.parent(s.lick.id + '-' + s.index);
      switch (s.theme) {
        case "dark":
        s.music_color =s.color(255);
        s.music_color_op=s.color(255,84);
        s.bg=s.color(29, 30, 48);
          break;
          case "simple":
          s.music_color =s.color(0);
          s.music_color_op=s.color(0,84);
          s.bg=s.color(248, 249, 251);
            break;
            case "pastel":
            s.music_color =s.color(0);
            s.music_color_op=s.color(0,84);
            s.bg=s.color(248, 249, 251);
              break;
      }

      if(s.lick.data !=null){
        s.rearrange();
      }
    }

    s.draw = function() {
      s.background(s.bg);
      switch (s.lick.IsSharp) {
        case "0":
          s.lick.chord_cen = s.all_notes_in_key_str[s.lick.chocen];
          break;
          case "1":
            s.lick.chord_cen = if_is_Sharp.get(s.all_notes_in_key_str[s.lick.chocen]);
            break;
            case "-1":
              s.lick.chord_cen = if_is_Flat.get(s.all_notes_in_key_str[s.lick.chocen]);
              break;
         }

         s.fill(s.music_color_op);
         s.stroke(s.music_color_op);
           if(s.selected || s.view){
           s.fill(s.music_color);
           s.stroke(s.music_color);
         }
         s.strokeCap(s.SQUARE);
         s.strokeWeight(contentsHeight/360);;
         s.textSize(contentsHeight/12);
         s.textAlign(s.LEFT,s.CENTER);
         s.text(s.index+1, 0, contentsHeight*4/12);


           s.line(0, 5*(contentsHeight/12), 0, 9*(contentsHeight/12));
           s.strokeWeight(contentsHeight*7/360);
           s.line(contentsWidth, 5*(contentsHeight/12),contentsWidth, 9*(contentsHeight/12));
           if(s.last){
             s.strokeWeight(contentsHeight*4/360);
             s.line(contentsWidth-contentsWidth/80,5*(contentsHeight/12),contentsWidth-contentsWidth/80, 9*(contentsHeight/12));
           }
           s.strokeWeight(contentsHeight/360);
           for (var i = 5; i < 10; i++) {
             s.line(0, i*(contentsHeight/12),contentsWidth,i*(contentsHeight/12));
           }
           if(s.onebyone||(parseInt(s.index) + 1) % 2 !=0 ){
             s.tint(255, 84);
             if(s.selected || s.view){
               s.tint(255, 255);
               if(s.theme != "dark"){
                 s.tint(0, 255);
               }
             }
             s.image(s.img, parseInt(contentsWidth/50), parseInt(2.5*(contentsHeight/12)),
             s.treble_clefWidth, parseInt(contentsHeight/1.5));
             for(var i = 0; i < s.number_of_keysig; i++){
               if(s.k<7){
                 s.DrawSharp(s.keysig_start_point + s.asigDistance*i,
                   s.order_of_sharp[i]*(contentsHeight/12) - contentsHeight/16,
                   s.asig,
                   contentsHeight/9);
               }else if(s.k>7){
                 s.DrawFlat(s.keysig_start_point + s.asigDistance*i,
                   s.order_of_flat[i]*(contentsHeight/12) - contentsHeight/13,
                   s.asig,
                   contentsHeight/8);
               }
             }

               s.fill(s.music_color_op);
               s.stroke(s.music_color_op);
                 if(s.selected || s.view){
                   s.fill(s.music_color);
                 s.stroke(s.music_color);
               }
               s.textSize(2*contentsHeight/12);
               s.strokeWeight(contentsHeight/360);
               s.textAlign(s.CENTER,s.CENTER);
               s.text("4",s.timesig_start_point,6*contentsHeight/12);
               s.text("4",s.timesig_start_point,8*contentsHeight/12);

           }



           if(s.lick.data==null){
             s.textSize(contentsHeight/6);
             s.textAlign(s.CENTER,s.CENTER);
             s.text("Empty", contentsWidth/2, contentsHeight/2);
           }else{
             s.strokeWeight(contentsHeight/360);;
             s.textSize(contentsHeight/10);

             if(s.onebyone ||(parseInt(s.index) + 1) % 2 !=0 ){
               s.textAlign(s.RIGHT,s.CENTER);
               s.text(s.lick.chord_cen + s.lick.chochar,
                 s.keysig_start_point,
                 contentsHeight/12);
             }else{
               s.textAlign(s.LEFT,s.CENTER);
               s.text(s.lick.chord_cen + s.lick.chochar,
                 0,
                 contentsHeight/12);
             }


             for (var i = 0; i < s.n.length; i++) {
               drawNotes(s, s.n[i]);
               if(s.n[i].tie =="true"){
                 drawTie(s, i);
               }
             }
             s.drawGrouping();
             s.octave_consecutive = 0;
             s.textAlign(s.CENTER,s.CENTER);
             s.textSize(contentsHeight/12);
             s.strokeWeight(contentsHeight/726);;
             s.fill(s.music_color_op);
             s.stroke(s.music_color_op);
               if(s.selected || s.view){
                 s.fill(s.music_color);
               s.stroke(s.music_color);
             }
             var octave_height = contentsHeight/12;
             for(var i = 0; i < s.n.length; i++){
               if(i ==0){ //if it is the first note
                 s.strokeWeight(contentsHeight/360);;
                 switch (s.n[i].octave_control) {
                   case -2:
                     s.text("16vb", s.n[i].x , octave_height);
                     s.n[i].octave_consecutive = s.octave_consecutive;
                   break;
                   case -1:
                     s.text("8vb", s.n[i].x , octave_height);
                     s.n[i].octave_consecutive = s.octave_consecutive;
                   break;
                   case 1:
                     s.text("8va", s.n[i].x , octave_height);
                     s.n[i].octave_consecutive = s.octave_consecutive;
                   break;
                   case 2:
                     s.text("16va", s.n[i].x , octave_height);
                     s.n[i].octave_consecutive = s.octave_consecutive;
                   break;
                 }
               }else if(i == s.n.length-1){//if it is the last note and matters
                 s.strokeWeight(contentsHeight/360);;
                 if(s.n[i].octave_control != s.n[i-1].octave_control){
                   s.octave_consecutive = 0;
                   s.n[i].octave_consecutive = s.octave_consecutive;
                   switch (s.n[i].octave_control) {
                     case -2:
                       s.text("16vb", s.n[i].x , octave_height);
                     break;
                     case -1:
                       s.text("8vb", s.n[i].x , octave_height);
                     break;
                     case 1:
                       s.text("8va", s.n[i].x , octave_height);
                     break;
                     case 2:
                       s.text("16va", s.n[i].x , octave_height);
                     break;
                   }
                   switch (s.n[i-1].octave_control) {
                     case -2:
                       s.text("16vb", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                       if(s.n[i-1].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i-1].x , octave_height,
                         s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("16va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i-1].x , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                     case -1:
                       s.text("8vb", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                       if(s.n[i-1].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i-1].x , octave_height,
                         s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("8va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i-1].x , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                     case 1:
                       s.text("8va", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                       if(s.n[i-1].s.octave_consecutive != 0){
                         s.drawDottedLine(s.n[i-1].x , octave_height,
                         s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("8va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i-1].x , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                     case 2:
                       s.text("16va", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                       if(s.n[i-1].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i-1].x , octave_height,
                         s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("16va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i-1].x , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                   }
                 }else{
                   s.strokeWeight(contentsHeight/726);;
                   s.octave_consecutive+=1;
                   s.n[i].octave_consecutive = s.octave_consecutive;
                   switch (s.n[i].octave_control) {
                     case -2:
                       s.text("16vb", s.n[i-s.n[i].octave_consecutive].x , octave_height);
                       if(s.n[i].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i].x , octave_height,
                         s.n[i-s.n[i].octave_consecutive].x+s.textWidth("16va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i].x , octave_height,
                             s.n[i].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i].x+contentsHeight/12 , octave_height,
                             s.n[i].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                     case -1:
                       s.text("8vb", s.n[i-s.n[i].octave_consecutive].x , octave_height);
                       if(s.n[i].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i].x , octave_height,
                         s.n[i-s.n[i].octave_consecutive].x+s.textWidth("8va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i].x , octave_height,
                             s.n[i].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i].x+contentsHeight/12 , octave_height,
                             s.n[i].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                     case 1:
                       s.text("8va", s.n[i-s.n[i].octave_consecutive].x , octave_height);
                       if(s.n[i].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i].x , octave_height,
                         s.n[i-s.n[i].octave_consecutive].x+s.textWidth("8va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i].x , octave_height,
                             s.n[i].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i].x+contentsHeight/12 , octave_height,
                             s.n[i].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                     case 2:
                       s.text("16va", s.n[i-s.n[i].octave_consecutive].x, octave_height);
                       if(s.n[i].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i].x , octave_height,
                         s.n[i-s.n[i].octave_consecutive].x+s.textWidth("16va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i].x , octave_height,
                             s.n[i].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i].x+contentsHeight/12 , octave_height,
                             s.n[i].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                   }
                 }
               }
               if(i > 0 && i<s.n.length-1){ //if it is neither first nor last but matters
                 s.strokeWeight(contentsHeight/726);;
                 if(s.n[i].octave_control != s.n[i-1].octave_control){
                   s.octave_consecutive = 0;
                   s.n[i].octave_consecutive = s.octave_consecutive;
                   switch (s.n[i-1].octave_control) {
                     case -2:
                       s.text("16vb", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                       if(s.n[i-1].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i-1].x , octave_height,
                         s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("16va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i-1].x , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                     case -1:
                       s.text("8vb", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                       if(s.n[i-1].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i-1].x , octave_height,
                         s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("8va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i-1].x , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                     case 1:
                       s.text("8va", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                       if(s.n[i-1].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i-1].x , octave_height,
                         s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("8va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i-1].x , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                     case 2:
                       s.text("16va", s.n[i-1-s.n[i-1].octave_consecutive].x , octave_height);
                       if(s.n[i-1].octave_consecutive != 0){
                         s.drawDottedLine(s.n[i-1].x , octave_height,
                         s.n[i-1-s.n[i-1].octave_consecutive].x+s.textWidth("16va"), octave_height);
                         s.strokeWeight(contentsWidth/300);
                         s.stroke(s.music_color_op);
                           if(s.selected || s.view){
                           s.stroke(s.music_color);
                         }
                         s.line(s.n[i-1].x , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height);
                         s.line(s.n[i-1].x+contentsHeight/12 , octave_height,
                             s.n[i-1].x+contentsHeight/12 , octave_height+contentsHeight/12);
                       }
                     break;
                   }
                 }else{
                   s.strokeWeight(contentsHeight/726);;
                   s.octave_consecutive+=1;
                   s.n[i].octave_consecutive = s.octave_consecutive;
                 }
               }

             }
           }

           if(s.ksetting){
             s.fill(0,120);
             s.noStroke();
             s.rect(0,0,contentsWidth,contentsHeight);
           }
    }

    s.resized = function () {
      contentsContainer = document.getElementsByClassName('ui-state-default');
      contentsWidth = contentsContainer[0].getBoundingClientRect().width;
      contentsHeight = contentsContainer[0].getBoundingClientRect().height;
      s.resizeCanvas(contentsWidth,contentsHeight)
      if(window.innerWidth / window.innerHeight > 1.22){
        s.onebyone = false;
        s.treble_clefWidth = parseInt(contentsWidth/16);
      }else{
        s.onebyone = true;
        s.treble_clefWidth = parseInt(contentsWidth/16);
      }

      if(s.onebyone ||(parseInt(s.index) + 1) % 2 !=0 ){
        s.keysig_start_point = contentsWidth/25 + contentsWidth/22;
      }else{
        s.keysig_start_point = contentsWidth/50;
      }
      s.asig = contentsWidth/33;
      s.asigDistance = contentsWidth/95
      if(s.number_of_keysig ==0){
        s.timesig_start_point = s.keysig_start_point+s.asig/2;
      }else{
        s.timesig_start_point = s.keysig_start_point+s.number_of_keysig*s.asigDistance+s.asig;
      }
      s.availableSpace = contentsWidth - s.timesig_start_point - 2*contentsHeight/12;
      s.currently_editingX = s.timesig_start_point + contentsHeight/6 + contentsWidth/100;
      if(s.lick.data != null){
        s.rearrange();
      }

    }
    s.DrawSharp = function (x, y, w, h){
    s.strokeWeight(contentsWidth/600);
    s.line(x+(6*w/10), y+(h/10),x+(6*w/10), y+(8*h/10));
    s.line(x+(4*w/10), y+(2*h/10),x+(4*w/10), y+(9*h/10));
    s.strokeWeight(contentsWidth/500);
    s.line(x+(2*w/10), y+(4*h/10),x+(8*w/10), y+(2*h/10));
    s.line(x+(2*w/10), y+(8*h/10),x+(8*w/10), y+(6*h/10));
   }
     s.DrawFlat = function (x, y, w, h){
     s.strokeCap(s.ROUND);
     s.strokeWeight(contentsWidth/400);
     s.beginShape();
     s.vertex(x+(4*w/10), y+(h/10));
     s.vertex(x+(4*w/10), y+(8*h/10));
      s.bezierVertex(x+(6*w/10), y+(8*h/10),
                   x+(6*w/10), y+(2*h/10),
                   x+(4*w/10), y+(6*h/10));
     s.endShape();
     }
      s.DrawNat = function (x, y, w, h){
      s.strokeCap(s.SQUARE);
      s.strokeWeight(contentsWidth/400);
      s.line(x+(4*w/10), y+(h/10),x+(4*w/10), y+(7*h/10));
      s.line(x+(6*w/10), y+(3*h/10),x+(6*w/10), y+(9*h/10));
      s.strokeWeight(contentsWidth/400);
      s.line(x+(4*w/10), y+(7*h/10),x+(6*w/10), y+(6*h/10));
      s.line(x+(6*w/10), y+(3*h/10),x+(4*w/10), y+(4*h/10));
     }

     s.rearrange = function () {
       var prev_key;
       var current_key;
       var difference_in_key;
       var transpose_up_down;

       s.number_of_keysig = Math.abs(key-7);
       if(s.number_of_keysig ==0){
         s.timesig_start_point = s.keysig_start_point+s.asig/2;
       }else{
         s.timesig_start_point = s.keysig_start_point+s.number_of_keysig*s.asigDistance+s.asig;
       }
       s.currently_editingX = s.timesig_start_point + contentsHeight/6 + contentsHeight/24;
       s.bc=0;
       if(s.start){
         s.currently_editing_num =0;
       }
       prev_key = s.literal_CtoI.get(s.lick.data[11]);
       current_key = s.mapping(parseInt(s.lick.IsSharp));
       difference_in_key = Math.abs(prev_key - current_key);

         var mv_rebalancing_top_down = false;
         var mv_rebalancing_bottom_up = false;
         var if_accidental;
         var string;


         for (var i = 0; i < s.lick.data.length; i+= 12) {
           s.lick.data[i+8] = s.interval_int_str.get(s.lick.data[i+9]); //id
            string = s.lick.data[i+8];

           if(string.indexOf('#') !== -1){
             if_accidental =1;
             s.lick.data[i+6] = "1";
           }else if(string.indexOf('b') !== -1){
             if_accidental =-1;
             s.lick.data[i+6] = "-1";
           }else{
             if_accidental = 0;
             s.lick.data[i+6] = "0";
           }


           if(if_accidental == 1 && parseInt(s.lick.data[i+10]) + difference_in_key>= 109){
             mv_rebalancing_top_down = true;
           }else if(parseInt(s.lick.data[i+10]) + difference_in_key> 108){
             mv_rebalancing_top_down = true;
           }
           if(if_accidental == -1 && parseInt(s.lick.data[i+10]) + difference_in_key<= 32){
             mv_rebalancing_bottom_up = true;
           }else if(parseInt(s.lick.data[i+10]) + difference_in_key< 33){
             mv_rebalancing_bottom_up = true;
           }
         }

         if(prev_key < current_key){
           transpose_up_down = true;
         }else{
           transpose_up_down = false;
         }

         if(s.key_Changing){
         //  isAccidentalShow();
         }
         var inst_accidentals = s.isAccidentalShow();
         switch (parseInt(s.lick.IsSharp)) {
           case 0:
             s.lick.chord_cen = s.all_notes_in_key_str[parseInt(s.lick.chocen)];
             break;
             case 1:
               s.lick.chord_cen = if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]);
               break;
               case -1:
                 s.lick.chord_cen = if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]);
                 break;
         }
       for(var i = 0; i<s.lick.data.length; i+=12){
           s.lick.data[i+2] = s.bc.toString();
           s.lick.data[i+11] = s.lick.chord_cen;
           s.lick.data[i+8] = s.interval_int_str.get(s.lick.data[i+9]); //id
            string = s.lick.data[i+8];
           if(string.indexOf('#') !== -1){
             if_accidental =1;
             s.lick.data[i+6] = "1";
           }else if(string.indexOf('b') !== -1){
             if_accidental =-1;
             s.lick.data[i+6] = "-1";
           }else{
             if_accidental = 0;
             s.lick.data[i+6] = "0";
           }
           var prev_note_mv = parseInt(s.lick.data[i+10]);

           if(transpose_up_down){
             if(mv_rebalancing_top_down){
               prev_note_mv += difference_in_key-12;
             }else{
               prev_note_mv += difference_in_key;
             }
           }else{
             if(mv_rebalancing_bottom_up){
               prev_note_mv -= difference_in_key+12;
             }else{
               prev_note_mv -= difference_in_key;
             }
           }
           s.lick.data[i+10] = prev_note_mv.toString();
           var pos =k_position_calc(prev_note_mv, if_accidental);
           s.lick.data[i] = pos.toString();

           if(s.lick.data[i+1] == "false"){
             if(inst_accidentals[parseInt(s.lick.data[i])] != s.lick.data[i+6]){
               s.lick.data[i+5] = "true";
               inst_accidentals[parseInt(s.lick.data[i])] = s.lick.data[i+6];
             }else{
               s.lick.data[i+5] = "false";
               inst_accidentals[parseInt(s.lick.data[i])] = s.lick.data[i+6];
             }
           }

           if(s.lick.data[i+1] == "true"){
             s.lick.data[i] = "7";
             s.lick.data[i+10] = "72";
           }
           s.currently_editingX+=s.makeSpace(s.lick.data[i+5]);
           s.n[i/12] = new Note(s.currently_editingX,
           parseInt(s.lick.data[i]),
           s.lick.data[i+1],
           parseInt(s.lick.data[i+2]),
           parseInt(s.lick.data[i+3]),
           parseInt(s.lick.data[i+4]),
           s.lick.data[i+5],
           parseInt(s.lick.data[i+6]),
           s.lick.data[i+7],
           s.lick.data[i+8],
           s.lick.data[i+9],
           parseInt(s.lick.data[i+10]));

           s.n[i/12].ypos=0;
           s.n[i/12].width=contentsWidth;
           s.n[i/12].height=contentsHeight;

           s.bt=parseInt(s.lick.data[i+3]);
           s.pc = parseInt(s.lick.data[i+4]);
           s.av = parseInt(s.lick.data[i+6]);
           s.r = s.lick.data[i+1];
           s.t= s.lick.data[i+7];
         switch(s.bt){
           case 0:
             s.currently_editingX_val= s.availableSpace;
             s.bc+=64;
           break;
           case 1:
             s.currently_editingX_val= s.availableSpace/2;
             s.bc+=48;
           break;
           case 2:
             s.currently_editingX_val= s.availableSpace/2;
             s.bc+=32;
           break;
           case 3:
             s.currently_editingX_val= s.availableSpace/4;
             s.bc+=24;
           break;
           case 4:
             s.currently_editingX_val= s.availableSpace/4;
             s.bc+=16;
           break;
           case 5:
             s.currently_editingX_val= s.availableSpace/8;
             s.bc+=12;
           break;
           case 6:
             s.currently_editingX_val= s.availableSpace/8;
             s.bc+=8;
           break;
           case 7:
             s.currently_editingX_val= s.availableSpace/16;
             s.bc+=6;
           break;
           case 8:
             s.currently_editingX_val= s.availableSpace/16;
             s.bc+=4;
           break;
           case 12:
             s.currently_editingX_val= s.availableSpace/3;
             if(s.pc >= 3){
               s.bc += 64;
               s.bt -= 10;
               s.pc =0;
             }
           break;
           case 14:
             s.currently_editingX_val = s.availableSpace/6;
             if(s.pc >= 3){
               s.bc += 32;
               s.bt -= 10;
               s.pc =0;
             }
           break;
           case 16:
             s.currently_editingX_val = s.availableSpace/12;
             if(s.pc >= 3){
               s.bc += 16;
               s.bt -= 10;
               s.pc =0;
             }
           break;
           case 18:
             s.currently_editingX_val= s.availableSpace/24;
             if(s.pc >= 3){
               s.bc += 8;
               s.bt -= 10;
               s.pc =0;
             }
           break;
         }

           s.currently_editingX += s.currently_editingX_val;
           if(s.start){
             s.currently_editing_num +=1;
           }
         }
         s.key_Changing = false;
         // if(n.plet_count != 0){
         //   writing_plet = true;
         // }else{
         //   writing_plet = false;
         // }

         s.start = false;
         s.grouping();
         // if(!resizing){
         //  saveData();
         // }
         // resizing = false;
     }
     s.mapping = function(map){
       var ck;

       switch (map) {
         case 0:
         s.interval_int_str = k_interval_change_int_str(s.all_notes_in_key_str[parseInt(s.lick.chocen)])
         s.interval_from_root = k_interval_change(s.all_notes_in_key_str[parseInt(s.lick.chocen)])
          ck = s.literal_CtoI.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]);
          s.lick.data[11] = s.all_notes_in_key_str[parseInt(s.lick.chocen)];
           break;
           case 1:
           s.interval_int_str = k_interval_change_int_str(if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
           s.interval_from_root = k_interval_change(if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
            ck = s.literal_CtoI.get(if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
            s.lick.data[11] = if_is_Sharp.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]);
             break;
             case -1:
             s.interval_int_str = k_interval_change_int_str(if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
             s.interval_from_root = k_interval_change(if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
              ck = s.literal_CtoI.get(if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)]));
              s.lick.data[11] = if_is_Flat.get(s.all_notes_in_key_str[parseInt(s.lick.chocen)])
               break;
       }
       return ck;
     }
     s.isAccidentalShow = function(){
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
     s.grouping = function () {
         for(let [i, ns] of s.n.entries()){
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
                   if(i == 0||s.reset){
                     ns.consecutive = 0;
                     s.reset = false;
                   }else if(i > 0){
                     if(ns.r == 'false'&&s.n[i-1].r == 'false' && s.n[i].bt == s.n[i-1].bt){
                       ns.consecutive = s.n[i-1].consecutive + 1;
                     }else{
                       ns.consecutive = 0;
                     }
                   }
                   if(ns.consecutive == 4||ns.bt == 3||ns.bt == 5||ns.bt == 7){
                     ns.consecutive = 0;
                   }//consecutive ends
                   if(ns.bt > 10){
                     ns.consecutive=0;
                     s.reset = true;
                   } //////////////////////////////////////////////////////////////
                   if(ns.bc%16 ==4){

                     if(ns.consecutive ==1 && ns.r == 'false' && s.n[i-1].r == 'false'){
                       s.n[i].two_connected = true;
                       s.n[i-1].two_connected = true;

                     }else if(ns.consecutive==0&& ns.bt == 5 && s.n[i-1].bt ==8){
                       s.n[i].two_compound_connected[1]= true;
                       s.n[i-1].two_compound_connected[1]= true;
                       s.reset=true;
                     }  /////////////////////////////////////////////////////////////////
                   }else if(ns.bc%16 == 12){

                     if(ns.consecutive == 1 && ns.r == 'false' && s.n[i-1].r == 'false'){
                       s.n[i].two_connected = true;
                       s.n[i-1].two_connected = true;

                     }
                     if(ns.consecutive==3){
                       s.n[i-2].two_connected = false;
                       s.n[i-3].two_connected = false;

                       s.n[i].four_connected = true;
                       s.n[i-1].four_connected = true;
                       s.n[i-2].four_connected = true;
                       s.n[i-3].four_connected = true;
                       s.reset=true;
                     }else if(ns.consecutive ==1 && ns.bt ==8&& ns.two_connected && s.n[i-2].bt == 6 ){
                       s.n[i].two_connected = false;
                       s.n[i-1].two_connected = false;

                       s.n[i].three_compound_connected[1] = true;
                       s.n[i-1].three_compound_connected[1] = true;
                       s.n[i-2].three_compound_connected[1] = true;
                       s.reset=true;
                     }else if(ns.bt ==8 && s.n.length>1&&i>1&& s.n[i-2].bt == 8 && s.n[i-1].bt == 6){

                       s.n[i].three_compound_connected[2] = true;
                       s.n[i-1].three_compound_connected[2] = true;
                       s.n[i-2].three_compound_connected[2] = true;
                       s.reset=true;
                     }else if(ns.consecutive==0&&ns.bt == 8&&s.n[i-1].bt == 5){
                       s.n[i].two_compound_connected[0]= true;
                       s.n[i-1].two_compound_connected[0]= true;
                       s.reset=true;
                     }else if(ns.bt == 8 &&ns.two_connected&& s.n[i-2].bt==18 && s.n[i-3].bt==18 && s.n[i-4].bt==18&&
                       s.n[i].r == 'false'&& s.n[i-1].r == 'false'&&
                       s.n[i-2].r == 'false'&& s.n[i-3].r == 'false'&& s.n[i-4].r == 'false'){
                       s.n[i].five_compound_connected[0] = true;
                       s.n[i-1].five_compound_connected[0] = true;
                       s.n[i-2].five_compound_connected[0] = true;
                       s.n[i-3].five_compound_connected[0] = true;
                       s.n[i-4].five_compound_connected[0] = true;
                       s.reset = true;
                     }
                     ///////////////////
                   }else if(ns.bc%16 ==8){

                     if(ns.consecutive ==1 && ns.r == 'false' && s.n[i-1].r == 'false'){
                       s.n[i].two_connected = true;
                       s.n[i-1].two_connected = true;
                     }
                     if(ns.consecutive==3 && s.n[i-2].two_connected
                       && s.n[i-2].bt == 6 && ns.r == 'false' && s.n[i-1].r == 'false'){
                       s.n[i-2].two_connected = false;
                       s.n[i-3].two_connected = false;

                       s.n[i].four_connected = true;
                       s.n[i-1].four_connected = true;
                       s.n[i-2].four_connected = true;
                       s.n[i-3].four_connected = true;
                       s.reset=true;
                     }else if(ns.consecutive == 0 && ns.bt == 6 && s.n[i-1].bt==8 && s.n[i-1].two_connected){ //886
                       s.n[i-1].two_connected = false;
                       s.n[i-2].two_connected = false;

                       s.n[i].three_compound_connected[0] = true;
                       s.n[i-1].three_compound_connected[0] = true;
                       s.n[i-2].three_compound_connected[0] = true;
                       s.reset=true;

                     }else if(ns.bt == 6 && i>2&& s.n[i].r == 'false'&& s.n[i-1].r == 'false'&&
                     s.n[i-2].r == 'false'&& s.n[i-3].r == 'false'&&
                     s.n[i-1].bt ==18 && s.n[i-2].bt ==18&& s.n[i-3].bt ==18){//3336
                       s.n[i].four_compound_connected[0] =true;
                       s.n[i-1].four_compound_connected[0] =true;
                       s.n[i-2].four_compound_connected[0] =true;
                       s.n[i-3].four_compound_connected[0] =true;
                       s.reset=true;
                     }else if(ns.bt ==18 && i>2 &&s.n[i].r == 'false'&& s.n[i-1].r == 'false'&&
                     s.n[i-2].r == 'false'&& s.n[i-3].r == 'false'&&
                     s.n[i-1].bt == 18&&s.n[i-2].bt == 18 &&
                     s.n[i-3].bt ==6&&s.n[i-3].bc%16 ==0){
                       s.n[i].four_compound_connected[1] =true;
                       s.n[i-1].four_compound_connected[1] =true;
                       s.n[i-2].four_compound_connected[1] =true;
                       s.n[i-3].four_compound_connected[1] =true;
                       s.reset=true;
                     }else if(ns.bt == 18 && i>3 &&
                       s.n[i].r == 'false'&& s.n[i-1].r == 'false'&& s.n[i-2].r == 'false'&&
                       s.n[i-3].r == 'false'&& s.n[i-4].r == 'false'&&
                       s.n[i-1].bt==18 && s.n[i-2].bt==18&&
                       s.n[i-3].bt==8 &&s.n[i-3].two_connected){
                       s.n[i-3].two_connected = false;
                       s.n[i-4].two_connected = false;

                       s.n[i].five_compound_connected[1] = true;
                       s.n[i-1].five_compound_connected[1] = true;
                       s.n[i-2].five_compound_connected[1] = true;
                       s.n[i-3].five_compound_connected[1] = true;
                       s.n[i-4].five_compound_connected[1] = true;
                       s.reset = true;
                     }
                   }
                   //////////////////////////////
            }//loop end
       }// grouping end
       s.drawGrouping = function () {
          for (let i = 0; i < s.n.length; i++){
            if(s.n[i].two_connected){
              drawtwoconnected(s, i);
              i+= 1;
            }else if(s.n[i].four_connected){
              drawFourConnected(s, i);
              i+= 3;
            }else if(s.n[i].three_compound_connected[0]){
              drawThreeConnected_0(s, i);
              i+= 2;
            }else if(s.n[i].three_compound_connected[1]){
              drawThreeConnected_1(s, i);
              i+= 2;
            }else if(s.n[i].three_compound_connected[2]){
              drawThreeConnected_2(s, i);
              i+= 2;
            }else if(s.n[i].two_compound_connected[0]){//58
              drawTwoComConnected_0(s, i);
              i+= 1;
            }else if(s.n[i].two_compound_connected[1]){//85
              drawTwoComConnected_1(s, i);
              i+= 1;
            }else if(s.n[i].four_compound_connected[0]){//3336
              drawFourComConnected_0(s, i);
              i+= 3;
            }else if(s.n[i].four_compound_connected[1]){//6333
              drawFourComConnected_1(s, i);
              i+= 3;
            }else if(s.n[i].five_compound_connected[0]){//33388
              drawFiveComConnected_0(s, i);
              i+= 4;
            }else if(s.n[i].five_compound_connected[1]){//88333
              drawFiveComConnected_1(s, i);
              i+= 4;
            }else if(s.n[i].triplet){
              drawTriplet(s, i);
              i+=2;
            }
          }
        }

     s.makeSpace = function (as){
       if(as =="true"){
         return 0;
       }else{
         return 0;
       }
     }
    s.drawDottedLine = function (x1,y1,x2,y2) {
      s.noStroke();
      var d = s.dist(x1, y1, x2, y2);
      var amount_of_dots = d / (this.height/12);
      for (var i = 0; i <= parseInt(amount_of_dots); i++) {
      var x = s.lerp(x1, x2, i/parseInt(amount_of_dots));
      var y = s.lerp(y1, y2, i/parseInt(amount_of_dots));
      s.ellipse(x, y, contentsHeight/48, contentsHeight/48);
      }
    }
  }

c[i] = new p5(func);
}
if(visiting){
  for (var i = 0; i < c.length; i++) {
    c[i].view = true;
  }
}

function all_note_in_Key(k) {
  k = parseInt(k);
  var all_notes_in_key_str =[];
  var all_notes_in_key_greek = new Map();
  switch (k) {
    case 0:
      all_notes_in_key_str = ["C#","D#","F","F#","G#","A#","C"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 1:
      all_notes_in_key_str = ["F#","G#","A#","B","C#","D#","F"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 2:
      all_notes_in_key_str = ["B","C#","D#","E","F#","G#","A#"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 3:
      all_notes_in_key_str = ["E","F#","G#","A","B","C#","D#"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 4:
      all_notes_in_key_str = ["A","B","C#","D","E","F#","G#"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 5:
      all_notes_in_key_str = ["D","E","F#","G","A","B","C#"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 6:
      all_notes_in_key_str = ["G","A","B","C","D","E","F#"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 7:
      all_notes_in_key_str = ["C","D","E","F","G","A","B"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 8:
      all_notes_in_key_str = ["F","G","A","Bb","C","D","E"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 9:
      all_notes_in_key_str = ["Bb","C","D","Eb","F","G","A"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 10:
      all_notes_in_key_str = ["Eb","F","G","Ab","Bb","C","D"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 11:
      all_notes_in_key_str = ["Ab","Bb","C","Db","Eb","F","G"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 12:
      all_notes_in_key_str = ["Db","Eb","F","Gb","Ab","Bb","C"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 13:
      all_notes_in_key_str = ["Gb","Ab","Bb","B","Db","Eb","F"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
    case 14:
      all_notes_in_key_str = ["Cb","Db","Eb","E","Gb","Ab","Bb"];
      for(var i = 0; i<7; i++){
        all_notes_in_key_greek.set(all_notes_in_key_str[i], greek_order[i]);
      }
    break;
  }
  return [all_notes_in_key_str, all_notes_in_key_greek]
}
function drawNotes(s, n) {
  n.pre_ypos = s.y_indexs[n.y]*(n.height/12);
  switch (n.av) {
    case -1:
      if(n.mv >= 32 && n.mv <= 43){
        n.octave_control = -2;
      }else if(n.mv >= 44 && n.mv <= 55){
        n.octave_control = -1;
      }else if(n.mv >= 56 && n.mv <= 84){
        n.octave_control = 0;
      }else if(n.mv >= 85 && n.mv <= 96){
        n.octave_control = 1;
      }else if(n.mv >= 97 && n.mv <= 108){
        n.octave_control = 2;
      }
    break;
    case 0:
      if(n.mv >= 33 && n.mv <= 43){
        n.octave_control = -2;
      }else if(n.mv >= 45 && n.mv <= 55){
        n.octave_control = -1;
      }else if(n.mv >= 57 && n.mv <= 84){
        n.octave_control = 0;
      }else if(n.mv >= 86 && n.mv <= 96){
        n.octave_control = 1;
      }else if(n.mv >= 98 && n.mv <= 108){
        n.octave_control = 2;
      }
    break;
    case 1:
      if(n.mv >= 33 && n.mv <= 44){
        n.octave_control = -2;
      }else if(n.mv >= 45 && n.mv <= 56){
        n.octave_control = -1;
      }else if(n.mv >= 57 && n.mv <= 85){
        n.octave_control = 0;
      }else if(n.mv >= 86 && n.mv <= 97){
        n.octave_control = 1;
      }else if(n.mv >= 98 && n.mv <= 109){
        n.octave_control = 2;
      }
    break;
  }
  if(n.completePlet){
    if(!n.four_compound_connected[0]&&!n.four_compound_connected[1]&&
      !n.five_compound_connected[0]&&!n.five_compound_connected[1]){
      n.triplet=true;
    }else{
      n.triplet=false;
    }
  }
  if(n.four_connected|| ///////
    n.two_connected||   ///////
    n.compound_connected||
    n.three_compound_connected[0]|| //886
    n.three_compound_connected[1]|| //688
    n.three_compound_connected[2]|| //868
    n.two_compound_connected[0]||//58
    n.two_compound_connected[1]||//85
    n.four_compound_connected[0]||//3336
    n.four_compound_connected[1]||//6333
    n.five_compound_connected[0]||//3338
    n.five_compound_connected[1]||//8333
    n.completePlet||
    n.triplet){
      n.stem = false;
  }else{
    n.stem = true;
    if (n.y<=7){
      n.direction = "down";
    }else{
      n.direction = "up";
    }
  }
  if(n.groupHasRest){
    n.stem = true;
    if (n.y<=7){
      n.direction = "down";
    }else{
      n.direction = "up";
    }
  }
  if(n.pc == 1&&!n.completePlet){
    switch (n.bt) {
      case 12:
      s.noFill();
      s.stroke(255,0,0,130);
          s.line(n.x, 5.5*(n.height/12), n.x + n.width/4, 5.5*(n.height/12));
        break;
        case 14:
        s.noFill();
        s.stroke(255,0,0,130);
            s.line(n.x, 5.5*(n.height/12), n.x + n.width/6, 5.5*(n.height/12));

          break;
          case 16:
          s.noFill();
          s.stroke(255,0,0,130);
              s.line(n.x, 5.5*(n.height/12), n.x + n.width/11, 5.5*(n.height/12));

            break;
            case 18:
            s.noFill();
            s.stroke(255,0,0,130);
                s.line(n.x, 5.5*(n.height/12), n.x + n.width/17, 5.5*(n.height/12));

              break;
      default:

    }
  }
  if(n.r == 'false'){

    s.strokeWeight(1);
    s.stroke(s.music_color_op);
    if(s.selected || s.view){
      s.stroke(s.music_color);
    }
    switch (n.y) {
      case 0:
        s.line(n.x - n.height/12, y_indexs[n.y+2]*(n.height/12),
        n.x + n.height/12, y_indexs[n.y+2]*(n.height/12));
      case 2:
        s.line(n.x - n.height/12 , n.pre_ypos,
        n.x + n.height/12 , n.pre_ypos);
      break;
      case 16:
        s.line(n.x - n.height/12 , y_indexs[n.y-2]*(n.height/12),
        n.x + n.height/12 , y_indexs[n.y-2]*(n.height/12));
      case 14:
        s.line(n.x - n.height/12 , n.pre_ypos,
        n.x + n.height/12 , n.pre_ypos);
      break;
      case 1:
        s.line(n.x - n.height/12 , y_indexs[n.y+1]*(n.height/12),
        n.x + n.height/12 , y_indexs[n.y+1]*(n.height/12));
      break;
      case 15:
        s.line(n.x - n.height/12 , y_indexs[n.y-1]*(n.height/12),
        n.x + n.height/12 , y_indexs[n.y-1]*(n.height/12));
      break;
    }

    s.fill(s.music_color_op);
    if(s.selected || s.view){
      s.fill(s.music_color);
    }
    if(n.selected){
      s.fill(0,0,255);
    }
    if(n.bt >2&& n.bt != 12){
       s.noStroke();
       s.push();
       s.translate(n.x , n.pre_ypos);

       s.rotate(s.radians(-30));
       s.ellipse(0 , 0, 1.3*n.height/12, .9*n.height/12);
       s.pop();
     }else if(n.bt <=2 ||n.bt ==12){
       s.noStroke();
       s.push();
       s.translate(n.x , n.pre_ypos);

          if(n.bt !=0){
            s.rotate(s.radians(-30));
          }
          s.beginShape();
        for(let theta = 0; theta< s.TWO_PI; theta += s.TWO_PI/120){
          s.vertex(-1.4*n.height/24*s.cos(theta),-1*n.height/24*s.sin(theta));
        }

      s.endShape();
      s.fill(s.bg);
      s.beginShape();
        s.vertex(-1.3*n.height/24, 0);
        s.vertex(0, 0.7*n.height/24);
        s.vertex(1.3*n.height/24, 0);
        s.vertex(0, -0.7*n.height/24);
      s.endShape();
          s.pop();
     }

     s.stroke(s.music_color_op);
     s.fill(s.music_color_op);
     if(s.selected || s.view){
       s.stroke(s.music_color);
       s.fill(s.music_color);
     }

    s.strokeWeight(n.width/400);
    if(n.stem){
      switch(n.bt){
        case 0://0 being whole note
        break;
        case 1://1 being second note with dot
                  if (n.y<=7){

                      s.beginShape();
                      s.curveVertex(n.x -n.height/24, n.pre_ypos);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos+110*n.height/400);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos+110*n.height/400);
                      s.endShape();

                       }else{

                      s.beginShape();
                      s.curveVertex(n.x +n.height/24, n.pre_ypos);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.endShape();
                       }
          break;
          case 12:
          case 2://2 being second note
                  if (n.y<=7){

                      s.beginShape();
                      s.curveVertex(n.x -n.height/24, n.pre_ypos);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos+110*n.height/400);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos+110*n.height/400);
                      s.endShape();

                       }else{
                      s.beginShape();
                      s.curveVertex(n.x +n.height/24, n.pre_ypos);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.endShape();
                       }
          break;
          case 3://3 being quarter note with dot
                  if (n.y<=7){

                      s.beginShape();
                      s.curveVertex(n.x -n.height/24, n.pre_ypos);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos+110*n.height/400);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos+110*n.height/400);
                      s.endShape();

                       }else{

                      s.beginShape();
                      s.curveVertex(n.x +n.height/24, n.pre_ypos);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.endShape();
                       }
          break;
          case 14:
          case 4://4 being quarter note
                  if (n.y<=7){

                      s.beginShape();
                      s.curveVertex(n.x -n.height/24, n.pre_ypos);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos+110*n.height/400);
                      s.curveVertex(n.x -n.height/24, n.pre_ypos+110*n.height/400);
                      s.endShape();

                       }else{
                      s.beginShape();
                      s.curveVertex(n.x +n.height/24, n.pre_ypos);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.curveVertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.endShape();
                       }
          break;
          case 5:
          if (n.y<=7){
            s.noFill();
                      s.beginShape();
                      s.vertex(n.x -n.height/24, n.pre_ypos);
                      s.vertex(n.x -n.height/24, n.pre_ypos);
                      s.vertex(n.x -n.height/24, n.pre_ypos+120*n.height/400);
                      s.curveVertex(n.x -5*n.width/700, n.pre_ypos+90*n.height/400);
                      s.bezierVertex(n.x  + 6*n.width/700, n.pre_ypos +40*n.height/400,
                        n.x -6*n.width/700, n.pre_ypos+90*n.height/400,
                        n.x +4*n.width/700, n.pre_ypos+13*n.height/400);
                      s.curveVertex(n.x +6*n.width/700, n.pre_ypos+11*n.height/400);
                      s.vertex(n.x +2*n.width/700, n.pre_ypos+2*n.height/400);
                      s.endShape();

                       }else{
                         s.noFill();
                      s.beginShape();
                      s.vertex(n.x +n.height/24, n.pre_ypos);
                      s.vertex(n.x +n.height/24, n.pre_ypos);
                      s.vertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.curveVertex(n.x +14*n.width/700, n.pre_ypos-105*n.height/400);
                       s.bezierVertex(n.x + 28*n.width/700, n.pre_ypos-95*n.height/400,
                                    n.x +14*n.width/700, n.pre_ypos-105*n.height/400,
                                    n.x +30*n.width/700, n.pre_ypos - 18*n.height/400);
                      s.curveVertex(n.x +17*n.width/700, n.pre_ypos-12*n.height/400);
                      s.vertex(n.x +14*n.width/700, n.pre_ypos-6*n.height/400);
                      s.endShape();
                       }
          break;
          case 16:
          case 6:
          if (n.y<=7){
            s.noFill();
                      s.beginShape();
                      s.vertex(n.x -n.height/24, n.pre_ypos);
                      s.vertex(n.x -n.height/24, n.pre_ypos);
                      s.vertex(n.x -n.height/24, n.pre_ypos+120*n.height/400);
                      s.curveVertex(n.x -5*n.width/700, n.pre_ypos+90*n.height/400);
                      s.bezierVertex(n.x  + 6*n.width/700, n.pre_ypos +50*n.height/400,
                        n.x -6*n.width/700, n.pre_ypos+90*n.height/400,
                        n.x +4*n.width/700, n.pre_ypos+13*n.height/400);
                      s.curveVertex(n.x +6*n.width/700, n.pre_ypos+11*n.height/400);
                      s.vertex(n.x +2*n.width/700, n.pre_ypos+2*n.height/400);
                      s.endShape();


                       }else{
                         s.noFill();
                      s.beginShape();
                      s.vertex(n.x +n.height/24, n.pre_ypos);
                      s.vertex(n.x +n.height/24, n.pre_ypos);
                      s.vertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.curveVertex(n.x +10*n.width/700, n.pre_ypos-105*n.height/400);
                       s.bezierVertex(n.x + 20*n.width/700, n.pre_ypos-95*n.height/400,
                                    n.x +10*n.width/700, n.pre_ypos-105*n.height/400,
                                    n.x +22*n.width/700, n.pre_ypos - 18*n.height/400);
                      s.curveVertex(n.x +13*n.width/700, n.pre_ypos-12*n.height/400);
                      s.vertex(n.x +10*n.width/700, n.pre_ypos-6*n.height/400);
                      s.endShape();
                         }
          break;
          case 7:
          if (n.y<=7){
            s.noFill();
                      s.beginShape();
                      s.vertex(n.x -n.height/24, n.pre_ypos);
                      s.vertex(n.x -n.height/24, n.pre_ypos);
                      s.vertex(n.x -n.height/24, n.pre_ypos+120*n.height/400);
                      s.curveVertex(n.x -6*n.width/700, n.pre_ypos+100*n.height/400);
                      s.bezierVertex(n.x  + n.height/24, n.pre_ypos +70*n.height/400,
                        n.x -6*n.width/700, n.pre_ypos+80*n.height/400,
                        n.x +5*n.width/700, n.pre_ypos+53*n.height/400);
                      s.curveVertex(n.x +3*n.width/700, n.pre_ypos+40*n.height/400);
                       s.vertex(n.x +3*n.width/700, n.pre_ypos+40*n.height/400);
                      s.endShape();
                      s.beginShape();
                        s.vertex(n.x -n.height/24, n.pre_ypos+90*n.height/400);
                        s.vertex(n.x -n.height/24, n.pre_ypos+90*n.height/400);
                        s.bezierVertex(n.x  + n.height/24, n.pre_ypos +40*n.height/400,
                          n.x -6*n.width/700, n.pre_ypos+80*n.height/400,
                          n.x +5*n.width/700, n.pre_ypos+53*n.height/400);
                          s.curveVertex(n.x +7*n.width/700, n.pre_ypos+11*n.height/400);
                          s.vertex(n.x +3*n.width/700, n.pre_ypos+2*n.height/400);
                      s.endShape();

                       }else{
                         s.noFill();
                      s.beginShape();
                      s.vertex(n.x +n.height/24, n.pre_ypos);
                      s.vertex(n.x +n.height/24, n.pre_ypos);
                      s.vertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.curveVertex(n.x +14*n.width/700, n.pre_ypos-105*n.height/400);
                       s.bezierVertex(n.x + 28*n.width/700, n.pre_ypos-105*n.height/400,
                                    n.x +14*n.width/700, n.pre_ypos-105*n.height/400,
                                    n.x +30*n.width/700, n.pre_ypos - 18*n.height/400);
                      s.curveVertex(n.x +17*n.width/700, n.pre_ypos-52*n.height/400);
                      s.vertex(n.x +14*n.width/700, n.pre_ypos-6*n.height/400);
                      s.endShape();
                      s.beginShape();
                      s.vertex(n.x +n.height/24, n.pre_ypos-90*n.height/400);
                      s.vertex(n.x +n.height/24, n.pre_ypos-90*n.height/400);
                      s.curveVertex(n.x +12*n.width/700, n.pre_ypos-85*n.height/400)
                      s.bezierVertex(n.x + 28*n.width/700, n.pre_ypos-70*n.height/400,
                                   n.x +14*n.width/700, n.pre_ypos-60*n.height/400,
                                   n.x +30*n.width/700, n.pre_ypos - 18*n.height/400);
                     s.curveVertex(n.x +17*n.width/700, n.pre_ypos-22*n.height/400);
                     s.vertex(n.x +14*n.width/700, n.pre_ypos-6*n.height/400);
                      s.endShape();

                       }
          break;
          case 18:
          case 8:
          if (n.y<=7){
            s.noFill();
                      s.beginShape();
                      s.vertex(n.x -n.height/24, n.pre_ypos);
                      s.vertex(n.x -n.height/24, n.pre_ypos);
                      s.vertex(n.x -n.height/24, n.pre_ypos+120*n.height/400);
                      s.curveVertex(n.x -5*n.width/700, n.pre_ypos+100*n.height/400);
                      s.bezierVertex(n.x  + n.height/24, n.pre_ypos +70*n.height/400,
                        n.x -6*n.width/700, n.pre_ypos+80*n.height/400,
                        n.x +4*n.width/700, n.pre_ypos+53*n.height/400);
                      s.curveVertex(n.x +2*n.width/700, n.pre_ypos+40*n.height/400);
                       s.vertex(n.x +2*n.width/700, n.pre_ypos+40*n.height/400);
                      s.endShape();
                      s.beginShape();
                        s.vertex(n.x -n.height/24, n.pre_ypos+90*n.height/400);
                        s.vertex(n.x -n.height/24, n.pre_ypos+90*n.height/400);
                        s.bezierVertex(n.x  + n.height/24, n.pre_ypos +40*n.height/400,
                          n.x -5*n.width/700, n.pre_ypos+80*n.height/400,
                          n.x +4*n.width/700, n.pre_ypos+53*n.height/400);
                          s.curveVertex(n.x +6*n.width/700, n.pre_ypos+11*n.height/400);
                          s.vertex(n.x +2*n.width/700, n.pre_ypos+2*n.height/400);
                      s.endShape();


                       }else{
                         s.noFill();
                      s.beginShape();
                      s.vertex(n.x +n.height/24, n.pre_ypos);
                      s.vertex(n.x +n.height/24, n.pre_ypos);
                      s.vertex(n.x +n.height/24, n.pre_ypos-110*n.height/400);
                      s.curveVertex(n.x +10*n.width/700, n.pre_ypos-105*n.height/400);
                       s.bezierVertex(n.x + 20*n.width/700, n.pre_ypos-105*n.height/400,
                                    n.x +10*n.width/700, n.pre_ypos-105*n.height/400,
                                    n.x +22*n.width/700, n.pre_ypos - 18*n.height/400);
                      s.curveVertex(n.x +13*n.width/700, n.pre_ypos-52*n.height/400);
                      s.vertex(n.x +10*n.width/700, n.pre_ypos-6*n.height/400);
                      s.endShape();
                      s.beginShape();
                      s.vertex(n.x +n.height/24, n.pre_ypos-90*n.height/400);
                      s.vertex(n.x +n.height/24, n.pre_ypos-90*n.height/400);
                      s.curveVertex(n.x +10*n.width/700, n.pre_ypos-85*n.height/400)
                      s.bezierVertex(n.x + 20*n.width/700, n.pre_ypos-70*n.height/400,
                                   n.x +10*n.width/700, n.pre_ypos-60*n.height/400,
                                   n.x +22*n.width/700, n.pre_ypos - 18*n.height/400);
                     s.curveVertex(n.x +13*n.width/700, n.pre_ypos-22*n.height/400);
                     s.vertex(n.x +10*n.width/700, n.pre_ypos-6*n.height/400);
                      s.endShape();

                       }
          break;
      }
    }
    if(n.bt == 1 ||
    n.bt == 3 ||
    n.bt == 5 ||
    n.bt == 7){
      s.strokeWeight(n.width/150);
      s.point(n.x +17*n.width/700, n.pre_ypos+2*n.height/400);
    }
    s.stroke(s.music_color_op);
    s.fill(s.music_color_op);
    if(s.selected || s.view){
      s.stroke(s.music_color);
      s.fill(s.music_color);
    }
    s.strokeWeight(n.width/400);
    if(n.as == "true"){
      switch(n.av){
        case 0:
        s.noFill();
        s.stroke(s.music_color_op);
        if(s.selected || s.view){
          s.stroke(s.music_color);
        }
          s.DrawNat(n.x  - 15*n.width/350, n.pre_ypos - n.height/16, 16*n.width/350, n.height/8);
        break;
        case -1:
        s.noFill();
        s.stroke(s.music_color_op);
        if(s.selected || s.view){
          s.stroke(s.music_color);
        }
          s.DrawFlat(n.x  - 15*n.width/350, n.pre_ypos - n.height/13, 18*n.width/350, n.height/8);
        break;
        case 1:
        s.noFill();
        s.stroke(s.music_color_op);
        if(s.selected || s.view){
          s.stroke(s.music_color);
        }
          s.DrawSharp(n.x  - 13*n.width/350, n.pre_ypos - n.height/21, 10*n.width/350, n.height/11);
        break;
      }
    }
  }else{

    var c;
    if(n.selected){
      c = s.color(0,0,255);
    }else{
      c = s.color(s.music_color_op);
      if(s.selected || s.view){
        c = s.color(s.music_color);
      }
    }
    switch(n.bt){
      case 0:
        drawWhole(s, n.x  - n.width/34, 3*(n.height/12), n.width/20, y_indexs[11]*(n.height/12), c);
      break;
      case 1:
        drawDHalf(s, n.x  - n.width/34, 2.5*(n.height/12), n.width/20, y_indexs[11]*(n.height/12), c);
      break;
      case 2:
      case 12:
        drawHalf(s, n.x  - n.width/34, 2.5*(n.height/12), n.width/20, y_indexs[11]*(n.height/12), c);
      break;
      case 3:
        drawDQut(s, n.x - n.width/34, 2.5*(n.height/12), n.width/20, y_indexs[11]*(n.height/12), c);
      break;
      case 4:
      case 14:
        drawQut(s, n.x - n.width/34, 2.5*(n.height/12), n.width/20, y_indexs[11]*(n.height/12), c);
      break;
      case 5:
        darwDEighth(s, n.x , 6.5*(n.height/12), n.width/40, 2*(n.height/12), c);
      break;
      case 6:
      case 16:
        darwEighth(s, n.x , 6.5*(n.height/12), n.width/40, 2*(n.height/12), c);
      break;
      case 7:
        darwDSixteenth(s, n.x , 5.5*(n.height/12), n.width/40, 2*(n.height/12), c);
      break;
      case 8:
      case 18:
        darwSixteenth(s, n.x , 5.5*(n.height/12), n.width/40, 2*(n.height/12), c);
      break;
    }
  }

}

function drawtwoconnected(s, i){
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y];
 var slp = up_down_decider(arry);
 s.noFill();
 s.stroke(s.music_color_op);
   if(s.selected || s.view){
   s.stroke(s.music_color);
 }
 s.strokeWeight(contentsWidth/400);

 if(slp == "down"){
   s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
   s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos + lineLength);
   s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
   if(s.n[i].bt == 8){
     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos + lineLength*.8, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength*.8);
   }
   for(let t = 0; t < arry.length; t++){
     s.n[i+t].direction = "down";
   }
 }else{
   s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
   s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos - lineLength);
   s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
   if(s.n[i].bt == 8){
     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos - lineLength*.8, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength*.8);
   }
   for(let t = 0; t < arry.length; t++){
     s.n[i+t].direction = "up";
   }
 }
}
function drawFourConnected(s, i){
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y,s.n[i+2].y,s.n[i+3].y];
 var slp = up_down_decider(arry);
 var ra = most_radical(arry);

 s.noFill();
 s.stroke(s.music_color_op);
   if(s.selected || s.view){
   s.stroke(s.music_color);
 }
 s.strokeWeight(contentsWidth/400);

 if(s.n[i].r=="false"&&s.n[i+1].r=="false"&&s.n[i+2].r=="false"&&s.n[i+3].r=="false"){
   if(steep_steady(arry) == 1){ // steep
     if(slp == 'down'){
       var x = s.n[i].x   - lineStart;
       var y = s.n[i].pre_ypos + lineLength;
       var x1  = s.n[i+3].x   - lineStart;
       var y1  = s.n[i+3].pre_ypos + lineLength;

       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
       s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos + lineLength);
       s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
       if(s.n[i].bt==8){
         s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos + lineLength*.8, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength*.8);
       }

       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));
         s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart,
           slopeCalc(x,y,x1,y1, s.n[i+2].x   - lineStart));
           for(let t = 0; t < arry.length; t++){
             s.n[i+t].direction = "down";
           }
     }else{
       var x = s.n[i].x   + lineStart;
       var y = s.n[i].pre_ypos - lineLength;
       var x1  = s.n[i+3].x   + lineStart;
       var y1  = s.n[i+3].pre_ypos - lineLength;

       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
       s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos - lineLength);
       s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
       if(s.n[i].bt==8){
         s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos - lineLength*.8, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength*.8);
       }

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   + lineStart));
         s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,
           slopeCalc(x,y,x1,y1, s.n[i+2].x   + lineStart));
           for(let t = 0; t < arry.length; t++){
             s.n[i+t].direction = "up";
           }
     }
   }else{ //steady
     if(slp == 'down'){

       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       if(s.n[i].bt==8){
         s.line(s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);
       }

       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
         s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "down";
         }
     }else{

       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+3].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       if(s.n[i].bt==8){
         s.line(s.n[i+3].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);
       }

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
         s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "up";
         }
     }
   }
 }else{
   s.n[i].groupHasRest = true;
   s.n[i+1].groupHasRest = true;
   s.n[i+2].groupHasRest = true;
   s.n[i+3].groupHasRest = true;
 }


}
function drawThreeConnected_0(s, i) {
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y,s.n[i+2].y];
 var slp = up_down_decider(arry);
 var ra = most_radical(arry);

 if(s.n[i].r == "false"&&s.n[i+1].r == "false"&&s.n[i+2].r == "false"){
   if(steep_steady(arry) == 1){ // steep
     if(slp == 'down'){
       var x = s.n[i].x   - lineStart;
       var y = s.n[i].pre_ypos + lineLength;
       var x1  = s.n[i+2].x   - lineStart;
       var y1  = s.n[i+2].pre_ypos + lineLength;
       var y2 = s.n[i].pre_ypos + lineLength*.8;
       var y3  = s.n[i+2].pre_ypos + lineLength*.8;
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);

       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength*.8, s.n[i+1].x   - lineStart,
         slopeCalc(x,y2,x1,y3, s.n[i+1].x   - lineStart));

       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "down";
         }
     }else{
       var x = s.n[i].x   + lineStart;
       var y = s.n[i].pre_ypos - lineLength;
       var x1  = s.n[i+2].x   + lineStart;
       var y1  = s.n[i+2].pre_ypos - lineLength;
       var y2 = s.n[i].pre_ypos - lineLength*.8;
       var y3  = s.n[i+2].pre_ypos - lineLength*.8;
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);

       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength*.8, s.n[i+1].x   + lineStart,
         slopeCalc(x,y2,x1,y3, s.n[i+1].x   + lineStart));

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   + lineStart));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "up";
         }
     }
   }else{ //steady
     if(slp == 'down'){
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

       s.line(s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);

       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "down";
       }
     }else{
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);

       s.line(s.n[i+1].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "up";
       }
     }
   }
 }else{
   s.n[i].groupHasRest = true;
   s.n[i+1].groupHasRest = true;
   s.n[i+2].groupHasRest = true;
 }

}
function drawThreeConnected_1(s, i) {
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y,s.n[i+2].y];
 var slp = up_down_decider(arry);
 var ra = most_radical(arry);

 if(s.n[i].r == "false"&&s.n[i+1].r == "false"&&s.n[i+2].r == "false"){
   if(steep_steady(arry) == 1){ // steep
     if(slp == 'down'){
       var x = s.n[i].x   - lineStart;
       var y = s.n[i].pre_ypos + lineLength;
       var x1  = s.n[i+2].x   - lineStart;
       var y1  = s.n[i+2].pre_ypos + lineLength;
       var y2 = s.n[i].pre_ypos + lineLength*.8;
       var y3  = s.n[i+2].pre_ypos + lineLength*.8;
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);

       //---------
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength*.8, s.n[i+1].x   - lineStart,
         slopeCalc(x,y2,x1,y3, s.n[i+1].x   - lineStart));
       //||||||||||||||||||||
       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "down";
         }
     }else{
       var x = s.n[i].x   + lineStart;
       var y = s.n[i].pre_ypos - lineLength;
       var x1  = s.n[i+2].x   + lineStart;
       var y1  = s.n[i+2].pre_ypos - lineLength;
       var y2 = s.n[i].pre_ypos - lineLength*.8;
       var y3  = s.n[i+2].pre_ypos - lineLength*.8;
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);

       s.line(s.n[i+1].x   + lineStart, slopeCalc(x,y2,x1,y3, s.n[i+1].x   + lineStart), s.n[i+2].x   + lineStart,
         slopeCalc(x,y2,x1,y3, s.n[i+2].x   + lineStart));

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   + lineStart));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "up";
         }
     }
   }else{ //steady
     if(slp == 'down'){
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

       s.line(s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);

       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "down";
       }
     }else{
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);

       s.line(s.n[i+1].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "up";
       }
     }
   }
 }else{
   s.n[i].groupHasRest = true;
   s.n[i+1].groupHasRest = true;
   s.n[i+2].groupHasRest = true;
 }
}
function drawThreeConnected_2(s, i) {
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y,s.n[i+2].y];
 var slp = up_down_decider(arry);
 var ra = most_radical(arry);

 if(s.n[i].r == "false"&&s.n[i+1].r == "false"&&s.n[i+2].r == "false"){
   if(steep_steady(arry) == 1){ // steep
     if(slp == 'down'){
       var x = s.n[i].x   - lineStart;
       var y = s.n[i].pre_ypos + lineLength;
       var x1  = s.n[i+2].x   - lineStart;
       var y1  = s.n[i+2].pre_ypos + lineLength;
       var y2 = s.n[i].pre_ypos + lineLength*.8;
       var y3  = s.n[i+2].pre_ypos + lineLength*.8;
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);

       //---------
       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength*.8, s.n[i].x   + lineStart,
         slopeCalc(x,y2,x1,y3, s.n[i].x   + lineStart));
         s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength*.8, s.n[i+2].x   - lineStart*3,
           slopeCalc(x,y2,x1,y3, s.n[i+2].x   - lineStart*3));
       //||||||||||||||||||||
       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "down";
         }
     }else{
       var x = s.n[i].x   + lineStart;
       var y = s.n[i].pre_ypos - lineLength;
       var x1  = s.n[i+2].x   + lineStart;
       var y1  = s.n[i+2].pre_ypos - lineLength;
       var y2 = s.n[i].pre_ypos - lineLength*.8;
       var y3  = s.n[i+2].pre_ypos - lineLength*.8;
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);

       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength*.8, s.n[i].x   + lineStart*3,
         slopeCalc(x,y2,x1,y3, s.n[i].x   + lineStart*3));
           s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength*.8, s.n[i+2].x   - lineStart,
             slopeCalc(x,y2,x1,y3, s.n[i+2].x   - lineStart));

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   + lineStart));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "up";
         }
     }
   }else{ //steady
     if(slp == 'down'){
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

       s.line(s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i].x   + lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);
       s.line(s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i+2].x   - lineStart*3, s.n[i+ra[1]].pre_ypos + lineLength*.8);

       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "down";
       }
     }else{
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);

       s.line(s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i].x   + lineStart*3, s.n[i+ra[0]].pre_ypos - lineLength*.8);
       s.line(s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i+2].x   - lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "up";
       }
     }
   }
 }else{
   s.n[i].groupHasRest = true;
   s.n[i+1].groupHasRest = true;
   s.n[i+2].groupHasRest = true;
 }


}
function drawTwoComConnected_0(s, i) {
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y];
 var slp = up_down_decider(arry);

 if(s.n[i].r == "false"&&s.n[i+1].r == "false"){
   if(slp == "down"){
     var x = s.n[i].x   - lineStart;
     var y = s.n[i].pre_ypos + lineLength*.8;
     var x1  = s.n[i+1].x   - lineStart;
     var y1  = s.n[i+1].pre_ypos + lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos + lineLength);
     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);

       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos + lineLength*.8, s.n[i+1].x   - lineStart*3,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart*3));

         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "down";
         }
   }else{
     var x = s.n[i].x   + lineStart;
     var y = s.n[i].pre_ypos - lineLength*.8;
     var x1  = s.n[i+1].x   + lineStart;
     var y1  = s.n[i+1].pre_ypos - lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos - lineLength);
     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos - lineLength*.8, s.n[i+1].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));

         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "up";
         }
   }
 }else{
   s.n[i].groupHasRest = true;
   s.n[i+1].groupHasRest = true;
 }


}
function drawTwoComConnected_1(s, i) {
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y];
 var slp = up_down_decider(arry);

 if(s.n[i].r == "false"&&s.n[i+1].r == "false"){
   if(slp == "down"){
     var x = s.n[i].x   - lineStart;
     var y = s.n[i].pre_ypos + lineLength*.8;
     var x1  = s.n[i+1].x   - lineStart;
     var y1  = s.n[i+1].pre_ypos + lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos + lineLength);
     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);

       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength*.8, s.n[i].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i].x   + lineStart));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "down";
         }
   }else{
     var x = s.n[i].x   + lineStart;
     var y = s.n[i].pre_ypos - lineLength*.8;
     var x1  = s.n[i+1].x   + lineStart;
     var y1  = s.n[i+1].pre_ypos - lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos - lineLength);
     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);

       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength*.8, s.n[i].x   + lineStart*3,
         slopeCalc(x,y,x1,y1, s.n[i].x   + lineStart*3));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "up";
         }
   }
 }else{
   s.n[i].groupHasRest = true;
   s.n[i+1].groupHasRest = true;
 }
}
function drawFourComConnected_0(s, i){
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y,s.n[i+2].y,s.n[i+3].y];
 var slp = up_down_decider(arry);
 var ra = most_radical(arry);
 var three_vertical=lineLength*.3;

 if(steep_steady(arry) == 1){ // steep
   if(slp == 'down'){
     var x = s.n[i].x   - lineStart;
     var y = s.n[i].pre_ypos + lineLength;
     var x1  = s.n[i+3].x   - lineStart;
     var y1  = s.n[i+3].pre_ypos + lineLength;
     var y2 = s.n[i].pre_ypos + lineLength*.8;
     var y3  = s.n[i+3].pre_ypos + lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
     s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos + lineLength);
     s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);


     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart,
       slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+2].x   - lineStart));

      s.line(x,
           y2,
           s.n[i+2].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i+2].x   - lineStart));

           /////3/////
           s.line(x,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
             x,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.line(s.n[i+2].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
             s.n[i+2].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

           s.line(x,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
             s.n[i+1].x   - lineStart - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.line(s.n[i+2].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
             s.n[i+1].x   - lineStart + lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.textAlign(s.CENTER,s.CENTER);
           s.textSize(three_vertical);
           s.strokeWeight(contentsWidth/800);
           s.text("3",s.n[i+1].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.strokeWeight(contentsWidth/400);
           for(let t = 0; t < arry.length; t++){
             s.n[i+t].direction = "down";
           }
   }else{
     var x = s.n[i].x   + lineStart;
     var y = s.n[i].pre_ypos - lineLength;
     var x1  = s.n[i+3].x   + lineStart;
     var y1  = s.n[i+3].pre_ypos - lineLength;
     var y2  = s.n[i].pre_ypos - lineLength;
     var y3  = s.n[i+3].pre_ypos - lineLength;
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
     s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos - lineLength);
     s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);


     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,
       slopeCalc(x,y,x1,y1, s.n[i+1].x   + lineStart));
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+2].x   + lineStart));

         s.line(x,
              y2,
              s.n[i+2].x   + lineStart,
              slopeCalc(x,y2,x1,y3, s.n[i+2].x   + lineStart));
              /////////////////////3//////////////////////////
              s.line(x, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1, x, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
              s.line(s.n[i+2].x   + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                s.n[i+2].x   + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

              s.line(x,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                s.n[i+1].x   + lineStart - lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
              s.line(s.n[i+2].x   + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                s.n[i+1].x   + lineStart + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

              s.textAlign(s.CENTER,s.CENTER);
              s.textSize(three_vertical);
              s.strokeWeight(contentsWidth/800);
              s.text("3",s.n[i+1].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
              s.strokeWeight(contentsWidth/400);
              for(let t = 0; t < arry.length; t++){
                s.n[i+t].direction = "up";
              }
   }
 }else{ //steady
   if(slp == 'down'){
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
     s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
     s.line(s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

       s.line(s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);

       /////////////////////3//////////////////////////
       s.line(s.n[i].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
         s.n[i].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(s.n[i+2].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
         s.n[i+2].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

       s.line(s.n[i].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
         s.n[i+1].x   - lineStart - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(s.n[i+2].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
         s.n[i+1].x   - lineStart + lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+1].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.strokeWeight(contentsWidth/400);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "down";
       }
   }else{
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
     s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
     s.line(s.n[i+3].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);

     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);

       s.line(s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);

       /////////////////////3//////////////////////////
       s.line(s.n[i].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
         s.n[i].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(s.n[i+2].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
         s.n[i+2].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.line(s.n[i].x   + lineStart,

         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
         s.n[i+1].x   + lineStart - lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(s.n[i+2].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
         s.n[i+1].x   + lineStart + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+1].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.strokeWeight(contentsWidth/400);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "up";
       }
   }
 }
}
function drawFourComConnected_1(s, i){
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y,s.n[i+2].y,s.n[i+3].y];
 var slp = up_down_decider(arry);
 var ra = most_radical(arry);
 var three_vertical=lineLength*.3;

 if(steep_steady(arry) == 1){ // steep
   if(slp == 'down'){
     var x = s.n[i].x   - lineStart;
     var y = s.n[i].pre_ypos + lineLength;
     var x1  = s.n[i+3].x   - lineStart;
     var y1  = s.n[i+3].pre_ypos + lineLength;
     var y2 = s.n[i].pre_ypos + lineLength*.8;
     var y3  = s.n[i+3].pre_ypos + lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
     s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos + lineLength);
     s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);


     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart,
       slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+2].x   - lineStart));

      s.line(s.n[i+1].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i+1].x   - lineStart),
           s.n[i+3].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i+3].x   - lineStart));

           /////3/////
           s.line(s.n[i+1].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
             s.n[i+1].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.line(s.n[i+3].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
             s.n[i+3].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

           s.line(s.n[i+1].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
             s.n[i+2].x   - lineStart - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.line(s.n[i+3].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
             s.n[i+2].x   - lineStart + lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.textAlign(s.CENTER,s.CENTER);
           s.textSize(three_vertical);
           s.strokeWeight(contentsWidth/800);
           s.text("3",s.n[i+2].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.strokeWeight(contentsWidth/400);
           for(let t = 0; t < arry.length; t++){
             s.n[i+t].direction = "down";
           }
   }else{
     var x = s.n[i].x   + lineStart;
     var y = s.n[i].pre_ypos - lineLength;
     var x1  = s.n[i+3].x   + lineStart;
     var y1  = s.n[i+3].pre_ypos - lineLength;
     var y2  = s.n[i].pre_ypos - lineLength*.8;
     var y3  = s.n[i+3].pre_ypos - lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
     if(s.selected || s.view){
     s.stroke(s.music_color);
   }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
     s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos - lineLength);
     s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);


     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,
       slopeCalc(x,y,x1,y1, s.n[i+1].x   + lineStart));
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+2].x   + lineStart));

         s.line(s.n[i+1].x   + lineStart,
              slopeCalc(x,y2,x1,y3, s.n[i+1].x   + lineStart),
              s.n[i+3].x   + lineStart,
              slopeCalc(x,y2,x1,y3, s.n[i+3].x   + lineStart));

              /////////////////////3//////////////////////////
              s.line(s.n[i+1].x   + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                s.n[i+1].x   + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
              s.line(s.n[i+3].x   + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                s.n[i+3].x   + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

              s.line(s.n[i+1].x   + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                s.n[i+2].x   + lineStart - lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
              s.line(s.n[i+3].x   + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                s.n[i+2].x   + lineStart + lineStart,
                s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

              s.textAlign(s.CENTER,s.CENTER);
              s.textSize(three_vertical);
              s.strokeWeight(contentsWidth/800);
              s.text("3",s.n[i+2].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
              s.strokeWeight(contentsWidth/400);
              for(let t = 0; t < arry.length; t++){
                s.n[i+t].direction = "up";
              }
   }
 }else{ //steady
   if(slp == 'down'){
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
     s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
     s.line(s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

       s.line(s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);

       /////3/////
       s.line(s.n[i+1].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
         s.n[i+1].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(s.n[i+3].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
         s.n[i+3].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

       s.line(s.n[i+1].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
         s.n[i+2].x   - lineStart - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(s.n[i+3].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
         s.n[i+2].x   - lineStart + lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+2].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.strokeWeight(contentsWidth/400);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "down";
       }
   }else{
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
     s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
     s.line(s.n[i+3].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);

     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);

       s.line(s.n[i+3].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i+1].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);

       /////////////////////3//////////////////////////
       s.line(s.n[i+1].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
         s.n[i+1].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(s.n[i+3].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
         s.n[i+3].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.line(s.n[i+1].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
         s.n[i+2].x   + lineStart - lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(s.n[i+3].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
         s.n[i+2].x   + lineStart + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+2].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.strokeWeight(contentsWidth/400);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "up";
       }
   }
 }
}
function drawFiveComConnected_0(s, i){
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y,s.n[i+2].y,s.n[i+3].y,s.n[i+4].y];
 var slp = up_down_decider(arry);
 var ra = most_radical(arry);
 var three_vertical=lineLength*.3;

 if(steep_steady(arry) == 1){ // steep
   if(slp == 'down'){
     var x = s.n[i].x   - lineStart;
     var y = s.n[i].pre_ypos + lineLength;
     var x1  = s.n[i+4].x   - lineStart;
     var y1  = s.n[i+4].pre_ypos + lineLength;
     var y2 = s.n[i].pre_ypos + lineLength*.8;
     var y3  = s.n[i+4].pre_ypos + lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
     s.line(s.n[i+4].x   - lineStart, s.n[i+4].pre_ypos, s.n[i+4].x   - lineStart, s.n[i+4].pre_ypos + lineLength);
     s.line(s.n[i+4].x   - lineStart, s.n[i+4].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);


     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart,
       slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+2].x   - lineStart));
         s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart,
           slopeCalc(x,y,x1,y1, s.n[i+3].x   - lineStart));

      s.line(s.n[i].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i].x   - lineStart),
           s.n[i+2].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i+2].x   - lineStart));
      s.line(s.n[i+3].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i+3].x   - lineStart),
           s.n[i+4].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i+4].x   - lineStart));

           /////3/////
           s.line(s.n[i].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
             s.n[i].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.line(s.n[i+2].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
             s.n[i+2].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

           s.line(s.n[i].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
             s.n[i+1].x   - lineStart - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.line(s.n[i+2].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
             s.n[i+1].x   - lineStart + lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.textAlign(s.CENTER,s.CENTER);
           s.textSize(three_vertical);
           s.strokeWeight(contentsWidth/800);
           s.text("3",s.n[i+1].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.strokeWeight(contentsWidth/400);
           for(let t = 0; t < arry.length; t++){
             s.n[i+t].direction = "down";
           }
   }else{
     var x = s.n[i].x   + lineStart;
     var y = s.n[i].pre_ypos - lineLength;
     var x1  = s.n[i+4].x   + lineStart;
     var y1  = s.n[i+4].pre_ypos - lineLength;
     var y2  = s.n[i].pre_ypos - lineLength*.8;
     var y3  = s.n[i+4].pre_ypos - lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
     s.line(s.n[i+4].x   + lineStart, s.n[i+4].pre_ypos, s.n[i+4].x   + lineStart, s.n[i+4].pre_ypos - lineLength);
     s.line(s.n[i+4].x   + lineStart, s.n[i+4].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);


     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,
       slopeCalc(x,y,x1,y1, s.n[i+1].x   + lineStart));
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+2].x   + lineStart));
         s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart,
           slopeCalc(x,y,x1,y1, s.n[i+3].x   + lineStart));

         s.line(s.n[i].x   + lineStart,
              slopeCalc(x,y2,x1,y3, s.n[i].x   + lineStart),
              s.n[i+2].x   + lineStart,
              slopeCalc(x,y2,x1,y3, s.n[i+2].x   + lineStart));
              s.line(s.n[i+3].x   + lineStart,
                   slopeCalc(x,y2,x1,y3, s.n[i+3].x   + lineStart),
                   s.n[i+4].x   + lineStart,
                   slopeCalc(x,y2,x1,y3, s.n[i+4].x   + lineStart));

                   /////////////////////3//////////////////////////
                   s.line(s.n[i].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                     s.n[i].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                   s.line(s.n[i+2].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                     s.n[i+2].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                   s.line(s.n[i].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                     s.n[i+1].x   + lineStart - lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                   s.line(s.n[i+2].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                     s.n[i+1].x   + lineStart + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                   s.textAlign(s.CENTER,s.CENTER);
                   s.textSize(three_vertical);
                   s.strokeWeight(contentsWidth/800);
                   s.text("3",s.n[i+1].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                   s.strokeWeight(contentsWidth/400);
                   for(let t = 0; t < arry.length; t++){
                     s.n[i+t].direction = "up";
                   }
   }
 }else{ //steady
   if(slp == 'down'){
     s.noFill();
     s.stroke(s.music_color_op);
           if(s.selected || s.view){
           s.stroke(s.music_color);
         }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
     s.line(s.n[i+4].x   - lineStart, s.n[i+4].pre_ypos, s.n[i+4].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
     s.line(s.n[i+4].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

       s.line(s.n[i+4].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);
       s.line(s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);

       /////3/////
       s.line(s.n[i].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
         s.n[i].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(s.n[i+2].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
         s.n[i+2].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

       s.line(s.n[i].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
         s.n[i+1].x   - lineStart - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(s.n[i+2].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
         s.n[i+1].x   - lineStart + lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+1].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.strokeWeight(contentsWidth/400);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "down";
       }
   }else{
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
     s.line(s.n[i+4].x   + lineStart, s.n[i+4].pre_ypos, s.n[i+4].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
     s.line(s.n[i+4].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);

     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);

       s.line(s.n[i+4].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i+3].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);
       s.line(s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);

       /////////////////////3//////////////////////////
       s.line(s.n[i].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
         s.n[i].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(s.n[i+2].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
         s.n[i+2].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.line(s.n[i].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
         s.n[i+1].x   + lineStart - lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(s.n[i+2].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
         s.n[i+1].x   + lineStart + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+1].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.strokeWeight(contentsWidth/400);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "up";
       }
   }
 }
}
function drawFiveComConnected_1(s, i){
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y,s.n[i+2].y,s.n[i+3].y,s.n[i+4].y];
 var slp = up_down_decider(arry);
 var ra = most_radical(arry);
 var three_vertical=lineLength*.3;

 if(steep_steady(arry) == 1){ // steep
   if(slp == 'down'){
     var x = s.n[i].x   - lineStart;
     var y = s.n[i].pre_ypos + lineLength;
     var x1  = s.n[i+4].x   - lineStart;
     var y1  = s.n[i+4].pre_ypos + lineLength;
     var y2 = s.n[i].pre_ypos + lineLength*.8;
     var y3  = s.n[i+4].pre_ypos + lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
if(s.selected || s.view){
s.stroke(s.music_color);
}
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
     s.line(s.n[i+4].x   - lineStart, s.n[i+4].pre_ypos, s.n[i+4].x   - lineStart, s.n[i+4].pre_ypos + lineLength);
     s.line(s.n[i+4].x   - lineStart, s.n[i+4].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);


     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart,
       slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+2].x   - lineStart));
         s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart,
           slopeCalc(x,y,x1,y1, s.n[i+3].x   - lineStart));

      s.line(s.n[i].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i].x   - lineStart),
           s.n[i+1].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i+1].x   - lineStart));
      s.line(s.n[i+2].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i+2].x   - lineStart),
           s.n[i+4].x   - lineStart,
           slopeCalc(x,y2,x1,y3, s.n[i+4].x   - lineStart));

           /////3/////
           s.line(s.n[i+2].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
             s.n[i+2].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.line(s.n[i+4].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
             s.n[i+4].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

           s.line(s.n[i+2].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
             s.n[i+3].x   - lineStart - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.line(s.n[i+4].x   - lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
             s.n[i+3].x   - lineStart + lineStart,
             s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.textAlign(s.CENTER,s.CENTER);
           s.textSize(three_vertical);
           s.strokeWeight(contentsWidth/800);
           s.text("3",s.n[i+3].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.strokeWeight(contentsWidth/400);
           for(let t = 0; t < arry.length; t++){
             s.n[i+t].direction = "down";
           }
   }else{
     var x = s.n[i].x   + lineStart;
     var y = s.n[i].pre_ypos - lineLength;
     var x1  = s.n[i+4].x   + lineStart;
     var y1  = s.n[i+4].pre_ypos - lineLength;
     var y2  = s.n[i].pre_ypos - lineLength*.8;
     var y3  = s.n[i+4].pre_ypos - lineLength*.8;
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
     s.line(s.n[i+4].x   + lineStart, s.n[i+4].pre_ypos, s.n[i+4].x   + lineStart, s.n[i+4].pre_ypos - lineLength);
     s.line(s.n[i+4].x   + lineStart, s.n[i+4].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);


     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,
       slopeCalc(x,y,x1,y1, s.n[i+1].x   + lineStart));
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+2].x   + lineStart));
         s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart,
           slopeCalc(x,y,x1,y1, s.n[i+3].x   + lineStart));

         s.line(s.n[i].x   + lineStart,
              slopeCalc(x,y2,x1,y3, s.n[i].x   + lineStart),
              s.n[i+1].x   + lineStart,
              slopeCalc(x,y2,x1,y3, s.n[i+1].x   + lineStart));
              s.line(s.n[i+2].x   + lineStart,
                   slopeCalc(x,y2,x1,y3, s.n[i+2].x   + lineStart),
                   s.n[i+4].x   + lineStart,
                   slopeCalc(x,y2,x1,y3, s.n[i+4].x   + lineStart));

                   /////////////////////3//////////////////////////
                   s.line(s.n[i+2].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                     s.n[i+2].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                   s.line(s.n[i+4].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                     s.n[i+4].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                   s.line(s.n[i+2].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                     s.n[i+3].x   + lineStart - lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                   s.line(s.n[i+4].x   + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                     s.n[i+3].x   + lineStart + lineStart,
                     s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                   s.textAlign(s.CENTER,s.CENTER);
                   s.textSize(three_vertical);
                   s.strokeWeight(contentsWidth/800);
                   s.text("3",s.n[i+3].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                   s.strokeWeight(contentsWidth/400);
                   for(let t = 0; t < arry.length; t++){
                     s.n[i+t].direction = "up";
                   }
   }
 }else{ //steady
   if(slp == 'down'){
     s.noFill();
     s.stroke(s.music_color_op);
if(s.selected || s.view){
s.stroke(s.music_color);
}
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
     s.line(s.n[i+4].x   - lineStart, s.n[i+4].pre_ypos, s.n[i+4].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
     s.line(s.n[i+4].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

     s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+3].x   - lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

       s.line(s.n[i+4].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);
       s.line(s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);

       /////3/////
       s.line(s.n[i+2].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
         s.n[i+2].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(s.n[i+4].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
         s.n[i+4].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

       s.line(s.n[i+2].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
         s.n[i+3].x   - lineStart - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(s.n[i+4].x   - lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
         s.n[i+3].x   - lineStart + lineStart,
         s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+3].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.strokeWeight(contentsWidth/400);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "down";
       }
   }else{
     s.noFill();
     s.stroke(s.music_color_op);
       if(s.selected || s.view){
       s.stroke(s.music_color);
     }
     s.strokeWeight(contentsWidth/400);
     s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
     s.line(s.n[i+4].x   + lineStart, s.n[i+4].pre_ypos, s.n[i+4].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
     s.line(s.n[i+4].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);

     s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+3].x   + lineStart, s.n[i+3].pre_ypos, s.n[i+3].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);

       s.line(s.n[i+4].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);
       s.line(s.n[i+1].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);

       /////////////////////3//////////////////////////
       s.line(s.n[i+2].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
         s.n[i+2].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(s.n[i+4].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
         s.n[i+4].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.line(s.n[i+2].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
         s.n[i+3].x   + lineStart - lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(s.n[i+4].x   + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
         s.n[i+3].x   + lineStart + lineStart,
         s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+3].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.strokeWeight(contentsWidth/400);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "up";
       }
   }
 }
}
function drawTriplet(s, i) {
 var lineStart = contentsHeight/24;
 var lineLength = 120*contentsHeight/400;
 var arry = [s.n[i].y, s.n[i+1].y,s.n[i+2].y];
 var slp = up_down_decider(arry);
 var ra = most_radical(arry);
 var three_vertical=lineLength*.3;
 s.stroke(s.music_color_op);
if(s.selected || s.view){
s.stroke(s.music_color);
}
 s.strokeWeight(contentsWidth/400);
 if(steep_steady(arry) == 1){ // steep
   if(slp == 'down'){
     var x = s.n[i].x   - lineStart;
     var y = s.n[i].pre_ypos + lineLength;
     var x1  = s.n[i+2].x   - lineStart;
     var x2  = s.n[i+1].x   - lineStart;
     var y1  = s.n[i+2].pre_ypos + lineLength;
     var y2 = s.n[i].pre_ypos + lineLength*.8;
     var y3  = s.n[i+2].pre_ypos + lineLength*.8;

     if(s.n[i].r=='false'&&s.n[i+1].r=='false'&&s.n[i+2].r=='false'){
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength);

       if(s.n[i].bt == 18){
         s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos + lineLength*.8, s.n[i].x   - lineStart, s.n[i].pre_ypos + lineLength*.8);
       }


       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   - lineStart));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "down";
         }
     }else{
       s.n[i].groupHasRest = true;
       s.n[i+1].groupHasRest = true;
       s.n[i+2].groupHasRest = true;
     }

       /////3/////
       s.line(x, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1, x, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(x1, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1, x1, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

       s.line(x, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2, x2 - lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.line(x1, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2, x2 + lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+1].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
       s.strokeWeight(contentsWidth/400);

   }else{
     var x = s.n[i].x   + lineStart;
     var y = s.n[i].pre_ypos - lineLength;
     var x1  = s.n[i+2].x   + lineStart;
     var x2  = s.n[i+1].x   + lineStart;
     var y1  = s.n[i+2].pre_ypos - lineLength;
     var y2 = s.n[i].pre_ypos - lineLength*.8;
     var y3  = s.n[i+2].pre_ypos - lineLength*.8;

     if(s.n[i].r=='false'&&s.n[i+1].r=='false'&&s.n[i+2].r=='false'){
       s.noFill();
       s.stroke(s.music_color_op);
  if(s.selected || s.view){
  s.stroke(s.music_color);
  }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength);

       if(s.n[i].bt==18){
         s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos - lineLength*.8, s.n[i].x   + lineStart, s.n[i].pre_ypos - lineLength*.8);
       }

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,
         slopeCalc(x,y,x1,y1, s.n[i+1].x   + lineStart));
         for(let t = 0; t < arry.length; t++){
           s.n[i+t].direction = "up";
         }
     }else{
       s.n[i].groupHasRest = true;
       s.n[i+1].groupHasRest = true;
       s.n[i+2].groupHasRest = true;
     }

       /////////////////////3//////////////////////////
       s.line(x, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1, x, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(x1, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1, x1, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.line(x, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2, x2 - lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.line(x1, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2, x2 + lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

       s.textAlign(s.CENTER,s.CENTER);
       s.textSize(three_vertical);
       s.strokeWeight(contentsWidth/800);
       s.text("3",s.n[i+1].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
       s.strokeWeight(contentsWidth/400);

   }
 }else{ //steady
   if(slp == 'down'){

     if(s.n[i].r=='false'&&s.n[i+1].r=='false'&&s.n[i+2].r=='false'){
       s.noFill();
       s.stroke(s.music_color_op);
         if(s.selected || s.view){
         s.stroke(s.music_color);
       }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   - lineStart, s.n[i].pre_ypos, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       s.line(s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);

       if(s.n[i].bt==18){
         s.line(s.n[i+2].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8, s.n[i].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength*.8);
       }

       s.line(s.n[i+1].x   - lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   - lineStart, s.n[i+ra[1]].pre_ypos + lineLength);
       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "down";
       }
     }else{
       s.n[i].groupHasRest = true;
       s.n[i+1].groupHasRest = true;
       s.n[i+2].groupHasRest = true;
     }


     s.line(s.n[i].x   - lineStart,
          s.n[i+ra[1]].pre_ypos + lineLength + lineLength*.1,
          s.n[i].x   - lineStart,
          s.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);
          s.line(s.n[i].x   - lineStart,
               s.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2,
               s.n[i+1].x   - lineStart - three_vertical,
               s.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);
          s.line(s.n[i+2].x   - lineStart,
               s.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2,
               s.n[i+1].x   - lineStart + three_vertical,
               s.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);
     s.line(s.n[i+2].x   - lineStart,
           s.n[i+ra[1]].pre_ypos + lineLength + lineLength*.1,
           s.n[i+2].x   - lineStart,
           s.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);

           s.textAlign(s.CENTER,s.CENTER);
           s.textSize(three_vertical);
           s.strokeWeight(contentsWidth/800);
           s.text("3",s.n[i+1].x-lineStart, s.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
           s.strokeWeight(contentsWidth/400);

   }else{

     if(s.n[i].r=='false'&&s.n[i+1].r=='false'&&s.n[i+2].r=='false'){
       s.noFill();
       s.stroke(s.music_color_op);
    if(s.selected || s.view){
    s.stroke(s.music_color);
    }
       s.strokeWeight(contentsWidth/400);
       s.line(s.n[i].x   + lineStart, s.n[i].pre_ypos, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+2].pre_ypos, s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);
       s.line(s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength);

       if(s.n[i].bt==18){
         s.line(s.n[i+2].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8, s.n[i].x   + lineStart, s.n[i+ra[0]].pre_ypos - lineLength*.8);
       }

       s.line(s.n[i+1].x   + lineStart, s.n[i+1].pre_ypos, s.n[i+1].x   + lineStart,s.n[i+ra[0]].pre_ypos - lineLength);

       for(let t = 0; t < arry.length; t++){
         s.n[i+t].direction = "up";
       }
     }else{
       s.n[i].groupHasRest = true;
       s.n[i+1].groupHasRest = true;
       s.n[i+2].groupHasRest = true;
     }


     s.line(s.n[i].x   + lineStart,
          s.n[i+ra[0]].pre_ypos - lineLength - lineLength*.1,
          s.n[i].x   + lineStart,
          s.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);
          s.line(s.n[i].x   + lineStart,
               s.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2,
               s.n[i+1].x   + lineStart - three_vertical,
               s.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);
          s.line(s.n[i+2].x   + lineStart,
               s.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2,
               s.n[i+1].x   + lineStart + three_vertical,
               s.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);
     s.line(s.n[i+2].x   + lineStart,
           s.n[i+ra[0]].pre_ypos - lineLength - lineLength*.1,
           s.n[i+2].x   + lineStart,
           s.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);

           s.textAlign(s.CENTER,s.CENTER);
           s.textSize(three_vertical);
           s.strokeWeight(contentsWidth/800);
           s.text("3",s.n[i+1].x+lineStart, s.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
           s.strokeWeight(contentsWidth/400);

   }
 }
}

function drawWhole(s, cx, cy, w, h, c){
  s.strokeWeight(s.n.width/450);
  s.rectMode(s.RADIUS);
  s.fill(c);
  s.noStroke();
  s.rect(cx+(w)/2, cy+h/2, (w)/5, h/24);
  s.stroke(c);
  s.line(cx+(w)/10, cy+h/2-h/24, cx+9*(w)/10, cy+h/2-h/24);
}
function drawDHalf(s, cx, cy, w, h, c) {
  s.strokeWeight(s.n.width/450);
  s.rectMode(s.RADIUS);
  s.fill(c);
  s.noStroke();
  s.rect(cx+(w)/2, cy+h/2, (w)/5, h/24);
  s.stroke(c);
  s.line(cx+(w)/10, cy+h/2+h/24, cx+9*(w)/10, cy+h/2+h/24);
  s.strokeWeight(s.n.width/150);
  s.point(cx+(w)/2+22*this.width/700, cy+h/2);
}
function drawHalf(s, cx, cy, w, h, c) {
  s.strokeWeight(s.n.width/450);
  s.rectMode(s.RADIUS);
  s.fill(c);
  s.noStroke();
  s.rect(cx+(w)/2, cy+h/2, (w)/5, h/24);
  s.stroke(c);
  s.line(cx+(w)/10, cy+h/2+h/24, cx+9*(w)/10, cy+h/2+h/24);
}
function drawDQut(s, cx, cy, w, h, c) {
  s.strokeWeight(s.n.width/450);
  s.fill(c);
  s.stroke(c);
  s.beginShape();
  s.vertex(cx+w/2,
         cy + 6*h/24);
         s.vertex(cx+3*(w)/4,
                cy+19*h/48);
         s.vertex(cx+8*(w)/12,
                cy+26*h/48);
         s.vertex(cx+3*(w)/4,
                cy+15*h/24);
         s.vertex(cx+(w)/2,
                cy + 23*h/48);
         s.vertex(cx+9*(w)/16, cy + 16*h/48);
         s.vertex(cx+(w)/2,
                cy + 6*h/24);
         s.endShape();
         s.beginShape();
         s.vertex(cx+3*(w)/4,
                cy+15*h/24);
         s.bezierVertex(cx+4*(w)/8,
                cy+13*h/24,
                cx+(w)/4,
                cy+15*h/24,
                cx+5*(w)/8,
                cy+18*h/24);
                s.bezierVertex(
                  cx+7*(w)/16,
                  cy+15*h/24,
                  cx+11*(w)/16,
                  cy+14*h/24,
                  cx+3*(w)/4,
                  cy+15*h/24);
         s.endShape();
         s.strokeWeight(s.n.width/150);
         s.point(cx+(w)/2+22*s.n.width/700, cy+h/2);
}
function drawQut(s, cx, cy, w, h, c){
  s.strokeWeight(s.n.width/450);
  s.fill(c);
  s.stroke(c);
  s.beginShape();
  s.vertex(cx+w/2,
         cy + 6*h/24);
         s.vertex(cx+3*(w)/4,
                cy+19*h/48);
         s.vertex(cx+8*(w)/12,
                cy+26*h/48);
         s.vertex(cx+3*(w)/4,
                cy+15*h/24);
         s.vertex(cx+(w)/2,
                cy + 23*h/48);
         s.vertex(cx+9*(w)/16, cy + 16*h/48);
         s.vertex(cx+(w)/2,
                cy + 6*h/24);
         s.endShape();
         s.beginShape();
         s.vertex(cx+3*(w)/4,
                cy+15*h/24);
         s.bezierVertex(cx+4*(w)/8,
                cy+13*h/24,
                cx+(w)/4,
                cy+15*h/24,
                cx+5*(w)/8,
                cy+18*h/24);
                s.bezierVertex(
                  cx+7*(w)/16,
                  cy+15*h/24,
                  cx+11*(w)/16,
                  cy+14*h/24,
                  cx+3*(w)/4,
                  cy+15*h/24);
         s.endShape();
}
function darwDEighth(s, cx, cy, w, h, c){
  s.strokeWeight(s.n.width/450);
  s.fill(c);
  s.noStroke();
  s.ellipse(cx, cy, w/2, w/2);
  s.noFill();
  s.stroke(c);
  s.beginShape();
    s.vertex(cx, cy);
    s.bezierVertex(cx + w/4, cy + h/8,
                 cx + 3*w/4, cy + h/8,
                 cx + w, cy-h/16);
    s.vertex(cx + w/8, cy +h);
  s.endShape();
  s.strokeWeight(s.n.width/150);
  s.point(cx+w/2+23*s.n.width/700, cy);
}
function darwEighth(s, cx, cy, w, h, c){
  s.strokeWeight(s.n.width/450);
  s.fill(c);
  s.noStroke();
  s.ellipse(cx, cy, w/2, w/2);
  s.noFill();
  s.stroke(c);
  s.beginShape();
    s.vertex(cx, cy);
    s.bezierVertex(cx + w/4, cy + h/8,
                 cx + 3*w/4, cy + h/8,
                 cx + w, cy-h/16);
    s.vertex(cx + w/8, cy +h);
  s.endShape();
}
function darwDSixteenth(s, cx, cy, w, h, c){
  s.strokeWeight(s.n.width/450);
  s.fill(c);
  s.noStroke();
  s.ellipse(cx, cy, w/2, w/2);
  s.ellipse(cx - w/16, cy+h/2, w/2, w/2);
  s.noFill();
  s.stroke(c);
  s.beginShape();
    s.vertex(cx, cy);
    s.bezierVertex(cx + w/4, cy + h/8,
                 cx + 3*w/4, cy + h/8,
                 cx + w, cy-h/16);
    s.vertex(cx + w/4, cy +h);
  s.endShape();


  s.beginShape();
    s.vertex(cx - w/16, cy+h/2);
    s.bezierVertex(cx + 3*w/16, cy+h/2 + h/8,
                 cx + 11*w/16, cy+h/2 + h/8,
                 cx + 10*w/16, cy+7*h/16);
  s.endShape();
  s.strokeWeight(s.n.width/150);
  s.point(cx+w/2+23*s.n.width/700, cy);
}
function darwSixteenth(s, cx, cy, w, h, c){
  s.strokeWeight(s.n.width/450);
  s.fill(c);
  s.noStroke();
  s.ellipse(cx, cy, w/2, w/2);
  s.ellipse(cx - w/16, cy+h/2, w/2, w/2);
  s.noFill();
  s.stroke(c);
  s.beginShape();
    s.vertex(cx, cy);
    s.bezierVertex(cx + w/4, cy + h/8,
                 cx + 3*w/4, cy + h/8,
                 cx + w, cy-h/16);
    s.vertex(cx + w/4, cy +h);
  s.endShape();


  s.beginShape();
    s.vertex(cx - w/16, cy+h/2);
    s.bezierVertex(cx + 3*w/16, cy+h/2 + h/8,
                 cx + 11*w/16, cy+h/2 + h/8,
                 cx + 10*w/16, cy+7*h/16);
  s.endShape();
}
function drawTie(s, i){
   var h = 33*contentsHeight/400;
   var ot = contentsWidth/100;
   var it = contentsWidth/160;
   if(s.n[i].direction == "down" && s.n[i-1].direction == "down"){
     var x = s.n[i].x ;
     var y = s.n[i].pre_ypos -h;
     var x1 = s.n[i-1].x ;
     var y1 = s.n[i-1].pre_ypos -h;
     if(s.n[i].y >= s.n[i-1].y){
       s.beginShape();
       s.fill(s.music_color_op);
         if(s.selected || s.view){
         s.fill(s.music_color);
       }
       s.noStroke();
       s.vertex(x ,y);
       s.bezierVertex(tie_xy(s,x,y,x1,y1,1,
         ot)[0],
         tie_xy(s,x,y,x1,y1,1,
           ot)[1],
       tie_xy(s,x,y,x1,y1,1,
         ot)[0],
         tie_xy(s,x,y,x1,y1,1,
           ot)[1],
         x1 ,y1 );
       s.bezierVertex(tie_xy(s,x,y,x1,y1,1,
       it)[0],
       tie_xy(s,x,y,x1,y1,1,
       it)[1],
       tie_xy(s,x,y,x1,y1,1,
       it)[0],
       tie_xy(s,x,y,x1,y1,1,
       it)[1],
         x ,y );
       s.endShape();
     }else{
       s.beginShape();
       s.fill(s.music_color_op);
if(s.selected || s.view){
s.fill(s.music_color);
}
       s.noStroke();
       s.vertex(x ,y);
       s.bezierVertex(tie_xy(s,x,y,x1,y1,-1,
         ot)[0],
         tie_xy(s,x,y,x1,y1,-1,
           ot)[1],
       tie_xy(s,x,y,x1,y1,-1,
         ot)[0],
         tie_xy(s,x,y,x1,y1,-1,
           ot)[1],
         x1 ,y1 );
       s.bezierVertex(tie_xy(s,x,y,x1,y1,-1,
       it)[0],
       tie_xy(s,x,y,x1,y1,-1,
       it)[1],
       tie_xy(s,x,y,x1,y1,-1,
       it)[0],
       tie_xy(s,x,y,x1,y1,-1,
       it)[1],
         x ,y );
       s.endShape();
     }
   }else if(s.n[i].direction == "up" && s.n[i-1].direction == "up"){
     var x = s.n[i].x ;
     var y = s.n[i].pre_ypos +h;
     var x1 = s.n[i-1].x ;
     var y1 = s.n[i-1].pre_ypos +h;
     if(s.n[i].y >= s.n[i-1].y){
       s.beginShape();
       s.fill(s.music_color_op);
    if(s.selected || s.view){
    s.fill(s.music_color);
    }
       s.noStroke();
       s.vertex(x ,y);
       s.bezierVertex(tie_xy(s,x,y,x1,y1,-1,
         ot)[0],
         tie_xy(s,x,y,x1,y1,-1,
           ot)[1],
       tie_xy(s,x,y,x1,y1,-1,
         ot)[0],
         tie_xy(s,x,y,x1,y1,-1,
           ot)[1],
         x1 ,y1 );
       s.bezierVertex(tie_xy(s,x,y,x1,y1,-1,
       it)[0],
       tie_xy(s,x,y,x1,y1,-1,
       it)[1],
       tie_xy(s,x,y,x1,y1,-1,
       it)[0],
       tie_xy(s,x,y,x1,y1,-1,
       it)[1],
         x ,y );
       s.endShape();
     }else{
       s.beginShape();
       s.fill(s.music_color_op);
if(s.selected || s.view){
s.fill(s.music_color);
}
       s.noStroke();
       s.vertex(x ,y);
       s.bezierVertex(tie_xy(s,x,y,x1,y1,1,
         ot)[0],
         tie_xy(s,x,y,x1,y1,1,
           ot)[1],
       tie_xy(s,x,y,x1,y1,1,
         ot)[0],
         tie_xy(s,x,y,x1,y1,1,
           ot)[1],
         x1 ,y1 );
       s.bezierVertex(tie_xy(s,x,y,x1,y1,1,
       it)[0],
       tie_xy(s,x,y,x1,y1,1,
       it)[1],
       tie_xy(s,x,y,x1,y1,1,
       it)[0],
       tie_xy(s,x,y,x1,y1,1,
       it)[1],
         x ,y );
       s.endShape();
     }
   }else if(s.n[i].direction != s.n[i-1].direction){
     var arry = [s.n[i].y, s.n[i-1].y];
     var s = up_down_decider(arry);
     if(s == "down"){
       var x = s.n[i].x ;
       var y = s.n[i].pre_ypos -h;
       var x1 = s.n[i-1].x ;
       var y1 = s.n[i-1].pre_ypos -h;
       if(s.n[i].y >= s.n[i-1].y){
         s.beginShape();
         s.fill(s.music_color_op);
if(s.selected || s.view){
s.fill(s.music_color);
}
         s.noStroke();
         s.vertex(x ,y);
         s.bezierVertex(tie_xy(s,x,y,x1,y1,1,
           ot)[0],
           tie_xy(s,x,y,x1,y1,1,
             ot)[1],
         tie_xy(s,x,y,x1,y1,1,
           ot)[0],
           tie_xy(s,x,y,x1,y1,1,
             ot)[1],
           x1 ,y1 );
         s.bezierVertex(tie_xy(s,x,y,x1,y1,1,
         it)[0],
         tie_xy(s,x,y,x1,y1,1,
         it)[1],
         tie_xy(s,x,y,x1,y1,1,
         it)[0],
         tie_xy(s,x,y,x1,y1,1,
         it)[1],
           x ,y );
         s.endShape();
       }else{
         s.beginShape();
         s.fill(s.music_color_op);
if(s.selected || s.view){
s.fill(s.music_color);
}
         s.noStroke();
         s.vertex(x ,y);
         s.bezierVertex(tie_xy(s,x,y,x1,y1,-1,
           ot)[0],
           tie_xy(s,x,y,x1,y1,-1,
             ot)[1],
         tie_xy(s,x,y,x1,y1,-1,
           ot)[0],
           tie_xy(s,x,y,x1,y1,-1,
             ot)[1],
           x1 ,y1 );
         s.bezierVertex(tie_xy(s,x,y,x1,y1,-1,
         it)[0],
         tie_xy(s,x,y,x1,y1,-1,
         it)[1],
         tie_xy(s,x,y,x1,y1,-1,
         it)[0],
         tie_xy(s,x,y,x1,y1,-1,
         it)[1],
           x ,y );
         s.endShape();
       }
     }else if( s== "up"){
       var x = s.n[i].x ;
       var y = s.n[i].pre_ypos +h;
       var x1 = s.n[i-1].x ;
       var y1 = s.n[i-1].pre_ypos +h;
       if(s.n[i].y >= s.n[i-1].y){
         s.beginShape();
         s.fill(s.music_color_op);
if(s.selected || s.view){
s.fill(s.music_color);
}
         s.noStroke();
         s.vertex(x ,y);
         s.bezierVertex(tie_xy(s,x,y,x1,y1,-1,
           ot)[0],
           tie_xy(s,x,y,x1,y1,-1,
             ot)[1],
         tie_xy(s,x,y,x1,y1,-1,
           ot)[0],
           tie_xy(s,x,y,x1,y1,-1,
             ot)[1],
           x1 ,y1 );
         s.bezierVertex(tie_xy(s,x,y,x1,y1,-1,
         it)[0],
         tie_xy(s,x,y,x1,y1,-1,
         it)[1],
         tie_xy(s,x,y,x1,y1,-1,
         it)[0],
         tie_xy(s,x,y,x1,y1,-1,
         it)[1],
           x ,y );
         s.endShape();
       }else{
         s.beginShape();
         s.fill(s.music_color_op);
if(s.selected || s.view){
s.fill(s.music_color);
}
         s.noStroke();
         s.vertex(x ,y);
         s.bezierVertex(tie_xy(s,x,y,x1,y1,1,
           ot)[0],
           tie_xy(s,x,y,x1,y1,1,
             ot)[1],
         tie_xy(s,x,y,x1,y1,1,
           ot)[0],
           tie_xy(s,x,y,x1,y1,1,
             ot)[1],
           x1 ,y1 );
         s.bezierVertex(tie_xy(s,x,y,x1,y1,1,
         it)[0],
         tie_xy(s,x,y,x1,y1,1,
         it)[1],
         tie_xy(s,x,y,x1,y1,1,
         it)[0],
         tie_xy(s,x,y,x1,y1,1,
         it)[1],
           x ,y );
         s.endShape();
       }
     }
   }
 }
