import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCalendar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { mockCalendarEvents } from '../data/mockData';
import { CalendarEvent, EventType } from '../types';
import toast from 'react-hot-toast';

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    type: 'custom' as EventType,
    color: '#8b5cf6',
  });

  const eventTypeOptions = [
    { value: 'wza', label: 'WZA', color: '#ef4444' },
    { value: 'payment_deadline', label: 'Termin wpłaty', color: '#3b82f6' },
    { value: 'document_deadline', label: 'Deadline dokumentu', color: '#f59e0b' },
    { value: 'dividend_payment', label: 'Wypłata dywidendy', color: '#22c55e' },
    { value: 'custom', label: 'Niestandardowe', color: '#8b5cf6' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      type: formData.type,
      color: formData.color,
      reminders: [7, 1],
      createdBy: '1',
    };

    setEvents([...events, newEvent]);
    setShowModal(false);
    setFormData({ title: '', description: '', date: '', type: 'custom', color: '#8b5cf6' });
    toast.success('Wydarzenie zostało dodane');
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  const dayNames = ['Ndz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Kalendarz</h1>
          <p className="text-slate-400">Zarządzaj wydarzeniami i terminami</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Nowe wydarzenie
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={prevMonth} className="btn-secondary">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h2 className="text-2xl font-bold text-white min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button onClick={nextMonth} className="btn-secondary">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'month' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              Miesiąc
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'week' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              Tydzień
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="card">
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div key={day} className="text-center font-semibold text-slate-300 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells before first day */}
          {Array.from({ length: startingDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayEvents = getEventsForDate(date);
            const isToday =
              date.toDateString() === new Date().toDateString();

            return (
              <div
                key={day}
                className={`aspect-square border border-slate-700 rounded-lg p-2 ${
                  isToday ? 'bg-blue-900 bg-opacity-20 border-blue-500' : ''
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${
                  isToday ? 'text-blue-400' : 'text-slate-300'
                }`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: event.color + '40', color: event.color }}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-slate-400">+{dayEvents.length - 2} więcej</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="card">
        <h2 className="text-xl font-semibold text-white mb-4">Nadchodzące wydarzenia</h2>
        <div className="space-y-3">
          {events
            .filter(e => new Date(e.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 10)
            .map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-4 p-4 rounded-lg bg-slate-700"
              >
                <div
                  className="w-3 h-3 rounded-full mt-1.5"
                  style={{ backgroundColor: event.color }}
                />
                <div className="flex-1">
                  <h3 className="text-white font-medium">{event.title}</h3>
                  <p className="text-slate-400 text-sm">{event.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-slate-500 text-sm">
                      <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                      {new Date(event.date).toLocaleDateString('pl-PL')}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-slate-600 text-slate-300">
                      {eventTypeOptions.find(t => t.value === event.type)?.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-4">Nowe wydarzenie</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2">Tytuł</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Opis</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input w-full"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Data</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2">Typ wydarzenia</label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    const type = e.target.value as EventType;
                    const color = eventTypeOptions.find(opt => opt.value === type)?.color || '#8b5cf6';
                    setFormData({ ...formData, type, color });
                  }}
                  className="input w-full"
                >
                  {eventTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3">
                <button type="submit" className="btn-primary flex-1">
                  Dodaj wydarzenie
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Anuluj
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
