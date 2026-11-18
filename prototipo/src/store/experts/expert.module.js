import {
  // Actions
  ADD_EXPERT,
  EDIT_EXPERT,
  REMOVE_EXPERT,
  // Mutations
  INSERT_EXPERT,
  UPDATE_EXPERT,
  DELETE_EXPERT,
  SET_MESSAGE
} from "./expert.constants";

// Dados de exemplo (em memória). A API do livro está offline, por isso
// os especialistas ficam guardados apenas no store do Vuex: ao recarregar
// a página voltam a estes valores iniciais.
const state = {
  experts: [
    {
      _id: "e1",
      name: "Dra. Ana Ribeiro",
      photo:
        "https://ui-avatars.com/api/?name=Ana+Ribeiro&background=1abc9c&color=fff",
      specialty: "mamifero",
      institution: "Instituto de Biologia Animal",
      email: "ana.ribeiro@iba.pt",
      animals: ["cão", "gato"],
      active: true
    },
    {
      _id: "e2",
      name: "Prof. Rui Carvalho",
      photo:
        "https://ui-avatars.com/api/?name=Rui+Carvalho&background=2c3e50&color=fff",
      specialty: "ave",
      institution: "Centro de Estudos de Aves",
      email: "rui.carvalho@cea.pt",
      animals: ["pardal"],
      active: true
    },
    {
      _id: "e3",
      name: "Dra. Marta Lopes",
      photo: "",
      specialty: "mamifero",
      institution: "Hospital Veterinário do Porto",
      email: "marta.lopes@hvporto.pt",
      animals: ["cão", "cavalo"],
      active: true
    },
    {
      _id: "e4",
      name: "Eng. Pedro Antunes",
      photo: "",
      specialty: "mamifero",
      institution: "Escola Superior Agrária",
      email: "pedro.antunes@esa.pt",
      animals: ["cavalo"],
      active: false
    }
  ],
  message: ""
};

const getters = {
  getExperts: state => state.experts,
  getExpertById: state => id => state.experts.find(expert => expert._id === id),
  getMessage: state => state.message
};

// As actions devolvem uma Promise, tal como as dos outros módulos do livro,
// para as vistas poderem usar .then() da mesma forma.
const actions = {
  [ADD_EXPERT]: ({ commit }, payload) => {
    const expert = { ...payload, _id: Date.now().toString() };
    commit(INSERT_EXPERT, expert);
    commit(
      SET_MESSAGE,
      `O especialista ${expert.name} foi adicionado com sucesso!`
    );
    return Promise.resolve(expert);
  },
  [EDIT_EXPERT]: ({ commit }, payload) => {
    commit(UPDATE_EXPERT, payload);
    commit(
      SET_MESSAGE,
      `O especialista ${payload.name} foi atualizado com sucesso!`
    );
    return Promise.resolve(payload);
  },
  [REMOVE_EXPERT]: ({ commit }, id) => {
    commit(DELETE_EXPERT, id);
    commit(SET_MESSAGE, "O especialista foi removido com sucesso!");
    return Promise.resolve(id);
  }
};

export const mutations = {
  [INSERT_EXPERT]: (state, expert) => {
    state.experts.push(expert);
  },
  [UPDATE_EXPERT]: (state, expert) => {
    const index = state.experts.findIndex(e => e._id === expert._id);
    if (index !== -1) state.experts.splice(index, 1, expert);
  },
  [DELETE_EXPERT]: (state, id) => {
    state.experts = state.experts.filter(expert => expert._id !== id);
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
