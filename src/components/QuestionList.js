import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
  
    fetchQuestions();
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: newQuestion,
          answers: [],
          correctIndex: 0,
        }),
      });

      const data = await response.json();

      setQuestions([...questions, data]);
      
      setShowForm(false);
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await fetch(`http://localhost:4000/questions/${questionId}`, {
        method: "DELETE",
      });

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>

      
      <ul>
        {questions.map((question) => (
          <QuestionItem 
          key={question.id}
          question={question}
          onDelete={handleDeleteQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList