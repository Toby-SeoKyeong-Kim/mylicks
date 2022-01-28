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

    this.selected = false;
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
    this.groupHasRest = false;
  }

  Draw(){
    this.pre_ypos = y_indexs[this.y]*(mheight/12);
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
          // if(this.r == 'true'){
          //   this.triplet = false;
          // }
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
        fill(255,0,0,130);
            text("3",this.x+xpos_moving_val, ypos+5.5*(mheight/12));
            noFill();
          break;
          case 14:
          fill(255,0,0,130);
              text("3",this.x+xpos_moving_val, ypos+5.5*(mheight/12));
              noFill();
            break;
            case 16:
            fill(255,0,0,130);
                text("3",this.x+xpos_moving_val, ypos+5.5*(mheight/12));
                noFill();
              break;
              case 18:
              fill(255,0,0,130);
                  text("3",this.x+xpos_moving_val, ypos+5.5*(mheight/12));
                  noFill();
                break;
        default:
      }
    }
    if(this.r == 'false'){

      strokeWeight(Height/726);
      stroke(0);
      switch (this.y) {
        case 0:
          line(this.x - mheight/12+xpos_moving_val, ypos+y_indexs[this.y+2]*(mheight/12),
          this.x + mheight/12+xpos_moving_val, ypos+y_indexs[this.y+2]*(mheight/12));
        case 2:
          line(this.x - mheight/12+xpos_moving_val, this.pre_ypos,
          this.x + mheight/12+xpos_moving_val, this.pre_ypos);
        break;
        case 16:
          line(this.x - mheight/12+xpos_moving_val, ypos+y_indexs[this.y-2]*(mheight/12),
          this.x + mheight/12+xpos_moving_val, ypos+y_indexs[this.y-2]*(mheight/12));
        case 14:
          line(this.x - mheight/12+xpos_moving_val, this.pre_ypos,
          this.x + mheight/12+xpos_moving_val, this.pre_ypos);
        break;
        case 1:
          line(this.x - mheight/12+xpos_moving_val, ypos+y_indexs[this.y+1]*(mheight/12),
          this.x + mheight/12+xpos_moving_val, ypos+y_indexs[this.y+1]*(mheight/12));
        break;
        case 15:
          line(this.x - mheight/12+xpos_moving_val, ypos+y_indexs[this.y-1]*(mheight/12),
          this.x + mheight/12+xpos_moving_val, ypos+y_indexs[this.y-1]*(mheight/12));
        break;
      }

      fill(40);
      if(this.selected){
        switch (theme) {
          case "dark":
          fill(0,255,255);
            break;
            case "simple":
            fill(0, 110, 255);
              break;
              case "pastel":
              fill(116, 212, 228);
                break;
        }
      }
      if(this.bt >2&& this.bt != 12){
         noStroke();
         push();
         translate(this.x+xpos_moving_val, this.pre_ypos);

         rotate(radians(-30));
         ellipse(0 , 0, 1.5*mheight/12, mheight/12);
         pop();
       }else if(this.bt <=2 ||this.bt ==12){
         noStroke();
         push();
         translate(this.x+xpos_moving_val, this.pre_ypos);

            if(this.bt !=0){
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

      stroke(40);
      fill(40);

      strokeWeight(mwidth/400);
      if(this.stem){
        switch(this.bt){
          case 0://0 being whole note
          break;
          case 1://1 being second note with dot
                    if (this.y<=7){

                        beginShape();
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+110*mheight/400);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+110*mheight/400);
                        endShape();

                         }else{

                        beginShape();
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        endShape();
                         }
            break;
            case 12:
            case 2://2 being second note
                    if (this.y<=7){

                        beginShape();
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+110*mheight/400);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+110*mheight/400);
                        endShape();

                         }else{
                        beginShape();
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        endShape();
                         }
            break;
            case 3://3 being quarter note with dot
                    if (this.y<=7){

                        beginShape();
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+110*mheight/400);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+110*mheight/400);
                        endShape();

                         }else{

                        beginShape();
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        endShape();
                         }
            break;
            case 14:
            case 4://4 being quarter note
                    if (this.y<=7){

                        beginShape();
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+110*mheight/400);
                        curveVertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+110*mheight/400);
                        endShape();

                         }else{
                        beginShape();
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        curveVertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        endShape();
                         }
            break;
            case 5:
            if (this.y<=7){
              noFill();
                        beginShape();
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+120*mheight/400);
                        curveVertex(this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+90*mheight/400);
                        bezierVertex(this.x+xpos_moving_val + 7*mwidth/700, this.pre_ypos +40*mheight/400,
                          this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+90*mheight/400,
                          this.x+xpos_moving_val+5*mwidth/700, this.pre_ypos+13*mheight/400);
                        curveVertex(this.x+xpos_moving_val+7*mwidth/700, this.pre_ypos+11*mheight/400);
                        vertex(this.x+xpos_moving_val+3*mwidth/700, this.pre_ypos+2*mheight/400);
                        endShape();

                         }else{
                           noFill();
                        beginShape();
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        curveVertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-105*mheight/400);
                         bezierVertex(this.x+xpos_moving_val+ 28*mwidth/700, this.pre_ypos-95*mheight/400,
                                      this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-105*mheight/400,
                                      this.x+xpos_moving_val+30*mwidth/700, this.pre_ypos - 18*mheight/400);
                        curveVertex(this.x+xpos_moving_val+17*mwidth/700, this.pre_ypos-12*mheight/400);
                        vertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-6*mheight/400);
                        endShape();
                         }
            break;
            case 16:
            case 6:
            if (this.y<=7){
              noFill();
                        beginShape();
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+120*mheight/400);
                        curveVertex(this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+90*mheight/400);
                        bezierVertex(this.x+xpos_moving_val + 7*mwidth/700, this.pre_ypos +50*mheight/400,
                          this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+90*mheight/400,
                          this.x+xpos_moving_val+5*mwidth/700, this.pre_ypos+13*mheight/400);
                        curveVertex(this.x+xpos_moving_val+7*mwidth/700, this.pre_ypos+11*mheight/400);
                        vertex(this.x+xpos_moving_val+3*mwidth/700, this.pre_ypos+2*mheight/400);
                        endShape();


                         }else{
                           noFill();
                        beginShape();
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        curveVertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-105*mheight/400);
                         bezierVertex(this.x+xpos_moving_val+ 28*mwidth/700, this.pre_ypos-95*mheight/400,
                                      this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-105*mheight/400,
                                      this.x+xpos_moving_val+30*mwidth/700, this.pre_ypos - 18*mheight/400);
                        curveVertex(this.x+xpos_moving_val+17*mwidth/700, this.pre_ypos-12*mheight/400);
                        vertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-6*mheight/400);
                        endShape();
                           }
            break;
            case 7:
            if (this.y<=7){
              noFill();
                        beginShape();
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+120*mheight/400);
                        curveVertex(this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+100*mheight/400);
                        bezierVertex(this.x+xpos_moving_val + 9.8*mwidth/700, this.pre_ypos +70*mheight/400,
                          this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+80*mheight/400,
                          this.x+xpos_moving_val+5*mwidth/700, this.pre_ypos+53*mheight/400);
                        curveVertex(this.x+xpos_moving_val+3*mwidth/700, this.pre_ypos+40*mheight/400);
                         vertex(this.x+xpos_moving_val+3*mwidth/700, this.pre_ypos+40*mheight/400);
                        endShape();
                        beginShape();
                          vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+90*mheight/400);
                          vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+90*mheight/400);
                          bezierVertex(this.x+xpos_moving_val + 9.8*mwidth/700, this.pre_ypos +40*mheight/400,
                            this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+80*mheight/400,
                            this.x+xpos_moving_val+5*mwidth/700, this.pre_ypos+53*mheight/400);
                            curveVertex(this.x+xpos_moving_val+7*mwidth/700, this.pre_ypos+11*mheight/400);
                            vertex(this.x+xpos_moving_val+3*mwidth/700, this.pre_ypos+2*mheight/400);
                        endShape();

                         }else{
                           noFill();
                        beginShape();
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        curveVertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-105*mheight/400);
                         bezierVertex(this.x+xpos_moving_val+ 28*mwidth/700, this.pre_ypos-105*mheight/400,
                                      this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-105*mheight/400,
                                      this.x+xpos_moving_val+30*mwidth/700, this.pre_ypos - 18*mheight/400);
                        curveVertex(this.x+xpos_moving_val+17*mwidth/700, this.pre_ypos-52*mheight/400);
                        vertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-6*mheight/400);
                        endShape();
                        beginShape();
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-90*mheight/400);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-90*mheight/400);
                        curveVertex(this.x+xpos_moving_val+12*mwidth/700, this.pre_ypos-85*mheight/400)
                        bezierVertex(this.x+xpos_moving_val+ 28*mwidth/700, this.pre_ypos-70*mheight/400,
                                     this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-60*mheight/400,
                                     this.x+xpos_moving_val+30*mwidth/700, this.pre_ypos - 18*mheight/400);
                       curveVertex(this.x+xpos_moving_val+17*mwidth/700, this.pre_ypos-22*mheight/400);
                       vertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-6*mheight/400);
                        endShape();

                         }
            break;
            case 18:
            case 8:
            if (this.y<=7){
              noFill();
                        beginShape();
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+120*mheight/400);
                        curveVertex(this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+100*mheight/400);
                        bezierVertex(this.x+xpos_moving_val + 9.8*mwidth/700, this.pre_ypos +70*mheight/400,
                          this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+80*mheight/400,
                          this.x+xpos_moving_val+5*mwidth/700, this.pre_ypos+53*mheight/400);
                        curveVertex(this.x+xpos_moving_val+3*mwidth/700, this.pre_ypos+40*mheight/400);
                         vertex(this.x+xpos_moving_val+3*mwidth/700, this.pre_ypos+40*mheight/400);
                        endShape();
                        beginShape();
                          vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+90*mheight/400);
                          vertex(this.x+xpos_moving_val-9.8*mwidth/700, this.pre_ypos+90*mheight/400);
                          bezierVertex(this.x+xpos_moving_val + 9.8*mwidth/700, this.pre_ypos +40*mheight/400,
                            this.x+xpos_moving_val-6*mwidth/700, this.pre_ypos+80*mheight/400,
                            this.x+xpos_moving_val+5*mwidth/700, this.pre_ypos+53*mheight/400);
                            curveVertex(this.x+xpos_moving_val+7*mwidth/700, this.pre_ypos+11*mheight/400);
                            vertex(this.x+xpos_moving_val+3*mwidth/700, this.pre_ypos+2*mheight/400);
                        endShape();


                         }else{
                           noFill();
                        beginShape();
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-110*mheight/400);
                        curveVertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-105*mheight/400);
                         bezierVertex(this.x+xpos_moving_val+ 28*mwidth/700, this.pre_ypos-105*mheight/400,
                                      this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-105*mheight/400,
                                      this.x+xpos_moving_val+30*mwidth/700, this.pre_ypos - 18*mheight/400);
                        curveVertex(this.x+xpos_moving_val+17*mwidth/700, this.pre_ypos-52*mheight/400);
                        vertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-6*mheight/400);
                        endShape();
                        beginShape();
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-90*mheight/400);
                        vertex(this.x+xpos_moving_val+9.8*mwidth/700, this.pre_ypos-90*mheight/400);
                        curveVertex(this.x+xpos_moving_val+12*mwidth/700, this.pre_ypos-85*mheight/400)
                        bezierVertex(this.x+xpos_moving_val+ 28*mwidth/700, this.pre_ypos-70*mheight/400,
                                     this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-60*mheight/400,
                                     this.x+xpos_moving_val+30*mwidth/700, this.pre_ypos - 18*mheight/400);
                       curveVertex(this.x+xpos_moving_val+17*mwidth/700, this.pre_ypos-22*mheight/400);
                       vertex(this.x+xpos_moving_val+14*mwidth/700, this.pre_ypos-6*mheight/400);
                        endShape();

                         }
            break;
        }
      }
      if(this.bt == 1 ||
      this.bt == 3 ||
      this.bt == 5 ||
      this.bt == 7){
        strokeWeight(mwidth/150);
        point(this.x+xpos_moving_val+17*mwidth/700, this.pre_ypos+2*mheight/400);
      }
      stroke(40);
      fill(40);
      strokeWeight(mwidth/400);
      if(this.as == "true"){
        switch(this.av){
          case 0:
          noFill();
          stroke(20);
            DrawNat(this.x+xpos_moving_val - 18*mwidth/350, this.pre_ypos - mheight/18, 19*mwidth/350, mheight/9);
          break;
          case -1:
          noFill();
          stroke(20);
            DrawFlat(this.x+xpos_moving_val - 17*mwidth/350, this.pre_ypos - mheight/15, 18*mwidth/350, mheight/9);
          break;
          case 1:
          noFill();
          stroke(20);
            DrawSharp(this.x+xpos_moving_val - 19*mwidth/350, this.pre_ypos - mheight/22, 16*mwidth/350, mheight/12);
          break;
        }
      }
    }else{
      var pre_ypos =ypos+2.5*(mheight/12);
      var c;
      if(this.selected){
        switch (theme) {
          case "dark":
          c = color(0,255,255);
            break;
            case "simple":
            c = color(0, 110, 255);
              break;
              case "pastel":
              c = color(116, 212, 228);
                break;
        }
      }else{
        c = color(20);
      }
      switch(this.bt){
        case 0:
          drawWhole(this.x+xpos_moving_val - mwidth/34, ypos+3*(mheight/12), mwidth/17, y_indexs[11]*(mheight/12), c);
        break;
        case 1:
          drawDHalf(this.x+xpos_moving_val - mwidth/34, pre_ypos, mwidth/17, y_indexs[11]*(mheight/12), c);
        break;
        case 2:
        case 12:
          drawHalf(this.x+xpos_moving_val - mwidth/34, pre_ypos, mwidth/17, y_indexs[11]*(mheight/12), c);
        break;
        case 3:
          drawDQut(this.x+xpos_moving_val- mwidth/34, pre_ypos, mwidth/17, y_indexs[11]*(mheight/12), c);
        break;
        case 4:
        case 14:
          drawQut(this.x+xpos_moving_val- mwidth/34, pre_ypos, mwidth/17, y_indexs[11]*(mheight/12), c);
        break;
        case 5:
          darwDEighth(this.x+xpos_moving_val, ypos+6.5*(mheight/12), mwidth/34, 2*(mheight/12), c);
        break;
        case 6:
        case 16:
          darwEighth(this.x+xpos_moving_val, ypos+6.5*(mheight/12), mwidth/34, 2*(mheight/12), c);
        break;
        case 7:
          darwDSixteenth(this.x+xpos_moving_val, ypos+5.5*(mheight/12), mwidth/34, 2*(mheight/12), c);
        break;
        case 8:
        case 18:
          darwSixteenth(this.x+xpos_moving_val, ypos+5.5*(mheight/12), mwidth/34, 2*(mheight/12), c);
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
