import React from 'react';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ComparisonRow {
  feature: string;
  lowin: boolean;
  scanner: boolean;
  phone: boolean;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'early-bird';
  tokensUsed: number;
  tokensLimit: number;
  storageUsed: string; // e.g. "1.2 GB"
}

export type NoteType = 'text' | 'audio' | 'excerpt' | 'chat';

export interface Note {
  id: string;
  type: NoteType;
  bookTitle: string;
  date: string;
  tags: string[];
  
  // Content varies by type
  content: string; // Main text, Transcription, or OCR text
  originalImage?: string; // For excerpt
  audioUrl?: string; // For audio/chat
  audioDuration?: string; // e.g. "2:14"
  timestamps?: string[]; // Key timestamps
  
  userSubNotes?: string; // Extra notes added by user
  
  synced: boolean;
  exported?: boolean;
}

export interface Insight {
  id: string;
  title: string; // e.g. "Weekly Reading Report"
  content: string; // The AI generated summary/insight
  date: string; // Generation date
  sourceNoteCount: number; // How many notes were used
  dateRange: string; // e.g. "Oct 1 - Oct 7"
  tags: string[];
}