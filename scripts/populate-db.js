/* USAGE:
 *    populate-db <mongo_URI>
 */
const mongoose = require('mongoose');
const { families, classes, animals, statuses } = require('./info');
const {
  Animal,
  Class,
  Family,
  ConservationStatus,
} = require('./animal.models');

const DEBUG = true;
console.log('Starting DB Population...');

// CONNECT TO DB
if (!DEBUG) {
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  const mongoDB = userArgs[0];

  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  const db = mongoose.connection;

  db.on('error', () => {
    console.error('MongoDB connection error:');
  });

  db.on('connected', () => {
    console.log('Connected to DB succesfully :)');
  });
}

// ALL INSTANCES
const allconservationStatus = [];
const allfamilies = [];
const allclasses = [];
const allanimals = [];

////////////////////////////// CONSERVATION STATUS ////////////////////////////
async function createConservationStatus(statusData) {
  const status = new ConservationStatus(statusData);

  if (DEBUG) {
    console.log(`New conservation status: ${status}`);
    allconservationStatus.push(status);
    return;
  }

  await status.save();
  console.log(`New conservation status: ${status}`);
  allconservationStatus.push(status);
}

async function populateConservationStatus() {
  for (let i = 0; i < statuses.length; i++) {
    await createConservationStatus(statuses[i]);
  }
}

/////////////////////////////////// FAMILIES //////////////////////////////////
async function createFamily(familyData) {
  const family = new Family(familyData);

  if (DEBUG) {
    console.log(`New Family: ${family}`);
    allfamilies.push(family);
    return;
  }

  await family.save();
  console.log(`New Family: ${family}`);
  allfamilies.push(family);
}

async function populateFamilies() {
  for (let i = 0; i < families.length; i++) {
    await createFamily(families[i]);
  }
}

/////////////////////////////////// CLASSES ///////////////////////////////////
async function createClass(categoryData) {
  const newClass = new Class(categoryData);

  if (DEBUG) {
    console.log(`New category: ${newClass}`);
    allclasses.push(newClass);
    return;
  }

  await newClass.save();
  console.log(`New category: ${newClass}`);
  allclasses.push(newClass);
}

async function populateClasses() {
  for (let i = 0; i < classes.length; i++) {
    await createClass(classes[i]);
  }
}

/////////////////////////////////// ANIMALS ///////////////////////////////////
async function createAnimal(animalData) {
  const animal = new Animal(animalData);

  if (DEBUG) {
    console.log(`New animal: ${animal}`);
    allanimals.push(animal);
    return;
  }

  await animal.save();
  console.log(`New animal: ${animal}`);
  allanimals.push(animal);
}

async function populateAnimals() {
  const classByName = (name) => allclasses.find((c) => c.name === name);

  const familyByName = (name) => allfamilies.find((f) => f.name === name);

  const statusByAbbr = (abbr) =>
    allconservationStatus.find((s) => s.abbreviation === abbr);

  for (let i = 0; i < animals.length; i++) {
    await createAnimal({
      ...animals[i],
      class: classByName(animals[i].class)._id,
      family: familyByName(animals[i].family)._id,
      status: statusByAbbr(animals[i].status)._id,
    });
  }
}

///////////////////////////////// POPULATE DB /////////////////////////////////
(async function populateDB() {
  // I have to wrap this in an async IIFE so the order of execution is OK
  await populateClasses();
  await populateConservationStatus();
  await populateFamilies();
  await populateAnimals();
})();
