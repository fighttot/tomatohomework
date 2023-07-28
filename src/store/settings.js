// Utilities
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    alarms: [
      { id: 1, name: '立花響', file: new URL('@/assets/a2.mp3', import.meta.url).href, img: new URL('@/assets/gx14.jpg', import.meta.url).href, color: '#E65100' },
      { id: 2, name: '風鳴翼', file: new URL(`@/assets/a5.mp3`, import.meta.url).href, img: new URL('@/assets/gx15.jpg', import.meta.url).href, color: '#2962FF' },
      { id: 3, name: '雪音克莉絲', file: new URL(`@/assets/a3.mp3`, import.meta.url).href, img: new URL('@/assets/gx16.jpg', import.meta.url).href, color: '#D50000' },
      { id: 4, name: '瑪麗亞', file: new URL(`@/assets/a4.mp3`, import.meta.url).href, img: new URL('@/assets/gx17.jpg', import.meta.url).href, color: '#B0BEC5' },
      { id: 5, name: '曉切歌', file: new URL(`@/assets/a1.mp3`, import.meta.url).href, img: new URL('@/assets/gx18.jpg', import.meta.url).href, color: '#00C853' },
      { id: 6, name: '月讀調', file: new URL(`@/assets/a6.mp3`, import.meta.url).href, img: new URL('@/assets/gx19.jpg', import.meta.url).href, color: '#F06292' }
    ],
    selectedAlarm: 1,
    notify: false
  }),
  getters: {
    selectsdAlarmFile() {
      const i = this.alarms.findIndex(alarm => alarm.id === this.selectedAlarm)
      return this.alarms[i].file
    },
    selectsdImg() {
      const i = this.alarms.findIndex(alarm => alarm.id === this.selectedAlarm)
      return this.alarms[i].img
    }
  },
  persist: {
    key: 'tothome-settings',
    paths: [
      'selectedAlarm', 'notify'
    ]
  }
})


