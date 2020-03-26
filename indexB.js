const BASE_URL = "http://localhost:3000"
const USERS_URL = `${BASE_URL}/users`
const MATCHES_URL = `${BASE_URL}/matches`

document.addEventListener("DOMContentLoaded", () => {
    loginPage()

    // fetchUsers()
})

function fetchMutualMatches() {
    let main = document.getElementById("main-body")
    main.innerHTML = " "
    fetch(`${USERS_URL}/2/mutual`)
    .then(res => res.json())
    // .then(mutualArr => {
    //     mutualArr.filter(mutual => {
    //         // removed && mutual.gender != "female"
    //         return mutual.liker_id != 2
    //     }).forEach(mutualObj => renderMutualMatches(mutualObj))                         
    // })
// }
    .then(mutualArr => mutualArr.forEach(mutualObj => {
        console.log(mutualObj)
        renderMutualMatches(mutualObj)

    }))
}
    // .then(mutualMatches => console.log(mutualMatches)
    // )


function renderMutualMatches(mutualObj) {
    // let main = document.getElementById("main-body")
    // main.innerHTML = " "

    let div = document.createElement('div')
    div.classList.add('card')
    div.dataset.id = mutualObj.id
    
    
    let name = document.createElement('p')
    name.innerText = mutualObj.liker.name
    
    let age = document.createElement('p')
    age.innerText = mutualObj.liker.age

    let matchImg = document.createElement('img')
    matchImg.src = mutualObj.liker.picture

    let likeBtn = document.createElement('button')
    likeBtn.dataset.matchId = mutualObj.id
    likeBtn.innerHTML = "Like"
    // likeBtn.addEventListener('click', console.log("accept")
    // )
    likeBtn.addEventListener('click', (e) => {
        // acceptMatch(e) 
        console.log('mutual')
        // debugger
    })

    let dislikeBtn = document.createElement('button')
    dislikeBtn.dataset.matchId = mutualObj.id
    dislikeBtn.innerHTML = "Unmatch"
    dislikeBtn.addEventListener('click', (e) => {
        declineMatch(e) 
        let card = e.currentTarget.parentElement
        return card.remove()
    })
  
    div.append(name, age, matchImg, dislikeBtn)
    getMain().appendChild(div)
}


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
        event.preventDefault()
        login.innerHTML= " "
        console.log("login")
        fetchUsers()
        let btn = document.getElementById('see-pending-matches')
        btn.addEventListener("click", () => {
            // let login = document.getElementById('login')
            // login.innerHTML = " "
            fetchPendingMatches()
        })
    
        let messagesBtn = document.getElementById('inbox')
        messagesBtn.addEventListener("click", () => {
            fetchMutualMatches()
        })
        // messagesBtn.addEventListener("click", console.log("messages")
        
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
    .then(pendingsArray => {
        pendingsArray.filter(pending => {
            // removed && pending.gender != "female"
            return pending.approval != true
        }).forEach(pendingObj => renderPendingMatches(pendingObj))
    })



    // .then(pendingArr => pendingArr.forEach(pendingObj => {

    //     renderPendingMatches(pendingObj)
    
    // }))
}

function renderPendingMatches(pendingObj) {
    // let main = document.getElementById("main-body")
    // main.innerHTML = " "

    let div = document.createElement('div')
    div.classList.add('card')
    div.dataset.id = pendingObj.id
    
    
    let name = document.createElement('p')
    name.innerText = pendingObj.liker.name
    
    let age = document.createElement('p')
    age.innerText = pendingObj.liker.age

    let matchImg = document.createElement('img')
    matchImg.src = pendingObj.liker.picture

    let likeBtn = document.createElement('button')
    likeBtn.dataset.matchId = pendingObj.id
    likeBtn.innerHTML = "Like"
    // likeBtn.addEventListener('click', console.log("accept")
    // )
    likeBtn.addEventListener('click', (e) => {
        acceptMatch(e) 
        let card = e.currentTarget.parentElement
        return card.remove()
    })

    // likeBtn.addEventListener('click', (e) => {
    //     acceptMatch(e) 
    // })

    let dislikeBtn = document.createElement('button')
    dislikeBtn.dataset.matchId = pendingObj.id
    dislikeBtn.innerHTML = "Dislike"
    // dislikeBtn.addEventListener('click', console.log("decline"))
    dislikeBtn.addEventListener('click', (e) => {
        declineMatch(e) 
        // debugger
    })
  
    div.append(name, age, matchImg, likeBtn, dislikeBtn)
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
    
    let age = document.createElement('p')
    age.innerText = userObj.age

    let userImg = document.createElement('img')
    userImg.src = userObj.picture

    let likeBtn = document.createElement('button')
    likeBtn.dataset.userId = userObj.id
    likeBtn.innerHTML = "Like"
    likeBtn.addEventListener('click', (e) => {
        likeUser(e) 
        let card = e.currentTarget.parentElement
        return card.remove()
    })

    let dislikeBtn = document.createElement('button')
    dislikeBtn.dataset.userId = userObj.id
    dislikeBtn.innerHTML = "Dislike"
    dislikeBtn.addEventListener('click', (e) => {
        dislikeUser(e) //removed userObj
        let card = e.currentTarget.parentElement
        return card.remove()
    })
    
   
  
    div.append(name, age, userImg, likeBtn, dislikeBtn)
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

    // debugger
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
//         age: userObj.age,
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


