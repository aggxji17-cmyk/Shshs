// Admin Tickets UI integration
// File: nyxo/src/admin/tickets.js
// NOTE: This file adds an admin tickets controller and lightweight UI rendering helper.
// It attempts to use existing services if present (ticketsService, db) and falls back to
// a minimal in-memory implementation when not available, so it won't break the project.

const fs = require('fs');

let ticketsService;
try {
  ticketsService = require('../services/ticketsService');
} catch (e) {
  ticketsService = null;
}

// In-memory fallback
const fallbackSettings = {
  enabled: true,
  categoryId: null,
  logsChannelId: null,
  closeTimeout: 24 // hours
};

async function getTicketsSettings() {
  if (ticketsService && typeof ticketsService.getSettings === 'function') {
    try {
      return await ticketsService.getSettings();
    } catch (e) {
      // fall through
    }
  }
  return fallbackSettings;
}

async function updateTicketsSettings(newSettings) {
  if (ticketsService && typeof ticketsService.updateSettings === 'function') {
    return ticketsService.updateSettings(newSettings);
  }
  Object.assign(fallbackSettings, newSettings);
  return fallbackSettings;
}

// Simple HTML renderer so admin panel can include this file as route handler if desired.
function renderAdminTicketsPage(settings) {
  const s = settings || fallbackSettings;
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>NYXO Admin - Tickets</title>
    <style>
      body{font-family:Arial,Helvetica,sans-serif;padding:20px}
      label{display:block;margin-top:10px}
      input[type=text],select{width:360px;padding:6px}
      button{margin-top:12px;padding:8px 12px}
    </style>
  </head>
  <body>
    <h1>Tickets - Admin</h1>
    <form id="ticketsForm">
      <label>
        Enabled:
        <select name="enabled">
          <option value="true" ${s.enabled ? 'selected' : ''}>True</option>
          <option value="false" ${!s.enabled ? 'selected' : ''}>False</option>
        </select>
      </label>
      <label>
        Category ID:
        <input type="text" name="categoryId" value="${s.categoryId || ''}" />
      </label>
      <label>
        Logs Channel ID:
        <input type="text" name="logsChannelId" value="${s.logsChannelId || ''}" />
      </label>
      <label>
        Close Timeout (hours):
        <input type="text" name="closeTimeout" value="${s.closeTimeout || 24}" />
      </label>
      <button type="button" onclick="save()">Save</button>
    </form>

    <script>
      async function save(){
        const f = document.getElementById('ticketsForm');
        const data = {
          enabled: f.enabled.value === 'true',
          categoryId: f.categoryId.value || null,
          logsChannelId: f.logsChannelId.value || null,
          closeTimeout: parseInt(f.closeTimeout.value,10) || 24
        };
        try{
          const resp = await fetch('/admin/tickets/settings', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
          });
          if(resp.ok) alert('Saved'); else alert('Save failed');
        }catch(e){alert('Save error')}
      }
    </script>
  </body>
</html>`;
}

// Export handlers for express-like usage
module.exports = {
  getTicketsSettings,
  updateTicketsSettings,
  renderAdminTicketsPage
};
