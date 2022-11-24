<template>
  <router-link :to="{ name: 'home' }" :class="['sidebar-brand', 'd-flex', 'align-items-center', 'justify-content-center']">
    <div class="sidebar-brand-icon rotate-n-15">
      <i class="fas fa-clock"></i>
    </div>
    <div class="sidebar-brand-text mx-3">Timetable</div>
  </router-link>
</template>