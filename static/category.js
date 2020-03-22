

const initCategoryView = async() => {

    const allCategoryView = document.getElementById('allCategoryView');


    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `query { getAllCategories { name } }`,
        }),
    });

    const json = await response.json();
    console.log(json);
    const { data, errors } = json;


    const producers = data['getAllCategories'];

    var content = "";

    if (producers.length > 0) {
        producers.forEach((item) => {
            const category = item['name'];
            content += `<p id="${category}" onclick="showCategoryMovie(this.id)"><u>${category}</u></p>`;
        });
    }

    console.log(content);
    allCategoryView.innerHTML = content;

};


const showCategoryMovie = async (category) => {

    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `query { getMoviesByCategory (name: "${category}") { title } }`,
        }),
    });

    const json = await response.json();
    console.log(json);
    const { data, errors } = json;
    const movies = data['getMoviesByCategory'];
    const movieInCategoryView = document.getElementById('movieInCategoryView');

    var content = "";
    if (movies.length > 0) {
        movies.forEach((item) => {
            const movie = item['title'];
            content += `<p>${movie}</p>`;
        });
    } else {
        content = `<p>No Movie Under this Category</p>`;
    }
    movieInCategoryView.innerHTML = content;
};


window.onload = async () => {

    await initCategoryView();


}

