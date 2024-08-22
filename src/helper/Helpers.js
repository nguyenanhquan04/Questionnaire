import { getAnswerByQuestionId } from "../api/AnswerService";
import { getAllQuestions } from "../api/QuestionService";
import {jwtDecode} from 'jwt-decode';
import ROUTES from '../routes';

export const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();
      const questionsData = response.data;

      // Fetch answers for each question
      const questionsWithAnswers = await Promise.all(
        questionsData.map(async (question) => {
          const answerResponse = await getAnswerByQuestionId(question.questionId);
          return {
            id: question.questionId,
            text: question.question,
            answerId: answerResponse.data.length > 0 ? answerResponse.data[0].answerId : undefined,
            answer: answerResponse.data.length > 0 ? answerResponse.data[0].answer : undefined,
            userId: question.userId,
            deleted: question.deleted,
          };
        })
      );

      return questionsWithAnswers;
    } catch (error) {
      console.error('Error fetching questions or answers:', error);
    }
  };

  export const checkAuthToken = (navigate) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "ADMIN") {
        navigate(ROUTES.adminPage); 
      } else if (decodedToken.role === "INTERN") {
        navigate(ROUTES.internPage); 
      }
    } else {
      navigate(ROUTES.signIn);
    }
  };