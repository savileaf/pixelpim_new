import { Spin } from 'antd';

const Spinner: React.FC = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 9999
  }}>
    <Spin size="large" tip="Loading..." />
  </div>
);

export default Spinner;
