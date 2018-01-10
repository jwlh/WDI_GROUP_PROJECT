const rp = require('request-promise');

function getEvents(req, res) {
  rp(
    `http://api.eventful.com/json/events/search?app_key=xZsJsxZbnKn2phn3&where=51.507602,-0.127816&within=10&date=today&page_size=25&sort_order=popularity&include=popularity,categories&offset=${
      req.params.offset
    }`
  ).then(data => {
    return res.status(200).json(JSON.parse(data));
  });
}

function getNewEvents(req, res) {
  rp(
    `http://api.eventful.com/json/events/search?app_key=xZsJsxZbnKn2phn3&where=${req
      .params.lat || 51.507602},${req.params.lng || -0.127816}&within=${req
      .params.radius ||
      5}&date=today&page_size=25&sort_order=popularity&include=popularity,categories&offset=${req
      .params.offset || 0}&category=${req.params.categories ||
      'music,comedy,festivals_parades,performing_arts,sports'}`
  ).then(data => {
    return res.status(200).json(JSON.parse(data));
  });
}

function getVenue(req, res) {
  rp(
    `http://api.eventful.com/json/venues/get?app_key=xZsJsxZbnKn2phn3&id=${
      req.params.id
    }`
  ).then(data => {
    return res.status(200).json(JSON.parse(data));
  });
}

module.exports = {
  events: getEvents,
  newEvents: getNewEvents,
  getVenue: getVenue
};
