<template>
<div class="nav">
  <div class="item">
    <button @click="openModal('userProfile')" type="button" class="btn st3 mobile">
      <span>write</span>
      <svg-icon name="ui/pencil" class="mobile"/>
    </button>
  </div>
  <div class="item">
    <button @click="toggleParams()" type="button" class="ico toggleparams"><svg-icon name="ui/dotted" /></button>
    <div :class="{open: openParams}" class="dropdown">
      <ul class="menu">
        <li>
          <button @click="openModal('friendsRemove')" type="button">
            <div class="ico"><svg-icon name="ui/user_remove" /></div>
            <span>Remove From Friends</span>
          </button>
        </li>
        <li>
          <button @click="openModal('friendsBlock')" type="button">
            <div class="ico"><svg-icon name="ui/blacklist" /></div>
            <span>Block User</span>
          </button>
        </li>
        <li>
          <button @click="openModal('friendsReport')" type="button">
            <div class="ico"><svg-icon name="ui/report" /></div>
            <span>Report</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
export default{
  name: 'FriendsActions',
  data() {
    return{
      openParams: false
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.params') && !e.target.closest('.toggleparams')) {
        this.openParams = false
      }
    })
    this.$root.$on('closeParams', () => {
      this.openParams = false
    })
  },
  methods: {
    openModal(target) {
      this.$root.$emit('openFriendsModal', target)
    },
    toggleParams() {
      let list = document.querySelectorAll('.params.open')
      for(let e in list) {
        if(typeof list[e] == 'object') {
          list[e].classList.remove('open')
        }
      }
      if(!this.openParams) {
        this.$root.$emit('closeParams')
      }
      this.openParams = !this.openParams
    }
  }
}
</script>

