import PostApi from './post'
import AuthApi from './auth'
import UserApi from './user'

export default {
    post: new PostApi(),
    auth: new AuthApi(),
    user: new UserApi()
}
