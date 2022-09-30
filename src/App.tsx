import _ from 'lodash';
import { useState, useEffect } from 'react';
import { getAllData } from './store/actions/resources';
import { getResources } from './store/selectors/resources';
import { RESOURCE_NAME } from './utils/constants/resources';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const post = getResources(RESOURCE_NAME.POST);

  useEffect(() => {
    (async () => {
      await getAllData(RESOURCE_NAME.POST);
    })();
  }, []);

  useEffect(() => {
    if (_.isEmpty(post)) return;

    console.log(post);
  }, [post.rows]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
