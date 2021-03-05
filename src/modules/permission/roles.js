export const listRoles = ['new', 'verified', 'impersonate'];

const base = [
  'base.create.own',
  'base.get.own',
  'base.search.own',
  'base.update.own',
  'base.delete.own',
];

const question = [
  'question.create.own',
  'question.get.own',
  'question.search.own',
  'question.update.own',
  'question.delete.own',
];

const answer = [
  'answer.create.own',
  'answer.get.own',
  'answer.search.own',
  'answer.update.own',
  'answer.delete.own',
];

const practice = [
  'practice.create.own',
  'practice.get.own',
  'practice.search.own',
  'practice.update.own',
  'practice.delete.own',
];

const roles = {
  new: ['user.auth'],

  verified: ['user.auth', ...base, ...question, ...answer, ...practice],

  admin: [
    // USER
    'user.auth',
    'user.get.all',
    'user.delete.any',
    'user.update.any',
    'user.search',
    'user.impersonate',
    'user.stats',

    // EXAMPLE
    ...base,
  ],

  // impersonate: [
  //   // USER
  //   'user.search',
  //   'user.impersonate',
  //   'user.stats',
  // ],
};

export default roles;
