import { Button, Carousel, Col, Row, Typography } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import React from 'react';
import { useParams } from 'react-router-dom';
import { NavigateBack } from '../components/common/NavigateBack';
import { QuestionAnswerCard } from '../components/quiz/QuestionAnswerCard';
import { Quiz } from '../components/quiz/utils/api';
import useFetch from '../hooks/useFetch';

export const PlayPage = () => {
  const { quizId } = useParams<string>();
  const { data } = useFetch<Quiz>(`quizzes/${quizId}`);
  const carouselRef = React.createRef<CarouselRef>();

  return (
    <div>
      <NavigateBack />
      <Typography.Title level={2}>Play</Typography.Title>
      <Carousel ref={carouselRef}>{data && data.questions.map((question) => <QuestionAnswerCard key={question.id} question={question} />)}</Carousel>
      <Row justify={'space-between'}>
        <Col>
          <Button size="large" shape="round" onClick={() => carouselRef.current?.prev()}>
            ← Previous
          </Button>
        </Col>
        <Col>
          <Button size="large" shape="round" onClick={() => carouselRef.current?.next()}>
            Next →
          </Button>
        </Col>
      </Row>
    </div>
  );
};
