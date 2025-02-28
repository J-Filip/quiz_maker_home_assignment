import { Button, Card, Col, Form, Input, List, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { FetchedQuestion } from '../../routes/CreatePage';
import { Quiz } from './utils/api';

interface QuizFormProps {
  quiz?: Quiz;
  onFinish?: (values: Quiz) => Promise<void>;
  submitLabel: string;
}

export const QuizForm = (props: QuizFormProps) => {
  const { data } = useFetch<FetchedQuestion[]>('questions');
  const [usedQuestions, setUsedQuestions] = useState<FetchedQuestion[]>([]);
  const [formTouched, setFormTouched] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setUsedQuestions(data && data.length > 0 ? data : []);
  }, [data]);

  const handleReuseQuestion = (questionId: string) => {
    const updatedQuestions = usedQuestions.filter((question) => question.id !== questionId);
    setUsedQuestions(updatedQuestions);
  };

  return (
    <div>
      <Form<Quiz> form={form} initialValues={props.quiz} name="quizDetails" layout="vertical" onFinish={props.onFinish} onFieldsChange={() => setFormTouched(true)} title="alalal">
        <Row>
          <Col>
            <Form.Item name={'id'} hidden>
              <Input />
            </Form.Item>
            <Form.Item name={'name'} label={'Quiz Name:'} rules={[{ required: true, message: 'Please enter a name!' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {/* List of questions */}

        <Form.List
          name={'questions'}
          rules={[
            {
              validator: async (_, items) => {
                if (!items || items.length === 0) {
                  return Promise.reject(new Error('Please add at least one item.'));
                }
              },
            },
          ]}
        >
          {(quiz, { add, remove }, { errors }) => (
            <div>
              <Card>
                <Typography.Title level={3}>Questions:</Typography.Title>
                {quiz.map((question, index) => (
                  <Card key={question.key}>
                    <Form.Item name={[index, 'id']} hidden>
                      <Input />
                    </Form.Item>
                    <Form.Item name={[index, 'question']} label={`${index + 1}.Question:`}>
                      <Input />
                    </Form.Item>
                    <Form.Item name={[index, 'answer']} label={'Answer:'}>
                      <Input />
                    </Form.Item>
                    <Button danger onClick={() => remove(question.name)}>
                      Remove
                    </Button>
                  </Card>
                ))}
                <Row className="paddingTop__sm" justify={'center'}>
                  <Col>
                    <Button onClick={() => add()}>Add question</Button>
                  </Col>
                </Row>
              </Card>
              <Form.ErrorList errors={errors} />
              <Row className="paddingTop__xlg">
                <Col>
                  <Typography.Title level={5}>Add Recycled questions</Typography.Title>
                </Col>
              </Row>
              <List
                itemLayout="horizontal"
                dataSource={usedQuestions}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta title={item.question} />
                    <Button
                      type="dashed"
                      onClick={() => {
                        add(item);
                        handleReuseQuestion(item.id);
                      }}
                    >
                      Add
                    </Button>
                  </List.Item>
                )}
              />
            </div>
          )}
        </Form.List>
      </Form>
      <Row className="paddingTop__xlg" justify={'center'}>
        <Col>
          <Button type="primary" size="large" disabled={!formTouched} onClick={form.submit}>
            {props.submitLabel}
          </Button>
        </Col>
      </Row>
    </div>
  );
};
