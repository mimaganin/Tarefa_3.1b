// Dados locais usados pelos formulários de patrocinadores e especialistas.
// A API original do livro está offline, por isso a lista de animais
// vem dos nomes que existem em db/db.json.
export const ANIMAL_NAMES = ["cão", "gato", "pardal", "cavalo"];

// Os mesmos grupos que o livro usa no formulário de animais.
export const ANIMAL_GROUPS = [
  { value: "anfibio", text: "Anfíbio" },
  { value: "ave", text: "Ave" },
  { value: "mamifero", text: "Mamífero" },
  { value: "peixe", text: "Peixe" },
  { value: "reptil", text: "Réptil" }
];

// Devolve o texto de um grupo a partir do seu valor (ex.: "ave" -> "Ave").
export function groupLabel(value) {
  const group = ANIMAL_GROUPS.find(g => g.value === value);
  return group ? group.text : value;
}
