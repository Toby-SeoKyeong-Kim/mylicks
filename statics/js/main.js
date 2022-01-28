function openSlideMenu() {
    document.getElementsByClassName('side_bar')[0].style.left = "0";
    document.getElementById('btn').style.opacity = "0";
    document.getElementById('btn').style.left = "250px";
    document.getElementById('cancel').style.opacity = "1";
    document.getElementById('cancel').style.left = "487px";
    sidebarIsOn = true;
}
function closeSlideMenu() {
  document.getElementsByClassName('side_bar')[0].style.left = "-580px";
  document.getElementById('cancel').style.opacity = "0";
  document.getElementById('cancel').style.left = "-30vw";
  document.getElementById('btn').style.opacity = "1";
  document.getElementById('btn').style.left = "40px";
  sidebarIsOn = false;
}
