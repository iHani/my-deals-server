const clone = require('clone')

// mock data
let users = {
  "token-2342": { mobile: "a", password: "a" },
}
let deals = [
  { dealId: "1", dealCategory: 'Travel', dealPartner: 'AlTayyar', dealPrice: 200 },
  { dealId: "2", dealCategory: 'Hotel', dealPartner: 'Ritz', dealPrice: 2500 },
  { dealId: "3", dealCategory: 'Hotel', dealPartner: 'Hilton', dealPrice: 1500 },
  { dealId: "4", dealCategory: 'Rent', dealPartner: 'Theeb', dealPrice: 80 },
];

function signup (token, user) {
  return new Promise((res) => {
    user.isAuthenticated = true
    users[token] = { ...user }
    res(user)
  })
}

function getDeals () {
  return new Promise((res) => {
    const keys = Object.keys(deals)
    res(keys.map(key => deals[key]))
  })
}

function checkAuthUser (token) {
  return new Promise((res) => {
    const isAuthenticated = users[token] && users[token].isAuthenticated ? true : false
    res({ isAuthenticated })
  })
}

function login (token, user) {
  return new Promise((res) => {
    const keys = Object.keys(users)
    const exist = keys.find(key => users[key].mobile === user.mobile && users[key].password === user.password)
    if (exist) {
      user.isAuthenticated = true
      users[token] = user
    }
    const isAuthenticated = user.isAuthenticated ? true : false
    res({ isAuthenticated })
  })
}

function logout (token) {
  return new Promise((res) => {
    if (users[token]) {
      users[token].isAuthenticated = false
      res({ loggedOut: true })
    }
    res({ error: 'error logging out' })
  })
}

function createNewDeal (token, deal) {
  return new Promise((res) => {
    if (users[token].isAuthenticated) {
      deals.push(deal)
    }
    res(deals)
  })
}

function editDeal (token, id, deal) {
    return new Promise((res) => {
      deals = deals.filter(({ dealId }) => dealId !== id)
      deal.dealId = id
      deals.push(deal)
      res({ edited: true })
    })
}

function deleteDeal (token, id) {
    return new Promise((res) => {
      deals = deals.filter(({ dealId }) => dealId !== id)
      res({ deleted: true })
    })
}

module.exports = {
  getDeals,
  signup,
  checkAuthUser,
  login,
  logout,
  createNewDeal,
  editDeal,
  deleteDeal
}
