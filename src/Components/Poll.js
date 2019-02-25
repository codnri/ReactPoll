import React from "react";
import { Bar, HorizontalBar } from "react-chartjs-2";

class Poll extends React.Component {
  // createBarChart = () => {
  //   const labels = this.state.items.map(el => el.name);
  //   const data = this.state.items.map(el => el.votes);
  //   console.log(this.state);
  // };
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedOption: ""
    };
  }
  componentWillMount() {
    this.setState({
      items: [
        { name: "Scrabble" },
        { name: "Monopoly" },
        { name: "Catan" },
        { name: "Qwirkle" },
        { name: "Risk" }
      ]
    });
  }
  componentDidMount() {
    // For Test Purpose
    this.addNumVotes();
    // this.createBarChart();
  }

  addNumVotes = () => {
    // console.log("-----");

    this.setState({
      items: this.state.items.map(item => {
        item["votes"] = 0;
        return item;
      })
    });
    // this.setState({ items: items.map(item => (item.votes = 0))})
    // console.log(items);
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    console.log("You have selected:", this.state.selectedOption);
    let items = JSON.parse(JSON.stringify(this.state.items));
    let item = items.filter(item => item.name == this.state.selectedOption)[0];
    // console.log(item);
    item.votes += 1;
    console.log(items);
    this.setState({ items });
    // this.createBarChart();
  };
  render() {
    const { items } = this.state;
    const data = {
      labels: items.map(item => item.name),
      datasets: [
        {
          // label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: items.map(item => item.votes)
          // data: [3,5,1,7,9],
        }
      ]
    };
    const options = {
      // type: "horizontalBar",
      beginAtZero: true,
      stepSize: 1,
      maintainAspectRatio: true,
      responsive: true,
      animation: {
        animateScale: true
      },
      scales: {
        xAxes: [
          {
            barThickness: 20
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function(value) {
                if (Number.isInteger(value)) {
                  return value;
                }
              },
              stepSize: 1
            }
          }
        ]
      },

      legend: { display: false }
    };
    return (
      <div className="Poll">
        <h2>Which games would you like to play?</h2>
        <div style={{ width: "90%", margin: "0 auto" }}>
          <Bar data={data} options={options} />

          <div className="poll-input">
            <form onSubmit={this.handleFormSubmit}>
              <div className="radios">
                {this.state.items.map((item, idx) => (
                  <div key={idx} className="radio">
                    <label>
                      <input
                        type="radio"
                        value={item.name}
                        checked={this.state.selectedOption === item.name}
                        onChange={this.handleOptionChange}
                      />
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <button className="btn btn-default submit" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Poll;
