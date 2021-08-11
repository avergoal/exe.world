export const state = () => ({
  appTheme: 'day',
  userAuth: true,
  userMessages: userMessages,
  userMessagesChat: userMessagesChat,
  userFriends: userFriends,
  userFriendsRequests: userFriendsRequests,
  userFriendsMyRequests: userFriendsMyRequests,
  friendProfile: friendProfile,
  newsList: newsList,
  profile: profile,
  game: game,
})

export const mutations = {
  setAppTheme(state, theme) {
    state.appTheme = theme
  },
  setUserAuth(state, auth) {
    state.userAuth = auth
  }
}

export const actions = {
  setAppTheme({commit}, params) {
    commit('setAppTheme', params)
  },
  setUserAuth({commit, state}, params) {
    commit('setUserAuth', params)
  }
}

export const getters = {
  appTheme: state => state.appTheme,
  userAuth: state => state.userAuth,
  userMessages: state => state.userMessages,
  userMessagesChat: state => state.userMessagesChat,
  userFriends: state => state.userFriends,
  userFriendsRequests: state => state.userFriendsRequests,
  userFriendsMyRequests: state => state.userFriendsMyRequests,
  friendProfile: state => state.friendProfile,
  newsList: state => state.newsList,
  profile: state => state.profile,
  userAuth: state => state.userAuth,
  game: state => state.game,
}

