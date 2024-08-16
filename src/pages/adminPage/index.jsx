import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion, deleteQuestion } from '../../slices/questionsSlice';
import './index.scss';

const AdminPage = () => {
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();

  const handleAnswerQuestion = (id) => {
    const answer = prompt('Provide an answer:');
    if (answer) {
      dispatch(answerQuestion({ id, answer }));
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin: Answer Questions</h1>
      <div className="question-grid">
        {questions.map((question) => (
          <div key={question.id} className="question-card">
            <p>{question.text}</p>
            <p><strong>Answer:</strong> {question.answer || 'No answer yet'}</p>
            <div className="card-actions">
              <button onClick={() => handleAnswerQuestion(question.id)}>Answer</button>
              <button onClick={() => dispatch(deleteQuestion(question.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
