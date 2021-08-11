<template>
<div class="tab notifications">
  <div class="title">Notifications</div>
  <form action="">
    <div class="label">Newsletter by e-mail</div>
    <ul>
      <li>
        <input type="checkbox" name="" value="" id="n1">
        <label for="n1">
          <span>Send service news</span>
          <svg-icon name="ui/checkbox" />
        </label>
      </li>
      <li>
        <input type="checkbox" name="" value="" id="n2">
        <label for="n2">
          <span>Send notifications from friends</span>
          <svg-icon name="ui/checkbox" />
        </label>
      </li>
      <li>
        <input type="checkbox" name="" value="" id="n3">
        <label for="n3">
          <span>Send notifications from my games</span>
          <svg-icon name="ui/checkbox" />
        </label>
      </li>
      <li>
        <input type="checkbox" name="" value="" id="n4">
        <label for="n4">
          <span>Send notifications of new messages from friends</span>
          <svg-icon name="ui/checkbox" />
        </label>
      </li>
      <li>
        <input type="checkbox" name="" value="" id="n5">
        <label for="n5">
          <span>Send notifications of new messages from all users</span>
          <svg-icon name="ui/checkbox" />
        </label>
      </li>
    </ul>
    <button type="button" class="btn st2">Save changes</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'NotificationsTab'
}
</script>
