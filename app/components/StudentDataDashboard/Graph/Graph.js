import React from 'react';
import styles from './styles.css';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import { getFormattedData } from './dataFormattedHelper.js';

/*
* Child comoponent of StudentData.
* This component is in charge of drawing/rendering the graph in the UI.
* The componet uses a helper in order to format the data from the server to the appropiate structure in order to graph it.
*
* <ResponsiveContainer>, <LineChart>, <Line>, <XAxis>, <YAxis>, <CartesianGrid>, <Tooltip>, <Legend>
*   are imported from package recharts/lib. **See more at http://recharts.org/**.
*/
export default class Graph extends React.PureComponent {
  render() {
    const data = this.props.studentData;
    const formattedData = getFormattedData(data); // call dataFormattedHelper.js to proparley format the data in order to graph it.
    console.log(formattedData);

    return (
      // 99% per https://github.com/recharts/recharts/issues/172
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={formattedData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Respond"
            stroke="#7E57C2"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Perform"
            stroke="#FF7043"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Create"
            stroke="#D4E157"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="Connect"
            stroke="#42A5F5"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
