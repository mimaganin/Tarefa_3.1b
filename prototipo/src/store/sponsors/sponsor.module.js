import {
  // Actions
  ADD_SPONSOR,
  EDIT_SPONSOR,
  REMOVE_SPONSOR,
  // Mutations
  INSERT_SPONSOR,
  UPDATE_SPONSOR,
  DELETE_SPONSOR,
  SET_MESSAGE
} from "./sponsor.constants";

// Dados de exemplo (em memória). A API do livro está offline, por isso
// os patrocinadores ficam guardados apenas no store do Vuex: ao recarregar
// a página voltam a estes valores iniciais.
const state = {
  sponsors: [
    {
      _id: "s1",
      name: "Patas & Companhia, Lda.",
      type: "empresa",
      logo: "https://ui-avatars.com/api/?name=Patas+Companhia&background=1abc9c&color=fff",
      website: "https://www.patasecompanhia.pt",
      email: "geral@patasecompanhia.pt",
      animals: ["cão", "gato"],
      active: true
    },
    {
      _id: "s2",
      name: "Joana Ferreira",
      type: "particular",
      logo: "",
      website: "",
      email: "joana.ferreira@mail.pt",
      animals: ["gato"],
      active: true
    },
    {
      _id: "s3",
      name: "Rações Serra da Estrela, S.A.",
      type: "empresa",
      logo: "https://ui-avatars.com/api/?name=Serra+Estrela&background=2c3e50&color=fff",
      website: "https://www.racoesserradaestrela.pt",
      email: "info@racoesserradaestrela.pt",
      animals: ["cão", "cavalo", "pardal"],
      active: true
    },
    {
      _id: "s4",
      name: "Clube Equestre do Minho",
      type: "empresa",
      logo: "",
      website: "https://www.equestreminho.pt",
      email: "secretaria@equestreminho.pt",
      animals: ["cavalo"],
      active: false
    }
  ],
  message: ""
};

const getters = {
  getSponsors: state => state.sponsors,
  getSponsorById: state => id =>
    state.sponsors.find(sponsor => sponsor._id === id),
  getMessage: state => state.message
};

// As actions devolvem uma Promise, tal como as dos outros módulos do livro,
// para as vistas poderem usar .then() da mesma forma.
const actions = {
  [ADD_SPONSOR]: ({ commit }, payload) => {
    const sponsor = { ...payload, _id: Date.now().toString() };
    commit(INSERT_SPONSOR, sponsor);
    commit(
      SET_MESSAGE,
      `O patrocinador ${sponsor.name} foi adicionado com sucesso!`
    );
    return Promise.resolve(sponsor);
  },
  [EDIT_SPONSOR]: ({ commit }, payload) => {
    commit(UPDATE_SPONSOR, payload);
    commit(
      SET_MESSAGE,
      `O patrocinador ${payload.name} foi atualizado com sucesso!`
    );
    return Promise.resolve(payload);
  },
  [REMOVE_SPONSOR]: ({ commit }, id) => {
    commit(DELETE_SPONSOR, id);
    commit(SET_MESSAGE, "O patrocinador foi removido com sucesso!");
    return Promise.resolve(id);
  }
};

export const mutations = {
  [INSERT_SPONSOR]: (state, sponsor) => {
    state.sponsors.push(sponsor);
  },
  [UPDATE_SPONSOR]: (state, sponsor) => {
    const index = state.sponsors.findIndex(s => s._id === sponsor._id);
    if (index !== -1) state.sponsors.splice(index, 1, sponsor);
  },
  [DELETE_SPONSOR]: (state, id) => {
    state.sponsors = state.sponsors.filter(sponsor => sponsor._id !== id);
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
