export default async ({ store }) => {
  await store.dispatch('app/initAppData')
}