
function DrawSharp(x, y, w, h){
  strokeWeight(mheight/200);
  line(x+(6*w/10), y+(h/10),x+(6*w/10), y+(8*h/10));
  line(x+(4*w/10), y+(2*h/10),x+(4*w/10), y+(9*h/10));
  strokeWeight(mheight/100);
  line(x+(2*w/10), y+(4*h/10),x+(8*w/10), y+(2*h/10));
  line(x+(2*w/10), y+(8*h/10),x+(8*w/10), y+(6*h/10));
}
function DrawFlat(x, y, w, h){
  strokeCap(ROUND);
  strokeWeight(mheight/100);
  beginShape();
  vertex(x+(4*w/10), y+(h/10));
  vertex(x+(4*w/10), y+(8*h/10));
   bezierVertex(x+(7*w/10), y+(8*h/10),
                x+(7*w/10), y+(2*h/10),
                x+(4*w/10), y+(6*h/10));
  endShape();
}
function DrawNat(x, y, w, h){
  strokeCap(SQUARE);
  strokeWeight(mheight/200);
  line(x+(4*w/10), y+(h/10),x+(4*w/10), y+(7*h/10));
  line(x+(6*w/10), y+(3*h/10),x+(6*w/10), y+(9*h/10));
  strokeWeight(mheight/100);
  line(x+(4*w/10), y+(7*h/10),x+(6*w/10), y+(6*h/10));
  line(x+(6*w/10), y+(3*h/10),x+(4*w/10), y+(4*h/10));
}
