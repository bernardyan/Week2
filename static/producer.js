

const initProducerView = async() => {

    const allProducerView = document.getElementById('allProducerView');


    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `query { getAllProducers { name } }`,
        }),
    });

    const json = await response.json();
    console.log(json);
    const { data, errors } = json;


    const producers = data['getAllProducers'];

    var content = "";

    if (producers.length > 0) {
        producers.forEach((item) => {
            const producer = item['name'];
            content += `<p id="${producer}" onclick="showMovieByCompany(this.id)"><u>${producer}</u></p>`;
        });
    }

    console.log(content);
    allProducerView.innerHTML = content;

};


const showMovieByCompany = async (company) => {

    const response = await fetch('http://localhost:8000/api/graphql', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body:JSON.stringify({
            query: `query { getMoviesByProducer (name: "${company}") { title } }`,
        }),
    });

    const json = await response.json();
    console.log(json);
    const { data, errors } = json;
    const movies = data['getMoviesByProducer'];
    const movieByProducerView = document.getElementById('movieByProducerView');

    var content = "";
    if (movies.length > 0) {
        movies.forEach((item) => {
            const movie = item['title'];
            content += `<p>${movie}</p>`;
        });
    } else {
        content = `<p>No Movie Under this Company</p>`;
    }
    movieByProducerView.innerHTML = content;
};


window.onload = async () => {

    await initProducerView();

};