import { useEffect, useState } from "react";
import "../css/popup/padraoPopup.css";

export default function Popup({children}) {
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    // Ativa a classe "ativo" após o render
    const timeout = setTimeout(() => setAnimar(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="popup-overlay">
      <div className={`popup ${animar ? "ativo" : ""}`}>
        {children}
      </div>
    </div>
  );
}
