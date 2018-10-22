import React from "react";
import ReactDOM from "react-dom";

import Button from './components/Button';

const App = () => {
  return (
    <React.Fragment>
      <div>Hello React!!</div>
      <Button />
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));