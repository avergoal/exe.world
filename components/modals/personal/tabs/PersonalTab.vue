<template>
<div class="tab personal">
  <div class="title">Personal data</div>
  <form action="">
    <fieldset class="text">
      <div class="item">
        <input v-model="model.firstname" :class="{error: errors.first_name_too_short.open}" type="text" name="" value="" id="firstname">
        <label for="firstname">First Name</label>
        <span v-if="errors.first_name_too_short.open" v-html="errors.first_name_too_short.text" class="error"></span>
      </div>
      <div class="item">
        <input v-model="model.lastname" :class="{error: errors.last_name_too_short.open}" type="text" name="" value="" id="lastname">
        <label for="lastname">Last Name</label>
        <span v-if="errors.last_name_too_short.open" v-html="errors.last_name_too_short.text" class="error"></span>
      </div>
    </fieldset>
    <div class="label">Birth Date</div>
    <fieldset class="date">
      <div class="selectbox">
        <button @click="toggleSelectbox(0)" v-html="(model.birthdate.d) ? Number(model.birthdate.d) : ''" type="button" data-before="Day" class="toggleselect"></button>
        <perfect-scrollbar :class="{open: selectbox[0]}" ref="dayScroll">
          <ul>
            <li v-for="(e, i) in days" :key="i">
              <button @click="setBirthday('d', e)" v-html="e" type="button"></button>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
      <div class="selectbox">
        <button @click="toggleSelectbox(1)" v-html="months.byIdx[model.birthdate.m]" type="button" data-before="Month" class="toggleselect"></button>
        <perfect-scrollbar :class="{open: selectbox[1]}" ref="dayScroll">
          <ul>
            <li v-for="(e, i) in months.byName" :key="i">
              <button @click="setBirthday('m', e)" v-html="i" type="button"></button>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
      <div class="selectbox">
        <button @click="toggleSelectbox(2)" v-html="(model.birthdate.y) ? Number(model.birthdate.y) : ''" type="button" data-before="Year" class="toggleselect"></button>
        <perfect-scrollbar :class="{open: selectbox[2]}" ref="dayScroll">
          <ul>
            <li v-for="(e, i) in years" :key="i">
              <button @click="setBirthday('y', e)" v-html="e" type="button"></button>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
    </fieldset>
    <div class="label">Gender</div>
    <fieldset class="radio">
      <div class="item">
        <input v-model="model.sex" type="radio" name="gender" value="0" id="man" :checked="model.sex === 0">
        <label for="man">Man</label>
      </div>
      <div class="item">
        <input v-model="model.sex" type="radio" name="gender" value="1" id="woman" :checked="model.sex === 1">
        <label for="woman">Woman</label>
      </div>
    </fieldset>
    <fieldset class="location">
      <div class="selectbox">
        <button @click="toggleSelectbox(3)" v-html="model.country" type="button" data-before="Country" class="toggleselect"></button>
        <perfect-scrollbar :class="{open: selectbox[3]}" ref="dayScroll">
          <ul>
            <li v-for="(e, i) in countries" :key="i">
              <button @click="setLocation('country', i, e)" v-html="e" type="button"></button>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
      <div class="selectbox">
        <button @click="toggleSelectbox(4)" v-html="model.city" type="button" data-before="City" class="toggleselect"></button>
        <perfect-scrollbar :class="{open: selectbox[4]}" ref="dayScroll">
          <ul>
            <li v-for="(e, i) in cities" :key="i">
              <button @click="setLocation('city', i, e)" v-html="e" type="button"></button>
            </li>
          </ul>
        </perfect-scrollbar>
      </div>
    </fieldset>
    <button @click="saveData()" type="button" class="btn st2">Save changes</button>
  </form>
</div>
</template>

