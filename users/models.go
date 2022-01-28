package Datas

import (
	"github.com/satori/go.uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"context"
	"net/http"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"
	"time"
	"log"
	"golang.org/x/oauth2"
  "golang.org/x/oauth2/google"
	"strconv"
	"net/url"
)

// database
var DB *mongo.Database
var Client *mongo.Client
// collections
var Users *mongo.Collection
var Licks *mongo.Collection
var Sheets *mongo.Collection
var Sessions *mongo.Collection
var Posts *mongo.Collection
var Comments *mongo.Collection
var Invoices *mongo.Collection

var Ctx context.Context
var (
	googleOauthConfig *oauth2.Config
	// TODO: randomize it
	oauthid, _ = uuid.NewV4()
	oauthStateString = oauthid.String()
)
func init() {
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  "http://localhost:8080/callback",
		ClientID:     "xxxxx",
		ClientSecret: "xxxxx",
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email","https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint,
	}
}


type GoogleUser struct {
	// add ID and tags if you need them
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Email				string				`json: "email", bson: "email"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Locale			string				`json: "locale", bson: "locale"`
	Role        string        `json: "role", bson: "role"`
	Login       bool          `json: "login" bson: "login"`
	Theme       string        `json: "theme" bson: "theme"`
	About				string				`json: "about  bson: about"`
	OwnedLicks  []primitive.ObjectID      `json: "ownedlicks" bson: "ownedlicks"`
	OwnedSheets []primitive.ObjectID      `json: "ownedsheets" bson: "ownedsheets"`
	Posts       []string 									`json: "posts" bson: "posts"`
	Comments     []string									`json: "comments" bson: "comments"`
	Followings       []string 						`json: "followings" bson: "followings"`
	Followers       []string 							`json: "followers" bson: "followers"`
	AuthCode      string       `json: "authcode"  bson: "authcode"`
	Downloaded   []string				`json: "downloaded"  bson: "downloaded"`
	ProExp     time.Time			`json: "proexp"  bson: "proexp"`
	DCounts		int `json: "dcounts"  bson: "dcounts"`
	DCountsW		int `json: "dcountsW"  bson: "dcountsW"`
}
type GoogleUserFull struct {
	// add ID and tags if you need them
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Email				string				`json: "email", bson: "email"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Locale			string				`json: "locale", bson: "locale"`
	Role        string        `json: "role", bson: "role"`
	Login       bool          `json: "login" bson: "login"`
	Theme       string        `json: "theme" bson: "theme"`
	About				string				`json: "about  bson: about"`
	OwnedLicks  []licks       `json:"ownedlicks" bson:"ownedlicks"`
	OwnedSheets []sheets      `json: "ownedsheets" bson: "ownedsheets"`
	Posts       []posts 			`json: "posts" bson: "posts"`
	Comments     []string								`json: "comments" bson: "comments"`
	Followings  []string 								`json: "followings" bson: "followings"`
	Followers   []string 								`json: "followers" bson: "followers"`
}
type Googleinfo struct {
	Email				string 				`json: "email", bson: "email"`
	Given_name	string 				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Locale			string				`json: "locale", bson: "locale"`
}

type GoogleUserDpLick struct {
	// add ID and tags if you need them
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Email				string				`json: "email", bson: "email"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Locale			string				`json: "locale", bson: "locale"`
	Role        string        `json: "role", bson: "role"`
	Login       bool          `json: "login" bson: "login"`
	Theme       string        `json: "theme" bson: "theme"`
	About				string				`json: "about  bson: about"`
	OwnedLicks  []primitive.ObjectID `json:"ownedlicks" bson:"ownedlicks"`
	OwnedSheets []primitive.ObjectID `json: "ownedsheets" bson: "ownedsheets"`
	DpLick      licks           `json:"dplick" bson:"dplick"`
}

type GoogleUserDpSheet struct {
	// add ID and tags if you need them
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Email				string				`json: "email", bson: "email"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Locale			string				`json: "locale", bson: "locale"`
	Role        string        `json: "role", bson: "role"`
	Login       bool          `json: "login" bson: "login"`
	Theme       string        `json: "theme" bson: "theme"`
	About				string				`json: "about  bson: about"`
	OwnedLicks  []primitive.ObjectID `json:"ownedlicks" bson:"ownedlicks"`
	OwnedSheets []primitive.ObjectID `json: "ownedsheets" bson: "ownedsheets"`
	DpSheet      sheets           `json:"dpsheet" bson:"dpsheet"`
	SortedLicks  []licks     	`json:"srtlicks" bson:"srtlicks"`
}
type GoogleUserForum struct {
	// add ID and tags if you need them
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Locale			string				`json: "locale", bson: "locale"`
	Role        string        `json: "role", bson: "role"`
	Login       bool          `json: "login" bson: "login"`
	Theme       string        `json: "theme" bson: "theme"`
	Topu			[]topu	`json: "topu" bson: "topu"`
	Tren			[]posts	`json: "tren" bson: "tren"`
  Post  			posts     		`json:"posts" bson:"posts"`
}

type LickUpdateStrt struct {
	ID   primitive.ObjectID `json:"id" bson:"_id"`
	Data []string      `json:"data" bson:"data"`
}
type LickScaleUpdateStrt struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Scale string `json:"scale" bson: "scale"`
}
type LickNameUpdateStrt struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Name string `json:"name" bson: "name"`
}
type LickKeyUpdateStrt struct{
	ID primitive.ObjectID `json:"id" bson:"_id"`
	Key string        	`json:"key" bson: "key"`
	ChoChar string      `json:"chochar" bson: "chochar"`
	Chocen string				`json:"chocen" bson:"chocen"`
	IsSharp string 			`json: "issharp" bson:"issharp"`
	Difficulty string 	`json: "difficulty" bson:"difficulty"`
	Tag []string					`json: "tag" bson:"tag"`
}

type PostCommentStrt struct{
	PostID string        			`json:"postid" bson: "postid"`
	Contents string							`json: "contents" bson: "contents"`
}

type licks struct {
	ID    primitive.ObjectID `json:"id" bson:"_id"`
	Name  string        `json:"name" bson:"name"`
	Scale string        `json:"scale" bson: "scale"`
	Key string        	`json:"key" bson: "key"`
	ChoCen string				`json:"chocen" bson:"chocen"`
	ChoChar string      `json:"chochar" bson: "chochar"`
	Data  []string      `json:"data" bson:"data"`
	IsSharp string 			`json: "issharp" bson:"issharp"`
	Difficulty string 	`json: "difficulty" bson:"difficulty"`
	Tag []string 				`json: "tag" bson:"tag"`
	Author string				`json: "author" bson:"author"`
	AuthorID string			`json: "authorid" bson:"authorid"`
	AuthorImage string					`json: "authorimage" bson: "authorimage"`
	Downloaded  bool 	`json: "downloaded" bson:"downloaded"`
}

type sheets struct {
	ID   primitive.ObjectID		`json:"id" bson:"_id"`
	Name string								`json:"name" bson:"name"`
	Key string        				`json:"key" bson: "key"`
	Data []string							`json:"data" bson:"data"`
	Difficulty string					`json: "difficulty" bson: "difficulty"`
	Author string							`json: "author" bson:"author"`
	AuthorID string						`json: "authorid" bson:"authorid"`
	AuthorImage string				`json: "authorimage" bson: "authorimage"`
	Downloaded  bool 	`json: "downloaded" bson:"downloaded"`
}
type posts struct {
	ID   primitive.ObjectID			`json:"id" bson:"_id"`
	PostNum string        			`json:"postnum" bson: "postnum"`
	Title string								`json:"title" bson:"title"`
	Date time.Time							`json:"date" bson:"date"`
	Contents string							`json: "contents" bson: "contents"`
	Author string								`json: "author" bson: "author"`
	AuthorID string							`json: "authorid" bson: "authorid"`
	AuthorImage string					`json: "authorimage" bson: "authorimage"`
	Viewcounts string						`json: "viewcounts" bson: "viewcounts"`
	Comments []string							`json: "comments" bson: "comments"`
	Votes string						  	`json: "votes" bson: "votes"`
	Voteups []string `json: "voteups" bson: "voteups"`
	Votedowns []string `json: "votedowns" bson: "votedowns"`
}

type comments struct {
	ID   primitive.ObjectID			`json:"id" bson:"_id"`
	PostID string        			`json:"postid" bson: "postid"`
	Date time.Time							`json:"date" bson:"date"`
	Contents string							`json: "contents" bson: "contents"`
	Author string								`json: "author" bson: "author"`
	AuthorID string							`json: "authorid" bson: "authorid"`
	AuthorImage string					`json: "authorimage" bson: "authorimage"`
}

