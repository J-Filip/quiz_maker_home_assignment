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
    const data: Quiz = await createNewQuiz(values);

    values.questions.forEach((element) => {
      if (element.id == null) {
        createQuestion(element);
      }
    });
    navigate(`/quiz/${data.id}/details`);
  };

  return (
    <div>
      <NavigateBack />

      <Typography.Title level={2}>Create New Quiz</Typography.Title>
      <QuizForm onFinish={onFinish} submitLabel={'Create New Quiz'} />
    </div>
  );
};
