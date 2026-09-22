/**
 * EdgeAyu Local Data Storage Service
 * Encapsulates LocalStorage operations for patient records.
 * Prepared for future migration to IndexedDB or local SQLite database.
 */

import { INITIAL_DEMO_RECORDS } from '../data/mockData';

const STORAGE_KEY = 'edgeayu_records';

export const storageService = {
  getRecords: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
        return INITIAL_DEMO_RECORDS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn("Storage read error:", e);
      return INITIAL_DEMO_RECORDS;
    }
  },

  getRecord: (id) => {
    const records = storageService.getRecords();
    return records.find((r) => r.id === id) || records[0];
  },

  saveRecord: (newRecord) => {
    try {
      const records = storageService.getRecords();
      const existingIdx = records.findIndex((r) => r.id === newRecord.id);
      
      let updated;
      if (existingIdx >= 0) {
        updated = [...records];
        updated[existingIdx] = newRecord;
      } else {
        updated = [newRecord, ...records];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Storage save error:", e);
      return [];
    }
  },

  deleteRecord: (id) => {
    try {
      const records = storageService.getRecords();
      const updated = records.filter((r) => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error("Storage delete error:", e);
      return [];
    }
  },

  clearRecords: () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
      return INITIAL_DEMO_RECORDS;
    } catch (e) {
      console.error("Storage clear error:", e);
      return INITIAL_DEMO_RECORDS;
    }
  }
};
