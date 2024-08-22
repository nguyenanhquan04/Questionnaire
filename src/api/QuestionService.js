import request from "./axios";

const getAllQuestions = () => {
  return request.get(`question/all`);
};

const addQuestion = (question, authToken) => {
  return request.post(
    `question/create`,
    { question: question },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
};

const updateQuestion = (questionId, question, authToken) => {
  return request.put(
    `question/update/${questionId}`,
    { question: question },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
};

const deleteQuestion = (questionId, authToken) => {
  return request.delete(`question/delete/${questionId}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

export { getAllQuestions, addQuestion, updateQuestion, deleteQuestion };
