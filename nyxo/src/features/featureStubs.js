// Features stubs for core systems - call existing services
const services = ['tickets','moderation','protection','automod','economy','leveling','giveaways','logging','welcome','broadcast'];
const out = {};
services.forEach(s => { out[s+'Features'] = async function(){ try{ const svc = require('../services/'+s+'Service'); if(svc && svc.ensureFeatures) return svc.ensureFeatures(); }catch(e){} return {ok:false,service:s}; } });
module.exports = out;