import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Row, Col, Input, Typography, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { addQuestion, deleteQuestion, updateQuestion } from '../../slices/questionsSlice';
import '../adminPage/index.scss';

const { TextArea } = Input;
const { Title, Text } = Typography;

const InternPage = () => {
  const questions = useSelector(state => state.questions);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [questionText, setQuestionText] = useState('');

  const showAddModal = () => {
    setModalTitle('Add Question');
    setQuestionText('');
    setCurrentQuestion(null);
    setIsModalOpen(true);
  };

  const showEditModal = (question) => {
    setModalTitle('Edit Question');
    setQuestionText(question.text);
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (questionText.trim()) {
      if (currentQuestion) {
        // Edit question
        dispatch(updateQuestion({ id: currentQuestion.id, text: questionText }));
      } else {
        // Add new question
        dispatch(addQuestion({ id: Date.now(), text: questionText, answer: '' }));
      }
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="admin-page">
      <Title level={2} style={{ color: 'black' }}>Intern Questions</Title>
      
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
          Add Question
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {questions.map((question) => (
          <Col key={question.id} xs={24} sm={12} md={8}>
            <Card
              size="small"
              title={
                <div style={{ position: 'relative' }}>
                  <Text>{question.text}</Text>
                  <DeleteOutlined
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0, 
                      color: 'white', 
                      fontSize: '16px', 
                      cursor: 'pointer' 
                    }}
                    onClick={() => dispatch(deleteQuestion(question.id))}
                  />
                </div>
              }
            >
              <Text strong>Answer:</Text> <Text>{question.answer || 'No answer yet'}</Text>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
                <Button type="primary" onClick={() => showEditModal(question)}>
                    Edit
                  </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Adding/Editing a Question */}
      <Modal
        title={modalTitle}
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
    </div>
  );
};

export default InternPage;
