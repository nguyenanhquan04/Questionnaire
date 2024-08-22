import request from "./axios";

const getAnswerByQuestionId = (questionId) => {
  return request.get(`answer/getAnswer/${questionId}`);
};

const createAnswer = (questionId, answer, authToken) => {
  return request.post(
    `http://localhost:8080/answer/create/${questionId}`,
    { answer },
    { headers: { Authorization: `Bearer ${authToken}` } }
  );
}

const updateAnswer = (answerId, answer, authToken) => {
  return request.put(
    `http://localhost:8080/answer/update/${answerId}`,
    { answer },
    { headers: { Authorization: `Bearer ${authToken}` } }
  );
}

export { getAnswerByQuestionId, createAnswer, updateAnswer };
