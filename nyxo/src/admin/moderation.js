// Admin Moderation UI integration
const fs = require('fs');
let moderationService;
try{ moderationService = require('../services/moderationService'); }catch(e){ moderationService = null; }
const fallback = { enabled:true, modRoleId:null };
async function getModerationSettings(){ if(moderationService && moderationService.getSettings) return moderationService.getSettings(); return fallback; }
async function updateModerationSettings(s){ if(moderationService && moderationService.updateSettings) return moderationService.updateSettings(s); Object.assign(fallback,s); return fallback; }
function renderAdminModerationPage(s){ const d = s||fallback; return `<!doctype html><html><head><meta charset="utf-8"/><title>Admin - Moderation</title></head><body><h1>Moderation</h1><form><label>Enabled: <select name="enabled"><option value="true" ${d.enabled? 'selected':''}>True</option><option value="false" ${!d.enabled? 'selected':''}>False</option></select></label><label>Mod Role ID: <input name="modRoleId" value="${d.modRoleId||''}"/></label><button type="button" onclick="save()">Save</button></form><script>async function save(){const f=document.forms[0];const body={enabled:f.enabled.value==='true',modRoleId:f.modRoleId.value||null};await fetch('/admin/moderation/settings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});alert('Saved');}</script></body></html>` }
module.exports={getModerationSettings,updateModerationSettings,renderAdminModerationPage};