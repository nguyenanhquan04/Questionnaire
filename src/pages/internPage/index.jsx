import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Row, Col, Typography, Modal, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ToastNotification, { notifySuccess } from '../../components/Toastify';
import { addQuestion, deleteQuestion, updateQuestion } from '../../slices/questionsSlice';
import '../internPage/index.scss'; 

const { Text } = Typography;
const { TextArea } = Input;

const InternPage = () => {
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionText, setQuestionText] = useState('');

  const showAddModal = () => {
    setCurrentQuestion(null);
    setQuestionText('');
    setIsModalOpen(true);
  };

  const showEditModal = (question) => {
    setCurrentQuestion(question);
    setQuestionText(question.text);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (questionText.trim()) {
      if (currentQuestion) {
        dispatch(updateQuestion({ id: currentQuestion.id, text: questionText }));
        notifySuccess('Question updated successfully');
      } else {
        dispatch(addQuestion({ id: Date.now(), text: questionText, answer: '' }));
        notifySuccess('Question added successfully');
      }
      setIsModalOpen(false);
      setQuestionText('');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setQuestionText('');
  };

  const showDeleteConfirm = (question) => {
    setCurrentQuestion(question);
    setIsDeleteConfirmVisible(true);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(currentQuestion.id));
    setIsDeleteConfirmVisible(false);
    notifySuccess('Question deleted successfully');
  };

  const getColSpan = () => {
    const count = questions.length;
    if (count === 1) return 24; // Full width for 1 card
    if (count === 2) return 12; // Half width for 2 cards
    if (count === 3) return 8;  // One-third width for 3 cards
    return 6; // Default, one-fourth width for 4 or more cards
  };

  return (
    <div className="admin-page"> {/* Reuse the styles from AdminPage */}
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Button type="primary" onClick={showAddModal}>
          Add Question
        </Button>
      </div>

      <div className="card-container">
        <Row gutter={[16, 16]} justify="center">
          {questions.map((question) => (
            <Col 
              key={question.id} 
              xs={24} 
              sm={getColSpan()} 
              md={getColSpan()}
              lg={getColSpan()}
              xl={getColSpan()}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                size="small"
                hoverable
                style={{
                  width: 240,
                  margin: '10px',
                  background: ['#FDBCCF', '#F9E1E0', '#DFC7C1', '#A2CDF2', '#F2B9AC'][question.id % 5],
                  transform: `rotate(${(question.id % 2 === 0 ? 4 : -4) + (question.id % 3 === 0 ? -3 : 0)}deg)`,
                  boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
                  transition: 'transform .15s linear',
                  position: 'relative',
                }}
                title={
                  <div style={{ position: 'relative' }}>
                    <Text style={{ color: 'black' }}>{question.text}</Text>
                    <DeleteOutlined
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        color: 'red',
                        fontSize: '16px',
                        cursor: 'pointer',
                      }}
                      onClick={() => showDeleteConfirm(question)}
                    />
                  </div>
                }
              >
                <div className="pin-icon">📌</div>
                <Text strong style={{ color: 'black' }}>Answer:</Text> 
                <Text style={{ color: 'black' }}>{question.answer || 'No answer yet'}</Text>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                  <Button type="primary" className="edit-button" onClick={() => showEditModal(question)}>
                    Edit
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title={currentQuestion ? "Edit Question" : "Add Question"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <TextArea
          rows={4}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question here"
        />
      </Modal>

      <Modal
        title="Are you sure you want to delete this question?"
        open={isDeleteConfirmVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteConfirmVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
      >
        <p style={{ color: 'black' }}>{currentQuestion?.text}</p>
      </Modal>

      <ToastNotification />
    </div>
  );
};

export default InternPage;
