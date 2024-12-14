import React, { createContext, useContext, useState } from 'react';

export const PokemonModalContext = createContext();

export const usePokemonModal = () => {
    return useContext(PokemonModalContext);
};

export const PokemonModalProvider = ({ children }) => { //componente hijo 
    const [modal, setModal] = useState({ isOpen: false, pokemon: null });

    const value = {
        currentPokemon: modal.pokemon,
        openModal: (pokemon) => setModal({ isOpen: true, pokemon }), // indica si el modal esta abierto o cerrado 
        isModalOpen: modal.isOpen,
        closeModal: () => setModal((prev => ({ ...prev, isOpen: false }))),
    };

    return (
        <PokemonModalContext.Provider value={ value }>
            { children }
        </PokemonModalContext.Provider> //renderizado del proveedor 
    );
};
