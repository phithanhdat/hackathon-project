import Cookies from 'js-cookie'
export function convertTimeToExpires(expires) {
  return new Date(new Date().getTime() + expires * 1000)
}
/**
 * nnduyet comment
 * Set/Get @param refresh_token
 */
export function setTokenToCookies(access_token, expires) {
  if (expires) {
    Cookies.set('access_token', access_token, {
      expires: convertTimeToExpires(expires),
    })
  } else {
    Cookies.set('access_token', access_token)
  }
}
export function getTokenFromCookies() {
  return Cookies.get('access_token')
}

/**
 * nnduyet comment
 * Set/Get @param refresh_token
 */
export function setRefreshTokenToCookies(refresh_token, expires) {
  if (expires) {
    Cookies.set('refresh_token', refresh_token, {
      expires: convertTimeToExpires(expires),
    })
  } else {
    Cookies.set('refresh_token', refresh_token)
  }
}
export function getRefreshTokenFromCookies() {
  return Cookies.get('refresh_token')
}

/**
 * nnduyet comment
 * Set/Get @param user
 */
export function setUserToCookies(user) {
  Cookies.set('user', JSON.stringify(user))
}
export function getUserFromCookies() {
  return Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null
}

/**
 * nnduyet comment
 * Set/Get @param round_user
 */
export function setRoundUserToCookies(roundUser) {
  Cookies.set('round_user', JSON.stringify(roundUser))
}
export function getRoundUserFromCookies() {
  return Cookies.get('round_user')
    ? JSON.parse(Cookies.get('round_user'))
    : null
}
export function removeRoundUserInCookies() {
  Cookies.remove('round_user')
}

/**
 * nnduyet comment
 * remove @param []
 */

const cookiesKeyList = ['access_token', 'user']
export function removeCookies() {
  cookiesKeyList.forEach((item) => {
    Cookies.remove(item)
  })
}
