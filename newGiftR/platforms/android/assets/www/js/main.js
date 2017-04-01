"use strict";
if (document.deviceready) {
    document.addEventlistener('deviceready', OnDeviceReady);
} else {
    document.addEventListener('DOMContentLoaded', OnDeviceReady)
}

let mykey = "saik0116";
let contactArray = [];
var personid;
let person;





//document.addEventListener("deviceready", OnDeviceReady);
//document.addEventListener('DOMContentLoaded', OnDeviceReady);
function OnDeviceReady() {

    var ls = localStorage.getItem(mykey);
    if (!ls) {
        var listofppl = {
            "people": [
                {
                    "id": 827381263882763,
                    "name": "Jeff Bridges",
                    "dob": "1960-05-23",
                    "ideas": [
                        {
                            "idea": "White Russian",
                            "at": "LCBO",
                            "cost": "",
                            "url": "http://lcbo.com/"
                        },
                        {
                            "idea": "new Sweater",
                            "at": "Value Village",
                            "cost": "20.00",
                            "url": ""
                        }
  ]
                },
                {
                    "id": 19283719282833,
                    "name": "Walter Sobchak",
                    "dob": "1961-12-12",
                    "ideas": [
                        {
                            "idea": "new briefcase",
                            "at": "Staples",
                            "cost": "50.00",
                            "url": ""
                        }
  ]
                }
]
        }

        contactArray[0] = listofppl.people[0];
        contactArray[1] = listofppl.people[1];
    } else {
        contactArray = JSON.parse(ls);
    }


    console.log(contactArray);
    localStorage.setItem(mykey, JSON.stringify(contactArray));

    //    var list = document.getElementById("contact-list");

    for (var i = 0; i < contactArray.length; i++) {
        let person = contactArray[i];
        makeListItem(person);

    }
    personPageEvent();
    //saveGifts();
    //    backButton();
    window.addEventListener('push', pushEvent);
}

function pushEvent() {
    var content = document.querySelector(".content");
    if (content.id == "contacts") {
        personPageEvent();

        for (var i = 0; i < contactArray.length; i++) {
            let person = contactArray[i];
            makeListItem(person);

        }
    } else {
        let save = document.getElementById("saveG");
        save.addEventListener("click", saveIdea);
        makeGiftList();
    }
}


function personPageEvent() {

    // Event listener

    //FROM
    let save = document.getElementById("save");
    save.addEventListener("click", addContact);


    let cancel = document.getElementById("cancel");
    cancel.addEventListener("touchend", function (event) {
        event.preventDefault()
            //    let clickEvent = new CustomEvent("touchend");
            //       let x = document.querySelector("a.pull-right.icon-close");
            //    x.dispatchEvent(clickEvent);

        let modal = document.getElementById("personModal");

        modal.classList.remove("active");

    });




}


function makeListItem(person) {

    var list = document.getElementById("contact-list");
    var entry = document.createElement("li");
    entry.className = "table-view-cell";

    // entry.innerHTML = person.name + " " + person.dob;

    let test = list.appendChild(entry);



    entry.innerHTML = person.name + '<a class="navigate-right pull-right" href="gifts.html">' + person.dob + '</a>';
    let anchor = entry.querySelector('a');
    anchor.setAttribute('personid', person.id);
    anchor.addEventListener('touchstart', function (ev) {
        personid = ev.currentTarget.getAttribute('personid');
    });

}

function makeGiftList() {
    console.log("giftw list", personid);


    var list = document.getElementById("gift-list");
    list.innerHTML = "";
    //if(person.id == personid){
    //    makeGiftList(person.ideas);
    //}
    let person = null;
    //   
    for (var i = 0; i < contactArray.length; i++) {
        //         if(contactArray[i].id == personid){
        //             console.log("Found it" + personid);
        person = contactArray[i];
        //         }
        for (let idea of person.ideas) {
            let li = document.createElement("li");
            li.classList.add("table-view-cell", "media");

            let span = document.createElement("span");
            span.classList.add("pull-right", "icon", "icon-trash", "midline");
            
                    

            let div = document.createElement("div");

            Object.keys(idea).forEach(function (key) {
                let value = idea[key];
                console.log("Key: " + key + "," + "value: " + value);
                if (key === "idea") {
                    div.classList.add("media-body");
                    div.textContent = value;
                } else {
                    let p = document.createElement("p");
                    if (key == "url" && value.length != 0) {
                        let aurl = document.createElement("a");
                        aurl.href = value;
                        aurl.textContent = value;
                        p.appendChild(aurl);
                    } else {
                        p.textContent = value;
                    }
                    div.appendChild(p);
                }
            });

            li.appendChild(span);
            li.appendChild(div);
            list.appendChild(li);
        }

    }
    //
    //    

    //
    //    var li = document.createElement("li");
    //    li.className = "table-view-cell";
    //    var c = document.getElementById("cost").value;
    //    var s = document.getElementById("store").value;
    //    var G = document.getElementById("Gidea").value;
    //    var u = document.getElementById("url").value;
    //
    //    list.appendChild(li);
    //
    //    li.innerHTML = cost + store + Gidea + url;
    //
    //    let idea = {
    //        idea: G,
    //        cost: c,
    //        url: u,
    //        store: s
    //    }
    //
    //    person.ideas.push(idea);
}




function addContact() {

    var namez = document.getElementById("namez").value;
    var dob = document.getElementById("dob").value;





    //    var m = moment(dt);
    //    let mm = m.format("LL") );
    //    

    let p = {
        id: Date.now(),
        name: namez,
        dob: dob,
        ideas: []
    }

    makeListItem(p);

    contactArray.push(p);
    console.log(contactArray);

    localStorage.setItem(mykey, JSON.stringify(contactArray));

    let modal = document.getElementById("personModal");
    modal.classList.remove("active");

}

function saveIdea() {

    var list = document.getElementById("gift-list");

    var c = document.getElementById("cost").value;
    var s = document.getElementById("store").value;
    var G = document.getElementById("Gidea").value;
    var u = document.getElementById("url").value;

    let idea = {
        idea: G,
        cost: c,
        url: u,
        store: s
    }

    for (var i = 0; i < contactArray.length; i++) {
        if (contactArray[i].id == personid) {
            console.log("Found it" + personid);
            contactArray[i].ideas.push(idea);
            localStorage.setItem(mykey, JSON.stringify(contactArray));
            break;
        }
    }
    makeGiftList();
    let modal = document.getElementById("giftModal");
    modal.classList.remove("active");
}