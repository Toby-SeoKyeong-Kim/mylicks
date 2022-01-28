function k_position_calc(mv, av) {
  var returnvar;
  switch (mv) {
    case 85:
    case 97:
    case 109:
      if(av == 1){
        returnvar = 0;
      }else{
        returnvar = 6;
      }
    break;
    case 84:
    case 96:
    case 108:
      if(av ==1){
        returnvar = 1;
      }else{
        returnvar = 0;
      }
    break;

    case 83:
    case 95:
    case 107:
      if(av == -1){
        returnvar = 0;
      }else{
        returnvar = 1;
      }
    break;

    case 82:
    case 94:
    case 106:
      if(av == -1){
        returnvar = 1;
      }else{
        returnvar = 2;
      }
    break;

    case 81:
    case 93:
    case 105:
      returnvar =2;
    break;

    case 80:
    case 92:
    case 104:
      if(av == -1){
        returnvar = 2;
      }else{
        returnvar = 3;
      }
    break;

    case 79:
    case 91:
    case 103:
      returnvar =3;
    break;

    case 78:
    case 90:
    case 102:
      if(av == -1){
        returnvar = 3;
      }else{
        returnvar = 4;
      }
    break;

    case 77:
    case 89:
    case 101:
    if(av == 1){
      returnvar = 5;
    }else{
      returnvar = 4;
    }
    break;

    case 76:
    case 88:
    case 100:
    if(av == -1){
      returnvar = 4;
    }else{
      returnvar = 5;
    }
    break;

    case 75:
    case 87:
    case 99:
    if(av == -1){
      returnvar = 5;
    }else{
      returnvar = 6;
    }
    break;

    case 74:
    case 86:
    case 98:
      returnvar =6;
    break;

    case 73:
    case 85:
    case 97:
    if(av == -1){
      returnvar = 6;
    }else{
      returnvar = 7;
    }
    break;

    case 72:
      if(av == 1){
        returnvar =8;
      }else{
        returnvar =7;
      }
    break;

    case 71:
      if(av == -1){
        returnvar =7;
      }else{
        returnvar =8;
      }
    break;

    case 70:
      if(av == -1){
        returnvar = 8;
      }else{
        returnvar = 9;
      }
    break;

    case 69:
      returnvar =9;
    break;

    case 68:
    if(av == -1){
      returnvar = 9;
    }else{
      returnvar = 10;
    }
    break;

    case 67:
    case 55:
    case 43:
      returnvar =10;
    break;

    case 66:
    case 54:
    case 42:
    if(av == -1){
      returnvar = 10;
    }else{
      returnvar = 11;
    }
    break;

    case 65:
    case 53:
    case 41:
    if(av == 1){
      returnvar = 12;
    }else{
      returnvar = 11;
    }
    break;

    case 64:
    case 52:
    case 40:
    if(av == -1){
      returnvar = 11;
    }else{
      returnvar = 12;
    }
    break;

    case 63:
    case 51:
    case 39:
    if(av == -1){
      returnvar = 12;
    }else{
      returnvar = 13;
    }
    break;

    case 62:
    case 50:
    case 38:
      returnvar =13;
    break;

    case 61:
    case 49:
    case 37:
    if(av == -1){
      returnvar = 13;
    }else{
      returnvar = 14;
    }
    break;

    case 60:
    case 48:
    case 36:
    if(av == 1){
      returnvar = 15;
    }else{
      returnvar = 14;
    }
    break;

    case 59:
    case 47:
    case 35:
    if(av == -1){
      returnvar = 14;
    }else{
      returnvar = 15;
    }
    break;

    case 57:
    case 45:
    case 33:
      returnvar =16;
    break;

    case 56:
    case 44:
    case 32:
    if(av == -1){
      returnvar = 16;
    }
    break;
  }
  return returnvar;
}
function midiVal_Calc(y, oc, av) {
  var r_midival;
  switch (y) {
    case 0:
      r_midival = 84 + (12*oc) + av;
    break;
    case 1:
      r_midival = 83 + (12*oc) + av;
    break;
    case 2:
      r_midival = 81 + (12*oc) + av;
    break;
    case 3:
      r_midival = 79 + (12*oc) + av;
    break;
    case 4:
      r_midival = 77 + (12*oc) + av;
    break;
    case 5:
      r_midival = 76 + (12*oc) + av;
    break;
    case 6:
      r_midival = 74 + (12*oc) + av;
    break;
    case 7:
      r_midival = 72 + (12*oc) + av;
    break;
    case 8:
      r_midival = 71 + (12*oc) + av;
    break;
    case 9:
      r_midival = 69 + (12*oc) + av;
    break;
    case 10:
      r_midival = 67 + (12*oc) + av;
    break;
    case 11:
      r_midival = 65 + (12*oc) + av;
    break;
    case 12:
      r_midival = 64 + (12*oc) + av;
    break;
    case 13:
      r_midival = 62 + (12*oc) + av;
    break;
    case 14:
      r_midival = 60 + (12*oc) + av;
    break;
    case 15:
      r_midival = 59 + (12*oc) + av;
    break;
    case 16:
      r_midival = 57 + (12*oc) + av;
    break;
  }
  return r_midival;
}
function k_interval_change(r) { // root
  interval_from_root.clear();
  switch (r) {
    case "Cb":
      interval_from_root.set("Cb","1");
      interval_from_root.set("C" ,"#1");
      interval_from_root.set("C#","9");
      interval_from_root.set("Db","9");
      interval_from_root.set("D" , "#9");
      interval_from_root.set("D#","3");
      interval_from_root.set("Eb","b11");
      interval_from_root.set("E","11");
      interval_from_root.set("E#","#11");
      interval_from_root.set("Fb","11");
      interval_from_root.set("F" , "#11");
      interval_from_root.set("F#","5");
      interval_from_root.set("Gb","5");
      interval_from_root.set("G" , "#5");
      interval_from_root.set("G#","13");
      interval_from_root.set("Ab","13");
      interval_from_root.set("A" , "#13");
      interval_from_root.set("A#","7");
      interval_from_root.set("Bb" ,"7");
      interval_from_root.set("B", "#7");
      interval_from_root.set("B#", "#1");
    break;
    case "C":
      interval_from_root.set("Cb","b1");
      interval_from_root.set("C","1");
      interval_from_root.set("C#","#1");
      interval_from_root.set("Db","b9");
      interval_from_root.set("D","9");
      interval_from_root.set("D#","#9");
      interval_from_root.set("Eb","b3");
      interval_from_root.set("E", "3");
      interval_from_root.set("E#","#3");
      interval_from_root.set("Fb","b11");
      interval_from_root.set("F", "11");
      interval_from_root.set("F#","#11");
      interval_from_root.set("Gb","b5");
      interval_from_root.set("G", "5");
      interval_from_root.set("G#","#5");
      interval_from_root.set("Ab","b13");
      interval_from_root.set("A" , "13");
      interval_from_root.set("A#","#13");
      interval_from_root.set("Bb","b7");
      interval_from_root.set("B" , "7");
      interval_from_root.set("B#","#7");
    break;
    case "C#":
      interval_from_root.set("Cb","b7");
      interval_from_root.set("C","7");
      interval_from_root.set("C#","1");
      interval_from_root.set("Db","1");
      interval_from_root.set("D","b9");
      interval_from_root.set("D#","9");
      interval_from_root.set("Eb","9");
      interval_from_root.set("E", "b3");
      interval_from_root.set("E#","3");
      interval_from_root.set("Fb","b3");
      interval_from_root.set("F", "3");
      interval_from_root.set("F#","11");
      interval_from_root.set("Gb","11");
      interval_from_root.set("G", "b5");
      interval_from_root.set("G#","5");
      interval_from_root.set("Ab","5");
      interval_from_root.set("A","b13");
      interval_from_root.set("A#","13");
      interval_from_root.set("Bb","13");
      interval_from_root.set("B","b7");
      interval_from_root.set("B#","7");
    break;
    case "Db":
      interval_from_root.set("Cb","b7");
      interval_from_root.set("C" , "7");
      interval_from_root.set("C#","1");
      interval_from_root.set("Db","1");
      interval_from_root.set("D" , "#1");
      interval_from_root.set("D#","9");
      interval_from_root.set("Eb","9");
      interval_from_root.set("E","#9");
      interval_from_root.set("E#","3");
      interval_from_root.set("Fb","b3");
      interval_from_root.set("F" , "3");
      interval_from_root.set("F#","11");
      interval_from_root.set("Gb","11");
      interval_from_root.set("G" , "#11");
      interval_from_root.set("G#","5");
      interval_from_root.set("Ab","5");
      interval_from_root.set("A" , "#5");
      interval_from_root.set("A#","13");
      interval_from_root.set("Bb" ,"13");
      interval_from_root.set("B", "#13");
      interval_from_root.set("B#", "7");
    break;
    case "D":
      interval_from_root.set("Cb","13");
      interval_from_root.set("C","b7");
      interval_from_root.set("C#","7");
      interval_from_root.set("Db","b1");
      interval_from_root.set("D","1");
      interval_from_root.set("D#","#1");
      interval_from_root.set("Eb","b9");
      interval_from_root.set("E", "9");
      interval_from_root.set("E#","#9");
      interval_from_root.set("Fb","9");
      interval_from_root.set("F", "b3");
      interval_from_root.set("F#","3");
      interval_from_root.set("Gb","b11");
      interval_from_root.set("G", "11");
      interval_from_root.set("G#","#11");
      interval_from_root.set("Ab","b5");
      interval_from_root.set("A" , "5");
      interval_from_root.set("A#","#5");
      interval_from_root.set("Bb","b13");
      interval_from_root.set("B" , "13");
      interval_from_root.set("B#","#13");
    break;
    case "D#":
      interval_from_root.set("Cb","b13");
      interval_from_root.set("C","13");
      interval_from_root.set("C#","b7");
      interval_from_root.set("Db","b7");
      interval_from_root.set("D","7");
      interval_from_root.set("D#","1");
      interval_from_root.set("Eb","1");
      interval_from_root.set("E", "b9");
      interval_from_root.set("E#","9");
      interval_from_root.set("Fb","b9");
      interval_from_root.set("F", "9");
      interval_from_root.set("F#","b3");
      interval_from_root.set("Gb","b3");
      interval_from_root.set("G", "3");
      interval_from_root.set("G#","#3");
      interval_from_root.set("Ab","11");
      interval_from_root.set("A","b5");
      interval_from_root.set("A#","5");
      interval_from_root.set("Bb","5");
      interval_from_root.set("B" , "b13");
      interval_from_root.set("B#","13");
    break;
    case "Eb":
      interval_from_root.set("Cb","b13");
      interval_from_root.set("C" , "13");
      interval_from_root.set("C#","#13");
      interval_from_root.set("Db","b7");
      interval_from_root.set("D" , "7");
      interval_from_root.set("D#","1");
      interval_from_root.set("Eb","1");
      interval_from_root.set("E","#1");
      interval_from_root.set("E#","7");
      interval_from_root.set("Fb","b9");
      interval_from_root.set("F" , "9");
      interval_from_root.set("F#","#9");
      interval_from_root.set("Gb","b3");
      interval_from_root.set("G" , "3");
      interval_from_root.set("G#","11");
      interval_from_root.set("Ab","11");
      interval_from_root.set("A" , "#11");
      interval_from_root.set("A#","5");
      interval_from_root.set("Bb" ,"5");
      interval_from_root.set("B", "#5");
      interval_from_root.set("B#", "13");
    break;
    case "E":
      interval_from_root.set("Cb","5");
      interval_from_root.set("C","b13");
      interval_from_root.set("C#","13");
      interval_from_root.set("Db","13");
      interval_from_root.set("D","b7");
      interval_from_root.set("D#","7");
      interval_from_root.set("Eb","7");
      interval_from_root.set("E", "1");
      interval_from_root.set("E#","#1");
      interval_from_root.set("Fb","1");
      interval_from_root.set("F", "b9");
      interval_from_root.set("F#","9");
      interval_from_root.set("Gb","9");
      interval_from_root.set("G", "b3");
      interval_from_root.set("G#","3");
      interval_from_root.set("Ab","3");
      interval_from_root.set("A" , "11");
      interval_from_root.set("A#","#11");
      interval_from_root.set("Bb","b5");
      interval_from_root.set("B" , "5");
      interval_from_root.set("B#","#5");
    break;
    case "E#":
      interval_from_root.set("Cb","b5");
      interval_from_root.set("C","5");
      interval_from_root.set("C#","#5");
      interval_from_root.set("Db","b13");
      interval_from_root.set("D","13");
      interval_from_root.set("D#","#13");
      interval_from_root.set("Eb","b7");
      interval_from_root.set("E", "b1");
      interval_from_root.set("E#","#1");
      interval_from_root.set("Fb","b1");
      interval_from_root.set("F", "1");
      interval_from_root.set("F#","b9");
      interval_from_root.set("Gb","b9");
      interval_from_root.set("G", "9");
      interval_from_root.set("G#","#9");
      interval_from_root.set("Ab","b3");
      interval_from_root.set("A" , "3");
      interval_from_root.set("A#","11");
      interval_from_root.set("Bb","#11");
      interval_from_root.set("B" , "b5");
      interval_from_root.set("B#","5");
    break;
    case "Fb":
      interval_from_root.set("C" ,"#5");
      interval_from_root.set("Cb","5");
      interval_from_root.set("C#","13");
      interval_from_root.set("D" , "#13");
      interval_from_root.set("Db","13");
      interval_from_root.set("D#","7");
      interval_from_root.set("E","#7");
      interval_from_root.set("Eb","7");
      interval_from_root.set("E#","#1");
      interval_from_root.set("F" , "#1");
      interval_from_root.set("Fb","1");
      interval_from_root.set("F#","9");
      interval_from_root.set("G" ,"#9");
      interval_from_root.set("Gb","9");
      interval_from_root.set("G#","3");
      interval_from_root.set("A" ,"#3");
      interval_from_root.set("Ab","3");
      interval_from_root.set("A#","#11");
      interval_from_root.set("B", "5");
      interval_from_root.set("Bb" ,"#11");
      interval_from_root.set("B#", "#5");
    break;
    case "F":
      interval_from_root.set("C" , "5");
      interval_from_root.set("Cb","b5");
      interval_from_root.set("C#","#5");
      interval_from_root.set("D" , "13");
      interval_from_root.set("Db","b13");
      interval_from_root.set("D#","#13");
      interval_from_root.set("E" , "7");
      interval_from_root.set("Eb","b7");
      interval_from_root.set("E#","1");
      interval_from_root.set("F" , "1");
      interval_from_root.set("Fb","7");
      interval_from_root.set("F#","#1");
      interval_from_root.set("G" , "9");
      interval_from_root.set("Gb","b9");
      interval_from_root.set("G#","#9");
      interval_from_root.set("A" , "3");
      interval_from_root.set("Ab","b3");
      interval_from_root.set("A#","11");
      interval_from_root.set("B", "#11");
      interval_from_root.set("Bb" ,"11");
      interval_from_root.set("B#", "5");
    break;
    case "F#":
      interval_from_root.set("C","b5");
      interval_from_root.set("Cb","11");
      interval_from_root.set("C#","5");
      interval_from_root.set("D","b13");
      interval_from_root.set("Db","5");
      interval_from_root.set("D#","13");
      interval_from_root.set("E", "b7");
      interval_from_root.set("Eb","13");
      interval_from_root.set("E#","7");
      interval_from_root.set("F", "7");
      interval_from_root.set("Fb","b7");
      interval_from_root.set("F#","1");
      interval_from_root.set("G", "b9");
      interval_from_root.set("Gb","1");
      interval_from_root.set("G#","9");
      interval_from_root.set("A" , "b9");
      interval_from_root.set("Ab","9");
      interval_from_root.set("A#","3");
      interval_from_root.set("B","11");
      interval_from_root.set("Bb","3");
      interval_from_root.set("B#","#11");
    break;
    case "Gb":
      interval_from_root.set("C" , "#11");
      interval_from_root.set("Cb","11");
      interval_from_root.set("C#","5");
      interval_from_root.set("D" , "#5");
      interval_from_root.set("Db","5");
      interval_from_root.set("D#","13");
      interval_from_root.set("E","#13");
      interval_from_root.set("Eb","13");
      interval_from_root.set("E#","7");
      interval_from_root.set("F" , "7");
      interval_from_root.set("Fb","b7");
      interval_from_root.set("F#","1");
      interval_from_root.set("G" , "#11");
      interval_from_root.set("Gb","1");
      interval_from_root.set("G#","9");
      interval_from_root.set("A" , "#9");
      interval_from_root.set("Ab","9");
      interval_from_root.set("A#","3");
      interval_from_root.set("B", "11");
      interval_from_root.set("Bb" ,"3");
      interval_from_root.set("B#", "#11");
    break;
    case "G":
      interval_from_root.set("C","11");
      interval_from_root.set("Cb","b11");
      interval_from_root.set("C#","#11");
      interval_from_root.set("D","5");
      interval_from_root.set("Db","b5");
      interval_from_root.set("D#","#5");
      interval_from_root.set("E", "13");
      interval_from_root.set("Eb","b13");
      interval_from_root.set("E#","#13");
      interval_from_root.set("F", "b7");
      interval_from_root.set("Fb","13");
      interval_from_root.set("F#","7");
      interval_from_root.set("G", "1");
      interval_from_root.set("Gb","b1");
      interval_from_root.set("G#","#1");
      interval_from_root.set("A" , "9");
      interval_from_root.set("Ab","b9");
      interval_from_root.set("A#","#9");
      interval_from_root.set("B" , "3");
      interval_from_root.set("Bb","b3");
      interval_from_root.set("B#","11");
    break;
    case "G#":
      interval_from_root.set("Cb","b3");
      interval_from_root.set("C","3");
      interval_from_root.set("C#","11");
      interval_from_root.set("Db","11");
      interval_from_root.set("D","b5");
      interval_from_root.set("D#","5");
      interval_from_root.set("Eb","5");
      interval_from_root.set("E", "#11");
      interval_from_root.set("E#","13");
      interval_from_root.set("Fb","b5");
      interval_from_root.set("F", "13");
      interval_from_root.set("F#","b7");
      interval_from_root.set("Gb","b7");
      interval_from_root.set("G", "b1");
      interval_from_root.set("G#","1");
      interval_from_root.set("Ab","1");
      interval_from_root.set("A" ,"b9");
      interval_from_root.set("A#","9");
      interval_from_root.set("Bb","9");
      interval_from_root.set("B","b3");
      interval_from_root.set("B#","3");
    break;
    case "Ab":
      interval_from_root.set("C" , "3");
      interval_from_root.set("Cb","b3");
      interval_from_root.set("C#","11");
      interval_from_root.set("D" , "#11");
      interval_from_root.set("Db","11");
      interval_from_root.set("D#","5");
      interval_from_root.set("E","#5");
      interval_from_root.set("Eb","5");
      interval_from_root.set("E#","13");
      interval_from_root.set("F" , "13");
      interval_from_root.set("Fb","b13");
      interval_from_root.set("F#","#13");
      interval_from_root.set("G" , "7");
      interval_from_root.set("Gb","b7");
      interval_from_root.set("G#","1");
      interval_from_root.set("A" , "#1");
      interval_from_root.set("Ab","1");
      interval_from_root.set("A#","9");
      interval_from_root.set("B", "#9");
      interval_from_root.set("Bb" ,"9");
      interval_from_root.set("B#", "3");
    break;
    case "A":
      interval_from_root.set("C","b3");
      interval_from_root.set("Cb","9");
      interval_from_root.set("C#","3");
      interval_from_root.set("D","11");
      interval_from_root.set("Db","3");
      interval_from_root.set("D#","#11");
      interval_from_root.set("E", "5");
      interval_from_root.set("Eb","b5");
      interval_from_root.set("E#","#5");
      interval_from_root.set("F", "b13");
      interval_from_root.set("Fb","5");
      interval_from_root.set("F#","13");
      interval_from_root.set("G", "b7");
      interval_from_root.set("Gb","13");
      interval_from_root.set("G#","7");
      interval_from_root.set("A" , "1");
      interval_from_root.set("Ab","7");
      interval_from_root.set("A#","#1");
      interval_from_root.set("B" , "9");
      interval_from_root.set("Bb","b9");
      interval_from_root.set("B#","#9");
    break;
    case "A#":
      interval_from_root.set("C" , "9");
      interval_from_root.set("Cb","b9");
      interval_from_root.set("C#","b3");
      interval_from_root.set("D" , "3");
      interval_from_root.set("Db","b3");
      interval_from_root.set("D#","11");
      interval_from_root.set("E","b5");
      interval_from_root.set("Eb","11");
      interval_from_root.set("E#","5");
      interval_from_root.set("F" , "5");
      interval_from_root.set("Fb","b5");
      interval_from_root.set("F#","#5");
      interval_from_root.set("G" , "13");
      interval_from_root.set("Gb","b13");
      interval_from_root.set("G#","b7");
      interval_from_root.set("A" , "b1");
      interval_from_root.set("Ab","b7");
      interval_from_root.set("A#","1");
      interval_from_root.set("B", "b9");
      interval_from_root.set("Bb" ,"1");
      interval_from_root.set("B#", "9");
    break;
    case "Bb":
      interval_from_root.set("C" , "9");
      interval_from_root.set("Cb","b9");
      interval_from_root.set("C#","#9");
      interval_from_root.set("D" , "3");
      interval_from_root.set("Db","b3");
      interval_from_root.set("D#","11");
      interval_from_root.set("E","#11");
      interval_from_root.set("Eb","11");
      interval_from_root.set("E#","5");
      interval_from_root.set("F" , "5");
      interval_from_root.set("Fb","b5");
      interval_from_root.set("F#","#5");
      interval_from_root.set("G" , "13");
      interval_from_root.set("Gb","b13");
      interval_from_root.set("G#","#13");
      interval_from_root.set("A" , "7");
      interval_from_root.set("Ab","b7");
      interval_from_root.set("A#","1");
      interval_from_root.set("B", "#1");
      interval_from_root.set("Bb" ,"1");
      interval_from_root.set("B#", "9");
    break;
    case "B":
      interval_from_root.set("C","b9");
      interval_from_root.set("Cb","1");
      interval_from_root.set("C#","9");
      interval_from_root.set("D","b3");
      interval_from_root.set("Db","9");
      interval_from_root.set("D#","3");
      interval_from_root.set("E", "11");
      interval_from_root.set("Eb","3");
      interval_from_root.set("E#","#11");
      interval_from_root.set("F", "#11");
      interval_from_root.set("Fb","11");
      interval_from_root.set("F#","5");
      interval_from_root.set("G", "b13");
      interval_from_root.set("Gb","5");
      interval_from_root.set("G#","13");
      interval_from_root.set("A" , "b7");
      interval_from_root.set("Ab","13");
      interval_from_root.set("A#","7");
      interval_from_root.set("B" , "1");
      interval_from_root.set("Bb","7");
      interval_from_root.set("B#","#1");
    break;
    case "B#":
      interval_from_root.set("Cb","b1");
      interval_from_root.set("C","1");
      interval_from_root.set("C#","b9");
      interval_from_root.set("Db","b9");
      interval_from_root.set("D","9");
      interval_from_root.set("D#","#9");
      interval_from_root.set("Eb","b3");
      interval_from_root.set("E", "3");
      interval_from_root.set("E#","#3");
      interval_from_root.set("Fb","b11");
      interval_from_root.set("F", "11");
      interval_from_root.set("F#","#11");
      interval_from_root.set("Gb","b5");
      interval_from_root.set("G", "5");
      interval_from_root.set("G#","#5");
      interval_from_root.set("Ab","b13");
      interval_from_root.set("A" , "13");
      interval_from_root.set("A#","#13");
      interval_from_root.set("Bb","b7");
      interval_from_root.set("B" , "7");
      interval_from_root.set("B#","1");
    break;
  }
  return interval_from_root;
}
function k_interval_change_int_str(r) { // root
  interval_int_str.clear();
  switch (r) {
    case "Cb":
      interval_int_str.set("b1","Bb");
      interval_int_str.set("1","Cb");
      interval_int_str.set("#1","C");
      interval_int_str.set("b9","C");
      interval_int_str.set("9","Db");
      interval_int_str.set("#9","D");
      interval_int_str.set("b3","D");
      interval_int_str.set("3","Eb");
      interval_int_str.set("#3","E");
      interval_int_str.set("b11","Eb");
      interval_int_str.set("11","Fb");
      interval_int_str.set("#11","F");
      interval_int_str.set("b5","F");
      interval_int_str.set("5","Gb");
      interval_int_str.set("#5","G");
      interval_int_str.set("b13","G");
      interval_int_str.set("13","Ab");
      interval_int_str.set("#13","A");
      interval_int_str.set("b7","A");
      interval_int_str.set("7","Bb");
      interval_int_str.set("#7","B");
    break;
    case "C":
      interval_int_str.set("b1","Cb");
      interval_int_str.set("1","C");
      interval_int_str.set("#1","C#");
      interval_int_str.set("b9","Db");
      interval_int_str.set("9","D");
      interval_int_str.set("#9","D#");
      interval_int_str.set("b3","Eb");
      interval_int_str.set("3","E");
      interval_int_str.set("#3","E#");
      interval_int_str.set("b11","Fb");
      interval_int_str.set("11","F");
      interval_int_str.set("#11","F#");
      interval_int_str.set("b5","Gb");
      interval_int_str.set("5","G");
      interval_int_str.set("#5","G#");
      interval_int_str.set("b13","Ab");
      interval_int_str.set("13","A");
      interval_int_str.set("#13","A#");
      interval_int_str.set("b7","Bb");
      interval_int_str.set("7","B");
      interval_int_str.set("#7","B#");
    break;
    case "C#":
      interval_int_str.set("b1","C");
      interval_int_str.set("1","C#");
      interval_int_str.set("#1","D");
      interval_int_str.set("b9","D");
      interval_int_str.set("9","D#");
      interval_int_str.set("#9","E");
      interval_int_str.set("b3","E");
      interval_int_str.set("3","E#");
      interval_int_str.set("#3","F#");
      interval_int_str.set("b11","F");
      interval_int_str.set("11","F#");
      interval_int_str.set("#11","G");
      interval_int_str.set("b5","G");
      interval_int_str.set("5","G#");
      interval_int_str.set("#5","A");
      interval_int_str.set("b13","A");
      interval_int_str.set("13","A#");
      interval_int_str.set("#13","B");
      interval_int_str.set("b7","B");
      interval_int_str.set("7","B#");
      interval_int_str.set("#7","C#");
    break;
    case "Db":
      interval_int_str.set("b1","C");
      interval_int_str.set("1","Db");
      interval_int_str.set("#1","D");
      interval_int_str.set("b9","D");
      interval_int_str.set("9","Eb");
      interval_int_str.set("#9","E");
      interval_int_str.set("b3","Fb");
      interval_int_str.set("3","F");
      interval_int_str.set("#3","F#");
      interval_int_str.set("b11","F");
      interval_int_str.set("11","Gb");
      interval_int_str.set("#11","G");
      interval_int_str.set("b5","G");
      interval_int_str.set("5","Ab");
      interval_int_str.set("#5","A");
      interval_int_str.set("b13","A");
      interval_int_str.set("13","Bb");
      interval_int_str.set("#13","B");
      interval_int_str.set("b7","Cb");
      interval_int_str.set("7","C");
      interval_int_str.set("#7","Db");
    break;
    case "D":
      interval_int_str.set("b1","Db");
      interval_int_str.set("1","D");
      interval_int_str.set("#1","D#");
      interval_int_str.set("b9","Eb");
      interval_int_str.set("9","E");
      interval_int_str.set("#9","E#");
      interval_int_str.set("b3","F");
      interval_int_str.set("3","F#");
      interval_int_str.set("#3","G");
      interval_int_str.set("b11","Gb");
      interval_int_str.set("11","G");
      interval_int_str.set("#11","G#");
      interval_int_str.set("b5","Ab");
      interval_int_str.set("5","A");
      interval_int_str.set("#5","A#");
      interval_int_str.set("b13","Bb");
      interval_int_str.set("13","B");
      interval_int_str.set("#13","B#");
      interval_int_str.set("b7","C");
      interval_int_str.set("7","C#");
      interval_int_str.set("#7","D");
    break;
    case "D#":
      interval_int_str.set("b1","D");
      interval_int_str.set("1","D#");
      interval_int_str.set("#1","E");
      interval_int_str.set("b9","E");
      interval_int_str.set("9","E#");
      interval_int_str.set("#9","F#");
      interval_int_str.set("b3","F#");
      interval_int_str.set("3","G");
      interval_int_str.set("#3","G#");
      interval_int_str.set("b11","G");
      interval_int_str.set("11","G#");
      interval_int_str.set("#11","A");
      interval_int_str.set("b5","A");
      interval_int_str.set("5","A#");
      interval_int_str.set("#5","B");
      interval_int_str.set("b13","B");
      interval_int_str.set("13","C");
      interval_int_str.set("#13","C#");
      interval_int_str.set("b7","C#");
      interval_int_str.set("7","D");
      interval_int_str.set("#7","D#");
    break;
    case "Eb":
      interval_int_str.set("b1","D");
      interval_int_str.set("1","Eb");
      interval_int_str.set("#1","E");
      interval_int_str.set("b9","Fb");
      interval_int_str.set("9","F");
      interval_int_str.set("#9","F#");
      interval_int_str.set("b3","Gb");
      interval_int_str.set("3","G");
      interval_int_str.set("#3","G#");
      interval_int_str.set("b11","G");
      interval_int_str.set("11","Ab");
      interval_int_str.set("#11","A");
      interval_int_str.set("b5","A");
      interval_int_str.set("5","Bb");
      interval_int_str.set("#5","B");
      interval_int_str.set("b13","Cb");
      interval_int_str.set("13","C");
      interval_int_str.set("#13","C#");
      interval_int_str.set("b7","Db");
      interval_int_str.set("7","D");
      interval_int_str.set("#7","D#");
    break;
    case "E":
      interval_int_str.set("b1","Eb");
      interval_int_str.set("1","E");
      interval_int_str.set("#1","E#");
      interval_int_str.set("b9","F");
      interval_int_str.set("9","F#");
      interval_int_str.set("#9","G");
      interval_int_str.set("b3","G");
      interval_int_str.set("3","G#");
      interval_int_str.set("#3","A");
      interval_int_str.set("b11","Ab");
      interval_int_str.set("11","A");
      interval_int_str.set("#11","A#");
      interval_int_str.set("b5","Bb");
      interval_int_str.set("5","B");
      interval_int_str.set("#5","B#");
      interval_int_str.set("b13","C");
      interval_int_str.set("13","C#");
      interval_int_str.set("#13","D");
      interval_int_str.set("b7","D");
      interval_int_str.set("7","D#");
      interval_int_str.set("#7","E");
    break;
    case "E#":
      interval_int_str.set("b1","E");
      interval_int_str.set("1","E#");
      interval_int_str.set("#1","F#");
      interval_int_str.set("b9","F#");
      interval_int_str.set("9","G");
      interval_int_str.set("#9","G#");
      interval_int_str.set("b3","Ab");
      interval_int_str.set("3","A");
      interval_int_str.set("#3","A#");
      interval_int_str.set("b11","A");
      interval_int_str.set("11","Bb");
      interval_int_str.set("#11","B");
      interval_int_str.set("b5","Cb");
      interval_int_str.set("5","C");
      interval_int_str.set("#5","C#");
      interval_int_str.set("b13","Db");
      interval_int_str.set("13","D");
      interval_int_str.set("#13","D#");
      interval_int_str.set("b7","Eb");
      interval_int_str.set("7","E");
      interval_int_str.set("#7","E#");
    break;
    case "Fb":
      interval_int_str.set("b1","Eb");
      interval_int_str.set("1","Fb");
      interval_int_str.set("#1","F");
      interval_int_str.set("b9","F");
      interval_int_str.set("9","Gb");
      interval_int_str.set("#9","G");
      interval_int_str.set("b3","G");
      interval_int_str.set("3","Ab");
      interval_int_str.set("#3","A");
      interval_int_str.set("b11","Ab");
      interval_int_str.set("11","A");
      interval_int_str.set("#11","Bb");
      interval_int_str.set("b5","Bb");
      interval_int_str.set("5","Cb");
      interval_int_str.set("#5","C");
      interval_int_str.set("b13","C");
      interval_int_str.set("13","C#");
      interval_int_str.set("#13","D");
      interval_int_str.set("b7","D");
      interval_int_str.set("7","Eb");
      interval_int_str.set("#7","E");
    break;
    case "F":
      interval_int_str.set("b1","E");
      interval_int_str.set("1","F");
      interval_int_str.set("#1","F#");
      interval_int_str.set("b9","Gb");
      interval_int_str.set("9","G");
      interval_int_str.set("#9","G#");
      interval_int_str.set("b3","Ab");
      interval_int_str.set("3","A");
      interval_int_str.set("#3","A#");
      interval_int_str.set("b11","A");
      interval_int_str.set("11","Bb");
      interval_int_str.set("#11","B");
      interval_int_str.set("b5","Cb");
      interval_int_str.set("5","C");
      interval_int_str.set("#5","C#");
      interval_int_str.set("b13","Db");
      interval_int_str.set("13","D");
      interval_int_str.set("#13","D#");
      interval_int_str.set("b7","Eb");
      interval_int_str.set("7","E");
      interval_int_str.set("#7","E#");
    break;
    case "F#":
      interval_int_str.set("b1","F");
      interval_int_str.set("1","F#");
      interval_int_str.set("#1","G");
      interval_int_str.set("b9","G");
      interval_int_str.set("9","G#");
      interval_int_str.set("#9","A");
      interval_int_str.set("b3","A");
      interval_int_str.set("3","A#");
      interval_int_str.set("#3","B");
      interval_int_str.set("b11","Bb");
      interval_int_str.set("11","B");
      interval_int_str.set("#11","B#");
      interval_int_str.set("b5","B#");
      interval_int_str.set("5","C#");
      interval_int_str.set("#5","D");
      interval_int_str.set("b13","D");
      interval_int_str.set("13","D#");
      interval_int_str.set("#13","E");
      interval_int_str.set("b7","E");
      interval_int_str.set("7","E#");
      interval_int_str.set("#7","F#");
    break;
    case "Gb":
      interval_int_str.set("b1","F");
      interval_int_str.set("1","Gb");
      interval_int_str.set("#1","G");
      interval_int_str.set("b9","G");
      interval_int_str.set("9","Ab");
      interval_int_str.set("#9","A");
      interval_int_str.set("b3","A");
      interval_int_str.set("3","Bb");
      interval_int_str.set("#3","B");
      interval_int_str.set("b11","Bb");
      interval_int_str.set("11","B");
      interval_int_str.set("#11","B#");
      interval_int_str.set("b5","C");
      interval_int_str.set("5","Db");
      interval_int_str.set("#5","D");
      interval_int_str.set("b13","D");
      interval_int_str.set("13","Eb");
      interval_int_str.set("#13","E");
      interval_int_str.set("b7","Fb");
      interval_int_str.set("7","F");
      interval_int_str.set("#7","F#");
    break;
    case "G":
      interval_int_str.set("b1","Gb");
      interval_int_str.set("1","G");
      interval_int_str.set("#1","G#");
      interval_int_str.set("b9","Ab");
      interval_int_str.set("9","A");
      interval_int_str.set("#9","A#");
      interval_int_str.set("b3","Bb");
      interval_int_str.set("3","B");
      interval_int_str.set("#3","B#");
      interval_int_str.set("b11","Cb");
      interval_int_str.set("11","C");
      interval_int_str.set("#11","C#");
      interval_int_str.set("b5","Db");
      interval_int_str.set("5","D");
      interval_int_str.set("#5","D#");
      interval_int_str.set("b13","Eb");
      interval_int_str.set("13","E");
      interval_int_str.set("#13","E#");
      interval_int_str.set("b7","F");
      interval_int_str.set("7","F#");
      interval_int_str.set("#7","G");
    break;
    case "G#":
      interval_int_str.set("b1","G");
      interval_int_str.set("1","G#");
      interval_int_str.set("#1","A");
      interval_int_str.set("b9","A");
      interval_int_str.set("9","A#");
      interval_int_str.set("#9","B");
      interval_int_str.set("b3","B");
      interval_int_str.set("3","C");
      interval_int_str.set("#3","C#");
      interval_int_str.set("b11","C");
      interval_int_str.set("11","C#");
      interval_int_str.set("#11","D");
      interval_int_str.set("b5","D");
      interval_int_str.set("5","D#");
      interval_int_str.set("#5","E");
      interval_int_str.set("b13","E");
      interval_int_str.set("13","E#");
      interval_int_str.set("#13","F");
      interval_int_str.set("b7","F#");
      interval_int_str.set("7","G");
      interval_int_str.set("#7","G#");
    break;
    case "Ab":
      interval_int_str.set("b1","G");
      interval_int_str.set("1","Ab");
      interval_int_str.set("#1","A");
      interval_int_str.set("b9","A");
      interval_int_str.set("9","Bb");
      interval_int_str.set("#9","B");
      interval_int_str.set("b3","Cb");
      interval_int_str.set("3","C");
      interval_int_str.set("#3","C#");
      interval_int_str.set("b11","C");
      interval_int_str.set("11","Db");
      interval_int_str.set("#11","D");
      interval_int_str.set("b5","D");
      interval_int_str.set("5","Eb");
      interval_int_str.set("#5","E");
      interval_int_str.set("b13","Fb");
      interval_int_str.set("13","F");
      interval_int_str.set("#13","F#");
      interval_int_str.set("b7","Gb");
      interval_int_str.set("7","G");
      interval_int_str.set("#7","G#");
    break;
    case "A":
      interval_int_str.set("b1","Ab");
      interval_int_str.set("1","A");
      interval_int_str.set("#1","A#");
      interval_int_str.set("b9","Bb");
      interval_int_str.set("9","B");
      interval_int_str.set("#9","B#");
      interval_int_str.set("b3","C");
      interval_int_str.set("3","C#");
      interval_int_str.set("#3","D");
      interval_int_str.set("b11","Db");
      interval_int_str.set("11","D");
      interval_int_str.set("#11","D#");
      interval_int_str.set("b5","Eb");
      interval_int_str.set("5","E");
      interval_int_str.set("#5","E#");
      interval_int_str.set("b13","F");
      interval_int_str.set("13","F#");
      interval_int_str.set("#13","G");
      interval_int_str.set("b7","G");
      interval_int_str.set("7","G#");
      interval_int_str.set("#7","A");
    break;
    case "A#":
      interval_int_str.set("b1","A");
      interval_int_str.set("1","Bb");
      interval_int_str.set("#1","B");
      interval_int_str.set("b9","Cb");
      interval_int_str.set("9","C");
      interval_int_str.set("#9","C#");
      interval_int_str.set("b3","Db");
      interval_int_str.set("3","D");
      interval_int_str.set("#3","D#");
      interval_int_str.set("b11","D");
      interval_int_str.set("11","Eb");
      interval_int_str.set("#11","E");
      interval_int_str.set("b5","Fb");
      interval_int_str.set("5","F");
      interval_int_str.set("#5","F#");
      interval_int_str.set("b13","Gb");
      interval_int_str.set("13","G");
      interval_int_str.set("#13","G#");
      interval_int_str.set("b7","Ab");
      interval_int_str.set("7","A");
      interval_int_str.set("#7","A#");
    break;
    case "Bb":
      interval_int_str.set("b1","A");
      interval_int_str.set("1","Bb");
      interval_int_str.set("#1","B");
      interval_int_str.set("b9","Cb");
      interval_int_str.set("9","C");
      interval_int_str.set("#9","C#");
      interval_int_str.set("b3","Db");
      interval_int_str.set("3","D");
      interval_int_str.set("#3","D#");
      interval_int_str.set("b11","D");
      interval_int_str.set("11","Eb");
      interval_int_str.set("#11","E");
      interval_int_str.set("b5","Fb");
      interval_int_str.set("5","F");
      interval_int_str.set("#5","F#");
      interval_int_str.set("b13","Gb");
      interval_int_str.set("13","G");
      interval_int_str.set("#13","G#");
      interval_int_str.set("b7","Ab");
      interval_int_str.set("7","A");
      interval_int_str.set("#7","A#");
    break;
    case "B":
      interval_int_str.set("b1","Bb");
      interval_int_str.set("1","B");
      interval_int_str.set("#1","B#");
      interval_int_str.set("b9","C");
      interval_int_str.set("9","C#");
      interval_int_str.set("#9","D");
      interval_int_str.set("b3","D");
      interval_int_str.set("3","D#");
      interval_int_str.set("#3","E");
      interval_int_str.set("b11","Eb");
      interval_int_str.set("11","E");
      interval_int_str.set("#11","E#");
      interval_int_str.set("b5","F");
      interval_int_str.set("5","F#");
      interval_int_str.set("#5","G");
      interval_int_str.set("b13","G");
      interval_int_str.set("13","G#");
      interval_int_str.set("#13","A");
      interval_int_str.set("b7","A");
      interval_int_str.set("7","A#");
      interval_int_str.set("#7","B");
    break;
    case "B#":
      interval_int_str.set("b1","B");
      interval_int_str.set("1","C");
      interval_int_str.set("#1","C#");
      interval_int_str.set("b9","Db");
      interval_int_str.set("9","D");
      interval_int_str.set("#9","D#");
      interval_int_str.set("b3","Eb");
      interval_int_str.set("3","E");
      interval_int_str.set("#3","E#");
      interval_int_str.set("b11","Fb");
      interval_int_str.set("11","F");
      interval_int_str.set("#11","F#");
      interval_int_str.set("b5","Gb");
      interval_int_str.set("5","G");
      interval_int_str.set("#5","G#");
      interval_int_str.set("b13","Ab");
      interval_int_str.set("13","A");
      interval_int_str.set("#13","A#");
      interval_int_str.set("b7","Bb");
      interval_int_str.set("7","B");
      interval_int_str.set("#7","B#");
    break;
  }
  return interval_int_str;
}
function k_keycen(key) {
  switch (key) {
    case 0:
      return "C#";
    break;
    case 1:
      return "F#";
    break;
    case 2:
      return "B";
    break;
    case 3:
      return "E";
    break;
    case 4:
      return "A";
    break;
    case 5:
      return "D";
    break;
    case 6:
      return "G";
    break;
    case 7:
      return "C";
    break;
    case 8:
      return "F";
    break;
    case 9:
      return "Bb"
    break;
    case 10:
      return "Eb";
    break;
    case 11:
      return "Ab";
    break;
    case 12:
      return "Db";
    break;
    case 13:
      return "Gb";
    break;
    case 14:
      return "Cb";
    break;
  }
}
function k_all_note_in_Key(key) {
  switch (key) {
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
}

var c4k;
var keyCanvasContainer = document.getElementById("keysettingCanvas");
function areYouReady() {

  var func2 = function (s) {
    s.Width  = keyCanvasContainer.getBoundingClientRect().width;
    s.Height = keyCanvasContainer.getBoundingClientRect().height;
    s.k = key;
    s.img = s.loadImage('static/resources/trevb_w.png');
    s.order_of_flat = [7, 5.5, 7.5, 6, 8, 6.5, 8.5];
    s.order_of_sharp = [5, 6.5, 4.5, 6, 4, 5.5, 3.5];
    s.num = s.abs(s.k-7);
    s.keystr = k_keycen(key) + " " + "Key";
    s.oof = [7, 5.5, 7.5, 6, 8, 6.5, 8.5];
    s.oos = [5, 6.5, 4.5, 6, 4, 5.5, 3.5];
    s.keysig = s.Width/8;
    s.timesig = s.keysig + s.num*(s.Width/100)+s.Width/40;
     s.setup = function() {
     let canvas_keysetting = s.createCanvas(s.Width,s.Height);
     canvas_keysetting.parent("#keysettingCanvas");
    }
    s.draw = function() {
      s.num = s.abs(s.k-7);
      s.keysig = s.Width*3/32;
      s.timesig = s.keysig + s.num*(s.Width/100)+s.Width/40;
      s.background(255);
      s.stroke(20);
      s.strokeWeight(s.Height/240);
      for (var i = 5; i < 10; i++) {
        s.line(0,
          i*(s.Height/12),
          s.Width,
          i*(s.Height/12));
      }
      s.tint(0,255);
      s.image(s.img, 0, s.int(3.8*(s.Height/12)),
      s.int(s.Width/8), s.int(3*(s.Height/6)));
      s.noFill();
      for(var i = 0; i < s.num; i++){
        if(s.k<7){
          s.DrawSharp(s.keysig + s.Width/28*i,
            s.oos[i]*(s.Height/12) - s.Height/20,
            s.Width/12,
            s.Height/9);
        }else if(s.k>7){
          s.DrawFlat(s.keysig + s.Width/28*i,
            s.oof[i]*(s.Height/12) - s.Height/15,
            s.Width/12,
            s.Height/9);
        }
      }
      s.textSize(s.Height/6);
      s.textAlign(s.RIGHT,s.TOP);
      s.fill(180);
      s.noStroke();
      s.text(s.keystr,
        s.Width,
        s.Height*2/12);
    }
    s.indowResized= function(){
      s.Width  = keyCanvasContainer.getBoundingClientRect().width;
      s.Height = keyCanvasContainer.getBoundingClientRect().height;
      s.resizeCanvas(s.Width,s.Height);
      s.pixelDensity(1);
    }
    s.DrawFlat = function(x, y, w, h){
      s.strokeCap(s.ROUND);
      s.strokeWeight(s.Height/75);
      s.beginShape();
      s.vertex(x+(4*w/10), y+(h/10));
      s.vertex(x+(4*w/10), y+(8*h/10));
       s.bezierVertex(x+(7*w/10), y+(8*h/10),
                    x+(7*w/10), y+(2*h/10),
                    x+(4*w/10), y+(6*h/10));
      s.endShape();
    }
    s.DrawSharp = function(x, y, w, h){
      s.strokeWeight(s.Height/100);
      s.line(x+(6*w/10), y+(h/10),x+(6*w/10), y+(8*h/10));
      s.line(x+(4*w/10), y+(2*h/10),x+(4*w/10), y+(9*h/10));
      s.strokeWeight(s.Height/100);
      s.line(x+(2*w/10), y+(4*h/10),x+(8*w/10), y+(2*h/10));
      s.line(x+(2*w/10), y+(8*h/10),x+(8*w/10), y+(6*h/10));
    }
   }
   c4k = new p5(func2);
}
