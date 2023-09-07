import './card.css';

interface CarsProps {
    price: number,
    title: string,
    image: string
}

export function Card({ price, image, title }: CarsProps) {
    return (
      <div className="card">
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p><b>Valor:</b> {price}</p>
      </div>
    );
  }