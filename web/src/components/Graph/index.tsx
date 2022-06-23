import './styles.css';

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { History } from '../../App';
import { Period } from '../../services/api';
import intervalFormatter from '../../util/intervalFormatter';
import tickFormatter from '../../util/tickFormatter';
import timeFormatter from '../../util/timeFormatter';
import ScreenshotButton from '../ScreenshotButton';

type GraphProps = {
  data: History[];
  period: Period;
};

function CustomTooltip(props: any) {
  const { active, period, payload } = props;

  if (active && payload) {
    const [
      {
        payload: { time, price },
      },
    ] = payload;

    return (
      <div>
        <p>
          {price} {timeFormatter(time, period)}
        </p>
      </div>
    );
  }

  return null;
}

function Graph({ data, period }: GraphProps) {
  return (
    <div className="graph-container">
      <ScreenshotButton />
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ left: 25 }}>
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="15%" stopColor="#82ca9d" stopOpacity={0.1} />
              <stop offset="90%" stopColor="#2f3235" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            type="number"
            scale="time"
            interval={intervalFormatter(data.length, 6)}
            domain={['auto', 'auto']}
            tickFormatter={value => tickFormatter(value, period)}
            tick={{ fill: '#9aa0a6' }}
            dy={5}
          />
          <YAxis
            domain={['auto', 'auto']}
            padding={{ top: 15, bottom: 15 }}
            tick={{ fill: '#9aa0a6' }}
            dx={-10}
          />
          <Tooltip
            content={<CustomTooltip period={period} />}
            cursor={{ stroke: '#2f3235', strokeWidth: 2 }}
          />
          <CartesianGrid vertical={false} stroke="#2f3235" />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#82ca9d"
            dot={false}
            activeDot={{
              fill: '#82ca9d',
              strokeWidth: 0,
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="false"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#area-fill)"
            activeDot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
