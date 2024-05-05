import axios from "axios";
import  { useState, useEffect } from "react";
import describe from "../../images/describe.png"
import coupon from "../../images/coupon.png"
import { useNavigate } from "react-router-dom";
interface Question {
  question: string;
  image: string;
  category: string;
  correctAnswer: string;
  first: string;
  second: string;
  third: string;
}

const First = () => {
  const myUrl = "http://localhost:5003/api/tests";
  const [responsive, setResponsive] = useState(window.innerWidth > 480);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswer] = useState(0);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false); 

  useEffect(() => {
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

    getQuestions();

    function handleResize() {
      setResponsive(window.innerWidth <= 480);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    if (currentQuestionIndex === questions.length - 1) {
      setAllQuestionsAnswered(true); 
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerClick = (selectedAnswer: string | number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    if (selectedAnswer === correctAnswer) {
      setCorrectAnswer(correctAnswers + 1);
    }
    if (currentQuestionIndex === questions.length - 1) {
      setAllQuestionsAnswered(true); 
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const shuffleOptions = (options: string[]) => {
    const shuffledOptions = [...options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [
        shuffledOptions[j],
        shuffledOptions[i],
      ];
    }
    return shuffledOptions;
  };
  const navigate = useNavigate()
  function chooseCourse(){
    navigate("/courses")
  }
  return (
    <div className="container-fluid d-f fd-column align-items-center">
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
      {allQuestionsAnswered && (
        <div className={responsive ? "w-50 d-f fd-column align-items-center mt-2 g-1" : "w-90  d-f fd-column align-items-center mt-2 g-3"} style={{height:"70vh"}}>
            <div className={responsive? "fs-lg" : ""}> Result</div>
          <div className={responsive? "fs-xl" : ""}>Your Score : {correctAnswers}</div>
          <div className={responsive? "fs-lg" : ""}>Level: <span style={{color: "#F6AA00"}}>{correctAnswers <= 1 ? "Beginner" : "Elementary"}</span></div>
          <button className={responsive? "btn bg-primary text-light w-30" : "btn bg-primary text-light w-80"} style={responsive ? {height:"48px"} : {height:"32px"}} onClick={chooseCourse}> Choose Your Course</button>
          <div><img src={coupon} alt="coupon" /></div>
        </div>
      )}
      {!allQuestionsAnswered && currentQuestion && (
        <div className={responsive ? "w-50" : "w-90 "}>
          <div className="d-f justify-content-center mt-1">
            <img src={describe} alt="describe" style={{ width: "400px" }} />
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
            {shuffleOptions([
              currentQuestion.first,
              currentQuestion.second,
              currentQuestion.third,
              currentQuestion.correctAnswer,
            ]).map((option, index) => (
              <button
                key={index}
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
                onClick={() => handleAnswerClick(option)}
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
                  {String.fromCharCode(65 + index)}
                </div>
                <div>{option}</div>
              </button>
            ))}
          </div>
          <div className="w-100 d-f justify-content-center g-2 mb-2">
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
                  responsive
                    ? "w-20 btn bg-primary text-light"
                    : "w-30 btn bg-primary text-light"
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

export default First;
