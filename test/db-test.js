import { checkAvailable, getAllProducers, getMoviesByProducer, getAllCategories, getMoviesByCategory, deleteMovie, updateDesc, addRelation } from '../src/services/movies.js'
import { expect } from 'chai';
import knex from "../src/database";

describe('Test service functions', () => {
    beforeEach(async () => {
        // Seed data to jump start our tests
        await knex('users').truncate();
        await knex('users').insert([
            { id: 1, username: "byan", email: 'test@email.com', password: "testpass" },
        ]);
        await knex('movies').truncate();
        await knex('movies').insert([
            { id: 1, title: 'Tony Story 4', description: "When a new toy called \"Forky\" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.", created_by: 1},
            { id: 2, title: 'Avengers: End Game', description: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.", created_by: 1},
            { id: 3, title: 'Avengers: Infinity War', description: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.", created_by: 1},
            { id: 4, title: 'Avengers', description: "Earths mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.", created_by: 1},
            { id: 5, title: 'Terminator Genisys', description: "The year is 2029. John Connor, leader of the resistance continues the war against the machines. At the Los Angeles offensive, John's fears of the unknown future begin to emerge when TECOM spies reveal a new plot by SkyNet that will attack him from both fronts; past and future, and will ultimately change warfare forever.", created_by: 1},

        ]);
        exports.seed = async knex => {
            await knex('platform').truncate();
            await knex('platform').insert([
                { id: 1, service: 'Disney+'},
                { id: 2, service: 'Netflix'},
                { id: 3, service: 'Apple TV+'},
                { id: 4, service: 'Hulu'},
            ]);
        };
        exports.seed = async knex => {
            await knex('movies_platforms').truncate();
            await knex('movies_platforms').insert([
                { movie_id: 1, platform_id: 1},
                { movie_id: 2, platform_id: 1},
                { movie_id: 3, platform_id: 1},
                { movie_id: 4, platform_id: 1},
                { movie_id: 4, platform_id: 2},
                { movie_id: 5, platform_id: 2}
            ]);
        };
        exports.seed = async knex => {
            await knex('category').truncate();
            await knex('category').insert([
                { id: 1, name: 'Animation'},
                { id: 2, name: 'Sci-Fi'},
                { id: 3, name: 'Documentary'},
            ]);
        };
        exports.seed = async knex => {
            await knex('categories_movies').truncate();
            await knex('categories_movies').insert([
                { category_id : 2, movie_id: 5},
            ]);
        };
        exports.seed = async knex => {
            await knex('producer').truncate();
            await knex('producer').insert([
                { id: 1, name: 'Disney'},
                { id: 2, name: 'Netflix'},
                { id: 3, name: 'Sony'},
                { id: 4, name: 'Skydance'},
            ]);
        };
        exports.seed = async knex => {
            await knex('producers_movies').truncate();
            await knex('producers_movies').insert([
                { producer_id : 4, movie_id: 5},
            ]);
        };
    });

    // -----QUERY-----
    describe('check streaming platform by title', () => {
        it('gives a list of platform when given title', async () => {
            const result = await checkAvailable("Avengers");

            const list = [
                { title: 'Avengers', service: 'Disney+' },
                { title: 'Avengers', service: 'Netflix' }
            ];

            expect(result).to.eql(list);
        });

    });
    describe('get all producers', () => {
        it('gives a list of producers', async () => {
            const result = await getAllProducers();

            console.log(result);

            const list = [
                { name: 'Disney' },
                { name: 'Netflix' },
                { name: 'Sony' },
                { name: 'Skydance' }
            ];

            expect(result).to.eql(list);
        });

    });
    describe('Check all movies from a producer', () => {
        it('gives a list of movies when given production company', async () => {
            const result = await getMoviesByProducer("Skydance");

            const list = [ { title: 'Terminator Genisys' } ];

            expect(result).to.eql(list);
        });

    });
    describe('get all categories', () => {
        it('gives a list of categories', async () => {
            const result = await getAllCategories();
            console.log(result);
            const list = [ { name: 'Animation' }, { name: 'Sci-Fi' }, { name: 'Documentary' } ];
            expect(result).to.eql(list);
        });

    });

    describe('Check all movies from a category', () => {
        it('gives a list of movies when given category', async () => {
            const result = await getMoviesByCategory("Sci-Fi");
            const list = [ { title: 'Terminator Genisys' } ];
            expect(result).to.eql(list);
        });
    });

    // -----MUTATION-----



    // describe('get movie by id', () => {
    //     it('returns the title when id provided', async () => {
    //         const result = await getMovieById(1);
    //         expect(result).to.equal('Tony Story 4');
    //     });
    //
    //     it('returns undefined when invalid id provided', async () => {
    //         const result = await getMovieById(1000);
    //         expect(result).to.be.undefined;
    //     });
    // });
    //
    // describe('update movie description', () => {
    //     it('update description when given id', async () => {
    //
    //         const content = {"movie_id": 1, "desc": "This is new description"};
    //         await updateDesc(content);
    //
    //         const result = await knex('movies')
    //             .where('id', 1)
    //             .select('description');
    //
    //         // console.log(result[0]['description']);
    //         expect(result[0]['description']).to.equal('This is new description');
    //     });
    //
    //     it('returns error when description is null', async () => {
    //         let wasErrorThrown = false;
    //         const content = {"movie_id": 1, "desc": null};
    //         try {
    //             const result = await updateDesc(content);
    //         } catch (err) {
    //             wasErrorThrown = true;
    //         }
    //         expect(wasErrorThrown).to.be.true;
    //     });
    //     afterEach(async () => {
    //         await knex('movies')
    //             .update({"description": 'When a new toy called "Forky" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.'})
    //             .where('id', 1);
    //     })
    //
    // });

});

