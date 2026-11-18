<template>
  <section class="page-section">
    <b-container fluid>
      <header>
        <HeaderPage title="Gestão do Animalec" />
      </header>

      <b-row>
        <b-col
          cols="12"
          md="8"
          offset-md="2"
          lg="6"
          offset-lg="3"
          xl="4"
          offset-xl="4"
        >
          <nav aria-label="Entidades do back-office">
            <b-card-group deck>
              <AdminOptionBox
                routeName="listUsers"
                iconName="users"
                title="Utilizadores"
              />
              <AdminOptionBox
                routeName="listAnimals"
                iconName="dog"
                title="Animais"
              />
            </b-card-group>
            <b-card-group deck class="mt-3">
              <AdminOptionBox
                routeName="listQuizzes"
                iconName="file-alt"
                title="Quizzes"
              />
              <AdminOptionBox
                routeName="listQuestions"
                iconName="question-circle"
                title="Questões"
              />
            </b-card-group>
            <b-card-group deck class="mt-3">
              <AdminOptionBox
                routeName="listSponsors"
                iconName="handshake"
                title="Patrocinadores"
              />
              <AdminOptionBox
                routeName="listExperts"
                iconName="user-graduate"
                title="Especialistas"
              />
            </b-card-group>
          </nav>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>
<script>
import HeaderPage from "@/components/HeaderPage.vue";
import AdminOptionBox from "@/components/AdminOptionBox.vue";

export default {
  components: {
    HeaderPage,
    AdminOptionBox
  }
};
</script>
