import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export const NavigateBack = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button type="text" onClick={() => navigate(-1)}>
        ← Go Back
      </Button>
    </div>
  );
};
