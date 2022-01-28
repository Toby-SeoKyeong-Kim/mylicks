class Note {
  constructor(x, y, r, bc, bt, pc, as, av, t, id, int, mv) {
    this.x = x; //float
    this.y= y;  //int
    this.r= r; //bool
    this.bc = bc; //int
    this.bt = bt; //int
    this.pc = pc;  //int
    this.as = as; //bool
    this.av = av; //int
    this.tie = t; //bool
    this.id = id;
    this.interval = int;
    this.mv = mv;
    this.key;
    this.height;
    this.width;
    this.ypos;
    this.pre_ypos;

    this.selected = false;
    this.lickSelected = false;
    this.completePlet = false;
    this.consecutive;
    this.octave_consecutive;
    this.octave_control;
    this.stem = true;
    this.four_connected = false;
    this.two_connected = false;
    this.compound_connected = false;
    this.three_compound_connected = [false, false, false];
    this.two_compound_connected = [false, false];
    this.four_compound_connected = [false, false];
    this.five_compound_connected = [false, false];
    this.triplet = false;
    this.direction = "";
    this.groupHasRest=false;
  }

  Draw(){
    this.pre_ypos = ypos_moving_val+this.ypos+y_indexs[this.y]*(this.height/12);
    switch (this.av) {
      case -1:
        if(this.mv >= 32 && this.mv <= 43){
          this.octave_control = -2;
        }else if(this.mv >= 44 && this.mv <= 55){
          this.octave_control = -1;
        }else if(this.mv >= 56 && this.mv <= 84){
          this.octave_control = 0;
        }else if(this.mv >= 85 && this.mv <= 96){
          this.octave_control = 1;
        }else if(this.mv >= 97 && this.mv <= 108){
          this.octave_control = 2;
        }
      break;
      case 0:
        if(this.mv >= 33 && this.mv <= 43){
          this.octave_control = -2;
        }else if(this.mv >= 45 && this.mv <= 55){
          this.octave_control = -1;
        }else if(this.mv >= 57 && this.mv <= 84){
          this.octave_control = 0;
        }else if(this.mv >= 86 && this.mv <= 96){
          this.octave_control = 1;
        }else if(this.mv >= 98 && this.mv <= 108){
          this.octave_control = 2;
        }
      break;
      case 1:
        if(this.mv >= 33 && this.mv <= 44){
          this.octave_control = -2;
        }else if(this.mv >= 45 && this.mv <= 56){
          this.octave_control = -1;
        }else if(this.mv >= 57 && this.mv <= 85){
          this.octave_control = 0;
        }else if(this.mv >= 86 && this.mv <= 97){
          this.octave_control = 1;
        }else if(this.mv >= 98 && this.mv <= 109){
          this.octave_control = 2;
        }
      break;
    }
    if(this.completePlet){
      if(!this.four_compound_connected[0]&&!this.four_compound_connected[1]&&
        !this.five_compound_connected[0]&&!this.five_compound_connected[1]){
        this.triplet=true;
      }else{
        this.triplet=false;
      }
    }
    if(this.four_connected|| ///////
      this.two_connected||   ///////
      this.compound_connected||
      this.three_compound_connected[0]|| //886
      this.three_compound_connected[1]|| //688
      this.three_compound_connected[2]|| //868
      this.two_compound_connected[0]||//58
      this.two_compound_connected[1]||//85
      this.four_compound_connected[0]||//3336
      this.four_compound_connected[1]||//6333
      this.five_compound_connected[0]||//3338
      this.five_compound_connected[1]||//8333
      this.completePlet||
      this.triplet){
        this.stem = false;
    }else{
      this.stem = true;
      if (this.y<=7){
        this.direction = "down";
      }else{
        this.direction = "up";
      }
    }
    if(this.groupHasRest){
      this.stem = true;
      if (this.y<=7){
        this.direction = "down";
      }else{
        this.direction = "up";
      }
    }
    if(this.pc == 1&&!this.completePlet){
      switch (this.bt) {
        case 12:
        noFill();
        stroke(255,0,0,130);
            line(this.x, ypos_moving_val+this.ypos+5.5*(this.height/12), this.x + this.width/4, ypos_moving_val+this.ypos+5.5*(this.height/12));
          break;
          case 14:
          noFill();
          stroke(255,0,0,130);
              line(this.x, ypos_moving_val+this.ypos+5.5*(this.height/12), this.x + this.width/6, ypos_moving_val+this.ypos+5.5*(this.height/12));

            break;
            case 16:
            noFill();
            stroke(255,0,0,130);
                line(this.x, ypos_moving_val+this.ypos+5.5*(this.height/12), this.x + this.width/11, ypos_moving_val+this.ypos+5.5*(this.height/12));

              break;
              case 18:
              noFill();
              stroke(255,0,0,130);
                  line(this.x, ypos_moving_val+this.ypos+5.5*(this.height/12), this.x + this.width/17, ypos_moving_val+this.ypos+5.5*(this.height/12));

                break;
        default:

      }
    }
    if(this.r == 'false'){

      strokeWeight(1);
      stroke(music_color_op);
      if(this.lickSelected){
        stroke(music_color);
      }
      switch (this.y) {
        case 0:
          line(this.x - this.height/12, ypos_moving_val+this.ypos+y_indexs[this.y+2]*(this.height/12),
          this.x + this.height/12, ypos_moving_val+this.ypos+y_indexs[this.y+2]*(this.height/12));
        case 2:
          line(this.x - this.height/12 , this.pre_ypos,
          this.x + this.height/12 , this.pre_ypos);
        break;
        case 16:
          line(this.x - this.height/12 , ypos_moving_val+this.ypos+y_indexs[this.y-2]*(this.height/12),
          this.x + this.height/12 , ypos_moving_val+this.ypos+y_indexs[this.y-2]*(this.height/12));
        case 14:
          line(this.x - this.height/12 , this.pre_ypos,
          this.x + this.height/12 , this.pre_ypos);
        break;
        case 1:
          line(this.x - this.height/12 , ypos_moving_val+this.ypos+y_indexs[this.y+1]*(this.height/12),
          this.x + this.height/12 , ypos_moving_val+this.ypos+y_indexs[this.y+1]*(this.height/12));
        break;
        case 15:
          line(this.x - this.height/12 , ypos_moving_val+this.ypos+y_indexs[this.y-1]*(this.height/12),
          this.x + this.height/12 , ypos_moving_val+this.ypos+y_indexs[this.y-1]*(this.height/12));
        break;
      }

      fill(music_color_op);
      if(this.lickSelected){
        fill(music_color);
      }
      if(this.selected){
        fill(0,0,255);
      }
      if(this.bt >2&& this.bt != 12){
         noStroke();
         push();
         translate(this.x , this.pre_ypos);

         rotate(radians(-30));
         ellipse(0 , 0, 1.6*this.height/12, 1.1*this.height/12);
         pop();
       }else if(this.bt <=2 ||this.bt ==12){
         noStroke();
         push();
         translate(this.x , this.pre_ypos);

            if(this.bt !=0){
              rotate(radians(-30));
            }
            beginShape();
          for(let theta = 0; theta< TWO_PI; theta += TWO_PI/120){
            vertex(-1.4*this.height/24*cos(theta),-1*this.height/24*sin(theta));
          }

        endShape();
        fill(bg_color);
        beginShape();
          vertex(-1.3*this.height/24, 0);
          vertex(0, 0.7*this.height/24);
          vertex(1.3*this.height/24, 0);
          vertex(0, -0.7*this.height/24);
        endShape();
            pop();
       }

       stroke(music_color_op);
       fill(music_color_op);
       if(this.lickSelected){
         stroke(music_color);
         fill(music_color);
       }

      strokeWeight(this.width/400);
      if(this.stem){
        switch(this.bt){
          case 0://0 being whole note
          break;
          case 1://1 being second note with dot
                    if (this.y<=7){

                        beginShape();
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos+110*this.height/400);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos+110*this.height/400);
                        endShape();

                         }else{

                        beginShape();
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        endShape();
                         }
            break;
            case 12:
            case 2://2 being second note
                    if (this.y<=7){

                        beginShape();
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos+110*this.height/400);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos+110*this.height/400);
                        endShape();

                         }else{
                        beginShape();
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        endShape();
                         }
            break;
            case 3://3 being quarter note with dot
                    if (this.y<=7){

                        beginShape();
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos+110*this.height/400);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos+110*this.height/400);
                        endShape();

                         }else{

                        beginShape();
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        endShape();
                         }
            break;
            case 14:
            case 4://4 being quarter note
                    if (this.y<=7){

                        beginShape();
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos+110*this.height/400);
                        curveVertex(this.x -7.3*this.width/700, this.pre_ypos+110*this.height/400);
                        endShape();

                         }else{
                        beginShape();
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        curveVertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        endShape();
                         }
            break;
            case 5:
            if (this.y<=7){
              noFill();
                        beginShape();
                        vertex(this.x -7.3*this.width/700, this.pre_ypos);
                        vertex(this.x -7.3*this.width/700, this.pre_ypos);
                        vertex(this.x -7.3*this.width/700, this.pre_ypos+120*this.height/400);
                        curveVertex(this.x -5*this.width/700, this.pre_ypos+90*this.height/400);
                        bezierVertex(this.x  + 6*this.width/700, this.pre_ypos +40*this.height/400,
                          this.x -6*this.width/700, this.pre_ypos+90*this.height/400,
                          this.x +4*this.width/700, this.pre_ypos+13*this.height/400);
                        curveVertex(this.x +6*this.width/700, this.pre_ypos+11*this.height/400);
                        vertex(this.x +2*this.width/700, this.pre_ypos+2*this.height/400);
                        endShape();

                         }else{
                           noFill();
                        beginShape();
                        vertex(this.x +7.3*this.width/700, this.pre_ypos);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        curveVertex(this.x +14*this.width/700, this.pre_ypos-105*this.height/400);
                         bezierVertex(this.x + 28*this.width/700, this.pre_ypos-95*this.height/400,
                                      this.x +14*this.width/700, this.pre_ypos-105*this.height/400,
                                      this.x +30*this.width/700, this.pre_ypos - 18*this.height/400);
                        curveVertex(this.x +17*this.width/700, this.pre_ypos-12*this.height/400);
                        vertex(this.x +14*this.width/700, this.pre_ypos-6*this.height/400);
                        endShape();
                         }
            break;
            case 16:
            case 6:
            if (this.y<=7){
              noFill();
                        beginShape();
                        vertex(this.x -7.3*this.width/700, this.pre_ypos);
                        vertex(this.x -7.3*this.width/700, this.pre_ypos);
                        vertex(this.x -7.3*this.width/700, this.pre_ypos+120*this.height/400);
                        curveVertex(this.x -5*this.width/700, this.pre_ypos+90*this.height/400);
                        bezierVertex(this.x  + 6*this.width/700, this.pre_ypos +50*this.height/400,
                          this.x -6*this.width/700, this.pre_ypos+90*this.height/400,
                          this.x +4*this.width/700, this.pre_ypos+13*this.height/400);
                        curveVertex(this.x +6*this.width/700, this.pre_ypos+11*this.height/400);
                        vertex(this.x +2*this.width/700, this.pre_ypos+2*this.height/400);
                        endShape();


                         }else{
                           noFill();
                        beginShape();
                        vertex(this.x +7.3*this.width/700, this.pre_ypos);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        curveVertex(this.x +10*this.width/700, this.pre_ypos-105*this.height/400);
                         bezierVertex(this.x + 20*this.width/700, this.pre_ypos-95*this.height/400,
                                      this.x +10*this.width/700, this.pre_ypos-105*this.height/400,
                                      this.x +22*this.width/700, this.pre_ypos - 18*this.height/400);
                        curveVertex(this.x +13*this.width/700, this.pre_ypos-12*this.height/400);
                        vertex(this.x +10*this.width/700, this.pre_ypos-6*this.height/400);
                        endShape();
                           }
            break;
            case 7:
            if (this.y<=7){
              noFill();
                        beginShape();
                        vertex(this.x -7.3*this.width/700, this.pre_ypos);
                        vertex(this.x -7.3*this.width/700, this.pre_ypos);
                        vertex(this.x -7.3*this.width/700, this.pre_ypos+120*this.height/400);
                        curveVertex(this.x -6*this.width/700, this.pre_ypos+100*this.height/400);
                        bezierVertex(this.x  + 7.3*this.width/700, this.pre_ypos +70*this.height/400,
                          this.x -6*this.width/700, this.pre_ypos+80*this.height/400,
                          this.x +5*this.width/700, this.pre_ypos+53*this.height/400);
                        curveVertex(this.x +3*this.width/700, this.pre_ypos+40*this.height/400);
                         vertex(this.x +3*this.width/700, this.pre_ypos+40*this.height/400);
                        endShape();
                        beginShape();
                          vertex(this.x -7.3*this.width/700, this.pre_ypos+90*this.height/400);
                          vertex(this.x -7.3*this.width/700, this.pre_ypos+90*this.height/400);
                          bezierVertex(this.x  + 7.3*this.width/700, this.pre_ypos +40*this.height/400,
                            this.x -6*this.width/700, this.pre_ypos+80*this.height/400,
                            this.x +5*this.width/700, this.pre_ypos+53*this.height/400);
                            curveVertex(this.x +7*this.width/700, this.pre_ypos+11*this.height/400);
                            vertex(this.x +3*this.width/700, this.pre_ypos+2*this.height/400);
                        endShape();

                         }else{
                           noFill();
                        beginShape();
                        vertex(this.x +7.3*this.width/700, this.pre_ypos);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        curveVertex(this.x +14*this.width/700, this.pre_ypos-105*this.height/400);
                         bezierVertex(this.x + 28*this.width/700, this.pre_ypos-105*this.height/400,
                                      this.x +14*this.width/700, this.pre_ypos-105*this.height/400,
                                      this.x +30*this.width/700, this.pre_ypos - 18*this.height/400);
                        curveVertex(this.x +17*this.width/700, this.pre_ypos-52*this.height/400);
                        vertex(this.x +14*this.width/700, this.pre_ypos-6*this.height/400);
                        endShape();
                        beginShape();
                        vertex(this.x +7.3*this.width/700, this.pre_ypos-90*this.height/400);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos-90*this.height/400);
                        curveVertex(this.x +12*this.width/700, this.pre_ypos-85*this.height/400)
                        bezierVertex(this.x + 28*this.width/700, this.pre_ypos-70*this.height/400,
                                     this.x +14*this.width/700, this.pre_ypos-60*this.height/400,
                                     this.x +30*this.width/700, this.pre_ypos - 18*this.height/400);
                       curveVertex(this.x +17*this.width/700, this.pre_ypos-22*this.height/400);
                       vertex(this.x +14*this.width/700, this.pre_ypos-6*this.height/400);
                        endShape();

                         }
            break;
            case 18:
            case 8:
            if (this.y<=7){
              noFill();
                        beginShape();
                        vertex(this.x -7.3*this.width/700, this.pre_ypos);
                        vertex(this.x -7.3*this.width/700, this.pre_ypos);
                        vertex(this.x -7.3*this.width/700, this.pre_ypos+120*this.height/400);
                        curveVertex(this.x -5*this.width/700, this.pre_ypos+100*this.height/400);
                        bezierVertex(this.x  + 7.3*this.width/700, this.pre_ypos +70*this.height/400,
                          this.x -6*this.width/700, this.pre_ypos+80*this.height/400,
                          this.x +4*this.width/700, this.pre_ypos+53*this.height/400);
                        curveVertex(this.x +2*this.width/700, this.pre_ypos+40*this.height/400);
                         vertex(this.x +2*this.width/700, this.pre_ypos+40*this.height/400);
                        endShape();
                        beginShape();
                          vertex(this.x -7.3*this.width/700, this.pre_ypos+90*this.height/400);
                          vertex(this.x -7.3*this.width/700, this.pre_ypos+90*this.height/400);
                          bezierVertex(this.x  + 7.3*this.width/700, this.pre_ypos +40*this.height/400,
                            this.x -5*this.width/700, this.pre_ypos+80*this.height/400,
                            this.x +4*this.width/700, this.pre_ypos+53*this.height/400);
                            curveVertex(this.x +6*this.width/700, this.pre_ypos+11*this.height/400);
                            vertex(this.x +2*this.width/700, this.pre_ypos+2*this.height/400);
                        endShape();


                         }else{
                           noFill();
                        beginShape();
                        vertex(this.x +7.3*this.width/700, this.pre_ypos);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos-110*this.height/400);
                        curveVertex(this.x +10*this.width/700, this.pre_ypos-105*this.height/400);
                         bezierVertex(this.x + 20*this.width/700, this.pre_ypos-105*this.height/400,
                                      this.x +10*this.width/700, this.pre_ypos-105*this.height/400,
                                      this.x +22*this.width/700, this.pre_ypos - 18*this.height/400);
                        curveVertex(this.x +13*this.width/700, this.pre_ypos-52*this.height/400);
                        vertex(this.x +10*this.width/700, this.pre_ypos-6*this.height/400);
                        endShape();
                        beginShape();
                        vertex(this.x +7.3*this.width/700, this.pre_ypos-90*this.height/400);
                        vertex(this.x +7.3*this.width/700, this.pre_ypos-90*this.height/400);
                        curveVertex(this.x +10*this.width/700, this.pre_ypos-85*this.height/400)
                        bezierVertex(this.x + 20*this.width/700, this.pre_ypos-70*this.height/400,
                                     this.x +10*this.width/700, this.pre_ypos-60*this.height/400,
                                     this.x +22*this.width/700, this.pre_ypos - 18*this.height/400);
                       curveVertex(this.x +13*this.width/700, this.pre_ypos-22*this.height/400);
                       vertex(this.x +10*this.width/700, this.pre_ypos-6*this.height/400);
                        endShape();

                         }
            break;
        }
      }
      if(this.bt == 1 ||
      this.bt == 3 ||
      this.bt == 5 ||
      this.bt == 7){
        strokeWeight(this.width/150);
        point(this.x +17*this.width/700, this.pre_ypos+2*this.height/400);
      }
      stroke(music_color_op);
      fill(music_color_op);
      if(this.lickSelected){
        stroke(music_color);
        fill(music_color);
      }
      strokeWeight(this.width/400);
      if(this.as == "true"){
        switch(this.av){
          case 0:
          noFill();
          stroke(music_color_op);
          if(this.lickSelected){
            stroke(music_color);
          }
            DrawNat(this.x  - 15*this.width/350, this.pre_ypos - this.height/16, 16*this.width/350, this.height/8);
          break;
          case -1:
          noFill();
          stroke(music_color_op);
          if(this.lickSelected){
            stroke(music_color);
          }
            DrawFlat(this.x  - 15*this.width/350, this.pre_ypos - this.height/13, 18*this.width/350, this.height/8);
          break;
          case 1:
          noFill();
          stroke(music_color_op);
          if(this.lickSelected){
            stroke(music_color);
          }
            DrawSharp(this.x  - 13*this.width/350, this.pre_ypos - this.height/21, 10*this.width/350, this.height/11);
          break;
        }
      }
    }else{

      var c;
      if(this.selected){
        c = color(0,0,255);
      }else{
        c = color(music_color_op);
        if(this.lickSelected){
          c = color(music_color);
        }
      }
      switch(this.bt){
        case 0:
          drawWhole(this.x  - width/34, ypos_moving_val+this.ypos+3*(this.height/12), width/20, y_indexs[11]*(this.height/12), c);
        break;
        case 1:
          drawDHalf(this.x  - width/34, ypos_moving_val+this.ypos+2.5*(this.height/12), width/20, y_indexs[11]*(this.height/12), c);
        break;
        case 2:
        case 12:
          drawHalf(this.x  - width/34, ypos_moving_val+this.ypos+2.5*(this.height/12), width/20, y_indexs[11]*(this.height/12), c);
        break;
        case 3:
          drawDQut(this.x - width/34, ypos_moving_val+this.ypos+2.5*(this.height/12), width/20, y_indexs[11]*(this.height/12), c);
        break;
        case 4:
        case 14:
          drawQut(this.x - width/34, ypos_moving_val+this.ypos+2.5*(this.height/12), width/20, y_indexs[11]*(this.height/12), c);
        break;
        case 5:
          darwDEighth(this.x , ypos_moving_val+this.ypos+6.5*(this.height/12), width/40, 2*(this.height/12), c);
        break;
        case 6:
        case 16:
          darwEighth(this.x , ypos_moving_val+this.ypos+6.5*(this.height/12), width/40, 2*(this.height/12), c);
        break;
        case 7:
          darwDSixteenth(this.x , ypos_moving_val+this.ypos+5.5*(this.height/12), width/40, 2*(this.height/12), c);
        break;
        case 8:
        case 18:
          darwSixteenth(this.x , ypos_moving_val+this.ypos+5.5*(this.height/12), width/40, 2*(this.height/12), c);
        break;
      }
    }

  }
  UpdateBt(bt){
    this.bt = bt;
  }
  Update_id_interval(mv,id){
    this.mv = mv;
    this.id = id;
  }
}


