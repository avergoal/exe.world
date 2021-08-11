<template>
<div class="aboutpagebox">
  <div class="pagetitle">About EXE</div>
  <div class="info">
    <div class="text">
      <p>We are glad to welcome you to the EXE.ru game portal. This is a new, most simple and understandable modern game portal. Here you will find the latest web browser games.</p>
      <p>Games and nothing more!</p>
      <p>EXE.ru is a community of game lovers. The main task of our portal is to give users the opportunity to play their favorite games without unnecessary difficulties!</p>
      <h5>The main advantages of the EXE.ru game portal</h5>
      <p>We have collected for you the best browser games on the network <br>Play without registration. Or sign up in no time to keep progress. <br>Nothing distracts you from the exciting gameplay <br>A simple social component will help you find like-minded people ‒ play together!</p>
      <h5>Best games</h5>
      <p>Our catalog includes only the best and proven web games. Arcade, farm or shooters - every user will find a game to their liking!</p>
      <p>Games are categorized by genre. Each genre has a specific color. <br>Blocks "Requests from Friends" and "Notifications" on the main page will help you to receive the necessary information from the games that you have installed and from friends playing with you. Also, you will not miss invitations from friends to join new games! <br>The "My games" block is the games that you have installed. Just click and start playing! <br>On the game page, you can invite friends to the game, find new friends in the game and find out who # is playing with you right now!</p>
      <h5>Simple registration</h5>
      <p>Registration on the EXE.ru game portal is made as simple as possible.</p>
      <p><b>Option number 1</b> <br>You need to enter your name, email and password. You will receive a letter with a link to confirm your registration to the specified email address.</p>
      <p><b>Option number</b> <br>You can register or log in through your account on popular social networks: vk.com, facebook, ok.ru and G +, as well as through your account on the LostFilm.TV website.</p>
      <p><b>Option number 3</b> <br>For the most impatient players, we have provided an opportunity to play your favorite games without registration! However, users who decide to play without registration should remember that they will need to register in order to save progress and achievements in the game.</p>
    </div>
    <div class="img">
      <img src="~/assets/illustration/about.svg" class="illustration day" />
      <img src="~/assets/illustration/about_inverse.svg" class="illustration night" />
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'GamePage',
  head() {
		return {
      title: 'About EXE',
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'description category'
      }]
    }
  },
  computed: {
    pageTitle() {
      return this.$store.getters['gamePage/pageTitle']
    },
    pageData() {
      return this.$store.getters['gamePage/pageData']
    }
  }
}
</script>
