import React from 'react';
import { useAtom } from 'jotai';
import {
  countAtom,
  doubledCountAtom,
  sumOfCountAtom,
  sumOfCountAtom2,
  fetchUrlAtom,
  decrementCountAtom, multiplyCountAtom
} from "~/store/jotai/jotai_state";
import Button from "antd/lib/button";
import LoadingComponent from "~/components/loading/LoadingComponent";
import ReactComponentErrorBoundary from "~/components/errors/ReactComponentErrorBoundary";

function Status(){
  const [ json ] = useAtom(fetchUrlAtom);
  return (
    <div>
      <h3>{json}</h3>
    </div>
  );
}

export default function JotaiContainer(){
  const [ count, setCount ] = useAtom(countAtom);
  const [ doubleCount ] = useAtom(doubledCountAtom);
  const [ sumOfCount ] = useAtom(sumOfCountAtom);
  const [ sumOfCount2 ] = useAtom(sumOfCountAtom2);
  const [ _, decrementCount ] = useAtom(decrementCountAtom);
  const [ __, multiplyCount ] = useAtom(multiplyCountAtom);

  return (
    <div>
      <ReactComponentErrorBoundary>
        <React.Suspense fallback={<LoadingComponent />}>
          <Status />
        </React.Suspense>
      </ReactComponentErrorBoundary>
      <div>
        <h3>{count}</h3>
        <h3>{doubleCount}</h3>
        <h3>{sumOfCount}</h3>
        <h3>{sumOfCount2}</h3>
        <Button
          type={'primary'}
          onClick={() => setCount((oldCount) => oldCount + 1)}
          className={'upButton'}
        >
          one up
        </Button>
        <Button
          type={'primary'}
          onClick={() => setCount((oldCount) => oldCount - 1)}
          className={'upButton'}
        >
          one down
        </Button>
        <Button
          type={'primary'}
          onClick={decrementCount}
          className={'upButton'}
        >
          Decrease one
        </Button>
        <Button
          type={'primary'}
          onClick={() => multiplyCount(3)}
        >
          Multiply Count
        </Button>
      </div>
    </div>
  );
}
