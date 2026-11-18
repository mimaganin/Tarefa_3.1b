<template>
  <section class="page-section">
    <b-container>
      <header>
        <HeaderPage title="Editar Patrocinador" />
      </header>

      <!--FORMULÁRIO-->
      <b-row>
        <b-col lg="8" offset-lg="2">
          <form @submit.prevent="update">
            <fieldset class="border rounded p-3 mb-4">
              <legend class="w-auto px-2 h5">Identificação</legend>
              <div class="form-group">
                <label for="txtName">Nome *</label>
                <input
                  v-model.trim="sponsor.name"
                  type="text"
                  class="form-control form-control-lg"
                  id="txtName"
                  placeholder="escreve o nome"
                  required
                />
              </div>
              <fieldset class="form-group">
                <legend class="col-form-label pt-0">Tipo *</legend>
                <div class="form-check form-check-inline">
                  <input
                    v-model="sponsor.type"
                    class="form-check-input"
                    type="radio"
                    id="rdoEmpresa"
                    name="type"
                    value="empresa"
                    required
                  />
                  <label class="form-check-label" for="rdoEmpresa"
                    >Empresa</label
                  >
                </div>
                <div class="form-check form-check-inline">
                  <input
                    v-model="sponsor.type"
                    class="form-check-input"
                    type="radio"
                    id="rdoParticular"
                    name="type"
                    value="particular"
                  />
                  <label class="form-check-label" for="rdoParticular"
                    >Particular</label
                  >
                </div>
              </fieldset>
              <div class="form-group">
                <label for="txtLogo">Logótipo (URL)</label>
                <input
                  v-model.trim="sponsor.logo"
                  type="url"
                  class="form-control form-control-lg"
                  id="txtLogo"
                  placeholder="https://..."
                />
              </div>
            </fieldset>

            <fieldset class="border rounded p-3 mb-4">
              <legend class="w-auto px-2 h5">Contactos</legend>
              <div class="form-group">
                <label for="txtEmail">Email *</label>
                <input
                  v-model.trim="sponsor.email"
                  type="email"
                  class="form-control form-control-lg"
                  id="txtEmail"
                  placeholder="nome@exemplo.pt"
                  required
                />
              </div>
              <div class="form-group">
                <label for="txtWebsite">Website (URL)</label>
                <input
                  v-model.trim="sponsor.website"
                  type="url"
                  class="form-control form-control-lg"
                  id="txtWebsite"
                  placeholder="https://..."
                />
              </div>
            </fieldset>

            <fieldset class="border rounded p-3 mb-4">
              <legend class="w-auto px-2 h5">Animais patrocinados *</legend>
              <div
                class="form-check form-check-inline"
                v-for="(animal, index) in animalNames"
                :key="animal"
              >
                <input
                  v-model="sponsor.animals"
                  class="form-check-input"
                  type="checkbox"
                  :id="'chkAnimal' + index"
                  :value="animal"
                />
                <label class="form-check-label" :for="'chkAnimal' + index">{{
                  animal
                }}</label>
              </div>
            </fieldset>

            <fieldset class="border rounded p-3 mb-4">
              <legend class="w-auto px-2 h5">Estado</legend>
              <div class="form-check">
                <input
                  v-model="sponsor.active"
                  class="form-check-input"
                  type="checkbox"
                  id="chkActive"
                />
                <label class="form-check-label" for="chkActive"
                  >Patrocinador ativo</label
                >
              </div>
            </fieldset>

            <button
              type="submit"
              class="btn btn-outline-success btn-lg mr-2 mb-2"
            >
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <router-link
              :to="{ name: 'listSponsors' }"
              tag="button"
              class="btn btn-outline-danger btn-lg mb-2"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { EDIT_SPONSOR } from "@/store/sponsors/sponsor.constants";
import { ANIMAL_NAMES } from "@/store/animalOptions";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditSponsor",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      sponsor: { animals: [] }
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsorById", "getMessage"]),
    animalNames: () => ANIMAL_NAMES
  },
  methods: {
    update() {
      if (this.sponsor.animals.length === 0) {
        this.$alert("Escolhe pelo menos um animal.", "Atenção", "warning");
        return;
      }
      this.$store.dispatch(`sponsor/${EDIT_SPONSOR}`, this.sponsor).then(() => {
        this.$alert(this.getMessage, "Patrocinador atualizado!", "success");
        router.push({ name: "listSponsors" });
      });
    }
  },
  created() {
    const sponsor = this.getSponsorById(this.$route.params.sponsorId);
    if (!sponsor) {
      this.$alert("Patrocinador não encontrado.", "Erro", "error");
      router.push({ name: "listSponsors" });
      return;
    }
    // Trabalhamos numa cópia: se o utilizador cancelar, o store fica igual.
    this.sponsor = { ...sponsor, animals: [...sponsor.animals] };
  }
};
</script>
