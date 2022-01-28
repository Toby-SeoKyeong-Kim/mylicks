class Licks {
  constructor(y,i) {
    this.xpos = Width/14;
    this.y = y;
    this.height = Height*11/40;
    this.width = Width*6/7;
    this.id = "";
    this.name;
    this.scale;
    this.key;
    this.chocen;
    this.chochar;
    this.data;
    this.first=false;
    this.ypos;
    this.selected=false;
    this.n = [];
    this.i =i;
    this.start = true;
    this.currently_editingX_val;
    this.currently_editing_num;
    this.yi;
    this.bt;
    this.bc;
    this.plet_count;
    this.accidental_val;
    this.keysig_start_point = this.width/12+ this.width/16;
    this.timesig_start_point = this.keysig_start_point + this.width/16;
    this.currently_editingx;
    this.asig = Width/33;
    this.rest;
    this.tie;
    this.reset =false;
    this.chord_cen;
    this.key_Changing = false;
    this.is_chocen_sharp;
    this.all_notes_in_key_str;
    this.all_notes_in_key_greek = new Map();
    this.octave_consecutive;
    this.mouseIsOn();
    this.mouseIsOnLoad();
    this.mouseIsOnNew();
    this.mouseIsOnEdit();
    this.mouseIsOnRemove();
  }


  Draw(){
    this.ypos = this.y + ypos_moving_val;
    switch (this.is_chocen_sharp) {
      case 0:
        this.chord_cen = this.all_notes_in_key_str[int(this.chocen)];
        break;
        case 1:
          this.chord_cen = if_is_Sharp.get(this.all_notes_in_key_str[int(this.chocen)]);
          break;
          case -1:
            this.chord_cen = if_is_Flat.get(this.all_notes_in_key_str[int(this.chocen)]);
            break;
    }
    fill(music_color_op);
    stroke(music_color_op);
      if(this.selected || edit_view){
        fill(music_color);
      stroke(music_color);
    }
    strokeCap(SQUARE);
    strokeWeight(Height/726);;
    textSize(this.height/12);
    textAlign(CENTER,CENTER);
    text(this.i+1, this.xpos, this.ypos + this.height*3/12);
    if(this.data==null){
      line(this.xpos, this.ypos+5*(this.height/12), this.xpos, this.ypos+9*(this.height/12));
      strokeWeight(Height*7/726);
      line(this.xpos+this.width, this.ypos+5*(this.height/12),this.xpos+this.width, this.ypos+9*(this.height/12));
      strokeWeight(Height*4/726);
      line(this.xpos+this.width-Width/80,this.ypos+5*(this.height/12),this.xpos+this.width-Width/80, this.ypos+9*(this.height/12));
      strokeWeight(Height/726);
      for (var i = 5; i < 10; i++) {
        line(this.xpos, this.ypos+i*(this.height/12),this.xpos+this.width,this.ypos+i*(this.height/12));
      }

        tint(255, 84);
        if(this.selected || edit_view){
          tint(255, 255);
        }
        image(img, int(this.xpos+this.width/50), int(this.ypos+2.5*(this.height/12)),int(this.width/22), int(this.height/1.5));

      for(var i = 0; i < number_of_keysig; i++){
        if(key<7){
          DrawSharp(this.keysig_start_point + Width/95*i,
            this.ypos+order_of_sharp[i]*(this.height/12) - Height/75,
            this.asig,
            this.height/9);
        }else if(key>7){
          DrawFlat(this.keysig_start_point + Width/95*i,
            this.ypos+order_of_flat[i]*(this.height/12) - Height/57,
            this.asig,
            this.height/9);
        }
      }
      if(this.first){
        fill(music_color_op);
        stroke(music_color_op);
          if(this.selected || edit_view){
            fill(music_color);
          stroke(music_color);
        }
        textSize(2*this.height/12);
        strokeWeight(Height/726);
        textAlign(CENTER,CENTER);
        text("4",this.timesig_start_point,this.ypos+6*this.height/12);
        text("4",this.timesig_start_point,this.ypos+8*this.height/12);

      }
      if(this.n != null){
        for(let [i,ns] of this.n.entries()){
          ns.Draw();
          if(this.selected || edit_view){
            ns.lickSelected = true;
          }else{
            ns.lickSelected = false;
          }
        }
      }
    }else{
      line(this.xpos, this.ypos+5*(this.height/12), this.xpos, this.ypos+9*(this.height/12));
      strokeWeight(Height*7/726);
      line(this.xpos+this.currently_editingX, this.ypos+5*(this.height/12),this.xpos+this.currently_editingX, this.ypos+9*(this.height/12));
      strokeWeight(Height*4/726);
      line(this.xpos+this.currently_editingX-Width/80,this.ypos+5*(this.height/12),this.xpos+this.currently_editingX-Width/80, this.ypos+9*(this.height/12));
      strokeWeight(Height/726);
      for (var i = 5; i < 10; i++) {
        line(this.xpos, this.ypos+i*(this.height/12),this.xpos+this.currently_editingX,this.ypos+i*(this.height/12));
      }
      tint(255, 84);
      if(this.selected || edit_view){
        tint(255, 255);
      }
      image(img, int(this.xpos+this.width/50), int(this.ypos+2.5*(this.height/12)),int(this.width/22), int(this.height/1.5));
      for(var i = 0; i < number_of_keysig; i++){
        if(key<7){
          DrawSharp(this.keysig_start_point + Width/95*i,
            this.ypos+order_of_sharp[i]*(this.height/12) - Height/75,
            this.asig,
            this.height/9);
        }else if(key>7){
          DrawFlat(this.keysig_start_point + Width/95*i,
            this.ypos+order_of_flat[i]*(this.height/12) - Height/57,
            this.asig,
            this.height/9);
        }
      }
      if(this.first){
        fill(music_color_op);
        stroke(music_color_op);
          if(this.selected || edit_view){
            fill(music_color);
          stroke(music_color);
        }
        textSize(2*this.height/12);
        strokeWeight(Height/726);;
        textAlign(CENTER,CENTER);
        text("4",this.timesig_start_point,this.ypos+6*this.height/12);
        text("4",this.timesig_start_point,this.ypos+8*this.height/12);
        textSize(this.height/10);
        textAlign(LEFT,CENTER);
        text(this.chord_cen + this.chochar,
          this.timesig_start_point,
          this.ypos+this.height/12);
      }else{
        strokeWeight(Height/726);;
        textSize(this.height/10);
        textAlign(LEFT,CENTER);
        text(this.chord_cen + this.chochar,
          this.timesig_start_point-this.height/8,
          this.ypos+this.height/12);
      }
      if(this.n != null){
        for(let [i,ns] of this.n.entries()){
          ns.Draw();
          if(this.selected || edit_view){
            ns.lickSelected = true;
          }else{
            ns.lickSelected = false;
          }
          if(ns.pc ==3){
            this.n[i].completePlet = true;
            this.n[i-1].completePlet = true;
            this.n[i-2].completePlet = true;
          }
          if(ns.tie == "true"){
            this.drawTie(i);
          }
        }
        this.drawGrouping();
      }
      this.octave_consecutive = 0;
      textAlign(CENTER,CENTER);
      textSize(this.height/12);
      strokeWeight(Height/726);;
      fill(music_color_op);
      stroke(music_color_op);
        if(this.selected || edit_view){
          fill(music_color);
        stroke(music_color);
      }
      var octave_height = this.ypos+ this.height/12;
      for(var i = 0; i < this.n.length; i++){
        if(i ==0){ //if it is the first note
          strokeWeight(Height/726);;
          switch (this.n[i].octave_control) {
            case -2:
              text("16vb", this.n[i].x , octave_height);
              this.n[i].octave_consecutive = this.octave_consecutive;
            break;
            case -1:
              text("8vb", this.n[i].x , octave_height);
              this.n[i].octave_consecutive = this.octave_consecutive;
            break;
            case 1:
              text("8va", this.n[i].x , octave_height);
              this.n[i].octave_consecutive = this.octave_consecutive;
            break;
            case 2:
              text("16va", this.n[i].x , octave_height);
              this.n[i].octave_consecutive = this.octave_consecutive;
            break;
          }
        }else if(i == this.n.length-1){//if it is the last note and matters
          strokeWeight(Height/726);;
          if(this.n[i].octave_control != this.n[i-1].octave_control){
            this.octave_consecutive = 0;
            this.n[i].octave_consecutive = this.octave_consecutive;
            switch (this.n[i].octave_control) {
              case -2:
                text("16vb", this.n[i].x , octave_height);
              break;
              case -1:
                text("8vb", this.n[i].x , octave_height);
              break;
              case 1:
                text("8va", this.n[i].x , octave_height);
              break;
              case 2:
                text("16va", this.n[i].x , octave_height);
              break;
            }
            switch (this.n[i-1].octave_control) {
              case -2:
                text("16vb", this.n[i-1-this.n[i-1].this.octave_consecutive].x , octave_height);
                if(this.n[i-1].this.octave_consecutive != 0){
                  this.drawDottedLine(this.n[i-1].x , octave_height,
                  this.n[i-1-this.n[i-1].this.octave_consecutive].x+textWidth("16va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i-1].x , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height);
                  line(this.n[i-1].x+this.height/12 , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height+this.height/12);
                }
              break;
              case -1:
                text("8vb", this.n[i-1-this.n[i-1].this.octave_consecutive].x , octave_height);
                if(this.n[i-1].this.octave_consecutive != 0){
                  this.drawDottedLine(this.n[i-1].x , octave_height,
                  this.n[i-1-this.n[i-1].this.octave_consecutive].x+textWidth("8va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i-1].x , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height);
                  line(this.n[i-1].x+this.height/12 , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height+this.height/12);
                }
              break;
              case 1:
                text("8va", this.n[i-1-this.n[i-1].this.octave_consecutive].x , octave_height);
                if(this.n[i-1].this.octave_consecutive != 0){
                  this.drawDottedLine(this.n[i-1].x , octave_height,
                  this.n[i-1-this.n[i-1].this.octave_consecutive].x+textWidth("8va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i-1].x , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height);
                  line(this.n[i-1].x+this.height/12 , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height+this.height/12);
                }
              break;
              case 2:
                text("16va", this.n[i-1-this.n[i-1].this.octave_consecutive].x , octave_height);
                if(this.n[i-1].this.octave_consecutive != 0){
                  this.drawDottedLine(this.n[i-1].x , octave_height,
                  this.n[i-1-this.n[i-1].this.octave_consecutive].x+textWidth("16va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i-1].x , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height);
                  line(this.n[i-1].x+this.height/12 , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height+this.height/12);
                }
              break;
            }
          }else{
            strokeWeight(Height/726);;
            this.octave_consecutive+=1;
            this.n[i].octave_consecutive = this.octave_consecutive;
            switch (this.n[i].octave_control) {
              case -2:
                text("16vb", this.n[i-this.n[i].octave_consecutive].x , octave_height);
                if(this.n[i].octave_consecutive != 0){
                  this.drawDottedLine(this.n[i].x , octave_height,
                  this.n[i-this.n[i].octave_consecutive].x+textWidth("16va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i].x , octave_height,
                      this.n[i].x+this.height/12 , octave_height);
                  line(this.n[i].x+this.height/12 , octave_height,
                      this.n[i].x+this.height/12 , octave_height+this.height/12);
                }
              break;
              case -1:
                text("8vb", this.n[i-this.n[i].octave_consecutive].x , octave_height);
                if(this.n[i].octave_consecutive != 0){
                  this.drawDottedLine(this.n[i].x , octave_height,
                  this.n[i-this.n[i].octave_consecutive].x+textWidth("8va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i].x , octave_height,
                      this.n[i].x+this.height/12 , octave_height);
                  line(this.n[i].x+this.height/12 , octave_height,
                      this.n[i].x+this.height/12 , octave_height+this.height/12);
                }
              break;
              case 1:
                text("8va", this.n[i-this.n[i].octave_consecutive].x , octave_height);
                if(this.n[i].octave_consecutive != 0){
                  this.drawDottedLine(this.n[i].x , octave_height,
                  this.n[i-this.n[i].octave_consecutive].x+textWidth("8va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i].x , octave_height,
                      this.n[i].x+this.height/12 , octave_height);
                  line(this.n[i].x+this.height/12 , octave_height,
                      this.n[i].x+this.height/12 , octave_height+this.height/12);
                }
              break;
              case 2:
                text("16va", this.n[i-this.n[i].octave_consecutive].x, octave_height);
                if(this.n[i].octave_consecutive != 0){
                  this.drawDottedLine(this.n[i].x , octave_height,
                  this.n[i-this.n[i].octave_consecutive].x+textWidth("16va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i].x , octave_height,
                      this.n[i].x+this.height/12 , octave_height);
                  line(this.n[i].x+this.height/12 , octave_height,
                      this.n[i].x+this.height/12 , octave_height+this.height/12);
                }
              break;
            }
          }
        }
        if(i > 0 && i<this.n.length-1){ //if it is neither first nor last but matters
          strokeWeight(Height/726);;
          if(this.n[i].octave_control != this.n[i-1].octave_control){
            this.octave_consecutive = 0;
            this.n[i].octave_consecutive = this.octave_consecutive;
            switch (this.n[i-1].octave_control) {
              case -2:
                text("16vb", this.n[i-1-this.n[i-1].this.octave_consecutive].x , octave_height);
                if(this.n[i-1].this.octave_consecutive != 0){
                  this.drawDottedLine(this.n[i-1].x , octave_height,
                  this.n[i-1-this.n[i-1].this.octave_consecutive].x+textWidth("16va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i-1].x , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height);
                  line(this.n[i-1].x+this.height/12 , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height+this.height/12);
                }
              break;
              case -1:
                text("8vb", this.n[i-1-this.n[i-1].this.octave_consecutive].x , octave_height);
                if(this.n[i-1].this.octave_consecutive != 0){
                  this.drawDottedLine(this.n[i-1].x , octave_height,
                  this.n[i-1-this.n[i-1].this.octave_consecutive].x+textWidth("8va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i-1].x , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height);
                  line(this.n[i-1].x+this.height/12 , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height+this.height/12);
                }
              break;
              case 1:
                text("8va", this.n[i-1-this.n[i-1].this.octave_consecutive].x , octave_height);
                if(this.n[i-1].this.octave_consecutive != 0){
                  this.drawDottedLine(this.n[i-1].x , octave_height,
                  this.n[i-1-this.n[i-1].this.octave_consecutive].x+textWidth("8va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i-1].x , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height);
                  line(this.n[i-1].x+this.height/12 , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height+this.height/12);
                }
              break;
              case 2:
                text("16va", this.n[i-1-this.n[i-1].this.octave_consecutive].x , octave_height);
                if(this.n[i-1].this.octave_consecutive != 0){
                  this.drawDottedLine(this.n[i-1].x , octave_height,
                  this.n[i-1-this.n[i-1].this.octave_consecutive].x+textWidth("16va"), octave_height);
                  strokeWeight(Width/300);
                  stroke(music_color_op);
                    if(this.selected || edit_view){
                    stroke(music_color);
                  }
                  line(this.n[i-1].x , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height);
                  line(this.n[i-1].x+this.height/12 , octave_height,
                      this.n[i-1].x+this.height/12 , octave_height+this.height/12);
                }
              break;
            }
          }else{
            strokeWeight(Height/726);;
            this.octave_consecutive+=1;
            this.n[i].octave_consecutive = this.octave_consecutive;
          }
        }

      }

    }

    if(this.selected){
      if(this.data == null){
        // this.load_new();
      }else{
        // this.edit_remove();
      }
      this.deleteLick();
    }
  }//draw end
  drawDottedLine(x1,y1,x2,y2) {
    noStroke();
    var d = dist(x1, y1, x2, y2);
    var amount_of_dots = d / (this.height/12);
    for (var i = 0; i <= int(amount_of_dots); i++) {
    var x = lerp(x1, x2, i/int(amount_of_dots));
    var y = lerp(y1, y2, i/int(amount_of_dots));
    ellipse(x, y, this.height/48, this.height/48);
    }
  }
  deleteLick(){
    rectMode(CORNER);
    fill(245, 30, 30);
    if(mouseIsPressed&&this.mouseIsOnDelete()){
      fill(230, 10, 10);
    }else if(this.mouseIsOnDelete()){
      fill(255, 40, 40);
    }
    noStroke();
    rect(this.xpos + this.width*31/32, this.ypos, this.width/32,this.width/32);
    stroke(255);
    strokeWeight(this.width/300);
    line(this.xpos + this.width*31/32, this.ypos,
    this.xpos + this.width, this.ypos+this.width/32);
    line(this.xpos + this.width*31/32, this.ypos+this.width/32,
    this.xpos + this.width, this.ypos);
  }
  mouseIsOnDelete(){
    if(mouseX>this.xpos + this.width*31/32
      &&mouseX<this.xpos+this.width
      &&mouseY>this.ypos
      &&mouseY<this.ypos+this.width/32
      &&this.selected
      &&!keySetting){
       return true;
       }else{
       return false;
       }
  }
  mouseIsOn(){
    if(mouseX>this.xpos
      &&mouseX<this.xpos+this.width
      &&mouseY>this.ypos
      &&mouseY<this.ypos+this.height){
       return true;
       }else{
       return false;
       }
  }
  mouseIsOnLoad(){
    if(mouseX>Width*.688
      &&mouseX<Width*.688+Width*0.078
      &&mouseY>1
      &&mouseY<1+Height*0.083
      &&this.data ==null
      &&this.selected
      &&!keySetting){
       return true;
       }else{
       return false;
       }
  }
  mouseIsOnNew(){
    if(mouseX>Width*.786
      &&mouseX<Width*.786+Width*0.0885
      &&mouseY>1
      &&mouseY<1+Height*0.083
      &&this.data ==null
      &&this.selected
      &&!keySetting){
       return true;
       }else{
       return false;
       }
  }
  mouseIsOnEdit(){
    if(mouseX>Width*.688
      &&mouseX<Width*.688+Width*0.078
      &&mouseY>1
      &&mouseY<1+Height*0.083
      &&this.data !=null
      &&this.selected
      &&!keySetting){
       return true;
       }else{
       return false;
       }
  }
  mouseIsOnRemove(){
    if(mouseX>Width*.786
      &&mouseX<Width*.786+Width*0.0885
      &&mouseY>1
      &&mouseY<1+Height*0.083
      &&this.data !=null
      &&this.selected
      &&!keySetting){
       return true;
       }else{
       return false;
       }
  }
  load_new(){
    rectMode(RADIUS);
    noStroke();
    fill(20, 220, 30);
    if(mouseIsPressed&&this.mouseIsOnLoad()){
      fill(10, 210, 20);
    }else if(this.mouseIsOnLoad()){
      fill(30, 230, 40);
    }
    rect(this.xpos+this.width/4, this.ypos+this.height*7/12, this.width/12, this.height/8);
    textAlign(CENTER,CENTER);
    textSize(this.height/8);
    fill(255);
    text("LOAD", this.xpos+this.width/4, this.ypos+this.height*7/12);

    fill(255, 160, 180);
    if(mouseIsPressed&&this.mouseIsOnNew()){
      fill(245, 150, 170);
    }else if(this.mouseIsOnNew()){
      fill(255, 170, 190);
    }
    rect(this.xpos+this.width*3/4, this.ypos+this.height*7/12, this.width/12, this.height/8);
    fill(255);
    text("NEW", this.xpos+this.width*3/4, this.ypos+this.height*7/12);
    rectMode(CORNER);
  }

  edit_remove(){
    rectMode(RADIUS);
    noStroke();
    fill(20, 220, 30);
    if(mouseIsPressed&&this.mouseIsOnEdit()){
      fill(10, 210, 20);
    }else if(this.mouseIsOnEdit()){
      fill(30, 230, 40);
    }
    rect(this.xpos+this.width/4, this.ypos+this.height*7/12, this.width/12, this.height/8);
    textAlign(CENTER,CENTER);
    textSize(this.height/8);
    fill(255);
    text("EDIT", this.xpos+this.width/4, this.ypos+this.height*7/12);

    fill(255, 160, 180);
    if(mouseIsPressed&&this.mouseIsOnRemove()){
      fill(245, 150, 170);
    }else if(this.mouseIsOnRemove()){
      fill(255, 170, 190);
    }
    rect(this.xpos+this.width*3/4, this.ypos+this.height*7/12, this.width/12, this.height/8);
    fill(255);
    text("REMOVE", this.xpos+this.width*3/4, this.ypos+this.height*7/12);
    rectMode(CORNER);
  }

  rearrange(){
    var prev_key;
    var current_key;
    var difference_in_key;
    var transpose_up_down;

    var number_of_keysig = Math.abs(key-7);
    this.timesig_start_point = this.keysig_start_point+number_of_keysig*(Width/95)+Width/35;
    this.currently_editingX = this.timesig_start_point + this.width/16;
    this.bc=0;
    if(this.start){
      this.currently_editing_num =0;
    }
    prev_key = literal_CtoI.get(this.data[11]);
    current_key = this.mapping(this.is_chocen_sharp);
    difference_in_key = Math.abs(prev_key - current_key);

      var mv_rebalancing_top_down = false;
      var mv_rebalancing_bottom_up = false;
      var if_accidental;
      var string;


      for (var i = 0; i < this.data.length; i+= 12) {
        this.data[i+8] = interval_int_str.get(this.data[i+9]); //id
         string = this.data[i+8];

        if(string.indexOf('#') !== -1){
          if_accidental =1;
          this.data[i+6] = "1";
        }else if(string.indexOf('b') !== -1){
          if_accidental =-1;
          this.data[i+6] = "-1";
        }else{
          if_accidental = 0;
          this.data[i+6] = "0";
        }


        if(if_accidental == 1 && int(this.data[i+10]) + difference_in_key>= 109){
          mv_rebalancing_top_down = true;
        }else if(int(this.data[i+10]) + difference_in_key> 108){
          mv_rebalancing_top_down = true;
        }
        if(if_accidental == -1 && int(this.data[i+10]) + difference_in_key<= 32){
          mv_rebalancing_bottom_up = true;
        }else if(int(this.data[i+10]) + difference_in_key< 33){
          mv_rebalancing_bottom_up = true;
        }
      }

      if(prev_key < current_key){
        transpose_up_down = true;
      }else{
        transpose_up_down = false;
      }

      if(this.key_Changing){
      //  isAccidentalShow();
      }
      var inst_accidentals = this.isAccidentalShow();
      switch (this.is_chocen_sharp) {
        case 0:
          this.chord_cen = this.all_notes_in_key_str[int(this.chocen)];
          break;
          case 1:
            this.chord_cen = if_is_Sharp.get(this.all_notes_in_key_str[int(this.chocen)]);
            break;
            case -1:
              this.chord_cen = if_is_Flat.get(this.all_notes_in_key_str[int(this.chocen)]);
              break;
      }
    for(var i = 0; i<this.data.length; i+=12){
        this.data[i+2] = this.bc.toString();
        this.data[i+11] = this.chord_cen;
        this.data[i+8] = interval_int_str.get(this.data[i+9]); //id
         string = this.data[i+8];
        if(string.indexOf('#') !== -1){
          if_accidental =1;
          this.data[i+6] = "1";
        }else if(string.indexOf('b') !== -1){
          if_accidental =-1;
          this.data[i+6] = "-1";
        }else{
          if_accidental = 0;
          this.data[i+6] = "0";
        }
        var prev_note_mv = int(this.data[i+10]);

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
        this.data[i+10] = prev_note_mv.toString();
        var pos =k_position_calc(prev_note_mv, if_accidental);
        this.data[i] = pos.toString();

        if(this.data[i+1] == "false"){
          if(inst_accidentals[int(this.data[i])] != this.data[i+6]){
            this.data[i+5] = "true";
            inst_accidentals[int(this.data[i])] = this.data[i+6];
          }else{
            this.data[i+5] = "false";
            inst_accidentals[int(this.data[i])] = this.data[i+6];
          }
        }

        if(this.data[i+1] == "true"){
          this.data[i] = "7";
          this.data[i+10] = "72";
        }
        this.currently_editingX+=makeSpace(this.data[i+5]);
        this.n[i/12] = new Note(this.currently_editingX,
        int(this.data[i]),
        this.data[i+1],
        int(this.data[i+2]),
        int(this.data[i+3]),
        int(this.data[i+4]),
        this.data[i+5],
        int(this.data[i+6]),
        this.data[i+7],
        this.data[i+8],
        this.data[i+9],
        int(this.data[i+10]));

        this.n[i/12].ypos=this.y;

        this.bt=int(this.data[i+3]);
        this.plet_count = int(this.data[i+4]);
        this.accidental_val = int(this.data[i+6]);
        this.rest = this.data[i+1];
        this.tie= this.data[i+7];
      switch(this.bt){
        case 0:
          this.currently_editingX_val= Width/5;
          this.bc+=64;
        break;
        case 1:
          this.currently_editingX_val= Width/6;
          this.bc+=48;
        break;
        case 2:
          this.currently_editingX_val= Width/7;
          this.bc+=32;
        break;
        case 3:
          this.currently_editingX_val= Width/8;
          this.bc+=24;
        break;
        case 4:
          this.currently_editingX_val= Width/9;
          this.bc+=16;
        break;
        case 5:
          this.currently_editingX_val= Width/10;
          this.bc+=12;
        break;
        case 6:
          this.currently_editingX_val= Width/13;
          this.bc+=8;
        break;
        case 7:
          this.currently_editingX_val= Width/15;
          this.bc+=6;
        break;
        case 8:
          this.currently_editingX_val= Width/20;
          this.bc+=4;
        break;
        case 12:
          this.currently_editingX_val= Width/7;
          if(this.plet_count >= 3){
            this.bc += 64;
            this.bt -= 10;
            this.plet_count =0;
          }
        break;
        case 14:
          this.currently_editingX_val = Width/9;
          if(this.plet_count >= 3){
            this.bc += 32;
            this.bt -= 10;
            this.plet_count =0;
          }
        break;
        case 16:
          this.currently_editingX_val = Width/13;
          if(this.plet_count >= 3){
            this.bc += 16;
            this.bt -= 10;
            this.plet_count =0;
          }
        break;
        case 18:
          this.currently_editingX_val= Width/17;
          if(this.plet_count >= 3){
            this.bc += 8;
            this.bt -= 10;
            this.plet_count =0;
          }
        break;
      }

        this.currently_editingX += this.currently_editingX_val;
        if(this.start){
          this.currently_editing_num +=1;
        }
      }
      this.key_Changing = false;
      // if(this.plet_count != 0){
      //   writing_plet = true;
      // }else{
      //   writing_plet = false;
      // }

      this.start = false;
      this.grouping();
      // if(!resizing){
      // //  saveData();
      // }
      // resizing = false;

  }
  drawGrouping() {
    for (let i = 0; i < this.n.length; i++){
      if(this.n[i].two_connected){
        this.drawtwoconnected(i);
        i+= 1;
      }else if(this.n[i].four_connected){
        this.drawFourConnected(i);
        i+= 3;
      }else if(this.n[i].three_compound_connected[0]){
        this.drawThreeConnected_0(i);
        i+= 2;
      }else if(this.n[i].three_compound_connected[1]){
        this.drawThreeConnected_1(i);
        i+= 2;
      }else if(this.n[i].three_compound_connected[2]){
        this.drawThreeConnected_2(i);
        i+= 2;
      }else if(this.n[i].two_compound_connected[0]){//58
        this.drawTwoComConnected_0(i);
        i+= 1;
      }else if(this.n[i].two_compound_connected[1]){//85
        this.drawTwoComConnected_1(i);
        i+= 1;
      }else if(this.n[i].four_compound_connected[0]){//3336
        this.drawFourComConnected_0(i);
        i+= 3;
      }else if(this.n[i].four_compound_connected[1]){//6333
        this.drawFourComConnected_1(i);
        i+= 3;
      }else if(this.n[i].five_compound_connected[0]){//33388
        this.drawFiveComConnected_0(i);
        i+= 4;
      }else if(this.n[i].five_compound_connected[1]){//88333
        this.drawFiveComConnected_1(i);
        i+= 4;
      }else if(this.n[i].triplet){
        this.drawTriplet(i);
        i+=2;
      }
    }
  }
  isAccidentalShow(){
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
  // saveData() {
  //   var json_data={
  //     "id": this.id,
  //     "data": [...this.data]
  //   };
  //   xhr.open('POST', '/updatelick', true);
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.send(JSON.stringify(json_data));
  // }
  grouping() {
    for(let [i, ns] of this.n.entries()){
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
              if(i == 0||this.reset){
                ns.consecutive = 0;
                this.reset = false;
              }else if(i > 0){
                if(ns.r == 'false'&&this.n[i-1].r == 'false' && this.n[i].bt == this.n[i-1].bt){
                  ns.consecutive = this.n[i-1].consecutive + 1;
                }else{
                  ns.consecutive = 0;
                }
              }
              if(ns.consecutive == 4||ns.bt == 3||ns.bt == 5||ns.bt == 7){
                ns.consecutive = 0;
              }//consecutive ends
              if(ns.bt > 10){
                ns.consecutive=0;
                this.reset = true;
              } //////////////////////////////////////////////////////////////
              if(ns.bc%16 ==4){

                if(ns.consecutive ==1 && ns.r == 'false' && this.n[i-1].r == 'false'){
                  this.n[i].two_connected = true;
                  this.n[i-1].two_connected = true;

                }else if(ns.consecutive==0&& ns.bt == 5 && this.n[i-1].bt ==8){
                  this.n[i].two_compound_connected[1]= true;
                  this.n[i-1].two_compound_connected[1]= true;
                  this.reset=true;
                }  /////////////////////////////////////////////////////////////////
              }else if(ns.bc%16 == 12){

                if(ns.consecutive == 1 && ns.r == 'false' && this.n[i-1].r == 'false'){
                  this.n[i].two_connected = true;
                  this.n[i-1].two_connected = true;

                }
                if(ns.consecutive==3){
                  this.n[i-2].two_connected = false;
                  this.n[i-3].two_connected = false;

                  this.n[i].four_connected = true;
                  this.n[i-1].four_connected = true;
                  this.n[i-2].four_connected = true;
                  this.n[i-3].four_connected = true;
                  this.reset=true;
                }else if(ns.consecutive ==1 && ns.bt ==8&& ns.two_connected && this.n[i-2].bt == 6 ){
                  this.n[i].two_connected = false;
                  this.n[i-1].two_connected = false;

                  this.n[i].three_compound_connected[1] = true;
                  this.n[i-1].three_compound_connected[1] = true;
                  this.n[i-2].three_compound_connected[1] = true;
                  this.reset=true;
                }else if(ns.bt ==8 && this.n.length>1&&i>1&& this.n[i-2].bt == 8 && this.n[i-1].bt == 6){

                  this.n[i].three_compound_connected[2] = true;
                  this.n[i-1].three_compound_connected[2] = true;
                  this.n[i-2].three_compound_connected[2] = true;
                  this.reset=true;
                }else if(ns.consecutive==0&&ns.bt == 8&&this.n[i-1].bt == 5){
                  this.n[i].two_compound_connected[0]= true;
                  this.n[i-1].two_compound_connected[0]= true;
                  this.reset=true;
                }else if(ns.bt == 8 &&ns.two_connected&& this.n[i-2].bt==18 && this.n[i-3].bt==18 && this.n[i-4].bt==18&&
                  this.n[i].r == 'false'&& this.n[i-1].r == 'false'&&
                  this.n[i-2].r == 'false'&& this.n[i-3].r == 'false'&& this.n[i-4].r == 'false'){
                  this.n[i].five_compound_connected[0] = true;
                  this.n[i-1].five_compound_connected[0] = true;
                  this.n[i-2].five_compound_connected[0] = true;
                  this.n[i-3].five_compound_connected[0] = true;
                  this.n[i-4].five_compound_connected[0] = true;
                  this.reset = true;
                }
                ///////////////////
              }else if(ns.bc%16 ==8){

                if(ns.consecutive ==1 && ns.r == 'false' && this.n[i-1].r == 'false'){
                  this.n[i].two_connected = true;
                  this.n[i-1].two_connected = true;
                }
                if(ns.consecutive==3 && this.n[i-2].two_connected
                  && this.n[i-2].bt == 6 && ns.r == 'false' && this.n[i-1].r == 'false'){
                  this.n[i-2].two_connected = false;
                  this.n[i-3].two_connected = false;

                  this.n[i].four_connected = true;
                  this.n[i-1].four_connected = true;
                  this.n[i-2].four_connected = true;
                  this.n[i-3].four_connected = true;
                  this.reset=true;
                }else if(ns.consecutive == 0 && ns.bt == 6 && this.n[i-1].bt==8 && this.n[i-1].two_connected){ //886
                  this.n[i-1].two_connected = false;
                  this.n[i-2].two_connected = false;

                  this.n[i].three_compound_connected[0] = true;
                  this.n[i-1].three_compound_connected[0] = true;
                  this.n[i-2].three_compound_connected[0] = true;
                  this.reset=true;

                }else if(ns.bt == 6 && i>2&& this.n[i].r == 'false'&& this.n[i-1].r == 'false'&&
                this.n[i-2].r == 'false'&& this.n[i-3].r == 'false'&&
                this.n[i-1].bt ==18 && this.n[i-2].bt ==18&& this.n[i-3].bt ==18){//3336
                  this.n[i].four_compound_connected[0] =true;
                  this.n[i-1].four_compound_connected[0] =true;
                  this.n[i-2].four_compound_connected[0] =true;
                  this.n[i-3].four_compound_connected[0] =true;
                  this.reset=true;
                }else if(ns.bt ==18 && i>2 &&this.n[i].r == 'false'&& this.n[i-1].r == 'false'&&
                this.n[i-2].r == 'false'&& this.n[i-3].r == 'false'&&
                this.n[i-1].bt == 18&&this.n[i-2].bt == 18 &&
                this.n[i-3].bt ==6&&this.n[i-3].bc%16 ==0){
                  this.n[i].four_compound_connected[1] =true;
                  this.n[i-1].four_compound_connected[1] =true;
                  this.n[i-2].four_compound_connected[1] =true;
                  this.n[i-3].four_compound_connected[1] =true;
                  this.reset=true;
                }else if(ns.bt == 18 && i>3 &&
                  this.n[i].r == 'false'&& this.n[i-1].r == 'false'&& this.n[i-2].r == 'false'&&
                  this.n[i-3].r == 'false'&& this.n[i-4].r == 'false'&&
                  this.n[i-1].bt==18 && this.n[i-2].bt==18&&
                  this.n[i-3].bt==8 &&this.n[i-3].two_connected){
                  this.n[i-3].two_connected = false;
                  this.n[i-4].two_connected = false;

                  this.n[i].five_compound_connected[1] = true;
                  this.n[i-1].five_compound_connected[1] = true;
                  this.n[i-2].five_compound_connected[1] = true;
                  this.n[i-3].five_compound_connected[1] = true;
                  this.n[i-4].five_compound_connected[1] = true;
                  this.reset = true;
                }
              }
              //////////////////////////////
       }//loop end

  }// grouping end

   drawtwoconnected(i){
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y];
    var s = up_down_decider(arry);

    if(s == "down"){
      noFill();
      stroke(music_color_op);
        if(this.selected || edit_view){
        stroke(music_color);
      }
      strokeWeight(this.width/400);
      line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
      line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos + lineLength);
      line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
      if(this.n[i].bt == 8){
        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos + lineLength*.8, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength*.8);
      }
      for(let t = 0; t < arry.length; t++){
        this.n[i+t].direction = "down";
      }
    }else{
      noFill();
      stroke(music_color_op);
        if(this.selected || edit_view){
        stroke(music_color);
      }
      strokeWeight(this.width/400);
      line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
      line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos - lineLength);
      line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
      if(this.n[i].bt == 8){
        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos - lineLength*.8, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength*.8);
      }
      for(let t = 0; t < arry.length; t++){
        this.n[i+t].direction = "up";
      }
    }
  }
   drawFourConnected(i){
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y,this.n[i+2].y,this.n[i+3].y];
    var s = up_down_decider(arry);
    var ra = most_radical(arry);

    if(this.n[i].r=="false"&&this.n[i+1].r=="false"&&this.n[i+2].r=="false"&&this.n[i+3].r=="false"){
      if(steep_steady(arry) == 1){ // steep
        if(s == 'down'){
          var x = this.n[i].x   - lineStart;
          var y = this.n[i].pre_ypos + lineLength;
          var x1  = this.n[i+3].x   - lineStart;
          var y1  = this.n[i+3].pre_ypos + lineLength;
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
          line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos + lineLength);
          line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
          if(this.n[i].bt==8){
            line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos + lineLength*.8, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength*.8);
          }

          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));
            line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart,
              slopeCalc(x,y,x1,y1, this.n[i+2].x   - lineStart));
              for(let t = 0; t < arry.length; t++){
                this.n[i+t].direction = "down";
              }
        }else{
          var x = this.n[i].x   + lineStart;
          var y = this.n[i].pre_ypos - lineLength;
          var x1  = this.n[i+3].x   + lineStart;
          var y1  = this.n[i+3].pre_ypos - lineLength;
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
          line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos - lineLength);
          line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
          if(this.n[i].bt==8){
            line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos - lineLength*.8, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength*.8);
          }

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   + lineStart));
            line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,
              slopeCalc(x,y,x1,y1, this.n[i+2].x   + lineStart));
              for(let t = 0; t < arry.length; t++){
                this.n[i+t].direction = "up";
              }
        }
      }else{ //steady
        if(s == 'down'){
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          if(this.n[i].bt==8){
            line(this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);
          }

          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
            line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "down";
            }
        }else{
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+3].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          if(this.n[i].bt==8){
            line(this.n[i+3].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);
          }

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
            line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "up";
            }
        }
      }
    }else{
      this.n[i].groupHasRest = true;
      this.n[i+1].groupHasRest = true;
      this.n[i+2].groupHasRest = true;
      this.n[i+3].groupHasRest = true;
    }


  }
   drawThreeConnected_0(i) {
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y,this.n[i+2].y];
    var s = up_down_decider(arry);
    var ra = most_radical(arry);

    if(this.n[i].r == "false"&&this.n[i+1].r == "false"&&this.n[i+2].r == "false"){
      if(steep_steady(arry) == 1){ // steep
        if(s == 'down'){
          var x = this.n[i].x   - lineStart;
          var y = this.n[i].pre_ypos + lineLength;
          var x1  = this.n[i+2].x   - lineStart;
          var y1  = this.n[i+2].pre_ypos + lineLength;
          var y2 = this.n[i].pre_ypos + lineLength*.8;
          var y3  = this.n[i+2].pre_ypos + lineLength*.8;
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);

          line(this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength*.8, this.n[i+1].x   - lineStart,
            slopeCalc(x,y2,x1,y3, this.n[i+1].x   - lineStart));

          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "down";
            }
        }else{
          var x = this.n[i].x   + lineStart;
          var y = this.n[i].pre_ypos - lineLength;
          var x1  = this.n[i+2].x   + lineStart;
          var y1  = this.n[i+2].pre_ypos - lineLength;
          var y2 = this.n[i].pre_ypos - lineLength*.8;
          var y3  = this.n[i+2].pre_ypos - lineLength*.8;
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);

          line(this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength*.8, this.n[i+1].x   + lineStart,
            slopeCalc(x,y2,x1,y3, this.n[i+1].x   + lineStart));

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   + lineStart));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "up";
            }
        }
      }else{ //steady
        if(s == 'down'){
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

          line(this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);

          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "down";
          }
        }else{
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);

          line(this.n[i+1].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "up";
          }
        }
      }
    }else{
      this.n[i].groupHasRest = true;
      this.n[i+1].groupHasRest = true;
      this.n[i+2].groupHasRest = true;
    }

  }
   drawThreeConnected_1(i) {
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y,this.n[i+2].y];
    var s = up_down_decider(arry);
    var ra = most_radical(arry);

    if(this.n[i].r == "false"&&this.n[i+1].r == "false"&&this.n[i+2].r == "false"){
      if(steep_steady(arry) == 1){ // steep
        if(s == 'down'){
          var x = this.n[i].x   - lineStart;
          var y = this.n[i].pre_ypos + lineLength;
          var x1  = this.n[i+2].x   - lineStart;
          var y1  = this.n[i+2].pre_ypos + lineLength;
          var y2 = this.n[i].pre_ypos + lineLength*.8;
          var y3  = this.n[i+2].pre_ypos + lineLength*.8;
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);

          //---------
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength*.8, this.n[i+1].x   - lineStart,
            slopeCalc(x,y2,x1,y3, this.n[i+1].x   - lineStart));
          //||||||||||||||||||||
          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "down";
            }
        }else{
          var x = this.n[i].x   + lineStart;
          var y = this.n[i].pre_ypos - lineLength;
          var x1  = this.n[i+2].x   + lineStart;
          var y1  = this.n[i+2].pre_ypos - lineLength;
          var y2 = this.n[i].pre_ypos - lineLength*.8;
          var y3  = this.n[i+2].pre_ypos - lineLength*.8;
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);

          line(this.n[i+1].x   + lineStart, slopeCalc(x,y2,x1,y3, this.n[i+1].x   + lineStart), this.n[i+2].x   + lineStart,
            slopeCalc(x,y2,x1,y3, this.n[i+2].x   + lineStart));

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   + lineStart));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "up";
            }
        }
      }else{ //steady
        if(s == 'down'){
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

          line(this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);

          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "down";
          }
        }else{
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);

          line(this.n[i+1].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "up";
          }
        }
      }
    }else{
      this.n[i].groupHasRest = true;
      this.n[i+1].groupHasRest = true;
      this.n[i+2].groupHasRest = true;
    }
  }
   drawThreeConnected_2(i) {
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y,this.n[i+2].y];
    var s = up_down_decider(arry);
    var ra = most_radical(arry);

    if(this.n[i].r == "false"&&this.n[i+1].r == "false"&&this.n[i+2].r == "false"){
      if(steep_steady(arry) == 1){ // steep
        if(s == 'down'){
          var x = this.n[i].x   - lineStart;
          var y = this.n[i].pre_ypos + lineLength;
          var x1  = this.n[i+2].x   - lineStart;
          var y1  = this.n[i+2].pre_ypos + lineLength;
          var y2 = this.n[i].pre_ypos + lineLength*.8;
          var y3  = this.n[i+2].pre_ypos + lineLength*.8;
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);

          //---------
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength*.8, this.n[i].x   + lineStart,
            slopeCalc(x,y2,x1,y3, this.n[i].x   + lineStart));
            line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength*.8, this.n[i+2].x   - lineStart*3,
              slopeCalc(x,y2,x1,y3, this.n[i+2].x   - lineStart*3));
          //||||||||||||||||||||
          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "down";
            }
        }else{
          var x = this.n[i].x   + lineStart;
          var y = this.n[i].pre_ypos - lineLength;
          var x1  = this.n[i+2].x   + lineStart;
          var y1  = this.n[i+2].pre_ypos - lineLength;
          var y2 = this.n[i].pre_ypos - lineLength*.8;
          var y3  = this.n[i+2].pre_ypos - lineLength*.8;
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);

          line(this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength*.8, this.n[i].x   + lineStart*3,
            slopeCalc(x,y2,x1,y3, this.n[i].x   + lineStart*3));
              line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength*.8, this.n[i+2].x   - lineStart,
                slopeCalc(x,y2,x1,y3, this.n[i+2].x   - lineStart));

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   + lineStart));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "up";
            }
        }
      }else{ //steady
        if(s == 'down'){
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

          line(this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i].x   + lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);
          line(this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i+2].x   - lineStart*3, this.n[i+ra[1]].pre_ypos + lineLength*.8);

          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "down";
          }
        }else{
          noFill();
          stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);

          line(this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i].x   + lineStart*3, this.n[i+ra[0]].pre_ypos - lineLength*.8);
          line(this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i+2].x   - lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "up";
          }
        }
      }
    }else{
      this.n[i].groupHasRest = true;
      this.n[i+1].groupHasRest = true;
      this.n[i+2].groupHasRest = true;
    }


  }
   drawTwoComConnected_0(i) {
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y];
    var s = up_down_decider(arry);

    if(this.n[i].r == "false"&&this.n[i+1].r == "false"){
      if(s == "down"){
        var x = this.n[i].x   - lineStart;
        var y = this.n[i].pre_ypos + lineLength*.8;
        var x1  = this.n[i+1].x   - lineStart;
        var y1  = this.n[i+1].pre_ypos + lineLength*.8;
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos + lineLength);
        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);

          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos + lineLength*.8, this.n[i+1].x   - lineStart*3,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart*3));

            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "down";
            }
      }else{
        var x = this.n[i].x   + lineStart;
        var y = this.n[i].pre_ypos - lineLength*.8;
        var x1  = this.n[i+1].x   + lineStart;
        var y1  = this.n[i+1].pre_ypos - lineLength*.8;
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos - lineLength);
        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos - lineLength*.8, this.n[i+1].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));

            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "up";
            }
      }
    }else{
      this.n[i].groupHasRest = true;
      this.n[i+1].groupHasRest = true;
    }


  }
   drawTwoComConnected_1(i) {
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y];
    var s = up_down_decider(arry);

    if(this.n[i].r == "false"&&this.n[i+1].r == "false"){
      if(s == "down"){
        var x = this.n[i].x   - lineStart;
        var y = this.n[i].pre_ypos + lineLength*.8;
        var x1  = this.n[i+1].x   - lineStart;
        var y1  = this.n[i+1].pre_ypos + lineLength*.8;
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos + lineLength);
        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);

          line(this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength*.8, this.n[i].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i].x   + lineStart));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "down";
            }
      }else{
        var x = this.n[i].x   + lineStart;
        var y = this.n[i].pre_ypos - lineLength*.8;
        var x1  = this.n[i+1].x   + lineStart;
        var y1  = this.n[i+1].pre_ypos - lineLength*.8;
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos - lineLength);
        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);

          line(this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength*.8, this.n[i].x   + lineStart*3,
            slopeCalc(x,y,x1,y1, this.n[i].x   + lineStart*3));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "up";
            }
      }
    }else{
      this.n[i].groupHasRest = true;
      this.n[i+1].groupHasRest = true;
    }
  }
   drawFourComConnected_0(i){
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y,this.n[i+2].y,this.n[i+3].y];
    var s = up_down_decider(arry);
    var ra = most_radical(arry);
    var three_vertical=lineLength*.3;

    if(steep_steady(arry) == 1){ // steep
      if(s == 'down'){
        var x = this.n[i].x   - lineStart;
        var y = this.n[i].pre_ypos + lineLength;
        var x1  = this.n[i+3].x   - lineStart;
        var y1  = this.n[i+3].pre_ypos + lineLength;
        var y2 = this.n[i].pre_ypos + lineLength*.8;
        var y3  = this.n[i+3].pre_ypos + lineLength*.8;
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
        line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos + lineLength);
        line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);


        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart,
          slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+2].x   - lineStart));

         line(x,
              y2,
              this.n[i+2].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i+2].x   - lineStart));

              /////3/////
              line(x,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
                x,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              line(this.n[i+2].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
                this.n[i+2].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

              line(x,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
                this.n[i+1].x   - lineStart - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              line(this.n[i+2].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
                this.n[i+1].x   - lineStart + lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              textAlign(CENTER,CENTER);
              textSize(three_vertical);
              strokeWeight(this.width/800);
              text("3",this.n[i+1].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              strokeWeight(this.width/400);
              for(let t = 0; t < arry.length; t++){
                this.n[i+t].direction = "down";
              }
      }else{
        var x = this.n[i].x   + lineStart;
        var y = this.n[i].pre_ypos - lineLength;
        var x1  = this.n[i+3].x   + lineStart;
        var y1  = this.n[i+3].pre_ypos - lineLength;
        var y2  = this.n[i].pre_ypos - lineLength;
        var y3  = this.n[i+3].pre_ypos - lineLength;
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
        line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos - lineLength);
        line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);


        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,
          slopeCalc(x,y,x1,y1, this.n[i+1].x   + lineStart));
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+2].x   + lineStart));

            line(x,
                 y2,
                 this.n[i+2].x   + lineStart,
                 slopeCalc(x,y2,x1,y3, this.n[i+2].x   + lineStart));
                 /////////////////////3//////////////////////////
                 line(x, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1, x, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                 line(this.n[i+2].x   + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                   this.n[i+2].x   + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                 line(x,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                   this.n[i+1].x   + lineStart - lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                 line(this.n[i+2].x   + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                   this.n[i+1].x   + lineStart + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                 textAlign(CENTER,CENTER);
                 textSize(three_vertical);
                 strokeWeight(this.width/800);
                 text("3",this.n[i+1].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                 strokeWeight(this.width/400);
                 for(let t = 0; t < arry.length; t++){
                   this.n[i+t].direction = "up";
                 }
      }
    }else{ //steady
      if(s == 'down'){
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
        line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
        line(this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

          line(this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);

          /////////////////////3//////////////////////////
          line(this.n[i].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
            this.n[i].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(this.n[i+2].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
            this.n[i+2].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

          line(this.n[i].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
            this.n[i+1].x   - lineStart - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(this.n[i+2].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
            this.n[i+1].x   - lineStart + lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+1].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          strokeWeight(this.width/400);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "down";
          }
      }else{
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
        line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
        line(this.n[i+3].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);

        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);

          line(this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);

          /////////////////////3//////////////////////////
          line(this.n[i].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
            this.n[i].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(this.n[i+2].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
            this.n[i+2].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          line(this.n[i].x   + lineStart,

            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
            this.n[i+1].x   + lineStart - lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(this.n[i+2].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
            this.n[i+1].x   + lineStart + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+1].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          strokeWeight(this.width/400);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "up";
          }
      }
    }
  }
   drawFourComConnected_1(i){
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y,this.n[i+2].y,this.n[i+3].y];
    var s = up_down_decider(arry);
    var ra = most_radical(arry);
    var three_vertical=lineLength*.3;

    if(steep_steady(arry) == 1){ // steep
      if(s == 'down'){
        var x = this.n[i].x   - lineStart;
        var y = this.n[i].pre_ypos + lineLength;
        var x1  = this.n[i+3].x   - lineStart;
        var y1  = this.n[i+3].pre_ypos + lineLength;
        var y2 = this.n[i].pre_ypos + lineLength*.8;
        var y3  = this.n[i+3].pre_ypos + lineLength*.8;
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
        line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos + lineLength);
        line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);


        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart,
          slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+2].x   - lineStart));

         line(this.n[i+1].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i+1].x   - lineStart),
              this.n[i+3].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i+3].x   - lineStart));

              /////3/////
              line(this.n[i+1].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
                this.n[i+1].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              line(this.n[i+3].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
                this.n[i+3].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

              line(this.n[i+1].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
                this.n[i+2].x   - lineStart - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              line(this.n[i+3].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
                this.n[i+2].x   - lineStart + lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              textAlign(CENTER,CENTER);
              textSize(three_vertical);
              strokeWeight(this.width/800);
              text("3",this.n[i+2].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              strokeWeight(this.width/400);
              for(let t = 0; t < arry.length; t++){
                this.n[i+t].direction = "down";
              }
      }else{
        var x = this.n[i].x   + lineStart;
        var y = this.n[i].pre_ypos - lineLength;
        var x1  = this.n[i+3].x   + lineStart;
        var y1  = this.n[i+3].pre_ypos - lineLength;
        var y2  = this.n[i].pre_ypos - lineLength*.8;
        var y3  = this.n[i+3].pre_ypos - lineLength*.8;
        noFill();
        stroke(music_color_op);
        if(this.selected || edit_view){
        stroke(music_color);
      }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
        line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos - lineLength);
        line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);


        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,
          slopeCalc(x,y,x1,y1, this.n[i+1].x   + lineStart));
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+2].x   + lineStart));

            line(this.n[i+1].x   + lineStart,
                 slopeCalc(x,y2,x1,y3, this.n[i+1].x   + lineStart),
                 this.n[i+3].x   + lineStart,
                 slopeCalc(x,y2,x1,y3, this.n[i+3].x   + lineStart));

                 /////////////////////3//////////////////////////
                 line(this.n[i+1].x   + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                   this.n[i+1].x   + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                 line(this.n[i+3].x   + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                   this.n[i+3].x   + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                 line(this.n[i+1].x   + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                   this.n[i+2].x   + lineStart - lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                 line(this.n[i+3].x   + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                   this.n[i+2].x   + lineStart + lineStart,
                   this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                 textAlign(CENTER,CENTER);
                 textSize(three_vertical);
                 strokeWeight(this.width/800);
                 text("3",this.n[i+2].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                 strokeWeight(this.width/400);
                 for(let t = 0; t < arry.length; t++){
                   this.n[i+t].direction = "up";
                 }
      }
    }else{ //steady
      if(s == 'down'){
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
        line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
        line(this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

          line(this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);

          /////3/////
          line(this.n[i+1].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
            this.n[i+1].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(this.n[i+3].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
            this.n[i+3].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

          line(this.n[i+1].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
            this.n[i+2].x   - lineStart - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(this.n[i+3].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
            this.n[i+2].x   - lineStart + lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+2].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          strokeWeight(this.width/400);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "down";
          }
      }else{
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
        line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
        line(this.n[i+3].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);

        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);

          line(this.n[i+3].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i+1].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);

          /////////////////////3//////////////////////////
          line(this.n[i+1].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
            this.n[i+1].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(this.n[i+3].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
            this.n[i+3].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          line(this.n[i+1].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
            this.n[i+2].x   + lineStart - lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(this.n[i+3].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
            this.n[i+2].x   + lineStart + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+2].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          strokeWeight(this.width/400);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "up";
          }
      }
    }
  }
   drawFiveComConnected_0(i){
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y,this.n[i+2].y,this.n[i+3].y,this.n[i+4].y];
    var s = up_down_decider(arry);
    var ra = most_radical(arry);
    var three_vertical=lineLength*.3;

    if(steep_steady(arry) == 1){ // steep
      if(s == 'down'){
        var x = this.n[i].x   - lineStart;
        var y = this.n[i].pre_ypos + lineLength;
        var x1  = this.n[i+4].x   - lineStart;
        var y1  = this.n[i+4].pre_ypos + lineLength;
        var y2 = this.n[i].pre_ypos + lineLength*.8;
        var y3  = this.n[i+4].pre_ypos + lineLength*.8;
        noFill();
        stroke(music_color_op);
          if(this.selected || edit_view){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
        line(this.n[i+4].x   - lineStart, this.n[i+4].pre_ypos, this.n[i+4].x   - lineStart, this.n[i+4].pre_ypos + lineLength);
        line(this.n[i+4].x   - lineStart, this.n[i+4].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);


        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart,
          slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+2].x   - lineStart));
            line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart,
              slopeCalc(x,y,x1,y1, this.n[i+3].x   - lineStart));

         line(this.n[i].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i].x   - lineStart),
              this.n[i+2].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i+2].x   - lineStart));
         line(this.n[i+3].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i+3].x   - lineStart),
              this.n[i+4].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i+4].x   - lineStart));

              /////3/////
              line(this.n[i].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
                this.n[i].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              line(this.n[i+2].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
                this.n[i+2].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

              line(this.n[i].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
                this.n[i+1].x   - lineStart - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              line(this.n[i+2].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
                this.n[i+1].x   - lineStart + lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              textAlign(CENTER,CENTER);
              textSize(three_vertical);
              strokeWeight(this.width/800);
              text("3",this.n[i+1].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              strokeWeight(this.width/400);
              for(let t = 0; t < arry.length; t++){
                this.n[i+t].direction = "down";
              }
      }else{
        var x = this.n[i].x   + lineStart;
        var y = this.n[i].pre_ypos - lineLength;
        var x1  = this.n[i+4].x   + lineStart;
        var y1  = this.n[i+4].pre_ypos - lineLength;
        var y2  = this.n[i].pre_ypos - lineLength*.8;
        var y3  = this.n[i+4].pre_ypos - lineLength*.8;
        noFill();
        stroke(music_color_op);
            if(this.selected || edit_view){
            stroke(music_color);
          }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
        line(this.n[i+4].x   + lineStart, this.n[i+4].pre_ypos, this.n[i+4].x   + lineStart, this.n[i+4].pre_ypos - lineLength);
        line(this.n[i+4].x   + lineStart, this.n[i+4].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);


        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,
          slopeCalc(x,y,x1,y1, this.n[i+1].x   + lineStart));
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+2].x   + lineStart));
            line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart,
              slopeCalc(x,y,x1,y1, this.n[i+3].x   + lineStart));

            line(this.n[i].x   + lineStart,
                 slopeCalc(x,y2,x1,y3, this.n[i].x   + lineStart),
                 this.n[i+2].x   + lineStart,
                 slopeCalc(x,y2,x1,y3, this.n[i+2].x   + lineStart));
                 line(this.n[i+3].x   + lineStart,
                      slopeCalc(x,y2,x1,y3, this.n[i+3].x   + lineStart),
                      this.n[i+4].x   + lineStart,
                      slopeCalc(x,y2,x1,y3, this.n[i+4].x   + lineStart));

                      /////////////////////3//////////////////////////
                      line(this.n[i].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                        this.n[i].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                      line(this.n[i+2].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                        this.n[i+2].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                      line(this.n[i].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                        this.n[i+1].x   + lineStart - lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                      line(this.n[i+2].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                        this.n[i+1].x   + lineStart + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                      textAlign(CENTER,CENTER);
                      textSize(three_vertical);
                      strokeWeight(this.width/800);
                      text("3",this.n[i+1].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                      strokeWeight(this.width/400);
                      for(let t = 0; t < arry.length; t++){
                        this.n[i+t].direction = "up";
                      }
      }
    }else{ //steady
      if(s == 'down'){
        noFill();
        stroke(music_color_op);
              if(this.selected || edit_view){
              stroke(music_color);
            }
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
        line(this.n[i+4].x   - lineStart, this.n[i+4].pre_ypos, this.n[i+4].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
        line(this.n[i+4].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

          line(this.n[i+4].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);
          line(this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);

          /////3/////
          line(this.n[i].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
            this.n[i].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(this.n[i+2].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
            this.n[i+2].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

          line(this.n[i].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
            this.n[i+1].x   - lineStart - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(this.n[i+2].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
            this.n[i+1].x   - lineStart + lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+1].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          strokeWeight(this.width/400);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "down";
          }
      }else{
        noFill();
        stroke(music_color_op);
          if(this.selected){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
        line(this.n[i+4].x   + lineStart, this.n[i+4].pre_ypos, this.n[i+4].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
        line(this.n[i+4].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);

        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);

          line(this.n[i+4].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i+3].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);
          line(this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);

          /////////////////////3//////////////////////////
          line(this.n[i].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
            this.n[i].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(this.n[i+2].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
            this.n[i+2].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          line(this.n[i].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
            this.n[i+1].x   + lineStart - lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(this.n[i+2].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
            this.n[i+1].x   + lineStart + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+1].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          strokeWeight(this.width/400);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "up";
          }
      }
    }
  }
   drawFiveComConnected_1(i){
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y,this.n[i+2].y,this.n[i+3].y,this.n[i+4].y];
    var s = up_down_decider(arry);
    var ra = most_radical(arry);
    var three_vertical=lineLength*.3;

    if(steep_steady(arry) == 1){ // steep
      if(s == 'down'){
        var x = this.n[i].x   - lineStart;
        var y = this.n[i].pre_ypos + lineLength;
        var x1  = this.n[i+4].x   - lineStart;
        var y1  = this.n[i+4].pre_ypos + lineLength;
        var y2 = this.n[i].pre_ypos + lineLength*.8;
        var y3  = this.n[i+4].pre_ypos + lineLength*.8;
        noFill();
        stroke(music_color_op);
  if(this.selected || edit_view){
  stroke(music_color);
}
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
        line(this.n[i+4].x   - lineStart, this.n[i+4].pre_ypos, this.n[i+4].x   - lineStart, this.n[i+4].pre_ypos + lineLength);
        line(this.n[i+4].x   - lineStart, this.n[i+4].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);


        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart,
          slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+2].x   - lineStart));
            line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart,
              slopeCalc(x,y,x1,y1, this.n[i+3].x   - lineStart));

         line(this.n[i].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i].x   - lineStart),
              this.n[i+1].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i+1].x   - lineStart));
         line(this.n[i+2].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i+2].x   - lineStart),
              this.n[i+4].x   - lineStart,
              slopeCalc(x,y2,x1,y3, this.n[i+4].x   - lineStart));

              /////3/////
              line(this.n[i+2].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
                this.n[i+2].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              line(this.n[i+4].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
                this.n[i+4].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

              line(this.n[i+2].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
                this.n[i+3].x   - lineStart - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              line(this.n[i+4].x   - lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
                this.n[i+3].x   - lineStart + lineStart,
                this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              textAlign(CENTER,CENTER);
              textSize(three_vertical);
              strokeWeight(this.width/800);
              text("3",this.n[i+3].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              strokeWeight(this.width/400);
              for(let t = 0; t < arry.length; t++){
                this.n[i+t].direction = "down";
              }
      }else{
        var x = this.n[i].x   + lineStart;
        var y = this.n[i].pre_ypos - lineLength;
        var x1  = this.n[i+4].x   + lineStart;
        var y1  = this.n[i+4].pre_ypos - lineLength;
        var y2  = this.n[i].pre_ypos - lineLength*.8;
        var y3  = this.n[i+4].pre_ypos - lineLength*.8;
        noFill();
        stroke(music_color_op);
          if(this.selected){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
        line(this.n[i+4].x   + lineStart, this.n[i+4].pre_ypos, this.n[i+4].x   + lineStart, this.n[i+4].pre_ypos - lineLength);
        line(this.n[i+4].x   + lineStart, this.n[i+4].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);


        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,
          slopeCalc(x,y,x1,y1, this.n[i+1].x   + lineStart));
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+2].x   + lineStart));
            line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart,
              slopeCalc(x,y,x1,y1, this.n[i+3].x   + lineStart));

            line(this.n[i].x   + lineStart,
                 slopeCalc(x,y2,x1,y3, this.n[i].x   + lineStart),
                 this.n[i+1].x   + lineStart,
                 slopeCalc(x,y2,x1,y3, this.n[i+1].x   + lineStart));
                 line(this.n[i+2].x   + lineStart,
                      slopeCalc(x,y2,x1,y3, this.n[i+2].x   + lineStart),
                      this.n[i+4].x   + lineStart,
                      slopeCalc(x,y2,x1,y3, this.n[i+4].x   + lineStart));

                      /////////////////////3//////////////////////////
                      line(this.n[i+2].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                        this.n[i+2].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                      line(this.n[i+4].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
                        this.n[i+4].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                      line(this.n[i+2].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                        this.n[i+3].x   + lineStart - lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                      line(this.n[i+4].x   + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
                        this.n[i+3].x   + lineStart + lineStart,
                        this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

                      textAlign(CENTER,CENTER);
                      textSize(three_vertical);
                      strokeWeight(this.width/800);
                      text("3",this.n[i+3].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
                      strokeWeight(this.width/400);
                      for(let t = 0; t < arry.length; t++){
                        this.n[i+t].direction = "up";
                      }
      }
    }else{ //steady
      if(s == 'down'){
        noFill();
        stroke(music_color_op);
  if(this.selected || edit_view){
  stroke(music_color);
}
        strokeWeight(this.width/400);
        line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
        line(this.n[i+4].x   - lineStart, this.n[i+4].pre_ypos, this.n[i+4].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
        line(this.n[i+4].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

        line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+3].x   - lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

          line(this.n[i+4].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);
          line(this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);

          /////3/////
          line(this.n[i+2].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
            this.n[i+2].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(this.n[i+4].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1,
            this.n[i+4].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

          line(this.n[i+2].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
            this.n[i+3].x   - lineStart - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(this.n[i+4].x   - lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2,
            this.n[i+3].x   - lineStart + lineStart,
            this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+3].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          strokeWeight(this.width/400);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "down";
          }
      }else{
        noFill();
        stroke(music_color_op);
          if(this.selected){
          stroke(music_color);
        }
        strokeWeight(this.width/400);
        line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
        line(this.n[i+4].x   + lineStart, this.n[i+4].pre_ypos, this.n[i+4].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
        line(this.n[i+4].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);

        line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+3].x   + lineStart, this.n[i+3].pre_ypos, this.n[i+3].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);

          line(this.n[i+4].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);
          line(this.n[i+1].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);

          /////////////////////3//////////////////////////
          line(this.n[i+2].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
            this.n[i+2].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(this.n[i+4].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1,
            this.n[i+4].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          line(this.n[i+2].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
            this.n[i+3].x   + lineStart - lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(this.n[i+4].x   + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2,
            this.n[i+3].x   + lineStart + lineStart,
            this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+3].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          strokeWeight(this.width/400);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "up";
          }
      }
    }
  }
   drawTriplet(i) {
    var lineStart = 7.3*this.width/700;
    var lineLength = 120*this.height/400;
    var arry = [this.n[i].y, this.n[i+1].y,this.n[i+2].y];
    var s = up_down_decider(arry);
    var ra = most_radical(arry);
    var three_vertical=lineLength*.3;
    stroke(music_color_op);
  if(this.selected || edit_view){
  stroke(music_color);
}
    strokeWeight(this.width/400);
    if(steep_steady(arry) == 1){ // steep
      if(s == 'down'){
        var x = this.n[i].x   - lineStart;
        var y = this.n[i].pre_ypos + lineLength;
        var x1  = this.n[i+2].x   - lineStart;
        var x2  = this.n[i+1].x   - lineStart;
        var y1  = this.n[i+2].pre_ypos + lineLength;
        var y2 = this.n[i].pre_ypos + lineLength*.8;
        var y3  = this.n[i+2].pre_ypos + lineLength*.8;

        if(this.n[i].r=='false'&&this.n[i+1].r=='false'&&this.n[i+2].r=='false'){
          noFill();
          stroke(music_color_op);
            if(this.selected){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength);

          if(this.n[i].bt == 18){
            line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos + lineLength*.8, this.n[i].x   - lineStart, this.n[i].pre_ypos + lineLength*.8);
          }


          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   - lineStart));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "down";
            }
        }else{
          this.n[i].groupHasRest = true;
          this.n[i+1].groupHasRest = true;
          this.n[i+2].groupHasRest = true;
        }

          /////3/////
          line(x, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1, x, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(x1, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.1, x1, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);

          line(x, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2, x2 - lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          line(x1, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2, x2 + lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+1].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
          strokeWeight(this.width/400);

      }else{
        var x = this.n[i].x   + lineStart;
        var y = this.n[i].pre_ypos - lineLength;
        var x1  = this.n[i+2].x   + lineStart;
        var x2  = this.n[i+1].x   + lineStart;
        var y1  = this.n[i+2].pre_ypos - lineLength;
        var y2 = this.n[i].pre_ypos - lineLength*.8;
        var y3  = this.n[i+2].pre_ypos - lineLength*.8;

        if(this.n[i].r=='false'&&this.n[i+1].r=='false'&&this.n[i+2].r=='false'){
          noFill();
          stroke(music_color_op);
  if(this.selected || edit_view){
  stroke(music_color);
}
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength);

          if(this.n[i].bt==18){
            line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos - lineLength*.8, this.n[i].x   + lineStart, this.n[i].pre_ypos - lineLength*.8);
          }

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,
            slopeCalc(x,y,x1,y1, this.n[i+1].x   + lineStart));
            for(let t = 0; t < arry.length; t++){
              this.n[i+t].direction = "up";
            }
        }else{
          this.n[i].groupHasRest = true;
          this.n[i+1].groupHasRest = true;
          this.n[i+2].groupHasRest = true;
        }

          /////////////////////3//////////////////////////
          line(x, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1, x, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(x1, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.1, x1, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          line(x, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2, x2 - lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          line(x1, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2, x2 + lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);

          textAlign(CENTER,CENTER);
          textSize(three_vertical);
          strokeWeight(this.width/800);
          text("3",this.n[i+1].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
          strokeWeight(this.width/400);

      }
    }else{ //steady
      if(s == 'down'){

        if(this.n[i].r=='false'&&this.n[i+1].r=='false'&&this.n[i+2].r=='false'){
          noFill();
          stroke(music_color_op);
            if(this.selected){
            stroke(music_color);
          }
          strokeWeight(this.width/400);
          line(this.n[i].x   - lineStart, this.n[i].pre_ypos, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          line(this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);

          if(this.n[i].bt==18){
            line(this.n[i+2].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8, this.n[i].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength*.8);
          }

          line(this.n[i+1].x   - lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   - lineStart, this.n[i+ra[1]].pre_ypos + lineLength);
          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "down";
          }
        }else{
          this.n[i].groupHasRest = true;
          this.n[i+1].groupHasRest = true;
          this.n[i+2].groupHasRest = true;
        }


        line(this.n[i].x   - lineStart,
             this.n[i+ra[1]].pre_ypos + lineLength + lineLength*.1,
             this.n[i].x   - lineStart,
             this.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);
             line(this.n[i].x   - lineStart,
                  this.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2,
                  this.n[i+1].x   - lineStart - three_vertical,
                  this.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);
             line(this.n[i+2].x   - lineStart,
                  this.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2,
                  this.n[i+1].x   - lineStart + three_vertical,
                  this.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);
        line(this.n[i+2].x   - lineStart,
              this.n[i+ra[1]].pre_ypos + lineLength + lineLength*.1,
              this.n[i+2].x   - lineStart,
              this.n[i+ra[1]].pre_ypos + lineLength + lineLength*.2);

              textAlign(CENTER,CENTER);
              textSize(three_vertical);
              strokeWeight(this.width/800);
              text("3",this.n[i+1].x-lineStart, this.n[i+ra[1]].pre_ypos + lineLength+lineLength*.2);
              strokeWeight(this.width/400);

      }else{

        if(this.n[i].r=='false'&&this.n[i+1].r=='false'&&this.n[i+2].r=='false'){
          noFill();
          stroke(music_color_op);
  if(this.selected || edit_view){
  stroke(music_color);
}
          strokeWeight(this.width/400);
          line(this.n[i].x   + lineStart, this.n[i].pre_ypos, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+2].pre_ypos, this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);
          line(this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength);

          if(this.n[i].bt==18){
            line(this.n[i+2].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8, this.n[i].x   + lineStart, this.n[i+ra[0]].pre_ypos - lineLength*.8);
          }

          line(this.n[i+1].x   + lineStart, this.n[i+1].pre_ypos, this.n[i+1].x   + lineStart,this.n[i+ra[0]].pre_ypos - lineLength);

          for(let t = 0; t < arry.length; t++){
            this.n[i+t].direction = "up";
          }
        }else{
          this.n[i].groupHasRest = true;
          this.n[i+1].groupHasRest = true;
          this.n[i+2].groupHasRest = true;
        }


        line(this.n[i].x   + lineStart,
             this.n[i+ra[0]].pre_ypos - lineLength - lineLength*.1,
             this.n[i].x   + lineStart,
             this.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);
             line(this.n[i].x   + lineStart,
                  this.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2,
                  this.n[i+1].x   + lineStart - three_vertical,
                  this.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);
             line(this.n[i+2].x   + lineStart,
                  this.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2,
                  this.n[i+1].x   + lineStart + three_vertical,
                  this.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);
        line(this.n[i+2].x   + lineStart,
              this.n[i+ra[0]].pre_ypos - lineLength - lineLength*.1,
              this.n[i+2].x   + lineStart,
              this.n[i+ra[0]].pre_ypos - lineLength - lineLength*.2);

              textAlign(CENTER,CENTER);
              textSize(three_vertical);
              strokeWeight(this.width/800);
              text("3",this.n[i+1].x+lineStart, this.n[i+ra[0]].pre_ypos - lineLength-lineLength*.2);
              strokeWeight(this.width/400);

      }
    }
  }



  mapping(map){
    var ck;
    switch (map) {
      case 0:
      k_interval_change_int_str(this.all_notes_in_key_str[int(this.chocen)])
      k_interval_change(this.all_notes_in_key_str[int(this.chocen)])
       ck = literal_CtoI.get(this.all_notes_in_key_str[int(this.chocen)]);
       this.data[11] = this.all_notes_in_key_str[int(this.chocen)];
        break;
        case 1:
        k_interval_change_int_str(if_is_Sharp.get(this.all_notes_in_key_str[int(this.chocen)]));
        k_interval_change(if_is_Sharp.get(this.all_notes_in_key_str[int(this.chocen)]));
         ck = literal_CtoI.get(if_is_Sharp.get(this.all_notes_in_key_str[int(this.chocen)]));
         this.data[11] = if_is_Sharp.get(this.all_notes_in_key_str[int(this.chocen)]);
          break;
          case -1:
          k_interval_change_int_str(if_is_Flat.get(this.all_notes_in_key_str[int(this.chocen)]));
          k_interval_change(if_is_Flat.get(this.all_notes_in_key_str[int(this.chocen)]));
           ck = literal_CtoI.get(if_is_Flat.get(this.all_notes_in_key_str[int(this.chocen)]));
           this.data[11] = if_is_Flat.get(this.all_notes_in_key_str[int(this.chocen)])
            break;
    }
    return ck;
  }
  drawTie(i){
     var h = 33*this.height/400;
     var ot = Width/100;
     var it = Width/160;
     if(this.n[i].direction == "down" && this.n[i-1].direction == "down"){
       var x = this.n[i].x ;
       var y = this.n[i].pre_ypos -h;
       var x1 = this.n[i-1].x ;
       var y1 = this.n[i-1].pre_ypos -h;
       if(this.n[i].y >= this.n[i-1].y){
         beginShape();
         fill(music_color_op);
           if(this.selected || edit_view){
           fill(music_color);
         }
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
         fill(music_color_op);
  if(this.selected || edit_view){
  fill(music_color);
}
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
     }else if(this.n[i].direction == "up" && this.n[i-1].direction == "up"){
       var x = this.n[i].x ;
       var y = this.n[i].pre_ypos +h;
       var x1 = this.n[i-1].x ;
       var y1 = this.n[i-1].pre_ypos +h;
       if(this.n[i].y >= this.n[i-1].y){
         beginShape();
         fill(music_color_op);
  if(this.selected || edit_view){
  fill(music_color);
}
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
         fill(music_color_op);
  if(this.selected || edit_view){
  fill(music_color);
}
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
     }else if(this.n[i].direction != this.n[i-1].direction){
       var arry = [this.n[i].y, this.n[i-1].y];
       var s = up_down_decider(arry);
       if(s == "down"){
         var x = this.n[i].x ;
         var y = this.n[i].pre_ypos -h;
         var x1 = this.n[i-1].x ;
         var y1 = this.n[i-1].pre_ypos -h;
         if(this.n[i].y >= this.n[i-1].y){
           beginShape();
           fill(music_color_op);
  if(this.selected || edit_view){
  fill(music_color);
}
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
           fill(music_color_op);
  if(this.selected || edit_view){
  fill(music_color);
}
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
         var x = this.n[i].x ;
         var y = this.n[i].pre_ypos +h;
         var x1 = this.n[i-1].x ;
         var y1 = this.n[i-1].pre_ypos +h;
         if(this.n[i].y >= this.n[i-1].y){
           beginShape();
           fill(music_color_op);
  if(this.selected || edit_view){
  fill(music_color);
}
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
           fill(music_color_op);
  if(this.selected || edit_view){
  fill(music_color);
}
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
  all_note_in_Key(k) {
    switch (k) {
      case 0:
        this.all_notes_in_key_str = ["C#","D#","F","F#","G#","A#","C"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 1:
        this.all_notes_in_key_str = ["F#","G#","A#","B","C#","D#","F"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 2:
        this.all_notes_in_key_str = ["B","C#","D#","E","F#","G#","A#"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 3:
        this.all_notes_in_key_str = ["E","F#","G#","A","B","C#","D#"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 4:
        this.all_notes_in_key_str = ["A","B","C#","D","E","F#","G#"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 5:
        this.all_notes_in_key_str = ["D","E","F#","G","A","B","C#"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 6:
        this.all_notes_in_key_str = ["G","A","B","C","D","E","F#"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 7:
        this.all_notes_in_key_str = ["C","D","E","F","G","A","B"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 8:
        this.all_notes_in_key_str = ["F","G","A","Bb","C","D","E"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 9:
        this.all_notes_in_key_str = ["Bb","C","D","Eb","F","G","A"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 10:
        this.all_notes_in_key_str = ["Eb","F","G","Ab","Bb","C","D"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 11:
        this.all_notes_in_key_str = ["Ab","Bb","C","Db","Eb","F","G"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 12:
        this.all_notes_in_key_str = ["Db","Eb","F","Gb","Ab","Bb","C"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 13:
        this.all_notes_in_key_str = ["Gb","Ab","Bb","B","Db","Eb","F"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
      case 14:
        this.all_notes_in_key_str = ["Cb","Db","Eb","E","Gb","Ab","Bb"];
        for(var i = 0; i<7; i++){
          this.all_notes_in_key_greek.set(this.all_notes_in_key_str[i], greek_order[i]);
        }
      break;
    }
  }
}

  function DrawSharp(x, y, w, h){
  strokeWeight(Width/600);
  line(x+(6*w/10), y+(h/10),x+(6*w/10), y+(8*h/10));
  line(x+(4*w/10), y+(2*h/10),x+(4*w/10), y+(9*h/10));
  strokeWeight(Width/500);
  line(x+(2*w/10), y+(4*h/10),x+(8*w/10), y+(2*h/10));
  line(x+(2*w/10), y+(8*h/10),x+(8*w/10), y+(6*h/10));
}
  function DrawFlat(x, y, w, h){
  strokeCap(ROUND);
  strokeWeight(Width/400);
  beginShape();
  vertex(x+(4*w/10), y+(h/10));
  vertex(x+(4*w/10), y+(8*h/10));
   bezierVertex(x+(6*w/10), y+(8*h/10),
                x+(6*w/10), y+(2*h/10),
                x+(4*w/10), y+(6*h/10));
  endShape();
}
  function DrawNat(x, y, w, h){
  strokeCap(SQUARE);
  strokeWeight(Width/400);
  line(x+(4*w/10), y+(h/10),x+(4*w/10), y+(7*h/10));
  line(x+(6*w/10), y+(3*h/10),x+(6*w/10), y+(9*h/10));
  strokeWeight(Width/400);
  line(x+(4*w/10), y+(7*h/10),x+(6*w/10), y+(6*h/10));
  line(x+(6*w/10), y+(3*h/10),x+(4*w/10), y+(4*h/10));
}
function slopeCalc(x, y, x1, y1, x2) {
  var slope = (y-y1) / (x - x1);
  var b = y1 - slope * x1;
  return x2 * slope + b;
}
function tie_xy(s, x, y, x1, y1, optional_inverse, thickness){
  var xy = [];
  var slope2 = (y-y1) / (x-x1) ;
  var inverse = -1;
  // if optional_inverse == 1 then tie goes upward and vasa versa
 xy[0] = ((x+x1)/2)+thickness * optional_inverse*s.cos(s.atan(inverse/slope2));
 xy[1] = ((y+y1)/2)+thickness * optional_inverse*s.sin(s.atan(inverse/slope2));
  return xy;
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
function steep_steady(ys) {
  for(var i =0; i < ys.length-1; i++){
    if(Math.abs(ys[i] - ys[i+1]) > 4){
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
