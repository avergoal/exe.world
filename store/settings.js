export const actions = {
  async main({}, params) {
    const { data } = await this.$axios.post('/appApi/settings.main.save', params)
    if(!data.error) {
      this.dispatch('profile/setProfile')
      return false
    }
    return data.error
  },
  async access({}, params) {
    const { data } = await this.$axios.post('/appApi/settings.access.save', params)
    if(!data.error) {
      this.dispatch('profile/setProfile')
      return false
    }
    return data.error
  },
  async notifications({}, params) {
    await this.$axios.post('/appApi/settings.notifications.save', params)
    this.dispatch('profile/setProfile')
    return true
  },
  async removePhoto({}) {
    await this.$axios.post('/appApi/settings.avatar.delete', {})
    this.dispatch('profile/setProfile')
    return true
  },
  async addPhoto({}, params) {
    await this.$axios.post('/appApi/settings.avatar.upload', params)
    this.dispatch('profile/setProfile')
    return true
  }
}