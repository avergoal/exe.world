<template>
<div class="modalinfo friendsmodal removed small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removedbox">
    <div class="desc"><strong>David Smith</strong> is removed from your friends list</div>
    <button @click="$parent.openModal('friends')" type="button" class="btn st2">continue</button>
  </div>
</div>
</template>

<script>
export default {
	name: 'FriendsRemovedModal'
}
</script>
