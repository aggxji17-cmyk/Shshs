// Tickets - Statistics admin
let db; try{ db = require('../database'); }catch(e){ db=null }
async function getTicketStatistics(){ // try to return simple stats if db service exists
  if(db && db.query){ try{ const res = await db.query('SELECT COUNT(*) as total FROM tickets'); return { total: (res.rows && res.rows[0] && res.rows[0].total) || 0 }; }catch(e){} }
  // fallback dummy
  return { total: 0 };
}
function renderStatisticsPage(stats){ const s = stats||{total:0}; return `<!doctype html><html><body><h1>Tickets Statistics</h1><p>Total tickets: ${s.total}</p></body></html>` }
module.exports={getTicketStatistics,renderStatisticsPage};