const userMessages = [{
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 5
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 4
}, {
  photo: require('~/assets/img/messages/3.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/4.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/5.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/6.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/7.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/8.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/9.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/3.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/4.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/5.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/6.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/7.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/8.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/9.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith',
  date: '04:24',
  text: 'You use a Intent to send the SMS and attach some pre defined text via the EXTRA_TEXT attribute. Quite easy to do. And it works for the normal SHARE intent as well.',
  badges: 0
}]

const userMessagesChat = {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith',
  online: true,
  list: [{
    date: '18 august 2021',
    items: [{
      text: 'Hello!',
      time: '12:25',
      type: 'in'
    }, {
      text: 'Hello! How are you?',
      time: '12:25',
      type: 'out',
      check: true
    }, {
      text: 'But I must explain to you how all this mistaken idea of denouncing of a plesasure and praising pain was born',
      time: '12:25',
      type: 'in'
    }, {
      text: 'I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes',
      time: '12:25',
      type: 'out',
      check: false
    }]
  }, {
    date: '19 august 2021',
    items: [{
      text: 'Hello!',
      time: '12:25',
      type: 'in'
    }, {
      text: 'Hello! How are you?',
      time: '12:25',
      type: 'out',
      check: true
    }, {
      text: 'But I must explain to you how all this mistaken idea of denouncing of a plesasure and praising pain was born',
      time: '12:25',
      type: 'in'
    }, {
      text: 'I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes',
      time: '12:25',
      type: 'out',
      check: false
    }]
  }, {
    date: '20 august 2021',
    items: [{
      text: 'Hello!',
      time: '12:25',
      type: 'in'
    }, {
      text: 'Hello! How are you?',
      time: '12:25',
      type: 'out',
      check: true
    }, {
      text: 'But I must explain to you how all this mistaken idea of denouncing of a plesasure and praising pain was born',
      time: '12:25',
      type: 'in'
    }, {
      text: 'I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes',
      time: '12:25',
      type: 'out',
      check: false
    }]
  }]
}

const userFriends = [{
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/3.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/4.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/5.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/6.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/7.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/8.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/9.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/3.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/4.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/5.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/6.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/7.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/8.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/9.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith'
}]

const userFriendsRequests = [{
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/3.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/4.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/5.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/6.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/7.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/8.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/9.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/3.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/4.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/5.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/6.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/7.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/8.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/9.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith'
}]

const userFriendsMyRequests = [{
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/3.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/4.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/5.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/6.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/7.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/8.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/9.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/3.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/4.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/5.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/6.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/7.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/8.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/9.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith'
}, {
  photo: require('~/assets/img/messages/2.png?webp'),
  name: 'David Smith'
}]

const friendProfile = {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith',
  online: true,
  games: 45,
  friends: 56,
  age: '28 years old',
  birth: '24 august 1993',
  location: 'Russia, Moscow',
  gamesList: [{
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
  friendsList: [{
    img: require('~/assets/img/messages/1.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/2.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/3.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/4.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/5.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/6.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/7.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/8.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/9.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/1.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/2.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/3.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/4.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/5.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/6.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/7.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/8.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/9.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/1.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/2.png?webp'),
    name: 'David Smith'
  }],
  mutualList: [{
    img: require('~/assets/img/messages/1.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/2.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/3.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/4.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/5.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/6.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/7.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/8.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/9.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/1.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/2.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/3.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/4.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/5.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/6.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/7.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/8.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/9.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/1.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/2.png?webp'),
    name: 'David Smith'
  }]
}

const newsList = [{
  photo: require('~/assets/img/messages/1.png?webp'),
  img: null,
  name: 'David Smith',
  date: 'Yesterday',
  text: 'Don’t forget about Royal Battle in the Galaxy Station!',
  playBtn: true,
  puckupBtn: false,
  maybeBtn: true,
  startBtn: false,
  extPhoto: null,
  extImg: require('~/assets/img/sidebar/1.jpg?webp')
}, {
  photo: null,
  img: require('~/assets/img/sidebar/1.jpg?webp'),
  name: 'Perfect Fantasy',
  date: 'Yesterday',
  text: 'A new Sword of Power is already waiting for you',
  playBtn: false,
  puckupBtn: true,
  maybeBtn: true,
  startBtn: false,
  extPhoto: null,
  extImg: null
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  img: null,
  name: 'Luna Grace',
  date: '20.08.2021',
  text: 'Made friends with Victoria Madison',
  playBtn: false,
  puckupBtn: false,
  maybeBtn: false,
  startBtn: false,
  extPhoto: require('~/assets/img/messages/1.png?webp'),
  extImg: null
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  img: null,
  name: 'Rise of Angels',
  date: 'Yesterday',
  text: 'Your squad is waiting for you, fighter',
  playBtn: false,
  puckupBtn: false,
  maybeBtn: true,
  startBtn: true,
  extPhoto: null,
  extImg: null
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'Oliver Jacob',
  date: '20.08.2021',
  text: 'Made friends with James Logan',
  playBtn: false,
  puckupBtn: false,
  maybeBtn: false,
  extPhoto: require('~/assets/img/messages/1.png?webp'),
  extImg: null
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  img: null,
  name: 'David Smith',
  date: 'Yesterday',
  text: 'Don’t forget about Royal Battle in the Galaxy Station!',
  playBtn: true,
  puckupBtn: false,
  maybeBtn: true,
  startBtn: false,
  extPhoto: null,
  extImg: require('~/assets/img/sidebar/1.jpg?webp')
}, {
  photo: null,
  img: require('~/assets/img/sidebar/1.jpg?webp'),
  name: 'Perfect Fantasy',
  date: 'Yesterday',
  text: 'A new Sword of Power is already waiting for you',
  playBtn: false,
  puckupBtn: true,
  maybeBtn: true,
  startBtn: false,
  extPhoto: null,
  extImg: null
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  img: null,
  name: 'Luna Grace',
  date: '20.08.2021',
  text: 'Made friends with Victoria Madison',
  playBtn: false,
  puckupBtn: false,
  maybeBtn: false,
  startBtn: false,
  extPhoto: require('~/assets/img/messages/1.png?webp'),
  extImg: null
}, {
  photo: null,
  img: require('~/assets/img/messages/1.png?webp'),
  name: 'Rise of Angels',
  date: 'Yesterday',
  text: 'Your squad is waiting for you, fighter',
  playBtn: false,
  puckupBtn: false,
  maybeBtn: true,
  startBtn: true,
  extPhoto: null,
  extImg: null
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'Oliver Jacob',
  date: '20.08.2021',
  text: 'Made friends with James Logan',
  playBtn: false,
  puckupBtn: false,
  maybeBtn: false,
  extPhoto: require('~/assets/img/messages/1.png?webp'),
  extImg: null
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  img: null,
  name: 'David Smith',
  date: 'Yesterday',
  text: 'Don’t forget about Royal Battle in the Galaxy Station!',
  playBtn: true,
  puckupBtn: false,
  maybeBtn: true,
  startBtn: false,
  extPhoto: null,
  extImg: require('~/assets/img/sidebar/1.jpg?webp')
}, {
  photo: null,
  img: require('~/assets/img/sidebar/1.jpg?webp'),
  name: 'Perfect Fantasy',
  date: 'Yesterday',
  text: 'A new Sword of Power is already waiting for you',
  playBtn: false,
  puckupBtn: true,
  maybeBtn: true,
  startBtn: false,
  extPhoto: null,
  extImg: null
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  img: null,
  name: 'Luna Grace',
  date: '20.08.2021',
  text: 'Made friends with Victoria Madison',
  playBtn: false,
  puckupBtn: false,
  maybeBtn: false,
  startBtn: false,
  extPhoto: require('~/assets/img/messages/1.png?webp'),
  extImg: null
}, {
  photo: null,
  img: require('~/assets/img/messages/1.png?webp'),
  name: 'Rise of Angels',
  date: 'Yesterday',
  text: 'Your squad is waiting for you, fighter',
  playBtn: false,
  puckupBtn: false,
  maybeBtn: true,
  startBtn: true,
  extPhoto: null,
  extImg: null
}, {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'Oliver Jacob',
  date: '20.08.2021',
  text: 'Made friends with James Logan',
  playBtn: false,
  puckupBtn: false,
  maybeBtn: false,
  extPhoto: require('~/assets/img/messages/1.png?webp'),
  extImg: null
}]

const profile = {
  photo: require('~/assets/img/messages/1.png?webp'),
  name: 'David Smith',
  balance: '$150',
  blackList: [{
    img: require('~/assets/img/messages/1.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/2.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/3.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/4.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/5.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/6.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/7.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/8.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/9.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/1.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/2.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/3.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/4.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/5.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/6.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/7.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/8.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/9.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/1.png?webp'),
    name: 'David Smith'
  }, {
    img: require('~/assets/img/messages/2.png?webp'),
    name: 'David Smith'
  }],
  balanceHistory: [{
    date: '08.04.2021',
    desc: 'Balance replenishment',
    type: 'plus',
    balance: '+ $50'
  }, {
    date: '08.04.2021',
    desc: 'In-game payment',
    type: 'minus',
    balance: '- $5'
  }, {
    date: '08.04.2021',
    desc: 'Balance replenishment',
    type: 'plus',
    balance: '+ $50'
  }, {
    date: '08.04.2021',
    desc: 'In-game payment',
    type: 'minus',
    balance: '- $5'
  }, {
    date: '08.04.2021',
    desc: 'Balance replenishment',
    type: 'plus',
    balance: '+ $50'
  }, {
    date: '08.04.2021',
    desc: 'In-game payment',
    type: 'minus',
    balance: '- $5'
  }, {
    date: '08.04.2021',
    desc: 'Balance replenishment',
    type: 'plus',
    balance: '+ $50'
  }, {
    date: '08.04.2021',
    desc: 'In-game payment',
    type: 'minus',
    balance: '- $5'
  }, {
    date: '08.04.2021',
    desc: 'Balance replenishment',
    type: 'plus',
    balance: '+ $50'
  }, {
    date: '08.04.2021',
    desc: 'In-game payment',
    type: 'minus',
    balance: '- $5'
  }, {
    date: '08.04.2021',
    desc: 'Balance replenishment',
    type: 'plus',
    balance: '+ $50'
  }, {
    date: '08.04.2021',
    desc: 'In-game payment',
    type: 'minus',
    balance: '- $5'
  }, {
    date: '08.04.2021',
    desc: 'Balance replenishment',
    type: 'plus',
    balance: '+ $50'
  }, {
    date: '08.04.2021',
    desc: 'In-game payment',
    type: 'minus',
    balance: '- $5'
  }, {
    date: '08.04.2021',
    desc: 'Balance replenishment',
    type: 'plus',
    balance: '+ $50'
  }, {
    date: '08.04.2021',
    desc: 'In-game payment',
    type: 'minus',
    balance: '- $5'
  }]
}

const game = {
  name: 'Knight Wars',
  photo: require('~/assets/img/catalog/6.jpg?webp'),
  screenList: [
    require('~/assets/img/catalog/1.jpg?webp'),
    require('~/assets/img/catalog/2.jpg?webp'),
    require('~/assets/img/catalog/3.jpg?webp'),
    require('~/assets/img/catalog/4.jpg?webp'),
    require('~/assets/img/catalog/5.jpg?webp')
  ]
}
