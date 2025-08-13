import { useState, useCallback } from "react";

export function useExperiencia() {
  const [showInicio, setShowInicio] = useState(false);
  const [showFlujo, setShowFlujo] = useState(false);
  const [showPueblo, setShowPueblo] = useState(false);
  const [categoria, setCategoria] = useState(null);
  const [subcategoria, setSubcategoria] = useState(null);
  const [destino, setDestino] = useState(null);
  const [seleccionFinal, setSeleccionFinal] = useState(null);

  const handleSelect = useCallback((categoriaSeleccionada, lugar) => {
    setCategoria(categoriaSeleccionada);
    setDestino(lugar);
    setShowInicio(false);

    if (categoriaSeleccionada === "pueblos" && !lugar) {
      setShowPueblo(true);
    } else {
      setShowFlujo(true);
    }
  }, []);

  const handleCerrarFlujo = useCallback(() => {
    setShowFlujo(false);
    setShowPueblo(false);
    setCategoria(null);
    setSeleccionFinal(null);
    setSubcategoria(null);
    setDestino(null);
  }, []);

  const handleVolver = useCallback(() => {
    setShowFlujo(false);
    setShowPueblo(false);
    setShowInicio(true);
  }, []);

  const handleNext = useCallback(({ subcategoria }) => {
    setSubcategoria(subcategoria);

    if (subcategoria === "pueblos magicos") {
      setCategoria("pueblosMagicos");
    } else if (categoria === "playas") {
      setCategoria("playas");
    } else {
      setCategoria("pueblos");
    }

    setSeleccionFinal(subcategoria);
    setShowPueblo(false);
    setShowFlujo(true);
  }, [categoria]);

  return {
    // Estados
    showInicio,
    showFlujo,
    showPueblo,
    categoria,
    subcategoria,
    destino,
    seleccionFinal,

    // Setters directos
    setShowInicio,

    // Métodos
    handleSelect,
    handleCerrarFlujo,
    handleVolver,
    handleNext,
  };
}
