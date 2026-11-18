<template>
  <b-container>
    <b-row class="text-center">
      <b-col>
        <h2 class="page-section-heading mt-5">{{title.toUpperCase()}}</h2>
      </b-col>
    </b-row>
    <b-row class="text-center">
      <b-col>
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="divider-custom-line"></div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "HeaderPage",
  props: ["title"]
};
</script>

<style scoped>
/* Em ecrãs pequenos (telemóvel) o título do tema não cabe na largura,
   por exemplo "PATROCINADORES" a 375px. Reduzimos o tamanho da letra. */
@media (max-width: 575.98px) {
  h2.page-section-heading {
    font-size: 1.6rem;
    line-height: 1.3;
  }
}

.divider-custom {
  margin: 1.25rem 0 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.divider-custom .divider-custom-line {
  width: 100%;
  max-width: 7rem;
  height: 0.25rem;
  background-color: #2c3e50;
  border-radius: 1rem;
  border-color: #2c3e50 !important;
}

.divider-custom .divider-custom-line:first-child {
  margin-right: 1rem;
}

.divider-custom .divider-custom-line:last-child {
  margin-left: 1rem;
}

.divider-custom .divider-custom-icon {
  color: #2c3e50 !important;
  font-size: 2rem;
}

.divider-custom.divider-light .divider-custom-line {
  background-color: #fff;
}

.divider-custom.divider-light .divider-custom-icon {
  color: #fff !important;
}
</style>