<template>
  <section class="page-section">
    <b-container>
      <header>
        <HeaderPage title="Editar Especialista" />
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
                  v-model.trim="expert.name"
                  type="text"
                  class="form-control form-control-lg"
                  id="txtName"
                  placeholder="escreve o nome"
                  required
                />
              </div>
              <div class="form-group">
                <label for="txtPhoto">Foto (URL)</label>
                <input
                  v-model.trim="expert.photo"
                  type="url"
                  class="form-control form-control-lg"
                  id="txtPhoto"
                  placeholder="https://..."
                />
              </div>
            </fieldset>

            <fieldset class="border rounded p-3 mb-4">
              <legend class="w-auto px-2 h5">Área científica</legend>
              <div class="form-group">
                <label for="sltSpecialty">Especialidade *</label>
                <select
                  v-model="expert.specialty"
                  id="sltSpecialty"
                  class="form-control form-control-lg"
                  required
                >
                  <option value="">-- SELECIONA GRUPO --</option>
                  <option
                    v-for="group in animalGroups"
                    :key="group.value"
                    :value="group.value"
                    >{{ group.text.toUpperCase() }}</option
                  >
                </select>
              </div>
              <div class="form-group">
                <label for="txtInstitution">Instituição *</label>
                <input
                  v-model.trim="expert.institution"
                  type="text"
                  class="form-control form-control-lg"
                  id="txtInstitution"
                  placeholder="escreve a instituição"
                  required
                />
              </div>
              <div class="form-group">
                <label for="txtEmail">Email *</label>
                <input
                  v-model.trim="expert.email"
                  type="email"
                  class="form-control form-control-lg"
                  id="txtEmail"
                  placeholder="nome@exemplo.pt"
                  required
                />
              </div>
            </fieldset>

            <fieldset class="border rounded p-3 mb-4">
              <legend class="w-auto px-2 h5">Animais que acompanha *</legend>
              <div
                class="form-check form-check-inline"
                v-for="(animal, index) in animalNames"
                :key="animal"
              >
                <input
                  v-model="expert.animals"
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
                  v-model="expert.active"
                  class="form-check-input"
                  type="checkbox"
                  id="chkActive"
                />
                <label class="form-check-label" for="chkActive"
                  >Especialista ativo</label
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
              :to="{ name: 'listExperts' }"
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
import { EDIT_EXPERT } from "@/store/experts/expert.constants";
import { ANIMAL_NAMES, ANIMAL_GROUPS } from "@/store/animalOptions";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      expert: { animals: [] }
    };
  },
  computed: {
    ...mapGetters("expert", ["getExpertById", "getMessage"]),
    animalNames: () => ANIMAL_NAMES,
    animalGroups: () => ANIMAL_GROUPS
  },
  methods: {
    update() {
      if (this.expert.animals.length === 0) {
        this.$alert("Escolhe pelo menos um animal.", "Atenção", "warning");
        return;
      }
      this.$store.dispatch(`expert/${EDIT_EXPERT}`, this.expert).then(() => {
        this.$alert(this.getMessage, "Especialista atualizado!", "success");
        router.push({ name: "listExperts" });
      });
    }
  },
  created() {
    const expert = this.getExpertById(this.$route.params.expertId);
    if (!expert) {
      this.$alert("Especialista não encontrado.", "Erro", "error");
      router.push({ name: "listExperts" });
      return;
    }
    // Trabalhamos numa cópia: se o utilizador cancelar, o store fica igual.
    this.expert = { ...expert, animals: [...expert.animals] };
  }
};
</script>
