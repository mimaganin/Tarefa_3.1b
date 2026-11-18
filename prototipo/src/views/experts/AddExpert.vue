<template>
  <section class="page-section">
    <b-container>
      <header>
        <HeaderPage title="Adicionar Especialista" />
      </header>

      <!--FORMULÁRIO-->
      <b-row>
        <b-col lg="8" offset-lg="2">
          <form @submit.prevent="add">
            <fieldset class="border rounded p-3 mb-4">
              <legend class="w-auto px-2 h5">Identificação</legend>
              <div class="form-group">
                <label for="txtName">Nome *</label>
                <input
                  v-model.trim="name"
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
                  v-model.trim="photo"
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
                  v-model="specialty"
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
                  v-model.trim="institution"
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
                  v-model.trim="email"
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
                  v-model="animals"
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
                  v-model="active"
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
              <i class="fas fa-plus-square"></i> ADICIONAR
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
import { ADD_EXPERT } from "@/store/experts/expert.constants";
import { ANIMAL_NAMES, ANIMAL_GROUPS } from "@/store/animalOptions";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      photo: "",
      specialty: "",
      institution: "",
      email: "",
      animals: [],
      active: true
    };
  },
  computed: {
    ...mapGetters("expert", ["getMessage"]),
    animalNames: () => ANIMAL_NAMES,
    animalGroups: () => ANIMAL_GROUPS
  },
  methods: {
    add() {
      // O HTML5 valida os campos obrigatórios, o email e o URL; aqui só
      // falta garantir que há pelo menos um animal escolhido.
      if (this.animals.length === 0) {
        this.$alert("Escolhe pelo menos um animal.", "Atenção", "warning");
        return;
      }
      const expert = { ...this.$data, animals: [...this.animals] };
      this.$store.dispatch(`expert/${ADD_EXPERT}`, expert).then(() => {
        this.$alert(this.getMessage, "Especialista adicionado!", "success");
        router.push({ name: "listExperts" });
      });
    }
  }
};
</script>
