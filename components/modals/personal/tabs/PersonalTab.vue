<template>
<div class="tab personal">
  <div class="title">Personal data</div>
  <form action="">
    <fieldset class="text">
      <div class="item">
        <input type="text" name="" value="" id="firstname">
        <label for="firstname">First Name</label>
      </div>
      <div class="item">
        <input type="text" name="" value="" id="lastname">
        <label for="lastname">Last Name</label>
      </div>
    </fieldset>
    <div class="label">Birth Date</div>
    <fieldset class="date">
      <div class="selectbox">
        <input type="hidden" name="" value="">
        <button @click="toggleSelectbox(0)" v-html="days[current.day]" type="button" data-before="Day" class="toggleselect"></button>
        <perfect-scrollbar :class="{open: selectbox[0]}" ref="dayScroll">
          <ul>
            <li v-for="(e, i) in days" :key="i">
              <button @click="setParam('day', i)" v-html="e" type="button"></button>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
      <div class="selectbox">
        <input type="hidden" name="" value="">
        <button @click="toggleSelectbox(1)" v-html="months[current.month]" type="button" data-before="Month" class="toggleselect"></button>
        <perfect-scrollbar :class="{open: selectbox[1]}" ref="dayScroll">
          <ul>
            <li v-for="(e, i) in months" :key="i">
              <button @click="setParam('month', i)" v-html="e" type="button"></button>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
      <div class="selectbox">
        <input type="hidden" name="" value="">
        <button @click="toggleSelectbox(2)" v-html="years[current.year]" type="button" data-before="Year" class="toggleselect"></button>
        <perfect-scrollbar :class="{open: selectbox[2]}" ref="dayScroll">
          <ul>
            <li v-for="(e, i) in years" :key="i">
              <button @click="setParam('year', i)" v-html="e" type="button"></button>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
    </fieldset>
    <div class="label">Gender</div>
    <fieldset class="radio">
      <div class="item">
        <input type="radio" name="gender" value="" id="man" checked>
        <label for="man">Man</label>
      </div>
      <div class="item">
        <input type="radio" name="gender" value="" id="woman">
        <label for="woman">Woman</label>
      </div>
    </fieldset>
    <fieldset class="text">
      <div class="item">
        <input type="text" name="" value="" id="country">
        <label for="country">Country</label>
      </div>
      <div class="item">
        <input type="text" name="" value="" id="city">
        <label for="city">City</label>
      </div>
    </fieldset>
    <button type="button" class="btn st2">Save changes</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'PersonalTab',
  data() {
    return{
      days: [],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      years: [],
      selectbox: [false, false, false],
      current: {
        day: 0,
        month: 0,
        year: 0
      }
    }
  },
  created() {
    for(let i = 1; i < 32; ++i) {
      this.days.push(i)
    }
    for(let i = 1979; i < 2022; ++i) {
      this.years.push(i)
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.ps') && !e.target.closest('.toggleselect')) {
        this.closeAllSelectbox()
      }
    })
  },
  methods: {
    toggleSelectbox(target) {
      if(this.selectbox[target]) {
        this.selectbox[target] = false
      } else {
        this.closeAllSelectbox()
        this.selectbox[target] = true
      }
    },
    closeAllSelectbox() {
      this.selectbox = [false, false, false]
    },
    setParam(target, e) {
      this.current[target] = e
      this.closeAllSelectbox()
    }
  }
}
</script>
