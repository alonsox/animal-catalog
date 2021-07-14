const { Schema, model } = require('mongoose');

// CLASS
const classSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

exports.Class = model('ClassModel', classSchema, 'classes');

// CONSERVATION STATUS
const conserStatusSchema = new Schema({
  name: { type: String },
  abbreviation: { type: String },
  description: { type: String },
});

exports.ConservationStatus = model(
  'ConservationStatusModel',
  conserStatusSchema,
  'con_statuses',
);

// FAMILY
const familySchema = new Schema({
  name: { type: String },
  description: { type: String },
});

// MODEL
exports.Family = model('FamilyModel', familySchema, 'families');

const animalSchema = new Schema({
  name: { type: String },
  scientificName: { type: String },
  description: { type: String },
  photoSrc: { type: String },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'ClassModel',
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: 'FamilyModel',
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: 'ConservationStatusModel',
  },
});

// MODEL
exports.Animal = model('AnimalModel', animalSchema, 'animals');
