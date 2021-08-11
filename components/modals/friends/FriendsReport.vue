<template>
<div class="modalinfo friendsmodal report small">
  <button @click="$parent.closeModal()" class="close" area-label="close">
    <svg-icon name="ui/close" />
  </button>
  <div class="modalcontent reportbox">
    <div class="title">Report</div>
    <div class="desc">State the reason for the report:</div>
    <form action="">
      <ul class="radio">
        <li>
          <input type="radio" name="radio" value="" id="e1" checked>
          <label for="e1">Pornography</label>
        </li>
        <li>
          <input type="radio" name="radio" value="" id="e2">
          <label for="e2">Spam</label>
        </li>
        <li>
          <input type="radio" name="radio" value="" id="e3">
          <label for="e3">Unparliamentary language</label>
        </li>
        <li>
          <input type="radio" name="radio" value="" id="e4">
          <label for="e4">Swindle</label>
        </li>
        <li>
          <input type="radio" name="radio" value="" id="e5">
          <label for="e5">My old profile</label>
        </li>
      </ul>
      <textarea name="" placeholder="Describe the problem"></textarea>
      <div class="btns">
        <button @click="$parent.openModal('friends')" type="button" class="btn st3">cancel</button>
        <button @click="$parent.openModal('friends')" type="button" class="btn st2">send report</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
	name: 'FriendsReportModal'
}
</script>
