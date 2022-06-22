import './styles.css';

import { useState } from 'react';

import { Period } from '../../services/api';

type PeriodControlProps = {
  setPeriod: React.Dispatch<React.SetStateAction<Period>>;
};

function PeriodControl({ setPeriod }: PeriodControlProps) {
  const [selected, setSelected] = useState('day');

  function handleClick(period: Period) {
    setPeriod(period);
    setSelected(period);
  }

  return (
    <div className="period-control-wrapper">
      <ul className="period-control">
        <li>
          <input
            type="radio"
            name="hour"
            id="hour"
            className="period"
            checked={selected === 'hour'}
            value="hour"
            onChange={event => handleClick(event.currentTarget.value as Period)}
          />
          <label htmlFor="hour">1 H</label>
        </li>

        <li>
          <input
            type="radio"
            name="day"
            id="day"
            className="period"
            checked={selected === 'day'}
            value="day"
            onChange={event => handleClick(event.currentTarget.value as Period)}
          />
          <label htmlFor="day">1 D</label>
        </li>

        <li>
          <input
            type="radio"
            name="week"
            id="week"
            className="period"
            checked={selected === 'week'}
            value="week"
            onChange={event => handleClick(event.currentTarget.value as Period)}
          />
          <label htmlFor="week">1 W</label>
        </li>

        <li>
          <input
            type="radio"
            name="month"
            id="month"
            className="period"
            checked={selected === 'month'}
            value="month"
            onChange={event => handleClick(event.currentTarget.value as Period)}
          />
          <label htmlFor="month">1 M</label>
        </li>

        <li>
          <input
            type="radio"
            name="year"
            id="year"
            className="period"
            checked={selected === 'year'}
            value="year"
            onChange={event => handleClick(event.currentTarget.value as Period)}
          />
          <label htmlFor="year">1 Y</label>
        </li>

        <li>
          <input
            type="radio"
            name="all"
            id="all"
            className="period"
            checked={selected === 'all'}
            value="all"
            onChange={event => handleClick(event.currentTarget.value as Period)}
          />
          <label htmlFor="all">All</label>
        </li>
      </ul>
    </div>
  );
}

export default PeriodControl;
