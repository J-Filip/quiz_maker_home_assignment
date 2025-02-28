import { Space, Typography } from 'antd';
const { Title, Text } = Typography;

export const HomePage = () => {
  return (
    <Typography>
      <Title level={2}>Quiz Maker - Demo App</Title>

      <Title level={5}> Job interview home assignment - Frontend.</Title>

      <Title level={3}>Key Features/Technologies To Demonstrate:</Title>
      <Space direction="vertical">
        <Text>• Proficiency in working with modern JS frameworks and UI libraries</Text>
        <Text>• Knowledge of HTML, CSS, and JS, along with good practices in JS</Text>
        <Text>• Code quality, submission process, and problem-solving approach</Text>
      </Space>

      <Title level={3}>Functional Requirements</Title>
      <Space direction="vertical">
        <Text>The application should support the following actions:</Text>
        <Text>• View all previously created quizzes</Text>
        <Text>• Create a new quiz</Text>
        <Text>• Edit a quiz</Text>
        <Text>• Delete a quiz</Text>
        <Text>• "Solve" a quiz</Text>
      </Space>

      <Title level={5}>The goal of this assignment is to showcase your practical knowledge and problem-solving skills in a real-world development environment.</Title>
    </Typography>
  );
};
