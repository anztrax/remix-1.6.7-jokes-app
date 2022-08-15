import React, { PropsWithChildren } from "react";
import {
  ErrorBoundary,
  FallbackProps
} from "react-error-boundary";

const ReactComponentErrorBoundary:React.FC<PropsWithChildren<{}>> = (props) => {
  const {
    children
  } = props;
  return (
    <ErrorBoundary FallbackComponent={OurFallbackComponent}>
      {children}
    </ErrorBoundary>
  );
}

const OurFallbackComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div>
      <details style={{ whiteSpace: 'pre-wrap' }}>
        {error.stack}
      </details>
      <div>Name:  {error.name}</div>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

export default ReactComponentErrorBoundary;
