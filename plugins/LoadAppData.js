export default async (context) => {
  const { response } = await context.store.dispatch('app/nuxtServerInit')
  let games = {},
      token = null,
      search = []
  for(let i = 0; i < response.length; i++) {
    for(let e in response[i]) {
      switch(e) {
        case 'guest_token':
          token = response[i][e]
          break
        case 'games_carousel':
        case 'games_new':
        case 'games_recommended':
        case 'games_all':
          games[e] = response[i][e]
          break
        case 'categories':
          let categories = {}
          for(let c = 0; c < response[i][e].length; c++) {
            if(response[i][e][c].total_games) {
              categories[response[i][e][c].cid] = response[i][e][c]
              categories[response[i][e][c].cid].list = []
              categories[response[i][e][c].cid].loaded = false
              categories[response[i][e][c].cid].offset = 0
            }
          }
          categories[0] = {
            cid: 0,
            title: 'All',
            loaded: false,
            list: [],
            offset: 0
          }
          games[e] = categories
          break
        case 'popular_search':
          search = response[i][e]
          break
      }
    }  
  }
  context.store.dispatch('user/setToken', token)
  context.store.dispatch('games/setInitData', games)
  context.store.dispatch('search/setPopular', search)
}