<template>
  <v-container>
    <v-row>

      <v-col cols="6">
        <h1>通知</h1>
      </v-col>

      <v-col cols="6">
        <v-radio-group v-model="settings.notify" inline>
          <v-radio label="開啟" :value="true"></v-radio>
          <v-radio label="關閉" :value="false"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col cols="12">
        <h1>設定</h1>
      </v-col>

      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th>名稱</th>
              <th>預覽</th>
              <th>試聽</th>
              <th>選擇</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="alarm in  settings.alarms " :key="alarm.id" :style="`background-color: ${alarm.color};`">
              <td>
                {{ alarm.name }}
              </td>
              <td>
                <v-img :src="alarm.img" :height="100" aspect-ratio="16/9" cover></v-img>
              </td>
              <td>
                <audio :src="alarm.file" controls></audio>
              </td>
              <td>
                <v-radio-group v-model="selectedAlarm">
                  <v-radio :value="alarm.id" style="color: black;"></v-radio>
                </v-radio-group>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
import { useSettingsStore } from '@/store/settings';
import { storeToRefs } from 'pinia';
const settings = useSettingsStore()
// const { selectedAlarm } = settings
const { selectedAlarm } = storeToRefs(settings)
</script>