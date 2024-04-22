import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { showSuccessToast, showErrorToast } from '../../Utils/Notification';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { listarEvento } from '../../../service/eventoService';
import ModalReservas from './ModalReservas';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');
const today = dayjs();

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const StyledDateCalendar = styled(DateCalendar)({
    '& .css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel': {
        fontSize: '16px'
    },
    '& .css-dplwbx-MuiPickersCalendarHeader-label': {
        fontSize: '20px',
        fontWeight: 600
    },
    '& .css-1u23akw-MuiButtonBase-root-MuiPickersDay-root.Mui-selected': {
        backgroundColor: '#BCC0CF',
        fontWeight: 600,
        color: '#0D1327'
    },'& .css-1u23akw-MuiButtonBase-root-MuiPickersDay-root.Mui-selected:hover': {
      backgroundColor: '#BCC0CF',
      fontWeight: 600,
      color: '#0D1327'
    }
});

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

export default function DateCalendarServerRequest({formData}) {
  const [openModal, setOpenModal] = useState(false);
  const [locale, setLocale] = useState('pt-br');
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
  const [selectedDay, setSelectedDay] = useState(null);

  function handleOpenModal(day) {
    setSelectedDay(day);
    setOpenModal(true);
  }

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, eventos } = props;
  
    const isSelected = !props.outsideCurrentMonth && highlightedDays.includes(props.day.date());
    
    // Verificar se há algum evento na data do dia
    const hasEventOnDay = eventos && eventos.some(evento => {
      const dataEvento = dayjs(evento.dataEvento, 'YYYY-MM-DD');
      return dataEvento.isValid() && dataEvento.isSame(day, 'day');
    });
  
    const handleDayClick = () => {
      const hasEventOnDay = eventos.some(evento => {
        const dataEvento = dayjs(evento.dataEvento, 'YYYY-MM-DD');
        return dataEvento.isValid() && dataEvento.isSame(day, 'day');
      });
    
      if (hasEventOnDay) {
        handleOpenModal(day);
      }
    };
    
    // Renderizar diretamente o PickersDay se não houver eventos disponíveis
    if (!eventos || eventos.length === 0) {
      return <PickersDay {...props} outsideCurrentMonth={outsideCurrentMonth} day={day} style={{ fontSize: '16px' }} />;
    }
  
    return (
      <Badge
        key={props.day.toString()}
        style={{ fontSize: '16px' }}
        overlap="circular"
        badgeContent={hasEventOnDay ? <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red' }}></div> : undefined}
        onClick={() => handleDayClick(props.eventos.find(evento => {
          const dataEvento = dayjs(evento.dataEvento, 'YYYY-MM-DD');
          return dataEvento.isValid() && dataEvento.isSame(props.day, 'day');
        }))}
      >
        <PickersDay {...props} outsideCurrentMonth={outsideCurrentMonth} day={day} style={{ fontSize: '16px' }} />
      </Badge>
    );
  }

  useEffect(() => {
    if (formData) {
      setEventos(prevEventos => [...prevEventos, formData]);
    }
  }, [formData]);
  
  useEffect(() => {
    
    const fetchData = async () => {
      const listaEventos = await listarEvento();
      setEventos(listaEventos);
    };
    
    fetchData();
  }, []);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  // React.useEffect(() => {
  //   fetchHighlightedDays(initialValue);
  //   return () => requestAbortController.current?.abort();
  // }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <StyledDateCalendar
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
            eventos,
          },
        }}
      />
      <ModalReservas open={openModal} onClose={() => setOpenModal(false)} dataEvento={selectedDay} />
    </LocalizationProvider>
  );
}