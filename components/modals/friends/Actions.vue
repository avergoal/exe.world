<template>
<div class="nav">
  <div class="item">
    <button @click="$root.$emit('toggleModal', {target: 'messagesChat', user: user.uid})" type="button" class="btn st3 mobile">
      <span>write</span>
      <svg-icon name="ui/pencil" class="mobile"/>
    </button>
  </div>
  <div class="item">
    <button @click="toggleParams" type="button" class="ico toggleparams"><svg-icon name="ui/dotted" /></button>
    <div :class="{open: openParams}" :style="'top:' + top + 'px;left:' + left + 'px'" class="dropdown">
      <ul class="menu">
        <li class="mobile">
          <span v-html="user.name"></span>
          <button @click="toggleParams" class="close" area-label="close">
            <svg-icon name="ui/close" />
          </button>
        </li>
        <li>
          <button @click="$root.$emit('toggleModal', {target: 'friendsRemove', user: user})" type="button">
            <div class="ico"><svg-icon name="ui/user_remove" /></div>
            <span>Remove From Friends</span>
          </button>
        </li>
        <li>
          <button @click="$root.$emit('toggleModal', {target: 'userBlock', user: user})" type="button">
            <div class="ico"><svg-icon name="ui/blacklist" /></div>
            <span>Block User</span>
          </button>
        </li>
        <li>
          <button @click="$root.$emit('toggleModal', {target: 'userReport', user: user})" type="button">
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
  name: 'FriendsActionsDropdownComponent',
  props: ['user'],
  data: () => ({
    openParams: false,
    top: 0,
    left: 0
  }),
  created() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.params') && !e.target.closest('.toggleparams')) {
        this.openParams = false
      }
    })
    this.$root.$on('closeDropdown', (_uid) => {
      if(_uid != this._uid) {
        this.openParams = false
      }
    })
  },
  methods: {
    toggleParams(e) {
      e = e.target
      if(!e.classList.contains('toggleparams')) {
        e = e.parentElement
        if(!e.classList.contains('toggleparams')) e = e.parentElement
      }
      let coords = e.getBoundingClientRect()
      this.top = coords.top
      this.left = coords.left
      this.openParams = !this.openParams
      if(this.openParams) {
        this.$root.$emit('closeDropdown', this._uid)
      }
    }
  }
}
</script>

