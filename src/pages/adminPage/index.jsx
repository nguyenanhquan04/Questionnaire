import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Row, Col, Typography, Modal, Input, Select } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ToastNotification, { notifySuccess } from '../../components/Toastify'; // Corrected import
import { answerQuestion, deleteQuestion } from '../../slices/questionsSlice'; // Import the actions from your slice
import '../adminPage/index.scss'; // Adjust your CSS import if needed

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AdminPage = () => {
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [filter, setFilter] = useState('all'); // Filter state

  const showAnswerModal = (question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (answer) {
      dispatch(answerQuestion({ id: currentQuestion.id, answer })); // Dispatch the action
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
    dispatch(deleteQuestion(currentQuestion.id)); // Dispatch the action
    setIsDeleteConfirmVisible(false);
    notifySuccess('Question deleted successfully'); // Notify on successful delete
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // Filter questions based on the selected filter
  const filteredQuestions = questions.filter(question => {
    if (filter === 'answered') {
      return question.answer;
    } else if (filter === 'unanswered') {
      return !question.answer;
    } else {
      return true;
    }
  });

  return (
    <div className="admin-page" style={{ margin: '20px auto', padding: '20px', background: '#fff' }}>
      {/* <Title level={2} style={{ color: 'gray' }}>Admin: Answer Questions</Title> */}

      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Select defaultValue="all" onChange={handleFilterChange} style={{ width: 200 }} className="blue-select">
          <Option value="all">All Questions</Option>
          <Option value="answered">Answered</Option>
          <Option value="unanswered">Unanswered</Option>
        </Select>
      </div>

      <Row gutter={[16, 16]} justify="center">
        {filteredQuestions.map((question) => (
          <Col key={question.id} xs={24} sm={12} md={6}>
            <Card
              size="small"
              hoverable
              style={{
                width: 240,
                margin: '10px',
                background: ['#ffc', '#cfc', '#ccf'][question.id % 3],
                transform: `rotate(${(question.id % 2 === 0 ? 4 : -4) + (question.id % 3 === 0 ? -3 : 0)}deg)`,
                boxShadow: '5px 5px 7px rgba(33,33,33,.7)',
                transition: 'transform .15s linear',
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
              <Text strong style={{ color: 'black' }}>Answer:</Text> 
              <Text style={{ color: 'black' }}>{question.answer || 'No answer yet'}</Text>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <Button type="primary" onClick={() => showAnswerModal(question)}>
                  Answer
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for answering a question */}
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

      {/* Confirmation modal for deletion */}
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

      {/* Toast Notification Container */}
      <ToastNotification />
    </div>
  );
};

export default AdminPage;
