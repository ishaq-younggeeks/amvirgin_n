import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Chart extends Component {
  state = {
    chartData: {
      labels: [
        "New Delhi",
        "Kolkata",
        "Mumbai",
        "Chennai",
        "Lucknow",
        "Banglore"
      ],
      datasets: [
        {
          label: "Population",
          data: [257803, 4496694, 12478447, 7088000, 2902920, 8443675],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ]
        }
      ]
    }
  };

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "bottom"
  };

  render() {
    return (
      <Bar
        data={this.state.chartData}
        options={{
          title: {
            display: this.props.displayTitle,
            text: "Largest Cities in India",
            fontSize: 25
          },
          legend: {
            display: this.props.displayLegend,
            position: this.props.legendPosition
          }
        }}
      />
    );
  }
}

export default Chart;