type Session struct {
	un           string
	lastActivity time.Time
	ac    string
}
type savecomstrt struct{
	ID string `json:"id" bson:"_id"`
	Contents string `json: "contents" bson: "contents"`
}
type updateSheetStrt struct {
	ID primitive.ObjectID		`json:"id" bson:"_id"`
	Instruction string			`json:"instruction" bson:"instruction"`
	Index				int				 	`json:"index" bson:"index"`
	Q           string      `json:"lickid" bson:"lickid"`
}
type updateSheetKeyStrt struct {
	ID primitive.ObjectID		`json:"id" bson:"_id"`
	Key string        			`json:"key" bson: "key"`
	Difficulty string       `json: "difficulty" bson: "difficulty"`
}
type updateSheetTitle struct {
	ID primitive.ObjectID		`json:"id" bson:"_id"`
	Name string        			`json:"name" bson: "name"`
}
type updateSettingStrt struct{
	Email				string				`json: "email", bson: "email"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Theme       string        `json: "theme" bson: "theme"`
	About				string				`json: "about  bson: about"`
}

type deleteLickStrt struct{
	UserID primitive.ObjectID		`json:"userId" bson:"_id1"`
	LickID primitive.ObjectID		`json:"lickId" bson:"_id2"`
}

type getpr struct{
	Filter			string				`json: "filter", bson: "filter"`
	Skip				string				`json: "skip", bson: "skip"`
	Query				string				`json: "query", bson: "query"`
}
type postpoststrt struct{
	PostTitle				string				`json: "posttitle", bson: "posttitle"`
	PostContents		string				`json: "postcontents", bson: "postcontents"`
}
type vcstrt struct{
	PostID string `json: "pid", bson: "pid"`
	Viewcounts  string `json: "vc", bson: "vc"`
}

type GoogleUserProfile struct{
	User1 GoogleUser `json: "googleuser1", bson: "googleuser1"`
	User2 GoogleUser `json: "googleuser2", bson: "googleuser2"`
	Same    bool       `json: "same", bson: "same"`
	Following    bool       `json: "following", bson: "following"`
	Followings  int 	`json: "followings", bson: "followings"`
	Followers  int 	`json: "followings", bson: "followings"`
}

type DnN struct{
	Time string `json: "time", bson: "time"`
}

type users struct{
	Email				string				`json: "email", bson: "email"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Role        string        `json: "role", bson: "role"`
}
type payappreq struct{
	Recvphone string 		`json: "recvphone", bson: "recvphone"`
	Goodname	string					`json: "goodname", bson: "goodname"`
	Reqmode string			`json: "reqmode", bson: "reqmode"`
	Vccode string				`json: "vccode", bson: "vccode"`
	Email string				`json: "email", bson: "email"`
}

