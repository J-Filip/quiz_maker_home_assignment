import { Col, Layout, Menu, MenuProps, Row } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: '/',
  },
  {
    label: 'Quizzes',
    key: '/quizzes',
  },
];

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState(location.pathname);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <>
      <Layout>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <Content className="mainLayout__content">
          {/* render current child route element */}
          <Outlet />
        </Content>
        <Footer>
          <Row justify={'center'}>
            <Col>Quiz Maker | @J-Filip </Col>
          </Row>
        </Footer>
      </Layout>
    </>
  );
}
