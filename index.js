const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const MATCHES_URL = `${BASE_URL}/matches`

document.addEventListener("DOMContentLoaded", () => {
    fetchUsers()
    let btn = document.getElementById('see-pending-matches')
    btn.addEventListener("click", () => {
        fetchPendingMatches()
    })
})

function fetchPendingMatches() {
    // let btn = document.getElementById('see-pending-matches')
    fetch(`${USERS_URL}/2/matches`)
    .then(res => res.json())
    .then(pendingArr => pendingArr.forEach(pendingObj => {
        renderPendingMatches(pendingObj)
    // .then(pendingArr => pendingArr.forEach(pending => {
    //     console.log(pending)
    }))
}

function renderPendingMatches(pendingObj) {
    
}

function fetchUsers() {
    fetch(USERS_URL)
        .then(res => res.json())
        .then(usersArray => {
            usersArray.filter(user => {
                return user.id != 2 && user.gender != "female"
            }).forEach(userObj => renderUser(userObj)) //change to
                                                          //userObj => renderUser(userObj)
        })
        // .then(json => console.log(json))
}

function renderUser(userObj) {
    let div = document.createElement('div')
    div.classList.add('card')
    div.dataset.id = userObj.id
    
    let name = document.createElement('p')
    name.innerText = userObj.name
    
    let dob = document.createElement('p')
    dob.innerText = userObj.dob

    let userImg = document.createElement('img')
    userImg.src = userObj.picture

    let likeBtn = document.createElement('button')
    likeBtn.dataset.userId = userObj.id
    likeBtn.innerHTML = "Like"
    likeBtn.addEventListener('click', (e) => {
        likeUser(e) //removed userObj
    })

    let dislikeBtn = document.createElement('button')
    dislikeBtn.dataset.userId = userObj.id
    dislikeBtn.innerHTML = "Dislike"
    dislikeBtn.addEventListener('click', dislikeUser)
  
    div.append(name, dob, userImg, likeBtn, dislikeBtn)
    getMain().appendChild(div)

}
    

// function likeUser(event) {
//     console.log("like")
// }

function dislikeUser(event) {
    console.log("dislike")
}
// might have to hard code liked instead of liker since in match
// controller i have liked_id = 2
function likeUser(e) {
    // debugger
    let match = {
        'liker_id': 2,
        'liked_id': e.currentTarget.dataset.userId
    }
    // debugger
    fetch("http://localhost:3000/matches", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(match)
    }).then(res => res.json())
    .then(result => console.log(result))
}


// function createUser(userObj) {
//     let id = event.currentTarget.dataset.id
//     let userObjInfo = {
//         name: userObj.name,
//         dob: userObj.dob,
//         picture: userObj.picture,
//         id: id
//     }
//     return fetch("http://localhost:3000/watchlists", { 
//         method: "POST", 
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(userObjInfo)
//     }).then(response => response.json()).then(data => console.log(data))
// }



function getMain() {
    let main = document.getElementById("main-body")
    return main
  }