import Icon from './Icon';

export default function Stars({ value = 0, size = 16 }) {
  return (
    <span className="stars" role="img" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => <Icon key={n} name="star" size={size} fill={n <= Math.round(value)} className={n <= Math.round(value) ? 'on' : ''} />)}
    </span>
  );
}
