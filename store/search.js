export const state = () => ({
  searchOpen: false,
  searchData: searchData
})

export const mutations = {
  setSearchOpen(state, open) {
    state.searchOpen = open
  }
}

export const actions = {
  setSearchOpen({commit}, params) {
    commit('setSearchOpen', params)
  }
}

export const getters = {
  searchOpen: state => state.searchOpen,
  searchData: state => state.searchData
}

const searchData = {
  popular: [{
    img: require('~/assets/img/search/popular/1.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/popular/2.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/popular/3.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 3',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/popular/4.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 4',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/popular/5.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 5',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/popular/1.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 6',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/popular/2.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 7',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/popular/3.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 8',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/popular/4.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 9',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/popular/5.jpg?webp'),
    link: '/g/1',
    title: 'War of Knights 10',
    desc: 'RPG'
  }],
  games: [{
    img: require('~/assets/img/search/games/1.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/games/2.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/games/3.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/games/4.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/games/5.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/games/6.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Knight 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/games/1.jpg?webp'),
    link: '/g/1',
    title: 'Warrior\'s Path: Hero Clash',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/games/2.jpg?webp'),
    link: '/g/1',
    title: 'Dragon Lord',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/games/3.jpg?webp'),
    link: '/g/1',
    title: 'Empire Online 2',
    desc: 'RPG'
  }, {
    img: require('~/assets/img/search/games/4.jpg?webp'),
    link: '/g/1',
    title: 'Arena of Legends',
    desc: 'RPG'
  }],
  peoples: [{
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
}
