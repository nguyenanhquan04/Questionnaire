import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Typography, Modal, Input, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ToastNotification, { notifySuccess } from "../../components/Toastify";
import { fetchQuestions } from "../../Helpers";
import "../adminPage/index.scss";
import { deleteQuestion } from "../../api/QuestionService";
import { createAnswer, updateAnswer } from "../../api/AnswerService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";
import {jwtDecode} from "jwt-decode";

const { Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AdminPage = () => {
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [filter, setFilter] = useState("all");
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

  const showAnswerModal = (question) => {
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (answer) {
      try {
        const authToken = localStorage.getItem("authToken"); 
        if (currentQuestion.answerId) {
          await updateAnswer(currentQuestion.answerId, answer, authToken);
          notifySuccess("Answer updated successfully");
        } else {
          await createAnswer(currentQuestion.id, answer, authToken);
          notifySuccess("Answer added successfully");
        }

        const questionsData = await fetchQuestions();
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error adding or updating answer:", error);
      }

      setIsModalOpen(false);
      setAnswer("");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setAnswer("");
  };

  const showDeleteConfirm = (question) => {
    setCurrentQuestion(question);
    setIsDeleteConfirmVisible(true);
  };

  const handleDelete = async () => {
    if (currentQuestion) {
      try {
        const authToken = localStorage.getItem("authToken"); 

        await deleteQuestion(currentQuestion.id, authToken);
        notifySuccess("Question deleted successfully");

        const questionsData = await fetchQuestions();
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }

    setIsDeleteConfirmVisible(false);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredQuestions = questions.filter((question) => {
    console.log(questions);
    if (filter === "answered") {
      return question.answer;
    } else if (filter === "unanswered") {
      return !question.answer;
    } else {
      return true;
    }
  });

  const getColSpan = () => {
    const count = filteredQuestions.length;
    if (count === 1) return 24; // Full width
    if (count === 2) return 12; // Half width
    if (count === 3) return 8; // One-third width
    return 6; // Default, one-fourth width
  };

  return (
    <div className="admin-page">
      <div style={{ marginBottom: 2, textAlign: "center" }}>
        <Select
          defaultValue="all"
          onChange={handleFilterChange}
          style={{ width: 200 }}
          className="blue-select"
        >
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
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                size="small"
                hoverable
                style={{
                  width: 240,
                  margin: "10px",
                  background: [
                    "#FDBCCF",
                    "#F9E1E0",
                    "#DFC7C1",
                    "#A2CDF2",
                    "#F2B9AC",
                  ][question.id % 5],
                  transform: `rotate(${
                    (question.id % 2 === 0 ? 4 : -4) +
                    (question.id % 3 === 0 ? -3 : 0)
                  }deg)`,
                  boxShadow: "5px 5px 7px rgba(33,33,33,.7)",
                  transition: "transform .15s linear",
                  position: "relative", // Ensure positioning for pin icon
                }}
                title={
                  <div style={{ position: "relative" }}>
                    <Text style={{ color: "black" }}>{question.text}</Text>
                    <DeleteOutlined
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "red",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                      onClick={() => showDeleteConfirm(question)}
                    />
                  </div>
                }
              >
                <div className="pin-icon">📌</div>
                <Text strong style={{ color: "black" }}>
                  Answer: 
                </Text>
                <Text style={{ color: "black" }}>
                  {question.answer || "No answer yet"}
                </Text>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 10,
                  }}
                >
                  <Button
                    type="primary"
                    className="answer-button"
                    onClick={() => showAnswerModal(question)}
                  >
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
            <Text strong style={{ color: "black" }}>
              Question:
            </Text>
            <p style={{ color: "black" }}>{currentQuestion.text}</p>
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
        <p style={{ color: "black" }}>{currentQuestion?.text}</p>
      </Modal>

      <ToastNotification />
    </div>
  );
};

export default AdminPage;
