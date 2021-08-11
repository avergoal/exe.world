<template>
<div class="modalinfo friendsmodal block small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent blockbox">
    <div class="title">Block User</div>
    <div class="desc">
      <p>After being blocked, this user will no longer be able to send you messages and share news.</p>
      <p>Are you sure you want to block <strong>David Smith</strong>?</p>
    </div>
    <div class="btns">
      <button @click="$parent.openModal('friends')" type="button" class="btn st2">cancel</button>
      <button @click="$parent.openModal('friends')" type="button" class="btn st3">Yes, block</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
	name: 'FriendsBlockModal'
}
</script>
