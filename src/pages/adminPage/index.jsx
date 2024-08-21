import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Row, Col, Typography, Modal, Input, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ToastNotification, { notifySuccess } from '../../components/Toastify';
import { answerQuestion, deleteQuestion } from '../../slices/questionsSlice';
import '../adminPage/index.scss';

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AdminPage = () => {
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [filter, setFilter] = useState('all');

  const showAnswerModal = (question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (answer) {
      dispatch(answerQuestion({ id: currentQuestion.id, answer }));
      notifySuccess('Question answered successfully');
      setIsModalOpen(false);
      setAnswer('');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAnswer('');
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

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredQuestions = questions.filter(question => {
    if (filter === 'answered') {
      return question.answer;
    } else if (filter === 'unanswered') {
      return !question.answer;
    } else {
      return true;
    }
  });

  const getColSpan = () => {
    const count = filteredQuestions.length;
    if (count === 1) return 24; // Full width
    if (count === 2) return 12; // Half width
    if (count === 3) return 8;  // One-third width
    return 6; // Default, one-fourth width
  };

  return (
    <div className="admin-page">
      <div style={{ marginBottom: 2, textAlign: 'center' }}>
        <Select defaultValue="all" onChange={handleFilterChange} style={{ width: 200 }} className="blue-select">
          <Option value="all">All Questions</Option>
          <Option value="answered">Answered</Option>
          <Option value="unanswered">Unanswered</Option>
        </Select>
      </div>

      <div className="card-container">
        <Row gutter={[16, 16]} justify="center">
          {filteredQuestions.map((question) => (
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
                  position: 'relative', // Ensure positioning for pin icon
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
                  <Button type="primary" className="answer-button" onClick={() => showAnswerModal(question)}>
                    Answer
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title="Provide an Answer"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        {currentQuestion && (
          <>
            <Text strong style={{ color: 'black' }}>Question:</Text>
            <p style={{ color: 'black' }}>{currentQuestion.text}</p>
            <TextArea
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer here"
            />
          </>
        )}
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

export default AdminPage;
