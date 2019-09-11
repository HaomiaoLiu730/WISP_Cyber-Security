/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import Solutions from './customer';

export default {
  Query: {
    solutions(obj, { id }, context) {
      return Solutions.find({ templateID: id }).fetch();
    },
  },

  Mutation: {

    sendAnswers(obj, { templateID, answers }, context) {
      const answer = Solutions.insert({
        templateID,
        answers,
      });
    },

    updateAnswer(obj, {
      id, title, section, answer,
    }, context) {
      if (title || section) {
        const QNID = Solutions.update(
          { _id: id },
          { $pull: { CQuestions: { title, section } } },
        );
      }
      if (answer) {
        const QNID2 = Solutions.update(
          { _id: id },
          { $push: { CQuestions: answer } },
        );
      }
    },

  },
};
