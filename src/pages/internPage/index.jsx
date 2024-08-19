import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Row, Col, Input, Typography, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} from "../../slices/questionsSlice";

const { TextArea } = Input;
const { Text } = Typography;

const InternPage = () => {
  const questions = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [questionText, setQuestionText] = useState("");

  const showAddModal = () => {
    setModalTitle("Add Question");
    setQuestionText("");
    setCurrentQuestion(null);
    setIsModalOpen(true);
  };

  const showEditModal = (question) => {
    setModalTitle("Edit Question");
    setQuestionText(question.text);
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (questionText.trim()) {
      if (currentQuestion) {
        // Edit question
        dispatch(
          updateQuestion({ id: currentQuestion.id, text: questionText })
        );
      } else {
        // Add new question
        dispatch(
          addQuestion({ id: Date.now(), text: questionText, answer: "" })
        );
      }
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ margin: "20px auto", padding: "20px", background: "#666" }}>
      {/* Button positioned outside of the main questions container */}
      <div style={{ marginBottom: "16px", textAlign: "center" }}>
        <Button type="primary" onClick={showAddModal}>
          Add Question
        </Button>
      </div>

      {/* Main container for questions */}
      <div style={{ background: "#666", padding: "20px" }}>
        <Row gutter={[16, 16]} justify="center">
          {questions.map((question) => (
            <Col key={question.id} xs={24} sm={12} md={6}>
              <Card
                size="small"
                hoverable
                style={{
                  width: 240,
                  margin: "10px",
                  background: ["#ffc", "#cfc", "#ccf"][question.id % 3],
                  transform: `rotate(${
                    (question.id % 2 === 0 ? 4 : -4) +
                    (question.id % 3 === 0 ? -3 : 0)
                  }deg)`,
                  boxShadow: "5px 5px 7px rgba(33,33,33,.7)",
                  transition: "transform .15s linear",
                }}
                title={
                  <div style={{ position: "relative" }}>
                    <Text>{question.text}</Text>
                    <DeleteOutlined
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                      onClick={() => dispatch(deleteQuestion(question.id))}
                    />
                  </div>
                }
              >
                <Text strong>Answer:</Text>{" "}
                <Text>{question.answer || "No answer yet"}</Text>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 10,
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() => showEditModal(question)}
                  >
                    Edit
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

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
