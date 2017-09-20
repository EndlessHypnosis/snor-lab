import UserPathReducer from '../app/reducers/user_path_reducer';

describe('Reducers', () => {

  it('User Path Reducer: default case', () => {
    expect(UserPathReducer(undefined, {})).toEqual({})
  })

  it('User Path Reducer: set path level', () => {
    expect(UserPathReducer(
      { level: '/level-1' },
      { type: 'SET_PATH_LEVEL', payload: '/level-1//1b' }
    )).toEqual(
      { level: '/level-1//1b' }
    )
  })

  it('User Path Reducer: set avatar name', () => {
    expect(UserPathReducer(
      { avatarName: 'B89-Organa' },
      { type: 'SET_AVATAR_NAME', payload: 'X23-B3' }
    )).toEqual(
      { avatarName: 'X23-B3' }
    )
  })

  it('User Path Reducer: set avatar url', () => {
    expect(UserPathReducer(
      { avatarUrl: 'http://www.fakeimageurl.com/imageABC.png' },
      { type: 'SET_AVATAR_URL', payload: 'http://www.fakeimageurl.com/image123.png' }
    )).toEqual(
      { avatarUrl: 'http://www.fakeimageurl.com/image123.png' }
    )
  })

  it('User Path Reducer: set avatar token count', () => {
    expect(UserPathReducer(
      { avatarTokens: 3 },
      { type: 'SET_AVATAR_TOKENS', payload: 5 }
    )).toEqual({ avatarTokens: 5 })
  })

})