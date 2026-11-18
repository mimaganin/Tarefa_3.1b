<template>
  <section class="page-section">
    <b-container>
      <header>
        <HeaderPage title="Gestão de Especialistas" />
      </header>

      <!--MENU TOPO-->
      <nav aria-label="Ações sobre especialistas">
        <b-row class="mb-4">
          <b-col lg="8" offset-lg="2">
            <router-link
              :to="{ name: 'addExpert' }"
              tag="button"
              class="btn btn-outline-success mr-2 mt-2"
            >
              <i class="fas fa-plus-square"></i> ADICIONAR ESPECIALISTA
            </router-link>
            <router-link
              :to="{ name: 'admin' }"
              tag="button"
              class="btn btn-outline-info mr-2 mt-2"
            >
              <i class="fas fa-bars"></i> MENU PRINCIPAL
            </router-link>
          </b-col>
        </b-row>
      </nav>

      <!--TABELA-->
      <b-row>
        <b-col lg="8" offset-lg="2">
          <div class="table-responsive">
            <table class="table table-striped">
              <caption class="sr-only">
                Lista de especialistas
              </caption>
              <thead class="thead-dark">
                <tr>
                  <th scope="col">
                    NOME
                    <i
                      class="fas fa-arrow-up"
                      v-if="sortType === 1"
                      @click="sort()"
                      title="Ordenar por nome"
                    ></i>
                    <i
                      class="fas fa-arrow-down"
                      v-else
                      @click="sort()"
                      title="Ordenar por nome"
                    ></i>
                  </th>
                  <th scope="col">ESPECIALIDADE</th>
                  <th scope="col" class="d-none d-sm-table-cell">
                    INSTITUIÇÃO
                  </th>
                  <th scope="col">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="expert of experts" :key="expert._id">
                  <td class="pt-4">
                    {{ expert.name }}
                    <span v-if="!expert.active" class="badge badge-secondary"
                      >inativo</span
                    >
                  </td>
                  <td class="pt-4">{{ groupLabel(expert.specialty) }}</td>
                  <td class="pt-4 d-none d-sm-table-cell">
                    {{ expert.institution }}
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'editExpert',
                        params: { expertId: expert._id }
                      }"
                      tag="button"
                      :title="'Editar ' + expert.name"
                      :aria-label="'Editar ' + expert.name"
                      class="btn btn-outline-success mr-2 mt-2"
                    >
                      <i class="fas fa-edit" aria-hidden="true"></i>
                      <span class="d-none d-sm-inline">EDITAR</span>
                    </router-link>
                    <button
                      @click="viewExpert(expert._id)"
                      type="button"
                      :title="'Ver ' + expert.name"
                      :aria-label="'Ver ' + expert.name"
                      class="btn btn-outline-success mr-2 mt-2"
                    >
                      <i class="fas fa-search" aria-hidden="true"></i>
                      <span class="d-none d-sm-inline">VER</span>
                    </button>
                    <button
                      @click="removeExpert(expert._id)"
                      type="button"
                      :title="'Remover ' + expert.name"
                      :aria-label="'Remover ' + expert.name"
                      class="btn btn-outline-danger mr-2 mt-2"
                    >
                      <i class="fas fa-trash-alt" aria-hidden="true"></i>
                      <span class="d-none d-sm-inline">REMOVER</span>
                    </button>
                  </td>
                </tr>
                <tr v-if="experts.length === 0">
                  <td colspan="4" class="text-center">
                    Ainda não existem especialistas.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { REMOVE_EXPERT } from "@/store/experts/expert.constants";
import { groupLabel } from "@/store/animalOptions";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ListExperts",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("expert", ["getExperts", "getMessage"]),
    // Cópia ordenada da lista do store (não altera o store)
    experts() {
      return [...this.getExperts].sort(this.compareNames);
    }
  },
  methods: {
    groupLabel,
    sort() {
      this.sortType *= -1;
    },
    compareNames(e1, e2) {
      if (e1.name > e2.name) return 1 * this.sortType;
      else if (e1.name < e2.name) return -1 * this.sortType;
      else return 0;
    },

    viewExpert(id) {
      const expert = this.experts.find(expert => expert._id === id);

      this.$fire({
        title: expert.name,
        html: this.generateTemplate(expert),
        imageUrl: expert.photo || undefined,
        imageWidth: 120,
        imageHeight: 120,
        imageAlt: `Foto de ${expert.name}`
      });
    },

    generateTemplate(expert) {
      return `
          <p><b>Especialidade:</b> ${groupLabel(expert.specialty)}</p>
          <p><b>Instituição:</b> ${expert.institution}</p>
          <p><b>Email:</b> <a href="mailto:${expert.email}">${
        expert.email
      }</a></p>
          <p><b>Animais que acompanha:</b> ${expert.animals.join(", ")}</p>
          <p><b>Estado:</b> ${expert.active ? "ativo" : "inativo"}</p>
        `;
    },

    removeExpert(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o especialista?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`expert/${REMOVE_EXPERT}`, id).then(() => {
            this.$alert(this.getMessage, "Especialista removido!", "success");
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  }
};
</script>
