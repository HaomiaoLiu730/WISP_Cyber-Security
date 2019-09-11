/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import Questionnaires from './admins';

// console.log(Questionnaires.find(
//   { questions: { $elemMatch: { QID: 1 } } },
// ).fetch());

export default {
  Query: {
    QN: () => Questionnaires.find({}).fetch(),
  },

  Answer: {
    __resolveType(obj, context, info) {
      if (obj.type === 'Text') {
        return 'Text';
      }
      if (obj.type === 'MCQ') {
        return 'MCQ';
      }
      return null;
    },
  },

  Mutation: {

    createQN(obj, { questions }, context) {
      const QNID = Questionnaires.insert({
        questions,
      });
    },

    deleteQN(obj, { id }, context) {
      const QNID = Questionnaires.remove({
        _id: id,
      });
    },

    updateQuestion(obj, {
      id, title, section, question,
    }, context) {
      if (title || section) {
        console.log(title);
        const QNID = Questionnaires.update(
          { _id: id },
          { $pull: { questions: { title, section } } },
        );
      }
      if (question) {
        console.log('Here as well');
        const QNID2 = Questionnaires.update(
          { _id: id },
          { $push: { questions: question } },
        );
      }
    },
  },
};
