<template>
  <v-app>
    <v-app-bar>
      <v-container class="d-flex align-center">
        <v-app-bar-title>絕唱番茄鐘</v-app-bar-title>
        <v-btn prepend-icon="mdi-home" to="/">首頁</v-btn>
        <v-btn prepend-icon="mdi-format-list-bulleted" to="/List">事項</v-btn>
        <v-btn prepend-icon="mdi-cog" to="/Settings">設定</v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view v-slot="{ Component }">
        <keep-alive include="HomeHome">
          <component :is="Component">
          </component>
        </keep-alive>

      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { VApp } from 'vuetify/lib/components/index.mjs';


</script>
