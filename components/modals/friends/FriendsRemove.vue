<template>
<div class="modalinfo friendsmodal remove small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent removebox">
    <div class="title">Remove From Friends</div>
    <div class="desc">Are you sure you want to remove <strong>David Smith</strong> as a friend?</div>
    <div class="btns">
      <button @click="$parent.openModal('friends')" type="button" class="btn st2">cancel</button>
      <button @click="$parent.openModal('friendsRemoved')" type="button" class="btn st3">Yes, remove</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'FriendsRemoveModal'
}
</script>
