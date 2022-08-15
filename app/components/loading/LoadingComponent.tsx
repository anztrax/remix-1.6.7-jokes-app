import React, {CSSProperties} from 'react';
import Spin from "antd/lib/spin";

type Props = {
  isFull?: boolean,
  message?: string
}

const LoadingComponent:React.FC<Props> = (props) => {
  const {
    isFull = false,
    message = "loading"
  } = props;

  const style: CSSProperties = {
    display: 'flex',
    height: isFull ? '100vh' : '90vh',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  };

  return (
    <div style={style}>
      <Spin size={'large'} />
      {message}
    </div>
  );
}

export default LoadingComponent;
