import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");

  // Converte os dados da API para o formato do calendário
  const converterEventos = (eventos) => {
    return eventos.map(evento => {
      const [ano, mes, dia] = evento.data.split("-").map(Number);
      const [horaInicio, minutoInicio] = evento.inicio.split(":").map(Number);
      const [horaFim, minutoFim] = evento.fim.split(":").map(Number);

      return {
        title: evento.titulo,
        start: new Date(ano, mes - 1, dia, horaInicio, minutoInicio),
        end: new Date(ano, mes - 1, dia, horaFim, minutoFim),
      };
    });
  };

  // Busca os dados da API ao montar o componente
  useEffect(() => {
    fetch("http://localhost:8080/agendamento/calendario")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na resposta da API: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dados recebidos da API:", data); // 👈 Log dos dados crus
        const eventosConvertidos = converterEventos(data);
        console.log("Eventos convertidos:", eventosConvertidos); // 👈 Log após conversão
        setEvents(eventosConvertidos);
      })
      .catch((err) => {
        console.error("Erro ao buscar eventos:", err);
      });
  }, []);

  return (
    <div style={{ height: "100vh", padding: 20 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day", "agenda"]}
        view={view}
        onView={(novaView) => setView(novaView)}
        defaultDate={new Date(2025, 5, 27)}
        onSelectEvent={(event) =>
          alert(`Evento: ${event.title}\nInício: ${event.start.toLocaleString()}\nFim: ${event.end.toLocaleString()}`)
        }
      />
    </div>
  );
};

export default Calendario;
