// contexts/MembersPopupContext.jsx
import React, { createContext, useContext, useState } from 'react';

const MembersPopupContext = createContext();

export const MembersPopupProvider = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedFamilyId, setSelectedFamilyId] = useState(null);

    const openPopup = (familyId) => {
        setSelectedFamilyId(familyId);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedFamilyId(null);
    };

    return (
        <MembersPopupContext.Provider value={{ isPopupOpen, selectedFamilyId, openPopup, closePopup }}>
            {children}
        </MembersPopupContext.Provider>
    );
};

export const useMembersPopup = () => useContext(MembersPopupContext);