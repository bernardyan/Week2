import {getMovieById, getMovieCount, deleteMovie, addRelation, checkAvailable, updateDesc} from '../src/services/movies.js'
import { expect } from 'chai';
import knex from "../src/database";


describe('Test service functions', () => {

    beforeEach(async () => {
        // Seed data
        await knex('movies').insert([
            {
                title: 'Tony Story 4',
                description: 'When a new toy called "Forky" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.',
                created_by: 1
            },

            {
                title: 'Avengers: End Game',
                description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
                created_by: 1
            },

            {
                title: 'Avengers: Infinity War',
                description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
                created_by: 1
            },

            {
                title: 'Avengers',
                description: 'Earths mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
                created_by: 1
            },

        ]);
    });

    describe('get movie by id', () => {
        it('returns the title when id provided', async () => {
            const result = await getMovieById(1);
            expect(result).to.equal('Tony Story 4');
        });

        it('returns undefined when invalid id provided', async () => {
            const result = await getMovieById(1000);
            expect(result).to.be.undefined;
        });
    });

    describe('update movie description', () => {
        it('update description when given id', async () => {

            const content = {"movie_id": 1, "desc": "This is new description"};
            await updateDesc(content);

            const result = await knex('movies')
                .where('id', 1)
                .select('description');

            // console.log(result[0]['description']);
            expect(result[0]['description']).to.equal('This is new description');
        });

        it('returns error when description is null', async () => {
            let wasErrorThrown = false;
            const content = {"movie_id": 1, "desc": null};
            try {
                const result = await updateDesc(content);
            } catch (err) {
                wasErrorThrown = true;
            }
            expect(wasErrorThrown).to.be.true;
        });
        afterEach(async () => {
            await knex('movies')
                .update({"description": 'When a new toy called "Forky" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.'})
                .where('id', 1);
        })

    });

});

