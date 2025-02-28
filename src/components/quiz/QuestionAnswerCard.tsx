import { Button, Card, Typography } from 'antd';
import { useState } from 'react';
import { Question } from './utils/api';

interface QuestionViewProps {
  question: Question;
}

export const QuestionAnswerCard = (props: QuestionViewProps) => {
  const [answerVisible, setAnswerVisible] = useState<boolean>(false);

  const handleShowAnswer = () => {
    setAnswerVisible(true);
  };

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: 'auto',
    lineHeight: '160px',
    textAlign: 'center',
    minHeight: '500px',
  };

  return (
    <Card style={contentStyle}>
      <Typography.Title level={4}>{props.question.question}</Typography.Title>
      {!answerVisible ? (
        <Button type="primary" size="large" onClick={handleShowAnswer}>
          Reveal Answer
        </Button>
      ) : (
        <Typography.Title level={1}>{props.question.answer}</Typography.Title>
      )}
    </Card>
  );
};
