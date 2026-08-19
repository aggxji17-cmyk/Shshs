// UI Components scaffolding - Buttons, Selects, Modals, Permissions, Messages
module.exports = {
  async handleButton(customId,ctx){ try{ const btns = require('./components/buttons'); if(btns && btns.handle) return btns.handle(customId,ctx); }catch(e){} return {handled:false}; },
  async handleSelect(selectId,ctx){ try{ const s = require('./components/selectMenus'); if(s && s.handle) return s.handle(selectId,ctx);}catch(e){} return {handled:false}; },
  async handleModal(modalId,ctx){ try{ const m=require('./components/modals'); if(m && m.handle) return m.handle(modalId,ctx);}catch(e){} return {handled:false}; },
  async checkPermission(user,perm){ try{ const p=require('./components/permissions'); if(p && p.check) return p.check(user,perm);}catch(e){} return false; }
};