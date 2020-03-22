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


const signup = async() => {

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `mutation { signup (user: {username: "${username}", email: "${email}", password: "${password}"}) { username } }`,
        }),
    });

    const json = await response.json();
    console.log(json);
    window.location.reload();

};

const login = async() => {

    const username = document.getElementById("login_username").value;
    const password = document.getElementById("login_password").value;
    const content = {"username": username, "email": email, "password": password};
    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `mutation { login (user: {username: "${username}", password: "${password}"}) { username } }`,
        }),
    });

    const json = await response.json();
    console.log(json);
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
    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `query { currentUser { username } }`,
        }),
    });

    const json = await response.json();
    const { data, errors } = json;

    try {
        // Yes, show username
        const currentUser = data['currentUser']['username'];
        console.log('found user session');
        login_user.textContent = `Welcome, ${currentUser}`;
        login_user.hidden = false;
    } catch {
        // No, give user to signup or login
        console.log('no user');
        signup_login.hidden = false;
    }

};