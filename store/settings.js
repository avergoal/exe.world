export const actions = {
  async main({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/settings.main.save', params)
      if(!data.error) {
        this.dispatch('profile/setProfile')
        resolve(false)
      }
      resolve(data.error)
    })
  },
  async access({}, params) {
    return new Promise(async (resolve) => {
      const { data } = await this.$axios.post('/appApi/settings.access.save', params)
      if(!data.error) {
        this.dispatch('profile/setProfile')
        resolve(false)
      }
      resolve(data.error)
    })
  },
  async notifications({}, params) {
    return new Promise(async (resolve) => {
      await this.$axios.post('/appApi/settings.notifications.save', params)
      this.dispatch('profile/setProfile')
      resolve(true)
    })
  },
  async removePhoto({}) {
    return new Promise(async (resolve) => {
      await this.$axios.post('/appApi/settings.avatar.delete', {})
      this.dispatch('profile/setProfile')
      resolve(true)
    })
  },
  async addPhoto({}, params) {
    return new Promise(async (resolve) => {
      await this.$axios.post('/appApi/settings.avatar.upload', params)
      this.dispatch('profile/setProfile')
      resolve(true)
    })
  }
}