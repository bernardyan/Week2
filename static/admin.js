const deleteMov = async () => {
    const id = document.getElementById("delete_input").value;
    const statusView = document.getElementById("admin_action_status");

    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `mutation { deleteMovie (id: ${id}) { wasSuccessful } }`,
        }),
    });

    const json = await response.json();
    const { data, errors } = json;

    try {
        const wasSuccessful = data['deleteMovie']['wasSuccessful'];
        if (wasSuccessful === true) {
            statusView.innerHTML = `<p>Action succeeded</p>`;
        }

    } catch {
        statusView.innerHTML = `<p>Failed to perform action</p>`;
    }

};


const updateDesc = async() => {
    const movie_id = document.getElementById("movie_id").value;
    const desc = document.getElementById("movie_desc").value;
    const statusView = document.getElementById("admin_action_status");

    const content = {"movie_id": movie_id, "desc": desc};
    console.log("update description" + JSON.stringify(content));

    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `mutation { updateMovie(update: {id: ${movie_id}, description: "${desc}"}) { wasSuccessful } }`,
        }),
    });

    const json = await response.json();
    const { data, errors } = json;

    try {
        const wasSuccessful = data['updateMovie']['wasSuccessful'];
        if (wasSuccessful === true) {
            statusView.innerHTML = `<p>Action succeeded</p>`;
        }

    } catch {
        statusView.innerHTML = `<p>Failed to perform action</p>`;
    }
};



const insertPlatform = async() => {

    const movie_id = document.getElementById("movie_id_new").value;
    const platform_id = document.getElementById("platform_id").value;
    const statusView = document.getElementById("admin_action_status");

    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `mutation { addRelation(update: {movie: "${movie_id}", platform: "${platform_id}"}) { wasSuccessful } }`,
        }),
    });

    const json = await response.json();

    console.log(json);
    const { data, errors } = json;

    try {
        const wasSuccessful = data['addRelation']['wasSuccessful'];
        if (wasSuccessful === true) {
            statusView.innerHTML = `<p>Action succeeded</p>`;
        }

    } catch {
        statusView.innerHTML = `<p>Failed to perform action</p>`;
    }

};


const insertCategory = async() => {

    const movie_id = document.getElementById("movie_id_category").value;
    const category_id = document.getElementById("category_id").value;
    const statusView = document.getElementById("admin_action_status");

    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `mutation { addCategory(update: {movie: "${movie_id}", category: "${category_id}"}) { wasSuccessful } }`,
        }),
    });

    const json = await response.json();
    const { data, errors } = json;

    try {
        const wasSuccessful = data['addCategory']['wasSuccessful'];
        if (wasSuccessful === true) {
            statusView.innerHTML = `<p>Action succeeded</p>`;
        }

    } catch {
        statusView.innerHTML = `<p>Failed to perform action</p>`;
    }

};
