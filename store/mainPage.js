export const state = () => ({
  pageType: 'index',
  pageTitle: 'Main page',
  pageData: mainPageData
})

export const mutations = {
  setPageType(state, type) {
    state.pageType = type
  },
  setPageTitle(state, title) {
    state.pageTitle = title
  },
  setPageData(state, data) {
    state.pageData = data
  }
}

export const actions = {
  setPageConfigs({commit}, params) {
    switch(params) {
      case 'main':
        commit('setPageType', 'index')
        commit('setPageTitle', 'Main page')
        commit('setPageData', mainPageData)
        break;
      case 'mygames':
        commit('setPageType', 'myGames')
        commit('setPageTitle', 'My games')
        commit('setPageData', myGamesData)
        break;
      case 'new':
        commit('setPageType', 'category')
        commit('setPageTitle', 'New Games')
        commit('setPageData', newData)
        break;
      case 'reccomends':
        commit('setPageType', 'category')
        commit('setPageTitle', 'Recommended games')
        commit('setPageData', reccomendsData)
        break;
      case 'categories':
        commit('setPageType', 'category')
        commit('setPageTitle', 'Categories')
        commit('setPageData', categoriesData)
        break;
      case 'searchCategories':
        commit('setPageType', 'searchCategories')
        commit('setPageTitle', '127 games found')
        commit('setPageData', searchCategoriesData)
        break;
      case 'searchPeoples':
        commit('setPageType', 'searchPeoples')
        commit('setPageTitle', '127 people found')
        commit('setPageData', searchPeoplesData)
        break;
    }
  },
  setPageFilter({commit}, params) {
    commit('setPageFilter', params)
  }
}

export const getters = {
  pageType: state => state.pageType,
  pageTitle: state => state.pageTitle,
  pageData: state => state.pageData
}

