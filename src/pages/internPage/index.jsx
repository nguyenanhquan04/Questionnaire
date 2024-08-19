import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addQuestion, deleteQuestion, updateQuestion } from '../../slices/questionsSlice';
import './index.scss';

const InternPage = () => {
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      dispatch(addQuestion({ id: Date.now(), text: newQuestion, answer: '' }));
      setNewQuestion('');
    }
  };

  const handleUpdateQuestion = (id) => {
    const updatedText = prompt('Update your question:', questions.find(q => q.id === id).text);
    if (updatedText) {
      dispatch(updateQuestion({ id, text: updatedText }));
    }
  };

  return (
    <div className="home-page">
      <h1>Intern Questions</h1>
      <div className="question-input">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleAddQuestion}>Add</button>
      </div>
      <div className="question-grid">
        {questions.map((question) => (
          <div key={question.id} className="question-card">
            <p>{question.text}</p>
            {question.answer && (
              <p className="answer"><strong>Answer:</strong> {question.answer}</p>
            )}
            <div className="card-actions">
              <button onClick={() => handleUpdateQuestion(question.id)}>Edit</button>
              <button onClick={() => dispatch(deleteQuestion(question.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternPage;
