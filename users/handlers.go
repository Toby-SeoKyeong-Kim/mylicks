package Datas

import (
	"github.com/config"
	"net/http"
	"io/ioutil"
	"go.mongodb.org/mongo-driver/mongo"
)
const sessionLength int = 86400;
var cl *mongo.Client

func Index(w http.ResponseWriter, r *http.Request) {
	if AlreadyLoggedIn(w, r) {
		http.Redirect(w, r, "/mylicks", http.StatusSeeOther)
		return
	}
		if cl == nil{
			cl, _ = mcon()
			go h.run()
		}

	  	u := getTime()
	  	config.TPL.ExecuteTemplate(w, "index.gohtml", u)
}
func Terms(w http.ResponseWriter, req *http.Request)  {
	u := getTime()
	config.TPL.ExecuteTemplate(w, "terms.gohtml", u)
}
func DisplayLicks(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	u, _ := getGoogleUserInfo(w, req)
	id := req.FormValue("q")
	udp, _ := getGoogleUserDpLick(u, id)

	config.TPL.ExecuteTemplate(w, "dplicks.gohtml", udp)
}
func MyLicks(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	u, _ := GetGoogleUser(w, req)
	config.TPL.ExecuteTemplate(w, "mylicks.gohtml", u)
}
func DisplaySheets(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	u, _ := getGoogleUserInfo(w, req)
	id := req.FormValue("q")
	udp, _ := getGoogleUserDpSheet(u, id)

	config.TPL.ExecuteTemplate(w, "dpsheets.gohtml", udp)
}
func MySheets(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	u, _ := GetGoogleUser(w, req)
	config.TPL.ExecuteTemplate(w, "mysheets.gohtml", u)
}

func SendSW(w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadFile("serviceworker.js")
	if err != nil {
			http.Error(w, "Couldn't read file", http.StatusInternalServerError)
			return
	}
	w.Header().Set("Content-Type", "application/javascript; charset=utf-8")
	w.Write(data)
}
func SendManifest(w http.ResponseWriter, r *http.Request) {
	data, err := ioutil.ReadFile("manifest.json")
	if err != nil {
			http.Error(w, "Couldn't read file", http.StatusInternalServerError)
			return
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(data)
}

func EditLicks(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	u, _ := getGoogleUserInfo(w, req)
	id := req.FormValue("q")
	udp, _ := getGoogleUserDpLick(u, id)

	config.TPL.ExecuteTemplate(w, "editdplicks.gohtml", udp)
}

func Setting(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	// process form submission
	u, _ := getGoogleUserInfo(w, req)
	// if req.Method == http.MethodPost {
	// 	UpdateSetting(w, req, u)
	// }

	config.TPL.ExecuteTemplate(w, "setting.gohtml", u)
}
func DisplayForum(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	// process form submission
	u, _ := getGoogleUserInfo(w, req)
	uu := GetForumGoogleUser(u)
	id := req.FormValue("q")
	udp, _ := getGoogleUserDpForum(uu, id)

	config.TPL.ExecuteTemplate(w, "dpforum.gohtml", udp)
}
func Forum(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	// process form submission
	u, _ := getGoogleUserInfo(w, req)
	// if req.Method == http.MethodPost {
	// 	UpdateSetting(w, req, u)
	// }
	err := GoproRedirect(w, req, u)
	if err == "err"{
		http.Redirect(w, req, "/goPro", http.StatusSeeOther)
	}
	uu := GetForumGoogleUser(u)

	config.TPL.ExecuteTemplate(w, "forum.gohtml", uu)
}
func ShareLicks(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}

	u, _ := getGoogleUserInfo(w, req)

	config.TPL.ExecuteTemplate(w, "sharelicks.gohtml", u)
}
func ShareSheets(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}

	u, _ := getGoogleUserInfo(w, req)

	config.TPL.ExecuteTemplate(w, "sharesheets.gohtml", u)
}
func VisitProfile(w http.ResponseWriter, req *http.Request) {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}

	u, _ := getGoogleUserInfo(w, req)
	id := req.FormValue("q")
	uds := getGoogleUserProfile(u, id)

	config.TPL.ExecuteTemplate(w, "visitprofile.gohtml", uds)
}
func VPFL(w http.ResponseWriter, req *http.Request) {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}

	u, _ := getGoogleUserInfo(w, req)
	id := req.FormValue("q")
	uds := getGoogleUserPfromL(u, id)

	config.TPL.ExecuteTemplate(w, "visitprofile.gohtml", uds)
}
func VPFS(w http.ResponseWriter, req *http.Request) {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}

	u, _ := getGoogleUserInfo(w, req)
	id := req.FormValue("q")
	uds := getGoogleUserPfromS(u, id)

	config.TPL.ExecuteTemplate(w, "visitprofile.gohtml", uds)
}
func VPFE(w http.ResponseWriter, req *http.Request) {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}

	u, _ := getGoogleUserInfo(w, req)
	id := req.FormValue("q")
	uds := getGoogleUserPfromE(u, id)

	config.TPL.ExecuteTemplate(w, "visitprofile.gohtml", uds)
}
func VisitLick(w http.ResponseWriter, req *http.Request) {
		if !AlreadyLoggedIn(w, req) {
			http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
			return
		}

		u, _ := getGoogleUserInfo(w, req)
		id := req.FormValue("q")
	 	udvl, err := GetVisitLick(u, id)

		if err != ""{
			http.Redirect(w, req, "/vpfl?q=" + id, http.StatusSeeOther)
			return
		}

		config.TPL.ExecuteTemplate(w, "visitLicks.gohtml", udvl)
}
func VisitSheet(w http.ResponseWriter, req *http.Request) {
		if !AlreadyLoggedIn(w, req) {
			http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
			return
		}

		u, _ := getGoogleUserInfo(w, req)
		id := req.FormValue("q")
	 	udvl, err := GetVisitSheet(u, id)

		if err != ""{
			http.Redirect(w, req, "/vpfs?q=" + id, http.StatusSeeOther)
			return
		}

		config.TPL.ExecuteTemplate(w, "visitSheets.gohtml", udvl)
}
func LoadMyLicks(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	u, _ := GetGoogleUser(w, req)
	config.TPL.ExecuteTemplate(w, "loadmylicks.gohtml", u)
}
func GoPro(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	u, _ := GetGoogleUser(w, req)
	config.TPL.ExecuteTemplate(w, "gopro.gohtml", u)
}
func SK(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}
	u, _ := GetGoogleUser(w, req)
	id := req.FormValue("q")
	usk := GetSoketUser(u, id)

	config.TPL.ExecuteTemplate(w, "sk.gohtml", usk)
}

func UserList(w http.ResponseWriter, req *http.Request)  {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/googlelogin", http.StatusSeeOther)
		return
	}

	u, _ := getGoogleUserInfo(w, req)

	config.TPL.ExecuteTemplate(w, "userslist.gohtml", u)
}
