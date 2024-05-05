import axios from "axios";
import React, { useState, useEffect } from "react";
import describe from "../../images/describe.png"
interface Question {
  question: string;
  image: string;
  category: string;
  correctAnswer: number;
  first: string;
  second: string;
  third: string;
}

const Total = () => {
  const myUrl = "http://localhost:5003/api/tests";

  const [responsive, setResponsive] = useState(window.innerWidth > 480);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const getQuestions = async () => {
    try {
      const response = await axios.get(myUrl);
      const filteredQuestions = response.data.filter(
        (question: Question) => question.category === "7-14"
      );

      setQuestions(filteredQuestions);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getQuestions();
    function handleResize() {
      setResponsive(window.innerWidth <= 480);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div
      className="container-fluid d-f fd-column align-items-center"
      style={responsive ? { height: "90vh" } : {height:"70vh"}}
    >
      <div
        style={{ height: "52px" }}
        className={
          responsive
            ? "w-100 bg-primary text-light d-f align-items-center justify-content-center fs-lg fw-600 "
            : "w-100 bg-primary text-light d-f align-items-center justify-content-center fs-20 fw-600 "
        }
      >
        Level Test
      </div>
      {currentQuestion && (
        <div className={responsive ? "w-50" : "w-90 "}>
            <div className="d-f justify-content-center mt-1">
                <img  src={describe} alt="describe" style={{width:'400px'}} />
            </div>
          <div
            className={
              responsive
                ? "fs-lg d-f justify-content-center mt-3"
                : "fs-14 d-f justify-content-center mt-3"
            }
          >
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </div>
          <div
            className={
              responsive
                ? "d-f fw-wrap justify-content-sb g-2 mt-3 mb-2"
                : " d-f fw-wrap  justify-content-sb g-2 mt-3 mb-3"
            }
          >
            <button
              className="btn w-40 d-f align-items-center g-3"
              style={
                responsive
                  ? {
                      height: "48px",
                      background: "white",
                      border: "1px solid  #830024",
                    }
                  : {
                      height: "32px",
                      background: "white",
                      border: "1px solid  #830024",
                    }
              }
            >
              <div
                className="btn d-f justify-content-center align-items-center"
                style={
                  responsive
                    ? {
                        width: "40px",
                        height: "40px",
                        background: " #F6EAEB",
                        marginLeft: "4px",
                      }
                    : {
                        width: "24px",
                        height: "24px",
                        marginLeft: "4px",
                        background: " #F6EAEB",
                      }
                }
              >
                A
              </div>
              <div>lorem</div>
            </button>
            <button
              className="btn w-40 d-f align-items-center g-3"
              style={
                responsive
                  ? {
                      height: "48px",
                      background: "white",
                      border: "1px solid  #830024",
                    }
                  : {
                      height: "32px",
                      background: "white",
                      border: "1px solid  #830024",
                    }
              }
            >
              <div
                className="btn d-f justify-content-center align-items-center"
                style={
                  responsive
                    ? {
                        width: "40px",
                        height: "40px",
                        background: " #F6EAEB",
                        marginLeft: "4px",
                      }
                    : {
                        width: "24px",
                        height: "24px",
                        marginLeft: "4px",
                        background: " #F6EAEB",
                      }
                }
              >
                B
              </div>
              <div>lorem</div>
            </button>
            <button
              className="btn w-40 d-f align-items-center g-3"
              style={
                responsive
                  ? {
                      height: "48px",
                      background: "white",
                      border: "1px solid  #830024",
                    }
                  : {
                      height: "32px",
                      background: "white",
                      border: "1px solid  #830024",
                    }
              }
            >
              <div
                className="btn d-f justify-content-center align-items-center"
                style={
                  responsive
                    ? {
                        width: "40px",
                        height: "40px",
                        background: " #F6EAEB",
                        marginLeft: "4px",
                      }
                    : {
                        width: "24px",
                        height: "24px",
                        marginLeft: "4px",
                        background: " #F6EAEB",
                      }
                }
              >
                C
              </div>
              <div>lorem</div>
            </button>
            <button
              className="btn w-40 d-f align-items-center g-3"
              style={
                responsive
                  ? {
                      height: "48px",
                      background: "white",
                      border: "1px solid  #830024",
                    }
                  : {
                      height: "32px",
                      background: "white",
                      border: "1px solid  #830024",
                    }
              }
            >
              <div
                className="btn d-f justify-content-center align-items-center"
                style={
                  responsive
                    ? {
                        width: "40px",
                        height: "40px",
                        background: " #F6EAEB",
                        marginLeft: "4px",
                      }
                    : {
                        width: "24px",
                        height: "24px",
                        marginLeft: "4px",
                        background: " #F6EAEB",
                      }
                }
              >
                D
              </div>
              <div>lorem</div>
            </button>
          </div>
          <div className="w-100 d-f justify-content-center g-2">
            {currentQuestionIndex > 0 && (
              <button
                style={
                  responsive
                    ? {
                        backgroundColor: "white",
                        border: "1px solid #830024",
                        height: "48px",
                      }
                    : {
                        backgroundColor: "white",
                        border: "1px solid #830024",
                        height: "32px",
                      }
                }
                className={responsive ? "w-20 btn" : "w-30 btn"}
                onClick={handlePreviousQuestion}
              >
                Previous Question
              </button>
            )}
            {currentQuestionIndex < questions.length - 1 && (
              <button
                className={
                  responsive ? "w-20 btn bg-primary text-light" : "w-30 btn bg-primary text-light"
                }
                style={responsive ? { height: "48px" } : { height: "32px" }}
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Total;
