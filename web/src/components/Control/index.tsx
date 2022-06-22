import './styles.css';

type ControlProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  type: 'cryptocurrency' | 'currency';
  contents: string[];
};

function Control({
  type,
  value,
  setValue,
  currency,
  setCurrency,
  contents,
}: ControlProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    setValue(Number(event.target.value));
  }

  return (
    <div className="control-wrapper">
      <input
        type="number"
        name={`${type}-value`}
        className="currency-value-input"
        value={value}
        min={1}
        onChange={event => handleChange(event)}
      />

      <select
        name={`${type}`}
        id={`${type}`}
        className="currency-selector"
        value={currency}
        onChange={event => setCurrency(event.currentTarget.value)}
      >
        {contents.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Control;
