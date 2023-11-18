const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  testApp: state => state.user.testApp,
  userId: state => state.user.userInfo.userId,
  username: state => state.user.userInfo.username,
  staffPhoto: state => state.user.userInfo.staffPhoto

}
export default getters
