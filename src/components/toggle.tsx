import React from "react";
import styled from "styled-components";
import { MainList } from "./MainList";

// export const ToggleItem = () => {
//   function toggleVis(e) {
//     e;
//   }
//   return <div>C</div>;
// };

export class Toggle extends React.Component {
  state = {
    on: false,
  };

  toggle = () => {
    this.setState({
      on: !this.state.on,
    });
  };
  render() {
    return (
      <div>
        {this.state.on && this.props.children}
        <button onClick={this.toggle}>show/hide</button>;
      </div>
    );
  }
}
