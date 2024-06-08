<template>
  <div class="tab personal">
    <div class="title">
      <button @click="$root.$emit('toggleModalTab', 'mobile')" class="back" type="button">
        <svg-icon name="ui/back"/>
      </button>
      {{ $t('Header_profile_dropdown_menu_data') }}
    </div>
    <perfect-scrollbar ref="scroll_tab">
      <form action="">
        <fieldset v-if="loaded" class="text">
          <div class="item">
            <input v-model="model.firstname" :class="{error: errors.first_name_too_short.open}" type="text" name=""
                   value="" id="firstname">
            <label for="firstname">{{ $t('Profile_data_input_name') }}</label>
            <span v-if="errors.first_name_too_short.open " v-html="$t(errors.first_name_too_short.text)"
                  class="error"></span>
            <span v-if="errors.first_name_too_long.open " v-html="$t(errors.first_name_too_long.text)"
                  class="error"></span>
          </div>
          <div class="item">
            <input v-model="model.lastname" :class="{error: errors.last_name_too_short.open}" type="text" name=""
                   value="" id="lastname">
            <label for="lastname">{{ $t('Profile_data_input_surname') }}</label>
            <span v-if="errors.last_name_too_short.open" v-html="$t(errors.last_name_too_short.text)" class="error"></span>
            <span v-if="errors.last_name_too_long.open" v-html="$t(errors.last_name_too_long.text)" class="error"></span>
          </div>
        </fieldset>
        <div v-if="loaded" class="label">{{ $t('Userpage_text_dateofbirth') }}</div>
        <fieldset v-if="loaded" class="date">
          <div class="selectbox">
            <button @click="toggleSelectbox(0)" v-html="(model.birthdate.d) ? Number(model.birthdate.d) : ''"
                    type="button" :data-before="$t('Profile_data_input_day')" class="toggleselect"></button>
            <perfect-scrollbar :class="{open: selectbox[0]}">
              <ul>
                <li v-for="(e, i) in days" :key="i">
                  <button @click="setBirthday('d', e)" v-html="e" type="button"></button>
                </li>
              </ul>
            </perfect-scrollbar>
          </div>
          <div class="selectbox">
            <button @click="toggleSelectbox(1)" v-html="$t(months.byIdx[model.birthdate.m])" type="button"
                    :data-before="$t('Profile_data_input_month')" class="toggleselect"></button>
            <perfect-scrollbar :class="{open: selectbox[1]}">
              <ul>
                <li v-for="(e, i) in months.byName" :key="i">
                  <button @click="setBirthday('m', e)" v-html="$t(i)" type="button"></button>
                </li>
              </ul>
            </perfect-scrollbar>
          </div>
          <div class="selectbox">
            <button @click="toggleSelectbox(2)" v-html="(model.birthdate.y) ? Number(model.birthdate.y) : ''"
                    type="button" :data-before="$t('Profile_data_input_year')" class="toggleselect"></button>
            <perfect-scrollbar :class="{open: selectbox[2]}">
              <ul>
                <li v-for="(e, i) in years" :key="i">
                  <button @click="setBirthday('y', e)" v-html="e" type="button"></button>
                </li>
              </ul>
            </perfect-scrollbar>
          </div>
        </fieldset>
        <div v-if="loaded" class="label">{{ $t('Profile_data_gender_text') }}</div>
        <fieldset v-if="loaded" class="radio">
          <div class="item">
            <input v-model="model.sex" type="radio" name="gender" value="0" id="man" :checked="model.sex === 0">
            <label for="man">{{ $t('Profile_data_gender_radiobutton_1') }}</label>
          </div>
          <div class="item">
            <input v-model="model.sex" type="radio" name="gender" value="1" id="woman" :checked="model.sex === 1">
            <label for="woman">{{ $t('Profile_data_gender_radiobutton_2') }}</label>
          </div>
          <div class="selectbox">
            <button @click="toggleSelectbox(5)" type="button"
                    :data-before="$t('Profile_data_input_locale')"
                    class="toggleselect">{{showLocale}}</button>
            <perfect-scrollbar :class="{open: selectbox[5]}">
              <ul>
                <li v-for="(e, i) in locales" :key="i">
                  <button @click="setLocale(e.code)" v-html="e.title" type="button"></button>
                </li>
              </ul>
            </perfect-scrollbar>
          </div>
        </fieldset>
        <fieldset v-if="loaded" class="location">
          <div class="selectbox">
            <button @click="toggleSelectbox(3)" v-html="model.country" type="button" :data-before="$t('Profile_data_input_country')"
                    class="toggleselect"></button>
            <perfect-scrollbar :class="{open: selectbox[3]}">
              <ul>
                <li v-for="(e, i) in countries" :key="i">
                  <button @click="setLocation('country', i, e)" v-html="e" type="button"></button>
                </li>
              </ul>
            </perfect-scrollbar>
          </div>
          <div class="selectbox">
            <button @click="toggleSelectbox(4)" v-html="model.city" type="button" :data-before="$t('Profile_data_input_city')"
                    class="toggleselect"></button>
            <perfect-scrollbar :class="{open: selectbox[4]}">
              <ul>
                <li v-for="(e, i) in cities" :key="i">
                  <button @click="setLocation('city', i, e)" v-html="e" type="button"></button>
                </li>
              </ul>
            </perfect-scrollbar>
          </div>
        </fieldset>
        <button v-if="loaded" @click="saveData()" type="button" class="btn st2">{{ $t('Button_save') }}</button>
        <!-- <div :class="{loaded: !loader || !loaded}" class="loader"><img src="/theme/img/loader.gif" alt=""></div> -->
      </form>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'PersonalTab',
  data: () => ({
    days: [],
    months: {
      byName: {
        'Text_january': '01',
        'Text_february': '02',
        'Text_march': '03',
        'Text_april': '04',
        'Text_may': '05',
        'Text_june': '06',
        'Text_july': '07',
        'Text_august': '08',
        'Text_september': '09',
        'Text_october': '10',
        'Text_november': '11',
        'Text_december': '12'
      },
      byIdx: {
        '01': 'Text_january',
        '02': 'Text_february',
        '03': 'Text_march',
        '04': 'Text_april',
        '05': 'Text_may',
        '06': 'Text_june',
        '07': 'Text_july',
        '08': 'Text_august',
        '09': 'Text_september',
        '10': 'Text_october',
        '11': 'Text_november',
        '12': 'Text_december'
      }
    },
    years: [],
    selectbox: [false, false, false, false, false, false],
    model: {
      firstname: '',
      lastname: '',
      sex: '',
      country: '',
      countryId: '',
      locale: '',
      city: '',
      cityId: '',
      birthdate: {y: '', m: '', d: ''}
    },
    errors: {
      first_name_too_short: {
        open: false,
        text: 'Alert_first_name_too_short'
      },
      first_name_too_long: {
        open: false,
        text: 'Alert_first_name_too_long'
      },
      last_name_too_short: {
        open: false,
        text: 'Alert_last_name_too_short'
      },
      last_name_too_long: {
        open: false,
        text: 'Alert_last_name_too_long'
      }
    },
    loaded: false,
    loader: false
  }),
  created() {
    let year = Number(this.$moment().format('Y')) - 6
    for (let i = (year - 83); i <= year; ++i) {
      this.years.push(i)
    }
    for (let i = 1; i <= 31; ++i) {
      this.days.push(i)
    }
    this.years.sort((a, b) => {
      return (b - a)
    })
    this.loadUserData()
    this.$root.$on('scrollUpdate', () => {
      if (this.$refs.scroll_tab) {
        setTimeout(() => {
          this.$refs.scroll_tab.update()
        }, 100)
      }
    })
  },
  methods: {
    async setLocation(k, i, e) {
      this.closeAllSelectbox()
      this.model[k + 'Id'] = i
      this.model[k] = e
      if (k == 'country') {
        this.loader = true
        await this.$store.dispatch('settings/getLocations', {
          key: 'cities',
          data: {country_id: i}
        })
        this.loader = false
        this.model.city = ''
        this.model.cityId = ''
      }
    },
    async loadUserData() {
      let birthdate = this.settings.birth_date.match(/(\d{4})(\d{2})(\d{2})/)
      this.model = {
        firstname: this.settings.first_name,
        lastname: this.settings.last_name,
        sex: this.settings.sex,
        birthdate: {
          y: birthdate[1],
          m: birthdate[2],
          d: birthdate[3]
        },
        locale: this.settings?.locale?.length?this.settings.locale:'en'
      }
      if (!this.countries) {
        await this.$store.dispatch('settings/getLocations', {
          key: 'countries'
        })
      }
      if (this.settings.country && this.countries[this.settings.country]) {
        this.model.country = this.countries[this.settings.country]
        this.model.countryId = this.settings.country
        await this.$store.dispatch('settings/getLocations', {
          key: 'cities',
          data: {country_id: this.model.countryId}
        })
        if (this.settings.city && this.cities[this.settings.city]) {
          this.model.city = this.cities[this.settings.city]
          this.model.cityId = this.settings.city
        }
      }
      this.loaded = true
    },
    async saveData() {
      let birthDate = ((this.model.birthdate.y) ? this.model.birthdate.y : '0000')
      birthDate += '' + ((this.model.birthdate.m) ? this.model.birthdate.m : '00')
      birthDate += '' + ((Number(this.model.birthdate.d) < 10) ? '0' + Number(this.model.birthdate.d) : this.model.birthdate.d)
      const error = await this.$store.dispatch('settings/updateMain', {
        first_name: this.model.firstname,
        last_name: this.model.lastname,
        birth_date: birthDate,
        sex: this.model.sex,
        country: this.model.countryId,
        city: this.model.cityId,
        locale: this.model.locale,
      })
      Object.keys(this.errors).map(e => this.errors[e].open = false)
      if (error && this.errors[error]) {
        this.errors[error].open = true
      }
      if (!error) {
        this.$root.$emit('toggleModal', {
          target: 'notification',
        })
      }
    },
    setBirthday(k, e) {
      this.model.birthdate[k] = e
      this.closeAllSelectbox()
    },
    toggleSelectbox(target) {
      if (!this.selectbox[target]) {
        this.closeAllSelectbox()
        this.selectbox[target] = true
      } else {
        this.closeAllSelectbox()
      }
    },
    setLocale(e) {
      this.closeAllSelectbox()
      this.model.locale = e
    },
    closeAllSelectbox() {
      this.selectbox = [false, false, false, false, false, false]
    }
  },
  computed: {
    settings() {
      return this.$store.getters['settings/main']
    },
    locales() {
      return this.$store.getters['app/locales']
    },
    countries() {
      return this.$store.getters['settings/countries']
    },
    cities() {
      return this.$store.getters['settings/cities']
    },
    user() {
      console.log(this.$store.getters['profile/data'])
      return this.$store.getters['profile/data']
    },
    showLocale() {
      let index = this.locales.findIndex(item => item.code == this.model.locale)

        return this.locales?.[index]?.title


    }
  }
}
</script>
