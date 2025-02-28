import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { NavigateBack } from '../components/common/NavigateBack';
import { QuizForm } from '../components/quiz/QuizForm';
import { Question, Quiz, createNewQuiz, createQuestion } from '../components/quiz/utils/api';

export interface FetchedQuestion extends Omit<Question, 'id'> {
  id: string;
}

export const CreatePage = () => {
  const navigate = useNavigate();

  const onFinish = async (values: Quiz) => {
    await createNewQuiz(values);

    // mock creating questions - see createQuestion function declaration
    values.questions.forEach((element) => {
      if (element.id == null) {
        createQuestion(element);
      }
    });
    navigate(`/quizzes`);
  };

  return (
    <div>
      <NavigateBack />

      <Typography.Title level={2}>Create New Quiz</Typography.Title>
      <QuizForm onFinish={onFinish} submitLabel={'Create New Quiz'} />
    </div>
  );
};
