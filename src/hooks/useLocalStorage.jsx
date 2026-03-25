import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Tenta buscar do localStorage
      const item = window.localStorage.getItem(key);
      // Se existir, retorna o valor parseado, senão retorna o valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Erro ao ler localStorage:", error);
      return initialValue;
    }
  });

  // Função para atualizar o valor no estado e no localStorage
  const setValue = (value) => {
    try {
      // Permite que value seja uma função (igual ao setState)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
