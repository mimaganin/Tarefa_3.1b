<template>
  <b-card
    bg-variant="secondary"
    text-variant="white"
    :header="title.toUpperCase()"
    class="text-center mb-3 mb-sm-0"
  >
    <router-link
      :to="{ name: routeName }"
      :title="'Gerir ' + title.toLowerCase()"
      :aria-label="'Gerir ' + title.toLowerCase()"
    >
      <i :class="'fas fa-' + iconName + ' fa-5x'" aria-hidden="true"></i>
    </router-link>
  </b-card>
</template>

<script>
export default {
  name: "AdminOptionBox",
  props: ["routeName", "iconName", "title"]
};
</script>