<script>
export default {
  name: 'PersonalTab',
  data() {
    return{
      days: [],
      months: {
        byName: {
          January: '01', 
          February: '02', 
          March: '03', 
          April: '04', 
          May: '05', 
          June: '06', 
          July: '07', 
          August: '08', 
          September: '09', 
          October: '10', 
          November: '11', 
          December: '12'
        },
        byIdx: {
          '01': 'January',
          '02': 'February',
          '03': 'March',
          '04': 'April',
          '05': 'May',
          '06': 'June',
          '07': 'July',
          '08': 'August',
          '09': 'September',
          '10': 'October',
          '11': 'November',
          '12': 'December'
        }
      },
      years: [],
      selectbox: [false, false, false, false, false],
      model: {
        firstname: '',
        lastname: '',
        sex: '',
        country: '',
        countryId: '',
        city: '',
        cityId: '',
        birthdate: {y: '', m: '', d: ''}
      },
      errors: {
        first_name_too_short: {
          open: false,
          text: 'First name error'
        },
        last_name_too_short: {
          open: false,
          text: 'Last name error'
        }
      }
    }
  },
  created() {
    let date = new Date(),
        year = Number(date.getFullYear()) - 6
    for(let i = (year - 100); i <= year; ++i) {
      this.years.push(i)
    }
    for(let i = 1; i <= 31; ++i) {
      this.days.push(i)
    }
    this.years.sort((a, b) => {
      return (b - a)
    })
    this.setLocation('start', null, null)
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if(!e.target.closest('.ps') && !e.target.closest('.toggleselect')) {
        this.closeAllSelectbox()
      }
    })
  },
  methods: {
    async saveData() {
      let birthDate = ((this.model.birthdate.y) ? this.model.birthdate.y : '0000')
      birthDate += '' + ((this.model.birthdate.m) ? this.model.birthdate.m : '00')
      birthDate += '' + ((Number(this.model.birthdate.d) < 10) ? '0' + Number(this.model.birthdate.d) : this.model.birthdate.d)
      const error = await this.$store.dispatch('settings/main', {
        first_name: this.model.firstname,
        last_name: this.model.lastname,
        birth_date: birthDate,
        sex: this.model.sex,
        country: this.model.countryId,
        city: this.model.cityId
      })
      for(let e in this.errors) {
        this.errors[e].open = false
      }
      if(error && this.errors[error]) {
        this.errors[error].open = true
      }
    },
    setBirthday(k, e) {
      this.model.birthdate[k] = e
      this.closeAllSelectbox()
    },
    async setLocation(k, e, n) {
      if(k == 'start') {
        if(this.user.settings.main.country) {
          await this.$store.dispatch('app/setCountries')
        }
        this.loadUserData()
      } else if(k == 'country') {
        if(this.model.countryId != e) {
          this.$store.dispatch('app/setCities', {
            country_id: e
          })
          this.model.country = n
          this.model.countryId = e
          this.model.city = ''
          this.model.cityId = ''
        }
      } else {
        this.model.city = n
        this.model.cityId = e
      }
      this.closeAllSelectbox()
    },
    async loadUserData() {
      this.model = {
        firstname: this.user.settings.main.first_name,
        lastname: this.user.settings.main.last_name,
        sex: this.user.settings.main.sex,
        country: '',
        city: '',
        birthdate: Object.assign({}, this.user.settings.main.birth_date_obj)
      }
      if(this.user.settings.main.country) {
        this.model.country = this.countries[this.user.settings.main.country]
        this.model.countryId = this.user.settings.main.country
        if(this.user.settings.main.city) {
          await this.$store.dispatch('app/setCities', {
            country_id: this.model.countryId
          })
          this.model.city = this.cities[this.user.settings.main.city]
          this.model.cityId = this.user.settings.main.city
        }
      }
    },
    toggleSelectbox(target) {
      if(!this.selectbox[target]) {
        this.closeAllSelectbox()
      }
      this.selectbox[target] = !this.selectbox[target]
    },
    closeAllSelectbox() {
      this.selectbox = [false, false, false, false, false]
    }
  },
  computed: {
    user() {
      return this.$store.getters['profile/user']
    },
    countries() {
      return this.$store.getters['app/countries']
    },
    cities() {
      return this.$store.getters['app/cities']
    }
  }
}
</script>
