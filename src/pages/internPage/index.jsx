import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Typography, Modal, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import ToastNotification, { notifySuccess } from '../../components/Toastify';
import '../internPage/index.scss';
import { addQuestion, deleteQuestion, updateQuestion } from '../../api/QuestionService';
import { fetchQuestions } from '../../Helpers';
import { useNavigate } from 'react-router-dom';
import ROUTES from "../../routes";
import {jwtDecode} from "jwt-decode";

const { Text } = Typography;
const { TextArea } = Input;

const InternPage = () => {
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionText, setQuestionText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  useEffect(() => {
    const getQuestions = async () => {
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
    };

    getQuestions();
  }, []);

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

  const handleOk = async () => {
    if (questionText.trim()) {
      const authToken = localStorage.getItem('authToken'); // Retrieve the authToken from localStorage

      try {
        if (currentQuestion) {
          // Update existing question
          await updateQuestion(currentQuestion.id, questionText, authToken);
          notifySuccess('Question updated successfully');
        } else {
          // Add new question
          const response = await addQuestion(questionText, authToken);
          notifySuccess('Question added successfully');

          // Optionally, update the questions list with the new question
          const newQuestion = {
            id: response.data.questionId,
            text: response.data.question,
            answer: 'No answer yet',
            userId: response.data.userId,
            deleted: false,
          };
          setQuestions([...questions, newQuestion]);
        }

        // Re-fetch questions to ensure the list is up-to-date
        await fetchQuestions();
      } catch (error) {
        console.error('Error adding or updating question:', error);
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

  const handleDelete = async () => {
    if (currentQuestion) {
      try {
        const authToken = localStorage.getItem('authToken'); // Retrieve the authToken from localStorage
        await deleteQuestion(currentQuestion.id, authToken);
        notifySuccess('Question deleted successfully');
        // Re-fetch questions and update state
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }

    setIsDeleteConfirmVisible(false);
  };

  const getColSpan = () => {
    const count = questions.length;
    if (count === 1) return 24; // Full width
    if (count === 2) return 12; // Half width
    if (count === 3) return 8;  // One-third width
    return 6; // Default, one-fourth width
  };

  return (
    <div className="intern-page">
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
                <Text strong style={{ color: 'black' }}>Answer: </Text> 
                <Text style={{ color: 'black' }}>{question.answer || "No answer yet"}</Text>
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
        centered
        width={500}
      >
        <TextArea
          rows={4}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question here"
          style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            borderColor: '#d9d9d9',
            color: '#333',
            padding: '10px',
            marginBottom: '20px',
          }}
        />
      </Modal>

      <Modal
        title="Are you sure you want to delete this question?"
        open={isDeleteConfirmVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteConfirmVisible(false)}
        okText="Yes, Delete"
        cancelText="Cancel"
        centered
        width={400}
      >
        <p>{currentQuestion?.text}</p>
      </Modal>

      <ToastNotification />
    </div>
  );
};

export default InternPage;
