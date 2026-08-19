// Starboard Commands scaffolding
// Setup, Settings, Ignore, Management
module.exports = {
  async setupStarboard(options){
    const svcPath = '../services/starboardService';
    try{ const svc = require(svcPath); if(svc && svc.setup) return svc.setup(options); }catch(e){}
    return {ok:false,reason:'starboard service not available'};
  },
  async updateStarboardSettings(options){ try{ const svc=require('../services/starboardService'); if(svc && svc.updateSettings) return svc.updateSettings(options);}catch(e){} return {ok:false}; },
  async ignoreStarboard(options){ try{ const svc=require('../services/starboardService'); if(svc && svc.ignore) return svc.ignore(options);}catch(e){} return {ok:false}; },
  async manageStarboard(cmd,opts){ try{ const svc=require('../services/starboardService'); if(svc && svc.manage) return svc.manage(cmd,opts);}catch(e){} return {ok:false}; }
};