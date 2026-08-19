// Dashboard scaffolding
let dashboardService; try{ dashboardService = require('../services/dashboardService'); }catch(e){ dashboardService=null }
async function renderDashboardFeatures(){ if(dashboardService && dashboardService.renderFeatures) return dashboardService.renderFeatures(); return '<html><body><h1>Dashboard - Features</h1><p>No dashboard service available</p></body></html>'; }
async function renderDashboardSettings(){ if(dashboardService && dashboardService.renderSettings) return dashboardService.renderSettings(); return '<html><body><h1>Dashboard - Settings</h1></body></html>'; }
async function renderDashboardControls(){ if(dashboardService && dashboardService.renderControls) return dashboardService.renderControls(); return '<html><body><h1>Dashboard - Controls</h1></body></html>'; }
module.exports={renderDashboardFeatures,renderDashboardSettings,renderDashboardControls};