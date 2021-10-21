<template>
<div class="nav">
  <div class="item">
    <button @click="toggleModal('userProfile', user.id)" type="button" class="btn st3 mobile">
      <span>write</span>
      <svg-icon name="ui/pencil" class="mobile"/>
    </button>
  </div>
  <div class="item">
    <button @click="toggleParams()" type="button" class="ico toggleparams"><svg-icon name="ui/dotted" /></button>
    <div :class="{open: openParams}" class="dropdown">
      <ul class="menu">
        <li>
          <button @click="toggleModal('friendsRemove', user)" type="button">
            <div class="ico"><svg-icon name="ui/user_remove" /></div>
            <span>Remove From Friends</span>
          </button>
        </li>
        <li>
          <button @click="toggleModal('friendsBlock', user)" type="button">
            <div class="ico"><svg-icon name="ui/blacklist" /></div>
            <span>Block User</span>
          </button>
        </li>
        <li>
          <button @click="toggleModal('friendsReport', user)" type="button">
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
  props: ['user'],
  data: () => ({
    openParams: false
  }),
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.params') && !e.target.closest('.toggleparams')) {
        this.openParams = false
      }
    })
  },
  methods: {
    toggleModal(target, user) {
      this.$root.$emit('toggleModal', {
        open: true,
        target: target,
        user: user
      })
    },
    toggleParams() {
      let list = document.querySelectorAll('.params.open')
      for(let e in list) {
        if(typeof list[e] == 'object') {
          list[e].classList.remove('open')
        }
      }
      if(!this.openParams) {
        this.openParams = false
      }
      this.openParams = !this.openParams
    }
  }
}
</script>

