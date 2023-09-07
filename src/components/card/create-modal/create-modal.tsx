import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../../hooks/useFoodDataMutate';
import { FoodData } from '../../../interface/FoodData';
import './modal.css';

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: any): void
}

interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={(event) => updateValue(event.target.value)} />
    </div>
  );
};

export function CreateModal({ closeModal }: ModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const { mutate, isSuccess, isLoading } = useFoodDataMutate();

  const submit = async () => {
    const foodData: FoodData = {
      title,
      price,
      image,
    };

    try {
      // Execute a lógica de envio aqui usando 'mutate' ou outra lógica de postagem.
      await mutate(foodData);

      // Se a postagem for bem-sucedida, você pode fechar o modal e limpar os campos do formulário.
      closeModal();
      setTitle("");
      setPrice(0);
      setImage("");
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      // Trate erros de envio de forma adequada, como exibir uma mensagem de erro para o usuário.
    }
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess]);
  return(
    <div className="modal-overlay">
        <div className="modal-body">
            <h2>Cadastre um novo item no cardápio</h2>
            <form className="input-container">
                <Input label="title" value={title} updateValue={setTitle}/>
                <Input label="price" value={price} updateValue={setPrice}/>
                <Input label="image" value={image} updateValue={setImage}/>
            </form>
            <button onClick={submit} className="btn-secondary">
                {isLoading ? 'postando...' : 'postar'}
            </button>
        </div>
    </div>
)
}