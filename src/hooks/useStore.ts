import { createStore } from 'react-simple-hook-store'

interface IEnv {
  token?: string
  user?: any
  constante?: any
  redirectPath?: string
}

interface IActions {
  setEnv: (newState: IEnv) => void
}

interface IState {
  env: IEnv
}
interface IActions {
  setEnv: (newState: IEnv) => void
}

export const { useStore, store } = createStore<IState, IActions>(
  {
    env: {
      token: '',
      user: {},
      constante: {},
      redirectPath: ''
    }
  },
  {
    setEnv: (store, newState) => {
      store.setState({
        env: {
          ...store.state.env,
          ...newState
        }
      })
    }
  }
)
