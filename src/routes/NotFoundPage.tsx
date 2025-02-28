import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>Oops!</h1>
      <h2>404 - Hmm...We didn't find this page.</h2>
      <Link to={'/'}>
        <Button>🏠 Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
