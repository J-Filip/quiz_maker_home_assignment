import { Button, Carousel, Col, Row, Typography } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QuestionAnswerCard } from '../components/quiz/QuestionAnswerCard';
import useFetch from '../hooks/useFetch';
import { Quiz } from '../components/quiz/utils/api';

export const PlayPage = () => {
  const { quizId } = useParams<any>();
  const { data } = useFetch<Quiz>(`quizzes/${quizId}`);
  const navigate = useNavigate();

  const carouselRef = React.createRef<CarouselRef>();

  return (
    <div>
      <Button type="text" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Typography.Title level={2}>Play</Typography.Title>
      <Carousel ref={carouselRef}>{data && data.questions.map((question) => <QuestionAnswerCard key={question.id} question={question} />)}</Carousel>
      <Row justify={'space-between'}>
        <Col>
          <Button type="text" onClick={() => carouselRef.current?.prev()}>
            ← Previous
          </Button>
        </Col>
        <Col>
          <Button type="text" onClick={() => carouselRef.current?.next()}>
            Next →
          </Button>
        </Col>
      </Row>
    </div>
  );
};
