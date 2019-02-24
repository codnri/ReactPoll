import React from "react";
import Poll from "./Components/Poll";
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Poll</h1>
        <Poll />
      </div>
    );
  }
}

export default App;
