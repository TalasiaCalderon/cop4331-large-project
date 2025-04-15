import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Question {
  question: string;
  answer: string;
}

const EnglishQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [answerChoices, setAnswerChoices] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizFinished, setQuizFinished] = useState(false);

  const maxQuestions = 5;

  const userId = JSON.parse(localStorage.getItem('user_data') || '{}')._id;

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
  setIsLoading(true);
  try {
    const qRes = await axios.get('/api/english/question');
    const aRes = await axios.get('/api/english/answers');

    let answers = [...new Set([...aRes.data.answers, qRes.data.definition])];

    while (answers.length < 4) {
      answers.push(qRes.data.definition);
    }

    setQuestionData(qRes.data);
    setAnswerChoices(shuffleArray(answers));
    setSelectedAnswer(null);
  } catch (error) {
    console.error('Failed to load question:', error);
  } finally {
    setIsLoading(false);
  }
};


  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    if (!questionData) return;

    const correct = selectedAnswer === questionData.definition;
    const newScore = correct ? score + 1 : score;

    setScore(newScore);
    setQuestionCount(questionCount + 1);

    if (questionCount + 1 >= maxQuestions) {
      await updateUserStats(newScore, maxQuestions);
      setQuizFinished(true);
    } else {
      fetchQuestion();
    }
  };

  const updateUserStats = async (correct: number, total: number) => {
    try {
      await axios.post('/api/user/updateStatistics', {
        id: userId,
        englishQuestionsCorrect: correct,
        englishQuestionsAnswered: total
      });
    } catch (err) {
      console.error('Failed to update user stats', err);
    }
  };

  const shuffleArray = (arr: string[]) => {
    return [...arr].sort(() => Math.random() - 0.5);
  };

  if (quizFinished) {
    return (
      <div className="quiz-finished">
        <h2>Quiz Complete!</h2>
        <p>You scored {score} out of {maxQuestions}.</p>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : questionData ? (
        <>
          <h2>{questionData.word}</h2>
          <div className="answer-options">
            {answerChoices.map((choice, index) => (
              <button
                key={index}
                className={`answer-button ${selectedAnswer === choice ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
          <button
            className="next-button"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {questionCount + 1 === maxQuestions ? 'Finish' : 'Next'}
          </button>
        </>
      ) : (
        <p>Failed to load question.</p>
      )}
    </div>
  );
};

export default EnglishQuiz;

