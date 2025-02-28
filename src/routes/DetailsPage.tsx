import { Typography } from 'antd';

import 'antd/es/popconfirm/style/index.css';
import { useNavigate, useParams } from 'react-router-dom';
import { NavigateBack } from '../components/common/NavigateBack';
import { QuizForm } from '../components/quiz/QuizForm';
import { createQuestion, Quiz, updateQuiz } from '../components/quiz/utils/api';
import useFetch from '../hooks/useFetch';

export const DetailsPage = () => {
  const { quizId } = useParams<string>();
  const { data } = useFetch<Quiz>(`quizzes/${quizId}`);

  const navigate = useNavigate();

  const onFinish = async (values: Quiz) => {
    updateQuiz(values);
    values.questions.forEach((element) => {
      if (element.id == null) {
        createQuestion(element);
      }
    });
    navigate('/quizzes');
  };

  return (
    <div>
      <NavigateBack />
      <Typography.Title level={2}>Update {data?.name}</Typography.Title>
      {data && <QuizForm quiz={data} onFinish={onFinish} submitLabel={'Update Quiz'} />}
    </div>
  );
};