const mainPageData = {
  main: [{
    img: require('~/assets/img/main/1.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights',
    desc: 'Imperial Hero is a cross-platform game, based <br>on the fictional Ayarr Empire, composed of 32 provinces.'
  }, {
    img: require('~/assets/img/main/2.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 2',
    desc: 'Imperial Hero is a cross-platform game, based <br>on the fictional Ayarr Empire, composed of 32 provinces.'
  }, {
    img: require('~/assets/img/main/3.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 3',
    desc: 'Imperial Hero is a cross-platform game, based <br>on the fictional Ayarr Empire, composed of 32 provinces.'
  }, {
    img: require('~/assets/img/main/4.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 4',
    desc: 'Imperial Hero is a cross-platform game, based <br>on the fictional Ayarr Empire, composed of 32 provinces.'
  }, {
    img: require('~/assets/img/main/5.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 5',
    desc: 'Imperial Hero is a cross-platform game, based <br>on the fictional Ayarr Empire, composed of 32 provinces.'
  }],
  new: [{
    img: require('~/assets/img/catalog/1.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/2.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/3.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/4.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/5.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/6.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/7.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/8.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/9.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/10.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }],
  reccomends: [{
    img: require('~/assets/img/catalog/6.jpg?webp'),
    link: '/g/1',
    title: 'Sophia Awakening',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/7.jpg?webp'),
    link: '/g/1',
    title: 'Perfect Fantasy',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/8.jpg?webp'),
    link: '/g/1',
    title: 'Rise of Angels',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/9.jpg?webp'),
    link: '/g/1',
    title: 'Hedgehogs',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/10.jpg?webp'),
    link: '/g/1',
    title: 'Music Wars',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/11.jpg?webp'),
    link: '/g/1',
    title: 'Sophia Awakening',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/12.jpg?webp'),
    link: '/g/1',
    title: 'Perfect Fantasy',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/13.jpg?webp'),
    link: '/g/1',
    title: 'Rise of Angels',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/14.jpg?webp'),
    link: '/g/1',
    title: 'Hedgehogs',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/15.jpg?webp'),
    link: '/g/1',
    title: 'Music Wars',
    desc: 'RPG'
  }],
  categories: [{
    img: require('~/assets/img/catalog/11.jpg?webp'),
    link: '/g/1',
    title: 'IDLE Glory',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/12.jpg?webp'),
    link: '/g/1',
    title: 'Eternal Fury',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/13.jpg?webp'),
    link: '/g/1',
    title: 'Eternal Fury',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/14.jpg?webp'),
    link: '/g/1',
    title: 'Bloody Pirate 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/15.jpg?webp'),
    link: '/g/1',
    title: 'Music Wars',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/1.jpg?webp'),
    link: '/g/1',
    title: 'IDLE Glory',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/2.jpg?webp'),
    link: '/g/1',
    title: 'Eternal Fury',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/3.jpg?webp'),
    link: '/g/1',
    title: 'Eternal Fury',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/4.jpg?webp'),
    link: '/g/1',
    title: 'Bloody Pirate 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/5.jpg?webp'),
    link: '/g/1',
    title: 'Music Wars',
    desc: 'RPG'
  }]
}

const newData = [{
  img: require('~/assets/img/catalog/1.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Knight 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/2.jpg?webp'),
  link: '/g/1',
  title: 'Warrior\'s Path: Hero Clash',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/3.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Lord',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/4.jpg?webp'),
  link: '/g/1',
  title: 'Empire Online 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/5.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/6.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Knight 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/7.jpg?webp'),
  link: '/g/1',
  title: 'Warrior\'s Path: Hero Clash',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/8.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Lord',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/9.jpg?webp'),
  link: '/g/1',
  title: 'Empire Online 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/10.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/11.jpg?webp'),
  link: '/g/1',
  title: 'Sophia Awakening',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/12.jpg?webp'),
  link: '/g/1',
  title: 'Perfect Fantasy',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/13.jpg?webp'),
  link: '/g/1',
  title: 'Rise of Angels',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/14.jpg?webp'),
  link: '/g/1',
  title: 'Hedgehogs',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/15.jpg?webp'),
  link: '/g/1',
  title: 'Music Wars',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/15.jpg?webp'),
  link: '/g/1',
  title: 'Music Wars',
  desc: 'RPG'
}]

const reccomendsData = [{
  img: require('~/assets/img/catalog/6.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Knight 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/7.jpg?webp'),
  link: '/g/1',
  title: 'Warrior\'s Path: Hero Clash',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/8.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Lord',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/9.jpg?webp'),
  link: '/g/1',
  title: 'Empire Online 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/10.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/11.jpg?webp'),
  link: '/g/1',
  title: 'Sophia Awakening',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/12.jpg?webp'),
  link: '/g/1',
  title: 'Perfect Fantasy',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/13.jpg?webp'),
  link: '/g/1',
  title: 'Rise of Angels',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/14.jpg?webp'),
  link: '/g/1',
  title: 'Hedgehogs',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/15.jpg?webp'),
  link: '/g/1',
  title: 'Music Wars',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/1.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Knight 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/2.jpg?webp'),
  link: '/g/1',
  title: 'Warrior\'s Path: Hero Clash',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/3.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Lord',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/4.jpg?webp'),
  link: '/g/1',
  title: 'Empire Online 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/5.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/5.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}]

const categoriesData = [{
  img: require('~/assets/img/catalog/11.jpg?webp'),
  link: '/g/1',
  title: 'Sophia Awakening',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/12.jpg?webp'),
  link: '/g/1',
  title: 'Perfect Fantasy',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/13.jpg?webp'),
  link: '/g/1',
  title: 'Rise of Angels',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/14.jpg?webp'),
  link: '/g/1',
  title: 'Hedgehogs',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/15.jpg?webp'),
  link: '/g/1',
  title: 'Music Wars',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/1.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Knight 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/2.jpg?webp'),
  link: '/g/1',
  title: 'Warrior\'s Path: Hero Clash',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/3.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Lord',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/4.jpg?webp'),
  link: '/g/1',
  title: 'Empire Online 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/5.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/6.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Knight 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/7.jpg?webp'),
  link: '/g/1',
  title: 'Warrior\'s Path: Hero Clash',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/8.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Lord',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/9.jpg?webp'),
  link: '/g/1',
  title: 'Empire Online 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/10.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/10.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}]

