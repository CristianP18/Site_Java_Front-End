import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { CreateModal } from './components/card/create-modal/create-modal';
import { useFoodData } from './hooks/useFoodData';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false); // Fixed the typo here

  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev); // Fixed the typo here
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData => (
          <Card
            key={foodData.id}
            price={foodData.price}
            title={foodData.title} // Fixed the typo here
            image={foodData.image}
          />
        ))}
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button onClick={handleOpenModal}>Novo</button> {/* Added onClick handler */}
      </div>
    </div>
  );
}

export default App;