function up_down_note_attChange(i,av) {
  var flat_or_sharp;
  switch (av) {
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
  n[i].mv = midiVal_Calc(y_index, octave_control, accidental_val);
  ndata[i*data_per_note+10] = n[i].mv.toString();
  n[i].id = prev_id[y_index]+flat_or_sharp;
  ndata[i*data_per_note+8]=prev_id[y_index]+flat_or_sharp;
  n[i].interval = interval_from_root.get(prev_id[y_index]+flat_or_sharp);
  ndata[i*data_per_note+9]=interval_from_root.get(prev_id[y_index]+flat_or_sharp);
  n[i].y = k_position_calc(n[i].mv,
                           accidental_val);
    var for_data = k_position_calc(n[i].mv,accidental_val);
  ndata[i*data_per_note] = for_data.toString();
}

function drawWhole(cx, cy, w, h, c){
  strokeWeight(this.width/450);
  rectMode(RADIUS);
  fill(c);
  noStroke();
  rect(cx+(w)/2, cy+h/2, (w)/5, h/24);
  stroke(c);
  line(cx+(w)/10, cy+h/2-h/24, cx+9*(w)/10, cy+h/2-h/24);
}
function drawDHalf(cx, cy, w, h, c) {
  strokeWeight(this.width/450);
  rectMode(RADIUS);
  fill(c);
  noStroke();
  rect(cx+(w)/2, cy+h/2, (w)/5, h/24);
  stroke(c);
  line(cx+(w)/10, cy+h/2+h/24, cx+9*(w)/10, cy+h/2+h/24);
  strokeWeight(this.width/150);
  point(cx+(w)/2+22*this.width/700, cy+h/2);
}
function drawHalf(cx, cy, w, h, c) {
  strokeWeight(this.width/450);
  rectMode(RADIUS);
  fill(c);
  noStroke();
  rect(cx+(w)/2, cy+h/2, (w)/5, h/24);
  stroke(c);
  line(cx+(w)/10, cy+h/2+h/24, cx+9*(w)/10, cy+h/2+h/24);
}
function drawDQut(cx, cy, w, h, c) {
  strokeWeight(this.width/450);
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
         strokeWeight(this.width/150);
         point(cx+(w)/2+22*this.width/700, cy+h/2);
}
function drawQut(cx, cy, w, h, c){
  strokeWeight(this.width/450);
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
  strokeWeight(this.width/450);
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
  strokeWeight(this.width/150);
  point(cx+w/2+23*this.width/700, cy);
}
function darwEighth(cx, cy, w, h, c){
  strokeWeight(this.width/450);
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
  strokeWeight(this.width/450);
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
  strokeWeight(this.width/150);
  point(cx+w/2+23*this.width/700, cy);
}
function darwSixteenth(cx, cy, w, h, c){
  strokeWeight(this.width/450);
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