const myGamesData = {
  recent: [{
    img: require('~/assets/img/catalog/1.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/2.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/3.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/4.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/5.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/6.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/7.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/8.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/9.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/10.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/11.jpg?webp'),
    link: '/g/1',
    title: 'Sophia Awakening',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/12.jpg?webp'),
    link: '/g/1',
    title: 'Perfect Fantasy',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/13.jpg?webp'),
    link: '/g/1',
    title: 'Rise of Angels',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/14.jpg?webp'),
    link: '/g/1',
    title: 'Hedgehogs',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/15.jpg?webp'),
    link: '/g/1',
    title: 'Music Wars',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/15.jpg?webp'),
    link: '/g/1',
    title: 'Music Wars',
    desc: 'RPG'
  }],
  reccomends: [{
    img: require('~/assets/img/catalog/6.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/7.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/8.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/9.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/10.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/11.jpg?webp'),
    link: '/g/1',
    title: 'Sophia Awakening',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/12.jpg?webp'),
    link: '/g/1',
    title: 'Perfect Fantasy',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/13.jpg?webp'),
    link: '/g/1',
    title: 'Rise of Angels',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/14.jpg?webp'),
    link: '/g/1',
    title: 'Hedgehogs',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/15.jpg?webp'),
    link: '/g/1',
    title: 'Music Wars',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/1.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/2.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/3.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/4.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/5.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/5.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }],
  my: [{
    img: require('~/assets/img/catalog/11.jpg?webp'),
    link: '/g/1',
    title: 'Sophia Awakening',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/12.jpg?webp'),
    link: '/g/1',
    title: 'Perfect Fantasy',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/13.jpg?webp'),
    link: '/g/1',
    title: 'Rise of Angels',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/14.jpg?webp'),
    link: '/g/1',
    title: 'Hedgehogs',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/15.jpg?webp'),
    link: '/g/1',
    title: 'Music Wars',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/1.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/2.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/3.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/4.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/5.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/6.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/7.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/8.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/9.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/10.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/catalog/10.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }]
}

const searchCategoriesData = [{
  img: require('~/assets/img/catalog/11.jpg?webp'),
  link: '/g/1',
  title: 'Sophia Awakening',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/12.jpg?webp'),
  link: '/g/1',
  title: 'Perfect Fantasy',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/13.jpg?webp'),
  link: '/g/1',
  title: 'Rise of Angels',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/14.jpg?webp'),
  link: '/g/1',
  title: 'Hedgehogs',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/15.jpg?webp'),
  link: '/g/1',
  title: 'Music Wars',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/1.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Knight 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/2.jpg?webp'),
  link: '/g/1',
  title: 'Warrior\'s Path: Hero Clash',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/3.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Lord',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/4.jpg?webp'),
  link: '/g/1',
  title: 'Empire Online 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/5.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/6.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Knight 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/7.jpg?webp'),
  link: '/g/1',
  title: 'Warrior\'s Path: Hero Clash',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/8.jpg?webp'),
  link: '/g/1',
  title: 'Dragon Lord',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/9.jpg?webp'),
  link: '/g/1',
  title: 'Empire Online 2',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/10.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}, {
  img: require('~/assets/img/catalog/10.jpg?webp'),
  link: '/g/1',
  title: 'Arena of Legends',
  desc: 'RPG'
}]

const searchPeoplesData = [{
  img: require('~/assets/img/search/peoples/1.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/2.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/3.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/4.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/5.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/6.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/7.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/8.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/9.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/1.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/2.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/3.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/4.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/5.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/6.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/7.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}, {
  img: require('~/assets/img/search/peoples/8.png?webp'),
  link: '/u/1',
  name: 'Sophia Awakening'
}]
