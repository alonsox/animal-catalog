exports.statuses = [
  {
    name: 'extinct',
    abbreviation: 'EX',
    description: 'No known living individuals',
  },
  {
    name: 'extinct in the wild',
    abbreviation: 'EW',
    description:
      'Known only to survive in captivity, or as a naturalized population outside its historic range',
  },
  {
    name: 'critically endangered',
    abbreviation: 'CR',
    description: 'Extremely high risk of extinction in the wild',
  },
  {
    name: 'endangered',
    abbreviation: 'EN',
    description: 'High risk of extinction in the wild',
  },
  {
    name: 'vulnerable',
    abbreviation: 'VU',
    description: 'High risk of endangerment in the wild',
  },
  {
    name: 'near threatened',
    abbreviation: 'NT',
    description: 'Likely to become endangered in the near future',
  },
  {
    name: 'least concern',
    abbreviation: 'LC',
    description:
      'Lowest risk, that is, does not qualify for a higher risk category. Widespread and abundant taxa are included in this category',
  },
  {
    name: 'data deficient',
    abbreviation: 'DD',
    description:
      'Not enough data to make an assessment of its risk of extinction',
  },
  {
    name: 'not evaluated',
    abbreviation: 'NE',
    description: 'Has not yet been evaluated against the criteria',
  },
];

exports.families = [
  {
    name: 'felinae',
    description:
      'This subfamily comprises the small cats having a bony hyoid, because of which they are able to purr but not roar.',
  },
  {
    name: 'canidae',
    description:
      'Is a biological family of dog-like carnivorans. A member of this family is called a canid.',
  },
  {
    name: 'crocodylidae',
    description:
      'Crocodiles (family Crocodylidae) or true crocodiles are large semiaquatic reptiles that live throughout the tropics in Africa, Asia, the Americas and Australia. The term crocodile is sometimes used even more loosely to include all extant members of the order Crocodilia, which includes the alligators and caimans (family Alligatoridae), the gharial and false gharial (family Gavialidae), and all other living and fossil Crocodylomorpha.',
  },
];

exports.classes = [
  {
    name: 'mammalia',
    description:
      'A group of vertebrate animals constituting the class Mammalia',
  },
  {
    name: 'reptilia',
    description:
      "Tetrapod animals in the class Reptilia, comprising today's turtles, crocodilians, snakes, amphisbaenians, lizards, tuatara, and their extinct relatives. ",
  },
];

exports.animals = [
  {
    name: 'puma',
    scientificName: 'puma concolor',
    description: 'A large cat native to the Americas',
    class: 'mammalia',
    family: 'felinae',
    status: 'LC',
  },
  {
    name: 'jaguar',
    scientificName: 'panthera onca',
    description:
      'The jaguar (Panthera onca) is a large felid species and the only extant member of the genus Panthera native to the Americas.',
    class: 'mammalia',
    family: 'felinae',
    status: 'NT',
  },
  {
    name: 'Dog',
    scientificName: 'canis familiaris',
    description:
      "The domestic dog (Canis familiaris or Canis lupus familiaris) is a domesticated descendant of the wolf. The dog derived from an ancient, extinct wolf, and the modern grey wolf is the dog's nearest living relative",
    class: 'mammalia',
    family: 'canidae',
    status: 'LC',
  },

  {
    name: 'nile crocodile',
    scientificName: 'crocodylus niloticus',
    description:
      'The Nile crocodile (Crocodylus niloticus) is a large crocodilian native to freshwater habitats in Africa, where it is present in 26 countries. Due to its widespread occurrence and stable population trend, it has been listed as Least Concern on the IUCN Red List since 1996.',
    class: 'reptilia',
    family: 'crocodylidae',
    status: 'LC',
  },
];
