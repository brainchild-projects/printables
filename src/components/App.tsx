import React, { lazy, Suspense } from 'react';

const AppWrapper = lazy(() => import('./AppWrapper'));

function Loading(): JSX.Element {
  return (
    <div>
      <img
        src="/logoV1Animated.svg"
        alt="Printables logo"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 240,
        }}
      />
    </div>
  );
}

function App(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <AppWrapper />
    </Suspense>
  );
}

export default App;
