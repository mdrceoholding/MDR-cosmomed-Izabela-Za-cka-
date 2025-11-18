import axios from 'axios';
import type { User, Session, Journal, MedicalConsent, GroupSession } from '../types';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
    phone?: string;
    language?: string;
  }) => api.post('/auth/register', data),

  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  getMe: () => api.get<{ success: boolean; data: User }>('/auth/me'),

  updateDetails: (data: Partial<User>) =>
    api.put('/auth/updatedetails', data),

  updatePassword: (currentPassword: string, newPassword: string) =>
    api.put('/auth/updatepassword', { currentPassword, newPassword }),
};

// Session API
export const sessionAPI = {
  create: (data: Partial<Session>) => api.post('/sessions', data),

  update: (id: string, data: Partial<Session>) =>
    api.put(`/sessions/${id}`, data),

  getAll: (params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }) => api.get<{ success: boolean; data: Session[]; count: number }>('/sessions', { params }),

  getOne: (id: string) =>
    api.get<{ success: boolean; data: Session }>(`/sessions/${id}`),

  getStats: () => api.get('/sessions/stats/summary'),

  emergencyStop: (id: string, reason?: string) =>
    api.post(`/sessions/${id}/emergency-stop`, { reason }),
};

// Journal API
export const journalAPI = {
  create: (data: Partial<Journal>) => api.post('/journals', data),

  update: (id: string, data: Partial<Journal>) =>
    api.put(`/journals/${id}`, data),

  getAll: (params?: {
    sessionId?: string;
    startDate?: string;
    endDate?: string;
    emotions?: string[];
    limit?: number;
    offset?: number;
  }) => api.get<{ success: boolean; data: Journal[]; count: number }>('/journals', { params }),

  getOne: (id: string) =>
    api.get<{ success: boolean; data: Journal }>(`/journals/${id}`),

  delete: (id: string) => api.delete(`/journals/${id}`),

  getInsights: () => api.get('/journals/insights/patterns'),
};

// Medical Consent API
export const medicalConsentAPI = {
  create: (data: Partial<MedicalConsent>) =>
    api.post('/medical-consent', data),

  get: () =>
    api.get<{ success: boolean; data: MedicalConsent }>('/medical-consent'),

  update: (id: string, data: Partial<MedicalConsent>) =>
    api.put(`/medical-consent/${id}`, data),

  revoke: (id: string) => api.delete(`/medical-consent/${id}`),
};

// Facilitator API
export const facilitatorAPI = {
  createGroupSession: (data: Partial<GroupSession>) =>
    api.post('/facilitator/group-sessions', data),

  getGroupSessions: (params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => api.get<{ success: boolean; data: GroupSession[] }>('/facilitator/group-sessions', { params }),

  getGroupSession: (id: string) =>
    api.get<{ success: boolean; data: GroupSession }>(`/facilitator/group-sessions/${id}`),

  updateGroupSession: (id: string, data: Partial<GroupSession>) =>
    api.put(`/facilitator/group-sessions/${id}`, data),

  getDashboard: (id: string) =>
    api.get(`/facilitator/group-sessions/${id}/dashboard`),

  updateParticipant: (id: string, data: any) =>
    api.put(`/facilitator/participants/${id}`, data),

  sendMessage: (groupSessionId: string, message: string, recipientType: string) =>
    api.post(`/facilitator/group-sessions/${groupSessionId}/message`, {
      message,
      recipientType,
    }),
};

export default api;
