const result = require('dotenv').config({ path: '.env'})
if (result.error) {
  console.log(result.error)
}

const { connect, connection } = require('mongoose');
const Definition = require('./models/definitions')
const db = {}

db.init = ()=>{
  connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  const db = connection;
  db.on('error', console.error.bind(console, '[mongodb] connection error:'));
  db.once('open', async ()=>{
    //We're connected
    console.log('\x1b[35m%s\x1b[0m', 'Status 200 => OK[mongoDB]');

    if (await Definition.countDocuments().exec() > 0) return

    Promise.all([
      Definition.create({ 
        title: "Mrazi",
        definition: "Snitch or enemy (warazi in plural)",
        category: "word",
        example_usage: "Warazi wote hapa mtaani watatii - All the snitches in the estate will suffer.",
        part_of_speech: "noun",
        rarity: "common",
        spelling_variations: null
      }),
      Definition.create({            
        title: "Nauwo",
        definition: "See/Watch",
        category: "word",
        example_usage: "Uli nauwo ile game ya wikendi = Did you watch the match on the weakend",
        part_of_speech: "verb",
        rarity: "common",
        spelling_variations: null, 
    }),
      Definition.create({            
        title: "Niko machingli",
        definition: "I'm rich",
        category: "idiom",
        example_usage: null,
        part_of_speech: null,
        rarity: "common",
        spelling_variations: null, 
      }),
      Definition.create({            
        title: "Buda / Mzing",
        definition: "Father",
        category: "word",
        example_usage: "Buda alinisort tenje - My Father gave me a phone",
        part_of_speech: "noun",
        rarity: "common",
        spelling_variations: null,
      }),
      Definition.create({            
        title: "Kubuya",
        definition: "To be afraid",
        category: "word",
        example_usage: "Walibuya after walicheki masanse - They became afraid on seeing the police",
        part_of_speech: "verb",
        rarity: "common",
        spelling_variations: null,
      }),
      Definition.create({
        title: "M-Chwa / M-Sape",
        definition: "M-pesa - A mobile money solution available in Kenya",
        category: "word",
        example_usage: "Nitumie ile doh kwa Msape - Send me the money you owe through Mpesa",
        part_of_speech: "noun",
        rarity: "common",
        spelling_variations: null,
      }),
      Definition.create({
        title: "Niko wire",
        definition: "I'm broke",
        category: "idiom",
        example_usage: "Niko wire, nitumie ile doh kwa Msape - I'm broke, send me the money you owe through Mpesa",
        part_of_speech: null,
        rarity: "rare",
        spelling_variations: null,
      })
  
    ]).then(() => console.log('Added Definitions'))
  });
}

module.exports = db