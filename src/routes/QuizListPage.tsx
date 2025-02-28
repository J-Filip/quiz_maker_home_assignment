import { Alert, Button, Col, Popconfirm, Row, Skeleton } from 'antd';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import Table, { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Quiz, deleteQuiz } from '../components/quiz/utils/api';
import useFetch from '../hooks/useFetch';

export const QuizListPage = () => {
  const { data, isLoading, error, refetch } = useFetch<Quiz[]>('quizzes');
  const [deleteErrorFailed, setDeleteErrorFailed] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (quizId: number) => {
    const response: any = await deleteQuiz(quizId);
    if (response.success) {
      refetch();
      return;
    }
    //TODO: look up why ant feedback component not showing up | temporary fix
    setDeleteErrorFailed(true);
    setTimeout(() => {
      setDeleteErrorFailed(false);
    }, 4000);
  };

  const columns: ColumnsType<Quiz> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '80%',
      onCell: (record) => {
        return {
          onClick: () => navigate(`/quiz/${record.id}/details`, { state: record }),
        };
      },
      render: (record) => record,
    },
    {
      key: 'play',
      render: (record) => (
        <Row key={record.id} justify={'center'}>
          <Col>
            <NavLink to={`/quiz/${record.id}/play`}>
              <Button size="large">Play ▶</Button>
            </NavLink>
          </Col>
        </Row>
      ),
    },

    {
      key: 'delete',
      render: (record) => (
        <Row key={record.id} justify={'center'}>
          <Col>
            <Popconfirm title={'Are you sure?'} okText="Yes" cancelText="No" onConfirm={() => handleDelete(record.id)}>
              <Button type="primary" danger>
                🗑️ Delete
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      <Row justify={'space-between'}>
        <Col>
          <h2>Kvizovi</h2>
        </Col>
        <Col>
          <NavLink to={'/quizzes/create'}>
            <Button>Create new</Button>
          </NavLink>
        </Col>
      </Row>

      {isLoading && <Skeleton />}
      {error && <ErrorBoundary />}

      {deleteErrorFailed && <Alert banner showIcon type="error" message="Failed to delete" />}

      {data ? (
        // todo: open update quiz on click anywhere
        <Table size="middle" columns={columns} dataSource={data} />
      ) : isLoading ? (
        <Skeleton />
      ) : (
        'No quizzes yet...'
      )}
    </>
  );
};
