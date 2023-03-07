import React, { useState, useEffect } from 'react';
import { format, differenceInCalendarDays  } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DayPicker, Modifier, Row, RowProps } from 'react-day-picker';
import '../styles/DayInput.css';

interface Props {
  onDaysSelected: (days: string[]) => void;
}

export default function Example({ onDaysSelected }: Props) {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  console.log(selectedDays);
  

  function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function handleDaysSelected():void {
    const formated = selectedDays.map(day => format(day, 'dd/MM/yyyy'));
    onDaysSelected(formated);
  }
  
  useEffect(() => {
    handleDaysSelected();
  }, [selectedDays]);

  return (
    <div>
      <DayPicker
        locale={ptBR}
        mode="multiple"
        selected={selectedDays}
        min={1}
        max={30}
        dateFormat={'dd/MM/yyyy'}
        onSelect={setSelectedDays}
        modifiersClassNames={{
          selected: 'my-selected',
          today: 'my-today'
        }}
        modifiersStyles={{
          disabled: { fontSize: '75%' }
        }}
        fromDate={new Date()}
        hidden={isPastDate}
      />
      {selectedDays.length > 0 && (
        <div className="DayPicker__footer">
          Você selecionou os dias {selectedDays.map(day => format(day, 'dd/MM/yyyy')).join(', ')}
        </div>
      )}
    </div>
  );
}
