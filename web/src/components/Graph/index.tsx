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
import isDeviceMobile from '../../util/isDeviceMobile';
import numberFormatter from '../../util/numberFormatter';
import periodFormatter from '../../util/periodFormatter';
import tickFormatter from '../../util/tickFormatter';
import ScreenshotButton from '../ScreenshotButton';

const POINTS = 6;

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
      <div className="tooltip">
        <p>{numberFormatter(price, 2, true)}</p>
        <p>{periodFormatter(time, period)}</p>
      </div>
    );
  }

  return null;
}

function Graph({ data, period }: GraphProps) {
  const amountOfPoints = isDeviceMobile() ? Math.trunc(POINTS / 2) : POINTS;

  return (
    <div className="graph-container">
      <ScreenshotButton />
      <ResponsiveContainer className="graph">
        <ComposedChart data={data} margin={{ left: 25 }}>
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="15%"
                stopColor="var(--primaryGraph)"
                stopOpacity={0.1}
              />
              <stop
                offset="90%"
                stopColor="var(--primaryBg)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            type="number"
            scale="time"
            interval={intervalFormatter(data.length, amountOfPoints)}
            domain={['auto', 'auto']}
            tickFormatter={value => tickFormatter(value, period)}
            tick={{ fill: 'var(--secondaryText)' }}
            dy={5}
          />
          <YAxis
            domain={['auto', 'auto']}
            padding={{ top: 15, bottom: 15 }}
            tick={{ fill: 'var(--secondaryText)' }}
            dx={-10}
            tickFormatter={value => numberFormatter(value, 2, true) as string}
          />
          <Tooltip
            content={<CustomTooltip period={period} />}
            cursor={{ stroke: '#2f3235', strokeWidth: 2 }}
          />
          <CartesianGrid vertical={false} stroke="#2f3235" />
          <Line
            type="monotone"
            dataKey="price"
            stroke="var(--primaryGraph)"
            dot={false}
            activeDot={{
              fill: 'var(--primaryGraph)',
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
