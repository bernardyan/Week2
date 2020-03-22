const checkAvailable = async() => {

    const movie_title = document.getElementById("title").value;

    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `query { getMoviePlatform (name: "${movie_title}") { service } }`,
        }),
    });

    const json = await response.json();
    // console.log(json);
    const { data, errors } = json;
    const platforms = data['getMoviePlatform'];
    const detailView = document.getElementById("detailView");

    var content = "";
    // We do have streaming service available
    if (platforms.length > 0) {
        platforms.forEach((item) => {
            const service = item['service'];
            content += `<p>${service}</p>`;
        });
    } else {
        content += `<p>Not available in our DB</p>`;
    }
    detailView.innerHTML = content;

};




// const count = async () => {
//     const count = await fetch('/api/count');
//     const result = await response.json(count);
//     alert(`Our awesome website is currently tracking ` + result['count'] + ` movies`);
// };
//
//
// const deleteMov = async () => {
//     const id = document.getElementById("delete_input").value;
//     const response = await fetch('/api/delete/' + id);
//     const result = await response.json(); // result contains more useful metadata
//     alert(result);
// };
//
//
// const insertPlatform = async() => {
//
//     const movie_id = document.getElementById("movie_id_new").value;
//     const platform_id = document.getElementById("platform_id").value;
//
//     const relation = {"movie_id": movie_id, "platform_id": platform_id};
//     console.log("insert pltform" + JSON.stringify(relation));
//
//     const response = await fetch('/api/addRelation', {
//         headers: { 'Content-Type': 'application/json' },
//         method: 'POST',
//         body: JSON.stringify(relation)
//     });
//
//     console.log(response.json()); // response is ok, but how do I read json data?
//
//     if (response.ok) alert("Data inserted successfully");
// };




const updateDesc = async() => {

    const movie_id = document.getElementById("movie_id").value;
    const desc = document.getElementById("movie_desc").value;

    const content = {"movie_id": movie_id, "desc": desc};
    console.log("update description" + JSON.stringify(content));

    const response = await fetch('/api/updateDesc', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(content)
    });
};

const signup = async() => {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const content = {"username": username, "email": email, "password": password};
    console.log("sign up" + JSON.stringify(content));

    const response = await fetch('/api/user', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(content)
    });

    window.location.reload();

    console.log(response);
};

const login = async() => {

    const username = document.getElementById("login_username").value;
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    const content = {"username": username, "email": email, "password": password};
    console.log("login" + JSON.stringify(content));

    const response = await fetch('/api/login', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(content)
    });

    console.log(response);

    window.location.reload();

};


const showSignup = () => {

    const loginBox = document.getElementById('loginBox');
    loginBox.hidden = true;

    const signupBox = document.getElementById('signupBox');
    signupBox.hidden = false;

};

const showLogin = () => {

    const signupBox = document.getElementById('signupBox');
    signupBox.hidden = true;

    const loginBox = document.getElementById('loginBox');
    loginBox.hidden = false;

};


window.onload = async () => {



    // To start, assume init state
    const loginBox = document.getElementById('loginBox');
    loginBox.hidden = true;

    const signupBox = document.getElementById('signupBox');
    signupBox.hidden = true;

    const login_user = document.getElementById('login_user');
    login_user.hidden = true;

    const signup_login = document.getElementById('signup_login');
    signup_login.hidden = true;

    // do we have user session?
    const response = await fetch('/api/currentUser', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    });

    const json = await response.json();
    const { username, errors } = json;

    console.log(username);

    // Yes, show username
    if (username) {
        console.log('found user session');
        login_user.textContent = `Welcome, ${username}`;
        login_user.hidden = false;

    } else {
        // No, give user to signup or login
        console.log('no user');
        signup_login.hidden = false;
    }

};