type soketuser struct{
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Email				string				`json: "email", bson: "email"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Locale			string				`json: "locale", bson: "locale"`
	Role        string        `json: "role", bson: "role"`
	Login       bool          `json: "login" bson: "login"`
	Theme       string        `json: "theme" bson: "theme"`
	Mul					string 				`json: "mul" bson: "mul"`
}
type invoice struct{
	Mul_no string `json: "mul_no", bson: "mul_no"`
	GoodName string `json: "goodname", bson: "goodname"`
	AuthCode string `json: "authcode", bson: "authcode"`
	Email string				`json: "email", bson: "email"`
	State bool `json: "state", bson: "state"`
	Time time.Time `json: "time", bson: "time"`
}
type votestrt struct{
	Vote string `json: "vote", bson: "vote"`
	Pid string `json: "pid", bson: "pid"`
}
type GoogleUserRank struct {
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
	Locale			string				`json: "locale", bson: "locale"`
	Role        string        `json: "role", bson: "role"`
	Login       bool          `json: "login" bson: "login"`
	Theme       string        `json: "theme" bson: "theme"`
  Topu			[]topu	`json: "topu" bson: "topu"`
	Tren			[]posts	`json: "tren" bson: "tren"`
}
type topu struct{
	ID         primitive.ObjectID `json:"id" bson:"_id"`
	Given_name	string				`json: "given_name", bson: "given_name"`
	Picture			string				`json: "picture", bson: "picture"`
}

type editpstrt struct{
	ID string `json:"id" bson:"_id"`
	Content string `json:"content" bson:"content"`
}
var dbSessions = map[string]Session{}

func getTime() DnN {
	t := time.Now()

	var d DnN

	if t.Hour() >= 6 && t.Hour() < 12{
		d.Time = "morning"
	}else if t.Hour() >= 12 && t.Hour() < 18{
		d.Time = "afternoon"
	}else{
		d.Time = "evening"
	}

	return d
}
func GetGoogleUser(w http.ResponseWriter, r *http.Request) (GoogleUserFull, error) {
	c, err := r.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)
	var u GoogleUserFull
	var ui []GoogleUser
	var il []licks
	var ls licks
	var is []sheets
	var ss sheets
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	Ctx2 := context.Background()
	u.ID = ui[0].ID
	u.Email = ui[0].Email
	u.Picture = ui[0].Picture
	u.Locale = ui[0].Locale
	u.Given_name = ui[0].Given_name
	u.Role = ui[0].Role
	u.Login = ui[0].Login
	u.Theme = ui[0].Theme
	u.About = ui[0].About
	ad := &ls.Data
	ad2 := &il
	for _, ol := range ui[0].OwnedLicks {
		cursor, err = Licks.Find(
		Ctx2,
		bson.D{{"_id", ol}},
		)
		if err = cursor.All(Ctx2, &il); err != nil {
		log.Fatal(err)
		}

		ls.ID = il[0].ID
		ls.Name = il[0].Name
		ls.Scale = il[0].Scale
		ls.Key = il[0].Key
		ls.ChoCen = il[0].ChoCen
		ls.ChoChar = il[0].ChoChar
		ls.Data = il[0].Data
		ls.IsSharp = il[0].IsSharp
		ls.Difficulty = il[0].Difficulty
		ls.Tag	= il[0].Tag
		u.OwnedLicks = append(u.OwnedLicks, ls)
		*ad = nil
		*ad2 = nil
	}
	ad3 := &ss.Data
	ad4 := &is
	for _, os := range ui[0].OwnedSheets {
		cursor, err = Sheets.Find(
		context.TODO(),
		bson.D{{"_id", os}},
		)
		if err = cursor.All(Ctx2, &is); err != nil {
		log.Fatal(err)
		}
		ss.ID = is[0].ID
		ss.Name = is[0].Name
		ss.Key = is[0].Key
		ss.Data = is[0].Data
		ss.Difficulty = is[0].Difficulty
		u.OwnedSheets = append(u.OwnedSheets, ss)
		*ad3 = nil
		*ad4 = nil
	}

	return u, err
}

func getGoogleUserInfo(w http.ResponseWriter, r *http.Request) (GoogleUser, error) {
	c, err := r.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	var eui GoogleUser

	Ctx := context.Background()
		cursor, err := Users.Find(Ctx, bson.M{"email": dbSessions[c.Value].un})
			if err = cursor.All(Ctx, &ui); err != nil {
			log.Fatal(err)
			}

	if ui != nil{
		if ui[0].Theme == ""{
			ui[0].Theme = "pastel"
			opts := options.Update().SetUpsert(true)
			filter := bson.D{{"_id", ui[0].ID}}
			_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"theme": ui[0].Theme}}}, opts)
				if err != nil {
					log.Fatal(err)
				}
		}

		return ui[0], err
	}else{

		return eui, err
	}
}
func HandleGoogleLogin(w http.ResponseWriter, r *http.Request) {
	url := googleOauthConfig.AuthCodeURL(oauthStateString)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}
func HandleGoogleCallback(w http.ResponseWriter, r *http.Request) {
	content, err := getUserInfoGoogle(r.FormValue("state"), r.FormValue("code"))
	if err != nil {
		fmt.Println(err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	// b,_ := json.Marshal(content)
	// fmt.Fprintf(w, "Content: %s\n", b)
	var gu []GoogleUser

	Ctx := context.Background()
	cursor, err := Users.Find(Ctx, bson.M{"email": content.Email})
	if err = cursor.All(Ctx, &gu); err != nil {
		log.Fatal(err)
	}
	if len(gu) ==0{
		PutGoogleUser(w, r, content)
		return
	}

	sID, _ := uuid.NewV4()
	c := &http.Cookie{
		Name:  "session",
		Value: sID.String(),
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)
	dbSessions[c.Value] = Session{gu[0].Email, time.Now(), sID.String()}

	_, err = Users.UpdateOne(context.Background(), bson.M{"_id": gu[0].ID}, bson.D{{"$set", bson.M{"authcode": sID.String()}}})
		if err != nil {
			log.Fatal(err)
		}
	http.Redirect(w, r, "/mylicks", http.StatusSeeOther)
}
func PutGoogleUser(w http.ResponseWriter, r *http.Request, content Googleinfo)  {
	var ol []primitive.ObjectID
	var os []primitive.ObjectID
	var es []string
	var gu  GoogleUser

	sID, _ := uuid.NewV4()
			gu.ID = primitive.NewObjectID()
			gu.Email = content.Email
			gu.Picture = content.Picture
			gu.Given_name = content.Given_name
			gu.Locale = content.Locale
			gu.Role = "user"
			gu.Login = true
			gu.Theme = "pastel"
			gu.About = ""
			gu.OwnedLicks = ol
			gu.OwnedSheets = os
			gu.Posts = es
			gu.Followers = es
			gu.Followings = es
			gu.AuthCode = sID.String()
			gu.Downloaded = es
			gu.DCounts = 0
			gu.DCountsW = 0

			gu.ProExp = time.Now()
			_, err := Users.InsertOne(context.TODO(), gu)
			if err != nil {
				log.Fatal(err)
			}


			c := &http.Cookie{
				Name:  "session",
				Value: sID.String(),
			}
			c.MaxAge = sessionLength
			http.SetCookie(w, c)
			dbSessions[c.Value] = Session{content.Email, time.Now(), sID.String()}
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
}
func getUserInfoGoogle(state string, code string) (Googleinfo, error) {
	var ums Googleinfo
	if state != oauthStateString {
		return ums, fmt.Errorf("invalid oauth state")
	}

	token, err := googleOauthConfig.Exchange(oauth2.NoContext, code)
	if err != nil {
		return ums, fmt.Errorf("code exchange failed: %s", err.Error())
	}

	response, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		return ums, fmt.Errorf("failed getting user info: %s", err.Error())
	}

	defer response.Body.Close()
	contents, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return ums, fmt.Errorf("failed reading response body: %s", err.Error())
	}
	fmt.Println(string(contents))
	err = json.Unmarshal(contents, &ums)
	fmt.Println(ums)
	if err != nil {
		fmt.Println(err)
	}
	return ums, nil
}


func AlreadyLoggedIn(w http.ResponseWriter, r *http.Request) bool {
	c, err := r.Cookie("session")
	if err != nil {
		return false
	}
	var u []GoogleUser

	//err = config.Users.Find(bson.M{"username": dbSessions[c.Value].un}).One(&u)
Ctx := context.Background()
if _, ok := dbSessions[c.Value]; ok {
    //do something here
		cursor, err := Users.Find(Ctx, bson.M{"email": dbSessions[c.Value].un})
		if err = cursor.All(Ctx, &u); err != nil {
	    log.Fatal(err)
		}
}else{
	c = &http.Cookie{
		Name:     "session",
		MaxAge:   -1,
		HttpOnly: true,
	}

	http.SetCookie(w, c)
	return false
}

	if u == nil {
		c = &http.Cookie{
			Name:     "session",
			MaxAge:   -1,
			HttpOnly: true,
		}

		http.SetCookie(w, c)
		return false
	}

	if u != nil{
		if u[0].AuthCode == dbSessions[c.Value].ac {
			return true
		} else {
			c = &http.Cookie{
				Name:     "session",
				MaxAge:   -1,
				HttpOnly: true,
			}

			http.SetCookie(w, c)
			return false
		}
	}else{
		c = &http.Cookie{
			Name:     "session",
			MaxAge:   -1,
			HttpOnly: true,
		}

		http.SetCookie(w, c)
		return false
	}
}

func NewLick(w http.ResponseWriter, req *http.Request)  {
	var l []licks
	var ui []GoogleUser

	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	Ctx := context.Background()
	cursor, err := Users.Find(Ctx, bson.M{"email": dbSessions[c.Value].un})
		if err = cursor.All(Ctx, &ui); err != nil {
		log.Fatal(err)
		}
		if ui == nil {
			b, _ := json.Marshal("err")
			w.Write(b)
			return
		}
		if len(ui[0].OwnedLicks) > 3{
			if ui[0].Role != "Pro"{
				b, _ := json.Marshal("noPro")
				w.Write(b)
				return
			}
			today := time.Now()
			if !today.Before(ui[0].ProExp){
				filter := bson.D{{"email", dbSessions[c.Value].un}}
				_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"role": "user"}}}, options.Update().SetUpsert(true))
					if err != nil {
						log.Fatal(err)
					}
				b, _ := json.Marshal("noPro")
				w.Write(b)
				return
			}
		}

	od := primitive.NewObjectID()
	name := "Untitled"
	scale := "Dorian"
	chocen := "1"
	chochar := "m7"
	key := "7"
	var data []string = nil
	var tag []string = nil
	l = append(l, licks{od, name, scale, key, chocen, chochar, data, "0", "20", tag, ui[0].Given_name, ui[0].ID.Hex(), ui[0].Picture, false})


	_, err = Licks.InsertOne(context.TODO(), l[0])
	if err != nil {
		log.Fatal(err)
	}

	ui[0].OwnedLicks = append(ui[0].OwnedLicks, od)
	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"email", dbSessions[c.Value].un}}
	_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"ownedlicks": ui[0].OwnedLicks}}}, opts)
		if err != nil {
			log.Fatal(err)
		}

		b, _ := json.Marshal(od.Hex())
		w.Write(b)
}
func DeleteLick(w http.ResponseWriter, req *http.Request)  {
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums deleteLickStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	//opts := options.Update().SetUpsert(true)
	filter := bson.D{{"_id", ums.UserID}}
		_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$pull", bson.M{"ownedlicks": ums.LickID}}})
			if err != nil {
				log.Fatal(err)
			}

				_, err = Licks.DeleteOne(context.TODO(), bson.D{{"_id", ums.LickID}})
			if err != nil {
			    log.Fatal(err)
			}
}
func DeleteSheet(w http.ResponseWriter, req *http.Request)  {
	var ls []sheets
	var lid primitive.ObjectID

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums deleteLickStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	cursor, err := Sheets.Find(context.Background(), bson.M{"_id": ums.LickID})
	if err = cursor.All(Ctx, &ls); err != nil {
    log.Fatal(err)
	}
	for _, ids := range ls[0].Data {
		lid, _ = primitive.ObjectIDFromHex(ids)
		if lid != primitive.NilObjectID{
				_, err = Licks.DeleteOne(context.TODO(), bson.D{{"_id", lid}})
			if err != nil {
					log.Fatal(err)
				}
		}
	}

	//opts := options.Update().SetUpsert(true)
	filter := bson.D{{"_id", ums.UserID}}
		_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$pull", bson.M{"ownedsheets": ums.LickID}}})
			if err != nil {
				log.Fatal(err)
			}

				_, err = Sheets.DeleteOne(context.TODO(), bson.D{{"_id", ums.LickID}})
			if err != nil {
			    log.Fatal(err)
			}
}
func getGoogleUserDpLick(u GoogleUser, id string) (GoogleUserDpLick, error) {
	var udp GoogleUserDpLick
	var ls []licks
	udp.ID = u.ID
	udp.Email = u.Email
	udp.Picture = u.Picture
	udp.Given_name = u.Given_name
	udp.Locale = u.Locale
	udp.Role = u.Role
	udp.Login = u.Login
	udp.Theme = u.Theme
	udp.OwnedLicks = u.OwnedLicks
	udp.OwnedSheets = u.OwnedSheets
	str := id
	oid, err := primitive.ObjectIDFromHex(str)
	if err != nil{
		log.Fatal(err)
	}
	Ctx := context.Background()
	cursor, err := Licks.Find(Ctx, bson.M{"_id": oid})
	if err = cursor.All(Ctx, &ls); err != nil {
    log.Fatal(err)
	}

	udp.DpLick = ls[0]
	return udp, err
}
func Updatelick(w http.ResponseWriter, req *http.Request) {
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums LickUpdateStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	//config.Licks.Update(bson.M{"_id": ums.ID}, bson.M{"$set": bson.M{"data": ums.Data}})

	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"_id", ums.ID}}
	_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"data": ums.Data}}}, opts)
		if err != nil {
			log.Fatal(err)
		}
}
func UpdateLickScale(w http.ResponseWriter, req *http.Request)  {
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums LickScaleUpdateStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}


	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"_id", ums.ID}}
	_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"scale": ums.Scale}}}, opts)
		if err != nil {
			log.Fatal(err)
		}

}
func UpdateLickKey(w http.ResponseWriter, req *http.Request)  {
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums LickKeyUpdateStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"_id", ums.ID}}
	_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"key": ums.Key}}}, opts)
		if err != nil {
			log.Fatal(err)
		}
		_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"chocen": ums.Chocen}}}, opts)
			if err != nil {
				log.Fatal(err)
			}
			_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"chochar": ums.ChoChar}}}, opts)
				if err != nil {
					log.Fatal(err)
				}
				_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"issharp": ums.IsSharp}}}, opts)
					if err != nil {
						log.Fatal(err)
					}
					_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"difficulty": ums.Difficulty}}}, opts)
						if err != nil {
							log.Fatal(err)
						}
						_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"tag": ums.Tag}}}, opts)
							if err != nil {
								log.Fatal(err)
							}

}
func UpdateLickName(w http.ResponseWriter, req *http.Request)  {
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums LickNameUpdateStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"_id", ums.ID}}
	_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"name": ums.Name}}}, opts)
		if err != nil {
			log.Fatal(err)
		}

}


func NewSheet(w http.ResponseWriter, req *http.Request)  {
	var s []sheets
	var ui []GoogleUser

	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	Ctx := context.Background()
	cursor, err := Users.Find(Ctx, bson.M{"email": dbSessions[c.Value].un})
		if err = cursor.All(Ctx, &ui); err != nil {
		log.Fatal(err)
		}

		if ui == nil {
			b, _ := json.Marshal("err")
			w.Write(b)
			return
		}
		if len(ui[0].OwnedSheets) > 3{
			if ui[0].Role != "Pro"{
				b, _ := json.Marshal("noPro")
				w.Write(b)
				return
			}
			today := time.Now()
			if !today.Before(ui[0].ProExp){
				filter := bson.D{{"email", dbSessions[c.Value].un}}
				_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"role": "user"}}}, options.Update().SetUpsert(true))
					if err != nil {
						log.Fatal(err)
					}
				b, _ := json.Marshal("noPro")
				w.Write(b)
				return
			}
		}

	od := primitive.NewObjectID()
	name := "Untitled"
	key := "7"
	difficulty := "5"
	var data []string
	data = append(data, "000000000000000000000000")
	s = append(s, sheets{od, name, key, data, difficulty, ui[0].Given_name, ui[0].ID.Hex(), ui[0].Picture, false})

	_, err = Sheets.InsertOne(context.TODO(), s[0])
	if err != nil {
		log.Fatal(err)
	}

	ui[0].OwnedSheets = append(ui[0].OwnedSheets, od)
	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"email", dbSessions[c.Value].un}}
	_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"ownedsheets": ui[0].OwnedSheets}}}, opts)
		if err != nil {
			log.Fatal(err)
		}
	b, _ := json.Marshal(od.Hex())
	w.Write(b)
}
func getGoogleUserDpSheet(u GoogleUser, id string) (GoogleUserDpSheet, error) {
	var udp GoogleUserDpSheet
	var ss []sheets
	var ls []licks
	var oid primitive.ObjectID
	var emptyls licks
	udp.ID = u.ID
	udp.Email = u.Email
	udp.Picture = u.Picture
	udp.Given_name = u.Given_name
	udp.Locale = u.Locale
	udp.Role = u.Role
	udp.Login = u.Login
	udp.Theme = u.Theme
	udp.OwnedLicks = u.OwnedLicks
	udp.OwnedSheets = u.OwnedSheets
	str := id
	oid, err := primitive.ObjectIDFromHex(str)
	if err != nil{
		log.Fatal(err)
	}


Ctx := context.Background()
	cursor, err := Sheets.Find(Ctx, bson.M{"_id": oid})
	if err = cursor.All(Ctx, &ss); err != nil {
    log.Fatal(err)
	}

	udp.DpSheet = ss[0]

	if udp.DpSheet.Data != nil {
		ad := &ls
		for _, sheetid := range udp.DpSheet.Data {

			oid, _ = primitive.ObjectIDFromHex(sheetid)

			if oid != primitive.NilObjectID{
				cursor, err = Licks.Find(context.Background(), bson.M{"_id": oid})
				if err = cursor.All(Ctx, ad); err != nil {
					udp.SortedLicks = append(udp.SortedLicks, emptyls)
				}else{
					udp.SortedLicks = append(udp.SortedLicks, ls[0])
				}
			}else{
				udp.SortedLicks = append(udp.SortedLicks, emptyls)
			}
			*ad = nil
		}
	}
	return udp, err
}
func GetSheetData(w http.ResponseWriter, req *http.Request)  {
	var ls []licks
	var ids []primitive.ObjectID
	var oid primitive.ObjectID
	var ss []licks
	var emptys licks

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	sbs := string(bs)
	arr := strings.Split(sbs,",")

	for _, id := range arr {
		if id == ""{
			oid = primitive.NilObjectID
		}else{
			oid, _ = primitive.ObjectIDFromHex(id)
		}
		ids = append(ids, oid)
	}
	Ctx := context.Background()
	ad := &ls
	for _, datas := range ids {
		*ad = nil
		//err = config.Licks.Find(bson.M{"_id": ol}).One(&il)
		if datas != primitive.NilObjectID{
			cursor, err := Licks.Find(
			Ctx,
			bson.D{{"_id", datas}},
			)
			if err = cursor.All(Ctx, ad); err != nil {
				ss = append(ss, emptys)
			}else{
				ss = append(ss, ls[0])
			}
		}else{
			ss = append(ss, emptys)
		}
	}

	b, _ := json.Marshal(ss)
	w.Write(b)
}
func SwitchSheetLicks(w http.ResponseWriter, req *http.Request)  {
	sid := req.FormValue("q")
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	sbs := string(bs)
	arr := strings.Split(sbs,",")

	oid, _ := primitive.ObjectIDFromHex(sid)
	opts := options.Update().SetUpsert(true)
		filter := bson.D{{"_id", oid}}
		_, err = Sheets.UpdateOne(context.TODO(), filter,
		bson.D{{"$set", bson.M{"data": arr}}}, opts)
			if err != nil {
				log.Fatal(err)
			}
		b, _ := json.Marshal("ok")
		w.Write(b)
}
func UpdateSheet(w http.ResponseWriter, req *http.Request){

	var ui []GoogleUser

	c, err := req.Cookie("session")
	if err != nil {

	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	Ctx := context.Background()
	cursor, err := Users.Find(Ctx, bson.M{"email": dbSessions[c.Value].un})
		if err = cursor.All(Ctx, &ui); err != nil {
		log.Fatal(err)
		}

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums updateSheetStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	switch ums.Instruction {
	case "new":
		l := SheetInsertNewLick(ums.ID, context.TODO(), ums.Index, ui[0].Given_name, ui[0].ID.Hex(), ui[0].Picture)
		b, _ := json.Marshal(l.ID.Hex())
		w.Write(b)
	case "load":
		LoadLickID(ums.ID, context.TODO(), ums.Index, ums.Q)
		b, _ := json.Marshal("ok")
		w.Write(b)
	case "edit":
		l := GetLickID(ums.ID, context.TODO(), ums.Index)
		b, _ := json.Marshal(l)
		w.Write(b)
	case "remove":
		SheetDeleteLick(ums.ID, context.TODO(), ums.Index)
		b, _ := json.Marshal("ok")
		w.Write(b)
	case "pull":
		PullLickData(ums.ID, context.TODO(), ums.Q)
		b, _ := json.Marshal("ok")
		w.Write(b)
	}

}
func UpdateSheetLickKey(w http.ResponseWriter, req *http.Request){

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums []LickKeyUpdateStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	opts := options.Update().SetUpsert(true)
	for _,ls := range ums {
		filter := bson.D{{"_id", ls.ID}}
		_, err = Licks.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"key": ls.Key}}}, opts)
			if err != nil {
				log.Fatal(err)
			}
	}

}
func UpdateSheetTitle(w http.ResponseWriter, req *http.Request){

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums updateSheetTitle
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	opts := options.Update().SetUpsert(true)
		filter := bson.D{{"_id", ums.ID}}
		_, err = Sheets.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"name": ums.Name}}}, opts)
			if err != nil {
				log.Fatal(err)
			}

}
func UpdateSheetKey(w http.ResponseWriter, req *http.Request){

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums updateSheetKeyStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"_id", ums.ID}}
		_, err = Sheets.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"key": ums.Key}}}, opts)
			if err != nil {
				log.Fatal(err)
			}
			_, err = Sheets.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"difficulty": ums.Difficulty}}}, opts)
				if err != nil {
					log.Fatal(err)
				}

}
func PullLickData(sid primitive.ObjectID, ctx context.Context, str string) {

	lid, _ := primitive.ObjectIDFromHex(str)
		_, err := Licks.DeleteOne(ctx, bson.D{{"_id", lid}})
	if err != nil {
	    log.Fatal(err)
	}

}
func LoadLickID(sid primitive.ObjectID, ctx context.Context, i int, str string) {
	var s []sheets
	var l []licks

	cursor, err := Sheets.Find(ctx, bson.M{"_id": sid})
	if err = cursor.All(ctx, &s); err != nil {
    log.Fatal(err)
	}

	 lid, _ := primitive.ObjectIDFromHex(str)

		cursor, err = Licks.Find(ctx, bson.M{"_id": lid})
		if err = cursor.All(ctx, &l); err != nil {
	    log.Fatal(err)
		}
		l[0].ID = primitive.NewObjectID()
		_, err = Licks.InsertOne(ctx, l[0])
		if err != nil {
			log.Fatal(err)
		}

		if len(s[0].Data) == 0 {
			s[0].Data = append(s[0].Data, l[0].ID.Hex())
		}else{
			s[0].Data[i] =  l[0].ID.Hex()
		}

 	 opts := options.Update().SetUpsert(true)
  	filter := bson.D{{"_id", sid}}
  	_, err = Sheets.UpdateOne(ctx, filter, bson.D{{"$set", bson.M{"data": s[0].Data}}}, opts)
  		if err != nil {
  			log.Fatal(err)
  		}
}
func GetLickID(sid primitive.ObjectID, ctx context.Context, i int) string {
	var s []sheets

	cursor, err := Sheets.Find(ctx, bson.M{"_id": sid})
	if err = cursor.All(ctx, &s); err != nil {
    log.Fatal(err)
	}
	return s[0].Data[i]
}
func SheetDeleteLick(sid primitive.ObjectID, ctx context.Context, i int)  {
	var ss []sheets

	cursor, err := Sheets.Find(ctx, bson.M{"_id": sid})
	if err = cursor.All(ctx, &ss); err != nil {
    log.Fatal(err)
	}
	lid, _ := primitive.ObjectIDFromHex(ss[0].Data[i])

		_, err = Licks.DeleteOne(ctx, bson.D{{"_id", lid}})
	if err != nil {
	    log.Fatal(err)
	}
	ss[0].Data[i] = "000000000000000000000000"
		opts := options.Update().SetUpsert(true)
		filter := bson.D{{"_id", sid}}
		_, err = Sheets.UpdateOne(ctx, filter, bson.D{{"$set", bson.M{"data": ss[0].Data}}}, opts)
			if err != nil {
				log.Fatal(err)
			}

}
func SheetInsertNewLick(sid primitive.ObjectID, ctx context.Context, i int, auth string, authid string, authimg string) licks {
	var l []licks
	var ss []sheets

	od := primitive.NewObjectID()
	name := "Untitled"
	scale := "Dorian"
	chocen := "1"
	chochar := "m7"
	key := "7"
	var data []string = nil
	var tag []string = nil
	l = append(l, licks{od, name, scale, key, chocen, chochar, data, "0", "20", tag, auth, authid, authimg, false})

	_, err := Licks.InsertOne(ctx, l[0])
	if err != nil {
		log.Fatal(err)
	}
	cursor, err := Sheets.Find(ctx, bson.M{"_id": sid})
	if err = cursor.All(ctx, &ss); err != nil {
    log.Fatal(err)
	}
	if len(ss[0].Data) == 0 {
		ss[0].Data = append(ss[0].Data, od.Hex())
	}else{
		ss[0].Data[i] = od.Hex()
	}

	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"_id", sid}}
	_, err = Sheets.UpdateOne(ctx, filter, bson.D{{"$set", bson.M{"data": ss[0].Data}}}, opts)
		if err != nil {
			log.Fatal(err)
		}
		return l[0]
}
func SheetNewEmptyLick(w http.ResponseWriter, req *http.Request)  {
	var ss []sheets
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	var str string
	var sid primitive.ObjectID
	str = string(bs[:])

	Ctx := context.Background()
	sid, _ = primitive.ObjectIDFromHex(str)
	cursor, err := Sheets.Find(Ctx, bson.M{"_id": sid})
	if err = cursor.All(Ctx, &ss); err != nil {
    log.Fatal(err)
	}

	rv := primitive.NilObjectID.Hex()
	ss[0].Data = append(ss[0].Data, rv)
	opts := options.Update().SetUpsert(true)
	filter := bson.M{"_id": sid}
	_, err = Sheets.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"data": ss[0].Data}}}, opts)
		if err != nil {
			log.Fatal(err)
		}

}

func GetForumGoogleUser(u GoogleUser) GoogleUserRank {
	var gur GoogleUserRank
	gur.ID = u.ID
	gur.Picture = u.Picture
	gur.Given_name = u.Given_name
	gur.Locale = u.Locale
	gur.Role = u.Role
	gur.Login = u.Login
	gur.Theme = u.Theme

	var tren []posts
	var topu []topu
	limit := int64(3)
	opts := options.FindOptions{
		Sort: bson.D{{"votes", -1}},
  	Limit: &limit,
	}
	opts2 := options.FindOptions{
		Sort: bson.D{{"dcountsW", -1}},
  	Limit: &limit,
	}
	Ctx := context.Background()
	//findOptions := options.Find().SetSort(bson.D{{"date", -1}})
	cursor, err := Posts.Find(Ctx, bson.M{}, &opts)
	if err = cursor.All(Ctx, &tren); err != nil {
    log.Fatal(err)
	}

	cursor, err = Users.Find(Ctx, bson.M{}, &opts2)
	if err = cursor.All(Ctx, &topu); err != nil {
    log.Fatal(err)
	}

	gur.Topu = topu
	gur.Tren = tren

	return gur
}
func GetPosts(w http.ResponseWriter, req *http.Request)  {

	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}
	ui[0].Followings = append(ui[0].Followings, ui[0].ID.Hex())

 var p []posts

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums getpr
	var voteup []string
	var votedown []string
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	var ctx = context.Background()
	skip, _ := strconv.ParseInt(ums.Skip, 10, 32)
	limit := int64(7)
	opts := options.FindOptions{
		Sort: bson.D{{"date", -1}},
  	Skip: &skip,
  	Limit: &limit,
	}

	//findOptions := options.Find().SetSort(bson.D{{"date", -1}})
	if ums.Query != "" {
		qid, _ := primitive.ObjectIDFromHex(ums.Query)
		cursor, err = Posts.Find(ctx, bson.M{"_id": qid})
		if err = cursor.All(ctx, &p); err != nil {
	    log.Fatal(err)
		}
	}else{
		cursor, err = Posts.Find(ctx, bson.M{"authorid": bson.M{"$in": ui[0].Followings}}, &opts)
		if err = cursor.All(ctx, &p); err != nil {
	    log.Fatal(err)
		}
	}

	for i := 0; i < len(p); i++ {
		if contains(p[i].Voteups, ui[0].ID.Hex()){
			voteup = append(voteup, " votedu")
		}else{
			voteup = append(voteup, "")
		}
		if contains(p[i].Votedowns, ui[0].ID.Hex()){
			votedown = append(votedown, " votedd")
		}else{
			votedown = append(votedown, "")
		}
	}
	var s = bson.M{"posts": p, "num": len(p), "vu": voteup, "vd": votedown}
						b, _ := json.Marshal(s)
						w.Write(b)
}
func EditPost(w http.ResponseWriter, req *http.Request)  {
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	var p []posts
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	var v editpstrt
	err = json.Unmarshal(bs, &v)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(v.ID)
	pid, _ := primitive.ObjectIDFromHex(v.ID)
	fmt.Println(pid)
	cursor, err = Posts.Find(
	Ctx,
	bson.D{{"_id", pid}},
	)
	if err = cursor.All(Ctx, &p); err != nil {
    log.Fatal(err)
	}
	if ui[0].ID.Hex() == p[0].AuthorID{
		filter := bson.D{{"_id", pid}}
		opts := options.Update().SetUpsert(true)
		_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"contents": v.Content}}}, opts)
			if err != nil {
				log.Fatal(err)
			}
	}else{
		b, _ := json.Marshal("no")
		w.Write(b)
		return
	}
	b, _ := json.Marshal("ok")
	w.Write(b)
}
func DeletePost(w http.ResponseWriter, req *http.Request)  {
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	var p []posts
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	var v string
	err = json.Unmarshal(bs, &v)
	if err != nil {
		fmt.Println(err)
	}
	pid, _ := primitive.ObjectIDFromHex(v)
	cursor, err = Posts.Find(
	Ctx,
	bson.D{{"_id", pid}},
	)
	if err = cursor.All(Ctx, &p); err != nil {
    log.Fatal(err)
	}
	var cs []comments
	if ui[0].ID.Hex() == p[0].AuthorID{

		cursor, err = Comments.Find(Ctx,bson.D{{"postid", v}})
		if err = cursor.All(Ctx, &cs); err != nil {
	    log.Fatal(err)
		}
			for _, c := range cs {
				_, err = Users.UpdateOne(context.TODO(), bson.M{"comments": c.ID.Hex()},
				bson.D{{"$pull", bson.M{"comments": c.ID.Hex()}}})
					if err != nil {
						log.Fatal(err)
					}
					_, err = Comments.DeleteOne(context.TODO(), bson.D{{"_id", c.ID}})
				if err != nil {
						log.Fatal(err)
				}
			}
			_, err = Posts.DeleteOne(context.TODO(), bson.D{{"_id", p[0].ID}})
		if err != nil {
				log.Fatal(err)
		}
		_, err = Users.UpdateOne(context.TODO(), bson.M{"posts": v},
		bson.D{{"$pull", bson.M{"posts": v}}})
			if err != nil {
				log.Fatal(err)
			}
	}else{
		b, _ := json.Marshal("no")
		w.Write(b)
		return
	}
	b, _ := json.Marshal("ok")
	w.Write(b)
}
func VotePost(w http.ResponseWriter, req *http.Request)  {
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	var p []posts
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}
	uid := ui[0].ID.Hex()

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	var v votestrt
	err = json.Unmarshal(bs, &v)
	if err != nil {
		fmt.Println(err)
	}
	pid, _ := primitive.ObjectIDFromHex(v.Pid)
	cursor, err = Posts.Find(Ctx, bson.D{{"_id", pid}})
	if err = cursor.All(Ctx, &p); err != nil {
    log.Fatal(err)
	}
	vn, _ := strconv.Atoi(p[0].Votes)
	filter := bson.D{{"_id", pid}}
	opts := options.Update().SetUpsert(true)
	if v.Vote == "up"{
		if p[0].Voteups != nil{
			if contains(p[0].Voteups, uid){
					_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$pull", bson.M{"voteups": uid}}}, opts)
						if err != nil {
							log.Fatal(err)
						}
						vn -= 1
			}else{
				if contains(p[0].Votedowns, uid){
					_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$push", bson.M{"voteups": uid}}}, opts)
						if err != nil {
							log.Fatal(err)
						}
						_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$pull", bson.M{"votedowns": uid}}}, opts)
							if err != nil {
								log.Fatal(err)
							}
						vn += 2
				}else{
					_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$push", bson.M{"voteups": uid}}}, opts)
						if err != nil {
							log.Fatal(err)
						}
						vn += 1
				}
			}
		}else{
			p[0].Voteups = append(p[0].Voteups, uid)
				_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"voteups": p[0].Voteups}}}, opts)
					if err != nil {
						log.Fatal(err)
					}
					vn += 1
		}
	}else{
		if p[0].Votedowns != nil{
			if contains(p[0].Votedowns, uid){
					_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$pull", bson.M{"votedowns": uid}}}, opts)
						if err != nil {
							log.Fatal(err)
						}
						vn += 1
			}else{
				if contains(p[0].Voteups, uid){
					_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$push", bson.M{"votedowns": uid}}},opts)
						if err != nil {
							log.Fatal(err)
						}
						_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$pull", bson.M{"voteups": uid}}}, opts)
							if err != nil {
								log.Fatal(err)
							}
						vn -= 2
				}else{
					_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$push", bson.M{"votedowns": uid}}},opts)
						if err != nil {
							log.Fatal(err)
						}
						vn -= 1
				}
			}
		}else{
			p[0].Votedowns = append(p[0].Votedowns, uid)
				_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"votedowns": p[0].Votedowns}}},opts)
					if err != nil {
						log.Fatal(err)
					}
					vn -= 1
		}
	}
	_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"votes": strconv.Itoa(vn)}}})
		if err != nil {
			log.Fatal(err)
		}
}
func VisitPost(w http.ResponseWriter, req *http.Request)  {
	//checking xhr
	var ums string
	var post []posts

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	pid, _ := primitive.ObjectIDFromHex(ums)
	filter := bson.D{{"_id", pid}}

	Ctx := context.Background()
	cursor, err := Posts.Find(Ctx,filter)
	if err = cursor.All(Ctx, &post); err != nil {
    log.Fatal(err)
	}

	var vnum int
	vnum, _ = strconv.Atoi(post[0].Viewcounts)
	vnum += 1
	post[0].Viewcounts = strconv.Itoa(vnum)


		_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"viewcounts": post[0].Viewcounts}}})
			if err != nil {
				log.Fatal(err)
				return
			}
}
func getGoogleUserDpForum(u GoogleUserRank, id string) (GoogleUserForum, error) {
	var udp GoogleUserForum
	var ls []posts
	udp.ID = u.ID
	udp.Picture = u.Picture
	udp.Given_name = u.Given_name
	udp.Locale = u.Locale
	udp.Role = u.Role
	udp.Login = u.Login
	udp.Theme = u.Theme
	udp.Topu = u.Topu
	udp.Tren = u.Tren

	str := id
	oid, err := primitive.ObjectIDFromHex(str)
	if err != nil{
		log.Fatal(err)
	}
	Ctx := context.Background()
	cursor, err := Posts.Find(Ctx, bson.M{"_id": oid})
	if err = cursor.All(Ctx, &ls); err != nil {
    log.Fatal(err)
	}

	udp.Post = ls[0]
	return udp, err
}
func PostComments(w http.ResponseWriter, req *http.Request) {

	var pc comments
	var p []posts

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums PostCommentStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}



  pc.ID = primitive.NewObjectID()
	pc.AuthorID = ui[0].ID.Hex()
	pc.Author = ui[0].Given_name
	pc.AuthorImage = ui[0].Picture
	pc.Contents = ums.Contents
	pc.Date = time.Now()
	pc.PostID = ums.PostID

	_, err = Comments.InsertOne(context.TODO(), pc)
	if err != nil {
		log.Fatal(err)
	}

	pid, _ := primitive.ObjectIDFromHex(ums.PostID)
	cursor, err = Posts.Find(context.TODO(), bson.D{{"_id", pid}})
	if err = cursor.All(Ctx, &p); err != nil {
    log.Fatal(err)
	}

		p[0].Comments = append(p[0].Comments, pc.ID.Hex())
		ui[0].Comments = append(ui[0].Comments, pc.ID.Hex())

	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"_id", pid}}
		_, err = Posts.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"comments": p[0].Comments}}}, opts)
			if err != nil {
				log.Fatal(err)
			}

				_, err = Users.UpdateOne(context.TODO(), bson.D{{"_id", ui[0].ID}}, bson.D{{"$set", bson.M{"comments": ui[0].Comments}}}, opts)
					if err != nil {
						log.Fatal(err)
					}
}
func GetComments(w http.ResponseWriter, req *http.Request)  {
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums string
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	var coms []comments

	var ctx = context.Background()
	findOptions := options.Find().SetSort(bson.D{{"date", 1}})
	cursor, err := Comments.Find(ctx, bson.D{{"postid", ums}}, findOptions)
	if err = cursor.All(ctx, &coms); err != nil {
    log.Fatal(err)
	}
						b, _ := json.Marshal(coms)
						w.Write(b)
}
func PostPost(w http.ResponseWriter, req *http.Request)  {
	//checking session
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	uid := ui[0].ID.Hex()

	//checking xhr
	var ums postpoststrt

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	pid := primitive.NewObjectID()

	var p posts
	var esa []string

	p.ID = pid
	p.Author = ui[0].Given_name
	p.AuthorID = uid
	p.AuthorImage = ui[0].Picture
	p.Comments = esa
	p.Contents = ums.PostContents
	p.Date = time.Now()
	p.PostNum = "0"
	p.Title = ums.PostTitle
	p.Viewcounts = "0"
	p.Votes = "0"

	_, err = Posts.InsertOne(context.TODO(), p)
	if err != nil {
		log.Fatal(err)
		b, _ := json.Marshal("no")
		w.Write(b)
		return
	}
	filter := bson.D{{"_id", ui[0].ID}}
	if ui[0].Posts == nil{
		var ps []string
		ps = append(ps, pid.Hex())
		_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"posts": ps}}})
			if err != nil {
				log.Fatal(err)
				b, _ := json.Marshal("no")
				w.Write(b)
				return
			}
	}else{
		_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$push", bson.M{"posts": pid.Hex()}}})
			if err != nil {
				log.Fatal(err)
				b, _ := json.Marshal("no")
				w.Write(b)
				return
			}
	}

	b, _ := json.Marshal("ok")
	w.Write(b)
}
func SaveCom(w http.ResponseWriter, req *http.Request)  {
	//checking session
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	uid := ui[0].ID.Hex()

	//checking xhr
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums savecomstrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	cid, _ := primitive.ObjectIDFromHex(ums.ID)
	var coms []comments

	var ctx = context.Background()
	cursor, err = Comments.Find(ctx, bson.D{{"_id", cid}})
	if err = cursor.All(ctx, &coms); err != nil {
    log.Fatal(err)
		b, _ := json.Marshal("no")
		w.Write(b)
		return
	}

	if uid == coms[0].AuthorID {
		_, err = Comments.UpdateOne(context.TODO(), bson.M{"_id": cid}, bson.D{{"$set", bson.M{"contents": ums.Contents}}})
			if err != nil {
				log.Fatal(err)
			}
			b, _ := json.Marshal("awesome")
			w.Write(b)
	}else{
		b, _ := json.Marshal("no")
		w.Write(b)
	}
}
func DelCom(w http.ResponseWriter, req *http.Request)  {
	//checking session
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	uid := ui[0].ID.Hex()
//checking xhr
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums string
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	cid, _ := primitive.ObjectIDFromHex(ums)
	var coms []comments

	var ctx = context.Background()
	cursor, err = Comments.Find(ctx, bson.D{{"_id", cid}})
	if err = cursor.All(ctx, &coms); err != nil {
    log.Fatal(err)
		b, _ := json.Marshal("no")
		w.Write(b)
		return
	}

	if uid == coms[0].AuthorID {
		_, err = Comments.DeleteOne(ctx, bson.D{{"_id", cid}})
		if err != nil {
		    log.Fatal(err)
		}
		_, err = Posts.UpdateOne(context.TODO(), bson.M{"comments": ums}, bson.D{{"$pull", bson.M{"comments": ums}}})
			if err != nil {
				log.Fatal(err)
			}
			_, err = Users.UpdateOne(context.TODO(), bson.M{"comments": ums}, bson.D{{"$pull", bson.M{"comments": ums}}})
				if err != nil {
					log.Fatal(err)
				}
				b, _ := json.Marshal("awesome")
				w.Write(b)
	}else{
		b, _ := json.Marshal("no")
		w.Write(b)
	}
}
func UpdateSetting(w http.ResponseWriter, req *http.Request)  {

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums updateSettingStrt
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	opts := options.Update().SetUpsert(true)
	filter := bson.D{{"email", ums.Email}}
		_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"theme": ums.Theme}}}, opts)
			if err != nil {
				log.Fatal(err)
			}
			_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"given_name": ums.Given_name}}}, opts)
				if err != nil {
					log.Fatal(err)
				}
				_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"about": ums.About}}}, opts)
					if err != nil {
						log.Fatal(err)
					}
					_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"picture": ums.Picture}}}, opts)
						if err != nil {
							log.Fatal(err)
						}
						b, _ := json.Marshal("ok")
						w.Write(b)
}
func Unfollow(w http.ResponseWriter, req *http.Request)  {
	//checking session
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	var fi []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
		log.Fatal(err)
	}

	uid := ui[0].ID.Hex()
//checking xhr
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums string
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	cursor, err = Users.Find(Ctx,bson.D{{"email", ums}})
	if err = cursor.All(Ctx, &fi); err != nil {
		log.Fatal(err)
	}
	fid := fi[0].ID.Hex()
	_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": ui[0].ID}, bson.D{{"$pull", bson.M{"followings": fid}}})
		if err != nil {
			log.Fatal(err)
		}

		_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": fi[0].ID}, bson.D{{"$pull", bson.M{"followers": uid}}})
			if err != nil {
				log.Fatal(err)
			}

}
func Follow(w http.ResponseWriter, req *http.Request)  {
	//checking session
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	var fi []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
		log.Fatal(err)
	}

	uid := ui[0].ID.Hex()
//checking xhr
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums string
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}

	cursor, err = Users.Find(Ctx,bson.D{{"email", ums}})
	if err = cursor.All(Ctx, &fi); err != nil {
		log.Fatal(err)
	}
	fid := fi[0].ID.Hex()

	if ui[0].Followings != nil {
		_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": ui[0].ID}, bson.D{{"$push", bson.M{"followings": fid}}})
			if err != nil {
				log.Fatal(err)
			}
	}else{
		var sarry []string
		sarry = append(sarry, fid)
		_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": ui[0].ID}, bson.D{{"$set", bson.M{"followings": sarry}}})
			if err != nil {
				log.Fatal(err)
			}
	}

	if fi[0].Followers != nil{
		_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": fi[0].ID}, bson.D{{"$push", bson.M{"followers": uid}}})
			if err != nil {
				log.Fatal(err)
			}
	}else{
		var sarry []string
		sarry = append(sarry, uid)
		_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": fi[0].ID}, bson.D{{"$set", bson.M{"followers": sarry}}})
			if err != nil {
				log.Fatal(err)
			}
	}

}
func getGoogleUserProfile(u GoogleUser, id string) GoogleUserProfile {
	var uds GoogleUserProfile

	uds.User1 = u

	var ui []GoogleUser
	Ctx := context.Background()
	rid, _ := primitive.ObjectIDFromHex(id)
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"_id", rid}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	uds.User2 = ui[0]

	if u.ID == ui[0].ID {
		uds.Same = true
		uds.Following = false;
	}else{
		uds.Same = false
		if contains(u.Followings, ui[0].ID.Hex()){
			uds.Following = true;
		}else{
			uds.Following = false;
		}
	}
	uds.Followings = len(ui[0].Followings)
	uds.Followers = len(ui[0].Followers)

	return uds
}
func getGoogleUserPfromL(u GoogleUser, id string) GoogleUserProfile {
	var uds GoogleUserProfile

	uds.User1 = u

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"ownedlicks", id}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	uds.User2 = ui[0]

	if u.ID == ui[0].ID {
		uds.Same = true
		uds.Following = false;
	}else{
		uds.Same = false
		if contains(u.Followings, ui[0].ID.Hex()){
			uds.Following = true;
		}else{
			uds.Following = false;
		}
	}
	uds.Followings = len(ui[0].Followings)
	uds.Followers = len(ui[0].Followers)

	return uds
}
func getGoogleUserPfromS(u GoogleUser, id string) GoogleUserProfile {
	var uds GoogleUserProfile

	uds.User1 = u

	var ui []GoogleUser
	Ctx := context.Background()
	rid, _ := primitive.ObjectIDFromHex(id)
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"ownedsheets", rid}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	uds.User2 = ui[0]

	if u.ID == ui[0].ID {
		uds.Same = true
		uds.Following = false;
	}else{
		uds.Same = false
		if contains(u.Followings, ui[0].ID.Hex()){
			uds.Following = true;
		}else{
			uds.Following = false;
		}
	}
	uds.Followings = len(ui[0].Followings)
	uds.Followers = len(ui[0].Followers)

	return uds
}
func getGoogleUserPfromE(u GoogleUser, id string) GoogleUserProfile {
	var uds GoogleUserProfile

	uds.User1 = u

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", id}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

	uds.User2 = ui[0]

	if u.ID == ui[0].ID {
		uds.Same = true
		uds.Following = false;
	}else{
		uds.Same = false
		if contains(u.Followings, ui[0].ID.Hex()){
			uds.Following = true;
		}else{
			uds.Following = false;
		}
	}
	uds.Followings = len(ui[0].Followings)
	uds.Followers = len(ui[0].Followers)

	return uds
}
func contains(slice []string, item string) bool {
    set := make(map[string]struct{}, len(slice))
    for _, s := range slice {
        set[s] = struct{}{}
    }

    _, ok := set[item]
    return ok
}
func GetSharedLicks(w http.ResponseWriter, req *http.Request)  {
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

 var l []licks

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums getpr
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	var ctx = context.Background()
	skip, _ := strconv.ParseInt(ums.Skip, 10, 32)
	limit := int64(7)
	opts := options.FindOptions{
		Sort: bson.D{{"date", -1}},
  	Skip: &skip,
  	Limit: &limit,
	}
	//findOptions := options.Find().SetSort(bson.D{{"date", -1}})
	cursor, err = Licks.Find(ctx, bson.M{"authorid": bson.M{"$in": ui[0].Followings}}, &opts)
	if err = cursor.All(ctx, &l); err != nil {
    log.Fatal(err)
	}
	var s = bson.M{"licks": l, "num": len(l)}
						b, _ := json.Marshal(s)
						w.Write(b)
}
func GetVisitLick(u GoogleUser, id string) (bson.M, string){
	var u2 []GoogleUser
	var l []licks
	lid, _ := primitive.ObjectIDFromHex(id)
	cursor, err := Users.Find(Ctx,bson.D{{"ownedlicks", lid}})
	if err = cursor.All(Ctx, &u2); err != nil {
		log.Fatal(err)
	}
	cursor, err = Licks.Find(Ctx,bson.D{{"_id", lid}})
	if err = cursor.All(Ctx, &l); err != nil {
		log.Fatal(err)
	}
	var dl bool
	if contains(u.Downloaded, l[0].ID.Hex()){
		dl = true
	}else{
		dl = false
	}
	if contains(u.Followings, u2[0].ID.Hex())&&
		contains(u2[0].Followers, u.ID.Hex()){
			rv := bson.M{
				"User1": u,
				"DpLick": l[0],
				"Downloaded": dl,
			}
			return rv, ""
	}else{
		rv := bson.M{
			"User1": nil,
			"DpLick": nil,
		}
		return rv, "hmm"
	}
}
func GetVisitSheet(u GoogleUser, id string) (bson.M, string){
	var u2 []GoogleUser
	var s []sheets
	var ls []licks
	var rls []licks
	var els licks
	sid, _ := primitive.ObjectIDFromHex(id)
	cursor, err := Users.Find(Ctx,bson.D{{"ownedsheets", sid}})
	if err = cursor.All(Ctx, &u2); err != nil {
		log.Fatal(err)
	}
	cursor, err = Sheets.Find(Ctx,bson.D{{"_id", sid}})
	if err = cursor.All(Ctx, &s); err != nil {
		log.Fatal(err)
	}

	if s[0].Data != nil {
		ad := &ls
		for _, sheetid := range s[0].Data {

			oid, _ := primitive.ObjectIDFromHex(sheetid)

			if oid != primitive.NilObjectID{
				cursor, err = Licks.Find(context.Background(), bson.M{"_id": oid})
				if err = cursor.All(Ctx, ad); err != nil {
					rls = append(rls, els)
				}else{
					rls = append(rls, ls[0])
				}
			}else{
				rls = append(rls, els)
			}
			*ad = nil
		}
	}
	var dl bool
	if contains(u.Downloaded, s[0].ID.Hex()){
		dl = true
	}else{
		dl = false
	}
	if contains(u.Followings, u2[0].ID.Hex())&&
		contains(u2[0].Followers, u.ID.Hex()){
			rv := bson.M{
				"User1": u,
				"DpSheet": s[0],
				"SortedLicks": rls,
				"Downloaded": dl,
			}
			return rv, ""
	}else{
		rv := bson.M{
			"User1": nil,
			"DpLick": nil,
		}
		return rv, "hmm"
	}
}
func Dlsl(w http.ResponseWriter, req *http.Request)  {
	//download shared licks
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

 var l []licks

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums string
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	lid, _ := primitive.ObjectIDFromHex(ums)
	cursor, err = Licks.Find(context.TODO(), bson.D{{"_id", lid}})
	if err = cursor.All(Ctx, &l); err != nil {
    log.Fatal(err)
	}

	aid, _  := primitive.ObjectIDFromHex(l[0].AuthorID)
	_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": aid},
					bson.D{{"$inc", bson.M{"dcountsW": 1, "dcounts": 1}}})
		if err != nil {
			log.Fatal(err)
		}

	l[0].Author = ui[0].Given_name
	l[0].AuthorID = ui[0].ID.Hex()
	l[0].AuthorImage = ui[0].Picture
	l[0].ID = primitive.NewObjectID()
	_, err = Licks.InsertOne(context.TODO(), l[0])
		if err != nil {
			log.Fatal(err)
		}

	 ui[0].OwnedLicks = append(ui[0].OwnedLicks, l[0].ID)
	_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": ui[0].ID},
					bson.D{{"$set", bson.M{"ownedlicks": ui[0].OwnedLicks}}})
		if err != nil {
			log.Fatal(err)
		}
		ui[0].Downloaded = append(ui[0].Downloaded, ums)
 	_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": ui[0].ID},
 					bson.D{{"$set", bson.M{"downloaded": ui[0].Downloaded}}})
 		if err != nil {
 			log.Fatal(err)
 		}

		b, _ := json.Marshal("ok")
		w.Write(b)
}
func Dlss(w http.ResponseWriter, req *http.Request)  {
	//download shared licks
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

 var s []sheets

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums string
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	sid, _ := primitive.ObjectIDFromHex(ums)
	cursor, err = Sheets.Find(context.TODO(), bson.D{{"_id", sid}})
	if err = cursor.All(Ctx, &s); err != nil {
    log.Fatal(err)
	}

	var ids []primitive.ObjectID
	for _, id := range s[0].Data {
		if id != "000000000000000000000000"{
			pid, _ := primitive.ObjectIDFromHex(id)
			ids = append(ids, pid)
		}
	}
	if len(ids) != 0{
		var ls []licks
		var ifs []interface{}
		cursor, err = Licks.Find(context.Background(), bson.M{"_id": bson.M{"$in": ids}})
		if err = cursor.All(context.TODO(), &ls); err != nil {
	    log.Fatal(err)
		}
		ii := 0
		for _, str := range s[0].Data {
			if str != "000000000000000000000000"{
				ls[ii].ID = primitive.NewObjectID()
				str = ls[ii].ID.Hex()
				ls[ii].Author = ui[0].Given_name
				ls[ii].AuthorID = ui[0].ID.Hex()
				ls[ii].AuthorImage = ui[0].Picture
				ls[ii].Downloaded = true
				ifs = append(ifs, interface{}(ls[ii]))
				ii++
			}
		}

		opts := options.InsertMany().SetOrdered(false)
		_, err = Licks.InsertMany(context.TODO(), ifs, opts)
		if err != nil {
			log.Fatal(err)
		}
	}


	s[0].Author = ui[0].Given_name
	s[0].AuthorID = ui[0].ID.Hex()
	s[0].AuthorImage = ui[0].Picture
	s[0].Downloaded = true
	s[0].ID = primitive.NewObjectID()
	_, err = Sheets.InsertOne(context.TODO(), s[0])
		if err != nil {
			log.Fatal(err)
		}


	 ui[0].OwnedSheets = append(ui[0].OwnedSheets, s[0].ID)
	_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": ui[0].ID},
					bson.D{{"$set", bson.M{"ownedsheets": ui[0].OwnedSheets}}})
		if err != nil {
			log.Fatal(err)
		}

		ui[0].Downloaded = append(ui[0].Downloaded, ums)
 	_, err = Users.UpdateOne(context.TODO(), bson.M{"_id": ui[0].ID},
 					bson.D{{"$set", bson.M{"downloaded": ui[0].Downloaded}}})
 		if err != nil {
 			log.Fatal(err)
 		}

		b, _ := json.Marshal("ok")
		w.Write(b)
}
func GetSharedSheets(w http.ResponseWriter, req *http.Request) {
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

 var l []licks

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums getpr
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	var ctx = context.Background()
	skip, _ := strconv.ParseInt(ums.Skip, 10, 32)
	limit := int64(7)
	opts := options.FindOptions{
		Sort: bson.D{{"date", -1}},
  	Skip: &skip,
  	Limit: &limit,
	}
	//findOptions := options.Find().SetSort(bson.D{{"date", -1}})
	cursor, err = Sheets.Find(ctx, bson.M{"authorid": bson.M{"$in": ui[0].Followings}}, &opts)
	if err = cursor.All(ctx, &l); err != nil {
    log.Fatal(err)
	}
	var s = bson.M{"licks": l, "num": len(l)}
						b, _ := json.Marshal(s)
						w.Write(b)
}
func GetUsersList(w http.ResponseWriter, req *http.Request) {
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	var ui []GoogleUser
	Ctx := context.Background()
	cursor, err := Users.Find(
	Ctx,
	bson.D{{"email", dbSessions[c.Value].un}},
	)
	if err = cursor.All(Ctx, &ui); err != nil {
    log.Fatal(err)
	}

 var us []users

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums getpr
	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	var ctx = context.Background()
	skip, _ := strconv.ParseInt(ums.Skip, 10, 32)
	limit := int64(10)
	opts := options.FindOptions{
		Sort: bson.D{{"followers", 1}},
  	Skip: &skip,
  	Limit: &limit,
	}
	fmt.Println(ums.Filter)
	var pl bson.D
	if ums.Filter != ""{
		pl = bson.D{
	    {"role", "user"},
	    {"$or", []interface{}{
	        bson.D{{"email", primitive.Regex{Pattern: ums.Filter, Options: "i"}}},
	        bson.D{{"given_name", primitive.Regex{Pattern: ums.Filter, Options: "i"}}},
	    }},
		}

		fmt.Println(pl)
	}else{
		pl = bson.D{{"role", "user"}}
	}

	//findOptions := options.Find().SetSort(bson.D{{"date", -1}})
	cursor, err = Users.Find(ctx, pl, &opts)
	if err = cursor.All(ctx, &us); err != nil {
    log.Fatal(err)
	}
	var s = bson.M{"users": us, "num": len(us)}
						b, _ := json.Marshal(s)
						w.Write(b)
}

func CallPayment(w http.ResponseWriter, req *http.Request)  {

	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}

	var ums payappreq
	var goodname string
	var price string

	err = json.Unmarshal(bs, &ums)
	if err != nil {
		fmt.Println(err)
	}
	if ums.Reqmode == "krw" {
		if ums.Goodname == "1" {
			goodname = "1개월 릭 & 악보 무제한 이용권"
			price = "2500"
		}else{
			goodname = "6개월 릭 & 악보 무제한 이용권"
			price = "14000"
		}
	}else{
		if ums.Goodname == "1" {
			goodname = "1 month of unlimited licks & sheets"
			return
		}else{
			goodname = "6 month of unlimited licks & sheets"
			price = "12.99"
		}
	}
	params := url.Values{}
	params.Add("cmd", `payrequest`)
	params.Add("userid", `seop0504`)
	params.Add("goodname", goodname)
	params.Add("price", price)
	params.Add("reqmode", ums.Reqmode)
	params.Add("vccode", ums.Vccode)
	params.Add("recvphone", ums.Recvphone)
	params.Add("smsuse", `y`)
	body := strings.NewReader(params.Encode())

	req, err = http.NewRequest("POST", "https://api.payapp.kr/oapi/apiLoad.html", body)
	if err != nil {
		// handle err
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		// handle err
	}
	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	    if err != nil {
	        // handle err
	     }
			 str := string(respBody)

			  m, _ := url.ParseQuery(str)
				if m["state"][0] == "1"{
					auth, _ := uuid.NewV4()

					_, err = Invoices.InsertOne(context.TODO(), bson.M{"mul_no": m["mul_no"][0], "email": ums.Email,"goodname":ums.Goodname, "authcode": auth.String(), "time": time.Now(), "state": false})
					if err != nil {
						log.Fatal(err)
					}

					b, _ := json.Marshal(m["mul_no"][0])
					w.Write(b)
				}else{
					b, _ := json.Marshal("err")
					w.Write(b)
				}
}
func GetSoketUser(u GoogleUserFull, id string) (soketuser) {
	var gu soketuser
	gu.Email = u.Email
	gu.Given_name = u.Given_name
	gu.ID = u.ID
	gu.Locale = u.Locale
	gu.Login = u.Login
	gu.Mul = id
	gu.Picture = u.Picture
	gu.Role = u.Role
	gu.Theme = u.Theme

	return gu
}
func Feedback(w http.ResponseWriter, req *http.Request) {
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	str := string(bs)
	m, _ := url.ParseQuery(str)
	var i []invoice
	var u []GoogleUser
	if m["linkkey"][0] == "kQa0xyJQj7vij2G6CT99r+1DPJnCCRVaOgT+oqg6zaM=" && m["userid"][0] == "seop0504"{
		if m["pay_state"][0] == "4" {
				Ctx := context.Background()
				cursor, err := Invoices.Find(Ctx, bson.M{"mul_no": m["mul_no"][0]})
				if err = cursor.All(Ctx, &i); err != nil {
			    log.Fatal(err)
				}
				cursor, err = Users.Find(Ctx, bson.M{"email": i[0].Email})
				if err = cursor.All(Ctx, &u); err != nil {
			    log.Fatal(err)
				}
				switch i[0].GoodName {
				case "1":
					if u[0].ProExp.After(time.Now()){
						u[0].ProExp = u[0].ProExp.AddDate(0, 1, 0)
					}else{
						u[0].ProExp = time.Now().AddDate(0, 1, 0)
					}
					u[0].Role = "Pro"
					break
				case "6":
					if u[0].ProExp.After(time.Now()){
						u[0].ProExp = u[0].ProExp.AddDate(0, 6, 0)
					}else{
						u[0].ProExp = time.Now().AddDate(0, 6, 0)
					}
					u[0].Role = "Pro"
					break
				}

				opts := options.Update().SetUpsert(true)
				filter := bson.D{{"email", i[0].Email}}
					_, err = Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"proexp": u[0].ProExp, "role": u[0].Role}}}, opts)
						if err != nil {
							log.Fatal(err)
						}
						_, err = Invoices.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"state": true, "time": time.Now()}}}, opts)
							if err != nil {
								log.Fatal(err)
							}
						b, _ := json.Marshal("ok")
						m := message{b, m["mul_no"][0]}
						h.broadcast <- m
		}
	}
}
func CheckPayment(w http.ResponseWriter, req *http.Request)  {
	bs, err := ioutil.ReadAll(req.Body)
	if err != nil {
		fmt.Println(err)
	}
	str := string(bs)
	var i []invoice
	Ctx := context.Background()
	cursor, err := Invoices.Find(Ctx, bson.M{"mul_no": str})
	if err = cursor.All(Ctx, &i); err != nil {
		log.Fatal(err)
	}
	if i[0].State {
		b, _ := json.Marshal("ok")
		w.Write(b)
	}else{
		b, _ := json.Marshal("err")
		w.Write(b)
	}
}
func GoproRedirect(w http.ResponseWriter, req *http.Request, u GoogleUser) string {
	c, err := req.Cookie("session")
	if err != nil {
		sID, _ := uuid.NewV4()
		c = &http.Cookie{
			Name:  "session",
			Value: sID.String(),
		}
	}
	c.MaxAge = sessionLength
	http.SetCookie(w, c)

	if u.Role != "Pro"{
		return "err"
	}
	today := time.Now()
	if !today.Before(u.ProExp){
		filter := bson.D{{"email", dbSessions[c.Value].un}}
		_, err := Users.UpdateOne(context.TODO(), filter, bson.D{{"$set", bson.M{"role": "user"}}}, options.Update().SetUpsert(true))
			if err != nil {
				log.Fatal(err)
			}
		return "err"
	}
	return "good"
}
func Logout(w http.ResponseWriter, req *http.Request) {
	if !AlreadyLoggedIn(w, req) {
		http.Redirect(w, req, "/", http.StatusSeeOther)
		return
	}
	c, _ := req.Cookie("session")
	// delete the session
	delete(dbSessions, c.Value)
	// remove the cookie
	c = &http.Cookie{
		Name:   "session",
		Value:  "",
		MaxAge: -1,
	}
	http.SetCookie(w, c)

	go cleanSessions()

	http.Redirect(w, req, "/", http.StatusSeeOther)
}
func cleanSessions() {
	for k, v := range dbSessions {
		if time.Now().Sub(v.lastActivity) > (time.Second * 1) {
			delete(dbSessions, k)
		}
	}
}
func mcon() (*mongo.Client, context.Context){
	Client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost"))
	if err != nil {
		log.Fatal(err)
	}
	Ctx := context.Background()
	err = Client.Connect(Ctx)
	if err != nil {
		log.Fatal(err)
	}
	err = Client.Ping(Ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	DB = Client.Database("Datas")
	Users = DB.Collection("users")
	Licks = DB.Collection("licks")
	Sheets = DB.Collection("sheets")
	Sessions = DB.Collection("session")
	Posts = DB.Collection("posts")
	Comments = DB.Collection("comments")
	Invoices = DB.Collection("invoices")
	return Client, Ctx
}
func CloseClientDB() {
    if cl == nil {
        return
    }

    err := cl.Disconnect(context.TODO())
    if err != nil {
        log.Fatal(err)
    }
}
