package main

import (
  "net/http"
  "github.com/users"
)



func main()  {
  http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
  http.HandleFunc("/", Datas.Index)
  defer Datas.CloseClientDB()
  http.HandleFunc("/serviceworker.js", Datas.SendSW)
	http.HandleFunc("/manifest.json", Datas.SendManifest)
  http.HandleFunc("/signup", Datas.Signup) //will be removed
  http.HandleFunc("/login", Datas.Login)  //will be removed
  http.HandleFunc("/googlelogin", Datas.HandleGoogleLogin)
  http.HandleFunc("/callback", Datas.HandleGoogleCallback)
  http.HandleFunc("/logout", Datas.Logout)   //will be modified
  http.HandleFunc("/setting", Datas.Setting)
  http.HandleFunc("/updateSetting", Datas.UpdateSetting)
  http.HandleFunc("/checkUserName", Datas.CheckUserName)  //will be removed
  http.HandleFunc("/updatelick", Datas.Updatelick)
  http.HandleFunc("/updatelickscale", Datas.UpdateLickScale)
  http.HandleFunc("/updatelickkey", Datas.UpdateLickKey)
  http.HandleFunc("/updatelickname", Datas.UpdateLickName)
  http.HandleFunc("/validatePs", Datas.ValidatePs)  //will be removed
  http.HandleFunc("/getSheetData", Datas.GetSheetData)
  http.HandleFunc("/newlick", Datas.NewLick)
  http.HandleFunc("/deleteLick", Datas.DeleteLick)
  http.HandleFunc("/newsheet", Datas.NewSheet)
  http.HandleFunc("/sheetnewlick", Datas.SheetNewEmptyLick)
  http.HandleFunc("/updatesheet", Datas.UpdateSheet)
  http.HandleFunc("/updatesheettitle", Datas.UpdateSheetTitle)
  http.HandleFunc("/updatesheetlickkey", Datas.UpdateSheetLickKey)
  http.HandleFunc("/updatesheetkey", Datas.UpdateSheetKey)
  //http.HandleFunc("/sharelicks", licks)
  //http.HandleFunc("/sharesheets", sheets)
  http.HandleFunc("/mylicks", Datas.MyLicks)
  http.HandleFunc("/loadmylicks", Datas.LoadMyLicks)
  http.HandleFunc("/Ldisplay", Datas.DisplayLicks)
  http.HandleFunc("/SLdisplay", Datas.EditLicks)
  http.HandleFunc("/mysheets", Datas.MySheets)
  http.HandleFunc("/Sdisplay", Datas.DisplaySheets)
  //http.HandleFunc("/forum", forum)
  http.Handle("/favicon.ico", http.NotFoundHandler())
  http.ListenAndServe(":8080", nil)
}
