exports.seed = async knex => {
    await knex('movies').truncate();
    await knex('movies').insert([
        { id: 1, title: 'Tony Story 4', description: "When a new toy called \"Forky\" joins Woody and the gang, a road trip alongside old and new friends reveals how big the world can be for a toy.", created_by: 1},
        { id: 2, title: 'Avengers: End Game', description: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.", created_by: 1},
        { id: 3, title: 'Avengers: Infinity War', description: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.", created_by: 1},
        { id: 4, title: 'Avengers', description: "Earths mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.", created_by: 1},
        { id: 5, title: 'Terminator Genisys', description: "The year is 2029. John Connor, leader of the resistance continues the war against the machines. At the Los Angeles offensive, John's fears of the unknown future begin to emerge when TECOM spies reveal a new plot by SkyNet that will attack him from both fronts; past and future, and will ultimately change warfare forever.", created_by: 1},

    ]);
};


