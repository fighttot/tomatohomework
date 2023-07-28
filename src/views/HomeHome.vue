<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1>{{ currentText }}</h1>
        <h1>{{ currentTime }}</h1>
      </v-col>
      <v-col cols="12">
        <v-btn @click="up">上一首</v-btn>
        <v-img :src="settings.selectsdImg" :height="350" :width="350" cover
          style="display: inline-block; border-radius: 45%;"></v-img>
        <v-btn @click="down">下一首</v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn variant="text" v-if="status !== STATUS.COUNTING" icon="mdi-play" @click="startTimer"> </v-btn>
        <v-btn variant="text" v-if="status === STATUS.COUNTING" icon="mdi-pause" @click="pauseTimer"> </v-btn>
        <v-btn variant="text" v-if="currentItem.length > 0" icon="mdi-skip-next" @click="finishTimer"> </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useListStore } from '@/store/List';
import { useSettingsStore } from '@/store/settings';
import { useWebNotification } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';

const list = useListStore()
const { items, currentItem, timeleft } = storeToRefs(list)
const settings = useSettingsStore()

const STATUS = {
  STOP: 0,
  COUNTING: 1,
  PAUSE: 2
}
const status = ref(STATUS.STOP)

let timer = 0

const startTimer = () => {
  if (status.value === STATUS.STOP && items.value.length > 0) {
    list.setCurrentItem()
  }
  if (currentItem.value.length === 0) return

  status.value = STATUS.COUNTING
  timer = setInterval(() => {
    list.countdown()
    if (timeleft.value === 0) {
      finishTimer()
    }
  }, 1000)
}

const pauseTimer = () => {
  status.value = STATUS.PAUSE
  clearInterval(timer)
}

const finishTimer = () => {
  clearInterval(timer)
  status.value = STATUS.STOP

  const audio = new Audio()
  audio.src = settings.selectsdAlarmFile
  audio.play()

  if (settings.notify) {
    const { show } = useWebNotification({
      title: '事項完成',
      body: currentText.value,
      icon: settings.selectsdImg
    })
    show()
  }


  list.setFinishItem()

  if (items.value.length > 0) {
    startTimer()
  }
}

const currentText = computed(() => {
  return currentItem.value.length > 0 ? currentItem.value : items.value.length > 0 ? '點擊開始' : '沒有事項'
})

const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})

const up = () => {
  if (settings.selectedAlarm > 1) {
    settings.selectedAlarm--
  } else {
    settings.selectedAlarm = 6
  }
}
const down = () => {
  if (settings.selectedAlarm < 6) {
    settings.selectedAlarm++
  } else {
    settings.selectedAlarm = 1
  }
}
</script>
