const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const MATCHES_URL = `${BASE_URL}/matches`

document.addEventListener("DOMContentLoaded", () => {
    // loginPage()

    fetchUsers()
    let btn = document.getElementById('see-pending-matches')
    btn.addEventListener("click", () => {
        // let login = document.getElementById('login')
        // login.innerHTML = " "
        fetchPendingMatches()
    })

    let messagesBtn = document.getElementById('inbox')
    messagesBtn.addEventListener("click", console.log("messages")
    )
})


function loginPage() {
    let login = document.getElementById('login')
    let h1 = document.createElement("h1")
    h1.innerText = "Login"

    let form = document.createElement("form")
    form.classList = "login_form"

    let input = document.createElement("input")
    input.placeholder = "email"

    // let submit = document.createElement("input")
    // submit.type = "submit"

    let loginBtn = document.createElement('button')
    // loginBtn.dataset.matchId = pendingObj.id
    loginBtn.innerHTML = "Login"
    loginBtn.addEventListener('click', () => {
        console.log("login")
        // debugger
    })
    form.append(input, loginBtn)
    login.append(h1, form)

}

function fetchPendingMatches() {
    // let btn = document.getElementById('see-pending-matches')
    let main = document.getElementById("main-body")
    main.innerHTML = " "
    fetch(`${USERS_URL}/2/matches`)
    .then(res => res.json())
    .then(pendingArr => pendingArr.forEach(pendingObj => {
        console.log(pendingObj)
        renderPendingMatches(pendingObj)
        // debugger
    // .then(pendingArr => pendingArr.forEach(pending => {
    //     console.log(pending)
    }))
}

function renderPendingMatches(pendingObj) {
    // let main = document.getElementById("main-body")
    // main.innerHTML = " "

    let div = document.createElement('div')
    div.classList.add('card')
    div.dataset.id = pendingObj.id
    
    
    let name = document.createElement('p')
    name.innerText = pendingObj.liker.name
    
    let dob = document.createElement('p')
    dob.innerText = pendingObj.liker.dob

    let matchImg = document.createElement('img')
    matchImg.src = pendingObj.liker.picture

    let likeBtn = document.createElement('button')
    likeBtn.dataset.matchId = pendingObj.id
    likeBtn.innerHTML = "Like"
    // likeBtn.addEventListener('click', console.log("accept")
    // )
    likeBtn.addEventListener('click', (e) => {
        acceptMatch(e) 
        // debugger
    })

    let dislikeBtn = document.createElement('button')
    dislikeBtn.dataset.matchId = pendingObj.id
    dislikeBtn.innerHTML = "Dislike"
    // dislikeBtn.addEventListener('click', console.log("decline"))
    dislikeBtn.addEventListener('click', (e) => {
        declineMatch(e) 
        // debugger
    })
  
    div.append(name, dob, matchImg, likeBtn, dislikeBtn)
    getMain().appendChild(div)
}

function fetchUsers() {
    fetch(USERS_URL)
        .then(res => res.json())
        .then(usersArray => {
            usersArray.filter(user => {
                // removed && user.gender != "female"
                return user.id != 2
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
        // 'liker_id': 2,
        // 'liked_id': e.currentTarget.dataset.userId
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

function acceptMatch(e) {
    // debugger

    let matchId = e.currentTarget.parentElement.dataset.id
    fetch(`${MATCHES_URL}/${matchId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'approval': true
        })
    })
    
    // let match = {
        


    // }

}

function declineMatch(e) {
    let matchId = e.currentTarget.parentElement.dataset.id
    let match = event.currentTarget.parentElement

    debugger
    fetch(`${MATCHES_URL}/${matchId}`, {
        method: 'DELETE'
    })
    match.remove()
        // headers: {
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify({
            // 'liker_id': , 'liked_id': 2
        // })
  
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


