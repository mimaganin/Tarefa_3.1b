<template>
  <section class="page-section">
    <b-container>
      <header>
        <HeaderPage title="Gestão de Patrocinadores" />
      </header>

      <!--MENU TOPO-->
      <nav aria-label="Ações sobre patrocinadores">
        <b-row class="mb-4">
          <b-col lg="8" offset-lg="2">
            <router-link
              :to="{ name: 'addSponsor' }"
              tag="button"
              class="btn btn-outline-success mr-2 mt-2"
            >
              <i class="fas fa-plus-square"></i> ADICIONAR PATROCINADOR
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
                Lista de patrocinadores
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
                  <th scope="col">TIPO</th>
                  <th scope="col" class="d-none d-sm-table-cell">
                    Nº DE ANIMAIS
                  </th>
                  <th scope="col">AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="sponsor of sponsors" :key="sponsor._id">
                  <td class="pt-4">
                    {{ sponsor.name }}
                    <span v-if="!sponsor.active" class="badge badge-secondary"
                      >inativo</span
                    >
                  </td>
                  <td class="pt-4">{{ sponsor.type }}</td>
                  <td class="pt-4 d-none d-sm-table-cell">
                    {{ sponsor.animals.length }}
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'editSponsor',
                        params: { sponsorId: sponsor._id }
                      }"
                      tag="button"
                      class="btn btn-outline-success mr-2 mt-2"
                    >
                      <i class="fas fa-edit"></i> EDITAR
                    </router-link>
                    <button
                      @click="viewSponsor(sponsor._id)"
                      type="button"
                      class="btn btn-outline-success mr-2 mt-2"
                    >
                      <i class="fas fa-search"></i> VER
                    </button>
                    <button
                      @click="removeSponsor(sponsor._id)"
                      type="button"
                      class="btn btn-outline-danger mr-2 mt-2"
                    >
                      <i class="fas fa-trash-alt"></i> REMOVER
                    </button>
                  </td>
                </tr>
                <tr v-if="sponsors.length === 0">
                  <td colspan="4" class="text-center">
                    Ainda não existem patrocinadores.
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
import { REMOVE_SPONSOR } from "@/store/sponsors/sponsor.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters } from "vuex";

export default {
  name: "ListSponsors",
  components: {
    HeaderPage
  },
  data: function() {
    return {
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsors", "getMessage"]),
    // Cópia ordenada da lista do store (não altera o store)
    sponsors() {
      return [...this.getSponsors].sort(this.compareNames);
    }
  },
  methods: {
    sort() {
      this.sortType *= -1;
    },
    compareNames(s1, s2) {
      if (s1.name > s2.name) return 1 * this.sortType;
      else if (s1.name < s2.name) return -1 * this.sortType;
      else return 0;
    },

    viewSponsor(id) {
      const sponsor = this.sponsors.find(sponsor => sponsor._id === id);

      this.$fire({
        title: sponsor.name,
        html: this.generateTemplate(sponsor),
        imageUrl: sponsor.logo || undefined,
        imageWidth: 120,
        imageHeight: 120,
        imageAlt: `Logótipo de ${sponsor.name}`
      });
    },

    generateTemplate(sponsor) {
      let response = `
          <p><b>Tipo:</b> ${sponsor.type}</p>
          <p><b>Email:</b> <a href="mailto:${sponsor.email}">${sponsor.email}</a></p>
        `;
      if (sponsor.website) {
        response += `<p><b>Website:</b> <a href="${sponsor.website}" target="_blank">${sponsor.website}</a></p>`;
      }
      response += `
          <p><b>Animais patrocinados:</b> ${sponsor.animals.join(", ")}</p>
          <p><b>Estado:</b> ${sponsor.active ? "ativo" : "inativo"}</p>
        `;
      return response;
    },

    removeSponsor(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o patrocinador?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`sponsor/${REMOVE_SPONSOR}`, id).then(() => {
            this.$alert(this.getMessage, "Patrocinador removido!", "success");
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
